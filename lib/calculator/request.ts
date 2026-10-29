// Shape and validation of a calculator service request ("I want to design
// my home" / "Review my home budget") - the only thing that ever creates an
// Odoo lead - and of the estimate snapshot saved when the card is shared or
// the PDF downloaded. Viewing a result never sends either.
// Parsing lives here (not in the route) so it stays unit-testable.

import { COUNTRY_PHONE, cityBelongsTo, isCityId } from "@/data/calculatorMarkets";
import {
  ROOM_CONFIG,
  OTHER_ROOMS_CONFIG,
  EXTRA_ROOMS_CONFIG,
  ARCHITECTURAL_STYLES,
  PARKING_OPTIONS,
  ROOM_DIMENSION_LIMITS,
} from "@/data/villaCalculator";
import {
  validateEstimateInputs,
  type EstimateInputs,
  type EstimateOutcome,
  type FamilyPlanSelections,
} from "./engine";
import { isValidReference } from "./reference";
import {
  COUNTRY_CODES,
  FINISH_TIERS,
  FLOORS_OPTIONS,
  INPUT_MODES,
  LAND_STATUSES,
  PREFERRED_CONTACTS,
  REQUEST_TYPES,
  REVIEW_GOALS,
  SPECIAL_ITEMS,
  START_TIMINGS,
  type CountryCode,
  type EstimateMode,
  type InputMode,
  type PreferredContact,
  type RequestType,
  type ReviewGoal,
  type StartTiming,
} from "./types";

// Khales' official contact channels (same as the site footer / CTA).
export { KHALES_WHATSAPP_NUMBER } from "@/lib/whatsapp";
export const KHALES_EMAIL = "info@khales.ae";

export const CALCULATOR_SOURCE = "website_calculator_v2";
export const CALCULATOR_VERSION = "v2.0";

export type CalculatorRequestPayload = {
  requestType: RequestType;
  reference: string;
  lang: "en" | "ar";
  inputMode: InputMode;
  // Exactly one of these is set: `estimate` for the area / budget paths,
  // `familyPlan` for the family-plan path. Country, city and land status
  // come from it, so the request always matches the result it came from.
  estimate: EstimateInputs | null;
  familyPlan: FamilyPlanSelections | null;
  startTiming: StartTiming;
  hasPlanOrContractorQuote: boolean;
  // Budget review only.
  reviewGoal: ReviewGoal | null;
  preferredContact: PreferredContact;
  // All optional except email when preferredContact is "email".
  firstName: string;
  email: string;
  phone: string;
  // Consent to be contacted about this request - required. Marketing
  // consent is a separate, optional, unticked-by-default box.
  contactConsent: boolean;
  marketingConsent: boolean;
  // Spam signals, same scheme as the contact form (see lib/spam.ts).
  website: string;
  elapsedMs: number;
};

/** What the request form is opened from - the result (or family plan) it belongs to. */
export type RequestContext =
  | { inputMode: EstimateMode; estimate: EstimateInputs; outcome: EstimateOutcome; reference: string }
  | { inputMode: "family_plan"; familyPlan: FamilyPlanSelections; indicativeAreaSqm: number; reference: string };

export type RequestValidationError =
  | "request_type"
  | "reference"
  | "inputs"
  | "timing"
  | "review_goal"
  | "contact"
  | "name"
  | "email"
  | "phone"
  | "consent";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  const email = value.trim();
  return email.length <= 120 && EMAIL_PATTERN.test(email);
}

/** First name is optional; when given it must look like a name. */
export function isValidFirstName(value: string): boolean {
  const name = value.trim();
  if (name === "") return true;
  return name.length >= 2 && name.length <= 60 && !/\d/.test(name) && !/https?:|www\./i.test(name);
}

/**
 * Format check only (digits and length for the selected country, or any
 * +international number) - it does not prove the number is real, and the
 * UI must never say it was verified. Returns +E.164-style or null.
 */
export function normalizePhone(raw: string, country: CountryCode): string | null {
  let value = raw.trim().replace(/[\s\-().]/g, "");
  if (value === "") return null;
  if (value.startsWith("00")) value = `+${value.slice(2)}`;
  const { dial, nationalLength } = COUNTRY_PHONE[country];

  if (value.startsWith("+")) {
    const digits = value.slice(1);
    if (!/^\d{7,15}$/.test(digits)) return null;
    if (digits.startsWith(dial)) return digits.length === dial.length + nationalLength ? `+${digits}` : null;
    return `+${digits}`;
  }
  if (!/^\d+$/.test(value)) return null;
  if (value.startsWith(dial) && value.length === dial.length + nationalLength) return `+${value}`;
  const national = value.startsWith("0") ? value.slice(1) : value;
  return national.length === nationalLength ? `+${dial}${national}` : null;
}

