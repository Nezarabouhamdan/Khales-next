// components/ServicePages/ProjectManagerPage.js
"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Import your existing styled-components and UI components
import InteriorDesign from "@/components/InteriorDesign/InteriorDesign";
import OurProcessWork from "@/components/OurProcessWork/OurProcessWork";
import CTASection from "@/components/Homecontact/CTASection";
import { Row2, Column } from "@/utils/Globalstyles";
import { GreenText, Title as Title2 } from "@/components/Whoweare/TextContent";
import ProjectHighlight from "@/components/Projecthighlights/ProjectHighlight";

const HeroSlider = dynamic(() => import("@/components/Slider/Slider"));

// The component now receives all its text and language via props
export default function ProjectManagerPage({ lang, content, ctaContent }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!content || !content.intro || !content.process || !content.faq) {
    return null; // Or a loading skeleton
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
          lang={lang}
          isLoading={isLoading}
          rtl={lang === "ar"}
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
            src={"https://i.ibb.co/pvwbsP9Z/process-PM.png"}
            alt="Process Work"
          />
        </Row2>

        {/* The project highlight section was commented out in your original code */}
        {/* <ProjectHighlight data={content.projectHighlight} /> */}

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
