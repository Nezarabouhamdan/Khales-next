import ratesJson from "@/data/calculator-rates.v1.json";
import { MARKET_CITIES } from "@/data/calculatorMarkets";
import {
  COUNTRY_CODES,
  CONFIDENCE_LEVELS,
  CURRENCY_CODES,
  FINISH_TIERS,
  MATERIAL_SIGNAL_TYPES,
  VAT_MODES,
  type RatesFile,
} from "./types";

// The rates file is the only place market numbers live. It's validated
// when this module loads, so a typo in the JSON (a missing tier, low >
// high, an unknown VAT mode...) fails `next build` instead of reaching
// visitors as a wrong number.

const ANCHOR_DATE = /^\d{4}(-Q[1-4]|-\d{2}-\d{2})?$/;
const SIGNAL_PERIOD = /^\d{4}(-Q[1-4]|-\d{2})?$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function fail(message: string): never {
  throw new Error(`Invalid calculator rates file: ${message}`);
}

function isPositiveNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

export function validateRatesFile(input: unknown): RatesFile {
  const file = input as RatesFile;
  if (!file || typeof file !== "object" || !file.meta || !Array.isArray(file.markets)) {
    fail("expected { meta, markets }");
  }
  if (!ISO_DATE.test(file.meta.as_of ?? "")) fail(`meta.as_of "${file.meta.as_of}" must be YYYY-MM-DD`);
  if (file.meta.default_region_factor !== 1) {
    fail("meta.default_region_factor must stay 1.0 until a local calibration is documented");
  }

  const seen = new Set<string>();
  for (const market of file.markets) {
    const where = `market ${market.country}`;
    if (!(COUNTRY_CODES as readonly string[]).includes(market.country)) fail(`${where}: unknown country`);
    if (seen.has(market.country)) fail(`${where}: listed twice`);
    seen.add(market.country);

    if (!(CURRENCY_CODES as readonly string[]).includes(market.currency)) fail(`${where}: unknown currency`);
    if (!(CONFIDENCE_LEVELS as readonly string[]).includes(market.confidence)) fail(`${where}: unknown confidence`);
    if (!(VAT_MODES as readonly string[]).includes(market.vat_mode)) fail(`${where}: unknown vat_mode`);
    if (market.coverage !== "city" && market.coverage !== "national") fail(`${where}: coverage must be city or national`);
    if (market.coverage === "city") {
      const cities = MARKET_CITIES[market.country] as readonly string[];
      if (!market.reference_city || !cities.includes(market.reference_city)) {
        fail(`${where}: reference_city must be one of ${market.country}'s cities`);
      }
    }
    for (const [tier, level] of Object.entries(market.tier_confidence ?? {})) {
      if (!(FINISH_TIERS as readonly string[]).includes(tier)) fail(`${where}: tier_confidence has unknown tier ${tier}`);
      if (!(CONFIDENCE_LEVELS as readonly string[]).includes(level)) fail(`${where}: unknown confidence for ${tier}`);
    }
    for (const [city, factor] of Object.entries(market.city_factors ?? {})) {
      const cities = MARKET_CITIES[market.country] as readonly string[];
      if (!cities.includes(city)) fail(`${where}: city_factors has unknown city ${city}`);
      if (!isPositiveNumber(factor) || factor < 0.5 || factor > 1.5) {
        fail(`${where}: city_factors.${city} must be between 0.5 and 1.5`);
      }
      if (city === market.reference_city && factor !== 1) fail(`${where}: the reference city's factor must be 1`);
    }
    for (const signal of market.material_signals ?? []) {
      if (!(MATERIAL_SIGNAL_TYPES as readonly string[]).includes(signal.type)) fail(`${where}: unknown signal type`);
      if (!SIGNAL_PERIOD.test(signal.period)) fail(`${where}: signal period "${signal.period}" is not YYYY, YYYY-Qn or YYYY-MM`);
    }

    if (market.active === "partner_review_only") {
      // Partner-review markets must never carry numbers the UI could leak.
      if (market.rates !== null) fail(`${where}: partner_review_only markets must have rates: null`);
      continue;
    }
    if (market.active !== "pilot") fail(`${where}: active must be pilot or partner_review_only`);
    if (!market.rates) fail(`${where}: pilot markets need rates`);
    if (!market.anchor_date || !ANCHOR_DATE.test(market.anchor_date)) fail(`${where}: anchor_date missing or malformed`);
    for (const [tier, date] of Object.entries(market.tier_anchor_date ?? {})) {
      if (!(FINISH_TIERS as readonly string[]).includes(tier)) fail(`${where}: tier_anchor_date has unknown tier ${tier}`);
      if (!ANCHOR_DATE.test(date)) fail(`${where}: tier_anchor_date.${tier} malformed`);
    }
    for (const tier of FINISH_TIERS) {
      const band = market.rates[tier];
      if (!band || !isPositiveNumber(band.low) || !isPositiveNumber(band.expected) || !isPositiveNumber(band.high)) {
        fail(`${where}: rates.${tier} needs positive low / expected / high`);
      }
      if (!(band.low <= band.expected && band.expected <= band.high)) {
        fail(`${where}: rates.${tier} must satisfy low <= expected <= high`);
      }
    }
  }
  for (const country of COUNTRY_CODES) {
    if (!seen.has(country)) fail(`missing market ${country}`);
  }
  return file;
}

export const CALCULATOR_RATES: RatesFile = validateRatesFile(ratesJson);
