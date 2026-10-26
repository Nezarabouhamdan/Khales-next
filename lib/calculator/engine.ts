// Calculator v2 engine - pure functions shared by the UI and the request
// API, so the numbers a visitor sees and the numbers saved to Odoo come
// from the same code. No React, no fetch, no Date.now().
//
// Area path:    range = built area x [low, high]; planning figure = area x expected
// Budget path:  conservative area = budget / high, reference = budget / expected,
//               maximum = budget / low
// The band is the market's rate x the city's factor from the rates file
// (UAE emirates only; every other city is 1). Nothing else is added: no
// markup, no hidden contingency, no consultant percentage, no external
// works, no fixed price for a pool / basement / elevator. Those are listed
// as exclusions instead.

import {
  ROOM_CONFIG,
  OTHER_ROOMS_CONFIG,
  EXTRA_ROOMS_CONFIG,
  PLAN_AREA_FACTORS,
  type ArchitecturalStyle,
  type RoomId,
  type OtherRoomId,
  type ExtraRoomId,
} from "@/data/villaCalculator";
import { MARKET_CITIES, DEFAULT_COUNTRY, DEFAULT_CITY, cityBelongsTo, isUndecidedCity, type CityId } from "@/data/calculatorMarkets";
import type {
  AreaUnit,
  Confidence,
  CountryCode,
  CurrencyCode,
  EstimateMode,
  FinishTier,
  FloorsOption,
  LandStatus,
  MarketMode,
  MarketRecord,
  MaterialSignal,
  RateBand,
  RatesFile,
  SpecialItemId,
  StartTiming,
  VatMode,
} from "./types";

export const SQFT_PER_SQM = 10.7639;

// Hard input bounds (anything outside is a typo, not a villa) and the
// softer "unusual size" band outside which the result carries a
// local-review note instead of any percentage adjustment.
export const AREA_LIMITS_SQM = { min: 20, max: 50000 } as const;
export const BUDGET_LIMITS = { min: 1, max: 10_000_000_000 } as const;
export const UNUSUAL_SIZE_SQM = { min: 150, max: 2000 } as const;

export function toSqm(value: number, unit: AreaUnit): number {
  return unit === "sqft" ? value / SQFT_PER_SQM : value;
}

export function fromSqm(sqm: number, unit: AreaUnit): number {
  return unit === "sqft" ? sqm * SQFT_PER_SQM : sqm;
}

export function isUnusualSize(sqm: number): boolean {
  return sqm < UNUSUAL_SIZE_SQM.min || sqm > UNUSUAL_SIZE_SQM.max;
}

export function getMarket(rates: RatesFile, country: CountryCode): MarketRecord {
  const market = rates.markets.find((m) => m.country === country);
  // validateRatesFile guarantees every country is present.
  if (!market) throw new Error(`No market configured for ${country}`);
  return market;
}

type PricingBase = {
  country: CountryCode;
  city: CityId;
  currency: CurrencyCode;
  vatMode: VatMode;
  // Date of the rates file itself (meta.as_of) - the "pricing source date".
  pricingSourceDate: string;
  // The city's factor from market.city_factors, else
  // meta.default_region_factor (1.00). Already multiplied into `band`.
  regionFactor: number;
  materialSignals: MaterialSignal[];
  market: MarketRecord;
};

export type PricedContext = PricingBase & {
  kind: "priced";
  tier: FinishTier;
  band: RateBand;
  confidence: Confidence;
  anchorDate: string;
  marketMode: Exclude<MarketMode, "partner_review">;
  // The city whose published reference the numbers come from (Dubai,
  // Doha), or null for a national benchmark.
  referenceCity: CityId | null;
  hasDirectEvidence: boolean;
};

export type PartnerReviewContext = PricingBase & {
  kind: "partner_review";
  confidence: Confidence;
  marketMode: "partner_review";
};

export type PricingContext = PricedContext | PartnerReviewContext;

export function resolvePricing(rates: RatesFile, country: CountryCode, city: CityId, tier: FinishTier): PricingContext {
  const market = getMarket(rates, country);
  const base: PricingBase = {
    country,
    city,
    currency: market.currency,
    vatMode: market.vat_mode,
    pricingSourceDate: rates.meta.as_of,
    regionFactor: market.city_factors?.[city] ?? rates.meta.default_region_factor,
    materialSignals: market.material_signals ?? [],
    market,
  };

  if (market.active !== "pilot" || !market.rates || !market.anchor_date) {
    return { ...base, kind: "partner_review", confidence: market.confidence, marketMode: "partner_review" };
  }

  const referenceCity = market.coverage === "city" ? (market.reference_city as CityId) : null;
  const marketMode: PricedContext["marketMode"] =
    market.coverage === "national" ? "national_benchmark" : city === referenceCity ? "direct_city" : "country_reference";

  const rate = market.rates[tier];
  const factor = base.regionFactor;
  return {
    ...base,
    kind: "priced",
    tier,
    band: { low: rate.low * factor, expected: rate.expected * factor, high: rate.high * factor },
    confidence: market.tier_confidence?.[tier] ?? market.confidence,
    anchorDate: market.tier_anchor_date?.[tier] ?? market.anchor_date,
    marketMode,
    referenceCity,
    hasDirectEvidence: marketMode === "direct_city",
  };
}

