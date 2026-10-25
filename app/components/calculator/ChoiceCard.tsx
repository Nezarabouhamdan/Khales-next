"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

type ChoiceCardProps = {
  active: boolean;
  onClick: () => void;
  label: string;
  icon?: ReactNode;
  // Small secondary line under the label (e.g. "Local partner estimate").
  note?: string;
};

export default function ChoiceCard({ active, onClick, label, icon, note }: ChoiceCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-5 text-center transition-colors duration-200 ${
        active
          ? "border-[#66a109] bg-[#66a109]/[0.06] shadow-[0_10px_30px_-10px_rgba(102,161,9,0.35)]"
          : "border-neutral-200 bg-white hover:border-neutral-300 shadow-sm"
      }`}
    >
      {active && (
        <span className="absolute top-2 end-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#66a109] text-white">
          <FaCheck size={9} />
        </span>
      )}
      {icon && (
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-full text-xl transition-colors ${
            active ? "bg-[#66a109] text-white" : "bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200"
          }`}
        >
          {icon}
        </span>
      )}
      <span className={`text-sm font-semibold ${active ? "text-neutral-900" : "text-neutral-800"}`}>
        {label}
      </span>
      {note && <span className="-mt-2 text-xs leading-snug text-neutral-600">{note}</span>}
    </motion.button>
  );
}
