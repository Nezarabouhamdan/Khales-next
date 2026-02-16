// components/ServicePages/InteriorDesignPage.js
"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa"; // Added for a premium touch

// Import your existing styled-components and UI components
import InteriorDesign from "@/components/InteriorDesign/InteriorDesign";
import OurProcessWork from "@/components/OurProcessWork/OurProcessWork";
import CTASection from "@/components/Homecontact/CTASection";
import { Row2, Column } from "@/utils/Globalstyles";
import { GreenText, Title as Title2 } from "@/components/Whoweare/TextContent";
import { projectsData } from "@/components/Property Page/ProjectData";
import ImageWithSkeleton from "@/components/ImageSkeleton";

const HeroSlider = dynamic(() => import("@/components/Slider/Slider"));

// --- SLEEK, PREMIUM STYLED COMPONENTS ---

const ProjectsSectionWrapper = styled.section`
  width: 100%;
  padding: 6rem 2rem;
  background-color: #fafafa; // Slightly off-white to make the white cards pop
  font-family: "Inter", sans-serif;
  direction: ${({ $lang }) => ($lang === "ar" ? "rtl" : "ltr")};
`;

const ProjectsContainer = styled.div`
  max-width: 1250px;
  margin: 0 auto;
`;

const ProjectsTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3.5rem;
  color: #111;
  letter-spacing: -0.5px;
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
  align-items: stretch;
`;

const ProjectCard = styled(motion.div)`
  background: #ffffff;
  border: 1px solid #eaeaea; // Clean, subtle border instead of heavy shadow
  border-radius: 12px; // Slightly sharper corners look more high-end
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06); // Extremely soft, elegant shadow
    border-color: transparent;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3; // Editorial/Architectural photography ratio
  overflow: hidden;
  position: relative;
  background-color: #f5f5f5;

  & > * {
    transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
`;

const CardContent = styled.div`
  padding: 2rem 1.5rem;
  text-align: ${({ $lang }) => ($lang === "ar" ? "right" : "left")};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; // Pushes the link to the bottom
`;

const TextBlock = styled.div`
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #111;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
  letter-spacing: -0.3px;
`;

const CardDescription = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;

  /* Forces text to cut off gracefully after 3 lines so cards stay equal height */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardFooterLink = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #66a109; // Your brand green
  transition: color 0.3s ease;

  svg {
    transition: transform 0.3s ease;
    /* Arrow direction handling for RTL/LTR */
    transform: ${({ $lang }) => ($lang === "ar" ? "rotate(180deg)" : "none")};
  }
`;

const CardLinkWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;

  &:hover ${ImageWrapper} > * {
    transform: scale(1.05); // Smooth zoom on hover
  }

  &:hover ${CardFooterLink} {
    color: #111;
  }

  /* Pushes the arrow icon out slightly on hover */
  &:hover ${CardFooterLink} svg {
    transform: ${({ $lang }) =>
      $lang === "ar" ? "translateX(-4px) rotate(180deg)" : "translateX(4px)"};
  }
`;

// --- MAIN COMPONENT ---
export default function InteriorDesignPage({ lang, content, ctaContent }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!content || !content.intro || !content.process || !content.faq) {
    return null;
  }

  const introData = [
    {
      title: content.intro.title,
      subtitle: content.intro.subtitle,
      description1: content.intro.description1,
      description2: content.intro.description2,
      images: content.intro.images,
    },
  ];

  // Get projects 16-21
  const selectedProjects = projectsData.filter((p) => p.id >= 16 && p.id <= 21);

  return (
    <>
      <section id="hero" aria-label="hero">
        <HeroSlider
          slides={content.slides || []}
          lang={lang}
          isLoading={isLoading}
          rtl={lang === "ar"}
        />
      </section>

      <InteriorDesign data={introData} />

      {/* --- REFINED PROJECTS SECTION --- */}
      <ProjectsSectionWrapper $lang={lang}>
        <ProjectsContainer>
          <ProjectsTitle>
            {lang === "ar"
              ? "مشاريع التصميم الداخلي"
              : "Interior Design Projects"}
          </ProjectsTitle>
          <ProjectsGrid>
            <AnimatePresence>
              {selectedProjects.map((project, index) => (
                <ProjectCard
                  as={motion.div}
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <CardLinkWrapper
                    href={`/${lang}/projects/${project.slug}`}
                    $lang={lang}
                  >
                    <ImageWrapper>
                      <ImageWithSkeleton
                        src={project.mainImage}
                        alt={project[lang]?.title || "Project"}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </ImageWrapper>
                    <CardContent $lang={lang}>
                      <TextBlock>
                        <CardTitle>{project[lang]?.title}</CardTitle>
                        <CardDescription>
                          {project[lang]?.description}
                        </CardDescription>
                      </TextBlock>
                      <CardFooterLink $lang={lang}>
                        {lang === "ar" ? "عرض المشروع" : "View Project"}
                        <FaArrowRight />
                      </CardFooterLink>
                    </CardContent>
                  </CardLinkWrapper>
                </ProjectCard>
              ))}
            </AnimatePresence>
          </ProjectsGrid>
        </ProjectsContainer>
      </ProjectsSectionWrapper>

      <Column>
        <Title2>
          {content.process.title}
          <GreenText>{content.process.highlight}</GreenText>
        </Title2>
        <Row2
          rtl={lang === "ar"}
          style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}
        >
          <OurProcessWork panels={content.process.steps || []} />
          <img width={"300px"} src={"/assets/4.png"} alt="Process Work" />
        </Row2>

        <Title2>
          {content.faq.title}
          <GreenText>{content.faq.highlight}</GreenText>
        </Title2>

        <OurProcessWork panels={content.faq.questions || []} />
      </Column>

      <CTASection lang={lang} content={ctaContent} />
    </>
  );
}
