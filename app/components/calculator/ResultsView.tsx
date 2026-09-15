"use client";

import { RefObject } from "react";
import { FaRulerCombined, FaSackDollar, FaDownload, FaCalendarCheck, FaRotateLeft } from "react-icons/fa6";
import type { CalculatorDict } from "@/dictionaries/types";
import type { CalculationResult } from "@/lib/calculator/pricing";
import { CHART_COLORS } from "@/data/villaCalculator";
import CostBreakdownChart from "./CostBreakdownChart";
import FeedbackWidget from "./FeedbackWidget";

type FeedbackRating = "too_low" | "just_right" | "too_high";

type ResultsViewProps = {
  dictionary: CalculatorDict;
  isRTL: boolean;
  result: CalculationResult;
  unlocked: boolean;
  extraArea: number;
  onExtraAreaChange: (value: number) => void;
  onDownloadPdf: () => void;
  onStartOver: () => void;
  isGeneratingPdf: boolean;
  bookConsultationHref: string;
  resultsRef: RefObject<HTMLDivElement | null>;
  feedback: {
    rating: FeedbackRating | null;
    comment: string;
    submitted: boolean;
    submitting: boolean;
    onRatingChange: (rating: FeedbackRating) => void;
    onCommentChange: (comment: string) => void;
    onSubmit: () => void;
  };
};

export default function ResultsView({
  dictionary,
  isRTL,
  result,
  unlocked,
  extraArea,
  onExtraAreaChange,
  onDownloadPdf,
  onStartOver,
  isGeneratingPdf,
  bookConsultationHref,
  resultsRef,
  feedback,
}: ResultsViewProps) {
  const currencyLabel = isRTL ? "د.إ" : "AED";

  return (
    <div
      className={`transition-[filter] duration-300 ${unlocked ? "" : "blur-md pointer-events-none select-none"}`}
    >
      <div
        ref={resultsRef}
        className="bg-white rounded-3xl border border-neutral-200 p-6 md:p-10 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.15)]"
      >
        <div className="text-center mb-10">
          <h1 className="font-semibold tracking-tight text-2xl md:text-3xl mb-2">
            {dictionary.resultsTitle}
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto">{dictionary.resultsDescription}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-6 text-center">
            <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white border border-neutral-200 text-neutral-500 text-lg">
              <FaRulerCombined />
            </span>
            <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">
              {dictionary.totalBUAResult}
            </p>
            <p className="font-semibold text-2xl md:text-3xl">
              {Math.round(result.totalBUA).toLocaleString()} m²
            </p>
            <p className="text-neutral-400 text-sm mt-1">
              {Math.round(result.totalBUA * 10.764).toLocaleString()} sqft
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#2f3d13] to-neutral-900 text-white p-6 text-center">
            <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[#a8d65e] text-lg">
              <FaSackDollar />
            </span>
            <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">
              {dictionary.totalCostResult}
            </p>
            <p className="font-semibold text-2xl md:text-3xl">
              {Math.round(result.totalPrice).toLocaleString()} {currencyLabel}
            </p>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-xs uppercase tracking-widest text-neutral-400 mb-3">
            {dictionary.extraAreaSectionTitle}
          </h3>
          <label className="flex flex-col gap-2 max-w-xs">
            <span className="text-sm text-neutral-600">{dictionary.extraAreaLabel}</span>
            <input
              type="number"
              min={0}
              value={extraArea}
              onChange={(e) => onExtraAreaChange(parseFloat(e.target.value) || 0)}
              className="rounded-lg border border-neutral-300 px-4 py-3 focus:border-[#66a109] focus:outline-none"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-center">
          <div className="max-w-[280px] mx-auto">
            <CostBreakdownChart
              breakdownDetails={result.breakdownDetails}
              isRTL={isRTL}
              currencyLabel={currencyLabel}
            />
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-neutral-400 mb-4">
              {dictionary.costBreakdownTitle}
            </h3>
            <ul className="flex flex-col gap-2">
              {result.breakdownDetails.map((item, index) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between text-sm border-b border-neutral-100 pb-2"
                >
                  <span className="flex items-center gap-2.5 text-neutral-600">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                    />
                    {item.name}
                  </span>
                  <span className="font-medium">
                    {Math.round(item.cost).toLocaleString()} {currencyLabel}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <button
          type="button"
          onClick={onDownloadPdf}
          disabled={isGeneratingPdf}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#66a109] text-white text-sm font-semibold uppercase tracking-widest hover:bg-[#5a8f08] transition-colors disabled:opacity-60 shadow-[0_10px_25px_-8px_rgba(102,161,9,0.5)]"
        >
          <FaDownload size={14} />
          {isGeneratingPdf ? dictionary.generating : dictionary.downloadPdf}
        </button>
        <a
          href={bookConsultationHref}
          className="flex-1 flex items-center justify-center gap-2 text-center py-3.5 rounded-xl border border-neutral-300 text-sm font-semibold uppercase tracking-widest hover:border-neutral-900 transition-colors"
        >
          <FaCalendarCheck size={14} />
          {dictionary.bookConsultation}
        </a>
        <button
          type="button"
          onClick={onStartOver}
          className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-neutral-500 text-sm font-semibold uppercase tracking-widest hover:bg-neutral-100 transition-colors"
        >
          <FaRotateLeft size={14} />
          {dictionary.startOver}
        </button>
      </div>

      <div className="mt-8">
        <FeedbackWidget dictionary={dictionary} {...feedback} />
      </div>
    </div>
  );
}
