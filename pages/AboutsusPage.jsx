"use client";

import React from "react";
import MissionVision from "@/components/Mission Vision/Mission Vision";
// Import other sections like SuccessStory or MeetTheTeam here if you add them back

export default function AboutUsPageClient({ lang, content }) {
  // This component simply receives content and passes it down.
  // No more useEffect for document.title, as it's handled by Next.js metadata.

  return (
    <>
      {/* Spacer to account for fixed navbar */}
      <div style={{ height: "10vh" }}></div>

      {/* Pass the specific 'missionVision' content object to the component */}
      <MissionVision lang={lang} content={content.missionVision} />

      {/* You can add other components here and pass them their content */}
      {/* <SuccessStory content={content.successStory} /> */}
      {/* <MeetTheTeam content={content.meetTheTeam} /> */}
    </>
  );
}
