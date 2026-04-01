// app/[lang]/services/feasibility-study/page.js

import React from "react";
import { getDictionary } from "@/get-dictionary";
import FeasibilityStudyPage from "@/pages/Projectstudy";

// ======================= THE FIX IS HERE =======================
// The metadata function now correctly uses the dictionary to get the title
export async function generateMetadata(props) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.feasibilityStudyPage;

  // Now, the title is dynamic and will change with the language
  return {
    title: `${pageContent.intro.title} | Khales Group`,
    description: pageContent.intro.description1,
    // Add alternates link for better SEO
    alternates: {
      languages: {
        en: "/en/services/Projectfeasability",
        ar: "/ar/services/Projectfeasability",
      },
    },
  };
}
// ===============================================================

export default async function Page(props) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.feasibilityStudyPage;
  const ctaContent = dictionary.cta;

  return (
    <FeasibilityStudyPage
      lang={lang}
      content={pageContent}
      ctaContent={ctaContent}
    />
  );
}
