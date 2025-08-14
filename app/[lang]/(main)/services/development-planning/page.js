// app/[lang]/services/development-planning/page.js

import React from "react";
import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import DevelopmentplanningPage from "@/Pages/DevelopmentplanningPage";
import FaqSchema from "@/components/FaqSchema/FaqSchema";

export async function generateMetadata({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.developmentPlanningPage;

  const title =
    lang === "ar"
      ? `${pageContent.intro.title} | مجموعة خالص`
      : `${pageContent.intro.title} | Khales Group`;

  const description =
    lang === "ar"
      ? "خدمات التخطيط التطويري للمشاريع العقارية في دبي. نحلل الجدوى، وندير الموافقات، ونحول الأراضي إلى مشاريع ناجحة."
      : "Expert development planning services for real estate projects in Dubai. We analyze feasibility, manage approvals, and turn land into successful projects.";

  const keywords =
    lang === "ar"
      ? ["تخطيط تطويري", "دراسة جدوى", "موافقات بلدية دبي", "استثمار عقاري"]
      : [
          "development planning",
          "feasibility study",
          "dubai municipality approvals",
          "real estate investment",
        ];

  return generatePageMetadata({
    title: title,
    description: description,
    keywords: keywords,
    lang: lang,
    alternatesUrl: "/services/development-planning",
  });
}

export default async function Page({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.developmentPlanningPage;
  const ctaContent = dictionary.cta;

  return (
    <>
      {/* ======================= THE SEO UPGRADE IS HERE ======================= */}
      {/* 2. ADD THE FaqSchema COMPONENT AND PASS THE QUESTIONS TO IT */}
      <FaqSchema questions={pageContent.faq.questions} />
      {/* ======================================================================= */}

      <DevelopmentplanningPage
        lang={lang}
        content={pageContent}
        ctaContent={ctaContent}
      />
    </>
  );
}
