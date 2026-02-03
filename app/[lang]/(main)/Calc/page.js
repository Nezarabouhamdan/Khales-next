import VillaCalculatorClient from "@/components/VillaCalculatorClient";
import { getDictionary } from "@/get-dictionary";
import Script from "next/script"; // Keep Script for JSON-LD

// --- METADATA ---
export async function generateMetadata(props) {
  const { params } = props;
  const { lang } = params || {};
  const dictionary = await getDictionary(lang);
  const { calcPage } = dictionary;

  return {
    title: calcPage.metaTitle,
    description: calcPage.metaDescription,
    keywords: calcPage.metaKeywords,
  };
}

// --- PAGE COMPONENT ---
export default async function VillaCalculatorPage(props) {
  const { params } = props;
  const { lang } = params || {};
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Script
        id="villa-calc-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: dictionary.calcPage.schemaName,
            description: dictionary.calcPage.schemaDescription,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
          }),
        }}
      />
      <VillaCalculatorClient lang={lang} dictionary={dictionary.calculator} />
    </>
  );
}
