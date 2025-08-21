// ./AboutUsPageClient.js
"use client";

import React from "react";
import MissionVision from "@/components/Mission Vision/Mission Vision";
import ComprehensiveAbout from "@/components/ComprehensiveAbout";
import ValueProposition from "@/components/AboutusSpecial";

export default function AboutUsPageClient({ lang, content }) {
  // ✅ ADDED SAFETY CHECKS for all content pieces
  const comprehensiveAboutContent = content?.comprehensiveAbout;
  const missionVisionContent = content?.missionVision;
  const valuePropositionContent = content?.valueProposition;

  return (
    <>
      <div style={{ paddingTop: "5vh" }}></div>

      {/* Render component only if content exists */}
      {comprehensiveAboutContent && (
        <ComprehensiveAbout lang={lang} content={comprehensiveAboutContent} />
      )}

      {missionVisionContent && (
        <MissionVision lang={lang} content={missionVisionContent} />
      )}

      {/* Render component only if content exists */}
      {valuePropositionContent && (
        <ValueProposition lang={lang} content={valuePropositionContent} />
      )}
    </>
  );
}
