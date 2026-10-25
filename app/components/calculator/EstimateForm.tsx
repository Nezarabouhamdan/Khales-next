"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { motion } from "framer-motion";
import type { CalculatorDict } from "@/dictionaries/types";
import {
  fromSqm,
  getMarket,
  toSqm,
  validateEstimateInputs,
  type EstimateInputError,
  type EstimateInputs,
} from "@/lib/calculator/engine";
import { fillTemplate, formatNumber } from "@/lib/calculator/format";
import { CALCULATOR_RATES } from "@/lib/calculator/rates";
import { FLOORS_OPTIONS, type AreaUnit, type EstimateMode } from "@/lib/calculator/types";
import LocationFields from "./LocationFields";
import TierPicker from "./TierPicker";
import SpecialItemsPicker from "./SpecialItemsPicker";

type EstimateFormProps = {
  dictionary: CalculatorDict;
  mode: EstimateMode;
  value: EstimateInputs;
  onChange: (next: EstimateInputs) => void;
  onBack: () => void;
  onSubmit: () => void;
};

const AREA_UNITS: readonly AreaUnit[] = ["m2", "sqft"];

const labelText = "text-sm font-semibold text-neutral-800";
const section = "py-10 first:pt-0 last:pb-0";
const controlBase = "h-14 w-full rounded-lg border bg-white px-4 text-lg focus:border-[#66a109] focus:outline-none";

const ARABIC_INDIC_ZERO = 0x0660; // ٠
const PERSIAN_ZERO = 0x06f0; // ۰

/**
 * What the visitor typed -> a number, or null when it's empty or not a
 * number (never a silent 0). Arabic-Indic (٠-٩) and Persian (۰-۹) digits
 * become 0-9, the Arabic decimal mark (٫) becomes ".", and thousands
 * separators and spaces are dropped, so "2,000,000" and "٢٬٠٠٠٬٠٠٠" both
 * read as 2000000.
 */
