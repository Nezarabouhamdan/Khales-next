"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/i18n-config";
import type { CalculatorDict } from "@/dictionaries/types";
import {
  calculateCost,
  getInitialDetailedSelections,
  getInitialQuickSelections,
  type CalculationMode,
  type DetailedSelections,
  type QuickSelections,
} from "@/lib/calculator/pricing";
import IntroScreen from "./IntroScreen";
import DetailedWizard from "./DetailedWizard";
import QuickForm from "./QuickForm";
import ResultsView from "./ResultsView";
import LeadGateModal from "./LeadGateModal";

type FeedbackRating = "too_low" | "just_right" | "too_high";

type CalculatorClientProps = {
  lang: Locale;
  dictionary: CalculatorDict;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CalculatorClient({ lang, dictionary }: CalculatorClientProps) {
  const isRTL = lang === "ar";

  const [mode, setMode] = useState<CalculationMode | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [selections, setSelections] = useState<DetailedSelections>(getInitialDetailedSelections());
  const [quickSelections, setQuickSelections] = useState<QuickSelections>(getInitialQuickSelections());
  const [extraArea, setExtraArea] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadInfo, setLeadInfo] = useState({ name: "", email: "", phone: "" });
  const [currentLeadId, setCurrentLeadId] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const [feedbackRating, setFeedbackRating] = useState<FeedbackRating | null>(null);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const result = useMemo(
    () =>
      calculateCost({
        mode: mode ?? "detailed",
        selections,
        quickSelections,
        extraArea,
        itemTranslations: dictionary.itemTranslations,
      }),
    [mode, selections, quickSelections, extraArea, dictionary],
  );

  const handleReset = () => {
    setShowResults(false);
    setSelections(getInitialDetailedSelections());
    setQuickSelections(getInitialQuickSelections());
    setMode(null);
    setExtraArea(0);
    setCurrentLeadId(null);
    setFeedbackRating(null);
    setFeedbackComment("");
    setFeedbackSubmitted(false);
  };

  const handleShowResult = () => {
    setShowResults(true);
    setIsModalOpen(true);
  };

  const handleDownloadPdf = async () => {
    if (!resultsRef.current) return;
    setIsGeneratingPdf(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(resultsRef.current, { scale: 2, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("khales-villa-cost-estimate.pdf");
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleSubmitAndDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadInfo.email || !leadInfo.phone) {
      window.alert(dictionary.fillAllFields);
      return;
    }
    if (!emailRegex.test(leadInfo.email)) {
      window.alert(dictionary.invalidEmail);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/leads/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadInfo.name,
          email: leadInfo.email,
          phone: leadInfo.phone,
          description: `Villa cost estimate: ${Math.round(result.totalPrice).toLocaleString()} AED / ${Math.round(
            result.totalBUA,
          ).toLocaleString()} m²`,
        }),
      });
      const data = await res.json();
      if (data?.leadId) setCurrentLeadId(data.leadId);
    } catch (error) {
      console.error("Failed to submit lead", error);
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
      handleDownloadPdf();
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedbackRating) return;
    setFeedbackSubmitting(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: currentLeadId,
          rating: feedbackRating,
          comment: feedbackComment,
          totalPrice: result.totalPrice,
          totalBUA: result.totalBUA,
          lang,
        }),
      });
    } catch {
      // stub endpoint - safe to ignore
    }
    setFeedbackSubmitting(false);
    setFeedbackSubmitted(true);
  };

  // Restore in-progress calculator state after mount, same as Khales-next.
  // sessionStorage isn't available during SSR, so this can only run as a
  // one-time sync from that external store once the component is on the
  // client - not a cascading-render loop despite the lint rule below.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("khalesVillaCalc");
      if (!saved) return;
      const parsed = JSON.parse(saved);
      /* eslint-disable react-hooks/set-state-in-effect */
      if (parsed.mode) setMode(parsed.mode);
      if (parsed.selections) setSelections(parsed.selections);
      if (parsed.quickSelections) setQuickSelections(parsed.quickSelections);
      if (typeof parsed.extraArea === "number") setExtraArea(parsed.extraArea);
      if (typeof parsed.showResults === "boolean") setShowResults(parsed.showResults);
      /* eslint-enable react-hooks/set-state-in-effect */
    } catch {
      // ignore corrupt session storage
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "khalesVillaCalc",
      JSON.stringify({ mode, selections, quickSelections, extraArea, showResults }),
    );
  }, [mode, selections, quickSelections, extraArea, showResults]);

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="max-w-4xl mx-auto px-6 md:px-0">
      {!mode && <IntroScreen dictionary={dictionary} onSelect={setMode} />}

      {mode === "detailed" && !showResults && (
        <DetailedWizard
          dictionary={dictionary}
          selections={selections}
          onChange={setSelections}
          onBack={() => setMode(null)}
          onShowResult={handleShowResult}
        />
      )}

      {mode === "quick" && !showResults && (
        <QuickForm
          dictionary={dictionary}
          selections={quickSelections}
          onChange={setQuickSelections}
          onBack={() => setMode(null)}
          onShowResult={handleShowResult}
        />
      )}

      {showResults && (
        <>
          <ResultsView
            dictionary={dictionary}
            isRTL={isRTL}
            result={result}
            unlocked={!isModalOpen}
            extraArea={extraArea}
            onExtraAreaChange={setExtraArea}
            onDownloadPdf={handleDownloadPdf}
            onStartOver={handleReset}
            isGeneratingPdf={isGeneratingPdf}
            bookConsultationHref={`/${lang}/contact`}
            resultsRef={resultsRef}
            feedback={{
              rating: feedbackRating,
              comment: feedbackComment,
              submitted: feedbackSubmitted,
              submitting: feedbackSubmitting,
              onRatingChange: setFeedbackRating,
              onCommentChange: setFeedbackComment,
              onSubmit: handleFeedbackSubmit,
            }}
          />
          <LeadGateModal
            open={isModalOpen}
            dictionary={dictionary}
            leadInfo={leadInfo}
            isSubmitting={isSubmitting}
            onChange={setLeadInfo}
            onSubmit={handleSubmitAndDownload}
          />
        </>
      )}
    </div>
  );
}
