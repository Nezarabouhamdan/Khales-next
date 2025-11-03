"use client";

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBed,
  FaRulerCombined,
  FaCheckCircle,
  FaBuilding,
} from "react-icons/fa";
import Image from "next/image";
import ImageWithSkeleton from "../ImageSkeleton";
import Link from "next/link";

// Swiper for mobile gallery
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// --- STYLED COMPONENTS (WITH LAYOUT FIX) ---
const kenBurns = keyframes`
  0% { transform: scale(1.0); }
  100% { transform: scale(1.1); }
`;

const SectionContainer = styled.section`
  margin-top: 10vh;
  width: 100%;
  padding: 4rem 0; /* REMOVED horizontal padding */
  background-color: #ffffff;
  font-family: "Inter", sans-serif;
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
  overflow-x: hidden; /* Prevent horizontal scroll */

  @media (max-width: 992px) {
    padding: 2rem 0;
    margin-top: 8vh;
  }
`;

const ContentWrapper = styled(motion.div)`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 2rem; /* ADDED horizontal padding here */

  @media (max-width: 992px) {
    padding: 0 1rem;
  }
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 16px;
  cursor: pointer;
  position: relative;
  background-color: #f0f0f0;

  img {
    animation: ${kenBurns} 20s ease-in-out infinite alternate;
    transition: transform 0.3s ease !important;
  }
  &:hover img {
    transform: scale(1.05) !important;
  }
`;
const DesktopMainImage = styled(ImageWrapper)`
  grid-row: span 2;
  cursor: default;
  @media (max-width: 992px) {
    display: none;
  }
  &:hover img {
    transform: none !important;
  }
`;
const MobileImageContainer = styled.div`
  width: 100%;
  height: 350px;
  position: relative;
`;
const HeroGrid = styled(motion.div)`
  margin-bottom: 3rem;
  @media (min-width: 993px) {
    display: grid;
    grid-template-columns: 550px 1fr;
    gap: 1rem;
    height: 550px;
  }
`;
const MobileSwiperWrapper = styled.div`
  display: none;
  @media (max-width: 992px) {
    display: block;
    width: 100%;
    margin: 0 auto;
  }
  .swiper {
    border-radius: 16px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: #66a109;
    --swiper-navigation-size: 30px;
  }
  .swiper-pagination-bullet-active {
    background-color: #66a109;
  }
`;
const DesktopSubImageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: min-content;
  gap: 1rem;
  grid-row: span 2;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  @media (max-width: 992px) {
    display: none;
  }
`;
const DetailsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  margin-bottom: 5rem;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;
const LeftColumn = styled.div``;
const RightColumn = styled.div``;
const PropertyTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;
const Address = styled.p`
  color: #555;
  margin-bottom: 2rem;
`;
const Subheading = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 0.75rem;
  margin-bottom: 1.5rem;
  margin-top: 2.5rem;
`;
const Description = styled.p`
  line-height: 1.8;
  color: #495057;
`;
const KeyFeaturesSection = styled.div`
  width: 100%;
`;
const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;
const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #343a40;
  font-size: 1rem;

  svg {
    color: #66a109;
    font-size: 1.25rem;
    flex-shrink: 0;
  }
`;
const Stats = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;
const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  .icon {
    font-size: 1.5rem;
    color: #555;
  }
  div {
    line-height: 1.2;
  }
  strong {
    font-size: 1.25rem;
    color: #1a1a1a;
  }
`;
const HighlightsTable = styled.div`
  margin-bottom: 2rem;
`;
const HighlightRow = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e9ecef;
  span:first-child {
    color: #555;
  }
  span:last-child {
    font-weight: 500;
    color: #1a1a1a;
  }
`;
const ContactButton = styled(Link)`
  display: block;
  width: 100%;
  text-align: center;
  background-color: #66a109;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  .arrow {
    margin-left: 0.5rem;
    transition: transform 0.2s ease;
  }
  &:hover {
    box-shadow: 0 10px 20px rgba(102, 161, 9, 0.3);
    transform: translateY(-3px);
    .arrow {
      transform: translateX(5px);
    }
  }
