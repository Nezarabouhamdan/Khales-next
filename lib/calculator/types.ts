// Shared calculator v2 types. Kept free of React and of the rates JSON
// itself so the engine, the API routes and the UI all agree on one shape.

export const COUNTRY_CODES = ["AE", "SA", "QA", "OM", "KW", "BH"] as const;
export type CountryCode = (typeof COUNTRY_CODES)[number];

export const CURRENCY_CODES = ["AED", "SAR", "QAR", "OMR", "KWD", "BHD"] as const;
export type CurrencyCode = (typeof CURRENCY_CODES)[number];

export const FINISH_TIERS = ["practical", "family", "premium"] as const;
export type FinishTier = (typeof FINISH_TIERS)[number];

export const CONFIDENCE_LEVELS = ["medium", "medium_low", "low", "very_low"] as const;
export type Confidence = (typeof CONFIDENCE_LEVELS)[number];

export const VAT_MODES = [
  "not_included_or_unconfirmed",
  "verify_on_contractor_invoice",
  "not_assumed",
  "5_percent_verify",
  "no_vat_currently_reported_verify",
  "10_percent_verify",
] as const;
export type VatMode = (typeof VAT_MODES)[number];

export const MATERIAL_SIGNAL_TYPES = [
  "construction_cost_index",
  "tender_price_forecast",
  "producer_price_index",
  "consumer_price_index",
  "wholesale_price_index",
] as const;
export type MaterialSignalType = (typeof MATERIAL_SIGNAL_TYPES)[number];

// How the selected city relates to the evidence behind the numbers:
// - direct_city: the city itself has a published reference (Dubai, Doha)
// - country_reference: another city's reference in the same country, shown
//   with a "needs local partner calibration" label (other emirates, Qatar
//   outside Doha)
// - national_benchmark: one national range, never a city price (Saudi)
// - partner_review: no number at all (Oman, Kuwait, Bahrain)
export type MarketMode = "direct_city" | "country_reference" | "national_benchmark" | "partner_review";

export const INPUT_MODES = ["area", "budget", "family_plan"] as const;
export type InputMode = (typeof INPUT_MODES)[number];
export type EstimateMode = Exclude<InputMode, "family_plan">;

export type AreaUnit = "m2" | "sqft";

export const LAND_STATUSES = ["owned", "grant_or_allocation", "no_land_yet"] as const;
export type LandStatus = (typeof LAND_STATUSES)[number];

export const START_TIMINGS = ["within_3_months", "3_to_6_months", "over_6_months"] as const;
export type StartTiming = (typeof START_TIMINGS)[number];

// Items that are always priced separately by a local quote - never a
// fixed amount and never a blanket multiplier on the per-m² rate.
export const SPECIAL_ITEMS = ["basement", "pool", "elevator", "annex", "external_works"] as const;
export type SpecialItemId = (typeof SPECIAL_ITEMS)[number];

export const FLOORS_OPTIONS = ["1", "2", "3", "4_plus"] as const;
export type FloorsOption = (typeof FLOORS_OPTIONS)[number];

export const REQUEST_TYPES = ["design", "budget_review"] as const;
export type RequestType = (typeof REQUEST_TYPES)[number];

export const PREFERRED_CONTACTS = ["whatsapp", "email"] as const;
export type PreferredContact = (typeof PREFERRED_CONTACTS)[number];

// Budget-review triage: does the visitor want their cost range reviewed,
// or are they really after a design?
export const REVIEW_GOALS = ["cost_review", "design_request"] as const;
export type ReviewGoal = (typeof REVIEW_GOALS)[number];

export type RateBand = { low: number; expected: number; high: number };

export type MaterialSignal = {
  type: MaterialSignalType;
  label_en: string;
  label_ar: string;
  // "YYYY", "YYYY-Qn" or "YYYY-MM"
  period: string;
};

export type MarketRecord = {
  country: CountryCode;
  market: string;
  currency: CurrencyCode;
  active: "pilot" | "partner_review_only";
  coverage: "city" | "national";
  // The city the numbers were published for (coverage "city" only).
  reference_city: string | null;
  confidence: Confidence;
  tier_confidence?: Partial<Record<FinishTier, Confidence>>;
  rates: Record<FinishTier, RateBand> | null;
  // "YYYY", "YYYY-Qn" or "YYYY-MM-DD"
  anchor_date: string | null;
  tier_anchor_date?: Partial<Record<FinishTier, string>>;
  vat_mode: VatMode;
  note_ar: string;
  note_en: string;
  region_factor_note_ar: string;
  region_factor_note_en: string;
  material_signals: MaterialSignal[];
};

export type RatesFile = {
  meta: {
    version: string;
    name_ar: string;
    name_en: string;
    // Date the rates file itself was issued ("YYYY-MM-DD") - shown as the
    // pricing source date, separate from each market's anchor date.
    as_of: string;
    unit: "local_currency_per_built_sqm";
    scope: "building_only";
    purpose_ar: string;
    purpose_en: string;
    default_region_factor: number;
    region_factor_policy_ar: string;
    region_factor_policy_en: string;
    source: string;
  };
  markets: MarketRecord[];
};
