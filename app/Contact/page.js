import Footer from "@/components/Footer New/Footer";
import Navbar from "@/components/Navbar/Navbar";
import ContactPageContent from "@/pages/ContactPage";
import Script from "next/script";

export const metadata = {
  title: "Contact Khales - Architecture & Interior Design Company Dubai, UAE",
  description:
    "Contact Khales for your architecture and interior design needs in Dubai, UAE. Get in touch with our expert team for luxury residential and commercial projects, project management, and engineering consultancy services. Call +971551299880 or visit our Dubai office.",
  keywords: [
    "contact Khales Dubai",
    "architecture company contact UAE",
    "interior design consultation Dubai",
    "Dubai architects contact",
    "UAE interior designers contact",
    "architectural services Dubai contact",
    "project management Dubai contact",
    "engineering consultancy UAE contact",
    "design consultation Dubai",
    "Khales office Dubai",
    "architecture firm Dubai contact",
    "interior design quote Dubai",
    "building design consultation UAE",
  ],
  authors: [{ name: "Khales Team", url: "https://www.khales.ae/" }],
  creator: "Khales",
  metadataBase: new URL("https://www.khales.ae/"),
  openGraph: {
    title: "Contact Khales - Architecture & Interior Design Company Dubai, UAE",
    description:
      "Contact Khales for your architecture and interior design needs in Dubai, UAE. Expert team for luxury residential and commercial projects.",
    url: "https://www.khales.ae/Contact",
    siteName: "Khales",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.khales.ae/assets/Khales-Logo.png",
        width: 1200,
        height: 630,
        alt: "Contact Khales - Architecture & Interior Design Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Khales - Architecture & Interior Design Company Dubai, UAE",
    description:
      "Contact Khales for your architecture and interior design needs in Dubai, UAE. Expert team for luxury residential and commercial projects.",
    images: ["https://www.khales.ae/assets/Khales-Logo.png"],
  },
  alternates: {
    canonical: "https://www.khales.ae/Contact",
  },
};

// Structured Data for Contact Page
const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Khales",
  description:
    "Contact Khales for architecture and interior design services in Dubai, UAE",
  url: "https://www.khales.ae/Contact",
  mainEntity: {
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
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+971551299880",
        contactType: "customer service",
        availableLanguage: ["English", "Arabic"],
        areaServed: "AE",
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates",
    },
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
      name: "Contact",
      item: "https://www.khales.ae/Contact",
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema),
        }}
      />
      <Script
        id="contact-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Navbar />
      <ContactPageContent />
      <Footer />
    </>
  );
}
