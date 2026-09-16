"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSlidersH, FaBolt, FaArrowRight } from "react-icons/fa";
import type { CalculatorDict } from "@/dictionaries/types";
import type { CalculationMode } from "@/lib/calculator/pricing";
import CountUp from "../CountUp";

type IntroScreenProps = {
  dictionary: CalculatorDict;
  onSelect: (mode: CalculationMode) => void;
};

export default function IntroScreen({ dictionary, onSelect }: IntroScreenProps) {
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
  const modes: { mode: CalculationMode; title: string; description: string; icon: React.ReactNode }[] = [
    {
      mode: "detailed",
      title: dictionary.detailedModeTitle,
      description: dictionary.detailedModeDescription,
      icon: <FaSlidersH />,
    },
    {
      mode: "quick",
      title: dictionary.quickModeTitle,
      description: dictionary.quickModeDescription,
      icon: <FaBolt />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h1 className="font-semibold tracking-tight leading-[1.05] text-[clamp(1.9rem,3.6vw,3rem)] mb-4">
        {dictionary.introTitle}
      </h1>
      <p className="max-w-2xl mx-auto text-neutral-500 leading-relaxed mb-6">
        {dictionary.introDescription}
      </p>

      {usageCount !== null && usageCount > 0 && (
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-xs sm:text-sm text-neutral-500 mb-12">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#66a109] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#66a109]" />
          </span>
          {dictionary.usageStatLabel.split("{n}").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <CountUp to={usageCount} className="font-semibold text-neutral-900" />
              )}
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {modes.map((option) => (
          <motion.button
            key={option.mode}
            type="button"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(option.mode)}
            className="group relative text-start rounded-3xl border border-neutral-200 bg-white p-8 transition-colors hover:border-[#66a109] hover:shadow-[0_25px_60px_-20px_rgba(102,161,9,0.35)]"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500 text-2xl mb-6 transition-colors group-hover:bg-[#66a109] group-hover:text-white">
              {option.icon}
            </span>
            <h2 className="font-semibold tracking-tight text-xl md:text-2xl mb-3 group-hover:text-neutral-900">
              {option.title}
            </h2>
            <p className="text-neutral-500 leading-relaxed text-sm md:text-base mb-6">{option.description}</p>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-neutral-400 group-hover:text-[#66a109] transition-colors">
              {dictionary.next}
              <FaArrowRight className="rtl:rotate-180" size={11} />
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
