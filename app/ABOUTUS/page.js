import React from "react";
import dynamic from "next/dynamic";

export const metadata = {
  title: "Aboutus - Khales",
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
  authors: [{ name: "Khales Team", url: "http://localhost:3000/" }],
  creator: "Khales",
  metadataBase: new URL("http://localhost:3000/"),
  openGraph: {
    title: "Aboutus - Khales",
    description:
      "Welcome to Khales. Explore our luxury design and project management solutions.",
    url: "http://localhost:3000/",
    siteName: "Khales",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aboutus - Khales",
    description:
      "Welcome to Khales. Explore our luxury design and project management solutions.",
  },
};
// Lazy load to avoid hydration mismatch
const AboutusPage = dynamic(() => import("@/pages/AboutsusPage"));

const AboutUs = () => {
  return <AboutusPage />;
};

export default AboutUs;
