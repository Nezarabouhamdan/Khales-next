"use client";
import { useLanguage } from "@/Context/Languagecontext";
import FeaturedProjects from "@/components/Property Page/FeaturedProjects";
import TestimonialSlider from "@/components/Reviews/TestimonialSlider";
import CTASection from "@/components/Homecontact/CTASection";
import LocalBusinessSchema from "@/components/LocalBusiness/LocalBusiness";
import Hero, {
  CTAButton,
  fadeInUp,
  MainTitle,
  Subtitle,
} from "@/components/Hero/Hero";
import OurServices from "@/components/Our Services/OurServices";
import AboutKhalesUltimate from "@/components/Aboutkhales/AboutKhales2";
import WhyKhalesHybrid from "@/components/Whykhales/w3";
import ValuePropositionV2 from "@/components/Statics/Statics2";

const content = {
  eng: {
    title: "Premier Architecture & Interior Design in Dubai",
    subtitle:
      "Transforming visions into reality with luxury residential and commercial projects across the UAE.",
    cta: "Get in Touch",
  },
  ar: {
    title: "شركة الهندسة المعمارية والتصميم الداخلي الرائدة في دبي",
    subtitle:
      "نحوّل رؤيتك إلى واقع مع مشاريع سكنية وتجارية فاخرة في جميع أنحاء الإمارات.",
    cta: "تواصل معنا",
  },
};

export default function HomeContent() {
  const { language } = useLanguage();
  const currentContent = content[language];

  return (
    <>
      <LocalBusinessSchema />
      <section
        id="hero"
        aria-label="Premier Architecture & Interior Design Company Dubai"
      >
        <Hero lang={language}>
          <MainTitle variants={fadeInUp}>{currentContent.title}</MainTitle>
          <Subtitle variants={fadeInUp}>{currentContent.subtitle}</Subtitle>
          <CTAButton href="/Contact" variants={fadeInUp}>
            {currentContent.cta}
          </CTAButton>
        </Hero>
      </section>
      <section id="about" aria-label="About Khales - Building Excellence">
        <AboutKhalesUltimate />
      </section>
      <section
        id="services"
        aria-label="Our Architecture and Interior Design Services"
      >
        <OurServices />
      </section>
      <section
        id="projects"
        aria-label="Featured Architecture and Interior Design Projects"
      >
        <FeaturedProjects />
      </section>
      <section
        id="why-choose-us"
        aria-label="Why Choose Khales for Your Project"
      >
        <WhyKhalesHybrid />
      </section>
      <section id="testimonials" aria-label="Client Reviews and Testimonials">
        <TestimonialSlider />
      </section>
      <section
        id="statistics"
        aria-label="Our Achievements and Success Stories"
      >
        <ValuePropositionV2 />
      </section>
      <section id="contact" aria-label="Contact Khales for Your Next Project">
        <CTASection />
      </section>
    </>
  );
}
