"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCheck, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import type { Locale } from "@/i18n-config";
import type { CalculatorDict } from "@/dictionaries/types";
import { EXTRA_ROOMS_CONFIG } from "@/data/villaCalculator";
import type { ReadinessAnswers } from "@/lib/calculator/engine";
import { fillTemplate, formatArea, formatMoney } from "@/lib/calculator/format";
import {
  composeHandoffMessage,
  isValidEmail,
  isValidFirstName,
  mailtoUrl,
  normalizePhone,
  whatsappUrl,
  type CalculatorRequestPayload,
  type RequestContext,
  type RequestValidationError,
} from "@/lib/calculator/request";
import {
  PREFERRED_CONTACTS,
  REVIEW_GOALS,
  START_TIMINGS,
  type AreaUnit,
  type CountryCode,
  type PreferredContact,
  type RequestType,
  type ReviewGoal,
  type StartTiming,
} from "@/lib/calculator/types";

type RequestFormProps = {
  dictionary: CalculatorDict;
  lang: Locale;
  requestType: RequestType;
  context: RequestContext;
  readiness: ReadinessAnswers; // prefill only
  onBack: () => void;
};

type FormState = {
  startTiming: StartTiming | null;
  hasPlanOrQuote: boolean;
  reviewGoal: ReviewGoal | null;
  preferredContact: PreferredContact;
  firstName: string;
  email: string;
  phone: string;
  contactConsent: boolean;
  marketingConsent: boolean;
};

// Fields the visitor can fix, in the order they appear on the form.
type FieldError = Extract<RequestValidationError, "timing" | "review_goal" | "name" | "email" | "phone" | "consent">;
type SubmitError = RequestValidationError | "generic";
type Status = "editing" | "submitting" | "error" | "success";

const labelText = "text-sm font-semibold text-neutral-800";
const card =
  "rounded-3xl border border-neutral-200 bg-white p-6 md:p-10 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.15)]";
const primaryButton =
  "inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#66a109] text-white text-sm font-semibold uppercase tracking-widest rtl:tracking-normal hover:bg-[#5a8f08] transition-colors shadow-[0_10px_25px_-8px_rgba(102,161,9,0.5)] disabled:opacity-60";
const secondaryButton =
  "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-neutral-300 bg-white text-sm font-semibold uppercase tracking-widest rtl:tracking-normal hover:border-neutral-900 transition-colors";
const ghostButton =
  "inline-flex items-center justify-center gap-2 min-h-10 px-4 rounded-xl text-neutral-600 text-sm font-semibold hover:bg-neutral-100 transition-colors";
const inputBase = "w-full rounded-lg border bg-white px-4 py-3 text-base focus:border-[#66a109] focus:outline-none";

function validate(form: FormState, requestType: RequestType, country: CountryCode): FieldError[] {
  const errors: FieldError[] = [];
  if (!form.startTiming) errors.push("timing");
  if (requestType === "budget_review" && !form.reviewGoal) errors.push("review_goal");
  if (!isValidFirstName(form.firstName)) errors.push("name");
  if (form.preferredContact === "email" && !isValidEmail(form.email)) errors.push("email");
  // Format check only - never presented as verifying the number.
  if (form.phone.trim() !== "" && !normalizePhone(form.phone, country)) errors.push("phone");
  if (!form.contactConsent) errors.push("consent");
  return errors;
}

type RequestSummary = {
  country: CountryCode;
  location: string; // "city, country" ("city، country" in Arabic)
  landStatus: string | null;
  amountLabel: string;
  amount: string | null; // both area units, or the budget
  handoffAmount: string | null; // the short form used in the WhatsApp / email message
  tier: string;
  specialItems: string[];
};

function areaInBothUnits(dictionary: CalculatorDict, sqm: number, unit: AreaUnit): string {
  const other: AreaUnit = unit === "m2" ? "sqft" : "m2";
  return `${formatArea(sqm, unit, dictionary.unitSymbols[unit])} · ${formatArea(sqm, other, dictionary.unitSymbols[other])}`;
}

