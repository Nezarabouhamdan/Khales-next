import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import ProjectTypePageClient from "@/Pages/ProjectTypePageClient";

// Generate dynamic, translated metadata for this page
export async function generateMetadata({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageData = dictionary.commercialPage;

  return generatePageMetadata({
    title: pageData.meta.title,
    description: pageData.meta.description,
    lang: lang,
    alternatesUrl: "/Commercial",
  });
}

// This is the main server component for the commercial route
export default async function CommercialPage({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageData = dictionary.commercialPage;

  return <ProjectTypePageClient lang={lang} content={pageData} />;
}
