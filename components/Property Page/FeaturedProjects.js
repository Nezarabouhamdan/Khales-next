"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import { categoryMap } from "@/lib/categoryMap";
import ImageWithSkeleton from "../ImageSkeleton";
// --- STYLED COMPONENTS (Unchanged) ---
const SectionWrapper = styled.section`
  width: 100%;
  padding: 5rem 0;
  background-color: #ffffffff; // خلفية بلون رمادي فاتح لكسر الروتين
  font-family: "Inter", sans-serif;
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
  overflow: hidden;
`;
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;
const Header = styled.div`
  margin: 0 auto 3rem auto;
`;
const Title = styled.h2`
  text-align: center;
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1a1a1a;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;
const FilterTabs = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;
const FilterButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 99px;
  border: 1px solid ${({ $active }) => ($active ? "#66a109" : "#e0e0e0")};
  background-color: ${({ $active }) => ($active ? "#66a109" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#555")};
  font-family: inherit;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${({ $active }) => ($active ? "#5a9008" : "#f5f5f5")};
  }
`;
const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2.5rem;
  align-items: stretch;
`;
const CardTitle = styled.h3`
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.75rem 0;
  text-decoration: none;
  transition: color 0.2s ease;
`;
const Description = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  text-decoration: none;
`;
const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  position: relative;

  /* This applies the transition to any direct child (our skeleton component) */
  & > * {
    transition: transform 0.4s ease;
  }
`;

const ProjectCard = styled(motion.div)`
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    ${CardTitle}, ${Description} {
      text-decoration: underline;
      text-decoration-color: #a0a0a0;
    }

    /* MODIFIED: This now targets any direct child of ImageWrapper */
    ${ImageWrapper} > * {
      transform: scale(1.05);
    }
  }
`;

const ProjectImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;
const CardContent = styled.div`
  padding: 1.5rem;
  text-align: ${({ lang }) => (lang === "ar" ? "right" : "left")};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
const Tags = styled.p`
  color: #66a109;
  font-weight: 500;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
`;

const ViewMoreWrapper = styled.div`
  text-align: center;
  margin-top: 3rem;
`;

const ViewMoreButton = styled(Link)`
  display: inline-block;
  padding: 0.8rem 2.5rem;
  border-radius: 99px;
  background-color: #66a109;
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #5a9008;
  }
`;

// --- MAIN COMPONENT ---
export default function FeaturedProjects({ lang, content }) {
  const projects = content?.projectsData || [];
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const featuredTabLabel = lang === "ar" ? "مميز" : "Featured";
  const tabs = [
    featuredTabLabel,
    ...Object.keys(categoryMap).map((key) => categoryMap[key][lang]),
  ];

  const [activeTab, setActiveTab] = useState(featuredTabLabel);

  useEffect(() => {
    setActiveTab(lang === "ar" ? "مميز" : "Featured");
  }, [lang]);

  if (projects.length === 0) {
    return null;
  }

  const filteredProjects = projects.filter((p) => {
    if (activeTab === featuredTabLabel) {
      return true;
    }

    const activeCategoryKey = Object.keys(categoryMap).find(
      (key) => categoryMap[key][lang] === activeTab
    );

    // ======================= THE FIX IS HERE =======================
    // Compare the English key from the project's category object.
    return p.category.eng === activeCategoryKey;
    // ===============================================================
  });

  return (
    <SectionWrapper ref={ref} lang={lang}>
      <Container>
        <Header>
          <Title>{content.title}</Title>
          <FilterContainer>
            <FilterTabs>
              {tabs.map((cat) => (
                <FilterButton
                  key={cat}
                  $active={activeTab === cat}
                  onClick={() => setActiveTab(cat)}
                >
                  {cat}
                </FilterButton>
              ))}
            </FilterTabs>
          </FilterContainer>
        </Header>

        <ProjectsGrid>
          <AnimatePresence>
            {filteredProjects.slice(0, 6).map((project, index) => (
              <ProjectCard
                as={motion.div}
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, y: -50 }}
                transition={{
                  duration: 0.5,
                  delay: inView ? index * 0.1 : 0,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={`/${lang}/projects/${project.slug}`}
                  passHref
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    textDecoration: "none",
                  }}
                >
                  <ImageWrapper>
                    {/* MODIFIED: Replaced ProjectImage with our new component */}
                    <ImageWithSkeleton
                      src={project.mainImage}
                      alt={project[lang]?.title || "Project Image"}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </ImageWrapper>
                  <CardContent lang={lang}>
                    <Tags>{project[lang]?.tags?.join(" / ")}</Tags>
                    <CardTitle>{project[lang]?.title}</CardTitle>
                    <Description>{project[lang]?.description}</Description>
                  </CardContent>
                </Link>
              </ProjectCard>
            ))}
          </AnimatePresence>
        </ProjectsGrid>
        {filteredProjects.length > 6 && (
          <ViewMoreWrapper>
            <ViewMoreButton href={`/${lang}/projects`}>
              {lang === "ar" ? "عرض المزيد" : "View More"}
            </ViewMoreButton>
          </ViewMoreWrapper>
        )}
      </Container>
    </SectionWrapper>
  );
}
