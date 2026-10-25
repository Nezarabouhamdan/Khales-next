"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaCalculator, FaDraftingCompass, FaInfoCircle, FaRulerCombined, FaTag } from "react-icons/fa";
import { FaPenToSquare, FaRotateLeft } from "react-icons/fa6";
import type { Locale } from "@/i18n-config";
import type { CalculatorDict } from "@/dictionaries/types";
import { EXTRA_ROOMS_CONFIG, OTHER_ROOMS_CONFIG, ROOM_CONFIG, type ExtraRoomId } from "@/data/villaCalculator";
import { AREA_LIMITS_SQM, familyPlanSpecialPricingItems, type FamilyPlanSelections } from "@/lib/calculator/engine";
import { fillTemplate, formatArea } from "@/lib/calculator/format";
import { SPECIAL_ITEMS, type SpecialItemId } from "@/lib/calculator/types";
import { ROOM_ICONS } from "./icons";

type FamilyPlanSummaryProps = {
  dictionary: CalculatorDict;
  lang: Locale;
  plan: FamilyPlanSelections;
  indicativeAreaSqm: number;
  onRequestDesign: () => void;
  onCheckCost: () => void;
  onEdit: () => void;
  onStartOver: () => void;
};

const sectionLabel = "text-sm font-semibold text-neutral-800";
const EMPTY = "—";

function isSpecialItem(id: SpecialItemId | ExtraRoomId): id is SpecialItemId {
  return (SPECIAL_ITEMS as readonly string[]).includes(id);
}

function ProgramGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-neutral-200 p-5">
      <h4 className={`${sectionLabel} mb-2`}>{title}</h4>
      <dl>{children}</dl>
    </section>
  );
}

function ProgramRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1.5 border-b border-neutral-100 py-2.5 last:border-b-0">
      <dt className="text-sm text-neutral-600">{label}</dt>
      <dd className="ms-auto text-end text-sm font-semibold text-neutral-900">{children}</dd>
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  if (items.length === 0) return <span className="font-normal text-neutral-500">{EMPTY}</span>;
  return (
    <span className="flex flex-wrap justify-end gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700"
        >
          {item}
        </span>
      ))}
    </span>
  );
}

