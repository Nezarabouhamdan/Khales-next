"use client";
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaHome, FaBuilding, FaShopware } from "react-icons/fa"; // Using relevant icons
import ImageWithSkeleton from "../ImageSkeleton"; // Reusing your existing component
// Configuration for the project types with relevant icons and images
const projectTypesConfig = [
  {
    // Residential
    showcase: {
      icon: <FaHome />,
      image: "https://i.ibb.co/yY1hC1x/resdintal.jpg", // A high-quality image of a residential project
    },
  },
  {
    // Commercial
    showcase: {
      icon: <FaBuilding />,
      image: "https://i.ibb.co/mHkC7dC/commerical.jpg", // A high-quality image of a commercial project
    },
  },
];
// --- STYLED COMPONENTS (Renamed for clarity, styles are identical to OurServices) ---
// --- STYLED COMPONENTS ---

// Add position: relative to ContentWrapper
const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;
  position: relative; /* Add this */
  z-index: 1; /* Ensure content stays above the background shape */

  /* New pseudo-element for the small decorative icon */
  &::after {
    content: "";
    position: absolute;
    top: 5rem; /* Position it near the top */
    right: ${({ lang }) =>
      lang === "ar" ? "auto" : "0"}; /* Position on the right for LTR */
    left: ${({ lang }) =>
      lang === "ar" ? "0" : "auto"}; /* Position on the left for RTL */
    width: 80px;
    height: 80px;
    background-image: radial-gradient(
      #dbe3ce 20%,
      transparent 20%
    ); /* Creates a dot */
    background-size: 10px 10px; /* Creates a grid of dots */
    opacity: 0.7;
    z-index: 0; /* Keep it behind the main text/images */
  }

  @media (max-width: 992px) {
    gap: 4rem;
    padding: 0 1.5rem;
    &::after {
      top: 2rem; /* Adjust position for mobile */
      width: 60px;
      height: 60px;
    }
  }
`;
const BackgroundImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  transition: transform 0.4s ease;
  border-radius: 20px;
  overflow: hidden;
`;
const ShowcaseCard = styled.div`
  position: relative;
  border-radius: 20px;
  padding: 2rem;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  overflow: hidden;
  isolation: isolate;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
    z-index: -1;
  }
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    ${BackgroundImageWrapper} {
      transform: scale(1.05);
    }
  }
`;
const SectionHeader = styled(motion.div)`
  text-align: center;
  max-width: 700px;
  h2 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #1a1a1a;
  }
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #555;
  }
  @media (max-width: 768px) {
    h2 {
      font-size: 2.5rem;
    }
  }
`;
const ProjectRow = styled(motion.div)`
  display: flex;
  width: 100%;
  max-width: 1100px;
  gap: 3rem;
  align-items: center;
  flex-direction: ${(props) => (props.$isReversed ? "row-reverse" : "row")};
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;
const ShowcaseColumn = styled(motion.div)`
  flex: 1;
  min-width: 300px;
  width: 100%;
`;
const ShowcaseIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  color: #fff;
`;
const ShowcaseSubCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
`;
const TextColumn = styled(motion.div)`
  flex: 1.2;
`;
const ProjectTypeTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
  span {
    color: #66a109;
  }
`;
const ProjectTypeDescription = styled.p`
  color: #555;
  line-height: 1.8;
  margin-bottom: 2rem;
`;
const ExploreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #66a109;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: gap 0.3s ease;
  .arrow-icon {
    transition: transform 0.3s ease;
  }
  &:hover .arrow-icon {
    transform: ${({ lang }) =>
      lang === "ar" ? "translateX(-4px)" : "translateX(4px)"};
  }
`; // --- STYLED COMPONENTS ---

const ProjectsContainer = styled.section`
  width: 100%;
  padding: 6rem 0;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
  overflow: hidden;
  position: relative; /* This is crucial for positioning the pseudo-element */

  /* Add this new pseudo-element for the background shape */
  &::before {
    content: "";
    position: absolute;
    top: 10%; /* Adjust vertical position */
    left: ${({ lang }) =>
      lang === "ar"
        ? "auto"
        : "-150px"}; /* Position off-screen to the left for LTR */
    right: ${({ lang }) =>
      lang === "ar"
        ? "-150px"
        : "auto"}; /* Position off-screen to the right for RTL */
    width: 500px; /* Width of the shape */
    height: 500px; /* Height of the shape */
    background-color: #f0f5e6; /* A very light green, matching your brand */
    border-radius: 50%; /* Makes it a circle */
    opacity: 0.6; /* Soften the color */
    z-index: 0; /* Place it behind the content */
  }

  @media (max-width: 992px) {
    padding: 4rem 0;
    gap: 4rem;
    &::before {
      /* Adjust for smaller screens if needed */
      width: 350px;
      height: 350px;
      left: ${({ lang }) => (lang === "ar" ? "auto" : "-100px")};
      right: ${({ lang }) => (lang === "ar" ? "-100px" : "auto")};
    }
  }
`;
// --- MAIN COMPONENT ---
export default function ProjectTypes({ lang, content }) {
  if (!content || !content.header || !content.items) {
    return null;
  }
  return (
    <ProjectsContainer lang={lang}>
      <ContentWrapper>
        <SectionHeader
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2>{content.header.title}</h2>
          <p>{content.header.subtitle}</p>
        </SectionHeader>
        {content.items.map((project, index) => {
          const projectConfig = projectTypesConfig[index];
          const projectUrl = `/${lang}/projects#${project.slug}`; // Link to a section on the projects page

          return (
            <ProjectRow key={project.title} $isReversed={index % 2 !== 0}>
              <ShowcaseColumn>
                <ShowcaseCard>
                  <BackgroundImageWrapper>
                    <ImageWithSkeleton
                      src={projectConfig.showcase.image}
                      alt={`Showcase for ${project.title} projects`}
                      sizes="(max-width: 992px) 90vw, 45vw"
                    />
                  </BackgroundImageWrapper>
                  <ShowcaseIcon>{projectConfig.showcase.icon}</ShowcaseIcon>
                  <div>
                    <ShowcaseSubCard>
                      {project.showcaseSubtitle}
                    </ShowcaseSubCard>
                  </div>
                </ShowcaseCard>
              </ShowcaseColumn>

              <TextColumn>
                <motion.div>
                  <ProjectTypeTitle as="h3">
                    {project.title} <span>{project.highlight}</span>
                  </ProjectTypeTitle>
                  <ProjectTypeDescription>
                    {project.description}
                  </ProjectTypeDescription>
                </motion.div>
                {/* FeaturesGrid has been removed as requested */}
                <motion.div>
                  <ExploreLink href={projectUrl} lang={lang}>
                    {project.linkText}
                    <FaArrowRight
                      className="arrow-icon"
                      style={{
                        transform: lang === "ar" ? "scaleX(-1)" : "scaleX(1)",
                      }}
                    />
                  </ExploreLink>
                </motion.div>
              </TextColumn>
            </ProjectRow>
          );
        })}
      </ContentWrapper>
    </ProjectsContainer>
  );
}
