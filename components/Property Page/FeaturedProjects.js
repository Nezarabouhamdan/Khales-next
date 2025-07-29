"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../../Context/Languagecontext";
import Link from "next/link";
import Image from "next/image"; // It's better to use next/image

// --- FIX ---
// Import the data and function from the new central file.
import { projectsData, findProjectBySlug } from "./ProjectData";

// Your component can now be exported on its own.
// We also export findProjectBySlug again from here for any other client component that might need it.
export { findProjectBySlug };

const FeaturedProjects = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("Featured");
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const tabs = {
    eng: ["Featured", "Commerical", "Interior Design", "Villas"],
    ar: ["مميز", "تجاري", "تصميم داخلي", "فلل"],
  };

  const filteredProjects = projectsData.filter((p) => {
    if (activeTab === "Featured" || activeTab === "مميز") return true;
    return p.category[language] === activeTab;
  });

  return (
    <SectionWrapper ref={ref} lang={language}>
      <Container>
        <Header>
          <Title>
            {language === "ar" ? "مشاريع مميزة" : "Featured Projects"}
          </Title>
          <FilterContainer>
            <FilterTabs>
              {tabs[language].map((cat) => (
                <FilterButton
                  key={cat}
                  active={activeTab === cat}
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
            {filteredProjects.map((project, index) => (
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
                  href={`/projects/${project.slug}`}
                  passHref
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    textDecoration: "none",
                  }}
                >
                  <ImageWrapper>
                    {/* The ProjectImage component now uses LazyImage */}
                    <ProjectImage
                      src={project.mainImage}
                      alt={project[language].title}
                      width={500}
                      height={500}
                    />
                  </ImageWrapper>
                  <CardContent lang={language}>
                    <Tags>{project[language].tags.join(" / ")}</Tags>
                    <CardTitle>{project[language].title}</CardTitle>
                    <Description>{project[language].description}</Description>
                  </CardContent>
                </Link>
              </ProjectCard>
            ))}
          </AnimatePresence>
        </ProjectsGrid>
      </Container>
    </SectionWrapper>
  );
};

// --- STYLED COMPONENTS ---
const SectionWrapper = styled.section`
  /* ... styles remain the same ... */
  width: 100%;
  padding: 5rem 2rem;
  background-color: #fff;
  font-family: "Inter", sans-serif;
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
`;
const Container = styled.div`
  /* ... styles remain the same ... */
  max-width: 1200px;
  margin: 0 auto;
`;
const Header = styled.div`
  /* ... styles remain the same ... */
  margin: 0 auto 3rem auto;
`;
const Title = styled.h2`
  /* ... styles remain the same ... */
  text-align: center;
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1a1a1a;
`;
const FilterContainer = styled.div`
  /* ... styles remain the same ... */
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;
const FilterTabs = styled.div`
  /* ... styles remain the same ... */
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;
const FilterButton = styled.button`
  /* ... styles remain the same ... */
  padding: 0.6rem 1.2rem;
  border-radius: 99px;
  border: 1px solid ${({ active }) => (active ? "#66a109" : "#e0e0e0")};
  background-color: ${({ active }) => (active ? "#66a109" : "transparent")};
  color: ${({ active }) => (active ? "#fff" : "#555")};
  font-family: inherit;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${({ active }) => (active ? "#5a9008" : "#f5f5f5")};
  }
`;
const ProjectsGrid = styled(motion.div)`
  /* ... styles remain the same ... */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2.5rem;
  align-items: stretch;
`;
const CardTitle = styled.h3`
  /* ... styles remain the same ... */
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.75rem 0;
  text-decoration: none;
  transition: color 0.2s ease;
`;
const Description = styled.p`
  /* ... styles remain the same ... */
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  text-decoration: none;
`;
const ProjectCard = styled(motion.div)`
  /* ... styles remain the same ... */
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
  }
`;
const ImageWrapper = styled.div`
  /* ... styles remain the same ... */
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
`;

// --- CHANGE 2: Base the styled component on LazyImage ---
const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  transition: transform 0.4s ease;
  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  /* ... styles remain the same ... */
  padding: 1.5rem;
  text-align: ${({ lang }) => (lang === "ar" ? "right" : "left")};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
const Tags = styled.p`
  /* ... styles remain the same ... */
  color: #66a109;
  font-weight: 500;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
`;

export default FeaturedProjects;
