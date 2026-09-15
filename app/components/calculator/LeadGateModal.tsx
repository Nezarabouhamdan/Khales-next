"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import type { CalculatorDict } from "@/dictionaries/types";

type LeadInfo = { name: string; email: string; phone: string };

type LeadGateModalProps = {
  open: boolean;
  dictionary: CalculatorDict;
  leadInfo: LeadInfo;
  isSubmitting: boolean;
  onChange: (next: LeadInfo) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function LeadGateModal({
  open,
  dictionary,
  leadInfo,
  isSubmitting,
  onChange,
  onSubmit,
}: LeadGateModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-6"
        >
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md rounded-3xl bg-white p-8 md:p-10 shadow-2xl"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#66a109]/10 text-[#66a109] text-2xl mb-6">
              <FaFileInvoiceDollar />
            </span>
            <h2 className="font-semibold tracking-tight text-xl md:text-2xl mb-2">
              {dictionary.modalTitle}
            </h2>
            <p className="text-neutral-500 text-sm mb-8">{dictionary.modalDescription}</p>

            <div className="flex flex-col gap-4 mb-8">
              <label className="flex flex-col gap-2">
                <span className="text-sm text-neutral-600">{dictionary.emailLabel}</span>
                <input
                  type="email"
                  required
                  value={leadInfo.email}
                  onChange={(e) => onChange({ ...leadInfo, email: e.target.value })}
                  className="rounded-lg border border-neutral-300 px-4 py-3 focus:border-[#66a109] focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm text-neutral-600">{dictionary.phoneLabel}</span>
                <input
                  type="tel"
                  required
                  value={leadInfo.phone}
                  onChange={(e) => onChange({ ...leadInfo, phone: e.target.value })}
                  className="rounded-lg border border-neutral-300 px-4 py-3 focus:border-[#66a109] focus:outline-none"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#66a109] text-white text-sm font-semibold uppercase tracking-widest hover:bg-[#5a8f08] transition-colors disabled:opacity-60 shadow-[0_10px_25px_-8px_rgba(102,161,9,0.5)]"
            >
              {isSubmitting ? dictionary.submitting : dictionary.proceedAndDownload}
            </button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
