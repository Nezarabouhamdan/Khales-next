import Footer from "@/components/Footer New/Footer";
import Navbar from "@/components/Navbar/Navbar";
import HomeContent from "@/pages/HomeConent";
import Script from "next/script"; // Use Next.js optimized Script component

export const metadata = {
  title:
    "Khales - Premier Architecture & Interior Design Company Dubai, UAE | Luxury Residential & Commercial Projects",
  description:
    "Khales is Dubai's premier architecture and interior design company specializing in luxury residential and commercial projects. Expert project management, engineering consultancy, and development planning services across UAE. Transform your vision into reality with our award-winning team of architects and designers.",
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
    "modern interior design Dubai",
    "contemporary architecture UAE",
    "luxury villa design Dubai",
    "commercial interior design Dubai",
    "residential interior design Dubai",
    "best architects Dubai",
    "top interior designers UAE",
    "architecture firms in Dubai",
    "interior designers near me",
    "Khales Dubai",
    "best architects Dubai",
    "top interior designers UAE",
  ],
  authors: [{ name: "Khales Team", url: "https://www.khales.ae/" }],
  creator: "Khales",
  metadataBase: new URL("https://www.khales.ae/"),
  openGraph: {
    title: "Khales - Premier Architecture & Interior Design Company Dubai, UAE",
    description:
      "Dubai's premier architecture and interior design company specializing in luxury residential and commercial projects. Expert project management, engineering consultancy, and development planning services across UAE.",
    url: "https://www.khales.ae/",
    siteName: "Khales",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.khales.ae/assets/Khales-Logo.png",
        width: 1200,
        height: 630,
        alt: "Khales - Premier Architecture & Interior Design Company Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khales - Premier Architecture & Interior Design Company Dubai, UAE",
    description:
      "Dubai's premier architecture and interior design company specializing in luxury residential and commercial projects across UAE.",
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
  name: "Khales - Premier Architecture & Interior Design Company Dubai, UAE",
  description:
    "Dubai's premier architecture and interior design company specializing in luxury residential and commercial projects across the UAE.",
  url: "https://www.khales.ae/",
  mainEntity: {
    "@type": "Organization",
    name: "Khales",
    url: "https://www.khales.ae/",
    logo: "https://www.khales.ae/assets/Khales-Logo.png",
    description:
      "Dubai's premier architecture and interior design company specializing in luxury residential and commercial projects across UAE",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AE",
      addressRegion: "Dubai",
      addressLocality: "Dubai",
      streetAddress: "Dubai, United Arab Emirates",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+971551299880",
      contactType: "customer service",
      availableLanguage: ["English", "Arabic"],
      areaServed: "AE",
    },
    areaServed: [
      {
        "@type": "Country",
        name: "United Arab Emirates",
      },
      {
        "@type": "City",
        name: "Dubai",
      },
      {
        "@type": "City",
        name: "Abu Dhabi",
      },
      {
        "@type": "City",
        name: "Sharjah",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Architecture and Interior Design Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Architecture Design",
            description:
              "Professional architectural design services for residential and commercial projects in Dubai and UAE",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Interior Design",
            description:
              "Luxury interior design services for homes, offices, and commercial spaces across UAE",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Project Management",
            description:
              "Comprehensive project management services from conception to completion",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Engineering Consultancy",
            description:
              "Expert engineering consultancy and technical analysis services",
          },
        },
      ],
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
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.khales.ae/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
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
