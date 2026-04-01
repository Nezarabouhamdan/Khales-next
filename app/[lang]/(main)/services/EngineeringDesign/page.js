// app/[lang]/services/engineering-design/page.js

import React from "react";
import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import EngineeringDesignPage from "@/pages/EngineeringDesignPage";
import FaqSchema from "@/components/FaqSchema/FaqSchema";

export async function generateMetadata(props) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.engineeringDesignPage;

  const title =
    lang === "ar"
      ? `${pageContent.intro.title} | مجموعة خالص`
      : `${pageContent.intro.title} | Khales Group`;

  const description =
    lang === "ar"
      ? "نقدم خدمات التصميم الهندسي الإنشائي، الكهروميكانيكي، والصحي للمشاريع في دبي والإمارات. احصل على مخططات معتمدة وجاهزة للتنفيذ."
      : "Khales Group provides professional structural, MEP, and plumbing engineering design services for projects in Dubai and the UAE. Get approved, construction-ready drawings.";

  const keywords =
    lang === "ar"
      ? [
          "تصميم إنشائي",
          "تصميم كهروميكانيكي",
          "مخططات بلدية دبي",
          "استشارات هندسية",
        ]
      : [
          "structural design",
          "MEP design",
          "dubai municipality drawings",
          "engineering consultancy",
        ];

  return generatePageMetadata({
    title,
    description,
    keywords,
    lang,
    alternatesUrl: "/services/EngineeringDesign",
  });
}

export default async function Page(props) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.engineeringDesignPage;
  const ctaContent = dictionary.cta;

  return (
    <>
      {/* ======================= THE SEO UPGRADE IS HERE ======================= */}
      {/* 2. ADD THE FaqSchema COMPONENT AND PASS THE QUESTIONS TO IT */}
      <FaqSchema questions={pageContent.faq.questions} />
      {/* ======================================================================= */}

      <EngineeringDesignPage
        lang={lang}
        content={pageContent}
        ctaContent={ctaContent}
      />
    </>
  );
}
