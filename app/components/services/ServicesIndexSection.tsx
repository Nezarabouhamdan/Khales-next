"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { services as allServices, localizeService, ServiceCategory } from "@/data/services";
import type { Locale } from "@/i18n-config";
import type { ServicesIndexDict } from "@/dictionaries/types";

const tabs: Array<ServiceCategory | "ALL"> = ["ALL", "ProjectManagement", "EngineeringConsultancy"];

type ServicesIndexSectionProps = {
  lang: Locale;
  content: ServicesIndexDict;
};

export default function ServicesIndexSection({ lang, content }: ServicesIndexSectionProps) {
  const [activeTab, setActiveTab] = useState<ServiceCategory | "ALL">("ALL");
  const [openSlug, setOpenSlug] = useState<string | undefined>(undefined);
  const dir = lang === "ar" ? "rtl" : "ltr";

  const services = useMemo(
    () => allServices.map((s) => localizeService(s, lang)),
    [lang],
  );

  const filtered = useMemo(
    () =>
      activeTab === "ALL"
        ? services
        : services.filter((s) => s.category === activeTab),
    [activeTab, services],
  );

  return (
    <section
      dir={dir}
      className="relative w-full bg-white text-neutral-900 px-6 md:px-16 pt-32 pb-24 min-h-screen"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 md:gap-16">
        {/* Left rail: heading + category filter, sticky on desktop */}
        <div className="md:sticky md:top-32 md:self-start">
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-3">
            {content.eyebrow}
          </p>
          <h1 className="font-semibold tracking-tight text-3xl md:text-[2.75rem] leading-[1.05] mb-6">
            {content.title}
          </h1>
          <p className="text-neutral-500 leading-relaxed mb-8 max-w-sm">{content.intro}</p>

          <div className="flex flex-col gap-1 border-t border-neutral-200 pt-4">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-start text-sm py-2 border-b border-neutral-100 transition-colors ${
                    isActive
                      ? "text-neutral-900 font-medium"
                      : "text-neutral-400 hover:text-neutral-600"
                  }`}
                >
                  {content.tabLabels[tab]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column: accordion directory, no hover-preview panel */}
        <div className="border-t border-neutral-200">
          {filtered.map((service, i) => {
            const isOpen = openSlug === service.slug;
            return (
              <div key={service.slug} className="border-b border-neutral-200">
                <button
                  type="button"
                  onClick={() => setOpenSlug(isOpen ? undefined : service.slug)}
                  className="w-full flex items-center gap-4 md:gap-8 py-6 text-start group"
                >
                  <span className="text-xs font-mono text-neutral-400 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-xl md:text-2xl font-medium tracking-tight truncate group-hover:text-neutral-600 transition-colors">
                      {service.title}
                    </span>
                    <span className="block text-xs uppercase tracking-widest text-neutral-400 mt-1">
                      {service.categoryLabel}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 text-2xl leading-none text-neutral-400 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] pb-8" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row gap-6 sm:items-center ps-0 sm:ps-12">
                      <div className="relative w-full sm:w-40 h-40 sm:h-28 shrink-0 overflow-hidden rounded-sm">
                        <Image
                          src={service.cover}
                          alt={service.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 160px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-neutral-500 leading-relaxed max-w-lg">
                          {service.description}
                        </p>
                        <Link
                          href={`/${lang}/services/${service.slug}`}
                          className="inline-flex items-center gap-2 mt-4 text-xs uppercase tracking-widest font-medium text-neutral-900 border-b border-neutral-900 pb-0.5 hover:gap-3 transition-all"
                        >
                          {content.learnMoreLabel}
                          <span aria-hidden>{dir === "rtl" ? "←" : "→"}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
