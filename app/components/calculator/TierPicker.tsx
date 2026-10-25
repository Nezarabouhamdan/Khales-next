"use client";

import type { CalculatorDict } from "@/dictionaries/types";
import { FINISH_TIERS, type FinishTier } from "@/lib/calculator/types";
import ChoiceCard from "./ChoiceCard";
import { FinishingStars } from "./icons";

type TierPickerProps = {
  dictionary: CalculatorDict;
  value: FinishTier;
  onChange: (tier: FinishTier) => void;
};

export default function TierPicker({ dictionary, value, onChange }: TierPickerProps) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-widest text-neutral-400 mb-4">{dictionary.tierLabel}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {FINISH_TIERS.map((tier) => (
          <ChoiceCard
            key={tier}
            active={value === tier}
            onClick={() => onChange(tier)}
            label={dictionary.tiers[tier].name}
            note={dictionary.tiers[tier].description}
            icon={<FinishingStars tier={tier} />}
          />
        ))}
      </div>
    </div>
  );
}
