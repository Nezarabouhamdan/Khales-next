// app/[lang]/services/landscape-design/page.js

import React from "react";
import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import LandscapingDesignPage from "@/Pages/LandscapingDesignPage";
import FaqSchema from "@/components/FaqSchema/FaqSchema";

export async function generateMetadata({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.landscapeDesignPage;

  const title =
    lang === "ar"
      ? "تصميم المناظر الطبيعية والحدائق في دبي | مجموعة خالص"
      : "Landscape and Garden Design in Dubai | Khales Group";

  const description =
    lang === "ar"
      ? "تصميم مساحات خارجية مبتكرة للفلل والمشاريع في الإمارات. متخصصون في تصميم الحدائق، والمسابح، والإضاءة الخارجية لتحقيق التوازن بين الجمال والاستدامة."
      : "Creative outdoor space design for villas and projects in the UAE. We specialize in garden design, swimming pools, and outdoor lighting to balance beauty and sustainability.";

  const keywords =
    lang === "ar"
      ? [
          "تصميم حدائق دبي",
          "لاندسكيب",
          "تصميم مسابح",
          "زراعة خارجية",
          "إضاءة حدائق",
          "شركة لاندسكيب في دبي",
          "هاردسكيب",
          "سوفت سكيب",
          "تصميم مساحات خارجية",
          "حدائق فلل",
          "صيانة حدائق",
        ]
      : [
          "landscape design Dubai",
          "landscaping",
          "pool design",
          "outdoor planting",
          "garden lighting",
          "landscape company in Dubai",
          "hardscape",
          "softscape",
          "outdoor space design",
          "villa gardens",
          "garden maintenance",
        ];

  return generatePageMetadata({
    title: title,
    description: description,
    keywords: keywords,
    lang: lang,
    alternatesUrl: "/services/landscape-design",
  });
}

export default async function Page({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.landscapeDesignPage;
  const ctaContent = dictionary.cta;

  return (
    <>
      <FaqSchema questions={pageContent.faq.questions} />
      <LandscapingDesignPage
        lang={lang}
        content={pageContent}
        ctaContent={ctaContent}
      />
    </>
  );
}