function oneOf<T extends string>(list: readonly T[], value: unknown): value is T {
  return typeof value === "string" && (list as readonly string[]).includes(value);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function parseSpecialItems(value: unknown): EstimateInputs["specialItems"] | null {
  if (!Array.isArray(value) || value.length > SPECIAL_ITEMS.length) return null;
  if (!value.every((item) => oneOf(SPECIAL_ITEMS, item))) return null;
  return Array.from(new Set(value));
}

function parseEstimate(value: unknown, mode: "area" | "budget"): EstimateInputs | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Record<string, unknown>;
  if (!oneOf(COUNTRY_CODES, v.country) || !isCityId(v.city) || !cityBelongsTo(v.city, v.country)) return null;
  if (!oneOf(LAND_STATUSES, v.landStatus) || !oneOf(FINISH_TIERS, v.tier)) return null;
  if (v.unit !== "m2" && v.unit !== "sqft") return null;
  if (v.floors !== null && !oneOf(FLOORS_OPTIONS, v.floors)) return null;
  const specialItems = parseSpecialItems(v.specialItems);
  if (!specialItems) return null;
  const inputs: EstimateInputs = {
    country: v.country,
    city: v.city,
    landStatus: v.landStatus,
    tier: v.tier,
    unit: v.unit,
    area: mode === "area" && isFiniteNumber(v.area) ? v.area : null,
    budget: mode === "budget" && isFiniteNumber(v.budget) ? v.budget : null,
    floors: v.floors as EstimateInputs["floors"],
    specialItems,
  };
  return validateEstimateInputs(mode, inputs) === null ? inputs : null;
}

function parseFamilyPlan(value: unknown): FamilyPlanSelections | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Record<string, unknown>;
  if (!oneOf(COUNTRY_CODES, v.country) || !isCityId(v.city) || !cityBelongsTo(v.city, v.country)) return null;
  if (!oneOf(LAND_STATUSES, v.landStatus) || !oneOf(FINISH_TIERS, v.tier)) return null;
  if (!oneOf(ARCHITECTURAL_STYLES, v.style)) return null;
  if (v.floors !== null && !oneOf(FLOORS_OPTIONS, v.floors)) return null;
  if (!PARKING_OPTIONS.includes(v.parking as number)) return null;
  const specialItems = parseSpecialItems(v.specialItems);
  if (!specialItems) return null;

  const rooms = v.rooms as Record<string, unknown> | undefined;
  if (!rooms || typeof rooms !== "object") return null;
  const parsedRooms = {} as FamilyPlanSelections["rooms"];
  for (const room of ROOM_CONFIG) {
    const selection = rooms[room.id] as { count?: unknown; details?: unknown } | undefined;
    if (!selection || !room.counts.includes(selection.count as number) || !Array.isArray(selection.details)) return null;
    const count = selection.count as number;
    const details = selection.details.slice(0, count).map((detail) => {
      const d = detail as Record<string, unknown>;
      const w = d?.w;
      const l = d?.l;
      if (
        !isFiniteNumber(w) ||
        !isFiniteNumber(l) ||
        w < ROOM_DIMENSION_LIMITS.min ||
        w > ROOM_DIMENSION_LIMITS.max ||
        l < ROOM_DIMENSION_LIMITS.min ||
        l > ROOM_DIMENSION_LIMITS.max
      ) {
        return null;
      }
      return { w, l, bath: room.hasBath && d.bath === true, dressing: room.hasDressing && d.dressing === true };
    });
    if (details.length !== count || details.some((detail) => detail === null)) return null;
    parsedRooms[room.id] = { count, details: details as FamilyPlanSelections["rooms"][typeof room.id]["details"] };
  }

  const otherRooms = v.otherRooms as Record<string, unknown> | undefined;
  const extraRooms = v.extraRooms as Record<string, unknown> | undefined;
  if (!otherRooms || typeof otherRooms !== "object" || !extraRooms || typeof extraRooms !== "object") return null;

  return {
    country: v.country,
    city: v.city,
    landStatus: v.landStatus,
    style: v.style,
    tier: v.tier,
    rooms: parsedRooms,
    otherRooms: OTHER_ROOMS_CONFIG.reduce(
      (acc, room) => ({ ...acc, [room.id]: otherRooms[room.id] === true }),
      {} as FamilyPlanSelections["otherRooms"],
    ),
    extraRooms: EXTRA_ROOMS_CONFIG.reduce(
      (acc, room) => ({ ...acc, [room.id]: extraRooms[room.id] === true }),
      {} as FamilyPlanSelections["extraRooms"],
    ),
    specialItems,
    floors: v.floors as FamilyPlanSelections["floors"],
    parking: v.parking as number,
  };
}

/**
 * Validates an untrusted request body. Estimate numbers are never taken
 * from the client - the API recomputes them from these inputs.
 */
