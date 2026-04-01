// app/[lang]/services/engineering-supervision/page.js

import React from "react";
import { getDictionary } from "@/get-dictionary";
import EngineeringSupervisionPage from "@/pages/EngineeringSupervisionPage";
import FaqSchema from "@/components/FaqSchema/FaqSchema"; // <-- 1. IMPORT
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata(props) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.engineeringSupervisionPage;

  const title =
    lang === "ar"
      ? `${pageContent.intro.title} | مجموعة خالص`
      : `${pageContent.intro.title} | Khales Group`;

  const description =
    lang === "ar"
      ? "خدمات إشراف هندسي احترافية في دبي لضمان جودة البناء والالتزام بالمخططات. نراقب كل مرحلة من مراحل مشروعك لضمان أفضل النتائج."
      : "Professional engineering supervision services in Dubai to ensure construction quality and adherence to plans. We monitor every stage of your project for the best results.";

  const keywords =
    lang === "ar"
      ? [
          "إشراف هندسي",
          "مراقبة الجودة",
          "إدارة الإنشاءات",
          "استشاريون هندسيون دبي",
        ]
      : [
          "engineering supervision",
          "quality control",
          "construction management",
          "engineering consultants dubai",
        ];

  return generatePageMetadata({
    title,
    description,
    keywords,
    lang,
    alternatesUrl: "/services/EngineeringSupervision",
  });
}

export default async function Page(props) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.engineeringSupervisionPage;
  const ctaContent = dictionary.cta;

  return (
    <>
      {/* ======================= THE SEO UPGRADE IS HERE ======================= */}
      {/* 2. ADD THE FaqSchema COMPONENT AND PASS THE QUESTIONS TO IT */}
      <FaqSchema questions={pageContent.faq.questions} />
      {/* ======================================================================= */}

      <EngineeringSupervisionPage
        lang={lang}
        content={pageContent}
        ctaContent={ctaContent}
      />
    </>
  );
}
