// app/[lang]/services/InteriorDesign/page.js

import React from "react";
import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import InteriorDesignPage from "@/pages/InteriorDesignPage";
import FaqSchema from "@/components/FaqSchema/FaqSchema";
import Script from "next/script";

export async function generateMetadata(props) {
  const { params } = props;
  const { lang } = params || {};
  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.interiorDesignPage;

  const title =
    lang === "ar"
      ? "خدمات التصميم الداخلي الفاخر في دبي | شركة خالص للهندسة المعمارية"
      : "Luxury Interior Design Services Dubai | Khales Architecture & Design";

  const description =
    lang === "ar"
      ? "شركة خالص تقدم خدمات التصميم الداخلي الفاخر في دبي والإمارات. نحن متخصصون في تصميم الفلل، المكاتب، الفنادق، والمساحات التجارية بأعلى معايير الجودة والإبداع. فريقنا من المصممين المحترفين يحول رؤيتك إلى واقع ملموس مع الاهتمام بأدق التفاصيل."
      : "Khales offers luxury interior design services in Dubai and UAE. We specialize in designing villas, offices, hotels, and commercial spaces with the highest standards of quality and creativity. Our team of professional designers transforms your vision into reality with attention to every detail.";

  const keywords =
    lang === "ar"
      ? [
          "تصميم داخلي دبي",
          "شركات تصميم داخلي الإمارات",
          "تصميم فلل فاخرة دبي",
          "تصميم مكاتب تجارية",
          "تشطيبات داخلية فاخرة",
          "مصمم داخلي محترف دبي",
          "استشارات تصميم داخلي",
          "تأثيث مساحات فاخرة",
          "تصميم داخلي تجاري دبي",
          "ديكور مودرن الإمارات",
          "تصميم شقق سكنية",
          "خالص تصميم داخلي",
          "أفضل شركة تصميم داخلي دبي",
          "تصميم داخلي معاصر",
          "تصميم فنادق دبي",
        ]
      : [
          "interior design Dubai",
          "interior design companies UAE",
          "luxury villa design Dubai",
          "commercial office design",
          "luxury interior fit-out",
          "professional interior designer Dubai",
          "interior design consultancy",
          "luxury space planning",
          "commercial interior design Dubai",
          "modern decor UAE",
          "residential apartment design",
          "Khales interior design",
          "best interior design company Dubai",
          "contemporary interior design",
          "hotel interior design Dubai",
          "interior designers near me",
          "Dubai interior design services",
          "luxury home interior design",
          "office interior design Dubai",
          "villa interior design UAE",
        ];

  return {
    title,
    description,
    keywords: keywords.join(", "),
    authors: [
      { name: "Khales Interior Design Team", url: "https://www.khales.ae" },
    ],
    creator: "Khales",
    publisher: "Khales Group",
    metadataBase: new URL("https://www.khales.ae"),
    alternates: {
      canonical: `/${lang}/services/InteriorDesign`,
      languages: {
        "en-US": "/en/services/InteriorDesign",
        "ar-AE": "/ar/services/InteriorDesign",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.khales.ae/${lang}/services/InteriorDesign`,
      siteName: "Khales Group",
      locale: lang === "ar" ? "ar_AE" : "en_US",
      type: "website",
      images: [
        {
          url: "https://www.khales.ae/assets/ourservices/interior.png",
          width: 1200,
          height: 630,
          alt: "Khales Interior Design Services Dubai",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.khales.ae/assets/ourservices/interior.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "Interior Design Services",
  };
}

// Service page structured data
const getServicePageSchema = (lang) => {
  const serviceName =
    lang === "ar" ? "خدمات التصميم الداخلي" : "Interior Design Services";
  const description =
    lang === "ar"
      ? "خدمات التصميم الداخلي الفاخر في دبي والإمارات العربية المتحدة"
      : "Luxury interior design services in Dubai and United Arab Emirates";

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: description,
    provider: {
      "@type": "Organization",
      name: "Khales",
      url: "https://www.khales.ae",
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
    areaServed: [
      { "@type": "City", name: "Dubai" },
      { "@type": "City", name: "Abu Dhabi" },
      { "@type": "City", name: "Sharjah" },
      { "@type": "Country", name: "United Arab Emirates" },
    ],
    serviceType: "Interior Design",
    category: "Design Services",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Interior Design Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Residential Interior Design",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Commercial Interior Design",
          },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Villa Interior Design" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Office Interior Design" },
        },
      ],
    },
  };
};

export default async function Page(props) {
  const { params } = props;
  const { lang } = params || {};
  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.interiorDesignPage;
  const ctaContent = dictionary.cta;
  const serviceSchema = getServicePageSchema(lang);

  return (
    <>
      <Script
        id="interior-design-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <FaqSchema questions={pageContent.faq.questions} />
      <InteriorDesignPage
        lang={lang}
        content={pageContent}
        ctaContent={ctaContent}
      />
    </>
  );
}
