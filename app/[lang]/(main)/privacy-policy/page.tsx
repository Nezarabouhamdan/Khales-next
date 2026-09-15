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
  const { privacyPolicyPage } = dictionary;

  return generatePageMetadata({
    title: privacyPolicyPage.metaTitle,
    description: privacyPolicyPage.metaDescription,
    keywords: privacyPolicyPage.metaKeywords,
    lang,
    path: "/privacy-policy",
  });
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const { privacyPolicyPage } = dictionary;

  const schema = getWebPageSchema(
    lang,
    "/privacy-policy",
    privacyPolicyPage.schemaName,
    privacyPolicyPage.schemaDescription,
  );
  const breadcrumbSchema = getBreadcrumbSchema(lang, [
    { name: dictionary.navigation.items[0]?.label ?? "Home", path: "" },
    { name: privacyPolicyPage.breadcrumbLabel, path: "/privacy-policy" },
  ]);

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <SiteHeader lang={lang} navigation={dictionary.navigation} />
      <LegalHeroSection lang={lang} content={privacyPolicyPage} />
      <LegalContentSection lang={lang} content={privacyPolicyPage} />
      <CTAHeroSection lang={lang} content={dictionary.shared.cta} />
      <SiteFooter lang={lang} content={dictionary.footer} />
    </main>
  );
}
