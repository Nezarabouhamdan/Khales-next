"use client";

import { useId, useRef, type ReactNode, type RefObject } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCircleInfo,
  FaCompassDrafting,
  FaListCheck,
  FaLocationDot,
  FaMagnifyingGlassDollar,
  FaPenToSquare,
  FaReceipt,
  FaRotateLeft,
  FaRulerCombined,
  FaShareNodes,
} from "react-icons/fa6";
import type { Locale } from "@/i18n-config";
import type { CalculatorDict } from "@/dictionaries/types";
import {
  fromSqm,
  readinessItems,
  type AreaEstimate,
  type BudgetEstimate,
  type EstimateInputs,
  type EstimateOutcome,
  type PartnerReviewEstimate,
  type PricedContext,
  type PricingContext,
  type ReadinessAnswers,
} from "@/lib/calculator/engine";
import {
  fillTemplate,
  formatArea,
  formatEstimateDate,
  formatMoney,
  formatNumber,
  formatPeriod,
  roundMoney,
} from "@/lib/calculator/format";
import type { ShareCardData } from "@/lib/calculator/shareCard";
import { isUndecidedCity } from "@/data/calculatorMarkets";
import { SPECIAL_ITEMS, type AreaUnit, type RequestType } from "@/lib/calculator/types";
import ReadinessChecklist from "./ReadinessChecklist";
import ShareActions from "./ShareActions";

type ResultsViewProps = {
  dictionary: CalculatorDict;
  lang: Locale;
  inputs: EstimateInputs;
  outcome: EstimateOutcome;
  reference: string | null; // null while the reference request is in flight
  estimateDate: string; // ISO timestamp of when the result was produced
  readiness: ReadinessAnswers;
  onReadinessChange: (next: ReadinessAnswers) => void;
  onRequest: (type: RequestType) => void;
  onEdit: () => void;
  onStartOver: () => void;
};

const CARD =
  "rounded-3xl border border-neutral-200 bg-white p-6 md:p-10 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.15)]";
// Letter-spacing stays LTR-only inside the estimate sheet: the PDF
// (html2canvas) draws letter-spaced text one character at a time, which
// pulls Arabic letters apart.
const LABEL = "text-sm font-semibold text-neutral-800";
const DARK_PANEL = "bg-[linear-gradient(135deg,#2f3d13,#171717)] text-white";
const OTHER_UNIT: Record<AreaUnit, AreaUnit> = { m2: "sqft", sqft: "m2" };

