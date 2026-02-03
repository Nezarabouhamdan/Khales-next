import React from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { getDictionary } from "@/get-dictionary";
import { projectsData } from "@/components/Property Page/ProjectData";
import ImageWithSkeleton from "@/components/ImageSkeleton";
import Pagination from "@/components/Pagination";
import { FaArrowRight } from "react-icons/fa";

// --- SEO Schema (Unchanged) ---
const getProjectsPageSchema = (lang) => {
  const baseUrl = "https://www.khales.ae";
  const pageUrl = `${baseUrl}/${lang}/projects`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": pageUrl,
        url: pageUrl,
        name: lang === "ar" ? "مشاريعنا | خالص" : "Our Projects | Khales",
        description:
          lang === "ar" ? "استكشف مشاريعنا" : "Explore our portfolio",
        isPartOf: { "@id": `${baseUrl}/#website` },
      },
      {
        "@type": "ItemList",
        itemListElement: projectsData.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${baseUrl}/${lang}/projects/${project.slug}`,
          name: project.en.title,
        })),
      },
    ],
  };
};

export async function generateMetadata(props) {
  const { params } = props;
  const { lang } = params || {};
  const dictionary = await getDictionary(lang);
  const pageData = dictionary.projectsPage;
  return {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    alternates: {
      canonical: `/projects`,
      languages: { "en-US": "/en/projects", "ar-AE": "/ar/projects" },
    },
  };
}

// --- UI Components ---

const HeroSection = ({ title, subtitle, lang }) => (
  <div className="hero-wrapper">
    <div className="hero-overlay"></div>
    <Image
      src="https://i.ibb.co/Xxp72yFD/Riyadh-2-sq.png"
      alt="Khales Projects"
      fill
      priority
      style={{ objectFit: "cover" }}
      className="hero-img"
    />
    <div className="hero-content">
      <h1>{title}</h1>
      <div className="hero-line"></div>
      <p>{subtitle}</p>
    </div>
  </div>
);

const CTASection = ({ lang }) => (
  <div
    style={{
      backgroundColor: "#f0f0f0ff",
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
export default async function ProjectsPage(props) {
  const { params, searchParams } = props;
  const { lang } = params || {};
  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.projectsPage;
  const projectsSchema = getProjectsPageSchema(lang);
  const isRtl = lang === "ar";

  const currentPage = parseInt(searchParams.page || "1", 10);
  const projectsPerPage = 9;
  const totalProjects = projectsData.length;
  const totalPages = Math.ceil(totalProjects / projectsPerPage);

  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = [...projectsData]
    .reverse()
    .slice(startIndex, endIndex);

  return (
    <>
      <Script
        id="projects-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />

      <style>{`
        :root {
          --khales-green: #66a109;
          --khales-white: #ffffff;
          --khales-dark: #111;
        }

        .rtl { direction: rtl; }
        .ltr { direction: ltr; }

        /* HERO SECTION */
        .hero-wrapper {
          position: relative;
          width: 100%;
          height: 50vh;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          overflow: hidden;
          background-color: #222;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 2;
        }
        .hero-img { z-index: 1; }
        .hero-content { position: relative; z-index: 3; max-width: 800px; padding: 20px; }
        .hero-content h1 { font-size: 3rem; font-weight: 800; margin-bottom: 1rem; text-shadow: 0 4px 10px rgba(0,0,0,0.5); }
        .hero-line { width: 60px; height: 4px; background: var(--khales-green); margin: 0 auto 1rem; border-radius: 2px; }

        /* MAIN LAYOUT */
        .projects-section {
          background-color: #f8f9fa;
          padding: 5rem 0;
        }
        .projects-wrapper {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* GRID: Ensures separate cards */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); /* Minimum width prevents squashing */
          gap: 2.5rem; /* FORCED SPACE BETWEEN CARDS */
          margin-bottom: 4rem;
        }

        /* CARD STYLING */
        .k-card {
          position: relative;
          border-radius: 24px; /* Ensures rounded corners on individual cards */
          overflow: hidden;
          height: 450px; /* Increased height for text */
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          text-decoration: none;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          background-color: #000; /* Fallback if image fails */
          isolation: isolate;
        }
        
        .k-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        /* Background Image Container */
        .k-card-bg {
          position: absolute;
          inset: 0;
          z-index: -2;
        }
        .k-skel-img {
          transition: transform 0.8s ease !important;
        }
        .k-card:hover .k-skel-img {
          transform: scale(1.1) !important; /* Zoom effect */
        }

        /* Gradient Overlay */
        .k-overlay {
          position: absolute;
          inset: 0;
          /* Strong gradient from bottom to allow text readability */
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 100%);
          z-index: -1;
        }

        /* Content inside Card */
        .k-content {
          padding: 1rem;
          color: white;
          position: relative;
          z-index: 2;
        }

        /* Tags */
        .k-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }
        .k-tag {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          background-color: white;
          color: var(--khales-dark);
          padding: 4px 12px;
          border-radius: 20px;
          letter-spacing: 0.5px;
        }
        .k-tag.highlight {
          background-color: var(--khales-green);
          color: white;
        }

        /* Typography */
        .k-title {
          font-size: 1.2rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 2px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        .k-desc {
          font-size: 0.75rem;
          color: #e0e0e0;
          line-height: 1.5;
          margin-bottom: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2; /* Limits description to 2 lines so text fits */
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Button */
        .k-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 0.75rem;
          color: var(--khales-green);
          text-transform: uppercase;
          transition: color 0.3s;
        }
        .k-link:hover { color: #fff; }
        
        .k-link .icon { transition: transform 0.3s; }
        .ltr .k-card:hover .k-link .icon { transform: translateX(5px); }
        .rtl .k-card:hover .k-link .icon { transform: translateX(-5px) rotate(180deg); }
        .rtl .k-link .icon { transform: rotate(180deg); }


        /* CTA Section */
        .cta-box {
          background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%);
          color: white;
          border-radius: 24px;
          padding: 4rem 2rem;
          text-align: center;
          margin-top: 4rem;
        }
        .cta-btn {
          background-color: var(--khales-green);
          color: white;
          padding: 14px 32px;
          border-radius: 50px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 20px;
          transition: background 0.3s;
        }
        .cta-btn:hover { background-color: #528207; }

        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .k-card { height: 450px; }
        }

        /* PAGINATION STYLES */
        .pagination-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 3rem;
        }
        .pagination-arrow {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #333;
          text-decoration: none;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: background-color 0.3s, color 0.3s;
        }
        .pagination-arrow:hover {
          background-color: #e9e9e9;
        }
        .pagination-arrow.disabled {
          color: #aaa;
          pointer-events: none;
        }
        .pagination-numbers {
          display: flex;
          gap: 0.5rem;
        }
        .pagination-link {
          color: #555;
          text-decoration: none;
          padding: 0.5rem 0.8rem;
          border-radius: 8px;
          transition: background-color 0.3s, color 0.3s;
        }
        .pagination-link:hover {
          background-color: #e9e9e9;
        }
        .pagination-link.active {
          background-color: var(--khales-green);
          color: white;
          font-weight: bold;
        }
      `}</style>

      <main className={isRtl ? "rtl" : "ltr"}>
        <HeroSection
          title={pageContent.title}
          subtitle={pageContent.metaDescription}
          lang={lang}
        />

        <div className="projects-section">
          <div className="projects-wrapper">
            <div className="projects-grid">
              {currentProjects.map((project) => {
                const projectDetails = project[lang] || project.en;

                // Handle missing tags safely
                const tags = projectDetails.tags || [];
                const primaryTag =
                  tags[0] || (lang === "ar" ? "مشروع مميز" : "Featured");
                const secondaryTag = tags[1];

                return (
                  <Link
                    href={`/${lang}/projects/${project.slug}`}
                    key={project.id}
                    className="k-card group" // Applying unique card class
                  >
                    {/* 1. BACKGROUND IMAGE */}
                    <div className="k-card-bg">
                      <ImageWithSkeleton
                        src={project.mainImage}
                        alt={projectDetails.title}
                        fill
                        className="k-skel-img"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    {/* 2. GRADIENT OVERLAY */}
                    <div className="k-overlay" />

                    {/* 3. TEXT CONTENT */}
                    <div className="k-content">
                      <div className="k-tags">
                        {secondaryTag && (
                          <span className="k-tag">{secondaryTag}</span>
                        )}
                        <span className="k-tag highlight">{primaryTag}</span>
                      </div>

                      <h2 className="k-title">{projectDetails.title}</h2>

                      <p className="k-desc">{projectDetails.description}</p>

                      <div className="k-link">
                        {lang === "ar" ? "عرض التفاصيل" : "View Project"}
                        <FaArrowRight className="icon" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                lang={lang}
              />
            )}

            <CTASection lang={lang} />
          </div>
        </div>
      </main>
    </>
  );
}
