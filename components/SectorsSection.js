"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import ImageWithSkeleton from "@/components/ImageSkeleton";

// --- STYLED COMPONENTS (New Version) ---

const SectorsWrapper = styled.section`
  width: 100%;
  background-color: #ffffff;
  font-family: var(--font-inter);
  padding: 6rem 4rem;
  overflow: hidden;

  @media (max-width: 992px) {
    padding: 3rem 2rem;
  }
`;

const MaxWidthContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 5rem;
  align-items: flex-start;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const SectorNav = styled.div`
  position: sticky;
  top: 120px;

  @media (max-width: 992px) {
    position: relative;
    top: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
  }
`;

const NavItem = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 0.75rem 0;
  font-size: 1.2rem;
  font-weight: 500;
  color: #888;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #1a1a1a;
  }

  &.active {
    color: #1a1a1a;
    font-weight: 600;
  }

  @media (max-width: 992px) {
    width: auto;
    padding: 0.5rem;
    font-size: 1rem;
  }
`;

const ActiveSectorDisplay = styled.div`
  position: relative;
  min-height: 500px; /* Adjust as needed */

  @media (max-width: 768px) {
    min-height: auto;
  }
`;

const ContentWrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  align-items: center;
  width: 100%;

  /* For smooth transitions */
  position: absolute;
  top: 0;
  left: 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    position: relative;
  }
`;

const TextColumn = styled.div`
  text-align: left;
`;

const SectorNumber = styled.span`
  display: block;
  font-size: 0.9rem;
  color: #999;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.9;
  color: #555;
  margin-bottom: 2rem;
`;

const ExploreLink = styled.a`
  font-weight: 600;
  color: #1a1a1a;
  text-decoration: none;
  border-bottom: 2px solid #1a1a1a;
  padding-bottom: 0.25rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "+";
    color: #66a109;
    font-weight: 900;
  }
`;

const ImageColumn = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
`;

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

// --- COMPONENT LOGIC ---

const SectorsSection = ({ data }) => {
  const [activeSector, setActiveSector] = useState(data.sectors[0]);

  return (
    <SectorsWrapper>
      <MaxWidthContainer>
        <MainContent>
          <SectorNav>
            {data.sectors.map((sector) => (
              <NavItem
                key={sector.id}
                className={activeSector.id === sector.id ? "active" : ""}
                onClick={() => setActiveSector(sector)}
              >
                {sector.title}
              </NavItem>
            ))}
          </SectorNav>

          <ActiveSectorDisplay>
            <AnimatePresence mode="wait">
              <ContentWrapper
                key={activeSector.id}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <TextColumn>
                  <SectorNumber>({activeSector.sectorNumber})</SectorNumber>
                  <CardTitle>{activeSector.title}</CardTitle>
                  <CardDescription>{activeSector.description}</CardDescription>
                  <ExploreLink href={activeSector.href}>
                    Explore More
                  </ExploreLink>
                </TextColumn>
                <ImageColumn>
                  <ImageWithSkeleton
                    src={activeSector.image}
                    alt={activeSector.title}
                    sizes="(max-width: 992px) 100vw, 50vw"
                  />
                </ImageColumn>
              </ContentWrapper>
            </AnimatePresence>
          </ActiveSectorDisplay>
        </MainContent>
      </MaxWidthContainer>
    </SectorsWrapper>
  );
};

export default SectorsSection;
