import { getDictionary } from "@/get-dictionary";
import Script from "next/script";

// Import all section components
import Hero from "@/components/Hero/Hero";
import OurServices from "@/components/Our Services/OurServices";
import AboutKhalesUltimate from "@/components/Aboutkhales/AboutKhales2";
import WhyKhalesHybrid from "@/components/Whykhales/w3";
import FeaturedProjects from "@/components/Property Page/FeaturedProjects";
import TestimonialSlider from "@/components/Reviews/TestimonialSlider";
import ValuePropositionV2 from "@/components/Statics/Statics2";
import CTASection from "@/components/Homecontact/CTASection";

// Import the new Client Components
import EnhancedContent from "@/components/EnhanceContent";
import FAQSection from "@/components/FAQ/FAQSection";
import FeaturedBlogs from "@/components/FeaturedBlogs/FeaturedBlogs";
import ProjectTypes from "@/components/Projecttypes/ProjectTypes";

const getHomePageSchema = (lang) => {
  // Define base and language-specific URLs for clarity
  const baseUrl = "https://www.khales.ae";
  const pageUrl = `${baseUrl}/${lang}`;

  const name =
    lang === "ar"
      ? "خالص - إدارة المشاريع والاستشارات الهندسية في الإمارات"
      : "Khales - Expert Project Management & Engineering Consultancy in UAE";

  const description =
    lang === "ar"
      ? "شركة رائدة في إدارة المشاريع والاستشارات الهندسية في دبي، متخصصة في المشاريع التجارية والسكنية والفلل الفاخرة في جميع أنحاء الإمارات."
      : "Leading project management and engineering consultancy in Dubai, specializing in commercial, residential, and luxury villa projects across the UAE.";

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}/#webpage`, // CORRECTED: Uses language-specific URL
    url: pageUrl, // CORRECTED: Uses language-specific URL
    name: name,
    description: description,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`, // CORRECT: Stays as base URL
      url: baseUrl, // CORRECT: Stays as base URL
      name: "Khales",
      description:
        "Expert Project Management & Engineering Consultancy in Dubai, UAE",
      publisher: {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
      },
    },
    about: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`, // CORRECT: Stays as base URL
      name: "Khales",
      url: baseUrl, // CORRECT: Stays as base URL
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/assets/Khales-Logo.png`,
        width: 1200,
        height: 630,
      },
      description:
        "Leading project management and engineering consultancy in Dubai, specializing in commercial, residential, and luxury villa projects across the UAE.",
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
        name: "Project Management and Engineering Consultancy Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Full Project Management",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Engineering Consultancy",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Commercial Project Management",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Residential Project Management",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Luxury Villa Construction Management",
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
          item: { "@type": "WebPageElement", name: "Hero Section" },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: { "@type": "WebPageElement", name: "About Khales" },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: { "@type": "WebPageElement", name: "Our Services" },
        },
        {
          "@type": "ListItem",
          position: 4,
          item: { "@type": "WebPageElement", name: "Featured Projects" },
        },
        {
          "@type": "ListItem",
          position: 5,
          item: { "@type": "WebPageElement", name: "Client Testimonials" },
        },
        {
          "@type": "ListItem",
          position: 6,
          item: { "@type": "WebPageElement", name: "Our Blogs" },
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
          item: pageUrl, // CORRECTED: Uses language-specific URL
        },
      ],
    },
  };
};

// --- METADATA ---
export async function generateMetadata({ params: { lang } }) {
  const title =
    lang === "ar"
      ? "خالص | إدارة المشاريع والهندسة في والإمارات" // Short & Powerful
      : "Khales | Project Management & Engineering in UAE"; // Short & Powerful

  const description =
    lang === "ar"
      ? "خبراء في إدارة المشاريع والاستشارات الهندسية للفلل والمشاريع التجارية في دبي. حوّل رؤيتك إلى واقع معنا."
      : "Expert project management and engineering consultancy for villas and commercial projects in Dubai. Turn your vision into reality.";

  const keywords =
    lang === "ar"
      ? [
          "إدارة مشاريع كاملة دبي",
          "استشارات هندسية الإمارات",
          "إدارة المشاريع التجارية دبي",
          "إدارة المشاريع السكنية",
          "إدارة بناء الفلل الفاخرة",
          "استشاريون هندسيون دبي",
          "إدارة مشاريع البناء الإمارات",
          "المشاريع العقارية دبي",
          "استشارات المباني التجارية",
          "خدمات هندسية للفلل",
          "شركة خالص لإدارة المشاريع",
        ]
      : [
          "full project management Dubai",
          "engineering consultancy UAE",
          "commercial project management Dubai",
          "residential project management UAE",
          "luxury villa construction management",
          "engineering consultants Dubai",
          "construction project management UAE",
          "real estate project management Dubai",
          "commercial building consultants",
          "villa engineering services Abu Dhabi",
          "Khales project management",
        ];

  const baseUrl = "https://www.khales.ae";

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Khales Team", url: baseUrl }],
    creator: "Khales",
    metadataBase: new URL(baseUrl),
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}`,
      siteName: "Khales",
      locale: lang === "ar" ? "ar_AE" : "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/assets/Khales-Logo.png`,
          width: 1200,
          height: 630,
          alt: "Khales - Project Management & Engineering Consultancy",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/assets/Khales-Logo.png`],
    },
    alternates: {
      canonical: `/${lang}`,
      languages: { "en-US": "/en", "ar-AE": "/ar" },
    },
  };
}
// --- PAGE COMPONENT --- (Updated with Blog Section)
export default async function Home({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const homePageSchema = getHomePageSchema(lang);

  return (
    <>
      <Script
        id="home-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageSchema),
        }}
      />
      <section
        id="hero"
        aria-label="Full Project Management & Engineering for Villas & Commercial Projects"
      >
        <Hero
          slides={dictionary.hero?.slides || []}
          lang={lang}
          isHomePage={true}
        />
      </section>{" "}
      <section
        id="project-types"
        aria-label="Our Residential & Commercial Project Types"
      >
        <ProjectTypes content={dictionary.projectTypes || {}} lang={lang} />
      </section>
      <section
        id="services"
        aria-label="Our Architecture and Interior Design Services"
      >
        <OurServices content={dictionary.services || {}} lang={lang} />
      </section>
      <section
        id="projects"
        aria-label="Featured Architecture and Interior Design Projects"
      >
        <FeaturedProjects content={dictionary.projects || {}} lang={lang} />
      </section>
      {/* Use the new Client Component */}
      <EnhancedContent lang={lang} />
      <section id="about" aria-label="About Khales - Building Excellence">
        <AboutKhalesUltimate content={dictionary.about || {}} lang={lang} />
      </section>
      <section
        id="why-choose-us"
        aria-label="Why Choose Khales for Your Project"
      >
        <WhyKhalesHybrid content={dictionary.whyUs || {}} lang={lang} />
      </section>
      <section id="blogs" aria-label="Our Latest Blog Articles">
        <FeaturedBlogs content={dictionary.blogsPage || {}} lang={lang} />
      </section>
      <section id="testimonials" aria-label="Client Reviews and Testimonials">
        <TestimonialSlider
          content={dictionary.testimonials || {}}
          lang={lang}
        />
      </section>
      <section
        id="statistics"
        aria-label="Our Achievements and Success Stories"
      >
        <ValuePropositionV2 content={dictionary.stats || {}} lang={lang} />
      </section>
      {/* Use the new Client Component */}
      <FAQSection lang={lang} />
      <section id="contact" aria-label="Contact Khales for Your Next Project">
        <CTASection content={dictionary.cta || {}} lang={lang} />
      </section>
    </>
  );
}
