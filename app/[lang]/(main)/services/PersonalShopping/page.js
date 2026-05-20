// app/[lang]/(main)/services/PersonalShopping/page.js

import React from "react";
import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import PersonalShoppingPage from "@/pages/PersonalShoppingPage";
import FaqSchema from "@/components/FaqSchema/FaqSchema";
import Script from "next/script";

// ─── Structured Data (Service Schema) ─────────────────────────────────

const getServicePageSchema = (lang) => {
  const serviceName =
    lang === "ar"
      ? "خدمات التسوق الشخصي ومصمم الداخلي"
      : "Personal Shopping & Interior Designer – Khales Engineering Consultancy";
  const description =
    lang === "ar"
      ? "خدمة التسوق الشخصي ومصمم الداخلي في دبي والإمارات من شركة خالص. نقدم تجربة تسوق فاخرة واختيار أثاث فاخر وخدمات شراء وتجهيز ff&E للفلل الفاخرة."
      : "Personal Shopping & Interior Designer service in Dubai and the UAE. A white-glove, concierge sourcing and FF&E procurement experience for luxury villas — from exclusive trade-only catalogs to final white-glove installation.";

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
    serviceType: "Personal Shopping & FF&E Procurement",
    category: "Interior & Furnishing Consultancy",
  };
};

// ─── Metadata ──────────────────────────────────────────────────────────

export async function generateMetadata(props) {
  const { params } = props;
  const { lang } = params || {};
  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.personalShoppingPage;

  const title =
    lang === "ar"
      ? `${pageContent.intro.title} | مجموعة خالص`
      : `${pageContent.intro.title} | Khales Group`;

  const description =
    lang === "ar"
      ? "خدمة التسوق الشخصي ومصمم الداخلي من خالص في دبي والإمارات. تجربة تسوق فاخرة وشراء وتجهيز أثاث ff&E للفلل الفاخرة — من الكتالوجات الحصرية إلى التركيب النهائي."
      : "Khales Personal Shopping & Interior Designer — a white-glove sourcing experience for luxury villas in Dubai & the UAE, from exclusive trade catalogs to final installation.";

  const keywords =
    lang === "ar"
      ? [
          "تسوق شخصي دبي",
          "تأثيث فلل فاخرة",
          "شراء أثاث فاخر الإمارات",
          "توريد وتجهيز ff&E",
          "خدمة تسوق فاخرة دبي",
          "مصمم داخلي تسوق شخصي",
          "تأثيث فلل دبي",
          "خلال شراء أثاث فاخر",
        ]
      : [
          "personal shopping Dubai",
          "luxury furniture sourcing UAE",
          "FF&E procurement Dubai",
          "interior designer personal shopping",
          "white glove furniture installation",
          "trade only furniture sourcing",
          "luxury villa furnishing UAE",
          "personal shopper interior Dubai",
        ];

  return {
    title,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title,
      description,
      url: `https://www.khales.ae/${lang}/services/PersonalShopping`,
      siteName: "Khales Group",
      locale: lang === "ar" ? "ar_AE" : "en_US",
      type: "website",
      images: [
        {
          url: "https://i.ibb.co/rGFt2Dk3/ban-eng-des.png",
          width: 1200,
          height: 630,
          alt: "Personal Shopping & Interior Designer – Khales",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://i.ibb.co/rGFt2Dk3/ban-eng-des.png"],
    },
    alternates: {
      canonical: `/${lang}/services/PersonalShopping`,
      languages: {
        "en-US": "/en/services/PersonalShopping",
        "ar-AE": "/ar/services/PersonalShopping",
      },
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
    category: "Personal Shopping & Interior Design",
  };
}

// ─── Page ──────────────────────────────────────────────────────────────

export default async function Page(props) {
  const { params } = props;
  const { lang } = params || {};
  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.personalShoppingPage;
  const ctaContent = dictionary.cta;
  const serviceSchema = getServicePageSchema(lang);

  return (
    <>
      {/* Structured Data */}
      <Script
        id="personal-shopping-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      {/* FAQ Schema */}
      <FaqSchema questions={pageContent.faq.questions} />

      {/* Page Content */}
      <PersonalShoppingPage
        lang={lang}
        content={pageContent}
        ctaContent={ctaContent}
      />
    </>
  );
}
