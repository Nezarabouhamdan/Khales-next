"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSlidersH, FaBed, FaDoorOpen, FaGem, FaCheck, FaPlus } from "react-icons/fa";
import type { IconType } from "react-icons";
import type { CalculatorDict } from "@/dictionaries/types";
import { cityBelongsTo } from "@/data/calculatorMarkets";
import {
  ARCHITECTURAL_STYLES,
  EXTRA_ROOMS_CONFIG,
  OTHER_ROOMS_CONFIG,
  PARKING_OPTIONS,
  ROOM_CONFIG,
  ROOM_DIMENSION_LIMITS,
  type RoomConfigEntry,
} from "@/data/villaCalculator";
import type { FamilyPlanSelections, RoomDetail, RoomSelection } from "@/lib/calculator/engine";
import { FLOORS_OPTIONS } from "@/lib/calculator/types";
import { useLenis } from "@/app/components/SmoothScroll";
import ChoiceCard from "./ChoiceCard";
import LocationFields from "./LocationFields";
import SpecialItemsPicker from "./SpecialItemsPicker";
import TierPicker from "./TierPicker";
import { EXTRA_ROOM_ICONS, OTHER_ROOM_ICONS, ParkingIcon, ROOM_ICONS, STYLE_ICONS } from "./icons";

type FamilyPlanWizardProps = {
  dictionary: CalculatorDict;
  value: FamilyPlanSelections;
  onChange: (next: FamilyPlanSelections) => void;
  onBack: () => void;
  onFinish: () => void;
};

// Path 3, "a plan for my family home": collects the family's room program
// only. No price, no currency amount and no network call happens here - the
// summary shows an indicative built area and leads to a design request.
const STEPS = ["basics", "rooms", "spaces", "special"] as const;
type StepId = (typeof STEPS)[number];

const STEP_ICONS: Record<StepId, IconType> = {
  basics: FaSlidersH,
  rooms: FaBed,
  spaces: FaDoorOpen,
  special: FaGem,
};

// Same offset SmoothScroll uses for in-page anchors - keeps the wizard's
// heading clear of the fixed site header.
const HEADER_OFFSET = 96;

const sectionLabel = "text-sm font-semibold text-neutral-800";

function defaultDetail(room: RoomConfigEntry): RoomDetail {
  return { w: room.w, l: room.l, bath: false, dressing: false };
}

// A plan restored from an older session may lack a room or carry fewer
// detail entries than its count - fall back to the room's defaults.
function roomSelection(plan: FamilyPlanSelections, room: RoomConfigEntry): RoomSelection {
  return plan.rooms[room.id] ?? { count: room.default, details: [] };
}

function detailsWithLength(room: RoomConfigEntry, details: RoomDetail[], length: number): RoomDetail[] {
  if (details.length >= length) return details;
  return [...details, ...Array.from({ length: length - details.length }, () => defaultDetail(room))];
}

function clampDimension(value: number, fallback: number): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(ROOM_DIMENSION_LIMITS.max, Math.max(ROOM_DIMENSION_LIMITS.min, value));
}

/**
 * Every room dimension clamped to ROOM_DIMENSION_LIMITS (anything that isn't
 * a number falls back to the room's default). Returns the same object when
 * nothing changes. Run before leaving a step, so a value typed without the
 * field ever losing focus (some mobile browsers) is still clamped.
 */
function withClampedRooms(plan: FamilyPlanSelections): FamilyPlanSelections {
  let changed = false;
  const rooms = { ...plan.rooms };
  ROOM_CONFIG.forEach((room) => {
    const selection = roomSelection(plan, room);
    const current = detailsWithLength(room, selection.details, selection.count);
    const details = current.map((entry) => {
      const detail = entry ?? defaultDetail(room);
      const w = clampDimension(detail.w, room.w);
      const l = clampDimension(detail.l, room.l);
      return w === detail.w && l === detail.l ? detail : { ...detail, w, l };
    });
    const same =
      plan.rooms[room.id] === selection &&
      details.length === selection.details.length &&
      details.every((detail, i) => detail === selection.details[i]);
    if (!same) {
      rooms[room.id] = { ...selection, details };
      changed = true;
    }
  });
  return changed ? { ...plan, rooms } : plan;
}