// ---------------------------------------------------------------------------
// Area / budget estimate
// ---------------------------------------------------------------------------

export type EstimateInputs = {
  country: CountryCode;
  city: CityId | null;
  landStatus: LandStatus | null;
  tier: FinishTier;
  unit: AreaUnit;
  // In `unit` (area path only).
  area: number | null;
  // In the selected country's currency (budget path only).
  budget: number | null;
  floors: FloorsOption | null;
  specialItems: SpecialItemId[];
};

export function getInitialEstimateInputs(): EstimateInputs {
  return {
    country: DEFAULT_COUNTRY,
    city: DEFAULT_CITY,
    landStatus: null,
    tier: "family",
    unit: "m2",
    area: null,
    budget: null,
    floors: null,
    specialItems: [],
  };
}

export type EstimateInputError = "city" | "land" | "area" | "budget";

/** First invalid field for the given path, or null when the inputs can be estimated. */
export function validateEstimateInputs(mode: EstimateMode, inputs: EstimateInputs): EstimateInputError | null {
  if (!inputs.city || !cityBelongsTo(inputs.city, inputs.country)) return "city";
  if (!inputs.landStatus) return "land";
  if (mode === "area") {
    const area = inputs.area;
    if (area === null || !Number.isFinite(area)) return "area";
    const sqm = toSqm(area, inputs.unit);
    if (sqm < AREA_LIMITS_SQM.min || sqm > AREA_LIMITS_SQM.max) return "area";
  } else {
    const budget = inputs.budget;
    if (budget === null || !Number.isFinite(budget) || budget < BUDGET_LIMITS.min || budget > BUDGET_LIMITS.max) {
      return "budget";
    }
  }
  return null;
}

export type AreaEstimate = {
  kind: "area";
  pricing: PricedContext;
  areaSqm: number;
  low: number;
  expected: number;
  high: number;
  unusualSize: boolean;
};

export type BudgetEstimate = {
  kind: "budget";
  pricing: PricedContext;
  budget: number;
  // Area the budget may cover at the high / expected / low rate.
  conservativeSqm: number;
  referenceSqm: number;
  maximumSqm: number;
  unusualSize: boolean;
};

export type PartnerReviewEstimate = {
  kind: "partner_review";
  mode: EstimateMode;
  pricing: PartnerReviewContext;
  areaSqm: number | null;
  budget: number | null;
};

export type EstimateOutcome = AreaEstimate | BudgetEstimate | PartnerReviewEstimate;

/** Assumes validateEstimateInputs(mode, inputs) returned null. */
export function computeEstimate(rates: RatesFile, mode: EstimateMode, inputs: EstimateInputs): EstimateOutcome {
  const city = inputs.city ?? (MARKET_CITIES[inputs.country][0] as CityId);
  const pricing = resolvePricing(rates, inputs.country, city, inputs.tier);
  const areaSqm = mode === "area" && inputs.area !== null ? toSqm(inputs.area, inputs.unit) : null;
  const budget = mode === "budget" ? inputs.budget : null;

  if (pricing.kind === "partner_review") {
    return { kind: "partner_review", mode, pricing, areaSqm, budget };
  }

  const { band } = pricing;
  if (mode === "area") {
    const sqm = areaSqm ?? 0;
    return {
      kind: "area",
      pricing,
      areaSqm: sqm,
      low: sqm * band.low,
      expected: sqm * band.expected,
      high: sqm * band.high,
      unusualSize: isUnusualSize(sqm),
    };
  }

  const amount = budget ?? 0;
  const referenceSqm = amount / band.expected;
  return {
    kind: "budget",
    pricing,
    budget: amount,
    conservativeSqm: amount / band.high,
    referenceSqm,
    maximumSqm: amount / band.low,
    unusualSize: isUnusualSize(referenceSqm),
  };
}

// ---------------------------------------------------------------------------
// Family home plan (no cost - an indicative program area only)
// ---------------------------------------------------------------------------

export type RoomDetail = { w: number; l: number; bath: boolean; dressing: boolean };
export type RoomSelection = { count: number; details: RoomDetail[] };

export type FamilyPlanSelections = {
  country: CountryCode;
  city: CityId | null;
  landStatus: LandStatus | null;
  style: ArchitecturalStyle;
  tier: FinishTier;
  rooms: Record<RoomId, RoomSelection>;
  otherRooms: Record<OtherRoomId, boolean>;
  extraRooms: Record<ExtraRoomId, boolean>;
  specialItems: SpecialItemId[];
  floors: FloorsOption | null;
  parking: number;
};

