// Maps a calculator v2 service request ("I want to design my home" /
// "Review my home budget") onto the crm.lead the team works from. Pure - no
// Odoo calls - so the whole mapping reads in one place;
// app/api/calculator/request/route.ts does the round-trips.
//
// The plain-text description always carries everything. The x_calc_*
// custom fields are a structured copy for filters and reports: the route
// writes only the ones that exist in Odoo (fields_get), so a field the
// admin hasn't created yet never blocks a lead.
// scripts/create-odoo-calculator-fields.mjs creates them from a copy of
// CALCULATOR_ODOO_FIELDS - keep the two lists in sync.

import { dictionary as en } from "@/dictionaries/en";
import { MARKET_CITIES, type CityId } from "@/data/calculatorMarkets";
import { EXTRA_ROOMS_CONFIG, OTHER_ROOMS_CONFIG, ROOM_CONFIG, type ExtraRoomId } from "@/data/villaCalculator";
import { escapeHtml } from "@/lib/spam";
import {
  familyPlanSpecialPricingItems,
  resolvePricing,
  type AreaEstimate,
  type BudgetEstimate,
  type EstimateInputs,
  type EstimateOutcome,
  type FamilyPlanSelections,
} from "./engine";
import { formatArea, formatMoney, formatNumber, roundMoney } from "./format";
import { CALCULATOR_RATES } from "./rates";
import {
  CALCULATOR_SOURCE,
  CALCULATOR_VERSION,
  normalizePhone,
  type CalculatorRequestPayload,
  type RequestContext,
} from "./request";
import { SPECIAL_ITEMS, type RequestType, type SpecialItemId } from "./types";

/** Every calculator v2 lead's name starts with this - /api/leads/count counts on it. */
export const CALCULATOR_LEAD_NAME_PREFIX = "Calculator v2 -";
export const CALCULATOR_LEAD_SOURCE = "Website Calculator v2";
export const CALCULATOR_LEAD_TAG = "Calculator v2";

export const REQUEST_TYPE_LABELS: Record<RequestType, string> = {
  design: "Design request",
  budget_review: "Budget review",
};

export type OdooFieldType = "char" | "text" | "float" | "integer" | "boolean";

// Custom crm.lead fields; `label` is the field's description in Odoo.
// Codes (AE, ae_dubai, family, owned...) rather than display names, so
// filters keep working when the copy changes - the description has names.
export const CALCULATOR_ODOO_FIELDS = [
  { name: "x_calc_reference", type: "char", label: "Calculator reference" },
  { name: "x_calc_version", type: "char", label: "Calculator version" },
  { name: "x_calc_source", type: "char", label: "Calculator source" },
  { name: "x_calc_request_type", type: "char", label: "Calculator request type" },
  { name: "x_calc_country", type: "char", label: "Calculator country" },
  { name: "x_calc_city", type: "char", label: "Calculator city" },
  { name: "x_calc_market_mode", type: "char", label: "Calculator market mode" },
  { name: "x_calc_market_confidence", type: "char", label: "Calculator market confidence" },
  { name: "x_calc_pricing_source_date", type: "char", label: "Calculator pricing source date" },
  { name: "x_calc_anchor_date", type: "char", label: "Calculator price anchor date" },
  { name: "x_calc_input_mode", type: "char", label: "Calculator input mode" },
  { name: "x_calc_built_area_sqm", type: "float", label: "Calculator built area (m²)" },
  { name: "x_calc_budget", type: "float", label: "Calculator budget" },
  { name: "x_calc_currency", type: "char", label: "Calculator currency" },
  { name: "x_calc_finish_level", type: "char", label: "Calculator finish level" },
  { name: "x_calc_result_low", type: "float", label: "Calculator result low" },
  { name: "x_calc_result_expected", type: "float", label: "Calculator result expected" },
  { name: "x_calc_result_high", type: "float", label: "Calculator result high" },
  { name: "x_calc_area_conservative_sqm", type: "float", label: "Calculator conservative area (m²)" },
  { name: "x_calc_area_reference_sqm", type: "float", label: "Calculator reference area (m²)" },
  { name: "x_calc_area_max_sqm", type: "float", label: "Calculator maximum area (m²)" },
  { name: "x_calc_special_items", type: "char", label: "Calculator special items" },
  { name: "x_calc_land_status", type: "char", label: "Calculator land status" },
  { name: "x_calc_start_timing", type: "char", label: "Calculator start timing" },
  { name: "x_calc_has_plan_or_quote", type: "boolean", label: "Calculator has plan or contractor quote" },
  { name: "x_calc_review_goal", type: "char", label: "Calculator review goal" },
  { name: "x_calc_preferred_contact", type: "char", label: "Calculator preferred contact" },
  { name: "x_calc_contact_consent", type: "boolean", label: "Calculator contact consent" },
  { name: "x_calc_marketing_consent", type: "boolean", label: "Calculator marketing consent" },
  { name: "x_calc_lead_score", type: "integer", label: "Calculator lead score" },
  { name: "x_calc_floors", type: "char", label: "Calculator floors" },
  { name: "x_calc_family_plan", type: "text", label: "Calculator family plan" },
  { name: "x_calc_lang", type: "char", label: "Calculator language" },
  { name: "x_calc_created_at", type: "char", label: "Calculator created at" },
] as const satisfies readonly { name: `x_calc_${string}`; type: OdooFieldType; label: string }[];

