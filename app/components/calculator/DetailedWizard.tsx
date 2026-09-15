"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSlidersH, FaBed, FaLayerGroup as StepAddonsIcon, FaGem, FaCheck } from "react-icons/fa";
import type { CalculatorDict } from "@/dictionaries/types";
import type { DetailedSelections } from "@/lib/calculator/pricing";
import {
  ROOM_CONFIG,
  OTHER_ROOMS_CONFIG,
  FIXED_COST_ADDONS_CONFIG,
  PARKING_OPTIONS,
  type LocationId,
  type FinishingLevel,
  type ArchitecturalStyle,
} from "@/data/villaCalculator";
import ChoiceCard from "./ChoiceCard";
import {
  ROOM_ICONS,
  OTHER_ROOM_ICONS,
  FIXED_ADDON_ICONS,
  BasementIcon,
  LOCATION_ICONS,
  STYLE_ICONS,
  ParkingIcon,
  FinishingStars,
} from "./icons";

type DetailedWizardProps = {
  dictionary: CalculatorDict;
  selections: DetailedSelections;
  onChange: (next: DetailedSelections) => void;
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
const STYLES: ArchitecturalStyle[] = ["modern", "neoclassic", "heritage"];
const FINISHINGS: FinishingLevel[] = ["standard", "medium", "high"];

const STEP_COUNT = 5;
const STEP_ICONS = [FaSlidersH, FaBed, StepAddonsIcon, FaGem, ParkingIcon];

function NumberDial({
  value,
  options,
  onSelect,
  size = "w-10 h-10",
}: {
  value: number;
  options: readonly number[];
  onSelect: (n: number) => void;
  size?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((count) => (
        <motion.button
          key={count}
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={() => onSelect(count)}
          className={`${size} rounded-full text-sm font-semibold transition-colors ${
            value === count
              ? "bg-[#66a109] text-white shadow-[0_6px_16px_-4px_rgba(102,161,9,0.5)]"
              : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
          }`}
        >
          {count}
        </motion.button>
      ))}
    </div>
  );
}

