"use client";

import React from "react";
import MissionVision from "@/components/Mission Vision/Mission Vision";

export default function AboutUsPageClient({ lang, content }) {
  // THE FIX IS HERE: We check if `content` and `content.missionVision` exist before trying to use them.
  // If `missionVision` is missing from the dictionary, this will prevent the component from crashing.
  const missionVisionContent = content?.missionVision;

  return (
    <>
      <div style={{ paddingTop: "10vh" }}></div>

      {/* We only render the MissionVision component if we have the content for it */}
      {missionVisionContent && (
        <MissionVision lang={lang} content={missionVisionContent} />
      )}

      {/* You can add other components here with similar safety checks */}
    </>
  );
}