type CalculatorOdooField = (typeof CALCULATOR_ODOO_FIELDS)[number];
type FieldValue<T extends OdooFieldType> = T extends "boolean" ? boolean : T extends "float" | "integer" ? number : string;

export type CalculatorFieldName = CalculatorOdooField["name"];
export type CalculatorCustomFields = { [F in CalculatorOdooField as F["name"]]?: FieldValue<F["type"]> };

export type CalculatorLeadInput = {
  payload: CalculatorRequestPayload;
  // Rebuilt by the API from the payload's inputs - never the client's numbers.
  context: RequestContext;
  leadScore: 0 | 1 | 2 | 3;
  createdAt: Date;
};

export type CalculatorLead = {
  name: string;
  // Standard crm.lead fields; source_id and tag_ids are looked up by name.
  standard: { contact_name?: string; email_from?: string; phone?: string; description: string; priority: string };
  sourceName: string;
  tagNames: string[];
  customFields: CalculatorCustomFields;
};

// The description is for the team, so it's always in English whatever
// language the visitor used.
const t = en.calculator;
const oneDecimal = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
const twoDecimals = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

const coded = (label: string, code: string) => `${label} (${code})`;
const yesNo = (value: boolean) => (value ? "yes" : "no");
const listOrNone = (items: string[]) => (items.length > 0 ? items.join(", ") : "none");
// Floored, as the visitor saw them (formatArea never overstates an area).
const sqmText = (sqm: number) => formatArea(sqm, "m2", t.unitSymbols.m2);
const sqftText = (sqm: number) => formatArea(sqm, "sqft", t.unitSymbols.sqft);

function itemName(item: SpecialItemId | ExtraRoomId): string {
  return (SPECIAL_ITEMS as readonly string[]).includes(item)
    ? t.specialItems[item as SpecialItemId]
    : t.extraRoomNames[item as ExtraRoomId];
}

type ResultPart = { lines: string[]; fields: CalculatorCustomFields };

function estimateResult(estimate: EstimateInputs, outcome: EstimateOutcome): ResultPart {
  const money = (value: number) => formatMoney(value, outcome.pricing.currency);
  // The visitor's own number when they typed square feet; m² is what the
  // team (and the engine) works in.
  const builtArea = (sqm: number) =>
    estimate.unit === "sqft" && estimate.area !== null
      ? `${oneDecimal.format(sqm)} ${t.unitSymbols.m2} (entered as ${formatNumber(estimate.area)} ${t.unitSymbols.sqft})`
      : `${oneDecimal.format(sqm)} ${t.unitSymbols.m2} (${sqftText(sqm)})`;
  const preciseSqm = (sqm: number) => Math.round(sqm * 100) / 100;

  switch (outcome.kind) {
    case "area":
      return {
        lines: [
          `Built area: ${builtArea(outcome.areaSqm)}`,
          `Building range: low ${money(outcome.low)} / expected ${money(outcome.expected)} / high ${money(outcome.high)}`,
        ],
        fields: {
          x_calc_built_area_sqm: preciseSqm(outcome.areaSqm),
          x_calc_result_low: roundMoney(outcome.low),
          x_calc_result_expected: roundMoney(outcome.expected),
          x_calc_result_high: roundMoney(outcome.high),
        },
      };
    case "budget":
      return {
        lines: [
          `Budget: ${money(outcome.budget)}`,
          `Built area that may fit (building only, before excluded items): conservative ${sqmText(
            outcome.conservativeSqm,
          )} / reference ${sqmText(outcome.referenceSqm)} / maximum ${sqmText(outcome.maximumSqm)}`,
        ],
        fields: {
          x_calc_budget: outcome.budget,
          x_calc_area_conservative_sqm: Math.floor(outcome.conservativeSqm),
          x_calc_area_reference_sqm: Math.floor(outcome.referenceSqm),
          x_calc_area_max_sqm: Math.floor(outcome.maximumSqm),
        },
      };
    case "partner_review": {
      const lines: string[] = [];
      if (outcome.areaSqm !== null) lines.push(`Built area: ${builtArea(outcome.areaSqm)}`);
      if (outcome.budget !== null) lines.push(`Budget: ${money(outcome.budget)}`);
      lines.push("Result: no number shown - this market gets a local partner estimate");
      return {
        lines,
        fields: {
          x_calc_built_area_sqm: outcome.areaSqm !== null ? preciseSqm(outcome.areaSqm) : undefined,
          x_calc_budget: outcome.budget ?? undefined,
        },
      };
    }
  }
}

