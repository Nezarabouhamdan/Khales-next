"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services, ServiceCategory, localizeService } from "@/data/services";
import type { Locale } from "@/i18n-config";
import type { ServicesSectionDict } from "@/dictionaries/types";

type CategoryType = ServiceCategory;

const defaultContent: ServicesSectionDict = {
  eyebrow: "What We Do",
  title: "Our Services",
  tabs: {
    ProjectManagement: "Project Management",
    EngineeringConsultancy: "Engineering Consultancy",
  },
  viewAllServicesLabel: "View All Services",
};

const CATEGORY_TABS: CategoryType[] = ["ProjectManagement", "EngineeringConsultancy"];

const pad = (n: number) => String(n).padStart(2, "0");

type ServicesSectionProps = {
  lang?: Locale;
  content?: ServicesSectionDict;
};

export default function ServicesSection({
  lang = "en",
  content = defaultContent,
}: ServicesSectionProps = {}) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  const tabLabels = content.tabs;
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<CategoryType>("ProjectManagement");

  const editorialServices = useMemo(
    () =>
      services
        .map((s) => localizeService(s, lang))
        .map((s) => ({
          id: s.id,
          slug: s.slug,
          title: s.title,
          description: s.description,
          image: s.cover,
          category: s.category,
        })),
    [lang],
  );

  const filteredServices = useMemo(() => {
    return editorialServices.filter((s) => s.category === activeTab);
  }, [editorialServices, activeTab]);

  // Rows fade/rise in whenever the active category changes.
  useEffect(() => {
    if (!listRef.current) return;
    gsap.fromTo(
      listRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" },
    );
  }, [activeTab]);

  // Section rises smoothly into place as it scrolls into view, matching the
  // reveal used by the other sub-sections.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 120, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            end: "top 40%",
            scrub: 1,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      dir={dir}
      className="relative w-full min-h-screen bg-[#0d0d0d] overflow-hidden flex flex-col justify-center py-24 md:py-32 px-6 md:px-16"
    >
      <div ref={contentRef} className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-14 md:pb-20 border-b border-white/10">
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">
              {content.eyebrow}
            </p>
            <h2 className="text-white font-semibold tracking-tight text-4xl md:text-6xl">
              {content.title}
            </h2>
          </div>

          {/* Minimal underline tabs, deliberately understated next to the
              curved-tab gallery layout used by Projects */}
          <div className="flex items-center gap-6 md:gap-10">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-2 text-xs md:text-sm uppercase tracking-widest font-medium transition-colors duration-300 cursor-pointer ${
                    isActive ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  {tabLabels[tab]}
                  <span
                    className={`absolute left-0 -bottom-px h-px bg-white transition-all duration-500 ease-out ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial rows - a small always-visible thumbnail sits in every
            row (not hover-gated, so it works the same on touch/mobile),
            with the title/arrow brightening on hover as the only
            interactive flourish. */}
        <div ref={listRef} className="flex flex-col">
          {filteredServices.map((s, i) => (
            <Link
              key={s.id}
              href={`/${lang}/services/${s.slug}`}
              className="group relative flex items-center justify-between gap-4 md:gap-6 py-6 md:py-10 border-b border-white/10"
            >
              <div className="flex items-center gap-4 md:gap-10 min-w-0">
                <span className="hidden sm:block text-xs md:text-sm font-mono text-neutral-600 shrink-0">
                  {pad(i + 1)}
                </span>

                <div className="relative w-16 h-12 md:w-24 md:h-16 shrink-0 overflow-hidden rounded-sm">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                <h3 className="text-lg sm:text-2xl md:text-5xl font-medium tracking-tight text-neutral-500 group-hover:text-white transition-colors duration-500 md:truncate">
                  {s.title}
                </h3>
              </div>

              <div className="flex items-center gap-4 md:gap-10 shrink-0">
                <p className="hidden lg:block max-w-xs text-sm leading-relaxed text-neutral-600 group-hover:text-neutral-400 transition-colors duration-500">
                  {s.description}
                </p>
                <span className="text-xl md:text-2xl text-neutral-600 group-hover:text-white group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-all duration-500">
                  {dir === "rtl" ? "←" : "→"}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="w-full flex justify-center pt-14 md:pt-20">
          <Link
            href={`/${lang}/services`}
            className="text-xs uppercase tracking-widest font-medium px-6 py-3 rounded-full bg-white/10 hover:bg-white hover:text-black border border-white/20 transition-all duration-300 backdrop-blur-sm"
          >
            {content.viewAllServicesLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
