import React from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { getDictionary } from "@/get-dictionary";
import { projectsData } from "@/components/Property Page/ProjectData";
import ImageWithSkeleton from "@/components/ImageSkeleton";
import { FaArrowRight } from "react-icons/fa";

// --- SEO Schema and Metadata (No changes needed here) ---
const getProjectsPageSchema = (lang) => {
  const baseUrl = "https://www.khales.ae";
  const pageUrl = `${baseUrl}/${lang}/projects`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": pageUrl,
        url: pageUrl,
        name: lang === "ar" ? "مشاريعنا | خالص" : "Our Projects | Khales",
        description:
          lang === "ar"
            ? "استكشف مجموعتنا الكاملة من المشاريع السكنية والتجارية والفاخرة."
            : "Explore our full portfolio of residential, commercial, and luxury projects.",
        isPartOf: { "@id": `${baseUrl}/#website` },
        breadcrumb: { "@id": `${pageUrl}/#breadcrumb` },
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
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "ItemList",
        itemListElement: projectsData.map((project, index) => {
          const projectDetails = project[lang] || project.en;
          return {
            "@type": "ListItem",
            position: index + 1,
            url: `${baseUrl}/${lang}/projects/${project.slug}`,
            name: projectDetails.title,
          };
        }),
      },
    ],
  };
  return schema;
};

export async function generateMetadata({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageData = dictionary.projectsPage;
  const baseUrl = "https://www.khales.ae";
  const keywords =
    lang === "ar"
      ? [
          "مشاريع بناء",
          "مشاريع معمارية",
          "فلل فاخرة دبي",
          "مباني تجارية",
          "خالص للمقاولات",
        ]
      : [
          "construction projects",
          "architectural projects",
          "luxury villas Dubai",
          "commercial buildings",
          "Khales Contracting",
        ];

  return {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    keywords: keywords,
    openGraph: {
      title: pageData.metaTitle,
      description: pageData.metaDescription,
      url: `${baseUrl}/${lang}/projects`,
      siteName: "Khales",
      images: [
        {
          url: "https://i.ibb.co/Z6jRc9zm/Riyadh-1-sq.png",
          width: 1200,
          height: 630,
        },
      ],
      locale: lang === "ar" ? "ar_AE" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageData.metaTitle,
      description: pageData.metaDescription,
      images: ["https://i.ibb.co/Z6jRc9zm/Riyadh-1-sq.png"],
    },
    alternates: {
      canonical: `/projects`,
      languages: {
        "en-US": "/en/projects",
        "ar-AE": "/ar/projects",
      },
    },
  };
}

// --- UI Components (No changes needed here) ---
const HeroSection = ({ title, subtitle, lang }) => (
  <div
    style={{
      position: "relative",
      width: "100%",
      height: "50vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "#fff",
      direction: lang === "ar" ? "rtl" : "ltr",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1,
      }}
    ></div>
    <Image
      src="https://i.ibb.co/Xxp72yFD/Riyadh-2-sq.png"
      alt="Khales Projects Background"
      layout="fill"
      objectFit="cover"
      priority
    />
    <div style={{ position: "relative", zIndex: 2, padding: "0 1rem" }}>
      <h1
        style={{ fontSize: "3.5rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        {title}
      </h1>
      <p style={{ fontSize: "1.25rem", maxWidth: "600px", margin: "0 auto" }}>
        {subtitle}
      </p>
    </div>
  </div>
);

const CTASection = ({ lang }) => (
  <div
    style={{
      backgroundColor: "#f8f9fa",
      textAlign: "center",
      padding: "4rem 2rem",
      margin: "5rem auto 0 auto",
      maxWidth: "1200px",
      borderRadius: "20px",
      direction: lang === "ar" ? "rtl" : "ltr",
    }}
  >
    <h2
      style={{
        fontSize: "2.5rem",
        fontWeight: "bold",
        color: "#1a1a1a",
        marginBottom: "1rem",
      }}
    >
      {lang === "ar"
        ? "هل تبحث عن حلول متخصصة؟"
        : "Looking For Expert Solutions?"}
    </h2>
    <p
      style={{
        fontSize: "1.1rem",
        color: "#555",
        marginBottom: "2rem",
        maxWidth: "700px",
        margin: "0 auto 2rem auto",
      }}
    >
      {lang === "ar"
        ? "فريقنا جاهز لتحويل رؤيتك إلى واقع. تواصل معنا لبدء مشروعك القادم."
        : "Our team is ready to turn your vision into reality. Let's talk about your next project."}
    </p>
    <Link
      href={`/${lang}/Contact`}
      style={{
        display: "inline-block",
        backgroundColor: "#66a109",
        color: "#fff",
        padding: "1rem 2rem",
        borderRadius: "50px",
        textDecoration: "none",
        fontWeight: "500",
        fontSize: "1rem",
      }}
      className="cta-link"
    >
      {lang === "ar" ? "تواصل معنا" : "Book Your Consultation"}
    </Link>
  </div>
);

// --- Main Page Component ---
export default async function ProjectsPage({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.projectsPage;
  const projectsSchema = getProjectsPageSchema(lang);

  return (
    <>
      <Script
        id="projects-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
      <main>
        <HeroSection
          title={pageContent.title}
          subtitle={pageContent.metaDescription}
          lang={lang}
        />

        <div
          style={{
            width: "100%",
            padding: "5rem 0",
            backgroundColor: "#ffffffff",
          }}
        >
          <div
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "2.5rem",
                alignItems: "stretch",
              }}
            >
              {projectsData.map((project) => {
                const projectDetails = project[lang] || project.en;
                return (
                  // --- UI ENHANCEMENT: The structure is now a single Link component ---
                  <Link
                    href={`/${lang}/projects/${project.slug}`}
                    key={project.id}
                    className="project-card"
                  >
                    <ImageWithSkeleton
                      src={project.mainImage}
                      alt={projectDetails.title}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="card-image" // A class for the image component itself
                    />
                    <div className="card-overlay" />
                    <div
                      className="card-content"
                      style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
                    >
                      <div className="card-tags-container">
                        {projectDetails.tags?.map((tag) => (
                          <span key={tag} className="card-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="card-title">{projectDetails.title}</h2>
                      <div className="card-hover-content">
                        <p className="card-description">
                          {projectDetails.description}
                        </p>
                        <span className="card-cta">
                          {lang === "ar" ? "عرض المشروع" : "View Project"}
                          <FaArrowRight className="card-cta-icon" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <CTASection lang={lang} />
          </div>
        </div>
      </main>
    </>
  );
}