function NumberDial({
  label,
  value,
  options,
  onSelect,
  size = "w-10 h-10",
}: {
  label: string;
  value: number;
  options: readonly number[];
  onSelect: (n: number) => void;
  size?: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((count) => (
        <motion.button
          key={count}
          type="button"
          aria-pressed={value === count}
          whileTap={{ scale: 0.92 }}
          onClick={() => onSelect(count)}
          className={`${size} rounded-full text-sm font-semibold transition-colors ${
            value === count
              ? "bg-[#66a109] text-white shadow-[0_6px_16px_-4px_rgba(102,161,9,0.5)]"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          }`}
        >
          {count}
        </motion.button>
      ))}
    </div>
  );
}

// Width / length in metres. While the visitor types, the raw text lives
// here so the field can be emptied and retyped; only finite numbers reach
// the plan (never NaN), and the value is clamped to ROOM_DIMENSION_LIMITS
// when the field loses focus.
function DimensionField({
  label,
  value,
  fallback,
  onChange,
}: {
  label: string;
  value: number;
  fallback: number;
  onChange: (next: number) => void;
}) {
  const [draft, setDraft] = useState<string | null>(null);

  return (
    <label className="flex min-w-0 flex-col gap-1">
      <span className="text-xs text-neutral-600">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min={ROOM_DIMENSION_LIMITS.min}
        max={ROOM_DIMENSION_LIMITS.max}
        step="any"
        value={draft ?? (Number.isFinite(value) ? String(value) : "")}
        onChange={(e) => {
          setDraft(e.target.value);
          const typed = e.target.valueAsNumber;
          if (Number.isFinite(typed)) onChange(typed);
        }}
        onBlur={(e) => {
          const typed = e.currentTarget.valueAsNumber;
          const next = clampDimension(Number.isFinite(typed) ? typed : value, fallback);
          if (next !== value) onChange(next);
          setDraft(null);
        }}
        className="w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base focus:border-[#66a109] focus:outline-none"
      />
    </label>
  );
}

function ToggleChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 text-xs font-medium transition-colors ${
        active
          ? "border-[#66a109] bg-[#66a109] text-white"
          : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-400"
      }`}
    >
      {active ? <FaCheck size={10} aria-hidden /> : <FaPlus size={10} aria-hidden />}
      {label}
    </button>
  );
}

export default function FamilyPlanWizard({ dictionary, value, onChange, onBack, onFinish }: FamilyPlanWizardProps) {
  const [step, setStep] = useState(0);
  // Set once the visitor tries to continue without a valid city / land
  // status; from then on the location fields show their errors live.
  const [showErrors, setShowErrors] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const stepId = STEPS[step];
  const isLastStep = step === STEPS.length - 1;

  const cityValid = value.city !== null && cityBelongsTo(value.city, value.country);
  const landValid = value.landStatus !== null;
  const locationValid = cityValid && landValid;
  const errorMessages =
    showErrors && step === 0
      ? [!cityValid ? dictionary.inputErrors.city : null, !landValid ? dictionary.inputErrors.land : null].filter(
          (message): message is string => message !== null,
        )
      : [];

  // On a long step the visitor is at the bottom (next to the buttons) - bring
  // the new step's top into view instead of leaving them mid-page.
  const changeStep = (next: number) => {
    setStep(next);
    const node = rootRef.current;
    if (!node || node.getBoundingClientRect().top >= HEADER_OFFSET) return;
    const instance = lenis?.current;
    if (instance) instance.scrollTo(node, { offset: -HEADER_OFFSET });
    else node.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const updateRoom = (room: RoomConfigEntry, selection: RoomSelection) =>
    onChange({ ...value, rooms: { ...value.rooms, [room.id]: selection } });

  const updateDetail = (room: RoomConfigEntry, index: number, patch: Partial<RoomDetail>) => {
    const selection = roomSelection(value, room);
    const details = [...detailsWithLength(room, selection.details, index + 1)];
    details[index] = { ...(details[index] ?? defaultDetail(room)), ...patch };
    updateRoom(room, { ...selection, details });
  };

  const handleNext = () => {
    if (step === 0 && !locationValid) {
      setShowErrors(true);
      return;
    }
    const clamped = withClampedRooms(value);
    if (clamped !== value) onChange(clamped);

    if (!isLastStep) {
      changeStep(step + 1);
      return;
    }
    // The location is checked on the first step already; this guards a plan
    // that changed underneath the wizard (e.g. restored state).
    if (!locationValid) {
      setShowErrors(true);
      changeStep(0);
      return;
    }
    onFinish();
  };

  const handleBack = () => (step === 0 ? onBack() : changeStep(step - 1));

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="scroll-mt-24"
    >
      <div className="mb-10 text-start">
        <h2 className="font-semibold tracking-tight text-2xl md:text-3xl mb-2">{dictionary.familyPlanTitle}</h2>
        <p className="text-neutral-600 max-w-xl">{dictionary.familyPlanDescription}</p>
      </div>

      <ol className="flex items-start gap-1 sm:gap-3 mb-10">
        {STEPS.map((id, index) => {
          const StepIcon = STEP_ICONS[id];
          const isDone = index < step;
          const isActive = index === step;
          return (
            <li key={id} aria-current={isActive ? "step" : undefined} className="flex flex-1 flex-col items-center">
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
                  {isDone ? <FaCheck size={14} aria-hidden /> : <StepIcon size={15} aria-hidden />}
                </span>
                <div
                  className={`hidden sm:block h-0.5 flex-1 rounded-full transition-colors ${
                    index === STEPS.length - 1 ? "opacity-0" : isDone ? "bg-[#66a109]" : "bg-neutral-200"
                  }`}
                />
              </div>
              <p
                className={`mt-2 text-center text-xs sm:text-sm ${
                  isActive ? "text-neutral-900 font-semibold" : "text-neutral-600 font-medium"
                }`}
              >
                {dictionary.familySteps[id]}
              </p>
            </li>
          );
        })}
      </ol>

      <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.15)] min-h-[320px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stepId}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3 }}
          >
            {stepId === "basics" && (
              <div className="flex flex-col gap-10">
                <LocationFields
                  dictionary={dictionary}
                  value={{ country: value.country, city: value.city, landStatus: value.landStatus }}
                  onChange={(location) => onChange({ ...value, ...location })}
                  errors={showErrors ? { city: !cityValid, land: !landValid } : undefined}
                  showCurrency={false}
                />

                <div>
                  <h3 className={`${sectionLabel} mb-4`}>{dictionary.architecturalStyle}</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {ARCHITECTURAL_STYLES.map((style) => (
                      <ChoiceCard
                        key={style}
                        active={value.style === style}
                        onClick={() => onChange({ ...value, style })}
                        label={dictionary.styles[style]}
                        icon={STYLE_ICONS[style]}
                      />
                    ))}
                  </div>
                </div>

                <TierPicker dictionary={dictionary} value={value.tier} onChange={(tier) => onChange({ ...value, tier })} />
              </div>
            )}

            {stepId === "rooms" && (
              <div className="flex flex-col gap-8">
                {ROOM_CONFIG.map((room) => {
                  const selection = roomSelection(value, room);
                  const roomName = dictionary.roomNames[room.id];
                  return (
                    <div key={room.id} className="border-t border-neutral-100 pt-6 first:border-t-0 first:pt-0">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#66a109]/10 text-[#66a109] text-lg">
                          {ROOM_ICONS[room.id]}
                        </span>
                        <h3 className="font-semibold text-lg">{roomName}</h3>
                      </div>
                      <div className="mb-4">
                        <NumberDial
                          label={roomName}
                          value={selection.count}
                          options={room.counts}
                          onSelect={(count) =>
                            updateRoom(room, {
                              count,
                              details: detailsWithLength(room, selection.details, count),
                            })
                          }
                        />
                      </div>

                      {selection.count > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {Array.from({ length: selection.count }).map((_, i) => {
                            const detail = selection.details[i] ?? defaultDetail(room);
                            return (
                              <div
                                key={i}
                                role="group"
                                aria-label={`${roomName} ${i + 1}`}
                                className="rounded-2xl bg-neutral-50 border border-neutral-200 p-4"
                              >
                                {selection.count > 1 && (
                                  <span
                                    aria-hidden
                                    className="mb-3 flex h-6 w-6 items-center justify-center rounded-full border border-neutral-200 bg-white text-[11px] font-semibold text-neutral-600"
                                  >
                                    {i + 1}
                                  </span>
                                )}
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                  <DimensionField
                                    label={dictionary.widthLabel}
                                    value={detail.w}
                                    fallback={room.w}
                                    onChange={(w) => updateDetail(room, i, { w })}
                                  />
                                  <DimensionField
                                    label={dictionary.lengthLabel}
                                    value={detail.l}
                                    fallback={room.l}
                                    onChange={(l) => updateDetail(room, i, { l })}
                                  />
                                </div>
                                {(room.hasBath || room.hasDressing) && (
                                  <div className="flex flex-wrap gap-2">
                                    {room.hasBath && (
                                      <ToggleChip
                                        active={detail.bath}
                                        onClick={() => updateDetail(room, i, { bath: !detail.bath })}
                                        label={dictionary.addBathroom}
                                      />
                                    )}
                                    {room.hasDressing && (
                                      <ToggleChip
                                        active={detail.dressing}
                                        onClick={() => updateDetail(room, i, { dressing: !detail.dressing })}
                                        label={dictionary.addDressingRoom}
                                      />
                                    )}
                                  </div>
                                )}
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

            {stepId === "spaces" && (
              <div className="flex flex-col gap-10">
                <div>
                  <h3 className={`${sectionLabel} mb-4`}>{dictionary.servicesLabel}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {OTHER_ROOMS_CONFIG.map((room) => {
                      const active = value.otherRooms[room.id] === true;
                      return (
                        <ChoiceCard
                          key={room.id}
                          active={active}
                          onClick={() => onChange({ ...value, otherRooms: { ...value.otherRooms, [room.id]: !active } })}
                          label={dictionary.otherRoomNames[room.id]}
                          icon={OTHER_ROOM_ICONS[room.id]}
                        />
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className={`${sectionLabel} mb-2`}>{dictionary.extraRoomsLabel}</h3>
                  <p className="text-sm text-neutral-600 mb-4 max-w-xl">{dictionary.extraRoomsHint}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {EXTRA_ROOMS_CONFIG.map((room) => {
                      const active = value.extraRooms[room.id] === true;
                      return (
                        <ChoiceCard
                          key={room.id}
                          active={active}
                          onClick={() => onChange({ ...value, extraRooms: { ...value.extraRooms, [room.id]: !active } })}
                          label={dictionary.extraRoomNames[room.id]}
                          icon={EXTRA_ROOM_ICONS[room.id]}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {stepId === "special" && (
              <div className="flex flex-col gap-10">
                <SpecialItemsPicker
                  dictionary={dictionary}
                  value={value.specialItems}
                  onChange={(specialItems) => onChange({ ...value, specialItems })}
                />

                <div>
                  <h3 className={`${sectionLabel} mb-4`}>
                    {dictionary.floorsLabel} <span className="normal-case tracking-normal">{dictionary.optional}</span>
                  </h3>
                  <div role="group" aria-label={dictionary.floorsLabel} className="flex flex-wrap gap-2">
                    {FLOORS_OPTIONS.map((option) => {
                      const active = value.floors === option;
                      return (
                        <motion.button
                          key={option}
                          type="button"
                          aria-pressed={active}
                          whileTap={{ scale: 0.95 }}
                          // Optional: clicking the selected chip again clears it.
                          onClick={() => onChange({ ...value, floors: active ? null : option })}
                          className={`min-h-10 min-w-12 rounded-full border-2 px-5 text-sm font-semibold transition-colors ${
                            active
                              ? "border-[#66a109] bg-[#66a109] text-white shadow-[0_6px_16px_-4px_rgba(102,161,9,0.5)]"
                              : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
                          }`}
                        >
                          {dictionary.floors[option]}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#66a109]/10 text-[#66a109] text-lg">
                      <ParkingIcon aria-hidden />
                    </span>
                    <h3 className={sectionLabel}>{dictionary.parking}</h3>
                  </div>
                  <NumberDial
                    label={dictionary.parking}
                    value={value.parking}
                    options={PARKING_OPTIONS}
                    onSelect={(parking) => onChange({ ...value, parking })}
                    size="w-12 h-12"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 pt-8 border-t border-neutral-200">
        {errorMessages.length > 0 && (
          <p role="alert" className="mb-4 text-sm text-red-500 md:text-end">
            {errorMessages.join(" ")}
          </p>
        )}
        <div className="flex flex-col md:flex-row-reverse gap-4">
          <button
            type="button"
            onClick={handleNext}
            className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-[#66a109] text-white text-sm font-semibold uppercase tracking-widest rtl:tracking-normal hover:bg-[#5a8f08] transition-colors shadow-[0_10px_25px_-8px_rgba(102,161,9,0.5)]"
          >
            {isLastStep ? dictionary.showResult : dictionary.next}
          </button>
          <button
            type="button"
            onClick={handleBack}
            className="w-full md:w-auto px-8 py-3.5 rounded-xl text-neutral-600 text-sm font-semibold uppercase tracking-widest rtl:tracking-normal hover:bg-neutral-100 transition-colors"
          >
            {dictionary.back}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
