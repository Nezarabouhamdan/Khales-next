import type { Metadata } from "next";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import CTAHeroSection from "@/app/components/CTAHeroSection";
import LegalHeroSection from "@/app/components/legal/LegalHeroSection";
import LegalContentSection from "@/app/components/legal/LegalContentSection";
import { getDictionary } from "@/lib/get-dictionary";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { getWebPageSchema, getBreadcrumbSchema } from "@/lib/seo/schema";
import type { Locale } from "@/i18n-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const { termsPage } = dictionary;

  return generatePageMetadata({
    title: termsPage.metaTitle,
    description: termsPage.metaDescription,
    keywords: termsPage.metaKeywords,
    lang,
    path: "/terms-and-conditions",
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const { termsPage } = dictionary;

  const schema = getWebPageSchema(lang, "/terms-and-conditions", termsPage.schemaName, termsPage.schemaDescription);
  const breadcrumbSchema = getBreadcrumbSchema(lang, [
    { name: dictionary.navigation.items[0]?.label ?? "Home", path: "" },
    { name: termsPage.breadcrumbLabel, path: "/terms-and-conditions" },
  ]);

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <SiteHeader lang={lang} navigation={dictionary.navigation} />
      <LegalHeroSection lang={lang} content={termsPage} />
      <LegalContentSection lang={lang} content={termsPage} />
      <CTAHeroSection lang={lang} content={dictionary.shared.cta} />
      <SiteFooter lang={lang} content={dictionary.footer} />
    </main>
  );
}