export function initializeRoomsState(): Record<RoomId, RoomSelection> {
  const state = {} as Record<RoomId, RoomSelection>;
  ROOM_CONFIG.forEach((room) => {
    const maxCount = Math.max(...room.counts, 0);
    state[room.id] = {
      count: room.default,
      details: Array.from({ length: maxCount + 1 }, () => ({ w: room.w, l: room.l, bath: false, dressing: false })),
    };
  });
  return state;
}

export function getInitialFamilyPlan(): FamilyPlanSelections {
  return {
    country: DEFAULT_COUNTRY,
    city: DEFAULT_CITY,
    landStatus: null,
    style: "modern",
    tier: "family",
    rooms: initializeRoomsState(),
    otherRooms: OTHER_ROOMS_CONFIG.reduce(
      (acc, room) => ({ ...acc, [room.id]: false }),
      {} as Record<OtherRoomId, boolean>,
    ),
    extraRooms: EXTRA_ROOMS_CONFIG.reduce(
      (acc, room) => ({ ...acc, [room.id]: false }),
      {} as Record<ExtraRoomId, boolean>,
    ),
    specialItems: [],
    floors: null,
    parking: 2,
  };
}

/**
 * Indicative built area implied by the family's room program: net room
 * areas (+ en-suite bathrooms / dressing rooms) x circulation. Office,
 * cinema and gym count once as rooms; pool, elevator and basement add no
 * area (the old automatic +35% basement uplift is gone).
 */
export function estimateFamilyPlanAreaSqm(plan: FamilyPlanSelections): number {
  let core = 0;
  ROOM_CONFIG.forEach((room) => {
    const selection = plan.rooms[room.id];
    if (!selection) return;
    for (let i = 0; i < selection.count; i++) {
      const detail = selection.details[i];
      if (!detail) continue;
      core += (detail.w || 0) * (detail.l || 0);
      if (room.hasBath && detail.bath) core += PLAN_AREA_FACTORS.bathroom_sqm;
      if (room.hasDressing && detail.dressing) core += PLAN_AREA_FACTORS.dressing_room_sqm;
    }
  });
  OTHER_ROOMS_CONFIG.forEach((room) => {
    if (plan.otherRooms[room.id]) core += room.area;
  });
  EXTRA_ROOMS_CONFIG.forEach((room) => {
    if (plan.extraRooms[room.id]) core += room.area;
  });
  return core * PLAN_AREA_FACTORS.circulation_multiplier;
}

/** Selected extra rooms + special items - everything that needs its own pricing. */
export function familyPlanSpecialPricingItems(plan: FamilyPlanSelections): (SpecialItemId | ExtraRoomId)[] {
  const extras = EXTRA_ROOMS_CONFIG.filter((room) => plan.extraRooms[room.id]).map((room) => room.id);
  return [...plan.specialItems, ...extras];
}

// ---------------------------------------------------------------------------
// Planning checklist ("start readiness") - a planning aid, never a verdict
// ---------------------------------------------------------------------------

export type ReadinessItemId = "land" | "city" | "target" | "design_timing" | "contractor_quote";
export type ReadinessAnswers = { designWithin6Months: boolean | null; hasContractorQuote: boolean | null };
export type ReadinessItem = { id: ReadinessItemId; state: "yes" | "no" | "unanswered"; answerable: boolean };

export const INITIAL_READINESS: ReadinessAnswers = { designWithin6Months: null, hasContractorQuote: null };

export function readinessItems(input: {
  landStatus: LandStatus | null;
  city: CityId | null;
  hasTarget: boolean;
  answers: ReadinessAnswers;
}): ReadinessItem[] {
  const answered = (value: boolean | null): ReadinessItem["state"] =>
    value === null ? "unanswered" : value ? "yes" : "no";
  return [
    {
      id: "land",
      state: input.landStatus === null ? "unanswered" : input.landStatus === "no_land_yet" ? "no" : "yes",
      answerable: false,
    },
    { id: "city", state: isUndecidedCity(input.city) ? "no" : "yes", answerable: false },
    { id: "target", state: input.hasTarget ? "yes" : "no", answerable: false },
    { id: "design_timing", state: answered(input.answers.designWithin6Months), answerable: true },
    { id: "contractor_quote", state: answered(input.answers.hasContractorQuote), answerable: true },
  ];
}

// ---------------------------------------------------------------------------
// Lead score for Odoo prioritisation (0-3, mirrors crm.lead priority stars)
// ---------------------------------------------------------------------------

/**
 * One point each for: land owned or granted, starting within 6 months, and
 * a clear area / budget or an existing plan / contractor quote. Used only to
 * order the team's review list - never shown to the visitor.
 */
export function computeLeadScore(input: {
  landStatus: LandStatus;
  startTiming: StartTiming;
  hasAreaOrBudget: boolean;
  hasPlanOrQuote: boolean;
}): 0 | 1 | 2 | 3 {
  let score = 0;
  if (input.landStatus === "owned" || input.landStatus === "grant_or_allocation") score++;
  if (input.startTiming === "within_3_months" || input.startTiming === "3_to_6_months") score++;
  if (input.hasAreaOrBudget || input.hasPlanOrQuote) score++;
  return score as 0 | 1 | 2 | 3;
}
