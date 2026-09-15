import type { Metadata } from "next";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import CTAHeroSection from "@/app/components/CTAHeroSection";
import ServicesIndexSection from "@/app/components/services/ServicesIndexSection";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "ar" ? "خدماتنا | خالص" : "Services | Khales",
    description:
      lang === "ar"
        ? "إدارة المشاريع، الاستشارات الهندسية، التصميم الداخلي، وتنسيق الحدائق - كل التخصصات التي يحتاجها مشروعك من خالص."
        : "Project management, engineering consultancy, interior design and landscaping - every discipline your project needs, from Khales.",
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <main className="flex-1">
      <SiteHeader lang={lang} navigation={dictionary.navigation} />
      <ServicesIndexSection lang={lang} content={dictionary.servicesPage.index} />
      <CTAHeroSection lang={lang} content={dictionary.shared.cta} />
      <SiteFooter lang={lang} content={dictionary.footer} />
    </main>
  );
}
