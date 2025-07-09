"use client";
import { useLanguage } from "@/Context/Languagecontext";
import { useEffect, useState } from "react";
import WhoAreWe from "@/components/Whoweare/WhoAreWe";
import ServicesSwiper from "@/components/Whatwedodeep/Whatwedo";
import FeaturedProjects from "@/components/Featured Projects/FeaturedProjects";
import TestimonialSlider from "@/components/Reviews/TestimonialSlider";
import CTASection from "@/components/Homecontact/CTASection";
import FAQ from "@/components/FAQ/FAQ";
import HowTo from "@/components/HowTo/HowTo";
import ServiceAreas from "@/components/ServiceAreas/ServiceAreas";
import LocalBusinessSchema from "@/components/LocalBusiness/LocalBusiness";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero/Hero";
import StatisticsSection from "@/components/Section1";
import Services from "@/components/Services/Services";
import WhyUs from "@/components/why khales/WhyUs";
import MissionVision from "@/components/MV/Mv";
import ServicesSection from "@/components/Ser/Ser";
import MeetTheTeam from "@/components/Team/T1";
import HeroGlass from "@/components/Banners/B1";
import OurServices from "@/components/Ser2/Ser2";
import AboutKhalesUltimate from "@/components/Aboutkhales/AboutKhales2";
import WhyKhalesHybrid from "@/components/Whykhales/w3";
import ValuePropositionV2 from "@/components/Statics/Statics2";
const HeroSlider = dynamic(() => import("@/components/Slider/Slider"));

export default function HomeContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage(); // Assuming you have a language context

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LocalBusinessSchema />
      <section id="hero" aria-label="hero">
        <h1 style={{ display: "none" }}>
          {language === "ar" ? "مرحبًا بك في Khales" : "Welcome to Khales"}
        </h1>
        {/* <HeroGlass /> */}
        <Hero />
      </section>
      <AboutKhalesUltimate />
      <WhyKhalesHybrid />
      {/* <AboutKhalesGroupInteractive />  */}
      {/* it timeline */}
      <ValuePropositionV2 />
      {/* <StatisticsSection /> */}
      {/* <MissionVision /> */}
      {/* <Services /> */}
      {/* <WhyUs /> */}
      {/* <ServicesSection /> */}
      <OurServices />

      <FeaturedProjects />
      <TestimonialSlider />
      <CTASection />
    </>
  );
}
