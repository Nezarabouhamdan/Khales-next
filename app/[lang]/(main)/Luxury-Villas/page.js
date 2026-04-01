import Script from "next/script";
import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import ProjectTypePageClient from "@/pages/ProjectTypePageClient";
import { notFound } from "next/navigation";

// --- SCHEMA FUNCTION (Structured Data for this specific page) ---
const getLuxuryVillaPageSchema = (lang, pageData) => {
  const baseUrl = "https://www.khales.ae";
  const pageUrl = `${baseUrl}/${lang}/Luxury-Villas`;
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
        name: "Bespoke Luxury Villa Design & Construction",
        description: description,
        provider: {
          "@type": "Organization",
          "@id": `${baseUrl}/#organization`,
          name: "Khales",
          url: baseUrl,
        },
        // Target specific, high-value locations mentioned in your content
        areaServed: [
          { "@type": "City", name: "Dubai" },
          { "@type": "AdministrativeArea", name: "Palm Jumeirah" },
          { "@type": "AdministrativeArea", name: "Dubai Hills" },
          { "@type": "Country", name: "United Arab Emirates" },
        ],
        // Dynamically create service offerings from your dictionary data
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Luxury Villa Solutions",
          itemListElement: pageData.challenges.solutions.map((solution) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: solution.split(":")[0].trim(), // Extracts "Design Solutions", etc.
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
            name: pageData.header.title, // Use the actual H1 from the page content
            item: pageUrl,
          },
        ],
      },
    ],
  };
};

// --- METADATA (Enriched with Long-tail and Short-tail Keywords) ---
export async function generateMetadata(props) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);
  const pageData = dictionary.luxuryVillaPage;

  if (!pageData) {
    return { title: "Page Not Found" };
  }

  // --- ADDED: Language-specific, targeted keywords ---
  const keywords =
    lang === "ar"
      ? [
          // Short-tail
          "فلل فاخرة دبي",
          "بناء فلل",
          "تصميم فيلا مخصص",
          "مقاولات فلل الإمارات",
          // Long-tail
          "تصميم فيلا حسب الطلب في نخلة جميرا",
          "بناء فلل تسليم مفتاح في دبي هيلز",
          "مهندسون معماريون للفلل الراقية",
          "شركة بناء فلل خاصة",
        ]
      : [
          // Short-tail
          "luxury villas Dubai",
          "villa construction",
          "custom villa design",
          "villa contractors UAE",
          // Long-tail
          "bespoke villa design Palm Jumeirah",
          "turnkey villa construction Dubai Hills",
          "high-end villa architects",
          "private villa construction company",
        ];

  return generatePageMetadata({
    title: pageData.meta.title,
    description: pageData.meta.description,
    keywords: keywords, // Pass the new keywords array
    lang: lang,
    alternatesUrl: "/Luxury-Villas",
  });
}

// --- PAGE COMPONENT (Updated to include Schema) ---
export default async function LuxuryVillaPage(props) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);
  const pageData = dictionary.luxuryVillaPage;
  const ctaContent = dictionary.cta;

  if (!pageData || !ctaContent) {
    notFound();
  }

  // Generate the rich schema for this page
  const luxuryVillaSchema = getLuxuryVillaPageSchema(lang, pageData);

  return (
    <>
      {/* Inject the page-specific schema into the page's head */}
      <Script
        id="luxury-villa-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(luxuryVillaSchema),
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
