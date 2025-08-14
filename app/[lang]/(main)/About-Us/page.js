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

// 1. Generate dynamic, translated metadata for this page
export async function generateMetadata({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageData = dictionary.aboutUsPage;

  return generatePageMetadata({
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    keywords: pageData.metaKeywords,
    lang: lang,
    alternatesUrl: "/about-us", // Use your new standardized URL
  });
}

// 2. This is the main server component for the "About Us" route
export default async function AboutUsPage({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageData = dictionary.aboutUsPage;
  const baseUrl = "https://www.khales.ae";
  const pageUrl = `${baseUrl}/${lang}/about-us`;

  // Dynamically generate the AboutPage Schema from the dictionary
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

  // Dynamically generate the Breadcrumb Schema from the dictionary
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
      {/* Inject schema directly into the page */}
      <JsonLdSchema data={aboutSchema} />
      <JsonLdSchema data={breadcrumbSchema} />

      {/* Render the client component, passing down the dictionary content */}
      <AboutUsPageClient lang={lang} content={pageData} />
    </>
  );
}
