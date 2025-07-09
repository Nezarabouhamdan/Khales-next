import Footer from "@/components/Footer New/Footer";
import Navbar from "@/components/Navbar/Navbar";
import AboutPageContent from "@/pages/AboutsusPage";
import Script from "next/script";

export const metadata = {
  title: "About Khales - Premier Architecture & Interior Design Company Dubai",
  description:
    'Learn about Khales, Dubai"s leading architecture and interior design company. With years of experience in luxury residential and commercial projects across the UAE, we deliver exceptional design solutions and project management services.',
  keywords: [
    "about Khales Dubai",
    "architecture company Dubai",
    "interior design company UAE",
    "Dubai architects",
    "UAE interior designers",
    "luxury design company Dubai",
    "architectural firm UAE",
    "design consultancy Dubai",
    "project management company UAE",
    "engineering consultancy Dubai",
    "building design Dubai",
    "construction company UAE",
    "design studio Dubai",
    "architectural services UAE",
  ],
  authors: [{ name: "Khales Team", url: "https://www.khales.ae/" }],
  creator: "Khales",
  metadataBase: new URL("https://www.khales.ae/"),
  openGraph: {
    title:
      "About Khales - Premier Architecture & Interior Design Company Dubai",
    description:
      'Learn about Khales, Dubai"s leading architecture and interior design company with years of experience in luxury projects across the UAE.',
    url: "https://www.khales.ae/about",
    siteName: "Khales",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.khales.ae/assets/aboutus1.jpg",
        width: 1200,
        height: 630,
        alt: "About Khales - Architecture & Interior Design Company Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "About Khales - Premier Architecture & Interior Design Company in Dubai",
    description:
      'Learn about Khales, Dubai"s leading architecture and interior design company with years of experience in luxury projects across the UAE.',
    images: ["https://www.khales.ae/assets/aboutus1.jpg"],
  },
  alternates: {
    canonical: "https://www.khales.ae/ABOUTUS",
  },
};

// Structured Data for About Page
const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Khales",
  description:
    'Learn about Khales, Dubai"s leading architecture and interior design company',
  url: "https://www.khales.ae/ABOUTUS",
  mainEntity: {
    "@type": "Organization",
    name: "Khales",
    url: "https://www.khales.ae/",
    logo: "https://www.khales.ae/assets/Khales-Logo.png",
    description:
      "Premier architecture and interior design company in Dubai, UAE",
    foundingDate: "2020", // Update with actual founding date
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
    knowsAbout: [
      "Architecture",
      "Interior Design",
      "Project Management",
      "Engineering Consultancy",
      "Development Planning",
      "Sustainable Design",
      "Luxury Residential Design",
      "Commercial Architecture",
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.khales.ae/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: "https://www.khales.ae/ABOUTUS",
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <Script
        id="about-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema),
        }}
      />
      <Script
        id="about-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Navbar />
      <AboutPageContent />
      <Footer />
    </>
  );
}
