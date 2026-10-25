"use client";

import type { CalculatorDict } from "@/dictionaries/types";
import { COUNTRY_ORDER, MARKET_CITIES, isCityId, type CityId } from "@/data/calculatorMarkets";
import { CALCULATOR_RATES } from "@/lib/calculator/rates";
import { getMarket } from "@/lib/calculator/engine";
import { LAND_STATUSES, type CountryCode, type LandStatus } from "@/lib/calculator/types";
import ChoiceCard from "./ChoiceCard";
import { LAND_STATUS_ICONS } from "./icons";

export type LocationValue = { country: CountryCode; city: CityId | null; landStatus: LandStatus | null };

type LocationFieldsProps = {
  dictionary: CalculatorDict;
  value: LocationValue;
  onChange: (next: LocationValue) => void;
  errors?: { city?: boolean; land?: boolean };
  // The family plan never deals in money, so it hides the currency codes.
  showCurrency?: boolean;
};

const labelText = "text-sm font-semibold text-neutral-800";
const sectionTitle = `${labelText} mb-4`;

// Country -> city/emirate/governorate -> land status. Shared by the area,
// budget and family-plan paths. The currency shown on each country card is
// the one every amount for that country is entered and shown in.
export default function LocationFields({ dictionary, value, onChange, errors, showCurrency = true }: LocationFieldsProps) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className={sectionTitle}>{dictionary.countryLabel}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {COUNTRY_ORDER.map((country) => {
            const market = getMarket(CALCULATOR_RATES, country);
            return (
              <ChoiceCard
                key={country}
                active={value.country === country}
                onClick={() => {
                  if (value.country !== country) onChange({ ...value, country, city: null });
                }}
                label={dictionary.countries[country]}
                icon={
                  showCurrency ? (
                    <span className="text-[11px] font-bold tracking-wide">{dictionary.currencies[market.currency]}</span>
                  ) : undefined
                }
                note={market.active === "partner_review_only" ? dictionary.countryPartnerBadge : undefined}
              />
            );
          })}
        </div>
      </div>

      <label className="flex flex-col gap-2 max-w-md">
        <span className={labelText}>{dictionary.cityLabel}</span>
        <select
          value={value.city ?? ""}
          onChange={(e) => onChange({ ...value, city: isCityId(e.target.value) ? e.target.value : null })}
          aria-invalid={errors?.city || undefined}
          className={`rounded-lg border px-4 py-3 text-base bg-white focus:border-[#66a109] focus:outline-none ${
            errors?.city ? "border-red-400" : "border-neutral-300"
          }`}
        >
          <option value="" disabled>
            {dictionary.cityPlaceholder}
          </option>
          {MARKET_CITIES[value.country].map((city) => (
            <option key={city} value={city}>
              {dictionary.cities[city]}
            </option>
          ))}
        </select>
        {errors?.city && <span className="text-sm text-red-500">{dictionary.inputErrors.city}</span>}
      </label>

      <div>
        <h3 className={sectionTitle}>{dictionary.landStatusLabel}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {LAND_STATUSES.map((status) => (
            <ChoiceCard
              key={status}
              active={value.landStatus === status}
              onClick={() => onChange({ ...value, landStatus: status })}
              label={dictionary.landStatuses[status]}
              icon={LAND_STATUS_ICONS[status]}
            />
          ))}
        </div>
        {errors?.land && <p className="mt-2 text-sm text-red-500">{dictionary.inputErrors.land}</p>}
      </div>
    </div>
  );
}