/** The family's room program, one fact per line (also stored in x_calc_family_plan). */
function familyPlanProgram(plan: FamilyPlanSelections, indicativeAreaSqm: number): string[] {
  const rooms = ROOM_CONFIG.flatMap((room) => {
    const selection = plan.rooms[room.id];
    if (!selection || selection.count === 0) return [];
    const sizes = selection.details.slice(0, selection.count).map((detail) => {
      const extras: string[] = [];
      if (room.hasBath && detail.bath) extras.push("bathroom");
      if (room.hasDressing && detail.dressing) extras.push("dressing room");
      const size = `${twoDecimals.format(detail.w)} x ${twoDecimals.format(detail.l)} m`;
      return extras.length > 0 ? `${size} + ${extras.join(" + ")}` : size;
    });
    return [`${t.roomNames[room.id]}: ${selection.count} (${sizes.join("; ")})`];
  });
  const services = OTHER_ROOMS_CONFIG.filter((room) => plan.otherRooms[room.id]).map((room) => t.otherRoomNames[room.id]);
  const extraRooms = EXTRA_ROOMS_CONFIG.filter((room) => plan.extraRooms[room.id]).map((room) => t.extraRoomNames[room.id]);
  return [
    ...rooms,
    `Service rooms: ${listOrNone(services)}`,
    `Extra rooms (priced separately): ${listOrNone(extraRooms)}`,
    `Parking spaces: ${plan.parking}`,
    `Floors: ${plan.floors ? t.floors[plan.floors] : "not specified"}`,
    `Style: ${t.styles[plan.style]}`,
    `Indicative built area: ${sqmText(indicativeAreaSqm)} (${sqftText(indicativeAreaSqm)})`,
  ];
}

function familyPlanResult(plan: FamilyPlanSelections, indicativeAreaSqm: number): ResultPart {
  const program = familyPlanProgram(plan, indicativeAreaSqm);
  return {
    lines: ["Family home plan (no cost shown):", ...program.map((line) => `- ${line}`)],
    fields: { x_calc_built_area_sqm: Math.floor(indicativeAreaSqm), x_calc_family_plan: program.join("\n") },
  };
}

function withoutEmpty(fields: CalculatorCustomFields): CalculatorCustomFields {
  return Object.fromEntries(
    Object.entries(fields).filter(([, value]) => value !== undefined && value !== null),
  ) as CalculatorCustomFields;
}

