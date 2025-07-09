import Footer from "@/components/Footer New/Footer";
import Navbar from "@/components/Navbar/Navbar";
import HomeContent from "@/pages/HomeConent";
import Script from "next/script"; // Use Next.js optimized Script component

export const metadata = {
  title:
    "Khales - Leading Architecture & Interior Design Company in Dubai, UAE",
  description:
    "Khales is Dubai's premier architecture and interior design company. We specialize in luxury residential and commercial projects, project management, engineering consultancy, and development planning across the UAE. Transform your space with our expert team.",
  keywords: [
    "architecture Dubai",
    "interior design Dubai",
    "luxury design UAE",
    "commercial architecture Dubai",
    "residential design Dubai",
    "project management UAE",
    "engineering consultancy Dubai",
    "development planning UAE",
    "fit-out companies Dubai",
    "villa design Dubai",
    "office design Dubai",
    "sustainable architecture UAE",
    "building contractors Dubai",
    "landscape design Dubai",
    "Khales Dubai",
    "best architects Dubai",
    "top interior designers UAE",
  ],
  authors: [{ name: "Khales Team", url: "https://www.khales.ae/" }],
  creator: "Khales",
  metadataBase: new URL("https://www.khales.ae/"),
  openGraph: {
    title:
      "Khales - Leading Architecture & Interior Design Company in Dubai, UAE",
    description:
      "Dubai's premier architecture and interior design company. Specializing in luxury residential and commercial projects across the UAE.",
    url: "https://www.khales.ae/",
    siteName: "Khales",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.khales.ae/assets/Khales-Logo.png",
        width: 1200,
        height: 630,
        alt: "Khales - Architecture & Interior Design Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Khales - Leading Architecture & Interior Design Company in Dubai, UAE",
    description:
      "Dubai's premier architecture and interior design company. Specializing in luxury residential and commercial projects across the UAE.",
    images: ["https://www.khales.ae/assets/Khales-Logo.png"],
  },
  alternates: {
    canonical: "https://www.khales.ae/",
  },
};

// Structured Data for Home Page
const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Khales - Leading Architecture & Interior Design Company in Dubai, UAE",
  description:
    "Dubai's premier architecture and interior design company specializing in luxury residential and commercial projects across the UAE.",
  url: "https://www.khales.ae/",
  mainEntity: {
    "@type": "Organization",
    name: "Khales",
    url: "https://www.khales.ae/",
    logo: "https://www.khales.ae/assets/Khales-Logo.png",
    description:
      "Leading architecture and interior design company in Dubai, UAE",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AE",
      addressRegion: "Dubai",
      addressLocality: "Dubai",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+971551299880",
      contactType: "customer service",
      availableLanguage: ["English", "Arabic"],
    },
    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates",
    },
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.khales.ae/",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <Script
        id="home-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageSchema),
        }}
      />
      <Navbar />
      <HomeContent />
      <Footer />
    </>
  );
}
