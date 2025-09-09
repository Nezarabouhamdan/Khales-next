// ./AboutUsPageClient.js
"use client";

import React from "react";
import MissionVision from "@/components/Mission Vision/Mission Vision";
import ComprehensiveAbout from "@/components/ComprehensiveAbout";
import ValueProposition from "@/components/AboutusSpecial";

import SuccessStory from "@/components/Ceo/SuccessStory";
import CTASection from "@/components/Homecontact/CTASection";

export default function AboutUsPageClient({ lang, content }) {
  // ✅ ADDED SAFETY CHECKS for all content pieces
  const comprehensiveAboutContent = content?.comprehensiveAbout;
  const missionVisionContent = content?.missionVision;
  const ctaContent = content?.cta;
  const successStoryContent = content?.successStory; // ✅ ADD THIS LINE

  return (
    <>
      <div style={{ paddingTop: "5vh" }}></div>
      {/* Render component only if content exists */}
      {successStoryContent && (
        <SuccessStory lang={lang} content={successStoryContent} />
      )}
      {/* Render component only if content exists */}
      {missionVisionContent && (
        <MissionVision lang={lang} content={missionVisionContent} />
      )}
      {/* {valuePropositionContent && (
        <ValueProposition lang={lang} content={valuePropositionContent} />
      )}{" "} */}
      {comprehensiveAboutContent && (
        <ComprehensiveAbout lang={lang} content={comprehensiveAboutContent} />
      )}
      <CTASection lang={lang} content={ctaContent} />
    </>
  );
}
