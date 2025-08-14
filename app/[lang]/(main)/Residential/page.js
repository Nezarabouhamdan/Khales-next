import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import ProjectTypePageClient from "@/pages/ProjectTypePageClient";

// Generate dynamic, translated metadata for this page
export async function generateMetadata({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageData = dictionary.residentialPage;

  return generatePageMetadata({
    title: pageData.meta.title,
    description: pageData.meta.description,
    lang: lang,
    alternatesUrl: "/Residential",
  });
}

// This is the main server component for the residential route
export default async function ResidentialPage({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageData = dictionary.residentialPage;

  return <ProjectTypePageClient lang={lang} content={pageData} />;
}
