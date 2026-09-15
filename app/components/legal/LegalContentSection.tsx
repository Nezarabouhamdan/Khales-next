"use client";

import type { Locale } from "@/i18n-config";
import type { LegalPageDict } from "@/dictionaries/types";

type LegalContentSectionProps = {
  lang: Locale;
  content: LegalPageDict;
};

export default function LegalContentSection({ lang, content }: LegalContentSectionProps) {
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <section dir={dir} className="relative w-full bg-[#f7f7f7] text-neutral-900 px-6 md:px-16 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col divide-y divide-neutral-200 border-t border-neutral-200">
          {content.sections.map((section, i) => (
            <div key={section.heading} className="py-10 first:pt-0">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-xs font-medium text-neutral-400 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-lg md:text-xl font-semibold tracking-tight">{section.heading}</h2>
              </div>
              <p className="text-neutral-600 leading-relaxed">{section.content}</p>
              {section.list && (
                <ul className="mt-4 space-y-2 ps-5 list-disc marker:text-neutral-400 text-neutral-600">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.extra && <p className="mt-4 text-neutral-600 leading-relaxed">{section.extra}</p>}
              {section.contactDetails && (
                <ul className="mt-4 space-y-1 text-neutral-900 font-medium">
                  {section.contactDetails.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