`;

// --- MAIN UI COMPONENT ---
export default function PropertyPage({ project, lang }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) {
    return <div>Loading project...</div>;
  }

  const projectData = project[lang] || project.en;
  const gallery = project.galleryImages || [];

  if (!projectData) {
    return <div>Content for this language not found.</div>;
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <SectionContainer lang={lang}>
      <ContentWrapper>
        <HeroGrid>
          {gallery.length > 0 && (
            <DesktopMainImage as={motion.div} variants={itemVariants}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                  }}
                >
                  <ImageWithSkeleton
                    src={gallery[currentImageIndex]}
                    alt={`${projectData.title} - view ${currentImageIndex + 1}`}
                    fill
                    priority
                    quality={90}
                    sizes="(min-width: 993px) 60vw, 0vw"
                    style={{ objectFit: "cover" }}
                  />
                </motion.div>
              </AnimatePresence>
            </DesktopMainImage>
          )}

          {gallery.length > 1 && (
            <DesktopSubImageGrid>
              {gallery
                .filter((_, index) => index !== currentImageIndex)
                .map((imgSrc) => {
                  const originalIndex = gallery.indexOf(imgSrc);
                  return (
                    <ImageWrapper
                      as={motion.div}
                      variants={itemVariants}
                      key={imgSrc}
                      onClick={() => setCurrentImageIndex(originalIndex)}
                    >
                      <img
                        src={imgSrc}
                        alt={`${projectData.title} thumbnail`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        loading="lazy"
                      />
                    </ImageWrapper>
                  );
                })}
            </DesktopSubImageGrid>
          )}

          {gallery.length > 0 && (
            <MobileSwiperWrapper>
              <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                spaceBetween={10}
                navigation
                pagination={{ clickable: true }}
                loop={gallery.length > 1}
              >
                {gallery.map((imgSrc, i) => (
                  <SwiperSlide key={i}>
                    <MobileImageContainer>
                      <ImageWithSkeleton
                        src={imgSrc}
                        alt={`${projectData.title} gallery image ${i + 1}`}
                        fill
                        sizes="100vw"
                        quality={85}
                        style={{ objectFit: "cover" }}
                      />
                    </MobileImageContainer>
                  </SwiperSlide>
                ))}
              </Swiper>
            </MobileSwiperWrapper>
          )}
        </HeroGrid>

        <DetailsGrid
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <LeftColumn as={motion.div} variants={itemVariants}>
            <PropertyTitle>{projectData.title}</PropertyTitle>
            <Address>{projectData.address}</Address>

            <Subheading>
              {lang === "ar" ? "وصف المشروع" : "Project Description"}
            </Subheading>
            <Description>{projectData.longDescription}</Description>

            {projectData.keyFeatures && projectData.keyFeatures.length > 0 && (
              <KeyFeaturesSection>
                <Subheading>
                  {lang === "ar" ? "الميزات الرئيسية" : "Key Features"}
                </Subheading>
                <FeaturesList>
                  {projectData.keyFeatures.map((feature, index) => (
                    <FeatureItem key={index}>
                      <FaCheckCircle /> <span>{feature}</span>
                    </FeatureItem>
                  ))}
                </FeaturesList>
              </KeyFeaturesSection>
            )}
          </LeftColumn>
          <RightColumn as={motion.div} variants={itemVariants}>
            <Stats>
              {/* --- CORRECT & IMPROVED LOGIC --- */}
              {project.id !== 6 && (
                <StatItem>
                  <span className="icon">
                    <FaBed />
                  </span>
                  <div>
                    <strong>{projectData.beds}</strong>
                    <br />
                    {lang === "ar" ? "غرف" : "Beds"}
                  </div>
                </StatItem>
              )}
              {/* --- END OF LOGIC --- */}

              {projectData.floor && (
                <StatItem>
                  <span className="icon">
                    <FaBuilding />
                  </span>
                  <div>
                    <strong>{projectData.floor}</strong>
                    <br />
                    {lang === "ar" ? "طوابق" : "Floors"}
                  </div>
                </StatItem>
              )}
              <StatItem>
                <span className="icon">
                  <FaRulerCombined />
                </span>
                <div>
                  <strong>{projectData.sqft}</strong>
                  <br />
                  {lang === "ar" ? "قدم مربع" : "SqFt"}
                </div>
              </StatItem>
            </Stats>
            {projectData.highlights && projectData.highlights.length > 0 && (
              <>
                <Subheading>
                  {lang === "ar" ? "أبرز الميزات" : "Highlights"}
                </Subheading>
                <HighlightsTable>
                  {projectData.highlights.map((item, i) => (
                    <HighlightRow
                      key={i}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span>{item.label}</span>
                      <span>{item.value}</span>
                    </HighlightRow>
                  ))}
                </HighlightsTable>
              </>
            )}
            <ContactButton href={`/${lang}/Contact`}>
              {lang === "ar" ? "تواصل معنا" : "Contact us"}{" "}
              <span className="arrow">→</span>
            </ContactButton>
          </RightColumn>
        </DetailsGrid>
      </ContentWrapper>
    </SectionContainer>
  );
}
