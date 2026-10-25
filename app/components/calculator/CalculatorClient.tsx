"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Locale } from "@/i18n-config";
import type { CalculatorDict } from "@/dictionaries/types";
import { useLenis } from "@/app/components/SmoothScroll";
import { CALCULATOR_RATES } from "@/lib/calculator/rates";
import {
  computeEstimate,
  estimateFamilyPlanAreaSqm,
  getInitialEstimateInputs,
  getInitialFamilyPlan,
  INITIAL_READINESS,
  validateEstimateInputs,
  type EstimateInputs,
  type FamilyPlanSelections,
  type ReadinessAnswers,
} from "@/lib/calculator/engine";
import { generateReference, isValidReference } from "@/lib/calculator/reference";
import type { RequestContext } from "@/lib/calculator/request";
import {
  LEGACY_SESSION_KEY,
  SESSION_KEY,
  restoreSession,
  type CalculatorScreen,
  type CalculatorSession,
} from "@/lib/calculator/session";
import type { InputMode, RequestType } from "@/lib/calculator/types";
import IntroScreen from "./IntroScreen";
import EstimateForm from "./EstimateForm";
import ResultsView from "./ResultsView";
import FamilyPlanWizard from "./FamilyPlanWizard";
import FamilyPlanSummary from "./FamilyPlanSummary";
import RequestForm from "./RequestForm";

type CalculatorClientProps = {
  lang: Locale;
  dictionary: CalculatorDict;
};

type Screen = CalculatorScreen | "request";
type OpenRequest = { type: RequestType; returnTo: "result" | "family_summary" };

// Clears the fixed site header when bringing the calculator's top into view.
const HEADER_OFFSET = 96;

