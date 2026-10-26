import { NextRequest, NextResponse } from "next/server";
import { describeOdooError, odooAuthenticate, odooDatetime, odooExecuteKw } from "@/lib/odoo";
import { computeEstimate } from "@/lib/calculator/engine";
import {
  buildEstimateSnapshot,
  CALCULATOR_ESTIMATE_MODEL,
  pickExistingCustomFields,
} from "@/lib/calculator/odooLead";
import { CALCULATOR_RATES } from "@/lib/calculator/rates";
import { parseCalculatorSnapshot, type SnapshotAction } from "@/lib/calculator/request";

export const maxDuration = 60;

// Which kh.calculator.estimate fields exist, cached per server instance like
// the lead's x_calc_* fields. Null means the model isn't there (the Odoo
// module isn't installed): the share still works, nothing is saved.
const FIELD_TYPES_TTL_MS = 10 * 60 * 1000;
let fieldTypesCache: { types: Map<string, string> | null; expiresAt: number } | null = null;

const ACTION_FLAG: Record<SnapshotAction, string> = { card: "shared_card", pdf: "downloaded_pdf" };

// Saves an anonymous copy of an estimate when the visitor shares the card or
// downloads the PDF, so the team can find it by reference if the visitor
// later quotes it on WhatsApp without sending a request. One record per
// reference; sharing again only updates the flags and dates. Never a lead,
// never personal data, and the numbers are recomputed from the inputs.
export async function POST(request: NextRequest) {
  const payload = parseCalculatorSnapshot(await request.json().catch(() => null));
  if (!payload) {
    return NextResponse.json({ success: false, error: "inputs" }, { status: 400 });
  }
  const outcome = computeEstimate(CALCULATOR_RATES, payload.inputMode, payload.estimate);
  // Partner-review markets show no number, so they have no card or PDF.
  if (outcome.kind === "partner_review") {
    return NextResponse.json({ success: false, error: "inputs" }, { status: 400 });
  }

  const values = buildEstimateSnapshot({ ...payload, outcome });
  if (process.env.CALCULATOR_ODOO_DRY_RUN === "true") {
    console.info("[calculator] CALCULATOR_ODOO_DRY_RUN - estimate not sent to Odoo:", payload.action, values);
    return NextResponse.json({ success: true, estimateId: null });
  }

  try {
    const uid = await odooAuthenticate();
    const types = await getEstimateFieldTypes(uid);
    if (!types) return NextResponse.json({ success: true, estimateId: null });
    return NextResponse.json({ success: true, estimateId: await saveSnapshot(uid, types, values, payload.action) });
  } catch (error) {
    console.error("Error in /api/calculator/snapshot:", describeOdooError(error));
    return NextResponse.json({ success: false, error: "generic" }, { status: 500 });
  }
}

async function saveSnapshot(
  uid: number,
  types: Map<string, string>,
  values: Record<string, string | number | boolean>,
  action: SnapshotAction,
): Promise<number> {
  const now = odooDatetime(new Date());
  const [existing] = await odooExecuteKw<{ id: number; share_count?: number }[]>(
    uid,
    CALCULATOR_ESTIMATE_MODEL,
    "search_read",
    [[["reference", "=", values.reference]]],
    { fields: types.has("share_count") ? ["share_count"] : ["id"], limit: 1 },
  );

  // A reference belongs to one set of inputs, so a repeat share keeps the
  // first values and only records the new action.
  const activity = pickExistingCustomFields(
    { [ACTION_FLAG[action]]: true, share_count: (existing?.share_count ?? 0) + 1 },
    types,
  );
  if (types.has("last_shared_at")) activity.last_shared_at = now;

  if (existing) {
    await odooExecuteKw(uid, CALCULATOR_ESTIMATE_MODEL, "write", [[existing.id], activity]);
    return existing.id;
  }
  if (types.has("first_shared_at")) activity.first_shared_at = now;
  return odooExecuteKw<number>(uid, CALCULATOR_ESTIMATE_MODEL, "create", [
    { ...pickExistingCustomFields(values, types), ...activity },
  ]);
}

async function getEstimateFieldTypes(uid: number): Promise<Map<string, string> | null> {
  if (fieldTypesCache && fieldTypesCache.expiresAt > Date.now()) return fieldTypesCache.types;
  let types: Map<string, string> | null;
  try {
    const fields = await odooExecuteKw<Record<string, { type?: string }>>(uid, CALCULATOR_ESTIMATE_MODEL, "fields_get", [], {
      attributes: ["type"],
    });
    types = new Map(Object.entries(fields).flatMap(([name, info]) => (info?.type ? [[name, info.type]] : [])));
  } catch (error) {
    console.error(`Calculator snapshot: ${CALCULATOR_ESTIMATE_MODEL} unavailable, nothing saved:`, describeOdooError(error));
    types = null;
  }
  // A failure is asked again after a minute, not ten - it may only be a hiccup.
  fieldTypesCache = { types, expiresAt: Date.now() + (types ? FIELD_TYPES_TTL_MS : 60 * 1000) };
  return types;
}