export function buildCalculatorLead({ payload, context, leadScore, createdAt }: CalculatorLeadInput): CalculatorLead {
  const subject = context.inputMode === "family_plan" ? context.familyPlan : context.estimate;
  const { country, landStatus, tier, floors } = subject;
  // parseCalculatorRequest guarantees a city; the fallback only satisfies the type.
  const city = subject.city ?? (MARKET_CITIES[country][0] as CityId);
  const isFamilyPlan = context.inputMode === "family_plan";

  // The family plan shows no price, but its market mode still tells the
  // team whether a priced estimate is possible there later.
  const pricing = isFamilyPlan ? resolvePricing(CALCULATOR_RATES, country, city, tier) : context.outcome.pricing;
  const result = isFamilyPlan
    ? familyPlanResult(context.familyPlan, context.indicativeAreaSqm)
    : estimateResult(context.estimate, context.outcome);
  const specialItems = isFamilyPlan ? familyPlanSpecialPricingItems(context.familyPlan) : context.estimate.specialItems;
  const typeLabel = REQUEST_TYPE_LABELS[payload.requestType];
  const createdAtIso = createdAt.toISOString();

  // No price was shown on the family plan (and its program lists floors).
  const estimateOnlyLines: string[] = [];
  if (!isFamilyPlan) {
    estimateOnlyLines.push(
      pricing.kind === "priced"
        ? `Price anchor date: ${pricing.anchorDate}; pricing source date: ${pricing.pricingSourceDate}`
        : `Pricing source date: ${pricing.pricingSourceDate}`,
      `Floors: ${floors ? t.floors[floors] : "not specified"}`,
    );
  }

  const description = [
    `Request type: ${coded(typeLabel, payload.requestType)}`,
    `Reference: ${payload.reference}`,
    `Calculator: ${CALCULATOR_VERSION} (${CALCULATOR_SOURCE})`,
    `Created at: ${createdAtIso}`,
    `Language: ${payload.lang === "ar" ? "Arabic" : "English"} (${payload.lang})`,
    "",
    `Country / city: ${t.countries[country]} / ${t.cities[city]} (${country} / ${city})`,
    `Market mode: ${pricing.marketMode}, confidence ${pricing.confidence}, region factor ${pricing.regionFactor}`,
    `Input mode: ${coded(t.paths[context.inputMode].title, context.inputMode)}`,
    ...result.lines,
    `Finish level: ${coded(t.tiers[tier].name, tier)}`,
    ...estimateOnlyLines,
    `Special items (need special pricing / local partner review): ${listOrNone(specialItems.map(itemName))}`,
    "",
    `Land status: ${landStatus ? coded(t.landStatuses[landStatus], landStatus) : "not given"}`,
    `Start timing: ${coded(t.startTimings[payload.startTiming], payload.startTiming)}`,
    `Has a plan or contractor quote: ${yesNo(payload.hasPlanOrContractorQuote)}`,
    ...(payload.reviewGoal ? [`Review goal: ${coded(t.reviewGoals[payload.reviewGoal], payload.reviewGoal)}`] : []),
    `Preferred contact: ${coded(t.preferredContacts[payload.preferredContact], payload.preferredContact)}`,
    `Consent to be contacted about this request: ${yesNo(payload.contactConsent)}`,
    `Marketing consent: ${yesNo(payload.marketingConsent)}`,
    `Lead score: ${leadScore}/3`,
  ].join("\n");

  const standard: CalculatorLead["standard"] = { description, priority: String(leadScore) };
  if (payload.firstName) standard.contact_name = payload.firstName;
  if (payload.email) standard.email_from = payload.email;
  const phone = payload.phone ? normalizePhone(payload.phone, country) : null;
  if (phone) standard.phone = phone;

  const customFields = withoutEmpty({
    x_calc_reference: payload.reference,
    x_calc_version: CALCULATOR_VERSION,
    x_calc_source: CALCULATOR_SOURCE,
    x_calc_request_type: payload.requestType,
    x_calc_country: country,
    x_calc_city: city,
    x_calc_market_mode: pricing.marketMode,
    x_calc_market_confidence: pricing.confidence,
    x_calc_pricing_source_date: isFamilyPlan ? undefined : pricing.pricingSourceDate,
    x_calc_anchor_date: !isFamilyPlan && pricing.kind === "priced" ? pricing.anchorDate : undefined,
    x_calc_input_mode: context.inputMode,
    x_calc_currency: pricing.currency,
    x_calc_finish_level: tier,
    x_calc_special_items: specialItems.length > 0 ? specialItems.join(", ") : undefined,
    x_calc_land_status: landStatus ?? undefined,
    x_calc_start_timing: payload.startTiming,
    x_calc_has_plan_or_quote: payload.hasPlanOrContractorQuote,
    x_calc_review_goal: payload.reviewGoal ?? undefined,
    x_calc_preferred_contact: payload.preferredContact,
    x_calc_contact_consent: payload.contactConsent,
    x_calc_marketing_consent: payload.marketingConsent,
    x_calc_lead_score: leadScore,
    x_calc_floors: floors ?? undefined,
    x_calc_lang: payload.lang,
    x_calc_created_at: createdAtIso,
    ...result.fields,
  });

  return {
    name: `${CALCULATOR_LEAD_NAME_PREFIX} ${typeLabel} - ${t.cities[city]} - ${payload.reference}`,
    standard,
    sourceName: CALCULATOR_LEAD_SOURCE,
    tagNames: [CALCULATOR_LEAD_TAG, typeLabel],
    customFields,
  };
}

// ---------------------------------------------------------------------------
// Estimate snapshot (share card / PDF)
// ---------------------------------------------------------------------------

/** Anonymous estimates the team can look up by reference - defined by the kh_crm_calculator Odoo module. */
export const CALCULATOR_ESTIMATE_MODEL = "kh.calculator.estimate";

