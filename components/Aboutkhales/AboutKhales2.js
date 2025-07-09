// components/AboutKhalesUltimate.jsx
"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "../../Context/Languagecontext"; // Make sure this path is correct

//================================================================
// CONTENT & DATA
//================================================================
const content = {
  eng: {
    title: "Khales",
    group: "Group",
    paragraph:
      "At Khales Project Management, we turn ideas into reality with expert architecture, construction, and fit-out solutions. No delays, no compromises—just results that exceed expectations.",
    button: "Learn More",
  },
  ar: {
    title: "مجموعة",
    group: "خالص",
    paragraph:
      "في مجموعة خالص لإدارة المشاريع، نحوّل الأفكار إلى واقع ملموس من خلال حلول معمارية وإنشائية وتشطيبات متخصصة. لا تأخير ولا تنازلات، فقط نتائج تفوق التوقعات.",
    button: "أعرف المزيد",
  },
};

const galleryImages = [
  "https://i.ibb.co/7tKV3xP1/aboutus5.jpg",
  "https://i.ibb.co/XftcdnrY/aboutus2.jpg",
  "https://i.ibb.co/v4S8JftQ/aboutus4.jpg",
  "https://i.ibb.co/jPgtTSzr/aboutus3.jpg",
];

//================================================================
// ANIMATION VARIANTS (FOR SMOOTHER ANIMATIONS)
//================================================================
// Main container to orchestrate the text block and gallery
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Animate text block, then the gallery
    },
  },
};

// Controls the cascading animation of text elements
const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Animate title, then paragraph, then button
      delayChildren: 0.2, // Small delay after the block itself appears
    },
  },
};

// Variant for each text item (Title, Paragraph, Button)
const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

// Controls the stagger for the image gallery
const galleryContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // Images appear in rapid succession
    },
  },
};

// Variant for each image, with a softer spring
const imageVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100, // Softer spring
      damping: 18, // Less bounce
    },
  },
};

//================================================================
// HOOKS
//================================================================
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatches = () => setMatches(media.matches);
    updateMatches();
    media.addEventListener("change", updateMatches);
    return () => media.removeEventListener("change", updateMatches);
  }, [query]);
  return matches;
};

//================================================================
// STYLED COMPONENTS (No changes here)
//================================================================
const SectionWrapper = styled(motion.section)`
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ lang }) =>
      lang === "ar" ? "var(--font-tajawal)" : "var(--font-inter)"},
    sans-serif;
  padding: 4rem 2rem;
  background-color: #ffffff;
  @media (max-width: 900px) {
    padding: 4rem 1rem;
    min-height: auto;
    flex-direction: column;
    gap: 3rem;
  }
`;

const TextBlock = styled(motion.div)`
  max-width: 550px;
  text-align: center;
  color: #1a1a1a;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
  @media (max-width: 900px) {
    max-width: 95vw;
    padding: 2rem 1.5rem;
    order: -1;
  }
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  line-height: 1.1;
  @media (max-width: 768px) {
    font-size: 3rem;
  }
  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const Paragraph = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
  color: #333;
  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const MotionLink = motion(Link);
const LearnMoreButton = styled.a`
  display: inline-block;
  padding: 0.8rem 2.5rem;
  border-radius: 8px;
  background-color: #66a109;
  color: white;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  font-family: inherit;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(102, 161, 9, 0.3);
  }
`;

const OrbitingGallery = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
  @media (max-width: 900px) {
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    pointer-events: auto;
  }
`;

const ImageWrapper = styled(motion.div)`
  position: absolute;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: 2px solid white;
  pointer-events: auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 900px) {
    position: relative;
    width: 90%;
    max-width: 400px;
    height: 250px;
  }
`;

const DecorativeShape = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  transition: transform 0.4s ease-out;
  background: rgba(102, 161, 9, 0.05);
  border-radius: 50%;
  @media (max-width: 900px) {
    display: none;
  }
`;

const LightboxOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5000;
  cursor: pointer;
`;

const LightboxImage = styled(motion.img)`
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 8px;
  cursor: default;
`;

//================================================================
// MAIN COMPONENT
//================================================================
const AboutKhalesUltimate = () => {
  const { language } = useLanguage();
  const [selectedImg, setSelectedImg] = useState(null);
  const isMobile = useMediaQuery("(max-width: 900px)");
  const currentContent = content[language] || content.eng;

  const imagePositions = [
    { top: "10%", left: "15%", width: "250px", height: "350px" },
    { top: "15%", right: "10%", width: "300px", height: "200px" },
    { bottom: "12%", right: "18%", width: "280px", height: "400px" },
    { bottom: "15%", left: "8%", width: "220px", height: "300px" },
  ];

  return (
    <>
      <SectionWrapper
        lang={language}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <DecorativeShape
          style={{ top: "5%", left: "5%", width: "220px", height: "220px" }}
        />
        <DecorativeShape
          style={{
            bottom: "10%",
            right: "10%",
            width: "180px",
            height: "180px",
          }}
        />

        <TextBlock variants={textContainerVariants}>
          <Title variants={textItemVariants}>
            {currentContent.title}
            <br />
            {currentContent.group}
          </Title>
          <Paragraph variants={textItemVariants}>
            {currentContent.paragraph}
          </Paragraph>
          <MotionLink href="/ABOUTUS" passHref variants={textItemVariants}>
            <LearnMoreButton>{currentContent.button}</LearnMoreButton>
          </MotionLink>
        </TextBlock>

        <OrbitingGallery variants={galleryContainerVariants}>
          {galleryImages.map((url, index) => (
            <ImageWrapper
              key={url}
              variants={imageVariants}
              style={!isMobile ? imagePositions[index] : {}}
              onClick={() => setSelectedImg(url)}
              whileHover={
                !isMobile
                  ? { scale: 1.05, zIndex: 4, transition: { duration: 0.2 } }
                  : {}
              }
            >
              <img src={url} alt={`Gallery image ${index + 1}`} />
            </ImageWrapper>
          ))}
        </OrbitingGallery>
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
              alt="Enlarged view"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            />
          </LightboxOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default AboutKhalesUltimate;
