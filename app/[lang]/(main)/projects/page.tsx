import type { Metadata } from "next";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import CTAHeroSection from "@/app/components/CTAHeroSection";
import ProjectsIndexSection from "@/app/components/projects/ProjectsIndexSection";
import ProjectsCinematicReelSection from "@/app/components/projects/ProjectsCinematicReelSection";
import ProjectsCapabilitiesSection from "@/app/components/projects/ProjectsCapabilitiesSection";
import ProjectsMaterialsSection from "@/app/components/projects/ProjectsMaterialsSection";
import ProjectsNetworkSection from "@/app/components/projects/ProjectsNetworkSection";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "ar" ? "مشاريعنا | خالص" : "Projects | Khales",
    description:
      lang === "ar"
        ? "استكشف المساكن والتصاميم الداخلية والمباني الأيقونية التي صممتها خالص حول العالم."
        : "Explore residences, interiors and landmark buildings designed by Khales around the world.",
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <main className="flex-1">
      <SiteHeader lang={lang} navigation={dictionary.navigation} />
      <ProjectsIndexSection lang={lang} content={dictionary.projectsPage.index} />
      <ProjectsCinematicReelSection lang={lang} content={dictionary.projectsPage.cinematicReel} />
      <ProjectsCapabilitiesSection lang={lang} content={dictionary.projectsPage.capabilities} />
      <ProjectsMaterialsSection lang={lang} content={dictionary.projectsPage.materials} />
      <ProjectsNetworkSection lang={lang} content={dictionary.projectsPage.network} />
      <CTAHeroSection lang={lang} content={dictionary.shared.cta} />
      <SiteFooter lang={lang} content={dictionary.footer} />
    </main>
  );
}
