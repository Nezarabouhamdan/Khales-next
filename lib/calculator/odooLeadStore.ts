// Writes calculator leads to Odoo: the service requests
// (app/api/calculator/request) and the anonymous estimates
// (app/api/calculator/snapshot). lib/calculator/odooLead.ts builds the
// values; this file only does the round-trips.

import {
  describeOdooError as describeError,
  odooExecuteKw,
  odooFindOrCreateSource,
  odooSubscribeDefaultFollowers,
} from "@/lib/odoo";
import { pickExistingCustomFields, plainTextToHtml, type CalculatorLead } from "./odooLead";

// Which x_calc_* fields exist on crm.lead (and the description's type),
// cached per server instance so a field the admin adds is picked up within
// ten minutes without a redeploy.
const FIELD_TYPES_TTL_MS = 10 * 60 * 1000;
let fieldTypesCache: { types: Map<string, string>; expiresAt: number } | null = null;

/**
 * Creates the lead, or returns the one that already has its name. Names are
 * unique per request / estimate (they end with the reference), so a double
 * click or a retry after a timeout never creates a second lead.
 */
export async function saveCalculatorLead(
  uid: number,
  lead: CalculatorLead,
  { subscribeFollowers }: { subscribeFollowers: boolean },
): Promise<number> {
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
    // fields_get) mustn't lose the lead - the description has it all.
    console.error("Calculator lead: custom fields rejected, retrying without them:", describeError(error));
    fieldTypesCache = null;
    leadId =
      (await findLeadByName(uid, lead.name)) ??
      (await odooExecuteKw<number>(uid, "crm.lead", "create", [values]));
  }

  if (subscribeFollowers) {
    try {
      await odooSubscribeDefaultFollowers(uid, leadId);
    } catch (error) {
      // The lead exists; a follower hiccup shouldn't turn it into an error.
      console.error("Calculator lead: could not subscribe default followers:", describeError(error));
    }
  }
  return leadId;
}

/** Adds a tag (created by name if needed) to an existing lead, keeping its other tags. */
export async function addLeadTag(uid: number, leadId: number, tagName: string): Promise<void> {
  const tagId = await findOrCreateTag(uid, tagName);
  await odooExecuteKw(uid, "crm.lead", "write", [[leadId], { tag_ids: [[4, tagId]] }]);
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
