import type { Metadata } from "next";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import ApplicationsHeroSection from "@/app/components/applications/ApplicationsHeroSection";
import CandidateSurveySection from "@/app/components/applications/CandidateSurveySection";
import { getDictionary } from "@/lib/get-dictionary";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { getWebPageSchema } from "@/lib/seo/schema";
import type { Locale } from "@/i18n-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const { applicationsPage } = dictionary;

  return generatePageMetadata({
    title: applicationsPage.metaTitle,
    description: applicationsPage.metaDescription,
    keywords: applicationsPage.metaKeywords,
    lang,
    path: "/applications",
  });
}

export default async function ApplicationsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const { applicationsPage } = dictionary;

  const schema = getWebPageSchema(
    lang,
    "/applications",
    applicationsPage.schemaName,
    applicationsPage.schemaDescription,
  );

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <SiteHeader lang={lang} navigation={dictionary.navigation} />
      <ApplicationsHeroSection lang={lang} content={applicationsPage} />
      <CandidateSurveySection lang={lang} content={applicationsPage} />
      <SiteFooter lang={lang} content={dictionary.footer} />
    </main>
  );
}
