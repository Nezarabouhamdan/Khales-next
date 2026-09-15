"use client";

import { useState } from "react";
import { FaWhatsapp, FaCheck } from "react-icons/fa6";
import type { Locale } from "@/i18n-config";
import type { ApplicationsPageDict } from "@/dictionaries/types";

type SurveyForm = {
  position: string;
  totalExperience: string;
  availability: string;
  aiKnowledge: string;
  expectedSalary: string;
  maritalStatus: string;
  district: string;
  city: string;
  nationality: string;
  arabicLevel: string;
};

const INITIAL_FORM: SurveyForm = {
  position: "",
  totalExperience: "",
  availability: "",
  aiKnowledge: "",
  expectedSalary: "",
  maritalStatus: "",
  district: "",
  city: "",
  nationality: "",
  arabicLevel: "",
};

const REQUIRED: (keyof SurveyForm)[] = [
  "position",
  "availability",
  "aiKnowledge",
  "expectedSalary",
  "maritalStatus",
  "nationality",
  "arabicLevel",
];

// Real production WhatsApp number this survey submits to on Khales-next.
const WHATSAPP_NUMBER = "971561880061";

const AVAILABILITY_KEYS = ["immediately", "lessThan15Days", "oneMonth", "moreThanOneMonth"] as const;
const AI_KNOWLEDGE_KEYS = ["expert", "advanced", "intermediate", "beginner", "none"] as const;
const MARITAL_STATUS_KEYS = ["single", "married", "divorced", "widowed"] as const;
const ARABIC_LEVEL_KEYS = ["native", "fluent", "proficient", "basic", "none"] as const;

type CandidateSurveySectionProps = {
  lang: Locale;
  content: ApplicationsPageDict;
};

function QuestionShell({ index, label, required, children }: { index: number; label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="border-t border-neutral-200 pt-6 first:border-t-0 first:pt-0">
      <div className="flex items-start gap-3 mb-4">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white text-xs font-semibold">
          {index}
        </span>
        <label className="text-sm font-semibold text-neutral-900 pt-0.5">
          {label}
          {required && <span className="text-red-500 ms-1">*</span>}
        </label>
      </div>
      <div className="ms-10">{children}</div>
    </div>
  );
}

