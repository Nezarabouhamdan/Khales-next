import React from "react";
import Script from "next/script";
import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import ApplicationPage from "@/pages/ApplicationPage";

const getApplicationSchema = (lang, content) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: content.schemaName,
  description: content.schemaDescription,
  url: `https://www.khales.ae/${lang}/applications`,
});

export async function generateMetadata(props) {
  const { params } = props;
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.applicationPage;

  return generatePageMetadata({
    title: pageContent.metaTitle,
    description: pageContent.metaDescription,
    keywords: pageContent.metaKeywords,
    lang,
    alternatesUrl: "/applications",
  });
}

export default async function Page(props) {
  const { params } = props;
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.applicationPage;

  const schema = getApplicationSchema(lang, pageContent);

  return (
    <>
      <Script
        id="applications-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ApplicationPage lang={lang} content={pageContent} />
    </>
  );
}
