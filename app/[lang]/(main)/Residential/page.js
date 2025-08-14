import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import ProjectTypePageClient from "@/Pages/ProjectTypePageClient";

// Generate dynamic, translated metadata for this page

// =======================================================
// THIS IS THE FIX: Import the notFound function
// =======================================================

// ... your generateMetadata function remains the same ...
export async function generateMetadata({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageData = dictionary.residentialPage;

  // It's good practice to add a check here too
  if (!pageData) {
    return { title: "Page Not Found" };
  }

  return generatePageMetadata({
    title: pageData.meta.title,
    description: pageData.meta.description,
    lang: lang,
    alternatesUrl: "/residential",
  });
}

export default async function ResidentialPage({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageData = dictionary.residentialPage;
  const ctaContent = dictionary.cta;

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
