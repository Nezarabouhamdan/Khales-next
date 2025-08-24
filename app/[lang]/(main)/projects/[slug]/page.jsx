import React from "react";
import { notFound } from "next/navigation";
import Script from "next/script"; // <-- IMPORT SCRIPT COMPONENT
import {
  projectsData,
  findProjectBySlug,
} from "@/components/Property Page/ProjectData";
import PropertyPage from "@/components/Property Page/PropertyPage";

// --- NEW SCHEMA FUNCTION (For Individual Projects) ---
const getProjectPageSchema = (lang, project) => {
  const projectData = project[lang] || project.en;
  const baseUrl = "https://www.khales.ae";
  const pageUrl = `${baseUrl}/${lang}/projects/${project.slug}`;

  // This schema describes the project as a product (a building)
  // It provides rich details that search engines can use for rich snippets
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: `${projectData.title} | Khales Group`,
        description: projectData.description,
        isPartOf: { "@id": `${baseUrl}/#website` },
        breadcrumb: { "@id": `${pageUrl}/#breadcrumb` },
      },
      {
        "@type": "Product", // <-- The specific schema for a project
        "@id": `${pageUrl}/#product`,
        name: projectData.title,
        description: projectData.longDescription,
        image: project.mainImage,
        sku: project.id,
        brand: {
          "@type": "Brand",
          name: "Khales",
        },
        offers: {
          "@type": "Offer",
          price: projectData.price.replace(/,/g, ""), // Use numeric price for schema
          priceCurrency: lang === "ar" ? "OMR" : "OMR", // Adjust currency as needed (e.g., AED, SAR)
          availability: "https://schema.org/InStock", // Or another relevant status
          url: pageUrl,
        },
        // Add specific details about the property
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Square Footage",
            value: `${projectData.sqft} sqft`,
          },
          {
            "@type": "PropertyValue",
            name: "Bedrooms",
            value: projectData.beds,
          },
          {
            "@type": "PropertyValue",
            name: "Floors",
            value: projectData.floor,
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: lang === "ar" ? "الرئيسية" : "Home",
            item: `${baseUrl}/${lang}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: lang === "ar" ? "المشاريع" : "Projects",
            item: `${baseUrl}/${lang}/projects`,
          }, // Assuming a projects index page exists
          {
            "@type": "ListItem",
            position: 3,
            name: projectData.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };
};

// --- METADATA (Dynamically generated with keywords and rich social cards) ---
export async function generateMetadata({ params }) {
  const { slug, lang } = params;
  const project = findProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const projectData = project[lang] || project.en;
  const baseUrl = "https://www.khales.ae";

  // --- ADDED: Dynamic keywords based on project details ---
  const keywords =
    lang === "ar"
      ? [
          projectData.title,
          `مشروع ${projectData.title}`,
          project.category.ar,
          projectData.address,
          `مشاريع بناء في ${projectData.address}`,
        ]
      : [
          projectData.title,
          `${projectData.title} project`,
          project.category.eng,
          projectData.address,
          `construction projects in ${projectData.address}`,
        ];

  return {
    title: `${projectData.title} | Khales Project`,
    description: projectData.description,
    keywords: keywords,
    // --- ADDED: Open Graph and Twitter for rich social sharing ---
    openGraph: {
      title: `${projectData.title} | Khales Project`,
      description: projectData.description,
      url: `${baseUrl}/${lang}/projects/${slug}`,
      siteName: "Khales",
      images: [{ url: project.mainImage, width: 1200, height: 630 }],
      locale: lang === "ar" ? "ar_AE" : "en_US",
      type: "article", // 'article' is good for a detailed project page
    },
    twitter: {
      card: "summary_large_image",
      title: `${projectData.title} | Khales Project`,
      description: projectData.description,
      images: [project.mainImage],
    },
    // --- ADDED: Canonical and hreflang for international SEO ---
    alternates: {
      canonical: `/${lang}/projects/${slug}`,
      languages: {
        "en-US": `/en/projects/${slug}`,
        "ar-AE": `/ar/projects/${slug}`,
      },
    },
  };
}

// --- PAGE COMPONENT (Updated with Schema injection) ---
export default async function Page({ params }) {
  const { slug, lang } = params;
  const project = findProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Generate the specific schema for this project
  const projectSchema = getProjectPageSchema(lang, project);

  return (
    <>
      {/* Inject the dynamic, project-specific schema */}
      <Script
        id="project-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <main>
        <PropertyPage project={project} lang={lang} />
      </main>
    </>
  );
}

// Ensure this function exists in your project
export async function generateStaticParams() {
  return projectsData.flatMap((project) => [
    { lang: "en", slug: project.slug },
    { lang: "ar", slug: project.slug },
  ]);
}
