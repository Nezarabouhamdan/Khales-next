"use client";
import SuccessStory from "@/components/Ceo/S2";
import MissionVision from "@/components/Mission Vision/Mission Vision";
import { useLanguage } from "@/Context/Languagecontext";
import React, { useEffect, useState } from "react";

const AboutusPage = () => {
  const { language } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    return () => setIsClient(false); // Cleanup
  }, []);

  // change metadata from client side
  useEffect(() => {
    document.title = `${language === "ar" ? "نبذة عنا" : "Aboutus"} - Khales`;
  }, [language]);

  // Don't render anything during SSR
  if (!isClient) return null;

  return (
    <>
      {" "}
      <div style={{ height: "10vh" }}></div>
      <SuccessStory />
      <MissionVision />
      {/* <MeetTheTeam /> */}
    </>
  );
};

export default AboutusPage;
