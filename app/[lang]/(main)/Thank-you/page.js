import React from "react";
import MissionVision from "@/components/Mission Vision/Mission Vision";
import OurServices from "@/components/Our Services/OurServices";
import ValuePropositionV2 from "@/components/Statics/Statics2";
import FullCaseStudyPage from "@/components/case study/cs1";
import WhyKhalesHybrid from "@/components/Whykhales/w3";
import OfficeLocationsCombined from "@/components/Locations/L2";

import MeetTheTeam from "@/components/Team/T1";
import HowTo from "@/components/HowTo/HowTo";
import ServiceAreas from "@/components/ServiceAreas/ServiceAreas";
import FAQ from "@/components/FAQ/FAQ";
export const metadata = {
  title: "Thank you",
  description:
    "Welcome to Khales. Explore our luxury design and project management solutions.",
  keywords: [
    "Khales",
    "Luxury Design",
    "Interior Design",
    "Architecture",
    "Project Management",
    "Construction",
    "Khales Projects",
  ],
  authors: [{ name: "Khales Team", url: "http://www.khales.ae/" }],
  creator: "Khales",
  metadataBase: new URL("http://www.khales.ae/"),
  openGraph: {
    title: "Services",
    description:
      "Welcome to Khales. Explore our luxury design and project management solutions.",
    url: "http://www.khales.ae/",
    siteName: "Khales",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services",
    description:
      "Welcome to Khales. Explore our luxury design and project management solutions.",
  },
};

const Thankyou = () => {
  return (
    <>
      {/* <MissionVisionGalaxy /> */}
      <MissionVision />
      {/* <ServicesSection /> */}
      <OurServices />
      {/* <ValueProposition /> */}
      <ValuePropositionV2 />
      {/* <SuccessStoryV2 /> */}
      <FullCaseStudyPage />
      <WhyKhalesHybrid />
      <OfficeLocationsCombined />
      <MeetTheTeam />
      <HowTo />
      <ServiceAreas />
      <FAQ />
    </>
  );
};

export default Thankyou;
