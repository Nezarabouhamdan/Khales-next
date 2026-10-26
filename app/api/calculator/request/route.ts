import { NextRequest, NextResponse } from "next/server";
import {
  describeOdooError as describeError,
  odooAuthenticate,
  odooExecuteKw,
  odooFindOrCreateSource,
  odooSubscribeDefaultFollowers,
} from "@/lib/odoo";
import { looksLikeSpam } from "@/lib/spam";
import { computeEstimate, computeLeadScore, estimateFamilyPlanAreaSqm } from "@/lib/calculator/engine";
import {
  buildCalculatorLead,
  pickExistingCustomFields,
  plainTextToHtml,
  type CalculatorLead,
} from "@/lib/calculator/odooLead";
import { CALCULATOR_RATES } from "@/lib/calculator/rates";
import {
  parseCalculatorRequest,
  type CalculatorRequestPayload,
  type RequestContext,
} from "@/lib/calculator/request";

// Odoo auth + several execute_kw round-trips (duplicate check, fields_get,
// source, tags, create, followers) can exceed Vercel's default timeout.
export const maxDuration = 60;

// Which x_calc_* fields exist on crm.lead (and the description's type),
// cached per server instance so a field the admin adds is picked up within
// ten minutes without a redeploy.
const FIELD_TYPES_TTL_MS = 10 * 60 * 1000;
let fieldTypesCache: { types: Map<string, string>; expiresAt: number } | null = null;

// The only endpoint that creates an Odoo lead: a visitor submitting "I want
// to design my home" or "Review my home budget". Viewing a result, the
// share card and the PDF never reach it. Every number saved is recomputed
// here from the submitted inputs - the client's figures are never trusted.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = parseCalculatorRequest(body);
  if (!parsed.ok) {
    return NextResponse.json({ success: false, error: parsed.error }, { status: 400 });
  }
  const payload = parsed.value;
  const success = (leadId: number | null) =>
    NextResponse.json({ success: true, reference: payload.reference, leadId });

  // Bots get a normal-looking success so they don't adapt, but nothing is
  // written to Odoo (same as /api/contact).
  if (looksLikeSpam({ honeypot: payload.website, elapsedMs: payload.elapsedMs, name: payload.firstName })) {
    return success(null);
  }

  try {
    const context = rebuildContext(payload);
    const subject = context && (context.inputMode === "family_plan" ? context.familyPlan : context.estimate);
    // parseCalculatorRequest already guarantees both; this keeps the types honest.
    if (!context || !subject?.landStatus) {
      return NextResponse.json({ success: false, error: "inputs" }, { status: 400 });
    }

    const leadScore = computeLeadScore({
      landStatus: subject.landStatus,
      startTiming: payload.startTiming,
      hasAreaOrBudget: payload.inputMode !== "family_plan",
      hasPlanOrQuote: payload.hasPlanOrContractorQuote,
    });
    const lead = buildCalculatorLead({ payload, context, leadScore, createdAt: new Date() });

    // Previews / tests: everything except the Odoo write. The log carries
    // no name, email or phone - the custom fields never contain them.
    if (process.env.CALCULATOR_ODOO_DRY_RUN === "true") {
      console.info("[calculator] CALCULATOR_ODOO_DRY_RUN - lead not sent to Odoo:", lead.name, lead.customFields);
      return success(null);
    }

    return success(await saveLead(lead));
  } catch (error) {
    console.error("Error in /api/calculator/request:", describeError(error));
    return NextResponse.json({ success: false, error: "generic" }, { status: 500 });
  }
}

/** The result the request belongs to, rebuilt from its inputs alone. */
function rebuildContext(payload: CalculatorRequestPayload): RequestContext | null {
  if (payload.inputMode === "family_plan") {
    if (!payload.familyPlan) return null;
    return {
      inputMode: "family_plan",
      familyPlan: payload.familyPlan,
      indicativeAreaSqm: estimateFamilyPlanAreaSqm(payload.familyPlan),
      reference: payload.reference,
    };
  }
  if (!payload.estimate) return null;
  return {
    inputMode: payload.inputMode,
    estimate: payload.estimate,
    outcome: computeEstimate(CALCULATOR_RATES, payload.inputMode, payload.estimate),
    reference: payload.reference,
  };
}

