// Enhanced Structured Data for Khales.ae
// This file contains comprehensive structured data schemas for better SEO

// 1. Organization Schema (Main Company Information)
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.khales.ae/#organization",
  name: "Khales",
  alternateName: "Khales Architecture & Interior Design",
  url: "https://www.khales.ae/",
  logo: {
    "@type": "ImageObject",
    url: "https://www.khales.ae/assets/Khales-Logo.png",
    width: 1200,
    height: 630,
    caption: "Khales - Premier Architecture & Interior Design Company Dubai",
  },
  image: {
    "@type": "ImageObject",
    url: "https://www.khales.ae/assets/Khales-Logo.png",
    width: 1200,
    height: 630,
  },
  description:
    "Dubai's premier architecture and interior design company specializing in luxury residential and commercial projects across UAE. Expert project management, engineering consultancy, and development planning services.",
  slogan: "Building Futures, Creating Landmarks",
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    addressCountry: "AE",
    addressRegion: "Dubai",
    addressLocality: "Dubai",
    streetAddress: "Dubai, United Arab Emirates",
    postalCode: "00000",
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
    {
      "@type": "ContactPoint",
      url: "https://api.whatsapp.com/send?phone=+971551299880",
      contactType: "customer service",
      availableLanguage: ["English", "Arabic"],
      areaServed: "AE",
    },
  ],
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
    {
      "@type": "City",
      name: "Ajman",
    },
    {
      "@type": "City",
      name: "Ras Al Khaimah",
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
    name: "Architecture and Interior Design Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": "https://www.khales.ae/architecture",
          name: "Architecture Design",
          description:
            "Professional architectural design services for residential and commercial projects in Dubai and UAE. Modern, sustainable, and innovative architectural solutions.",
          provider: {
            "@type": "Organization",
            "@id": "https://www.khales.ae/#organization",
          },
          areaServed: {
            "@type": "Country",
            name: "United Arab Emirates",
          },
          category: "Architecture",
          serviceType: "Professional Service",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": "https://www.khales.ae/InteriorDesign",
          name: "Interior Design",
          description:
            "Luxury interior design services for homes, offices, and commercial spaces across UAE. Contemporary, modern, and bespoke interior solutions.",
          provider: {
            "@type": "Organization",
            "@id": "https://www.khales.ae/#organization",
          },
          areaServed: {
            "@type": "Country",
            name: "United Arab Emirates",
          },
          category: "Interior Design",
          serviceType: "Professional Service",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": "https://www.khales.ae/ProjectManagement",
          name: "Project Management",
          description:
            "Comprehensive project management services from conception to completion. Expert oversight for architecture and interior design projects.",
          provider: {
            "@type": "Organization",
            "@id": "https://www.khales.ae/#organization",
          },
          areaServed: {
            "@type": "Country",
            name: "United Arab Emirates",
          },
          category: "Project Management",
          serviceType: "Professional Service",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": "https://www.khales.ae/EngineeringConsultancy",
          name: "Engineering Consultancy",
          description:
            "Expert engineering consultancy and technical analysis services. Structural engineering, MEP design, and technical project support.",
          provider: {
            "@type": "Organization",
            "@id": "https://www.khales.ae/#organization",
          },
          areaServed: {
            "@type": "Country",
            name: "United Arab Emirates",
          },
          category: "Engineering",
          serviceType: "Professional Service",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": "https://www.khales.ae/Developmentplanning",
          name: "Development Planning",
          description:
            "Strategic development planning and feasibility studies for real estate and construction projects across UAE.",
          provider: {
            "@type": "Organization",
            "@id": "https://www.khales.ae/#organization",
          },
          areaServed: {
            "@type": "Country",
            name: "United Arab Emirates",
          },
          category: "Development Planning",
          serviceType: "Professional Service",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": "https://www.khales.ae/LandscapingDesign",
          name: "Landscape Design",
          description:
            "Professional landscape design services for residential and commercial properties. Sustainable and beautiful outdoor spaces.",
          provider: {
            "@type": "Organization",
            "@id": "https://www.khales.ae/#organization",
          },
          areaServed: {
            "@type": "Country",
            name: "United Arab Emirates",
          },
          category: "Landscape Design",
          serviceType: "Professional Service",
        },
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "150",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Ivan K.",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody:
        "From the very first consultation, Khales impressed me with their professionalism and depth of architectural knowledge. Our Ras Al Khaimah retreat now stands as a statement of contemporary elegance and balance—exactly what we dreamed of.",
      datePublished: "2024-01-15",
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "James W.",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody:
        "Working with Khales was a masterclass in professionalism. Their landscaping transformed our Dubai villa into a lush, serene retreat. Every detail was perfectly executed.",
      datePublished: "2024-02-20",
    },
  ],
};

