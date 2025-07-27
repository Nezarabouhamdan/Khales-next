import Footer from "@/components/Footer New/Footer";
import Navbar from "@/components/Navbar/Navbar";
import HomeContent from "@/pages/HomeConent";
import Script from "next/script";

export const metadata = {
  title: "Khales - Architecture & Interior Design Dubai, UAE",
  description:
    "Khales is Dubai's premier architecture and interior design company. We specialize in luxury residential and commercial projects, project management, engineering consultancy, and development planning across the UAE.",
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
    title: "Khales - Architecture & Interior Design Dubai, UAE",
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
    title: "Khales - Architecture & Interior Design Dubai, UAE",
    description:
      "Dubai's premier architecture and interior design company. Specializing in luxury residential and commercial projects across the UAE.",
    images: ["https://www.khales.ae/assets/Khales-Logo.png"],
  },
  alternates: {
    canonical: "https://www.khales.ae/",
  },
};

// This is the structured data that was previously in your HomeContent component
const homePageStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.khales.ae/#webpage",
  url: "https://www.khales.ae/",
  name: "Khales - Premier Architecture & Interior Design Company Dubai, UAE",
  description:
    "Dubai's premier architecture and interior design company specializing in luxury residential and commercial projects across UAE.",
  isPartOf: {
    "@type": "WebSite",
    "@id": "https://www.khales.ae/#website",
    url: "https://www.khales.ae/",
    name: "Khales",
    description: "Premier Architecture & Interior Design Company in Dubai, UAE",
    publisher: {
      "@type": "Organization",
      "@id": "https://www.khales.ae/#organization",
    },
  },
  about: {
    "@type": "Organization",
    "@id": "https://www.khales.ae/#organization",
    name: "Khales",
    url: "https://www.khales.ae/",
    logo: {
      "@type": "ImageObject",
      url: "https://www.khales.ae/assets/Khales-Logo.png",
      width: 1200,
      height: 630,
    },
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
    sameAs: [
      "https://api.whatsapp.com/send?phone=+971551299880",
      "https://facebook.com/Khales.ae",
      "https://instagram.com/khales.ae",
      "https://linkedin.com/company/khales-ae",
    ],
    areaServed: [
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "City", name: "Dubai" },
      { "@type": "City", name: "Abu Dhabi" },
      { "@type": "City", name: "Sharjah" },
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
            provider: {
              "@type": "Organization",
              "@id": "https://www.khales.ae/#organization",
            },
            areaServed: { "@type": "Country", name: "United Arab Emirates" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Interior Design",
            description:
              "Luxury interior design services for homes, offices, and commercial spaces across UAE",
            provider: {
              "@type": "Organization",
              "@id": "https://www.khales.ae/#organization",
            },
            areaServed: { "@type": "Country", name: "United Arab Emirates" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Project Management",
            description:
              "Comprehensive project management services from conception to completion",
            provider: {
              "@type": "Organization",
              "@id": "https://www.khales.ae/#organization",
            },
            areaServed: { "@type": "Country", name: "United Arab Emirates" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Engineering Consultancy",
            description:
              "Expert engineering consultancy and technical analysis services",
            provider: {
              "@type": "Organization",
              "@id": "https://www.khales.ae/#organization",
            },
            areaServed: { "@type": "Country", name: "United Arab Emirates" },
          },
        },
      ],
    },
  },
  mainEntity: {
    "@type": "ItemList",
    name: "Main Sections",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "WebPageElement",
          name: "Hero Section",
          description:
            "Premier Architecture & Interior Design Company in Dubai, UAE",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "WebPageElement",
          name: "About Khales",
          description: "Learn about our expertise and commitment to excellence",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "WebPageElement",
          name: "Our Services",
          description:
            "Architecture, Interior Design, Project Management, and Engineering Consultancy",
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "WebPageElement",
          name: "Featured Projects",
          description:
            "Showcase of our luxury residential and commercial projects",
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "WebPageElement",
          name: "Client Testimonials",
          description: "Reviews and feedback from our satisfied clients",
        },
      },
    ],
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
          __html: JSON.stringify(homePageStructuredData),
        }}
      />
      <Navbar />
      <HomeContent />
      <Footer />
    </>
  );
}
