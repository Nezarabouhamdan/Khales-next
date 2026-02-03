import Script from "next/script";
import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import ProjectTypePageClient from "@/pages/ProjectTypePageClient";
import { notFound } from "next/navigation";

// --- SCHEMA FUNCTION (Structured Data) ---
const getCommercialPageSchema = (lang, pageData) => {
  const baseUrl = "https://www.khales.ae";
  const pageUrl = `${baseUrl}/${lang}/Commercial`;
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
        name: "Commercial Project Management",
        description: description,
        provider: {
          "@type": "Organization",
          "@id": `${baseUrl}/#organization`,
          name: "Khales",
          url: baseUrl,
        },
        areaServed: [
          { "@type": "City", name: "Dubai" },
          { "@type": "City", name: "Sharjah" },
          { "@type": "City", name: "Fujairah" },
          { "@type": "City", name: "Abu Dhabi" },
          { "@type": "Country", name: "United Arab Emirates" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Commercial Project Solutions",
          itemListElement: pageData.challenges.solutions.map(
            (solution, index) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: solution.split("–")[0].trim(), // Extracts the service name from the text
              },
            }),
          ),
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
            name: pageData.header.title, // Use the actual H1 title for the breadcrumb
            item: pageUrl,
          },
        ],
      },
    ],
  };
};

// --- METADATA (Now with Keywords) ---
export async function generateMetadata(props) {
  const { params } = props;
  const { lang } = params || {};
  const dictionary = await getDictionary(lang);
  const pageData = dictionary.commercialPage;

  if (!pageData) {
    return { title: "Page Not Found" };
  }

  // --- ADDED: Language-specific keywords for this page ---
  const keywords =
    lang === "ar"
      ? [
          "إدارة المشاريع التجارية دبي",
          "إنشاءات تجارية الإمارات",
          "إدارة مشاريع التجزئة",
          "استشاريو بناء المستشفيات",
          "إدارة مباني المكاتب",
          "تطوير المشاريع التجارية أبوظبي",
          "شركة إدارة مشاريع",
        ]
      : [
          "commercial project management Dubai",
          "commercial construction UAE",
          "retail project management",
          "hospital construction consultants",
          "office building management",
          "commercial development Abu Dhabi",
          "project management firm",
        ];

  return generatePageMetadata({
    title: pageData.meta.title,
    description: pageData.meta.description,
    keywords: keywords, // <-- Pass the keywords here
    lang: lang,
    alternatesUrl: "/Commercial",
  });
}

// --- PAGE COMPONENT (Updated) ---
export default async function CommercialPage(props) {
  const { params } = props;
  const { lang } = params || {};
  const dictionary = await getDictionary(lang);
  const pageData = dictionary.commercialPage;
  const ctaContent = dictionary.cta;

  if (!pageData || !ctaContent) {
    notFound();
  }

  const commercialPageSchema = getCommercialPageSchema(lang, pageData);

  return (
    <>
      <Script
        id="commercial-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(commercialPageSchema),
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