// Calculator v2 flow: intro -> area/budget form -> result, or intro ->
// family plan -> plan summary. The result is free and shown straight away;
// the only thing that ever reaches Odoo is a design / budget-review request
// the visitor sends from RequestForm.
export default function CalculatorClient({ lang, dictionary }: CalculatorClientProps) {
  const isRTL = lang === "ar";

  const [screen, setScreen] = useState<Screen>("intro");
  const [inputMode, setInputMode] = useState<InputMode | null>(null);
  const [estimate, setEstimate] = useState<EstimateInputs>(getInitialEstimateInputs);
  const [familyPlan, setFamilyPlan] = useState<FamilyPlanSelections>(getInitialFamilyPlan);
  const [reference, setReference] = useState<string | null>(null);
  const [estimateDate, setEstimateDate] = useState<string | null>(null);
  const [readiness, setReadiness] = useState<ReadinessAnswers>(INITIAL_READINESS);
  const [openRequest, setOpenRequest] = useState<OpenRequest | null>(null);
  const [restored, setRestored] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  // Bumped whenever a new estimate starts, so a slow reference response for
  // an older estimate can't overwrite the current one.
  const referenceTicket = useRef(0);
  const lenis = useLenis();

  const estimateMode = inputMode === "area" || inputMode === "budget" ? inputMode : null;
  const outcome = useMemo(
    () =>
      estimateMode && validateEstimateInputs(estimateMode, estimate) === null
        ? computeEstimate(CALCULATOR_RATES, estimateMode, estimate)
        : null,
    [estimateMode, estimate],
  );
  // From the current plan at render time - the wizard may adjust the plan
  // (clamping room sizes) in the same tick it finishes.
  const indicativeAreaSqm = useMemo(() => estimateFamilyPlanAreaSqm(familyPlan), [familyPlan]);

  const requestContext: RequestContext | null = useMemo(() => {
    if (!openRequest || !reference) return null;
    if (openRequest.returnTo === "family_summary") {
      return { inputMode: "family_plan", familyPlan, indicativeAreaSqm, reference };
    }
    return estimateMode && outcome ? { inputMode: estimateMode, estimate, outcome, reference } : null;
  }, [openRequest, reference, familyPlan, indicativeAreaSqm, estimateMode, estimate, outcome]);

  const scrollToTop = () => {
    const node = rootRef.current;
    if (!node || node.getBoundingClientRect().top >= HEADER_OFFSET) return;
    const instance = lenis?.current;
    if (instance) instance.scrollTo(node, { offset: -HEADER_OFFSET });
    else node.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goTo = (next: Screen) => {
    setScreen(next);
    scrollToTop();
  };

  // The server issues the random reference; if that fails the browser makes
  // one itself, so the result is never held up by the network.
  const fetchReference = (ticket: number) => {
    fetch("/api/calculator/reference", { method: "POST" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { reference?: unknown } | null) =>
        isValidReference(data?.reference) ? data.reference : generateReference(),
      )
      .catch(() => generateReference())
      .then((value) => {
        if (ticket === referenceTicket.current) setReference(value);
      });
  };

  const startEstimate = (next: "result" | "family_summary") => {
    const ticket = ++referenceTicket.current;
    setReference(null);
    setEstimateDate(new Date().toISOString());
    fetchReference(ticket);
    goTo(next);
  };

  const handleSelectMode = (mode: InputMode) => {
    setInputMode(mode);
    goTo(mode === "family_plan" ? "family" : "form");
  };

  const handleOpenRequest = (type: RequestType, returnTo: OpenRequest["returnTo"]) => {
    if (!reference) {
      // Don't let the in-flight reference replace this one mid-form.
      referenceTicket.current++;
      setReference(generateReference());
    }
    setOpenRequest({ type, returnTo });
    goTo("request");
  };

  const handleCloseRequest = () => {
    const returnTo = openRequest?.returnTo ?? "result";
    setOpenRequest(null);
    goTo(returnTo);
  };

  // "See the building range for ~X m²": the area path, prefilled from the
  // plan, so the visitor confirms the inputs before any number is shown.
  const handleCheckCost = () => {
    setEstimate((current) => ({
      ...current,
      country: familyPlan.country,
      city: familyPlan.city,
      landStatus: familyPlan.landStatus,
      tier: familyPlan.tier,
      floors: familyPlan.floors,
      specialItems: familyPlan.specialItems,
      unit: "m2",
      area: Math.floor(indicativeAreaSqm),
    }));
    setInputMode("area");
    goTo("form");
  };

  const handleStartOver = () => {
    referenceTicket.current++;
    setInputMode(null);
    setEstimate(getInitialEstimateInputs());
    setFamilyPlan(getInitialFamilyPlan());
    setReference(null);
    setEstimateDate(null);
    setReadiness(INITIAL_READINESS);
    setOpenRequest(null);
    goTo("intro");
  };

  // Restore the visitor's place after mount (sessionStorage doesn't exist
  // during SSR) - a one-time sync from an external store, not a cascading
  // render loop despite the lint rule below.
  useEffect(() => {
    let session: CalculatorSession | null = null;
    try {
      sessionStorage.removeItem(LEGACY_SESSION_KEY);
      session = restoreSession(sessionStorage.getItem(SESSION_KEY));
    } catch {
      // storage blocked (private mode) - start fresh
    }
    /* eslint-disable react-hooks/set-state-in-effect */
    if (session) {
      setScreen(session.screen);
      setInputMode(session.inputMode);
      setEstimate(session.estimate);
      setFamilyPlan(session.familyPlan);
      setReference(session.reference);
      setEstimateDate(session.estimateDate);
      setReadiness(session.readiness);
      // Reloaded while the reference was still being issued.
      if (!session.reference && (session.screen === "result" || session.screen === "family_summary")) {
        fetchReference(++referenceTicket.current);
      }
    }
    setRestored(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!restored) return;
    const stored: CalculatorSession = {
      screen: screen === "request" ? (openRequest?.returnTo ?? "intro") : screen,
      inputMode,
      estimate,
      familyPlan,
      reference,
      estimateDate,
      readiness,
    };
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(stored));
    } catch {
      // storage full or blocked - the calculator still works without it
    }
  }, [restored, screen, openRequest, inputMode, estimate, familyPlan, reference, estimateDate, readiness]);

  // A screen whose state isn't there (e.g. a restored "result" whose inputs
  // no longer validate) falls back to the step before it.
  const resolveView = (): Screen => {
    if (screen === "request" && requestContext) return "request";
    const base = screen === "request" ? (openRequest?.returnTo ?? "intro") : screen;
    if (estimateMode && (base === "form" || base === "result")) {
      return base === "result" && outcome && estimateDate ? "result" : "form";
    }
    if (inputMode === "family_plan" && (base === "family" || base === "family_summary")) {
      return base === "family_summary" && estimateDate ? "family_summary" : "family";
    }
    return "intro";
  };

  let content: ReactNode;
  switch (resolveView()) {
    case "request":
      content = openRequest && requestContext && (
        <RequestForm
          key={`${openRequest.type}-${requestContext.reference}`}
          dictionary={dictionary}
          lang={lang}
          requestType={openRequest.type}
          context={requestContext}
          readiness={readiness}
          onBack={handleCloseRequest}
        />
      );
      break;
    case "result":
      content = outcome && estimateDate && (
        <ResultsView
          dictionary={dictionary}
          lang={lang}
          inputs={estimate}
          outcome={outcome}
          reference={reference}
          estimateDate={estimateDate}
          readiness={readiness}
          onReadinessChange={setReadiness}
          onRequest={(type) => handleOpenRequest(type, "result")}
          onEdit={() => goTo("form")}
          onStartOver={handleStartOver}
        />
      );
      break;
    case "form":
      content = estimateMode && (
        <EstimateForm
          key={estimateMode}
          dictionary={dictionary}
          mode={estimateMode}
          value={estimate}
          onChange={setEstimate}
          onBack={() => goTo("intro")}
          onSubmit={() => startEstimate("result")}
        />
      );
      break;
    case "family_summary":
      content = (
        <FamilyPlanSummary
          dictionary={dictionary}
          lang={lang}
          plan={familyPlan}
          indicativeAreaSqm={indicativeAreaSqm}
          onRequestDesign={() => handleOpenRequest("design", "family_summary")}
          onCheckCost={handleCheckCost}
          onEdit={() => goTo("family")}
          onStartOver={handleStartOver}
        />
      );
      break;
    case "family":
      content = (
        <FamilyPlanWizard
          dictionary={dictionary}
          value={familyPlan}
          onChange={setFamilyPlan}
          onBack={() => goTo("intro")}
          onFinish={() => startEstimate("family_summary")}
        />
      );
      break;
    default:
      content = <IntroScreen dictionary={dictionary} onSelect={handleSelectMode} />;
  }

  return (
    <div ref={rootRef} dir={isRTL ? "rtl" : "ltr"} className="max-w-4xl mx-auto scroll-mt-24">
      {content}
    </div>
  );
}