function RadioPills({
  options,
  value,
  onChange,
}: {
  options: { key: string; label: string }[];
  value: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.key}
          type="button"
          onClick={() => onChange(option.key)}
          className={`flex items-center gap-1.5 text-xs sm:text-sm px-4 py-2 rounded-full border transition-colors ${
            value === option.key
              ? "border-neutral-900 bg-neutral-900 text-white"
              : "border-neutral-300 text-neutral-600 hover:border-neutral-500"
          }`}
        >
          {value === option.key && <FaCheck size={10} />}
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default function CandidateSurveySection({ lang, content }: CandidateSurveySectionProps) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  const [form, setForm] = useState<SurveyForm>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const set = <K extends keyof SurveyForm>(key: K, value: SurveyForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const buildMessage = () =>
    [
      `*${content.title}*`,
      ``,
      `*${content.position}:* ${form.position}`,
      `*${content.totalExperience}:* ${form.totalExperience || "-"}`,
      `*${content.availability}:* ${form.availability ? content.availabilityOptions[form.availability as keyof typeof content.availabilityOptions] : "-"}`,
      `*${content.aiKnowledge}:* ${form.aiKnowledge ? content.aiKnowledgeOptions[form.aiKnowledge as keyof typeof content.aiKnowledgeOptions] : "-"}`,
      `*${content.expectedSalary}:* ${form.expectedSalary} AED`,
      `*${content.maritalStatus}:* ${form.maritalStatus ? content.maritalStatusOptions[form.maritalStatus as keyof typeof content.maritalStatusOptions] : "-"}`,
      `*${content.currentResidence}:* ${[form.district, form.city].filter(Boolean).join(", ") || "-"}`,
      `*${content.nationality}:* ${form.nationality}`,
      `*${content.arabicLevel}:* ${form.arabicLevel ? content.arabicLevelOptions[form.arabicLevel as keyof typeof content.arabicLevelOptions] : "-"}`,
    ].join("\n");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const missing = REQUIRED.some((key) => !form[key]);
    if (missing) {
      setError(true);
      return;
    }
    setError(false);
    setSubmitting(true);

    try {
      await fetch("/api/applications/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang }),
      });
    } catch {
      // stub endpoint - WhatsApp still opens even if this fails
    }

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setSubmitting(false);
    setSubmitted(true);
  };

  const handleClear = () => {
    setForm(INITIAL_FORM);
    setError(false);
  };

  if (submitted) {
    return (
      <section dir={dir} className="relative w-full bg-[#f7f7f7] px-6 md:px-16 py-24 md:py-28">
        <div className="max-w-lg mx-auto text-center border-t border-neutral-200 pt-10">
          <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900/5 text-neutral-900 text-2xl">
            <FaCheck />
          </span>
          <p className="text-neutral-700 leading-relaxed">{content.successMessage}</p>
        </div>
      </section>
    );
  }

  return (
    <section dir={dir} className="relative w-full bg-[#f7f7f7] text-neutral-900 px-6 md:px-16 py-20 md:py-28">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto flex flex-col gap-6"
      >
        <QuestionShell index={1} label={content.position} required>
          <input
            required
            value={form.position}
            onChange={(e) => set("position", e.target.value)}
            placeholder={content.positionPlaceholder}
            className="w-full border-b border-neutral-300 bg-transparent py-3 text-base placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors"
          />
        </QuestionShell>

        <QuestionShell index={2} label={content.totalExperience}>
          <input
            value={form.totalExperience}
            onChange={(e) => set("totalExperience", e.target.value)}
            placeholder={content.totalExperiencePlaceholder}
            className="w-full border-b border-neutral-300 bg-transparent py-3 text-base placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors"
          />
        </QuestionShell>

        <QuestionShell index={3} label={content.availability} required>
          <RadioPills
            value={form.availability}
            onChange={(key) => set("availability", key)}
            options={AVAILABILITY_KEYS.map((key) => ({ key, label: content.availabilityOptions[key] }))}
          />
        </QuestionShell>

        <QuestionShell index={4} label={content.aiKnowledge} required>
          <RadioPills
            value={form.aiKnowledge}
            onChange={(key) => set("aiKnowledge", key)}
            options={AI_KNOWLEDGE_KEYS.map((key) => ({ key, label: content.aiKnowledgeOptions[key] }))}
          />
        </QuestionShell>

        <QuestionShell index={5} label={content.expectedSalary} required>
          <input
            type="number"
            min={0}
            required
            value={form.expectedSalary}
            onChange={(e) => set("expectedSalary", e.target.value)}
            placeholder={content.expectedSalaryPlaceholder}
            className="w-full border-b border-neutral-300 bg-transparent py-3 text-base placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors"
          />
        </QuestionShell>

        <QuestionShell index={6} label={content.maritalStatus} required>
          <RadioPills
            value={form.maritalStatus}
            onChange={(key) => set("maritalStatus", key)}
            options={MARITAL_STATUS_KEYS.map((key) => ({ key, label: content.maritalStatusOptions[key] }))}
          />
        </QuestionShell>

        <QuestionShell index={7} label={content.currentResidence}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              value={form.district}
              onChange={(e) => set("district", e.target.value)}
              placeholder={content.districtPlaceholder}
              className="border-b border-neutral-300 bg-transparent py-3 text-base placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors"
            />
            <input
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              placeholder={content.cityPlaceholder}
              className="border-b border-neutral-300 bg-transparent py-3 text-base placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors"
            />
          </div>
        </QuestionShell>

        <QuestionShell index={8} label={content.nationality} required>
          <input
            required
            value={form.nationality}
            onChange={(e) => set("nationality", e.target.value)}
            placeholder={content.nationalityPlaceholder}
            className="w-full border-b border-neutral-300 bg-transparent py-3 text-base placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors"
          />
        </QuestionShell>

        <QuestionShell index={9} label={content.arabicLevel} required>
          <RadioPills
            value={form.arabicLevel}
            onChange={(key) => set("arabicLevel", key)}
            options={ARABIC_LEVEL_KEYS.map((key) => ({ key, label: content.arabicLevelOptions[key] }))}
          />
        </QuestionShell>

        {error && <p className="text-sm text-red-500">{content.requiredField}</p>}

        <div className="flex flex-col sm:flex-row-reverse gap-4 pt-4 border-t border-neutral-200">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#25D366] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#1ebe57] transition-colors disabled:opacity-60"
          >
            <FaWhatsapp size={16} />
            {submitting ? content.submitting : content.submitWhatsApp}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="py-3.5 px-6 rounded-full text-xs uppercase tracking-widest font-medium text-neutral-500 hover:bg-neutral-100 transition-colors"
          >
            {content.clear}
          </button>
        </div>
      </form>
    </section>
  );
}
