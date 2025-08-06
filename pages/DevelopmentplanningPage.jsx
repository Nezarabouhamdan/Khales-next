// components/ServicePages/DevelopmentplanningPage.js
"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Import your existing styled-components and UI components
import InteriorDesign from "@/components/InteriorDesign/InteriorDesign";
import OurProcessWork from "@/components/OurProcessWork/OurProcessWork";
import CTASection from "@/components/Homecontact/CTASection";
import { Row2, Column } from "@/utils/Globalstyles";
import { GreenText, Title as Title2 } from "@/components/Whoweare/TextContent";

// Dynamically import the slider to ensure it's a client component
const HeroSlider = dynamic(() => import("@/components/Slider/Slider"));

// The component now receives all its text and language via props
export default function DevelopmentplanningPage({ lang, content, ctaContent }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  // Robust check for content to prevent errors
  if (!content || !content.intro || !content.process || !content.faq) {
    return <div>Loading page content...</div>; // Or a loading skeleton
  }

  // Restructure the intro data to match what the InteriorDesign component expects
  const introData = [
    {
      title: content.intro.title,
      subtitle: content.intro.subtitle,
      description1: content.intro.description1,
      description2: content.intro.description2,
      images: content.intro.images,
    },
  ];

  return (
    <>
      <section id="hero" aria-label="hero">
        <HeroSlider
          slides={content.slides || []}
          language={lang}
          isLoading={isLoading}
          rtl={lang === "ar"} // This correctly tells the slider to be RTL in Arabic
        />
      </section>

      <InteriorDesign data={introData} />

      <Column>
        <Title2>
          {content.process.title}
          <GreenText>{content.process.highlight}</GreenText>
        </Title2>
        <Row2
          rtl={lang === "ar"}
          style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}
        >
          <OurProcessWork panels={content.process.steps || []} />
          <img
            width={"300px"}
            src={"https://i.ibb.co/n8MhvvCT/PROCESS-DEV.png"}
            alt="Process Work"
          />
        </Row2>

        <Title2>
          {content.faq.title}
          <GreenText>{content.faq.highlight}</GreenText>
        </Title2>

        <OurProcessWork panels={content.faq.questions || []} />
      </Column>

      <CTASection lang={lang} content={ctaContent} />
    </>
  );
}
