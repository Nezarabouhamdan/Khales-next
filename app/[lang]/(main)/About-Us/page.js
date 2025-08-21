// /app/[lang]/(main)/About-Us/page.js

import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import AboutUsPageClient from "@/pages/AboutsusPage";

// Helper component to render JSON-LD schema cleanly
const JsonLdSchema = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

// This function is correct
export async function generateMetadata({ params: { lang } }) {
  const dict = await getDictionary(lang);
  const pageData = dict.aboutUsPage;

  return generatePageMetadata({
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    keywords: pageData.metaKeywords,
    lang: lang,
    alternatesUrl: "/about-us",
  });
}

// ✅ MAIN FIX IS HERE
export default async function AboutUsPage({ params: { lang } }) {
  // ✅ YOU MUST FETCH THE DICTIONARY HERE
  const dict = await getDictionary(lang);

  // This will now work because 'dict' is defined
  const pageData = dict.aboutUsPage;

  const pageContent = {
    comprehensiveAbout: dict.comprehensiveAbout,
    valueProposition: dict.valueProposition,
    missionVision: pageData.missionVision,
  };

  const baseUrl = "https://www.khales.ae"; // Make sure this is correct
  const pageUrl = `${baseUrl}/${lang}/about-us`;

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: pageData.schemaName,
    description: pageData.schemaDescription,
    url: pageUrl,
    mainEntity: {
      "@type": "Organization",
      name: "Khales Group",
      url: baseUrl,
      logo: `${baseUrl}/assets/Khales-Logo.png`,
      description:
        "Premier architecture and interior design company in Dubai, UAE",
      address: {
        "@type": "PostalAddress",
        addressCountry: "AE",
        addressRegion: "Dubai",
        addressLocality: "Dubai",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+971551299880",
        contactType: "customer service",
        availableLanguage: ["English", "Arabic"],
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: pageData.breadcrumbHome,
        item: `${baseUrl}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageData.breadcrumbAbout,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <JsonLdSchema data={aboutSchema} />
      <JsonLdSchema data={breadcrumbSchema} />
      <AboutUsPageClient lang={lang} content={pageContent} />
    </>
  );
}
