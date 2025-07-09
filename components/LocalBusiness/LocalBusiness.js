import Script from "next/script";

const LocalBusinessSchema = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.khales.ae/#organization",
    name: "Khales",
    alternateName: "Khales Architecture & Interior Design",
    url: "https://www.khales.ae/",
    logo: "https://www.khales.ae/assets/Khales-Logo.png",
    image: [
      "https://www.khales.ae/assets/Khales-Logo.png",
      "https://www.khales.ae/assets/aboutus1.jpg",
      "https://www.khales.ae/assets/Services.jpg",
    ],
    description:
      "Premier architecture and interior design company in Dubai, UAE, specializing in luxury residential and commercial projects, project management, engineering consultancy, and development planning.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dubai",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      postalCode: "",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.2048,
      longitude: 55.2708,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+971551299880",
        contactType: "customer service",
        availableLanguage: ["English", "Arabic"],
        areaServed: "AE",
        contactOption: "TollFree",
      },
    ],
    sameAs: ["https://api.whatsapp.com/send?phone=+971551299880"],
    openingHours: ["Mo-Fr 08:00-18:00", "Sa 09:00-17:00"],
    priceRange: "$$$",
    currenciesAccepted: "AED, USD",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    areaServed: [
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
      {
        "@type": "Country",
        name: "United Arab Emirates",
      },
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 25.2048,
        longitude: 55.2708,
      },
      geoRadius: "100000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Architecture & Interior Design Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Architecture Design",
            description:
              "Comprehensive architectural design services for residential and commercial projects",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Interior Design",
            description:
              "Luxury interior design services for homes, offices, and commercial spaces",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Project Management",
            description:
              "End-to-end project management for construction and design projects",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Engineering Consultancy",
            description:
              "Professional engineering consultancy services for building projects",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Development Planning",
            description:
              "Strategic development planning and feasibility studies",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Landscape Design",
            description: "Creative landscape design and outdoor space planning",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Ahmed Al-Mansouri",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "Exceptional architecture and interior design services. Khales transformed our villa into a masterpiece. Highly professional team and outstanding results.",
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Sarah Johnson",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "Outstanding commercial interior design project. The team at Khales delivered beyond our expectations with innovative design solutions and excellent project management.",
      },
    ],
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessSchema),
      }}
    />
  );
};

export default LocalBusinessSchema;
