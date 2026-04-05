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

export const metadata = {
  title: "تصاميم معمارية جاهزة للتنفيذ | خالص",
  description: "اكتشف مجموعة حصرية من التصاميم المعمارية والداخلية الجاهزة.",
};

export default function DesignHubPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800" dir="rtl">
      <HeroSection />
      <SectionDivider />
      <ProcessSection />
      <SectionDivider />
      <DesignsGallery />
      <SectionDivider />
      <PricingSection />
      <SectionDivider />
      <AIBanner />
      <SectionDivider />
      <FeaturesSection />
      <SectionDivider />
      <TestimonialsSection />
      <SectionDivider />
      <GulfSection />
      <SectionDivider />
      <CTASection />
    </div>
  );
}
