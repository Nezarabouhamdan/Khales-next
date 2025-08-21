"use client";

import React from "react";
import MissionVision from "@/components/Mission Vision/Mission Vision";
import ComprehensiveAbout from "@/components/ComprehensiveAbout";
import ValueProposition from "@/components/AboutusSpecial";

export default function AboutUsPageClient({ lang, content }) {
  // THE FIX IS HERE: We check if `content` and `content.missionVision` exist before trying to use them.
  // If `missionVision` is missing from the dictionary, this will prevent the component from crashing.
  const missionVisionContent = content?.missionVision;

  return (
    <>
      <div style={{ paddingTop: "5vh" }}></div>
      <ComprehensiveAbout
        lang={lang}
        content={content.comprehensiveAbout}
      />{" "}
      {missionVisionContent && (
        <MissionVision lang={lang} content={missionVisionContent} />
      )}
      <ValueProposition
        lang={lang}
        content={content.valueProposition}
      ></ValueProposition>
      {/* We only render the MissionVision component if we have the content for it */}
      {/* You can add other components here with similar safety checks */}
    </>
  );
}