export default function DetailedWizard({
  dictionary,
  selections,
  onChange,
  onBack,
  onShowResult,
}: DetailedWizardProps) {
  const [step, setStep] = useState(0);

  const stepTitles = [
    dictionary.basicProperties,
    dictionary.roomsAndSpaces,
    dictionary.addonsAndFacilities,
    dictionary.luxuryAddons,
    dictionary.parking,
  ];

  const goNext = () => setStep((s) => Math.min(s + 1, STEP_COUNT - 1));
  const goBack = () => (step === 0 ? onBack() : setStep((s) => s - 1));

  return (
    <div>
      <div className="mb-10 text-start">
        <h1 className="font-semibold tracking-tight text-2xl md:text-3xl mb-2">
          {dictionary.detailedTitle}
        </h1>
        <p className="text-neutral-500 max-w-xl">{dictionary.detailedDescription}</p>
      </div>

      <div className="flex items-start gap-1 sm:gap-3 mb-10">
        {stepTitles.map((title, index) => {
          const StepIcon = STEP_ICONS[index];
          const isDone = index < step;
          const isActive = index === step;
          return (
            <div key={title} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                <div
                  className={`hidden sm:block h-0.5 flex-1 rounded-full transition-colors ${
                    index === 0 ? "opacity-0" : isDone || isActive ? "bg-[#66a109]" : "bg-neutral-200"
                  }`}
                />
                <span
                  className={`flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border-2 text-sm transition-colors ${
                    isDone
                      ? "border-[#66a109] bg-[#66a109] text-white"
                      : isActive
                        ? "border-[#66a109] bg-white text-[#66a109]"
                        : "border-neutral-200 bg-white text-neutral-300"
                  }`}
                >
                  {isDone ? <FaCheck size={14} /> : <StepIcon size={15} />}
                </span>
                <div
                  className={`hidden sm:block h-0.5 flex-1 rounded-full transition-colors ${
                    index === stepTitles.length - 1 ? "opacity-0" : isDone ? "bg-[#66a109]" : "bg-neutral-200"
                  }`}
                />
              </div>
              <p
                className={`mt-2 text-center text-[9px] sm:text-xs uppercase tracking-widest ${
                  isActive ? "text-neutral-900 font-semibold" : "text-neutral-400"
                }`}
              >
                {title}
              </p>
            </div>
          );
        })}
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.15)] min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <div className="flex flex-col gap-10">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-neutral-400 mb-4">
                    {dictionary.location}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-widest text-neutral-400 mb-4">
                    {dictionary.architecturalStyle}
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {STYLES.map((style) => (
                      <ChoiceCard
                        key={style}
                        active={selections.designStyle === style}
                        onClick={() => onChange({ ...selections, designStyle: style })}
                        label={dictionary.styles[style]}
                        icon={STYLE_ICONS[style]}
                      />
                    ))}
                  </div>
                </div>

                <div>
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
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col gap-8">
                {ROOM_CONFIG.map((room) => {
                  const roomState = selections.rooms[room.id];
                  return (
                    <div key={room.id} className="border-t border-neutral-100 pt-6 first:border-t-0 first:pt-0">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#66a109]/10 text-[#66a109] text-lg">
                          {ROOM_ICONS[room.id]}
                        </span>
                        <h3 className="font-semibold text-lg">{dictionary.roomNames[room.id]}</h3>
                      </div>
                      <div className="mb-4">
                        <NumberDial
                          value={roomState.count}
                          options={room.counts}
                          onSelect={(count) =>
                            onChange({
                              ...selections,
                              rooms: { ...selections.rooms, [room.id]: { ...roomState, count } },
                            })
                          }
                        />
                      </div>

                      {roomState.count > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {Array.from({ length: roomState.count }).map((_, i) => {
                            const detail = roomState.details[i];
                            return (
                              <div key={i} className="rounded-2xl bg-neutral-50 border border-neutral-200 p-4">
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                  <label className="flex flex-col gap-1">
                                    <span className="text-xs text-neutral-500">{dictionary.widthLabel}</span>
                                    <input
                                      type="number"
                                      min={0}
                                      value={detail.w}
                                      onChange={(e) => {
                                        const details = [...roomState.details];
                                        details[i] = { ...detail, w: parseFloat(e.target.value) || 0 };
                                        onChange({
                                          ...selections,
                                          rooms: { ...selections.rooms, [room.id]: { ...roomState, details } },
                                        });
                                      }}
                                      className="rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-[#66a109] focus:outline-none"
                                    />
                                  </label>
                                  <label className="flex flex-col gap-1">
                                    <span className="text-xs text-neutral-500">{dictionary.lengthLabel}</span>
                                    <input
                                      type="number"
                                      min={0}
                                      value={detail.l}
                                      onChange={(e) => {
                                        const details = [...roomState.details];
                                        details[i] = { ...detail, l: parseFloat(e.target.value) || 0 };
                                        onChange({
                                          ...selections,
                                          rooms: { ...selections.rooms, [room.id]: { ...roomState, details } },
                                        });
                                      }}
                                      className="rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-[#66a109] focus:outline-none"
                                    />
                                  </label>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {room.hasBath && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const details = [...roomState.details];
                                        details[i] = { ...detail, bath: !detail.bath };
                                        onChange({
                                          ...selections,
                                          rooms: { ...selections.rooms, [room.id]: { ...roomState, details } },
                                        });
                                      }}
                                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                                        detail.bath
                                          ? "border-[#66a109] bg-[#66a109] text-white"
                                          : "border-neutral-300 text-neutral-500"
                                      }`}
                                    >
                                      {dictionary.addBathroom}
                                    </button>
                                  )}
                                  {room.hasDressing && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const details = [...roomState.details];
                                        details[i] = { ...detail, dressing: !detail.dressing };
                                        onChange({
                                          ...selections,
                                          rooms: { ...selections.rooms, [room.id]: { ...roomState, details } },
                                        });
                                      }}
                                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                                        detail.dressing
                                          ? "border-[#66a109] bg-[#66a109] text-white"
                                          : "border-neutral-300 text-neutral-500"
                                      }`}
                                    >
                                      {dictionary.addDressingRoom}
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-neutral-400 mb-4">
                    {dictionary.addonsAndFacilities}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {OTHER_ROOMS_CONFIG.map((room) => (
                      <ChoiceCard
                        key={room.id}
                        active={selections.otherRooms[room.id]}
                        onClick={() =>
                          onChange({
                            ...selections,
                            otherRooms: { ...selections.otherRooms, [room.id]: !selections.otherRooms[room.id] },
                          })
                        }
                        label={dictionary.otherRoomNames[room.id]}
                        icon={OTHER_ROOM_ICONS[room.id]}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-widest text-neutral-400 mb-4">
                    {dictionary.basement}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <ChoiceCard
                      active={selections.basement}
                      onClick={() => onChange({ ...selections, basement: !selections.basement })}
                      label={dictionary.basement}
                      icon={<BasementIcon />}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-xs uppercase tracking-widest text-neutral-400 mb-4">
                  {dictionary.luxuryAddons}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {FIXED_COST_ADDONS_CONFIG.map((addon) => (
                    <ChoiceCard
                      key={addon.id}
                      active={selections.fixedAddons[addon.id]}
                      onClick={() =>
                        onChange({
                          ...selections,
                          fixedAddons: { ...selections.fixedAddons, [addon.id]: !selections.fixedAddons[addon.id] },
                        })
                      }
                      label={dictionary.fixedAddonNames[addon.id]}
                      icon={FIXED_ADDON_ICONS[addon.id]}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#66a109]/10 text-[#66a109] text-lg">
                    <ParkingIcon />
                  </span>
                  <h3 className="text-xs uppercase tracking-widest text-neutral-400">{dictionary.parking}</h3>
                </div>
                <NumberDial
                  value={selections.parking}
                  options={PARKING_OPTIONS}
                  onSelect={(count) => onChange({ ...selections, parking: count })}
                  size="w-12 h-12"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col md:flex-row-reverse gap-4 mt-8 pt-8 border-t border-neutral-200">
        {step < STEP_COUNT - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-[#66a109] text-white text-sm font-semibold uppercase tracking-widest hover:bg-[#5a8f08] transition-colors shadow-[0_10px_25px_-8px_rgba(102,161,9,0.5)]"
          >
            {dictionary.next}
          </button>
        ) : (
          <button
            type="button"
            onClick={onShowResult}
            className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-[#66a109] text-white text-sm font-semibold uppercase tracking-widest hover:bg-[#5a8f08] transition-colors shadow-[0_10px_25px_-8px_rgba(102,161,9,0.5)]"
          >
            {dictionary.showResult}
          </button>
        )}
        <button
          type="button"
          onClick={goBack}
          className="w-full md:w-auto px-8 py-3.5 rounded-xl text-neutral-500 text-sm font-semibold uppercase tracking-widest hover:bg-neutral-100 transition-colors"
        >
          {dictionary.back}
        </button>
      </div>
    </div>
  );
}
