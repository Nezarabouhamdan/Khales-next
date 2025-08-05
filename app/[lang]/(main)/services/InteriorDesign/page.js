// app/[lang]/services/interior-design/page.js

import React from "react";
import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import InteriorDesignPage from "@/pages/InteriorDesignPage";
import FaqSchema from "@/components/FaqSchema/FaqSchema";

export async function generateMetadata({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.interiorDesignPage;

  const title =
    lang === "ar"
      ? `خدمات ${pageContent.intro.title} في دبي | مجموعة خالص`
      : `${pageContent.intro.title} Services in Dubai | Khales Group`;

  const description =
    lang === "ar"
      ? "نقدم حلول تصميم داخلي فاخرة للفلل والمساحات التجارية في دبي. يجمع فريقنا بين الإبداع والوظائف العملية لإنشاء مساحات تعكس رؤيتك."
      : "Luxury interior design solutions for villas and commercial spaces in Dubai. Our team combines creativity and functionality to create spaces that reflect your vision.";

  const keywords =
    lang === "ar"
      ? [
          "تصميم داخلي دبي",
          "شركات تصميم داخلي",
          "ديكورات فلل",
          "تصميم مكاتب",
          "تشطيبات فاخرة",
          "مصمم داخلي في دبي",
          "استشارات تصميم",
          "تأثيث مساحات",
          "تصميم تجاري",
          "ديكور مودرن",
          "تصميم شقق",
        ]
      : [
          "interior design Dubai",
          "interior design companies",
          "villa decor",
          "office design",
          "luxury fit-out",
          "interior designer in Dubai",
          "design consultancy",
          "space planning",
          "commercial interior design",
          "modern decor",
          "apartment design",
        ];

  return generatePageMetadata({
    title: title,
    description: description,
    keywords: keywords,
    lang: lang,
    alternatesUrl: "/services/interior-design",
  });
}

export default async function Page({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.interiorDesignPage;
  const ctaContent = dictionary.cta;

  return (
    <>
      <FaqSchema questions={pageContent.faq.questions} />
      <InteriorDesignPage
        lang={lang}
        content={pageContent}
        ctaContent={ctaContent}
      />
    </>
  );
}
