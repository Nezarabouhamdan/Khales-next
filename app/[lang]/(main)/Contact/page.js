// app/[lang]/connect/page.js

import React from "react";
import Script from "next/script";
import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import ContactPage from "@/pages/ContactPage";

const getContactPageSchema = (lang) => {
  const name = lang === "ar" ? "تواصل مع خالص" : "Contact Khales";
  const description =
    lang === "ar"
      ? "تواصل مع خالص لخدمات الهندسة المعمارية والتصميم الداخلي في دبي."
      : "Contact Khales for architecture and interior design services in Dubai, UAE.";
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: name,
    description: description,
    url: `https://www.khales.ae/${lang}/connect`,
  };
};

export async function generateMetadata({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.contactPage;
  const title =
    lang === "ar" ? `تواصل معنا | مجموعة خالص` : `Contact Us | Khales Group`;
  const description =
    lang === "ar"
      ? "تواصل مع فريق خبراء خالص لمناقشة احتياجات مشروعك في دبي والإمارات."
      : "Get in touch with the expert team at Khales to discuss your project needs in Dubai and the UAE.";
  const keywords =
    lang === "ar"
      ? ["تواصل مع مكتب هندسي", "رقم شركة تصميم داخلي", "استشارة معمارية دبي"]
      : [
          "contact architecture firm",
          "interior design company number",
          "architect consultation dubai",
        ];
  return generatePageMetadata({
    title,
    description,
    keywords,
    lang,
    alternatesUrl: "/connect",
  });
}

export default async function Page({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.contactPage;
  const ctaContent = dictionary.cta;
  const contactSchema = getContactPageSchema(lang);

  return (
    <>
      <Script
        id="contact-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactPage lang={lang} content={pageContent} ctaContent={ctaContent} />
    </>
  );
}
