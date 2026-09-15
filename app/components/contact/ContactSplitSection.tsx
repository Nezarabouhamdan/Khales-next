"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DrawnLine from "../DrawnLine";
import type { Locale } from "@/i18n-config";
import type { ContactSplitSectionDict } from "@/dictionaries/types";

const easeOut = [0.22, 1, 0.36, 1] as const;

// Real Khales social profiles (see Khales-next/data/FooterData.js) - not
// translated content, so they live here rather than in the dictionaries.
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/khales.ae/",
  pinterest: "https://www.pinterest.com/khalesae/",
};

type ContactSplitSectionProps = {
  lang: Locale;
  content: ContactSplitSectionDict;
};

export default function ContactSplitSection({ lang, content }: ContactSplitSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const dir = lang === "ar" ? "rtl" : "ltr";

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [projectType, setProjectType] = useState(content.form.projectTypes[0]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );
      gsap.fromTo(
        rightRef.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setSubmitting(true);
    setSubmitError(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          message: formData.get("message"),
          projectType,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Request failed");
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      dir={dir}
      className="relative w-full grid grid-cols-1 md:grid-cols-2"
    >
      {/* Left - identity / direct contact, dark, with a drawn architectural line */}
      <div
        ref={leftRef}
        className="relative bg-[#171717] text-white px-6 md:px-16 pt-40 md:pt-48 pb-16 md:pb-24 overflow-hidden"
      >
        <DrawnLine
          d="M -20 420 L 90 420 L 90 260 L 200 260 L 200 340 L 320 340 L 320 60 L 260 60 L 260 160 L 180 160"
          viewBox="0 0 400 460"
          className="absolute inset-0 w-full h-full text-white/15 pointer-events-none"
          strokeWidth={1.2}
          duration={2.2}
        />
        <DrawnLine
          d="M 40 40 L 40 440"
          viewBox="0 0 400 460"
          className="absolute inset-0 w-full h-full text-white/10 pointer-events-none"
          strokeWidth={1}
          duration={1.6}
          delay={0.3}
        />

        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-6">
            {content.eyebrow}
          </p>
          <h1 className="font-semibold tracking-tighter leading-[0.92] text-[clamp(2.4rem,5.5vw,4.5rem)]">
            {content.headingLine1}
            <br />
            {content.headingLine2}
          </h1>
          <p className="mt-6 max-w-sm text-neutral-300 leading-relaxed">
            {content.intro}
          </p>

          <div className="mt-14 flex flex-col gap-1">
            <a
              href={`mailto:${content.email}`}
              className="text-xl md:text-2xl font-medium underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors w-fit"
            >
              {content.email}
            </a>
            <a
              href={`tel:${content.phoneHref}`}
              className="text-xl md:text-2xl font-medium underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors w-fit"
            >
              {content.phone}
            </a>
          </div>

          <div className="mt-14 flex items-center gap-6 text-xs uppercase tracking-widest text-neutral-500">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              {content.socialInstagram}
            </a>
            <a
              href={SOCIAL_LINKS.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              {content.socialPinterest}
            </a>
          </div>
        </div>
      </div>

      {/* Right - the actual form, light */}
      <div
        ref={rightRef}
        className="relative bg-[#f7f7f7] text-neutral-900 px-6 md:px-16 pt-16 md:pt-48 pb-16 md:pb-24"
      >
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="done"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="flex flex-col justify-center h-full min-h-[360px]"
            >
              <h2 className="font-semibold tracking-tight text-3xl md:text-4xl mb-4">
                {content.success.heading}
              </h2>
              <p className="text-neutral-500 leading-relaxed max-w-md">
                {content.success.message}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-8 self-start text-xs uppercase tracking-widest font-medium underline underline-offset-4 hover:text-neutral-500 transition-colors"
              >
                {content.success.resetButton}
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <label className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-widest text-neutral-400">
                    {content.form.nameLabel}
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={content.form.namePlaceholder}
                    className="border-b border-neutral-300 bg-transparent py-3 text-base placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-widest text-neutral-400">
                    {content.form.emailLabel}
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={content.form.emailPlaceholder}
                    className="border-b border-neutral-300 bg-transparent py-3 text-base placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-neutral-400">
                  {content.form.phoneLabel}
                </span>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder={content.form.phonePlaceholder}
                  className="border-b border-neutral-300 bg-transparent py-3 text-base placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors"
                />
              </label>

              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-neutral-400">
                  {content.form.projectTypeLabel}
                </span>
                <div className="flex flex-wrap gap-3">
                  {content.form.projectTypes.map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setProjectType(type)}
                      className={`text-xs uppercase tracking-widest font-medium px-4 py-2 rounded-full border transition-colors ${
                        projectType === type
                          ? "bg-neutral-900 text-white border-neutral-900"
                          : "border-neutral-300 text-neutral-500 hover:border-neutral-900 hover:text-neutral-900"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-neutral-400">
                  {content.form.messageLabel}
                </span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder={content.form.messagePlaceholder}
                  className="border-b border-neutral-300 bg-transparent py-3 text-base placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors resize-none"
                />
              </label>

              {submitError && (
                <p className="text-sm text-red-600">{content.form.errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="self-start text-xs uppercase tracking-widest font-medium px-8 py-4 rounded-full bg-neutral-900 text-white hover:bg-neutral-700 transition-colors disabled:opacity-60"
              >
                {submitting ? content.form.submitting : content.form.submitButton}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
