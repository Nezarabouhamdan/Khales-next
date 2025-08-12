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

// --- STRUCTURED DATA --- (Updated with Blog Section)
const getHomePageSchema = (lang) => {
  const name =
    lang === "ar"
      ? "خالص - شركة رائدة للهندسة المعمارية والتصميم الداخلي في دبي"
      : "Khales - Premier Architecture & Interior Design Company Dubai, UAE";

  const description =
    lang === "ar"
      ? "شركة رائدة في الهندسة المعمارية والتصميم الداخلي في دبي متخصصة في المشاريع السكنية والتجارية الفاخرة في جميع أنحاء الإمارات."
      : "Dubai's premier architecture and interior design company specializing in luxury residential and commercial projects across UAE.";

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.khales.ae/#webpage",
    url: "https://www.khales.ae/",
    name: name,
    description: description,
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://www.khales.ae/#website",
      url: "https://www.khales.ae/",
      name: "Khales",
      description:
        "Premier Architecture & Interior Design Company in Dubai, UAE",
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
            itemOffered: {
              "@type": "Service",
              name: "Engineering Consultancy",
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
          position: 6, // New position
          item: { "@type": "WebPageElement", name: "Our Blogs" }, // New blog section
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
};

// --- METADATA --- (No changes needed)
export async function generateMetadata({ params: { lang } }) {
  const title =
    lang === "ar"
      ? "خالص | شركة هندسة معمارية وتصميم داخلي رائدة في دبي"
      : "Khales | Premier Architecture & Design Firm in Dubai, UAE";

  const description =
    lang === "ar"
      ? "اكتشف خالص، شركة الهندسة المعمارية والتصميم الداخلي الرائدة في دبي. متخصصون في بناء الفلل الفاخرة والمكاتب العصرية والمشاريع التجارية المخصصة في جميع أنحاء الإمارات."
      : "Discover Khales, Dubai's leading architecture & interior design firm. We craft luxury villas, modern offices, and bespoke commercial projects across the UAE.";

  const keywords =
    lang === "ar"
      ? [
          "هندسة معمارية دبي",
          "تصميم داخلي دبي",
          "تصميم فاخر الإمارات",
          "شركة خالص",
          "مهندسين معماريين دبي",
          "مصممين داخليين الإمارات",
          "تصميم فلل دبي",
          "تصميم مكاتب دبي",
          "إدارة مشاريع الإمارات",
          "مدونة هندسة معمارية", // Added keyword
        ]
      : [
          "architecture Dubai",
          "interior design Dubai",
          "luxury design UAE",
          "Khales company",
          "architects Dubai",
          "interior designers UAE",
          "villa design Dubai",
          "office design Dubai",
          "project management UAE",
          "commercial architecture Dubai",
          "residential design Dubai",
          "engineering consultancy Dubai",
          "architecture blog", // Added keyword
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
          alt: "Khales - Architecture & Interior Design Dubai",
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
        aria-label="Premier Architecture & Interior Design Company Dubai"
      >
        <Hero
          slides={dictionary.hero?.slides || []}
          lang={lang}
          isHomePage={true}
        />
      </section>
      {/* New Blog Section */}

      {/* Use the new Client Component */}
      <EnhancedContent lang={lang} />

      <section id="about" aria-label="About Khales - Building Excellence">
        <AboutKhalesUltimate content={dictionary.about || {}} lang={lang} />
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
