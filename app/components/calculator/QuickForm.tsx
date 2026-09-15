"use client";

import { motion } from "framer-motion";
import { FaRulerCombined } from "react-icons/fa";
import type { CalculatorDict } from "@/dictionaries/types";
import type { QuickSelections } from "@/lib/calculator/pricing";
import type { LocationId, FinishingLevel } from "@/data/villaCalculator";
import ChoiceCard from "./ChoiceCard";
import { LOCATION_ICONS, FinishingStars } from "./icons";

type QuickFormProps = {
  dictionary: CalculatorDict;
  selections: QuickSelections;
  onChange: (next: QuickSelections) => void;
  onBack: () => void;
  onShowResult: () => void;
};

const LOCATIONS: LocationId[] = [
  "dubai",
  "abu_dhabi",
  "sharjah",
  "ajman",
  "umm_al_quwain",
  "ras_al_khaimah",
  "fujairah",
  "al_ain",
];
const FINISHINGS: FinishingLevel[] = ["standard", "medium", "high"];

export default function QuickForm({ dictionary, selections, onChange, onBack, onShowResult }: QuickFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8 text-start">
        <h1 className="font-semibold tracking-tight text-2xl md:text-3xl mb-2">{dictionary.quickTitle}</h1>
        <p className="text-neutral-500 max-w-xl">{dictionary.quickDescription}</p>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.15)]">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#66a109]/10 text-[#66a109] text-lg">
            <FaRulerCombined />
          </span>
          <h3 className="text-xs uppercase tracking-widest text-neutral-400">{dictionary.projectDetails}</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-neutral-600">{dictionary.totalBUA}</span>
            <input
              type="number"
              min={0}
              value={selections.bua}
              onChange={(e) => onChange({ ...selections, bua: parseFloat(e.target.value) || 0 })}
              className="rounded-lg border border-neutral-300 px-4 py-3 text-lg focus:border-[#66a109] focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-neutral-600">{dictionary.areaUnit}</span>
            <select
              value={selections.unit}
              onChange={(e) => onChange({ ...selections, unit: e.target.value as "m2" | "sqft" })}
              className="rounded-lg border border-neutral-300 px-4 py-3 text-lg focus:border-[#66a109] focus:outline-none"
            >
              <option value="m2">{dictionary.units.m2}</option>
              <option value="sqft">{dictionary.units.sqft}</option>
            </select>
          </label>
        </div>

        <h3 className="text-xs uppercase tracking-widest text-neutral-400 mb-4">{dictionary.location}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {LOCATIONS.map((loc) => (
            <ChoiceCard
              key={loc}
              active={selections.location === loc}
              onClick={() => onChange({ ...selections, location: loc })}
              label={dictionary.locations[loc]}
              icon={LOCATION_ICONS[loc]}
            />
          ))}
        </div>

        <h3 className="text-xs uppercase tracking-widest text-neutral-400 mb-4">
          {dictionary.finishingLevel}
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {FINISHINGS.map((level) => (
            <ChoiceCard
              key={level}
              active={selections.finishing === level}
              onClick={() => onChange({ ...selections, finishing: level })}
              label={dictionary.finishings[level]}
              icon={<FinishingStars level={level} />}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse gap-4 mt-8 pt-8 border-t border-neutral-200">
        <button
          type="button"
          onClick={onShowResult}
          className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-[#66a109] text-white text-sm font-semibold uppercase tracking-widest hover:bg-[#5a8f08] transition-colors shadow-[0_10px_25px_-8px_rgba(102,161,9,0.5)]"
        >
          {dictionary.showResult}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full md:w-auto px-8 py-3.5 rounded-xl text-neutral-500 text-sm font-semibold uppercase tracking-widest hover:bg-neutral-100 transition-colors"
        >
          {dictionary.back}
        </button>
      </div>
    </motion.div>
  );
}