// The free result: shown in full straight away - no gate, no blur, no
// network call. Only the two service requests (design / budget review)
// ever lead to a lead, and only once the visitor sends that form.
export default function ResultsView({
  dictionary,
  lang,
  inputs,
  outcome,
  reference,
  estimateDate,
  readiness,
  onReadinessChange,
  onRequest,
  onEdit,
  onStartOver,
}: ResultsViewProps) {
  const sheetRef = useRef<HTMLElement>(null);
  const date = new Date(estimateDate);
  const dateText = Number.isNaN(date.getTime()) ? "" : formatEstimateDate(date, lang);
  const checklist = readinessItems({
    landStatus: inputs.landStatus,
    city: inputs.city,
    hasTarget: true,
    answers: readiness,
  });

  let sheet: ReactNode;
  let share: ReactNode = null;
  if (outcome.kind === "partner_review") {
    // No number anywhere - and so no card or PDF to share.
    sheet = (
      <PartnerReviewSheet
        dictionary={dictionary}
        lang={lang}
        inputs={inputs}
        outcome={outcome}
        reference={reference}
        dateText={dateText}
      />
    );
  } else {
    sheet = (
      <EstimateSheet
        sheetRef={sheetRef}
        dictionary={dictionary}
        lang={lang}
        inputs={inputs}
        outcome={outcome}
        reference={reference}
        dateText={dateText}
      />
    );
    share = (
      <ShareActions
        dictionary={dictionary}
        reference={reference}
        pdfTargetRef={sheetRef}
        card={reference ? buildShareCard(dictionary, lang, inputs, outcome, reference, dateText) : null}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-8 md:gap-10"
    >
      {sheet}

      <ReadinessChecklist
        dictionary={dictionary}
        items={checklist}
        answers={readiness}
        onChange={onReadinessChange}
      />

      <NextSteps dictionary={dictionary} onRequest={onRequest} share={share} />

      <div className="flex flex-col gap-3 border-t border-neutral-200 pt-8 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-neutral-300 text-sm font-semibold uppercase tracking-widest rtl:tracking-normal hover:border-neutral-900 transition-colors"
        >
          <FaPenToSquare aria-hidden="true" size={13} />
          {dictionary.editInputs}
        </button>
        <button
          type="button"
          onClick={onStartOver}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-neutral-600 text-sm font-semibold uppercase tracking-widest rtl:tracking-normal hover:bg-neutral-100 transition-colors"
        >
          <FaRotateLeft aria-hidden="true" size={13} />
          {dictionary.startOver}
        </button>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Estimate sheet (area / budget). This element is what the PDF captures, so
// it carries the brand, reference, numbers, disclaimer, tags, notes, VAT,
// exclusions and details - and nothing personal.
// ---------------------------------------------------------------------------

type SheetProps = {
  dictionary: CalculatorDict;
  lang: Locale;
  inputs: EstimateInputs;
  reference: string | null;
  dateText: string;
};

function EstimateSheet({
  sheetRef,
  dictionary,
  lang,
  inputs,
  outcome,
  reference,
  dateText,
}: SheetProps & { sheetRef: RefObject<HTMLElement | null>; outcome: AreaEstimate | BudgetEstimate }) {
  const titleId = useId();
  const { pricing } = outcome;
  const specials = specialItemsText(dictionary, lang, inputs);
  const otherUnit = OTHER_UNIT[inputs.unit];

  return (
    <section ref={sheetRef} aria-labelledby={titleId} className={CARD}>
      <SheetHeader
        dictionary={dictionary}
        reference={reference}
        dateText={dateText}
        titleId={titleId}
        title={outcome.kind === "area" ? dictionary.resultAreaTitle : dictionary.resultBudgetTitle}
      >
        <p className="leading-relaxed text-neutral-600">
          {outcome.kind === "area" && (
            <>
              <span className="font-semibold text-neutral-900">
                {enteredAreaText(dictionary, inputs) ??
                  formatArea(outcome.areaSqm, inputs.unit, dictionary.unitSymbols[inputs.unit])}
              </span>{" "}
              <span className="text-neutral-500">
                ({formatArea(outcome.areaSqm, otherUnit, dictionary.unitSymbols[otherUnit])})
              </span>
              <Dot />
            </>
          )}
          {dictionary.tiers[pricing.tier].name}
          <Dot />
          {locationText(dictionary, lang, pricing)}
        </p>
        <MarketNote dictionary={dictionary} pricing={pricing} />
      </SheetHeader>

      {outcome.kind === "area" ? (
        <AreaFigures dictionary={dictionary} outcome={outcome} />
      ) : (
        <BudgetFigures dictionary={dictionary} inputs={inputs} outcome={outcome} />
      )}

      {/* Mandatory next to any number. */}
      <p
        data-pdf-keep
        className="mt-4 flex items-start gap-3 rounded-2xl border border-neutral-200 p-4 text-sm leading-relaxed text-neutral-600"
      >
        <FaCircleInfo aria-hidden="true" className="mt-0.5 shrink-0 text-neutral-500" size={14} />
        <span>{dictionary.disclaimer}</span>
      </p>

      <TagStrip dictionary={dictionary} lang={lang} pricing={pricing} />

      {(outcome.unusualSize || specials) && (
        <div className="mt-6 flex flex-col gap-3">
          {outcome.unusualSize && <Notice icon={<FaRulerCombined />}>{dictionary.unusualSizeNote}</Notice>}
          {specials && (
            <Notice icon={<FaListCheck />}>
              {fillTemplate(dictionary.specialItemsSelectedNote, { items: specials })}
            </Notice>
          )}
        </div>
      )}

      <VatLine dictionary={dictionary} pricing={pricing} />

      <div className="mt-8 grid grid-cols-1 gap-8 border-t border-neutral-100 pt-8 md:grid-cols-2">
        <BulletList title={dictionary.exclusionsTitle} items={dictionary.exclusions} dot="bg-neutral-300" />
        <BulletList title={dictionary.driversTitle} items={dictionary.drivers} dot="bg-[#66a109]" />
      </div>

    </section>
  );
}

function SheetHeader({
  dictionary,
  reference,
  dateText,
  titleId,
  title,
  children,
}: {
  dictionary: CalculatorDict;
  reference: string | null;
  dateText: string;
  titleId: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-neutral-100 pb-5">
        {/* Unoptimized: a same-origin file the PDF capture can redraw as is. */}
        <Image
          src="/logo-color.png"
          alt={dictionary.shareCard.brand}
          width={2536}
          height={1174}
          unoptimized
          className="h-10 w-auto md:h-12"
        />
        <p className="text-sm text-neutral-600">
          {dictionary.referenceLabel}{" "}
          <span aria-live="polite" className="font-semibold text-neutral-900">
            {reference ?? dictionary.referencePending}
          </span>
          {dateText && (
            <>
              <Dot />
              {dictionary.estimateDateLabel} <span className="font-semibold text-neutral-900">{dateText}</span>
            </>
          )}
        </p>
      </div>
      <h2 id={titleId} className="mb-2 font-semibold tracking-tight rtl:tracking-normal text-2xl md:text-3xl">
        {title}
      </h2>
      {children}
    </header>
  );
}

function AreaFigures({ dictionary, outcome }: { dictionary: CalculatorDict; outcome: AreaEstimate }) {
  const currency = dictionary.currencies[outcome.pricing.currency];
  const [low, high] = moneyRange(outcome.low, outcome.high, currency);
  return (
    <div className="grid grid-cols-1 gap-4">
      <div data-pdf-keep className={`rounded-2xl p-6 md:p-8 ${DARK_PANEL}`}>
        <p className="mb-3 text-sm font-semibold text-white/85">
          {dictionary.rangeLabel}
        </p>
        <p className="font-semibold leading-tight text-[#a8d65e] text-[1.75rem] sm:text-4xl md:text-5xl">
          <span className="whitespace-nowrap">{low}</span> – <span className="whitespace-nowrap">{high}</span>
        </p>
      </div>
      <div
        data-pdf-keep
        className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:flex md:items-center md:justify-between md:gap-10 md:p-8"
      >
        <div className="shrink-0">
          <p className={`${LABEL} mb-2`}>{dictionary.planningFigureLabel}</p>
          <p className="font-semibold leading-tight text-neutral-900 text-2xl md:text-3xl">
            {formatMoney(outcome.expected, currency)}
          </p>
        </div>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600 md:mt-0">
          {dictionary.planningFigureNote}
        </p>
      </div>
    </div>
  );
}

const BUDGET_FIGURES = ["conservative", "reference", "maximum"] as const;

// The budget path never shows a money range - only the budget the visitor
// typed and the built area it may cover (floored, building only).
function BudgetFigures({
  dictionary,
  inputs,
  outcome,
}: {
  dictionary: CalculatorDict;
  inputs: EstimateInputs;
  outcome: BudgetEstimate;
}) {
  const unit = inputs.unit;
  const otherUnit = OTHER_UNIT[unit];
  const areas = {
    conservative: outcome.conservativeSqm,
    reference: outcome.referenceSqm,
    maximum: outcome.maximumSqm,
  };
  return (
    <div>
      <div
        data-pdf-keep
        className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 md:px-6"
      >
        <span className={LABEL}>{dictionary.budgetUsedLabel}</span>
        <span className="font-semibold text-neutral-900 text-xl md:text-2xl">
          {formatNumber(outcome.budget)} {dictionary.currencies[outcome.pricing.currency]}
        </span>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {BUDGET_FIGURES.map((key) => {
          const copy = dictionary.budgetAreas[key];
          const highlighted = key === "reference";
          return (
            <li
              key={key}
              data-pdf-keep
              className={`flex flex-col rounded-2xl p-5 md:p-6 ${
                highlighted ? DARK_PANEL : "border border-neutral-200 bg-white"
              }`}
            >
              <p
                className={`mb-3 text-sm font-semibold ${
                  highlighted ? "text-white/80" : "text-neutral-800"
                }`}
              >
                {copy.label}
              </p>
              <p
                className={`font-semibold leading-tight text-2xl md:text-3xl ${
                  highlighted ? "text-[#a8d65e]" : "text-neutral-900"
                }`}
              >
                {formatArea(areas[key], unit, dictionary.unitSymbols[unit])}
              </p>
              <p className={`mt-1 text-sm ${highlighted ? "text-white/80" : "text-neutral-800"}`}>
                {formatArea(areas[key], otherUnit, dictionary.unitSymbols[otherUnit])}
              </p>
              <p className={`mt-3 text-sm leading-relaxed ${highlighted ? "text-white/80" : "text-neutral-600"}`}>
                {copy.hint}
              </p>
            </li>
          );
        })}
      </ul>
      <p data-pdf-keep className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-neutral-600">
        <FaRulerCombined aria-hidden="true" className="mt-0.5 shrink-0 text-neutral-500" size={14} />
        <span>{dictionary.budgetAreaNote}</span>
      </p>
    </div>
  );
}

// How the selected city relates to the numbers: a quiet line for a direct
// city reference, a clear (not alarming) notice when the numbers come from
// another city or a national benchmark.
function MarketNote({ dictionary, pricing }: { dictionary: CalculatorDict; pricing: PricedContext }) {
  const text = marketNoteText(dictionary, pricing);
  if (pricing.marketMode === "direct_city") {
    return (
      <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-neutral-600">
        <FaLocationDot aria-hidden="true" className="mt-0.5 shrink-0 text-[#66a109]" size={13} />
        <span>{text}</span>
      </p>
    );
  }
  return (
    <p
      role="note"
      data-pdf-keep
      className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900"
    >
      <FaLocationDot aria-hidden="true" className="mt-0.5 shrink-0 text-amber-600" size={14} />
      <span>{text}</span>
    </p>
  );
}

// Mandatory on every output: country, currency, finish level, price
// anchor date, confidence, and the building-only scope sentence.
function TagStrip({ dictionary, lang, pricing }: { dictionary: CalculatorDict; lang: Locale; pricing: PricedContext }) {
  const tags = [
    { label: dictionary.tagLabels.country, value: dictionary.countries[pricing.country] },
    { label: dictionary.tagLabels.currency, value: dictionary.currencies[pricing.currency] },
    { label: dictionary.tagLabels.tier, value: dictionary.tiers[pricing.tier].name },
    { label: dictionary.tagLabels.anchorDate, value: formatPeriod(pricing.anchorDate, lang) },
    { label: dictionary.tagLabels.confidence, value: dictionary.confidenceLevels[pricing.confidence] },
  ];
  return (
    <div data-pdf-keep className="mt-6">
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <li
            key={index}
            className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs text-neutral-600"
          >
            <span className="text-neutral-600">{tag.label}:</span>{" "}
            <span className="font-semibold text-neutral-900">{tag.value}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm font-semibold text-neutral-700">
        {dictionary.scopeTag}
      </p>
    </div>
  );
}

function VatLine({ dictionary, pricing }: { dictionary: CalculatorDict; pricing: PricingContext }) {
  return (
    <p data-pdf-keep className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-neutral-600">
      <FaReceipt aria-hidden="true" className="mt-0.5 shrink-0 text-neutral-500" size={14} />
      <span>
        <span className="font-semibold text-neutral-900">{dictionary.vatLabel}:</span>{" "}
        {dictionary.vatModes[pricing.vatMode]}
      </span>
    </p>
  );
}

function Notice({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <p
      data-pdf-keep
      className="flex items-start gap-3 rounded-2xl bg-neutral-50 p-4 text-sm leading-relaxed text-neutral-600"
    >
      <span aria-hidden="true" className="mt-0.5 shrink-0 text-neutral-500">
        {icon}
      </span>
      <span>{children}</span>
    </p>
  );
}

function BulletList({ title, items, dot }: { title: string; items: string[]; dot: string }) {
  return (
    <div>
      <h3 className={`${LABEL} mb-4`}>{title}</h3>
      <ul className="flex flex-col gap-2.5 text-sm leading-relaxed text-neutral-600">
        {items.map((item, index) => (
          <li key={index} data-pdf-keep className="flex items-start gap-3">
            <span aria-hidden="true" className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Partner-review markets (Oman, Kuwait, Bahrain): no number anywhere - no
// amount, no derived area. Only the visitor's own input is echoed back.
// ---------------------------------------------------------------------------

function PartnerReviewSheet({
  dictionary,
  lang,
  inputs,
  outcome,
  reference,
  dateText,
}: SheetProps & { outcome: PartnerReviewEstimate }) {
  const titleId = useId();
  const { pricing } = outcome;
  const specials = specialItemsText(dictionary, lang, inputs);
  const entered =
    outcome.mode === "area"
      ? enteredAreaText(dictionary, inputs)
      : inputs.budget === null
        ? null
        : `${formatNumber(inputs.budget)} ${dictionary.currencies[pricing.currency]}`;

  const facts = [
    { label: dictionary.countryLabel, value: dictionary.countries[pricing.country] },
    { label: dictionary.cityLabel, value: dictionary.cities[pricing.city] },
    { label: dictionary.tierLabel, value: dictionary.tiers[inputs.tier].name },
  ];
  if (entered) {
    facts.push({ label: outcome.mode === "area" ? dictionary.areaUsedLabel : dictionary.budgetUsedLabel, value: entered });
  }

  return (
    <section aria-labelledby={titleId} className={CARD}>
      <SheetHeader
        dictionary={dictionary}
        reference={reference}
        dateText={dateText}
        titleId={titleId}
        title={dictionary.partnerReviewTitle}
      />

      {/* The rates file's own note for these markets is written for the
          team ("no number is shown to the user"), so visitors get the
          dictionary's explanation instead. */}
      <div
        role="note"
        className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 md:p-5"
      >
        <FaCircleInfo aria-hidden="true" className="mt-0.5 shrink-0 text-amber-600" size={14} />
        <div>
          <p className="font-semibold">{dictionary.partnerReviewWhy}</p>
          <p className="mt-1">{dictionary.partnerReviewBody}</p>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact, index) => (
          <div key={index} className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
            <dt className={`${LABEL} mb-1`}>{fact.label}</dt>
            <dd className="font-semibold text-neutral-900">{fact.value}</dd>
          </div>
        ))}
      </dl>

      {specials && (
        <div className="mt-6">
          <Notice icon={<FaListCheck />}>{fillTemplate(dictionary.specialItemsSelectedNote, { items: specials })}</Notice>
        </div>
      )}

      <VatLine dictionary={dictionary} pricing={pricing} />
    </section>
  );
}

// ---------------------------------------------------------------------------
// Next steps: three equally weighted choices. Design and review open the
// request form; sharing makes the card / PDF in the browser.
// ---------------------------------------------------------------------------

type CtaCopy = { title: string; description: string };

function NextSteps({
  dictionary,
  onRequest,
  share,
}: {
  dictionary: CalculatorDict;
  onRequest: (type: RequestType) => void;
  share: ReactNode;
}) {
  const titleId = useId();
  return (
    <section aria-labelledby={titleId}>
      <h2 id={titleId} className="mb-5 font-semibold tracking-tight text-xl md:text-2xl">
        {dictionary.nextStepsTitle}
      </h2>
      <div className={`grid grid-cols-1 gap-4 ${share ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        <ActionCard icon={<FaCompassDrafting />} copy={dictionary.ctaDesign} onClick={() => onRequest("design")} />
        <ActionCard
          icon={<FaMagnifyingGlassDollar />}
          copy={dictionary.ctaReview}
          onClick={() => onRequest("budget_review")}
        />
        {share && (
          <div className="flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-6 md:p-7">
            <CtaIntro icon={<FaShareNodes />} copy={dictionary.ctaShare} />
            <div className="mt-auto">{share}</div>
          </div>
        )}
      </div>
    </section>
  );
}

function ActionCard({ icon, copy, onClick }: { icon: ReactNode; copy: CtaCopy; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-6 text-start transition-colors hover:border-[#66a109] hover:shadow-[0_25px_60px_-20px_rgba(102,161,9,0.35)] md:p-7"
    >
      <CtaIntro icon={icon} copy={copy} />
      <span
        aria-hidden="true"
        className="mt-auto flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors group-hover:border-[#66a109] group-hover:bg-[#66a109] group-hover:text-white"
      >
        <FaArrowRight className="rtl:rotate-180" size={12} />
      </span>
    </motion.button>
  );
}

function CtaIntro({ icon, copy }: { icon: ReactNode; copy: CtaCopy }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#66a109]/10 text-xl text-[#66a109]"
      >
        {icon}
      </span>
      <span className="mb-2 block font-semibold tracking-tight text-lg text-neutral-900">{copy.title}</span>
      <span className="mb-6 block text-sm leading-relaxed text-neutral-600">{copy.description}</span>
    </>
  );
}

function Dot() {
  return (
    <span aria-hidden="true" className="mx-2 text-neutral-300">
      ·
    </span>
  );
}

// ---------------------------------------------------------------------------
// Text helpers
// ---------------------------------------------------------------------------

const listSeparator = (lang: Locale) => (lang === "ar" ? "، " : ", ");

// A city left as "Other / not decided yet" reads as just the country.
function cityName(dictionary: CalculatorDict, pricing: PricingContext): string {
  return isUndecidedCity(pricing.city) ? dictionary.countries[pricing.country] : dictionary.cities[pricing.city];
}

function locationText(dictionary: CalculatorDict, lang: Locale, pricing: PricingContext): string {
  if (isUndecidedCity(pricing.city)) return dictionary.countries[pricing.country];
  return `${dictionary.cities[pricing.city]}${listSeparator(lang)}${dictionary.countries[pricing.country]}`;
}

// The visitor's own area in the unit they typed it in (not round-tripped
// through m², which could floor 5,000 sqft to 4,999).
function enteredAreaText(dictionary: CalculatorDict, inputs: EstimateInputs): string | null {
  return inputs.area === null ? null : `${formatNumber(inputs.area)} ${dictionary.unitSymbols[inputs.unit]}`;
}

// "2,100,000" and "3,250,000 AED" - joined with an en dash by the caller.
function moneyRange(low: number, high: number, currency: string): [string, string] {
  return [formatNumber(roundMoney(low)), formatMoney(high, currency)];
}

function referencePlace(dictionary: CalculatorDict, pricing: PricedContext): string {
  return pricing.referenceCity ? dictionary.cities[pricing.referenceCity] : dictionary.countries[pricing.country];
}

function marketNoteText(dictionary: CalculatorDict, pricing: PricedContext): string {
  return fillTemplate(dictionary.marketModeNotes[pricing.marketMode], {
    city: cityName(dictionary, pricing),
    reference: referencePlace(dictionary, pricing),
  });
}

function specialItemsText(dictionary: CalculatorDict, lang: Locale, inputs: EstimateInputs): string {
  return SPECIAL_ITEMS.filter((item) => inputs.specialItems.includes(item))
    .map((item) => dictionary.specialItems[item])
    .join(listSeparator(lang));
}

function buildShareCard(
  dictionary: CalculatorDict,
  lang: Locale,
  inputs: EstimateInputs,
  outcome: AreaEstimate | BudgetEstimate,
  reference: string,
  dateText: string,
): ShareCardData {
  const { pricing } = outcome;
  const labels = dictionary.shareCard;
  const currency = dictionary.currencies[pricing.currency];
  const unit = inputs.unit;
  const symbol = dictionary.unitSymbols[unit];

  let headline: ShareCardData["headline"];
  let subline: ShareCardData["subline"];
  let amount: { label: string; value: string };
  if (outcome.kind === "area") {
    const [low, high] = moneyRange(outcome.low, outcome.high, currency);
    headline = { label: labels.rangeLabel, value: `${low} – ${high}` };
    subline = { label: labels.planningLabel, value: formatMoney(outcome.expected, currency) };
    amount = {
      label: labels.areaLabel,
      value: enteredAreaText(dictionary, inputs) ?? formatArea(outcome.areaSqm, unit, symbol),
    };
  } else {
    const conservative = formatNumber(Math.floor(fromSqm(outcome.conservativeSqm, unit)));
    headline = { label: labels.areaRangeLabel, value: `${conservative} – ${formatArea(outcome.maximumSqm, unit, symbol)}` };
    subline = { label: dictionary.budgetAreas.reference.label, value: formatArea(outcome.referenceSqm, unit, symbol) };
    amount = { label: labels.budgetLabel, value: `${formatNumber(outcome.budget)} ${currency}` };
  }

  return {
    lang,
    brand: labels.brand,
    title: labels.title,
    headline,
    subline,
    note: pricing.marketMode === "direct_city" ? undefined : marketNoteText(dictionary, pricing),
    rows: [
      { label: labels.locationLabel, value: locationText(dictionary, lang, pricing) },
      amount,
      { label: labels.tierLabel, value: dictionary.tiers[pricing.tier].name },
      { label: dictionary.tagLabels.anchorDate, value: formatPeriod(pricing.anchorDate, lang) },
      { label: dictionary.tagLabels.confidence, value: dictionary.confidenceLevels[pricing.confidence] },
      { label: labels.dateLabel, value: dateText },
      { label: labels.referenceLabel, value: reference },
    ],
    disclaimer: `${dictionary.scopeTag}\n${dictionary.disclaimer}`,
    footer: labels.footer,
  };
}
