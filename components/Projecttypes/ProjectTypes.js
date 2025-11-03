"use client";
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaArrowRight,
  FaHome,
  FaBuilding,
  FaGem, // Import a new icon for luxury
} from "react-icons/fa";
import ImageWithSkeleton from "../ImageSkeleton"; // Reusing your existing component

// Configuration for the project types with relevant icons and images
const projectTypesConfig = [
  {
    // Residential
    showcase: {
      icon: <FaHome />,
      image:
        "https://i.ibb.co/zT0WrNXC/Whats-App-Image-2025-10-30-at-17-35-07-1a75eb9d.jpg", // A high-quality image of a residential project
    },
  },
  {
    // Commercial
    showcase: {
      icon: <FaBuilding />,
      image:
        "https://i.ibb.co/23z0fFjw/Whats-App-Image-2025-10-30-at-17-36-29-132f0528.jpg", // A high-quality image of a commercial project
    },
  },
  {
    // NEW: Luxury Villa
    showcase: {
      icon: <FaGem />, // Using the new luxury icon
      image:
        "https://i.ibb.co/TD19YqTg/Whats-App-Image-2025-10-30-at-17-37-38-b2830fda.jpg", // A high-quality image of a luxury villa
    },
  },
];

// --- STYLED COMPONENTS ---

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem; /* Reduced gap to accommodate clickable row padding */
  position: relative;
  z-index: 1;

  &::after {
    content: "";
    position: absolute;
    top: 5rem;
    right: ${({ lang }) => (lang === "ar" ? "auto" : "0")};
    left: ${({ lang }) => (lang === "ar" ? "0" : "auto")};
    width: 80px;
    height: 80px;
    background-image: radial-gradient(#dbe3ce 20%, transparent 20%);
    background-size: 10px 10px;
    opacity: 0.7;
    z-index: 0;
  }

  @media (max-width: 992px) {
    gap: 1rem;
    padding: 0 1.5rem;
    &::after {
      top: 2rem;
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

// This is no longer a Link, just a visual div.
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
  width: 100%;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
    z-index: -1;
  }
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  max-width: 700px;
  margin-bottom: 4rem;
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
    margin-bottom: 2rem;
    h2 {
      font-size: 2.5rem;
    }
  }
`;

const ProjectRowWrapper = styled(motion.div)`
  width: 100%;
`;

// MODIFICATION 1: Create a new component from next/link to wrap everything.
// This is now the main clickable element and flex container.
const ClickableProjectRow = styled(Link)`
  display: flex;
  width: 100%;
  max-width: 1100px;
  gap: 3rem;
  align-items: center;
  flex-direction: ${(props) => (props.$isReversed ? "row-reverse" : "row")};
  text-decoration: none; /* Remove default link styles */
  color: inherit; /* Inherit text color from parent */
  border-radius: 20px; /* Optional: for hover effects */
  transition: background-color 0.3s ease;

  /* MODIFICATION 2: Unified hover effect for the entire row */
  &:hover {
    ${ShowcaseCard} {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    }
    ${BackgroundImageWrapper} {
      transform: scale(1.05);
    }
    .arrow-icon {
      transform: ${({ lang }) =>
        lang === "ar"
          ? "translateX(-4px) scaleX(-1)"
          : "translateX(4px) scaleX(1)"};
    }
  }

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 2rem;
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

// MODIFICATION 3: Change ExploreLink from a Link to a div
const ExploreLink = styled.div`
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
`;

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
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 10%;
    left: ${({ lang }) => (lang === "ar" ? "auto" : "-150px")};
    right: ${({ lang }) => (lang === "ar" ? "-150px" : "auto")};
    width: 500px;
    height: 500px;
    background-color: #f0f5e6;
    border-radius: 50%;
    opacity: 0.6;
    z-index: 0;
  }

  @media (max-width: 992px) {
    padding: 4rem 0;
    gap: 4rem;
    &::before {
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
          const projectUrl = `/${lang}/${project.slug}`;

          return (
            // MODIFICATION 4: Use the new ClickableProjectRow as the main wrapper
            <ProjectRowWrapper key={project.title}>
              <ClickableProjectRow
                href={projectUrl}
                $isReversed={index % 2 !== 0}
                lang={lang}
              >
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
                  <motion.div>
                    <ExploreLink lang={lang}>
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
              </ClickableProjectRow>
            </ProjectRowWrapper>
          );
        })}
      </ContentWrapper>
    </ProjectsContainer>
  );
}
