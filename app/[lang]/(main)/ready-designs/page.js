import { getDictionary } from "@/get-dictionary";
import AIBanner from "@/app/AIBanner";
import CTASection from "@/app/CTASection";
import DesignsGallery from "@/app/DesignsGallery";
import FeaturedShowcase from "@/app/FeaturedShowcase";
import FeaturesSection from "@/app/FeaturesSection";
import GulfSection from "@/app/GulfSection";
import HeroSection from "@/app/HeroSection";
import PricingSection from "@/app/PricingSection";
import ProcessSection from "@/app/ProcessSection";
import SectionDivider from "@/app/SectionDivider";
import TestimonialsSection from "@/app/TestimonialsSection";

export async function generateMetadata({ params }) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);
  return {
    title:
      dictionary.readyDesignsPage?.metaTitle ||
      "تصاميم معمارية جاهزة للتنفيذ | خالص",
    description:
      dictionary.readyDesignsPage?.metaDescription ||
      "اكتشف مجموعة حصرية من التصاميم المعمارية والداخلية الجاهزة.",
  };
}

export default async function DesignHubPage({ params }) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);
  const content = dictionary.readyDesignsPage;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800" dir={dir}>
      <HeroSection content={content?.hero} lang={lang} />
      <SectionDivider />
      <ProcessSection content={content?.process} lang={lang} />
      <SectionDivider />
      <DesignsGallery content={content?.gallery} lang={lang} />
      <SectionDivider />
      <PricingSection content={content?.pricing} lang={lang} />
      <SectionDivider />
      <AIBanner content={content?.aiBanner} lang={lang} />
      <SectionDivider />
      <FeaturesSection content={content?.features} lang={lang} />
      <SectionDivider />
      <TestimonialsSection content={content?.testimonials} lang={lang} />
      <SectionDivider />
      <GulfSection content={content?.gulf} lang={lang} />
      <SectionDivider />
      <CTASection content={content?.cta} lang={lang} />
    </div>
  );
}
