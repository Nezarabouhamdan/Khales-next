"use client";

import type { CalculatorDict } from "@/dictionaries/types";
import { SPECIAL_ITEMS, type SpecialItemId } from "@/lib/calculator/types";
import ChoiceCard from "./ChoiceCard";
import { SPECIAL_ITEM_ICONS } from "./icons";

type SpecialItemsPickerProps = {
  dictionary: CalculatorDict;
  value: SpecialItemId[];
  onChange: (next: SpecialItemId[]) => void;
};

// Pool, basement, elevator, annex, external works: selecting one never adds
// a fixed amount or extra area - it's flagged on the result and saved with
// any request as "needs special pricing / local partner review".
export default function SpecialItemsPicker({ dictionary, value, onChange }: SpecialItemsPickerProps) {
  const toggle = (item: SpecialItemId) =>
    onChange(value.includes(item) ? value.filter((selected) => selected !== item) : [...value, item]);

  return (
    <div>
      <h3 className="text-sm font-semibold text-neutral-800 mb-2">
        {dictionary.specialItemsLabel} <span className="normal-case tracking-normal">{dictionary.optional}</span>
      </h3>
      <p className="text-sm text-neutral-600 mb-4 max-w-xl">{dictionary.specialItemsHint}</p>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {SPECIAL_ITEMS.map((item) => (
          <ChoiceCard
            key={item}
            active={value.includes(item)}
            onClick={() => toggle(item)}
            label={dictionary.specialItems[item]}
            icon={SPECIAL_ITEM_ICONS[item]}
          />
        ))}
      </div>
    </div>
  );
}
