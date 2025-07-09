import Footer from "@/components/Footer New/Footer";
import Navbar from "@/components/Navbar/Navbar";
import ServicesPageContent from "@/pages/ServicesPage";
import Script from "next/script";

export const metadata = {
  title: "Architecture & Interior Design Services in Dubai, UAE - Khales",
  description:
    "Comprehensive architecture and interior design services in Dubai, UAE. Khales offers residential design, commercial architecture, project management, engineering consultancy, development planning, and fit-out services across the UAE.",
  keywords: [
    "architecture services Dubai",
    "interior design services UAE",
    "residential architecture Dubai",
    "commercial interior design Dubai",
    "project management services UAE",
    "engineering consultancy Dubai",
    "development planning UAE",
    "fit-out services Dubai",
    "landscape design Dubai",
    "sustainable architecture UAE",
    "villa design services Dubai",
    "office interior design UAE",
    "luxury design services Dubai",
    "building contractors UAE",
    "architectural consultancy Dubai",
    "interior fit-out Dubai",
    "construction management UAE",
    "design and build Dubai",
  ],
  authors: [{ name: "Khales Team", url: "https://www.khales.ae/" }],
  creator: "Khales",
  metadataBase: new URL("https://www.khales.ae/"),
  openGraph: {
    title: "Architecture & Interior Design Services in Dubai, UAE - Khales",
    description:
      "Comprehensive architecture and interior design services in Dubai, UAE. Residential design, commercial architecture, project management, and more.",
    url: "https://www.khales.ae/service",
    siteName: "Khales",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.khales.ae/assets/Services.jpg",
        width: 1200,
        height: 630,
        alt: "Khales Architecture & Interior Design Services Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Architecture & Interior Design Services in Dubai, UAE - Khales",
    description:
      "Comprehensive architecture and interior design services in Dubai, UAE. Residential design, commercial architecture, project management, and more.",
    images: ["https://www.khales.ae/assets/Services.jpg"],
  },
  alternates: {
    canonical: "https://www.khales.ae/service",
  },
};

// Structured Data for Services Page
const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Architecture & Interior Design Services",
  description:
    "Comprehensive architecture and interior design services in Dubai, UAE",
  provider: {
    "@type": "Organization",
    name: "Khales",
    url: "https://www.khales.ae/",
    logo: "https://www.khales.ae/assets/Khales-Logo.png",
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
    },
  },
  areaServed: {
    "@type": "Country",
    name: "United Arab Emirates",
  },
  serviceType: [
    "Architecture Design",
    "Interior Design",
    "Project Management",
    "Engineering Consultancy",
    "Development Planning",
    "Fit-out Services",
    "Landscape Design",
  ],
  url: "https://www.khales.ae/service",
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
      name: "service",
      item: "https://www.khales.ae/service",
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <Script
        id="services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesSchema),
        }}
      />
      <Script
        id="services-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Navbar />
      <ServicesPageContent />
      <Footer />
    </>
  );
}