function parseNumberInput(raw: string): number | null {
  const normalized = raw
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - ARABIC_INDIC_ZERO))
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - PERSIAN_ZERO))
    .replace(/٫/g, ".")
    .replace(/[\s,'’٬،]/g, "");
  if (!/^(\d+\.?\d*|\.\d+)$/.test(normalized)) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

// Field text for a number that didn't come from typing (a prefilled area,
// "edit inputs", a unit change).
function numberToText(value: number | null): string {
  return value === null ? "" : String(Math.round(value * 100) / 100);
}

// Converts the area when the unit changes so it keeps its meaning: whole
// square feet, square metres to 0.1 (so 5,000 sqft -> 464.5 m² -> 5,000 sqft).
function convertArea(area: number, from: AreaUnit, to: AreaUnit): number {
  const converted = fromSqm(toSqm(area, from), to);
  return to === "sqft" ? Math.round(converted) : Math.round(converted * 10) / 10;
}

// Area / budget path inputs: location, the area (or budget, in the selected
// country's currency), finish level, house type, floors and special items.
// Purely local - nothing is sent anywhere; the parent computes the result
// once onSubmit fires, which only happens when the inputs validate.
export default function EstimateForm({ dictionary, mode, value, onChange, onBack, onSubmit }: EstimateFormProps) {
  const idPrefix = useId();
  const amountId = `${idPrefix}-amount`;
  const unitId = `${idPrefix}-unit`;
  const hintId = `${idPrefix}-hint`;
  const echoId = `${idPrefix}-echo`;
  const errorId = `${idPrefix}-error`;
  const floorsId = `${idPrefix}-floors`;

  const locationRef = useRef<HTMLDivElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  // Messages appear only after the first "show result"; from then on they
  // follow the inputs, so fixing a field clears its message straight away.
  const [attempted, setAttempted] = useState(false);
  const error = attempted ? validateEstimateInputs(mode, value) : null;
  const amountInvalid = error === mode;

  // The visitor's own text ("2,000,000", "٥٠٠") stays in the field as typed.
  // When the stored number changes from outside (prefill, restored state)
  // the field shows that number instead.
  const amount = mode === "area" ? value.area : value.budget;
  const [amountText, setAmountText] = useState(() => numberToText(amount));
  const shownText = parseNumberInput(amountText) === amount ? amountText : numberToText(amount);

  const currencyLabel = dictionary.currencies[getMarket(CALCULATOR_RATES, value.country).currency];
  // Read-back under the budget field, so 2000000 shows as "2,000,000 AED".
  const budgetEcho =
    mode === "budget" && value.budget !== null ? `${formatNumber(value.budget)} ${currencyLabel}` : null;
  const describedBy = [amountInvalid ? errorId : null, budgetEcho ? echoId : null, hintId].filter(Boolean).join(" ");

  const handleAmountChange = (text: string) => {
    setAmountText(text);
    const parsed = parseNumberInput(text);
    onChange(mode === "area" ? { ...value, area: parsed } : { ...value, budget: parsed });
  };

  const handleUnitChange = (unit: AreaUnit) => {
    if (unit === value.unit) return;
    const area = value.area === null ? null : convertArea(value.area, value.unit, unit);
    if (area !== null) setAmountText(numberToText(area));
    onChange({ ...value, unit, area });
  };

  // Brings the first invalid field into view - centred, clear of the fixed
  // site header - and focuses it when it's a single control.
  const revealField = (field: EstimateInputError) => {
    const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth";
    if (field === "area" || field === "budget") {
      amountRef.current?.scrollIntoView({ behavior, block: "center" });
      amountRef.current?.focus({ preventScroll: true });
      return;
    }
    const location = locationRef.current;
    if (!location) return;
    const citySelect = field === "city" ? location.querySelector("select") : null;
    if (citySelect) {
      citySelect.scrollIntoView({ behavior, block: "center" });
      citySelect.focus({ preventScroll: true });
    } else {
      // Land status is the last block of LocationFields, with its message
      // right under it - line up the bottom of the block with the screen's.
      location.scrollIntoView({ behavior, block: "end" });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const firstError = validateEstimateInputs(mode, value);
    if (!firstError) {
      onSubmit();
      return;
    }
    // Render the message first so the scroll lands with it in view.
    flushSync(() => setAttempted(true));
    revealField(firstError);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8 text-start">
        <h2 className="font-semibold tracking-tight text-2xl md:text-3xl mb-2">
          {mode === "area" ? dictionary.areaFormTitle : dictionary.budgetFormTitle}
        </h2>
        <p className="text-neutral-600 max-w-xl">
          {mode === "area" ? dictionary.areaFormDescription : dictionary.budgetFormDescription}
        </p>
      </div>

      <form noValidate onSubmit={handleSubmit}>
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.15)] divide-y divide-neutral-100">
          <div ref={locationRef} className={section}>
            <LocationFields
              dictionary={dictionary}
              value={{ country: value.country, city: value.city, landStatus: value.landStatus }}
              onChange={(next) =>
                onChange({ ...value, country: next.country, city: next.city, landStatus: next.landStatus })
              }
              errors={{ city: error === "city", land: error === "land" }}
            />
          </div>

          <div className={section}>
            {mode === "area" ? (
              <div className="flex flex-col gap-3 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor={amountId} className={labelText}>
                      {dictionary.areaLabel}
                    </label>
                    <input
                      ref={amountRef}
                      id={amountId}
                      type="text"
                      inputMode="decimal"
                      autoComplete="off"
                      dir="ltr"
                      value={shownText}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      aria-invalid={amountInvalid || undefined}
                      aria-describedby={describedBy}
                      className={`${controlBase} rtl:text-right ${amountInvalid ? "border-red-400" : "border-neutral-300"}`}
                    />
                    {amountInvalid && (
                      <p id={errorId} className="text-sm text-red-500">
                        {dictionary.inputErrors.area}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor={unitId} className={labelText}>
                      {dictionary.unitLabel}
                    </label>
                    <select
                      id={unitId}
                      value={value.unit}
                      onChange={(e) => {
                        const unit = AREA_UNITS.find((option) => option === e.target.value);
                        if (unit) handleUnitChange(unit);
                      }}
                      className={`${controlBase} border-neutral-300`}
                    >
                      {AREA_UNITS.map((unit) => (
                        <option key={unit} value={unit}>
                          {dictionary.units[unit]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <p id={hintId} className="text-sm text-neutral-600">
                  {dictionary.areaHint}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2 max-w-md">
                <label htmlFor={amountId} className={labelText}>
                  {fillTemplate(dictionary.budgetLabel, { currency: currencyLabel })}
                </label>
                <input
                  ref={amountRef}
                  id={amountId}
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  dir="ltr"
                  value={shownText}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  aria-invalid={amountInvalid || undefined}
                  aria-describedby={describedBy}
                  className={`${controlBase} rtl:text-right ${amountInvalid ? "border-red-400" : "border-neutral-300"}`}
                />
                {budgetEcho && (
                  <p id={echoId} className="font-semibold text-neutral-800">
                    {budgetEcho}
                  </p>
                )}
                {amountInvalid && (
                  <p id={errorId} className="text-sm text-red-500">
                    {dictionary.inputErrors.budget}
                  </p>
                )}
                <p id={hintId} className="text-sm text-neutral-600">
                  {dictionary.budgetHint}
                </p>
              </div>
            )}
          </div>

          <div className={section}>
            <TierPicker dictionary={dictionary} value={value.tier} onChange={(tier) => onChange({ ...value, tier })} />
          </div>

          <div className={`${section} flex flex-col gap-8`}>
            {/* Family villa is the only house type in v1 - shown, not chosen. */}
            <p className="text-sm text-neutral-600">
              {dictionary.houseTypeLabel}:{" "}
              <span className="font-semibold text-neutral-800">{dictionary.houseTypeFamilyVilla}</span>
            </p>

            <div role="group" aria-labelledby={floorsId}>
              <h3 id={floorsId} className={`${labelText} mb-4`}>
                {dictionary.floorsLabel} <span className="normal-case tracking-normal">{dictionary.optional}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {FLOORS_OPTIONS.map((option) => {
                  const active = value.floors === option;
                  return (
                    <motion.button
                      key={option}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      // Optional: tapping the selected chip again clears it.
                      onClick={() => onChange({ ...value, floors: active ? null : option })}
                      aria-pressed={active}
                      className={`min-h-11 min-w-11 rounded-full border px-5 text-sm font-semibold transition-colors ${
                        active
                          ? "border-[#66a109] bg-[#66a109] text-white shadow-[0_6px_16px_-4px_rgba(102,161,9,0.5)]"
                          : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-900"
                      }`}
                    >
                      {dictionary.floors[option]}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={section}>
            <SpecialItemsPicker
              dictionary={dictionary}
              value={value.specialItems}
              onChange={(specialItems) => onChange({ ...value, specialItems })}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse gap-4 mt-8 pt-8 border-t border-neutral-200">
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-[#66a109] text-white text-sm font-semibold uppercase tracking-widest rtl:tracking-normal hover:bg-[#5a8f08] transition-colors shadow-[0_10px_25px_-8px_rgba(102,161,9,0.5)]"
          >
            {dictionary.showResult}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="w-full md:w-auto px-8 py-3.5 rounded-xl text-neutral-600 text-sm font-semibold uppercase tracking-widest rtl:tracking-normal hover:bg-neutral-100 transition-colors"
          >
            {dictionary.back}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