// The family-plan "result": the program the family described and an
// indicative built area - never a cost. Its job is to lead to a design
// request; checking the building cost for that area is a secondary option.
export default function FamilyPlanSummary({
  dictionary,
  lang,
  plan,
  indicativeAreaSqm,
  onRequestDesign,
  onCheckCost,
  onEdit,
  onStartOver,
}: FamilyPlanSummaryProps) {
  const hasArea = Number.isFinite(indicativeAreaSqm) && indicativeAreaSqm > 0;
  const areaM2 = formatArea(indicativeAreaSqm, "m2", dictionary.unitSymbols.m2);
  const areaSqft = formatArea(indicativeAreaSqm, "sqft", dictionary.unitSymbols.sqft);
  // The area path accepts the same bounds - don't offer a check that could
  // only open on an input error.
  const canCheckCost =
    hasArea && Math.floor(indicativeAreaSqm) >= AREA_LIMITS_SQM.min && indicativeAreaSqm <= AREA_LIMITS_SQM.max;

  const listFormat = new Intl.ListFormat(lang, { style: "long", type: "conjunction" });

  const rooms = ROOM_CONFIG.flatMap((room) => {
    const selection = plan.rooms[room.id];
    if (!selection || selection.count <= 0) return [];
    const details = selection.details.slice(0, selection.count);
    const baths = room.hasBath ? details.filter((detail) => detail?.bath).length : 0;
    const dressings = room.hasDressing ? details.filter((detail) => detail?.dressing).length : 0;
    const extras = [
      baths > 0 ? fillTemplate(dictionary.familyRoomsWithBath, { n: baths }) : null,
      dressings > 0 ? fillTemplate(dictionary.familyRoomsWithDressing, { n: dressings }) : null,
    ].filter((part): part is string => part !== null);
    return [{ room, count: selection.count, extras }];
  });

  const serviceSpaces = OTHER_ROOMS_CONFIG.filter((room) => plan.otherRooms[room.id]).map(
    (room) => dictionary.otherRoomNames[room.id],
  );
  const specialRooms = EXTRA_ROOMS_CONFIG.filter((room) => plan.extraRooms[room.id]).map(
    (room) => dictionary.extraRoomNames[room.id],
  );
  const specialItems = plan.specialItems.map((item) => dictionary.specialItems[item]);
  // Pool, basement, office, cinema... each needs its own pricing - flagged
  // here and saved with the design request, never turned into an amount.
  const specialPricing = familyPlanSpecialPricingItems(plan).map((id) =>
    isSpecialItem(id) ? dictionary.specialItems[id] : dictionary.extraRoomNames[id],
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-10 text-start">
        <h2 className="font-semibold tracking-tight text-2xl md:text-3xl mb-2">{dictionary.familySummaryTitle}</h2>
        <p className="text-neutral-600 max-w-xl">{dictionary.familySummaryDescription}</p>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.15)]">
        <div className="flex flex-col gap-6">
          {hasArea && (
            <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-6 text-center">
              <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white border border-neutral-200 text-neutral-600 text-lg">
                <FaRulerCombined aria-hidden />
              </span>
              <p className={`${sectionLabel} mb-2`}>{dictionary.indicativeAreaLabel}</p>
              <p className="font-semibold text-3xl md:text-4xl">{areaM2}</p>
              <p className="text-neutral-500 text-sm mt-1">{areaSqft}</p>
              <p className="text-sm text-neutral-600 leading-relaxed mt-4 max-w-md mx-auto">
                {dictionary.indicativeAreaNote}
              </p>
            </div>
          )}

          <p className="flex items-start gap-3 rounded-2xl border border-[#66a109]/30 bg-[#66a109]/10 p-4 text-sm font-medium leading-relaxed text-neutral-800">
            <FaInfoCircle aria-hidden size={16} className="mt-0.5 shrink-0 text-[#66a109]" />
            <span>{dictionary.noCostNote}</span>
          </p>
        </div>

        <div className="mt-10">
          <h3 className={`${sectionLabel} mb-4`}>{dictionary.programTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProgramGroup title={dictionary.familySteps.basics}>
              <ProgramRow label={dictionary.countryLabel}>{dictionary.countries[plan.country]}</ProgramRow>
              <ProgramRow label={dictionary.cityLabel}>{plan.city ? dictionary.cities[plan.city] : EMPTY}</ProgramRow>
              <ProgramRow label={dictionary.landStatusLabel}>
                {plan.landStatus ? dictionary.landStatuses[plan.landStatus] : EMPTY}
              </ProgramRow>
              <ProgramRow label={dictionary.architecturalStyle}>{dictionary.styles[plan.style]}</ProgramRow>
              <ProgramRow label={dictionary.tierLabel}>{dictionary.tiers[plan.tier].name}</ProgramRow>
            </ProgramGroup>

            <ProgramGroup title={dictionary.familySteps.rooms}>
              {rooms.map(({ room, count, extras }) => (
                <div
                  key={room.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 border-b border-neutral-100 py-2.5 last:border-b-0"
                >
                  <dt className="flex items-center gap-2.5 text-sm text-neutral-600">
                    <span aria-hidden className="shrink-0 text-[#66a109]">
                      {ROOM_ICONS[room.id]}
                    </span>
                    {dictionary.roomNames[room.id]}
                  </dt>
                  <dd className="text-sm font-semibold text-neutral-900">{count}</dd>
                  {extras.length > 0 && (
                    <dd className="col-span-2 mt-1 ps-6 text-xs text-neutral-600">{extras.join(" · ")}</dd>
                  )}
                </div>
              ))}
            </ProgramGroup>

            <ProgramGroup title={dictionary.familySteps.spaces}>
              <ProgramRow label={dictionary.servicesLabel}>
                <Chips items={serviceSpaces} />
              </ProgramRow>
              <ProgramRow label={dictionary.extraRoomsLabel}>
                <Chips items={specialRooms} />
              </ProgramRow>
            </ProgramGroup>

            <ProgramGroup title={dictionary.familySteps.special}>
              <ProgramRow label={dictionary.specialItemsLabel}>
                <Chips items={specialItems} />
              </ProgramRow>
              <ProgramRow label={dictionary.floorsLabel}>
                {plan.floors ? dictionary.floors[plan.floors] : EMPTY}
              </ProgramRow>
              <ProgramRow label={dictionary.parking}>{plan.parking}</ProgramRow>
            </ProgramGroup>
          </div>

          {specialPricing.length > 0 && (
            <p className="mt-4 flex items-start gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm leading-relaxed text-neutral-700">
              <FaTag aria-hidden size={14} className="mt-1 shrink-0 text-neutral-500" />
              <span>{fillTemplate(dictionary.specialItemsSelectedNote, { items: listFormat.format(specialPricing) })}</span>
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <motion.button
          type="button"
          onClick={onRequestDesign}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center gap-4 sm:gap-5 rounded-3xl bg-[#66a109] p-6 md:p-8 text-start text-white hover:bg-[#5a8f08] transition-colors shadow-[0_10px_25px_-8px_rgba(102,161,9,0.5)]"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-xl">
            <FaDraftingCompass aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold tracking-tight text-lg md:text-xl">{dictionary.ctaDesign.title}</span>
            <span className="mt-1 block text-sm leading-relaxed text-white/85">{dictionary.ctaDesign.description}</span>
          </span>
          <FaArrowRight aria-hidden size={16} className="shrink-0 rtl:rotate-180" />
        </motion.button>

        {canCheckCost && (
          <button
            type="button"
            onClick={onCheckCost}
            className="inline-flex min-h-10 items-center gap-2 px-2 text-sm font-semibold text-neutral-900 underline decoration-[#66a109] decoration-2 underline-offset-4 hover:text-[#5a8f08] transition-colors"
          >
            <FaCalculator aria-hidden size={13} className="shrink-0 text-[#66a109]" />
            {fillTemplate(dictionary.checkCostForArea, { area: areaM2 })}
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-8 border-t border-neutral-200">
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-neutral-300 text-sm font-semibold uppercase tracking-widest rtl:tracking-normal hover:border-neutral-900 transition-colors"
        >
          <FaPenToSquare aria-hidden size={14} />
          {dictionary.editInputs}
        </button>
        <button
          type="button"
          onClick={onStartOver}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-neutral-600 text-sm font-semibold uppercase tracking-widest rtl:tracking-normal hover:bg-neutral-100 transition-colors"
        >
          <FaRotateLeft aria-hidden size={14} />
          {dictionary.startOver}
        </button>
      </div>
    </motion.div>
  );
}