export type EstimateSnapshotInput = {
  reference: string;
  lang: "en" | "ar";
  estimate: EstimateInputs;
  // Recomputed by the API; only priced results have a card or PDF to share.
  outcome: AreaEstimate | BudgetEstimate;
};

/**
 * The kh.calculator.estimate values for a shared estimate. Field names are
 * the lead's x_calc_* names without the prefix (x_calc_city -> city), plus a
 * plain-text summary; the route adds the share flags and dates.
 */
export function buildEstimateSnapshot({ reference, lang, estimate, outcome }: EstimateSnapshotInput) {
  const { pricing } = outcome;
  const result = estimateResult(estimate, outcome);
  const { country, city, tier, landStatus, floors, specialItems } = estimate;
  const cityId = city ?? pricing.city;

  const summary = [
    `Reference: ${reference}`,
    `Calculator: ${CALCULATOR_VERSION} (${CALCULATOR_SOURCE})`,
    `Language: ${lang === "ar" ? "Arabic" : "English"} (${lang})`,
    "",
    `Country / city: ${t.countries[country]} / ${t.cities[cityId]} (${country} / ${cityId})`,
    `Market mode: ${pricing.marketMode}, confidence ${pricing.confidence}, region factor ${pricing.regionFactor}`,
    `Input mode: ${coded(t.paths[outcome.kind].title, outcome.kind)}`,
    ...result.lines,
    `Finish level: ${coded(t.tiers[tier].name, tier)}`,
    `Price anchor date: ${pricing.anchorDate}; pricing source date: ${pricing.pricingSourceDate}`,
    `Floors: ${floors ? t.floors[floors] : "not specified"}`,
    `Special items (need special pricing / local partner review): ${listOrNone(specialItems.map(itemName))}`,
    `Land status: ${landStatus ? coded(t.landStatuses[landStatus], landStatus) : "not given"}`,
  ].join("\n");

  const fields = withoutEmpty({
    x_calc_reference: reference,
    x_calc_version: CALCULATOR_VERSION,
    x_calc_source: CALCULATOR_SOURCE,
    x_calc_input_mode: outcome.kind,
    x_calc_country: country,
    x_calc_city: cityId,
    x_calc_market_mode: pricing.marketMode,
    x_calc_market_confidence: pricing.confidence,
    x_calc_pricing_source_date: pricing.pricingSourceDate,
    x_calc_anchor_date: pricing.anchorDate,
    x_calc_currency: pricing.currency,
    x_calc_finish_level: tier,
    x_calc_special_items: specialItems.length > 0 ? specialItems.join(", ") : undefined,
    x_calc_land_status: landStatus ?? undefined,
    x_calc_floors: floors ?? undefined,
    x_calc_lang: lang,
    ...result.fields,
  });

  const values: Record<string, string | number | boolean> = { summary };
  for (const [name, value] of Object.entries(fields)) {
    if (value !== undefined) values[name.slice("x_calc_".length)] = value;
  }
  return values;
}

// ---------------------------------------------------------------------------
// Writing to Odoo
// ---------------------------------------------------------------------------

/**
 * The custom fields that exist on crm.lead (name -> Odoo type, from
 * fields_get), each converted to the type it actually has there. A field
 * that's missing, or whose type can't hold the value (a selection, a
 * many2one, a number field for a text value...), is skipped rather than
 * failing the lead - the description has everything anyway.
 */
export function pickExistingCustomFields(
  fields: CalculatorCustomFields | Record<string, string | number | boolean>,
  odooTypes: ReadonlyMap<string, string>,
): Record<string, string | number | boolean> {
  const values: Record<string, string | number | boolean> = {};
  for (const [name, value] of Object.entries(fields) as [string, string | number | boolean | undefined][]) {
    if (value === undefined) continue;
    switch (odooTypes.get(name)) {
      case "char":
      case "text":
      case "html":
        values[name] = String(value);
        break;
      case "float":
      case "monetary":
        if (typeof value === "number") values[name] = value;
        break;
      case "integer":
        if (typeof value === "number") values[name] = Math.round(value);
        break;
      case "boolean":
        if (typeof value === "boolean") values[name] = value;
        break;
    }
  }
  return values;
}

/**
 * crm.lead's description is an HTML field on recent Odoo versions, where
 * plain newlines collapse into one paragraph - keep one fact per line there.
 */
export function plainTextToHtml(text: string): string {
  return text
    .split(/\n{2,}/)
    .map((block) => `<p>${block.split("\n").map(escapeHtml).join("<br>")}</p>`)
    .join("");
}
