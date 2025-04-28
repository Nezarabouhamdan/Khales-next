import ProjectManagementPage from "@/pages/ProjectManagementPage";
import React from "react";
import Script from "next/script"; // Use Next.js optimized Script component

export const metadata = {
  title: "Project mangment",
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
    title: "Project mangment",
    description:
      "Welcome to Khales. Explore our luxury design and project management solutions.",
    url: "http://www.khales.ae/",
    siteName: "Khales",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project mangment",
    description:
      "Welcome to Khales. Explore our luxury design and project management solutions.",
  },
};

const ProjectManagement = () => {
  return (
    <>
      {" "}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-FB575W8DQ8"
      />
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FB575W8DQ8');
          `,
        }}
      />
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
      <ProjectManagementPage />
    </>
  );
};

export default ProjectManagement;
