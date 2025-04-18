"use client";
import { useLanguage } from "@/Context/Languagecontext";
import React, { useEffect, useState } from "react";
import { GreenText, Title } from "../components/Whoweare/TextContent";
import { Portfolio } from "@/components/Portfolio/Portfolio";
import CTASection from "@/components/Homecontact/CTASection";
import dynamic from "next/dynamic";
const HeroSlider = dynamic(() => import('@/components/Slider/Slider'));

export const slides = {
  eng: [
    {
      id: 1,
      image:
        "https://i.ibb.co/DPKhyq7k/khales-ae-real-photograph-of-a-super-luxury-modern-mansion-fr-c2c57d33-5a47-4ccb-b054-498b16745d23-3.png",
      title: "Shape Your Vision with Smart Planning",
      content: "",
      button: "GET IN TOUCH",
    },
  ],
  ar: [
    {
      id: 1,
      image:
        "https://i.ibb.co/DPKhyq7k/khales-ae-real-photograph-of-a-super-luxury-modern-mansion-fr-c2c57d33-5a47-4ccb-b054-498b16745d23-3.png",
      title: "شكّل رؤيتك بتخطيط ذكي",
      content: "نُمكّن مشاريعك بحلول تخطيط مبتكرة ومستدامة.",
      button: " تواصل معنا",
    },
  ],
};

const Projectspage = () => {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.title = `${language === "ar" ? "معرض المشاريع" : "Portfolio"}`;
  }, [language]);

  return (
    <>
      {/* <Hero /> */}
      <section id="hero" aria-label="hero">
        <HeroSlider
          slides={slides[language] || slides["eng"]}
          language={language}
          isLoading={isLoading}
          rtl={language === "ar"}
        />{" "}
      </section>
      <section id="portifolio" aria-label="portifolio">
        <div
          style={{
            display: "grid",
            placeItems: "center",
          }}
        >
          <Title
            style={{
              marginTop: "20vh",
            }}
          >
            <GreenText>Our</GreenText> Portfolio
          </Title>
        </div>
        <Portfolio />
      </section>
      <CTASection />
    </>
  );
};

export default Projectspage;
