"use client";

import { FaFaceFrown, FaFaceSmile, FaFaceGrinStars, FaCommentDots } from "react-icons/fa6";
import type { CalculatorDict } from "@/dictionaries/types";

type FeedbackRating = "too_low" | "just_right" | "too_high";

const RATING_ICONS: Record<FeedbackRating, React.ReactNode> = {
  too_low: <FaFaceFrown />,
  just_right: <FaFaceSmile />,
  too_high: <FaFaceGrinStars />,
};

type FeedbackWidgetProps = {
  dictionary: CalculatorDict;
  rating: FeedbackRating | null;
  comment: string;
  submitted: boolean;
  submitting: boolean;
  onRatingChange: (rating: FeedbackRating) => void;
  onCommentChange: (comment: string) => void;
  onSubmit: () => void;
};

export default function FeedbackWidget({
  dictionary,
  rating,
  comment,
  submitted,
  submitting,
  onRatingChange,
  onCommentChange,
  onSubmit,
}: FeedbackWidgetProps) {
  if (submitted) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:p-8 text-center">
        <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#66a109]/10 text-[#66a109] text-2xl">
          <FaFaceGrinStars />
        </span>
        <p className="font-semibold text-lg mb-1">{dictionary.feedbackThankYou}</p>
        <p className="text-neutral-500 text-sm">{dictionary.feedbackThankYouSub}</p>
      </div>
    );
  }

  const ratings: { value: FeedbackRating; label: string }[] = [
    { value: "too_low", label: dictionary.feedbackTooLow },
    { value: "just_right", label: dictionary.feedbackJustRight },
    { value: "too_high", label: dictionary.feedbackTooHigh },
  ];

  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-1">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-neutral-200 text-neutral-500">
          <FaCommentDots size={14} />
        </span>
        <h3 className="font-semibold">{dictionary.feedbackTitle}</h3>
      </div>
      <p className="text-neutral-500 text-sm mb-5 ms-12">{dictionary.feedbackSubtitle}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {ratings.map((r) => (
          <button
            key={r.value}
            type="button"
            onClick={() => onRatingChange(r.value)}
            className={`flex items-center gap-2 text-xs px-4 py-2 rounded-full border transition-colors ${
              rating === r.value
                ? "border-[#66a109] bg-[#66a109] text-white"
                : "border-neutral-300 text-neutral-600 hover:border-neutral-500"
            }`}
          >
            {RATING_ICONS[r.value]}
            {r.label}
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => onCommentChange(e.target.value)}
        placeholder={dictionary.feedbackCommentPlaceholder}
        rows={2}
        className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm mb-4 focus:border-[#66a109] focus:outline-none"
      />

      <button
        type="button"
        onClick={onSubmit}
        disabled={!rating || submitting}
        className="px-6 py-2.5 rounded-xl bg-[#66a109] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#5a8f08] transition-colors disabled:opacity-50"
      >
        {submitting ? dictionary.feedbackSubmitting : dictionary.feedbackSubmit}
      </button>
    </div>
  );
}
