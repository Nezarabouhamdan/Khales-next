"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import type { Locale } from "@/i18n-config";
import type { ExamPageDict } from "@/dictionaries/types";

// Real answer key from Khales-next's ExamSection.jsx (question order is
// fixed - both dictionaries list the same 12 questions in the same order).
const CORRECT_ANSWERS = ["C", "B", "C", "B", "C", "B", "B", "C", "C", "C", "C", "C"] as const;
type OptionKey = "A" | "B" | "C" | "D";

// Same production WhatsApp number Khales-next's exam results go to (note:
// different from the candidate survey's number).
const WHATSAPP_NUMBER = "971551299880";

type ExamSectionProps = {
  lang: Locale;
  content: ExamPageDict;
};

export default function ExamSection({ lang, content }: ExamSectionProps) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(OptionKey | null)[]>(() => content.questions.map(() => null));
  const [finished, setFinished] = useState(false);

  const question = content.questions[index];
  const isLast = index === content.questions.length - 1;

  const score = useMemo(
    () => answers.filter((answer, i) => answer === CORRECT_ANSWERS[i]).length,
    [answers],
  );
  const percent = Math.round((score / content.questions.length) * 100);

  const resultMessage =
    percent === 100
      ? content.messages.perfect
      : percent >= 75
        ? content.messages.excellent
        : percent >= 50
          ? content.messages.good
          : content.messages.fair;

  const selectAnswer = (key: OptionKey) => {
    setAnswers((prev) => prev.map((value, i) => (i === index ? key : value)));
  };

  const handleNext = () => {
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
  };

  const handleSendResults = () => {
    const text = [
      `*${content.resultTitle}*`,
      ``,
      `*${content.yourScore}:* ${score}/${content.questions.length} (${percent}%)`,
      resultMessage,
    ].join("\n");
    window.open(
      `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  if (finished) {
    const circumference = 2 * Math.PI * 54;
    return (
      <section dir={dir} className="relative w-full bg-[#f7f7f7] px-6 md:px-16 py-24 md:py-28">
        <div className="max-w-lg mx-auto text-center rounded-3xl border border-neutral-200 bg-white p-10 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.15)]">
          <div className="relative mx-auto mb-6 h-32 w-32">
            <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
              <circle cx="60" cy="60" r="54" stroke="#e5e5e5" strokeWidth="10" fill="none" />
              <motion.circle
                cx="60"
                cy="60"
                r="54"
                stroke="#66a109"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference * (1 - percent / 100) }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-semibold text-2xl">{percent}%</span>
            </div>
          </div>

          <h2 className="font-semibold tracking-tight text-xl md:text-2xl mb-2">{content.resultTitle}</h2>
          <p className="text-neutral-500 mb-6">{content.resultSubtitle}</p>

          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1">{content.yourScore}</p>
          <p className="font-semibold text-3xl mb-4">
            {score}/{content.questions.length}
          </p>
          <p className="text-neutral-700 leading-relaxed mb-8">{resultMessage}</p>

          <button
            type="button"
            onClick={handleSendResults}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-white text-sm font-semibold uppercase tracking-widest hover:bg-[#1ebe57] transition-colors shadow-[0_10px_25px_-8px_rgba(37,211,102,0.5)]"
          >
            <FaWhatsapp size={16} />
            {content.sendResults}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section dir={dir} className="relative w-full bg-[#f7f7f7] px-6 md:px-16 py-20 md:py-28">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between text-xs uppercase tracking-widest text-neutral-400 mb-2">
          <span>
            {content.questionLabel} {index + 1} {content.of} {content.questions.length}
          </span>
          <span>{Math.round(((index + 1) / content.questions.length) * 100)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-neutral-200 mb-10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-[#66a109]"
            animate={{ width: `${((index + 1) / content.questions.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.15)]"
          >
            <span className="inline-block text-xs uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#66a109]/10 text-[#66a109] mb-5">
              {question.category}
            </span>
            <h2 className="font-semibold tracking-tight text-lg md:text-xl leading-snug mb-8">
              {question.question}
            </h2>

            <div className="flex flex-col gap-3">
              {(Object.keys(question.options) as OptionKey[]).map((key) => {
                const active = answers[index] === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => selectAnswer(key)}
                    className={`flex items-start gap-3 text-start w-full rounded-2xl border-2 p-4 transition-colors ${
                      active ? "border-[#66a109] bg-[#66a109]/[0.06]" : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        active ? "bg-[#66a109] text-white" : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {key}
                    </span>
                    <span className="text-sm text-neutral-700 leading-relaxed pt-0.5">
                      {question.options[key]}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-end mt-8">
          <button
            type="button"
            onClick={handleNext}
            disabled={!answers[index]}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#66a109] text-white text-sm font-semibold uppercase tracking-widest hover:bg-[#5a8f08] transition-colors disabled:opacity-40 shadow-[0_10px_25px_-8px_rgba(102,161,9,0.5)]"
          >
            {isLast ? content.submit : content.next}
          </button>
        </div>
      </div>
    </section>
  );
}
