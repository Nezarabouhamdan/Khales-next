"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import LazyImage from "../LazyImage"; // Assuming this path is correct

// Static data can remain here
const galleryImages = [
  "https://i.ibb.co/7tKV3xP1/aboutus5.jpg",
  "https://i.ibb.co/XftcdnrY/aboutus2.jpg",
  "https://i.ibb.co/v4S8JftQ/aboutus4.jpg",
  "https://i.ibb.co/jPgtTSzr/aboutus3.jpg",
];

// --- FRAMER MOTION VARIANTS (Your original code) ---
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// --- STYLED COMPONENTS (Your original code, with layout fixes) ---
const SectionWrapper = styled(motion.section)`
  width: 100%;
  min-height: 100vh;
  padding: 5rem 0; /* REMOVED horizontal padding here */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #f9fafb;
  font-family: ${(({ lang }) =>
    lang === "ar" ? "var(--font-tajawal)" : "var(--font-inter)",
  "sans-serif")};
  overflow: hidden; /* This is the key fix */
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
`;

// NEW CONTAINER TO MANAGE PADDING AND SHAPES
const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 5%; /* MOVED horizontal padding here */
  position: relative; /* Shapes will be positioned relative to this */
  z-index: 5;

  @media (max-width: 992px) {
    padding: 0 2.5rem;
  }
  @media (max-width: 576px) {
    padding: 0 1.5rem;
  }
`;

const ContentCard = styled(motion.div)`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 3rem;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    padding: 2.5rem;
    gap: 2.5rem;
  }
  @media (max-width: 576px) {
    padding: 2rem 1.5rem;
  }
`;
const TextBlock = styled(motion.div)`
  display: flex;
  flex-direction: column;
  text-align: ${({ lang }) => (lang === "ar" ? "right" : "left")};
  color: #1a1a1a;
`;
const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
  span {
    color: #66a109;
  }
`;
const Paragraph = styled(motion.p)`
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  line-height: 1.8;
  margin-bottom: 2.5rem;
  color: #555;
`;
const MotionLinkWrapper = styled(motion.div)`
  display: inline-block;
  text-decoration: none;
  width: fit-content;
  align-self: ${({ lang }) => (lang === "ar" ? "flex-end" : "flex-start")};
`;
const LearnMoreButton = styled.button`
  background: linear-gradient(135deg, #66a109, #66a109);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 161, 9, 0.3);
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(102, 161, 9, 0.4);
  }
`;
const GalleryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 1rem;
`;
const ImageWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
    z-index: 5;
  }
`;
const DecorativeShape = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(102, 161, 9, 0.05);
  z-index: 1; /* Behind the content card */
  pointer-events: none;
  @media (max-width: 992px) {
    display: none;
  }
`;
const LightboxOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
`;
const LightboxImage = styled(motion.img)`
  max-width: 90%;
  max-height: 90%;
  border-radius: 12px;
  cursor: default;
`;

// --- MAIN REFACTORED COMPONENT ---
export default function AboutKhalesUltimate({ lang, content }) {
  const [selectedImg, setSelectedImg] = useState(null);

  if (!content) {
    return null; // Or a loading skeleton
  }

  return (
    <>
      <SectionWrapper lang={lang}>
        {/* Decorative shapes are now positioned relative to the full-width SectionWrapper */}
        <DecorativeShape
          style={{ top: "15%", left: "5%", width: "250px", height: "250px" }}
        />
        <DecorativeShape
          style={{
            bottom: "10%",
            right: "8%",
            width: "180px",
            height: "180px",
          }}
        />

        <Container>
          <ContentCard
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <TextBlock lang={lang}>
              <Title variants={itemVariants}>{content.title}</Title>
              <Paragraph variants={itemVariants}>{content.paragraph}</Paragraph>
              <MotionLinkWrapper lang={lang} variants={itemVariants}>
                <Link href={`/${lang}/about-us`} passHref>
                  <LearnMoreButton>{content.button}</LearnMoreButton>
                </Link>
              </MotionLinkWrapper>
            </TextBlock>

            <GalleryGrid>
              {galleryImages.map((url, index) => (
                <ImageWrapper
                  key={url}
                  variants={itemVariants}
                  onClick={() => setSelectedImg(url)}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <LazyImage
                    src={url}
                    alt={`Khales Group showcase ${index + 1}`}
                    fill
                    sizes="(max-width: 992px) 45vw, 22vw"
                  />
                </ImageWrapper>
              ))}
            </GalleryGrid>
          </ContentCard>
        </Container>
      </SectionWrapper>

      <AnimatePresence>
        {selectedImg && (
          <LightboxOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <LightboxImage
              src={selectedImg}
              alt="Enlarged view of Khales Group project"
              layoutId={selectedImg}
              onClick={(e) => e.stopPropagation()}
            />
          </LightboxOverlay>
        )}
      </AnimatePresence>
    </>
  );
}
