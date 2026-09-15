import type { Metadata } from "next";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import CTAHeroSection from "@/app/components/CTAHeroSection";
import AboutHeroSection from "@/app/components/about/AboutHeroSection";
import AboutMessageSection from "@/app/components/about/AboutMessageSection";
import AboutOverviewSection from "@/app/components/about/AboutOverviewSection";
import AboutMilestonesSection from "@/app/components/about/AboutMilestonesSection";
import AboutMissionSection from "@/app/components/about/AboutMissionSection";
import AboutProcessSection from "@/app/components/about/AboutProcessSection";
import AboutSpotlightSection from "@/app/components/about/AboutSpotlightSection";
import AboutPhilosophySection from "@/app/components/about/AboutPhilosophySection";
import AboutStatsFlipSection from "@/app/components/about/AboutStatsFlipSection";
import { getDictionary } from "@/lib/get-dictionary";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { getAboutPageSchema, getBreadcrumbSchema } from "@/lib/seo/schema";
import type { Locale } from "@/i18n-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const { aboutUsPage } = dictionary;

  return generatePageMetadata({
    title: aboutUsPage.metaTitle,
    description: aboutUsPage.metaDescription,
    keywords: aboutUsPage.metaKeywords,
    lang,
    path: "/about",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const { aboutUsPage } = dictionary;

  const aboutSchema = getAboutPageSchema(lang, aboutUsPage.schemaName, aboutUsPage.schemaDescription);
  const breadcrumbSchema = getBreadcrumbSchema(lang, [
    { name: aboutUsPage.breadcrumbHome, path: "" },
    { name: aboutUsPage.breadcrumbAbout, path: "/about" },
  ]);

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <SiteHeader lang={lang} navigation={dictionary.navigation} />
      <AboutHeroSection lang={lang} content={aboutUsPage.hero} />
      <AboutMessageSection lang={lang} content={aboutUsPage.message} />
      <AboutOverviewSection lang={lang} content={aboutUsPage.overview} />
      <AboutMilestonesSection lang={lang} content={aboutUsPage.milestones} />
      <AboutMissionSection lang={lang} content={aboutUsPage.missionVision} />
      <AboutProcessSection lang={lang} content={aboutUsPage.process} />
      <AboutSpotlightSection lang={lang} content={aboutUsPage.spotlight} />
      <AboutPhilosophySection lang={lang} content={aboutUsPage.philosophy} />
      <AboutStatsFlipSection lang={lang} content={aboutUsPage.statsFlip} />
      <CTAHeroSection lang={lang} content={dictionary.shared.cta} />
      <SiteFooter lang={lang} content={dictionary.footer} />
    </main>
  );
}
