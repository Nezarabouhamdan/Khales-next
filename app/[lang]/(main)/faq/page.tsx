import type { Metadata } from "next";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import CTAHeroSection from "@/app/components/CTAHeroSection";
import FaqHeroSection from "@/app/components/legal/FaqHeroSection";
import FaqGroupsSection from "@/app/components/legal/FaqGroupsSection";
import { getDictionary } from "@/lib/get-dictionary";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { getWebPageSchema, getBreadcrumbSchema, getFaqPageSchema } from "@/lib/seo/schema";
import type { Locale } from "@/i18n-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const { faqPage } = dictionary;

  return generatePageMetadata({
    title: faqPage.metaTitle,
    description: faqPage.metaDescription,
    keywords: faqPage.metaKeywords,
    lang,
    path: "/faq",
  });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const { faqPage } = dictionary;

  const schema = getWebPageSchema(lang, "/faq", faqPage.schemaName, faqPage.schemaDescription);
  const breadcrumbSchema = getBreadcrumbSchema(lang, [
    { name: dictionary.navigation.items[0]?.label ?? "Home", path: "" },
    { name: faqPage.breadcrumbLabel, path: "/faq" },
  ]);
  const faqSchema = getFaqPageSchema(faqPage.groups.flatMap((group) => group.items));

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <SiteHeader lang={lang} navigation={dictionary.navigation} />
      <FaqHeroSection lang={lang} content={faqPage} />
      <FaqGroupsSection lang={lang} content={faqPage} />
      <CTAHeroSection lang={lang} content={dictionary.shared.cta} />
      <SiteFooter lang={lang} content={dictionary.footer} />
    </main>
  );
}