async function saveLead(lead: CalculatorLead): Promise<number> {
  const uid = await odooAuthenticate();

  // The name is unique per request (type + city + reference), so a double
  // click or a retry after a timeout returns the lead that already exists -
  // archived ones included - instead of creating a second one.
  const existing = await findLeadByName(uid, lead.name);
  if (existing !== null) return existing;

  const [fieldTypes, sourceId, tagIds] = await Promise.all([
    getLeadFieldTypes(uid),
    odooFindOrCreateSource(uid, lead.sourceName),
    Promise.all(lead.tagNames.map((name) => findOrCreateTag(uid, name))),
  ]);

  const { description, ...standard } = lead.standard;
  // Only standard fields and the x_calc_* copies: no res.partner is created,
  // and `type`, the stage and won/lost stay Odoo's defaults - a request is
  // never turned into an opportunity or a customer automatically.
  const values = {
    name: lead.name,
    ...standard,
    description: fieldTypes.get("description") === "html" ? plainTextToHtml(description) : description,
    source_id: sourceId,
    tag_ids: [[6, 0, tagIds]],
  };
  const custom = pickExistingCustomFields(lead.customFields, fieldTypes);

  let leadId: number;
  try {
    leadId = await odooExecuteKw<number>(uid, "crm.lead", "create", [{ ...values, ...custom }]);
  } catch (error) {
    if (Object.keys(custom).length === 0) throw error;
    // A custom field Odoo rejected (deleted or changed since the cached
    // fields_get) mustn't lose the request - the description has it all.
    console.error("Calculator lead: custom fields rejected, retrying without them:", describeError(error));
    fieldTypesCache = null;
    leadId =
      (await findLeadByName(uid, lead.name)) ??
      (await odooExecuteKw<number>(uid, "crm.lead", "create", [values]));
  }

  try {
    await odooSubscribeDefaultFollowers(uid, leadId);
  } catch (error) {
    // The lead exists; a follower hiccup shouldn't turn it into an error.
    console.error("Calculator lead: could not subscribe default followers:", describeError(error));
  }
  return leadId;
}

async function findLeadByName(uid: number, name: string): Promise<number | null> {
  const ids = await odooExecuteKw<number[]>(
    uid,
    "crm.lead",
    "search",
    [
      [
        ["name", "=", name],
        ["active", "in", [true, false]],
      ],
    ],
    { limit: 1 },
  );
  return ids[0] ?? null;
}

async function findOrCreateTag(uid: number, name: string): Promise<number> {
  const find = () => odooExecuteKw<number[]>(uid, "crm.tag", "search", [[["name", "=", name]]], { limit: 1 });
  const existing = await find();
  if (existing.length > 0) return existing[0];
  try {
    return await odooExecuteKw<number>(uid, "crm.tag", "create", [{ name }]);
  } catch (error) {
    // Tag names are unique - a parallel request may have just created it.
    const created = await find();
    if (created.length > 0) return created[0];
    throw error;
  }
}

async function getLeadFieldTypes(uid: number): Promise<Map<string, string>> {
  if (fieldTypesCache && fieldTypesCache.expiresAt > Date.now()) return fieldTypesCache.types;
  try {
    const fields = await odooExecuteKw<Record<string, { type?: string }>>(uid, "crm.lead", "fields_get", [], {
      attributes: ["type"],
    });
    const types = new Map<string, string>();
    for (const [name, info] of Object.entries(fields)) {
      if ((name === "description" || name.startsWith("x_calc_")) && info?.type) types.set(name, info.type);
    }
    fieldTypesCache = { types, expiresAt: Date.now() + FIELD_TYPES_TTL_MS };
    return types;
  } catch (error) {
    // Not worth losing a lead over: write no custom fields this time (the
    // description still has everything) and ask again on the next request.
    console.error("Calculator lead: fields_get failed:", describeError(error));
    return new Map();
  }
}
