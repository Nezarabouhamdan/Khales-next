import Script from "next/script";
import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import ProjectTypePageClient from "@/pages/ProjectTypePageClient";
import { notFound } from "next/navigation";

// --- SCHEMA FUNCTION (Structured Data for the Residential Page) ---
const getResidentialPageSchema = (lang, pageData) => {
  const baseUrl = "https://www.khales.ae";
  const pageUrl = `${baseUrl}/${lang}/Residential`;
  const name = pageData.meta.title;
  const description = pageData.meta.description;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: name,
        description: description,
        isPartOf: {
          "@id": `${baseUrl}/#website`,
        },
        breadcrumb: {
          "@id": `${pageUrl}/#breadcrumb`,
        },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}/#service`,
        name: "Luxury Residential Architecture and Construction",
        description: description,
        provider: {
          "@type": "Organization",
          "@id": `${baseUrl}/#organization`,
          name: "Khales",
          url: baseUrl,
        },
        areaServed: [
          { "@type": "Country", name: "United Arab Emirates" },
          { "@type": "City", name: "Dubai" },
          { "@type": "City", name: "Abu Dhabi" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Full-Cycle Design & Build Services",
          itemListElement: pageData.challenges.solutions.map((solution) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: solution.split("–")[0].trim(), // Extracts "Bespoke Design Solutions", etc.
            },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: lang === "ar" ? "الرئيسية" : "Home",
            item: `${baseUrl}/${lang}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: pageData.header.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };
};

// --- METADATA (Enriched with targeted Keywords) ---
export async function generateMetadata(props) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);
  const pageData = dictionary.residentialPage;

  if (!pageData) {
    return { title: "Page Not Found" };
  }

  // --- ADDED: Keywords for a broader residential audience ---
  const keywords =
    lang === "ar"
      ? [
          // Short-tail
          "مشاريع سكنية الإمارات",
          "بناء مباني سكنية",
          "تصميم قصور",
          "هندسة معمارية دبي",
          // Long-tail
          "شركة تصميم وبناء متكامل",
          "مقاولات تسليم مفتاح للمشاريع السكنية",
          "تصميم مباني سكنية فاخرة",
          "مهندسو قصور وفلل في الإمارات",
        ]
      : [
          // Short-tail
          "residential projects UAE",
          "residential building construction",
          "mansion design",
          "architecture firm Dubai",
          // Long-tail
          "full-cycle design and build company",
          "turnkey residential contractors",
          "luxury residential building design",
          "mansion and villa architects UAE",
        ];

  return generatePageMetadata({
    title: pageData.meta.title,
    description: pageData.meta.description,
    keywords: keywords, // Pass the new keywords array
    lang: lang,
    alternatesUrl: "/Residential",
  });
}

// --- PAGE COMPONENT (Updated with Schema injection) ---
export default async function ResidentialPage(props) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);
  const pageData = dictionary.residentialPage;
  const ctaContent = dictionary.cta;

  if (!pageData || !ctaContent) {
    notFound();
  }

  // Generate the rich schema for this page
  const residentialPageSchema = getResidentialPageSchema(lang, pageData);

  return (
    <>
      {/* Inject the page-specific schema into the page's head */}
      <Script
        id="residential-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(residentialPageSchema),
        }}
      />

      <ProjectTypePageClient
        lang={lang}
        content={pageData}
        ctaContent={ctaContent}
      />
    </>
  );
}
