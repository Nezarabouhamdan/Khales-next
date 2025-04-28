import Projectspage from "@/pages/Projectspage";
import React from "react";
import Script from "next/script"; // Use Next.js optimized Script component
import InputDesign from "@/components/landingpage3/InputDesign";
import LandingPage1 from "@/components/landingpage1/Landingpage1";
import ServicesSection from "@/components/landingpage4/ServicesSection";
import ProcessSteps from "@/components/landingpage6/ProcessSteps";
import PropertyListings from "@/components/landingpage5/PropertyListings";
import InputDesign2 from "@/components/landingpage7/InputDesign";
import { Heroimg, Herosection } from "@/components/Hero/Herostyles";

export const metadata = {
  title: "Khales",
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
    title: "Portfolio",
    description:
      "Welcome to Khales. Explore our luxury design and project management solutions.",
    url: "http://www.khales.ae/",
    siteName: "Khales",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio",
    description:
      "Welcome to Khales. Explore our luxury design and project management solutions.",
  },
};

const Page = () => {
  return (
    <>
      {" "}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-T52CWE5XPZ"
        strategy="afterInteractive"
      />
      <Script id="ga-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-T52CWE5XPZ');
        `}
      </Script>
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <LandingPage1 />
        <Herosection>
          {" "}
          <Heroimg src="https://i.ibb.co/DPKhyq7k/khales-ae-real-photograph-of-a-super-luxury-modern-mansion-fr-c2c57d33-5a47-4ccb-b054-498b16745d23-3.png" />
        </Herosection>

        <InputDesign />
        <ServicesSection />
        <ProcessSteps />
        <PropertyListings />
        <InputDesign2 />
      </div>
    </>
  );
};

export default Page;
