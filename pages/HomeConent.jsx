import { cookies } from "next/headers"; // Server-side function to read cookies

import Hero, {
  MainTitle,
  Subtitle,
  CTAButton,
  fadeInUp,
} from "@/components/Hero/Hero";

// Import other page sections (assuming their paths are correct)
import FeaturedProjects from "@/components/Property Page/FeaturedProjects";
import TestimonialSlider from "@/components/Reviews/TestimonialSlider";
import CTASection from "@/components/Homecontact/CTASection";
import LocalBusinessSchema from "@/components/LocalBusiness/LocalBusiness";
import OurServices from "@/components/Our Services/OurServices";
import AboutKhalesUltimate from "@/components/Aboutkhales/AboutKhales2";
import WhyKhalesHybrid from "@/components/Whykhales/w3";
import ValuePropositionV2 from "@/components/Statics/Statics2";

// --- CONTENT FOR THE HERO SECTION ---
const content = {
  eng: {
    title: "Premier Architecture & Interior Design in Dubai",
    subtitle:
      "Transforming visions into reality with luxury residential and commercial projects across the UAE.",
    cta: "Get in Touch",
  },
  ar: {
    title: "شركة الهندسة المعمارية والتصميم الداخلي الرائدة في دبي",
    subtitle:
      "نحوّل رؤيتك إلى واقع مع مشاريع سكنية وتجارية فاخرة في جميع أنحاء الإمارات.",
    cta: "تواصل معنا",
  },
};

// --- ENHANCED STRUCTURED DATA ---
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
          itemOffered: { "@type": "Service", name: "Architecture Design" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Interior Design" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Project Management" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Engineering Consultancy" },
        },
      ],
    },
  },
};

// --- METADATA (The Next.js 13+ way for SEO) ---
export const metadata = {
  title: "Khales - Premier Architecture & Interior Design Company Dubai, UAE",
  description:
    "Dubai's premier architecture and interior design company specializing in luxury residential and commercial projects across UAE. Discover our portfolio of luxury villas and commercial spaces.",
};

export default function HomePage() {
  // Determine language on the server using cookies
  const langCookie = cookies().get("language"); // Example: read a cookie named 'language'
  const language = langCookie?.value === "ar" ? "ar" : "eng";
  const currentContent = content[language];

  return (
    <>
      {/* Add structured data scripts to the head of the document */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageStructuredData),
        }}
      />
      <LocalBusinessSchema />

      <section
        id="hero"
        aria-label="Premier Architecture & Interior Design Company Dubai"
      >
        {/*
          <<< THE SOLUTION >>>
          The interactive <Hero> component is called, and the SEO-critical content
          (MainTitle, Subtitle, CTAButton) is passed to it as children.
          This content is rendered on the server, solving the H1 issue.
        */}
        <Hero lang={language}>
          <MainTitle variants={fadeInUp}>{currentContent.title}</MainTitle>
          <Subtitle variants={fadeInUp}>{currentContent.subtitle}</Subtitle>
          <CTAButton href="/Contact" variants={fadeInUp}>
            {currentContent.cta}
          </CTAButton>
        </Hero>
      </section>

      {/* The rest of your page sections will be rendered on the server */}
      <section id="about" aria-label="About Khales - Building Excellence">
        <AboutKhalesUltimate />
      </section>

      <section
        id="services"
        aria-label="Our Architecture and Interior Design Services"
      >
        <OurServices />
      </section>

      <section
        id="projects"
        aria-label="Featured Architecture and Interior Design Projects"
      >
        <FeaturedProjects />
      </section>

      <section
        id="why-choose-us"
        aria-label="Why Choose Khales for Your Project"
      >
        <WhyKhalesHybrid />
      </section>

      <section
        id="statistics"
        aria-label="Our Achievements and Success Stories"
      >
        <ValuePropositionV2 />
      </section>

      <section id="testimonials" aria-label="Client Reviews and Testimonials">
        <TestimonialSlider />
      </section>

      <section id="contact" aria-label="Contact Khales for Your Next Project">
        <CTASection />
      </section>
    </>
  );
}
