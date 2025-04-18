"use client";
import { useLanguage } from "@/Context/Languagecontext";
import { useEffect, useState } from "react";
import { slides } from "../data/HeroData";
import WhoAreWe from "@/components/Whoweare/WhoAreWe";
import ServicesSwiper from "@/components/Whatwedodeep/Whatwedo";
import FeaturedProjects from "@/components/Featured Projects/FeaturedProjects";
import TestimonialSlider from "@/components/Reviews/TestimonialSlider";
import CTASection from "@/components/Homecontact/CTASection";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero/Hero";
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
      <section id="hero" aria-label="hero">
        <h1 style={{ display: "none" }}>
          {language === "ar"
            ? "مرحبًا بك في Khales"
            : "Welcome to Khales"}
        </h1>
        <Hero />     
      </section>
      <WhoAreWe />
      <ServicesSwiper />
      <FeaturedProjects />
      <TestimonialSlider />
      <CTASection />
    </>
  );
}