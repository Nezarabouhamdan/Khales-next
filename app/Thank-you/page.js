import ServicesPage from "@/pages/ServicesPage";
import React from "react";
import Script from "next/script"; // Use Next.js optimized Script component
import MissionVision from "@/components/MV/Mv";
import OurServices from "@/components/Ser2/Ser2";
import ValuePropositionV2 from "@/components/Statics/Statics2";
import SuccessStory from "@/components/Ceo/S2";
import FullCaseStudyPage from "@/components/case study/cs1";
import CaseStudy from "@/components/case study/cs2";
import WhyKhales from "@/components/Whykhales/w1";
import WhyKhalesSplit from "@/components/Whykhales/w2";
import WhyKhalesHybrid from "@/components/Whykhales/w3";
import OfficeLocations from "@/components/Locations/L1";
import OfficeLocationsCombined from "@/components/Locations/L2";
import PropertyPage from "@/components/Projectspage/p1";
import PropertyListing from "@/components/Projectspage/p2";
import PropertyListingMinimal from "@/components/Projectspage/p3";
import MeetTheTeam from "@/components/Team/T1";
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
      <SuccessStory />
      {/* <SuccessStoryV2 /> */}
      <FullCaseStudyPage />
      <CaseStudy />
      <WhyKhales />
      <WhyKhalesSplit />
      <WhyKhalesHybrid />
      <OfficeLocations />
      <OfficeLocationsCombined />
      <PropertyPage />
      <PropertyListing />
      <PropertyListingMinimal />
      <MeetTheTeam />
    </>
  );
};

export default Thankyou;
