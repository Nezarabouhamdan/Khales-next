"use client";

import { useId } from "react";
import { FaCircleCheck, FaRegCircle, FaRegLightbulb } from "react-icons/fa6";
import type { CalculatorDict } from "@/dictionaries/types";
import type { ReadinessAnswers, ReadinessItem, ReadinessItemId } from "@/lib/calculator/engine";

type ReadinessChecklistProps = {
  dictionary: CalculatorDict;
  items: ReadinessItem[];
  answers: ReadinessAnswers;
  onChange: (next: ReadinessAnswers) => void;
};

// The two questions the visitor answers here; the others follow from the
// inputs they already gave (land status, city, area or budget).
const ANSWER_KEYS: Partial<Record<ReadinessItemId, keyof ReadinessAnswers>> = {
  design_timing: "designWithin6Months",
  contractor_quote: "hasContractorQuote",
};

// "Start readiness" planning list. It's a planning aid, never a verdict:
// an open item only shows its practical tip, never "not ready".
export default function ReadinessChecklist({ dictionary, items, answers, onChange }: ReadinessChecklistProps) {
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const allSet = items.length > 0 && items.every((item) => item.state === "yes");

  // Pressing the selected answer again clears it.
  const answer = (key: keyof ReadinessAnswers, value: boolean) =>
    onChange({ ...answers, [key]: answers[key] === value ? null : value });

  return (
    <section
      aria-labelledby={titleId}
      className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.15)]"
    >
      <h2 id={titleId} className="font-semibold tracking-tight text-xl md:text-2xl mb-2">
        {dictionary.readinessTitle}
      </h2>
      <p className="text-neutral-600 leading-relaxed max-w-2xl mb-6 md:mb-8">{dictionary.readinessSubtitle}</p>

      <ul className="flex flex-col divide-y divide-neutral-100">
        {items.map((item) => {
          const copy = dictionary.readiness[item.id];
          const key = item.answerable ? ANSWER_KEYS[item.id] : undefined;
          const questionId = `${baseId}-${item.id}`;
          return (
            <li key={item.id} className="py-5 first:pt-0 last:pb-0">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div className="flex items-start gap-3">
                  {item.state === "yes" ? (
                    <FaCircleCheck aria-hidden="true" className="mt-0.5 shrink-0 text-[#66a109]" size={20} />
                  ) : (
                    <FaRegCircle aria-hidden="true" className="mt-0.5 shrink-0 text-neutral-300" size={20} />
                  )}
                  <p id={questionId} className="font-medium leading-snug text-neutral-900">
                    {copy.question}
                    {!key && item.state === "yes" && <span className="sr-only"> {dictionary.yes}</span>}
                  </p>
                </div>
                {key && (
                  <div role="group" aria-labelledby={questionId} className="flex shrink-0 gap-2 ps-8 sm:ps-0">
                    <AnswerChip
                      label={dictionary.yes}
                      pressed={answers[key] === true}
                      onClick={() => answer(key, true)}
                    />
                    <AnswerChip
                      label={dictionary.no}
                      pressed={answers[key] === false}
                      onClick={() => answer(key, false)}
                    />
                  </div>
                )}
              </div>
              {item.state !== "yes" && (
                <p className="mt-3 ms-8 flex items-start gap-2 rounded-xl bg-neutral-50 px-4 py-3 text-sm leading-relaxed text-neutral-600">
                  <FaRegLightbulb aria-hidden="true" className="mt-0.5 shrink-0 text-[#66a109]" size={14} />
                  <span>{copy.tip}</span>
                </p>
              )}
            </li>
          );
        })}
      </ul>

      {allSet && (
        <p
          role="status"
          className="mt-6 flex items-start gap-3 rounded-2xl bg-[#66a109]/10 p-4 text-sm font-medium leading-relaxed text-[#3f6606]"
        >
          <FaCircleCheck aria-hidden="true" className="mt-0.5 shrink-0 text-[#66a109]" size={16} />
          <span>{dictionary.readinessAllSet}</span>
        </p>
      )}
    </section>
  );
}

function AnswerChip({ label, pressed, onClick }: { label: string; pressed: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`min-h-10 min-w-[4.5rem] rounded-full border px-5 text-sm font-semibold transition-colors ${
        pressed
          ? "border-[#66a109] bg-[#66a109] text-white"
          : "border-neutral-300 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900"
      }`}
    >
      {label}
    </button>
  );
}