// 2. Local Business Schema
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.khales.ae/#localbusiness",
  name: "Khales",
  image: "https://www.khales.ae/assets/Khales-Logo.png",
  "@id": "https://www.khales.ae/",
  url: "https://www.khales.ae/",
  telephone: "+971551299880",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Dubai, United Arab Emirates",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    postalCode: "00000",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.2048,
    longitude: 55.2708,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [
    "https://api.whatsapp.com/send?phone=+971551299880",
    "https://facebook.com/Khales.ae",
    "https://instagram.com/khales.ae",
    "https://linkedin.com/company/khales-ae",
  ],
  priceRange: "$$$",
};

// 3. Website Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.khales.ae/#website",
  url: "https://www.khales.ae/",
  name: "Khales",
  description: "Premier Architecture & Interior Design Company in Dubai, UAE",
  publisher: {
    "@type": "Organization",
    "@id": "https://www.khales.ae/#organization",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.khales.ae/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: "en-US",
  copyrightYear: "2024",
  copyrightHolder: {
    "@type": "Organization",
    "@id": "https://www.khales.ae/#organization",
  },
};

// 4. Professional Service Schema
export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.khales.ae/#service",
  name: "Khales Architecture & Interior Design Services",
  description:
    "Professional architecture and interior design services in Dubai, UAE. Specializing in luxury residential and commercial projects.",
  provider: {
    "@type": "Organization",
    "@id": "https://www.khales.ae/#organization",
  },
  areaServed: {
    "@type": "Country",
    name: "United Arab Emirates",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Architecture and Interior Design Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Residential Architecture",
          description:
            "Custom residential architecture design for villas, apartments, and luxury homes in Dubai and UAE.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Commercial Architecture",
          description:
            "Professional commercial architecture design for offices, retail spaces, and mixed-use developments.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Luxury Interior Design",
          description:
            "High-end interior design services for residential and commercial spaces with contemporary and modern aesthetics.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Project Management",
          description:
            "End-to-end project management for architecture and interior design projects from concept to completion.",
        },
      },
    ],
  },
  serviceType: "Architecture and Interior Design",
  category: "Professional Services",
};

// 5. FAQ Schema (for common questions)
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What architecture and interior design services does Khales offer in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Khales offers comprehensive architecture and interior design services including residential and commercial architecture, luxury interior design, project management, engineering consultancy, development planning, and landscape design across Dubai and UAE.",
      },
    },
    {
      "@type": "Question",
      name: "How much do architecture and interior design services cost in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Architecture and interior design costs vary based on project scope, size, and complexity. Khales provides customized quotes based on your specific requirements. Contact us at +971551299880 for a free consultation and detailed pricing.",
      },
    },
    {
      "@type": "Question",
      name: "How long does an architecture or interior design project take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Project timelines depend on scope and complexity. Residential projects typically take 3-6 months for design and 6-12 months for completion. Commercial projects may take longer. Khales provides detailed timelines during the consultation phase.",
      },
    },
    {
      "@type": "Question",
      name: "Does Khales work on projects outside Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Khales provides architecture and interior design services across the UAE including Dubai, Abu Dhabi, Sharjah, Ajman, and Ras Al Khaimah. We serve both residential and commercial clients throughout the Emirates.",
      },
    },
    {
      "@type": "Question",
      name: "What makes Khales different from other architecture firms in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Khales combines innovative design with practical expertise, offering personalized service, transparent timelines, and quality craftsmanship. Our team specializes in contemporary and luxury designs with a focus on client satisfaction and project excellence.",
      },
    },
  ],
};

// Usage instructions:
// Import these schemas in your components and add them to the page head
// Example:
// <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
