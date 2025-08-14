import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import ProjectTypePageClient from "@/pages/ProjectTypePageClient";

export async function generateMetadata({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageData = dictionary.commercialPage;

  if (!pageData) {
    return { title: "Page Not Found" };
  }

  return generatePageMetadata({
    title: pageData.meta.title,
    description: pageData.meta.description,
    lang: lang,
    alternatesUrl: "/Commercial",
  });
}

export default async function CommercialPage({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageData = dictionary.commercialPage;
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
