"use client";

import Image from "next/image";
import type { Locale } from "@/i18n-config";
import type { InteriorShowcaseSectionDict } from "@/dictionaries/types";

const defaultContent: InteriorShowcaseSectionDict = {
  imageAlt: "Interior",
};

type InteriorShowcaseSectionProps = {
  lang?: Locale;
  content?: InteriorShowcaseSectionDict;
};

export default function InteriorShowcaseSection({
  lang = "en",
  content = defaultContent,
}: InteriorShowcaseSectionProps = {}) {
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <section dir={dir} className="relative w-full h-screen">
      <Image
        src="https://api.ab-sl.com/uploads/section_696f421f84.jpg"
        alt={content.imageAlt}
        fill
        sizes="100vw"
        className="object-cover"
      />
    </section>
  );
}
