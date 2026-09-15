"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import type { LocalizedService } from "@/data/services";
import type { Locale } from "@/i18n-config";
import type { ServiceDetailDict } from "@/dictionaries/types";

type SectionKey = "overview" | "includes" | "process" | "faq";

export default function ServiceDetailView({
  lang,
  service,
  next,
  content,
}: {
  lang: Locale;
  service: LocalizedService;
  next: LocalizedService;
  content: ServiceDetailDict;
}) {
  const introRef = useRef<HTMLDivElement>(null);
  const dir = lang === "ar" ? "rtl" : "ltr";
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState<SectionKey>("overview");

  const sections: Array<{ key: SectionKey; label: string; show: boolean }> = [
    { key: "overview", label: content.serviceBriefLabel, show: true },
    { key: "includes", label: content.keyFeaturesLabel, show: service.keyFeatures.length > 0 },
    { key: "process", label: content.processLabel, show: service.process.length > 0 },
    { key: "faq", label: content.faqLabel, show: service.faqs.length > 0 },
  ];
  const visibleSections = sections.filter((s) => s.show);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        introRef.current,
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" },
      );
    });
    return () => ctx.revert();
  }, [service.slug]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionKey);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );

    visibleSections.forEach((s) => {
      const el = document.getElementById(s.key);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service.slug]);

  return (
    <div dir={dir} className="bg-white text-neutral-900">
      {/* Text-only intro, no full-bleed hero photo */}
      <div className="px-6 md:px-16 pt-32 md:pt-40 pb-12 md:pb-16 border-b border-neutral-200">
        <div ref={introRef} className="max-w-4xl mx-auto md:mx-0">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs uppercase tracking-widest font-medium px-3 py-1.5 rounded-full border border-neutral-300 text-neutral-600">
              {service.categoryLabel}
            </span>
          </div>
          <h1 className="font-semibold tracking-tight text-4xl md:text-6xl leading-[1.02] max-w-3xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-2xl text-neutral-500 text-lg leading-relaxed">
            {service.description}
          </p>

          {/* Meta strip */}
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-neutral-200 pt-6">
            {service.keyFeatures.length > 0 && (
              <div>
                <p className="text-2xl font-semibold tracking-tight">
                  {String(service.keyFeatures.length).padStart(2, "0")}
                </p>
                <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">
                  {content.keyFeaturesLabel}
                </p>
              </div>
            )}
            {service.process.length > 0 && (
              <div>
                <p className="text-2xl font-semibold tracking-tight">
                  {String(service.process.length).padStart(2, "0")}
                </p>
                <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">
                  {content.processLabel}
                </p>
              </div>
            )}
            {service.faqs.length > 0 && (
              <div>
                <p className="text-2xl font-semibold tracking-tight">
                  {String(service.faqs.length).padStart(2, "0")}
                </p>
                <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">
                  {content.faqLabel}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dossier body: sticky section nav + content */}
      <div className="px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 md:gap-16">
          <nav className="hidden md:flex md:flex-col md:sticky md:top-32 md:self-start gap-1">
            {visibleSections.map((s) => (
              <a
                key={s.key}
                href={`#${s.key}`}
                className={`text-sm py-2 border-s-2 ps-4 transition-colors ${
                  activeSection === s.key
                    ? "border-neutral-900 text-neutral-900 font-medium"
                    : "border-neutral-200 text-neutral-400 hover:text-neutral-600"
                }`}
              >
                {s.label}
              </a>
            ))}
          </nav>

          <div className="min-w-0 flex flex-col gap-20 md:gap-28">
            {/* Overview */}
            <section id="overview" className="scroll-mt-32">
              <p className="text-xs uppercase tracking-widest text-neutral-400 mb-6 md:hidden">
                {content.serviceBriefLabel}
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
                <div className="max-w-2xl">
                  {service.longDescription.split("\n\n").map((paragraph, index) => (
                    <p
                      key={paragraph.slice(0, 24) + index}
                      className={
                        index === 0
                          ? "text-lg md:text-xl font-light leading-relaxed text-neutral-800"
                          : "mt-6 text-neutral-600 leading-relaxed"
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {service.gallery[0] && (
                  <div className="relative w-full h-64 lg:h-80 overflow-hidden rounded-sm">
                    <Image
                      src={service.gallery[0]}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 360px"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </section>

            {/* Includes */}
            {service.keyFeatures.length > 0 && (
              <section id="includes" className="scroll-mt-32">
                <p className="text-xs uppercase tracking-widest text-neutral-400 mb-6">
                  {content.keyFeaturesLabel}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.keyFeatures.map((feature, index) => (
                    <div
                      key={feature}
                      className="flex items-start gap-4 p-5 rounded-sm border border-neutral-200"
                    >
                      <span className="text-xs font-mono text-neutral-400 mt-0.5">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-neutral-800 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Process: vertical timeline */}
            {service.process.length > 0 && (
              <section id="process" className="scroll-mt-32">
                <p className="text-xs uppercase tracking-widest text-neutral-400 mb-8">
                  {content.processLabel}
                </p>
                <div className="relative ps-8">
                  <div className="absolute top-1 bottom-1 start-[7px] w-px bg-neutral-200" />
                  <div className="flex flex-col gap-10">
                    {service.process.map((step, index) => (
                      <div key={step.title} className="relative">
                        <span className="absolute -start-8 top-0.5 w-4 h-4 rounded-full bg-white border-2 border-neutral-900" />
                        <p className="text-xs font-mono text-neutral-400 mb-1">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="font-medium text-lg tracking-tight">{step.title}</h3>
                        <p className="mt-2 text-neutral-600 leading-relaxed max-w-xl">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Gallery filmstrip */}
            {service.gallery.length > 1 && (
              <section className="scroll-mt-32">
                <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-none">
                  {service.gallery.slice(1).map((image, index) => (
                    <div
                      key={image + index}
                      className="relative w-72 h-48 md:w-96 md:h-64 shrink-0 overflow-hidden rounded-sm"
                    >
                      <Image
                        src={image}
                        alt={`${service.title} - ${content.galleryViewLabel} ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 288px, 384px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ */}
            {service.faqs.length > 0 && (
              <section id="faq" className="scroll-mt-32">
                <p className="text-xs uppercase tracking-widest text-neutral-400 mb-6">
                  {content.faqLabel}
                </p>
                <div className="flex flex-col gap-3">
                  {service.faqs.map((faq, index) => {
                    const isOpen = openFaq === index;
                    return (
                      <div
                        key={faq.question}
                        className={`rounded-sm border transition-colors ${
                          isOpen ? "border-neutral-900" : "border-neutral-200"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : index)}
                          className="w-full flex items-center justify-between gap-6 p-5 text-start"
                        >
                          <span className="font-medium tracking-tight">{faq.question}</span>
                          <span
                            className={`shrink-0 text-xl leading-none text-neutral-400 transition-transform duration-300 ${
                              isOpen ? "rotate-45" : ""
                            }`}
                          >
                            +
                          </span>
                        </button>
                        <div
                          className={`grid transition-all duration-300 ease-out ${
                            isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="overflow-hidden px-5">
                            <p className="text-neutral-600 leading-relaxed max-w-2xl">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Next service: compact text card, not full-bleed image */}
      <div className="px-6 md:px-16 pb-24">
        <div className="max-w-6xl mx-auto">
          <Link
            href={`/${lang}/services/${next.slug}`}
            className="group flex items-center justify-between gap-6 p-8 md:p-10 rounded-sm border border-neutral-200 hover:border-neutral-900 transition-colors"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">
                {content.nextServiceLabel}
              </p>
              <h2 className="font-semibold tracking-tight text-2xl md:text-3xl group-hover:opacity-70 transition-opacity">
                {next.title}
              </h2>
            </div>
            <span className="shrink-0 text-2xl text-neutral-400 group-hover:translate-x-1 group-hover:text-neutral-900 transition-all rtl:group-hover:-translate-x-1">
              {dir === "rtl" ? "←" : "→"}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
