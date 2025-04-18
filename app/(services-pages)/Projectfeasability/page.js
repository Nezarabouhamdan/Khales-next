import Projectstudy from "@/pages/BuildingContractingPage";
import BuildingContractingPage from "@/pages/BuildingContractingPage";
import React from "react";

export const metadata = {
  title: "Buliding contracting",
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
    title: "Buliding contracting",
    description:
      "Welcome to Khales. Explore our luxury design and project management solutions.",
    url: "http://localhost:3000/",
    siteName: "Khales",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buliding contracting",
    description:
      "Welcome to Khales. Explore our luxury design and project management solutions.",
  },
};

const BuildingContracting = () => {
  return <Projectstudy />;
};

export default BuildingContracting;
