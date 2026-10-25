// Countries and the cities / emirates / governorates the calculator offers
// for each. Picking a city only routes the request and labels the result -
// it never changes the building rate unless the rates file documents a
// reference for that exact city (see data/calculator-rates.v1.json).
// Display names live in the dictionaries (calculator.countries / .cities).

import type { CountryCode } from "@/lib/calculator/types";

export const MARKET_CITIES = {
  AE: [
    "ae_dubai",
    "ae_abu_dhabi",
    "ae_sharjah",
    "ae_ajman",
    "ae_umm_al_quwain",
    "ae_ras_al_khaimah",
    "ae_fujairah",
    "ae_al_ain",
    "ae_other",
  ],
  SA: [
    "sa_riyadh",
    "sa_jeddah",
    "sa_makkah",
    "sa_madinah",
    "sa_dammam",
    "sa_khobar",
    "sa_al_ahsa",
    "sa_qassim",
    "sa_taif",
    "sa_abha",
    "sa_tabuk",
    "sa_hail",
    "sa_jazan",
    "sa_najran",
    "sa_other",
  ],
  QA: [
    "qa_doha",
    "qa_al_rayyan",
    "qa_al_wakrah",
    "qa_al_khor",
    "qa_umm_salal",
    "qa_al_daayen",
    "qa_al_shamal",
    "qa_al_shahaniya",
    "qa_other",
  ],
  OM: [
    "om_muscat",
    "om_dhofar",
    "om_north_batinah",
    "om_south_batinah",
    "om_dakhiliyah",
    "om_north_sharqiyah",
    "om_south_sharqiyah",
    "om_dhahirah",
    "om_buraimi",
    "om_wusta",
    "om_musandam",
    "om_other",
  ],
  KW: ["kw_capital", "kw_hawalli", "kw_farwaniya", "kw_mubarak_al_kabeer", "kw_ahmadi", "kw_jahra", "kw_other"],
  BH: ["bh_capital", "bh_muharraq", "bh_northern", "bh_southern", "bh_other"],
} as const satisfies Record<CountryCode, readonly string[]>;

export type CityId = (typeof MARKET_CITIES)[CountryCode][number];

export const ALL_CITY_IDS: readonly CityId[] = Object.values(MARKET_CITIES).flat();

// Order the country picker shows them in - priced markets first.
export const COUNTRY_ORDER: readonly CountryCode[] = ["AE", "SA", "QA", "OM", "KW", "BH"];

export const DEFAULT_COUNTRY: CountryCode = "AE";
export const DEFAULT_CITY: CityId = "ae_dubai";

export function isCityId(value: unknown): value is CityId {
  return typeof value === "string" && (ALL_CITY_IDS as readonly string[]).includes(value);
}

export function cityBelongsTo(city: CityId, country: CountryCode): boolean {
  return (MARKET_CITIES[country] as readonly string[]).includes(city);
}

// "<country>_other" means the visitor hasn't settled on a city yet.
export function isUndecidedCity(city: CityId | null): boolean {
  return city === null || city.endsWith("_other");
}

// International dialing codes and national (subscriber) number lengths,
// used only for a format check on the optional phone field - never
// described to the visitor as verification.
export const COUNTRY_PHONE: Record<CountryCode, { dial: string; nationalLength: number }> = {
  AE: { dial: "971", nationalLength: 9 },
  SA: { dial: "966", nationalLength: 9 },
  QA: { dial: "974", nationalLength: 8 },
  OM: { dial: "968", nationalLength: 8 },
  KW: { dial: "965", nationalLength: 8 },
  BH: { dial: "973", nationalLength: 8 },
};
