import EngineeringConsultancyPage from "@/pages/EngineeringConsultancyPage";
import React from "react";

export const metadata = {
  title: "Engineering Consultancy",
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
    title: "Engineering Consultancy",
    description:
      "Welcome to Khales. Explore our luxury design and project management solutions.",
    url: "http://localhost:3000/",
    siteName: "Khales",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Consultancy",
    description:
      "Welcome to Khales. Explore our luxury design and project management solutions.",
  },
};

const EngineeringConsultancy = () => {
  return (
    <>
      {" "}
      <Script
        id="gtm-script"
        strategy="afterInteractive" // Optimize loading strategy
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5ZMHD47B');`,
        }}
      />{" "}
      <EngineeringConsultancyPage />
    </>
  );
};

export default EngineeringConsultancy;
