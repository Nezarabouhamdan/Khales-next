import RealEstatePage from "@/pages/RealEstatePage";
import React from "react";
import Script from "next/script"; // Use Next.js optimized Script component

export const metadata = {
  title: "Investing",
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
    title: "Investing",
    description:
      "Welcome to Khales. Explore our luxury design and project management solutions.",
    url: "http://www.khales.ae/",
    siteName: "Khales",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Investing",
    description:
      "Welcome to Khales. Explore our luxury design and project management solutions.",
  },
};

const RealEstate = () => {
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
      <RealEstatePage />
    </>
  );
};

export default RealEstate;
