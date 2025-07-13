"use client";
import { useLanguage } from "@/Context/Languagecontext";
import { useEffect, useState } from "react";
import Head from "next/head";

import FeaturedProjects from "@/components/Property Page/FeaturedProjects";
import TestimonialSlider from "@/components/Reviews/TestimonialSlider";
import CTASection from "@/components/Homecontact/CTASection";

import LocalBusinessSchema from "@/components/LocalBusiness/LocalBusiness";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero/Hero";

import OurServices from "@/components/Our Services/OurServices";
import AboutKhalesUltimate from "@/components/Aboutkhales/AboutKhales2";
import WhyKhalesHybrid from "@/components/Whykhales/w3";
import ValuePropositionV2 from "@/components/Statics/Statics2";

// Enhanced structured data for the homepage
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
            provider: {
              "@type": "Organization",
              "@id": "https://www.khales.ae/#organization",
            },
            areaServed: {
              "@type": "Country",
              name: "United Arab Emirates",
            },
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
            areaServed: {
              "@type": "Country",
              name: "United Arab Emirates",
            },
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
            areaServed: {
              "@type": "Country",
              name: "United Arab Emirates",
            },
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
            areaServed: {
              "@type": "Country",
              name: "United Arab Emirates",
            },
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

export default function HomeContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homePageStructuredData),
          }}
        />
      </Head>

      <LocalBusinessSchema />

      {/* Hero Section with H1 */}
      <section
        id="hero"
        aria-label="Premier Architecture & Interior Design Company Dubai"
      >
        <Hero />
      </section>

      {/* About Section with H2 */}
      <section id="about" aria-label="About Khales - Building Excellence">
        <AboutKhalesUltimate />
      </section>
      {/* Services Section with H2 */}
      <section
        id="services"
        aria-label="Our Architecture and Interior Design Services"
      >
        <OurServices />
      </section>

      {/* Featured Projects Section with H2 */}
      <section
        id="projects"
        aria-label="Featured Architecture and Interior Design Projects"
      >
        <FeaturedProjects />
      </section>
      {/* Why Choose Us Section with H2 */}
      <section
        id="why-choose-us"
        aria-label="Why Choose Khales for Your Project"
      >
        <WhyKhalesHybrid />
      </section>

      {/* Statistics Section with H2 */}
      <section
        id="statistics"
        aria-label="Our Achievements and Success Stories"
      >
        <ValuePropositionV2 />
      </section>

      {/* Testimonials Section with H2 */}
      <section id="testimonials" aria-label="Client Reviews and Testimonials">
        <TestimonialSlider />
      </section>

      {/* Contact Section with H2 */}
      <section id="contact" aria-label="Contact Khales for Your Next Project">
        <CTASection />
      </section>
    </>
  );
}