export function parseCalculatorRequest(
  body: unknown,
): { ok: true; value: CalculatorRequestPayload } | { ok: false; error: RequestValidationError } {
  if (!body || typeof body !== "object") return { ok: false, error: "inputs" };
  const b = body as Record<string, unknown>;

  if (!oneOf(REQUEST_TYPES, b.requestType)) return { ok: false, error: "request_type" };
  if (!isValidReference(b.reference)) return { ok: false, error: "reference" };
  if (!oneOf(INPUT_MODES, b.inputMode)) return { ok: false, error: "inputs" };

  const estimate = b.inputMode === "family_plan" ? null : parseEstimate(b.estimate, b.inputMode);
  const familyPlan = b.inputMode === "family_plan" ? parseFamilyPlan(b.familyPlan) : null;
  if (b.inputMode === "family_plan" ? !familyPlan : !estimate) return { ok: false, error: "inputs" };

  if (!oneOf(START_TIMINGS, b.startTiming)) return { ok: false, error: "timing" };
  const reviewGoal = b.requestType === "budget_review" ? b.reviewGoal : null;
  if (b.requestType === "budget_review" && !oneOf(REVIEW_GOALS, reviewGoal)) return { ok: false, error: "review_goal" };
  if (!oneOf(PREFERRED_CONTACTS, b.preferredContact)) return { ok: false, error: "contact" };

  const firstName = typeof b.firstName === "string" ? b.firstName.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const phone = typeof b.phone === "string" ? b.phone.trim() : "";
  if (!isValidFirstName(firstName)) return { ok: false, error: "name" };
  if (b.preferredContact === "email" ? !isValidEmail(email) : email !== "" && !isValidEmail(email)) {
    return { ok: false, error: "email" };
  }
  const country = (estimate ?? familyPlan)!.country;
  if (phone !== "" && !normalizePhone(phone, country)) return { ok: false, error: "phone" };
  if (b.contactConsent !== true) return { ok: false, error: "consent" };

  return {
    ok: true,
    value: {
      requestType: b.requestType,
      reference: b.reference,
      lang: b.lang === "ar" ? "ar" : "en",
      inputMode: b.inputMode,
      estimate,
      familyPlan,
      startTiming: b.startTiming,
      hasPlanOrContractorQuote: b.hasPlanOrContractorQuote === true,
      reviewGoal: reviewGoal as ReviewGoal | null,
      preferredContact: b.preferredContact,
      firstName,
      email,
      phone,
      contactConsent: true,
      marketingConsent: b.marketingConsent === true,
      website: typeof b.website === "string" ? b.website : "",
      elapsedMs: isFiniteNumber(b.elapsedMs) ? b.elapsedMs : -1,
    },
  };
}

// ---------------------------------------------------------------------------
// Estimate snapshot (result viewed / share card / PDF)
// ---------------------------------------------------------------------------

export const SNAPSHOT_ACTIONS = ["view", "card", "pdf"] as const;
export type SnapshotAction = (typeof SNAPSHOT_ACTIONS)[number];

// Sent when a result is shown, and again when the visitor shares the card or
// downloads the PDF, so the team sees every estimate and can look one up by
// its reference if the visitor later quotes it. No personal data: the
// visitor hasn't given any at this point.
export type CalculatorSnapshotPayload = {
  reference: string;
  lang: "en" | "ar";
  inputMode: EstimateMode;
  estimate: EstimateInputs;
  action: SnapshotAction;
};

/** Validates an untrusted snapshot body. As with requests, the numbers are recomputed by the API. */
export function parseCalculatorSnapshot(body: unknown): CalculatorSnapshotPayload | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  if (!isValidReference(b.reference)) return null;
  if (b.inputMode !== "area" && b.inputMode !== "budget") return null;
  if (!oneOf(SNAPSHOT_ACTIONS, b.action)) return null;
  const estimate = parseEstimate(b.estimate, b.inputMode);
  if (!estimate) return null;
  return {
    reference: b.reference,
    lang: b.lang === "ar" ? "ar" : "en",
    inputMode: b.inputMode,
    estimate,
    action: b.action,
  };
}

// ---------------------------------------------------------------------------
// WhatsApp / email hand-off
// ---------------------------------------------------------------------------

export type HandoffTemplates = {
  designIntro: string;
  reviewIntro: string;
  referenceLabel: string;
  locationLabel: string;
  areaOrBudgetLabel: string;
  tierLabel: string;
};

/**
 * The prepared message, e.g.
 *   Hello Khales, I'd like to request a design for my family home.
 *   Estimate reference: K-7F3Q9C
 *   Country / city: Dubai, UAE
 *   ...
 * Opening the link only pre-fills WhatsApp - nothing is sent until the
 * visitor presses send, and the UI must say so.
 */
export function composeHandoffMessage(
  t: HandoffTemplates,
  parts: { requestType: RequestType; reference: string; location: string; areaOrBudget: string | null; tier: string | null },
): string {
  const lines = [
    parts.requestType === "design" ? t.designIntro : t.reviewIntro,
    `${t.referenceLabel}: ${parts.reference}`,
    `${t.locationLabel}: ${parts.location}`,
  ];
  if (parts.areaOrBudget) lines.push(`${t.areaOrBudgetLabel}: ${parts.areaOrBudget}`);
  if (parts.tier) lines.push(`${t.tierLabel}: ${parts.tier}`);
  return lines.join("\n");
}

export { whatsappHref as whatsappUrl } from "@/lib/whatsapp";

export function mailtoUrl(subject: string, message: string): string {
  return `mailto:${KHALES_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}
