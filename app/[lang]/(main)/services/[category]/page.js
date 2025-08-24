import Script from "next/script"; // <-- IMPORT SCRIPT COMPONENT
import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import ServiceCategoryClientPage from "@/pages/ServiceCategoryClientPage";

// --- NEW SCHEMA FUNCTION (For Service Category Hubs) ---
const getServiceCategoryPageSchema = (
  lang,
  category,
  categoryData,
  subServices
) => {
  const baseUrl = "https://www.khales.ae";
  const pageUrl = `${baseUrl}/${lang}/services/${category}`;

  // This schema describes the page as a collection of services,
  // listing each sub-service as an item in that collection.
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage", // <-- The perfect schema for a category page
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: categoryData.metaTitle,
        description: categoryData.metaDescription,
        isPartOf: { "@id": `${baseUrl}/#website` },
        breadcrumb: { "@id": `${pageUrl}/#breadcrumb` },
        // The main content of this page is a list of services
        mainEntity: {
          "@type": "ItemList",
          itemListElement: subServices.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Service",
              name: service.title,
              description: service.description,
              url: `${baseUrl}${service.path}`, // Use the full path for the URL
              provider: {
                "@type": "Organization",
                name: "Khales",
              },
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
          // Optional: Add a link to a main "Services" index page if you have one
          // { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/${lang}/services` },
          {
            "@type": "ListItem",
            position: 2,
            name: categoryData.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };
};

// This tells Next.js which category pages to pre-build
export async function generateStaticParams() {
  return [
    { lang: "en", category: "project-management" },
    { lang: "ar", category: "project-management" },
    { lang: "en", category: "EngineeringConsultancy" },
    { lang: "ar", category: "EngineeringConsultancy" },
  ];
}

// Generate dynamic metadata for each category page (Your existing code is great)
export async function generateMetadata({ params: { lang, category } }) {
  const dictionary = await getDictionary(lang);
  const categoryData = dictionary.servicesPage[category];

  if (!categoryData) return { title: "Services" };

  return generatePageMetadata({
    title: categoryData.metaTitle,
    description: categoryData.metaDescription,
    keywords: categoryData.metaKeywords,
    lang,
    alternatesUrl: `/services/${category}`,
  });
}

// --- PAGE COMPONENT (Updated with Schema injection) ---
export default async function ServiceCategoryPage({
  params: { lang, category },
}) {
  const dictionary = await getDictionary(lang);
  const pageData = dictionary.servicesPage;
  const categoryData = pageData[category];

  if (!categoryData) {
    notFound();
  }

  const subServicesForCategory = Object.values(pageData.subServices).filter(
    (service) => service.categorySlug === category
  );

  // Generate the rich schema for this specific category page
  const categorySchema = getServiceCategoryPageSchema(
    lang,
    category,
    categoryData,
    subServicesForCategory
  );

  return (
    <>
      {/* Inject the dynamic category schema into the page */}
      <Script
        id="service-category-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />

      <ServiceCategoryClientPage
        lang={lang}
        categoryData={categoryData}
        subServices={subServicesForCategory}
        learnMoreText={pageData.learnMore}
      />
    </>
  );
}
