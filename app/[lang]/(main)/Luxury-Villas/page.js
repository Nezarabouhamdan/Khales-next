import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import ProjectTypePageClient from "@/pages/ProjectTypePageClient";
import { notFound } from "next/navigation"; // Make sure notFound is imported

// Generate dynamic, translated metadata for the Luxury Villas page
export async function generateMetadata({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  // Point to the luxuryVillaPage data
  const pageData = dictionary.luxuryVillaPage;

  if (!pageData) {
    return { title: "Page Not Found" };
  }

  return generatePageMetadata({
    title: pageData.meta.title,
    description: pageData.meta.description,
    lang: lang,
    // Update the alternates URL for this specific page
    alternatesUrl: "/luxury-villas",
  });
}

// The component for the Luxury Villas page
export default async function LuxuryVillaPage({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  // Fetch data specifically from the luxuryVillaPage object
  const pageData = dictionary.luxuryVillaPage;
  const ctaContent = dictionary.cta;

  // If page-specific data doesn't exist, trigger a 404
  if (!pageData || !ctaContent) {
    notFound();
  }

  return (
    <ProjectTypePageClient
      lang={lang}
      content={pageData}
      ctaContent={ctaContent}
    />
  );
}
