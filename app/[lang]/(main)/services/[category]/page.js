import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import ServiceCategoryClientPage from "@/pages/ServiceCategoryClientPage";

// This tells Next.js which category pages to pre-build
export async function generateStaticParams() {
  return [
    { category: "project-management" },
    { category: "EngineeringConsultancy" },
  ];
}

// Generate dynamic metadata for each category page
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

export default async function ServiceCategoryPage({
  params: { lang, category },
}) {
  const dictionary = await getDictionary(lang);
  const pageData = dictionary.servicesPage;
  const categoryData = pageData[category];

  // If the category doesn't exist in the dictionary, show a 404 page
  if (!categoryData) {
    notFound();
  }

  // Filter the sub-services to get only the ones for the current category
  const subServicesForCategory = Object.values(pageData.subServices).filter(
    (service) => service.categorySlug === category
  );

  return (
    <ServiceCategoryClientPage
      lang={lang}
      categoryData={categoryData} // Pass the title and intro
      subServices={subServicesForCategory} // Pass the filtered list of services
      learnMoreText={pageData.learnMore} // Pass the "Learn More" text
    />
  );
}