// What the request is about, in the visitor's language - read-only on the
// form and the basis of the prepared WhatsApp / email message.
function summarize(dictionary: CalculatorDict, context: RequestContext, separator: string): RequestSummary {
  const subject = context.inputMode === "family_plan" ? context.familyPlan : context.estimate;
  const { country, city, landStatus, tier } = subject;
  const base = {
    country,
    location: city
      ? `${dictionary.cities[city]}${separator}${dictionary.countries[country]}`
      : dictionary.countries[country],
    landStatus: landStatus ? dictionary.landStatuses[landStatus] : null,
    tier: dictionary.tiers[tier].name,
    specialItems: subject.specialItems.map((item) => dictionary.specialItems[item]),
  };

  if (context.inputMode === "family_plan") {
    const { familyPlan, indicativeAreaSqm } = context;
    const extraRooms = EXTRA_ROOMS_CONFIG.filter((room) => familyPlan.extraRooms[room.id]).map(
      (room) => dictionary.extraRoomNames[room.id],
    );
    return {
      ...base,
      amountLabel: dictionary.indicativeAreaLabel,
      amount: areaInBothUnits(dictionary, indicativeAreaSqm, "m2"),
      handoffAmount: formatArea(indicativeAreaSqm, "m2", dictionary.unitSymbols.m2),
      specialItems: [...base.specialItems, ...extraRooms],
    };
  }

  const { estimate, outcome } = context;
  if (context.inputMode === "budget") {
    const budget = outcome.kind === "area" ? null : outcome.budget;
    const money = budget === null ? null : formatMoney(budget, dictionary.currencies[outcome.pricing.currency]);
    return { ...base, amountLabel: dictionary.budgetUsedLabel, amount: money, handoffAmount: money };
  }
  const sqm = outcome.kind === "budget" ? null : outcome.areaSqm;
  return {
    ...base,
    amountLabel: dictionary.areaUsedLabel,
    amount: sqm === null ? null : areaInBothUnits(dictionary, sqm, estimate.unit),
    handoffAmount: sqm === null ? null : formatArea(sqm, estimate.unit, dictionary.unitSymbols[estimate.unit]),
  };
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors ${
        active
          ? "border-[#66a109] bg-[#66a109] text-white shadow-[0_6px_16px_-4px_rgba(102,161,9,0.5)]"
          : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-900"
      }`}
    >
      {children}
    </motion.button>
  );
}

function ChipGroup({
  field,
  legend,
  error,
  errorId,
  note,
  children,
}: {
  field: string;
  legend: ReactNode;
  error: string | null;
  errorId: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <fieldset data-field={field} aria-describedby={error ? errorId : undefined}>
      <legend className={labelText}>{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
      {note && <p className="mt-3 text-sm text-neutral-600 max-w-xl">{note}</p>}
      {error && (
        <p id={errorId} className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </fieldset>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 min-w-0">
      <dt className={labelText}>{label}</dt>
      <dd className="text-sm font-medium text-neutral-900 break-words">{value}</dd>
    </div>
  );
}

// "I want to design my home" / "Review my home budget". The only place the
// calculator asks for contact details, and the only thing that creates an
// Odoo lead. Opening WhatsApp or the mail app is always the visitor's own
// click on a prepared message - nothing is sent for them, and nothing here
// claims a message went out or a number was verified.
export default function RequestForm({ dictionary, lang, requestType, context, readiness, onBack }: RequestFormProps) {
  const id = useId();
  const [form, setForm] = useState<FormState>(() => ({
    // Only the planning checklist's clear "no" pre-selects a timing.
    startTiming: readiness.designWithin6Months === false ? "over_6_months" : null,
    hasPlanOrQuote: readiness.hasContractorQuote ?? false,
    reviewGoal: null,
    preferredContact: "whatsapp",
    firstName: "",
    email: "",
    phone: "",
    contactConsent: false,
    marketingConsent: false,
  }));
  const [status, setStatus] = useState<Status>("editing");
  const [submitError, setSubmitError] = useState<SubmitError | null>(null);
  const [showErrors, setShowErrors] = useState(false);
  // What the visitor picked when the request went through (drives the success panel).
  const [sentVia, setSentVia] = useState<PreferredContact>("whatsapp");
  const formRef = useRef<HTMLFormElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  // When the form became usable - sent with the request so the API can drop
  // instant (bot) submits, same as the contact form.
  const mountedAt = useRef(0);
  // Set synchronously, so a double click / repeated Enter can't send twice
  // before the disabled button re-renders (the API's duplicate check is a
  // search-then-create, not atomic).
  const inFlight = useRef(false);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  const isReview = requestType === "budget_review";
  const separator = lang === "ar" ? "، " : ", ";
  const summary = summarize(dictionary, context, separator);
  const errors = showErrors ? validate(form, requestType, summary.country) : [];
  const errorFor = (field: FieldError) => (errors.includes(field) ? dictionary.requestErrors[field] : null);
  const errorId = (field: FieldError) => `${id}-${field}-error`;
  const describedBy = (...ids: (string | false)[]) => ids.filter(Boolean).join(" ") || undefined;

  const handoffMessage = composeHandoffMessage(dictionary.handoff, {
    requestType,
    reference: context.reference,
    location: summary.location,
    areaOrBudget: summary.handoffAmount,
    tier: summary.tier,
  });
  const whatsappHref = whatsappUrl(handoffMessage);
  const emailHref = mailtoUrl(fillTemplate(dictionary.handoff.emailSubject, { reference: context.reference }), handoffMessage);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((previous) => ({ ...previous, [key]: value }));

  const focusField = (field: FieldError) => {
    formRef.current
      ?.querySelector<HTMLElement>(`[data-field="${field}"] input, [data-field="${field}"] button`)
      ?.focus();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current) return;
    const invalid = validate(form, requestType, summary.country);
    if (invalid.length > 0 || !form.startTiming) {
      setShowErrors(true);
      focusField(invalid[0] ?? "timing");
      return;
    }

    const payload: CalculatorRequestPayload = {
      requestType,
      reference: context.reference,
      lang,
      inputMode: context.inputMode,
      estimate: context.inputMode === "family_plan" ? null : context.estimate,
      familyPlan: context.inputMode === "family_plan" ? context.familyPlan : null,
      startTiming: form.startTiming,
      hasPlanOrContractorQuote: form.hasPlanOrQuote,
      reviewGoal: isReview ? form.reviewGoal : null,
      preferredContact: form.preferredContact,
      firstName: form.firstName.trim(),
      // The email field is only shown (and only sent) when email is the
      // preferred way to be contacted.
      email: form.preferredContact === "email" ? form.email.trim() : "",
      phone: form.phone.trim(),
      contactConsent: form.contactConsent,
      marketingConsent: form.marketingConsent,
      website: String(new FormData(event.currentTarget).get("website") ?? ""),
      elapsedMs: Date.now() - mountedAt.current,
    };

    inFlight.current = true;
    setStatus("submitting");
    setSubmitError(null);
    let error: SubmitError = "generic";
    try {
      const res = await fetch("/api/calculator/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as { success?: unknown; error?: unknown } | null;
      if (res.ok && data?.success === true) {
        setSentVia(form.preferredContact);
        setStatus("success");
        return;
      }
      if (res.status === 400 && typeof data?.error === "string" && Object.hasOwn(dictionary.requestErrors, data.error)) {
        error = data.error as SubmitError;
      }
    } catch {
      // Network failure - "generic", with the WhatsApp fallback below.
    } finally {
      inFlight.current = false;
    }
    setSubmitError(error);
    setStatus("error");
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={card}
        aria-live="polite"
      >
        <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#66a109]/10 text-[#66a109] text-2xl">
          <FaCheck />
        </span>
        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          className="font-semibold tracking-tight text-2xl md:text-3xl mb-3 focus:outline-none"
        >
          {fillTemplate(dictionary.requestSuccessTitle, { reference: context.reference })}
        </h2>
        <p className="text-neutral-600 leading-relaxed max-w-xl">
          {fillTemplate(sentVia === "whatsapp" ? dictionary.requestSuccessWhatsapp : dictionary.requestSuccessEmail, {
            reference: context.reference,
          })}
        </p>
        <p className="mt-4 text-sm text-neutral-600">
          {dictionary.referenceLabel}: <span className="font-semibold tracking-wider text-neutral-900">{context.reference}</span>
        </p>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
          {sentVia === "whatsapp" ? (
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={primaryButton}>
              <FaWhatsapp size={16} />
              {dictionary.openWhatsapp}
            </a>
          ) : (
            <a href={emailHref} className={secondaryButton}>
              <FaEnvelope size={14} />
              {dictionary.openEmail}
            </a>
          )}
          <button type="button" onClick={onBack} className={ghostButton}>
            <FaArrowLeft size={12} className="rtl:rotate-180" />
            {dictionary.backToEstimate}
          </button>
        </div>
        {sentVia === "whatsapp" && <p className="mt-3 text-xs text-neutral-600 max-w-xl">{dictionary.whatsappNotSentNote}</p>}
      </motion.div>
    );
  }

  const nameError = errorFor("name");
  const emailError = errorFor("email");
  const phoneError = errorFor("phone");
  const consentError = errorFor("consent");
  const phoneHintId = `${id}-phone-hint`;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8 text-start">
        <h2 className="font-semibold tracking-tight text-2xl md:text-3xl mb-2">
          {isReview ? dictionary.requestReviewTitle : dictionary.requestDesignTitle}
        </h2>
        <p className="text-neutral-600 max-w-xl leading-relaxed">
          {isReview ? dictionary.requestReviewIntro : dictionary.requestDesignIntro}
        </p>
      </div>

      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        aria-busy={status === "submitting"}
        className={`${card} relative`}
      >
        {/* Honeypot: off-screen and skipped by keyboard/screen readers, so
            only bots that fill every input touch it (see lib/spam.ts). */}
        <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>

        <section aria-labelledby={`${id}-summary`} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 md:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 id={`${id}-summary`} className={labelText}>
              {dictionary.requestSummaryTitle}
            </h3>
            <button type="button" onClick={onBack} className={`${ghostButton} -me-2`}>
              <FaArrowLeft size={12} className="rtl:rotate-180" />
              {dictionary.backToEstimate}
            </button>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            <SummaryRow label={dictionary.referenceLabel} value={context.reference} />
            <SummaryRow label={dictionary.shareCard.locationLabel} value={summary.location} />
            {summary.landStatus && <SummaryRow label={dictionary.landStatusLabel} value={summary.landStatus} />}
            {summary.amount && <SummaryRow label={summary.amountLabel} value={summary.amount} />}
            <SummaryRow label={dictionary.tierLabel} value={summary.tier} />
            {summary.specialItems.length > 0 && (
              <SummaryRow label={dictionary.specialItemsLabel} value={summary.specialItems.join(separator)} />
            )}
          </dl>
        </section>

        <div className="mt-10 flex flex-col gap-10">
          <ChipGroup field="timing" legend={dictionary.startTimingLabel} error={errorFor("timing")} errorId={errorId("timing")}>
            {START_TIMINGS.map((timing) => (
              <Chip key={timing} active={form.startTiming === timing} onClick={() => update("startTiming", timing)}>
                {dictionary.startTimings[timing]}
              </Chip>
            ))}
          </ChipGroup>

          {isReview && (
            <>
              <ChipGroup
                field="plan_or_quote"
                legend={dictionary.hasPlanOrQuoteLabel}
                error={null}
                errorId={`${id}-plan-error`}
                note={dictionary.quoteViaWhatsappNote}
              >
                <Chip active={form.hasPlanOrQuote} onClick={() => update("hasPlanOrQuote", true)}>
                  {dictionary.yes}
                </Chip>
                <Chip active={!form.hasPlanOrQuote} onClick={() => update("hasPlanOrQuote", false)}>
                  {dictionary.no}
                </Chip>
              </ChipGroup>

              <ChipGroup
                field="review_goal"
                legend={dictionary.reviewGoalLabel}
                error={errorFor("review_goal")}
                errorId={errorId("review_goal")}
              >
                {REVIEW_GOALS.map((goal) => (
                  <Chip key={goal} active={form.reviewGoal === goal} onClick={() => update("reviewGoal", goal)}>
                    {dictionary.reviewGoals[goal]}
                  </Chip>
                ))}
              </ChipGroup>
            </>
          )}

          <ChipGroup field="contact" legend={dictionary.preferredContactLabel} error={null} errorId={`${id}-contact-error`}>
            {PREFERRED_CONTACTS.map((contact) => (
              <Chip
                key={contact}
                active={form.preferredContact === contact}
                onClick={() => update("preferredContact", contact)}
              >
                {contact === "whatsapp" ? <FaWhatsapp size={15} /> : <FaEnvelope size={13} />}
                {dictionary.preferredContacts[contact]}
              </Chip>
            ))}
          </ChipGroup>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div data-field="name" className="flex flex-col gap-2">
              <label htmlFor={`${id}-name`} className={labelText}>
                {dictionary.firstNameLabel} <span className="normal-case tracking-normal">{dictionary.optional}</span>
              </label>
              <input
                id={`${id}-name`}
                type="text"
                name="firstName"
                autoComplete="given-name"
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                aria-invalid={nameError ? true : undefined}
                aria-describedby={describedBy(!!nameError && errorId("name"))}
                className={`${inputBase} ${nameError ? "border-red-400" : "border-neutral-300"}`}
              />
              {nameError && (
                <p id={errorId("name")} className="text-sm text-red-500">
                  {nameError}
                </p>
              )}
            </div>

            {form.preferredContact === "email" && (
              <div data-field="email" className="flex flex-col gap-2">
                <label htmlFor={`${id}-email`} className={labelText}>
                  {dictionary.emailLabel}
                </label>
                <input
                  id={`${id}-email`}
                  type="email"
                  name="email"
                  autoComplete="email"
                  dir="ltr"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  aria-invalid={emailError ? true : undefined}
                  aria-describedby={describedBy(!!emailError && errorId("email"))}
                  className={`${inputBase} rtl:text-right ${emailError ? "border-red-400" : "border-neutral-300"}`}
                />
                {emailError && (
                  <p id={errorId("email")} className="text-sm text-red-500">
                    {emailError}
                  </p>
                )}
              </div>
            )}

            <div data-field="phone" className="flex flex-col gap-2">
              {/* The hint below already says it's optional. */}
              <label htmlFor={`${id}-phone`} className={labelText}>
                {dictionary.phoneLabel}
              </label>
              <input
                id={`${id}-phone`}
                type="tel"
                name="phone"
                inputMode="tel"
                autoComplete="tel"
                dir="ltr"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                aria-invalid={phoneError ? true : undefined}
                aria-describedby={describedBy(phoneHintId, !!phoneError && errorId("phone"))}
                className={`${inputBase} rtl:text-right ${phoneError ? "border-red-400" : "border-neutral-300"}`}
              />
              <p id={phoneHintId} className="text-sm text-neutral-600">
                {dictionary.phoneHint}
              </p>
              {phoneError && (
                <p id={errorId("phone")} className="text-sm text-red-500">
                  {phoneError}
                </p>
              )}
            </div>
          </div>

          {/* Two separate boxes, both unticked: consent to be contacted about
              this request (required) is not a marketing permission. */}
          <div data-field="consent" className="flex flex-col gap-2">
            <label className="flex min-h-10 cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                required
                checked={form.contactConsent}
                onChange={(e) => update("contactConsent", e.target.checked)}
                aria-invalid={consentError ? true : undefined}
                aria-describedby={describedBy(!!consentError && errorId("consent"))}
                className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[#66a109]"
              />
              <span className="text-sm text-neutral-700 leading-relaxed">{dictionary.contactConsentLabel}</span>
            </label>
            {consentError && (
              <p id={errorId("consent")} className="text-sm text-red-500">
                {consentError}
              </p>
            )}
            <label className="flex min-h-10 cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={form.marketingConsent}
                onChange={(e) => update("marketingConsent", e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[#66a109]"
              />
              <span className="text-sm text-neutral-600 leading-relaxed">{dictionary.marketingConsentLabel}</span>
            </label>
          </div>
        </div>

        {status === "error" && submitError && (
          // The request didn't go through: say so plainly and still give the
          // visitor a way to reach the team with the same prepared message.
          <div role="alert" className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm text-red-700">{dictionary.requestErrors[submitError]}</p>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={`mt-4 ${secondaryButton}`}>
              <FaWhatsapp size={16} />
              {dictionary.openWhatsapp}
            </a>
            <p className="mt-2 text-xs text-neutral-600">{dictionary.whatsappNotSentNote}</p>
          </div>
        )}

        <div className="flex flex-col md:flex-row-reverse gap-4 mt-10 pt-8 border-t border-neutral-200">
          <button type="submit" disabled={status === "submitting"} className={`${primaryButton} w-full md:w-auto`}>
            {status === "submitting" ? dictionary.submitting : dictionary.submitRequest}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="w-full md:w-auto px-8 py-3.5 rounded-xl text-neutral-600 text-sm font-semibold uppercase tracking-widest rtl:tracking-normal hover:bg-neutral-100 transition-colors"
          >
            {dictionary.backToEstimate}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
