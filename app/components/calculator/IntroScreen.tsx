"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaRulerCombined, FaUsers, FaWallet } from "react-icons/fa";
import type { CalculatorDict } from "@/dictionaries/types";
import { INPUT_MODES, type InputMode } from "@/lib/calculator/types";
import CountUp from "../CountUp";

type IntroScreenProps = {
  dictionary: CalculatorDict;
  onSelect: (mode: InputMode) => void;
};

const PATH_ICONS: Record<InputMode, ReactNode> = {
  area: <FaRulerCombined />,
  budget: <FaWallet />,
  family_plan: <FaUsers />,
};

// Start screen: three equal ways in. Area and budget lead to a building
// range; the family plan collects the rooms and leads to a design request -
// it never shows a cost.
export default function IntroScreen({ dictionary, onSelect }: IntroScreenProps) {
  const idPrefix = useId();

  // Real usage count from Odoo (crm.lead records the calculator itself
  // creates) - fetched client-side rather than blocking this otherwise-
  // static page on a live Odoo round-trip; /api/leads/count caches its
  // own response for an hour, so this is just a fast same-origin fetch.
  const [usageCount, setUsageCount] = useState<number | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch("/api/leads/count")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data?.success && typeof data.count === "number") {
          setUsageCount(data.count);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      {/* h2: the page wrapper already renders the page's h1. */}
      <h2 className="font-semibold tracking-tight leading-[1.05] text-balance text-[clamp(1.9rem,3.6vw,3rem)] mb-4">
        {dictionary.introTitle}
      </h2>
      <p className="max-w-2xl mx-auto text-neutral-500 leading-relaxed mb-6">{dictionary.introDescription}</p>

      {/* The slot keeps its height while the count loads, so the path cards
          don't jump down under the visitor's finger when it arrives. */}
      <div className="flex min-h-9 items-center justify-center mb-10 md:mb-12">
        {usageCount !== null && usageCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-xs sm:text-sm text-neutral-500"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#66a109] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#66a109]" />
            </span>
            {dictionary.usageStatLabel.split("{n}").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <CountUp to={usageCount} className="font-semibold text-neutral-900" />}
              </span>
            ))}
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {INPUT_MODES.map((mode) => {
          const titleId = `${idPrefix}-${mode}-title`;
          const descriptionId = `${idPrefix}-${mode}-description`;
          return (
            <motion.button
              key={mode}
              type="button"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(mode)}
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              className="group relative flex flex-col text-start rounded-3xl border border-neutral-200 bg-white p-6 lg:p-8 transition-colors hover:border-[#66a109] hover:shadow-[0_25px_60px_-20px_rgba(102,161,9,0.35)] focus-visible:border-[#66a109]"
            >
              <span className="flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500 text-xl lg:text-2xl mb-5 lg:mb-6 transition-colors group-hover:bg-[#66a109] group-hover:text-white">
                {PATH_ICONS[mode]}
              </span>
              <span id={titleId} className="block font-semibold tracking-tight text-lg lg:text-xl text-neutral-900 mb-2 lg:mb-3">
                {dictionary.paths[mode].title}
              </span>
              <span id={descriptionId} className="block text-neutral-500 leading-relaxed text-sm lg:text-base mb-6">
                {dictionary.paths[mode].description}
              </span>
              <span
                aria-hidden="true"
                className="mt-auto inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-neutral-400 group-hover:text-[#66a109] transition-colors"
              >
                {dictionary.start}
                <FaArrowRight className="rtl:rotate-180" size={11} />
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
