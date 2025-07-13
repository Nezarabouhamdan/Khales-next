// components/Aboutkhales/AboutKhales2.js
"use client";

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components"; // 'keyframes' is imported
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "../../Context/Languagecontext";

// --- 1. DEFINE THE FLOATING ANIMATION ---
const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-12px); /* Controls how high the images float */
  }
  100% {
    transform: translateY(0px);
  }
`;

//================================================================
// CONTENT & DATA (Unchanged)
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
// --- 2. ANIMATION VARIANTS (RESTORED) ---
// This section is now complete again, which fixes the ReferenceError.
//================================================================
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const textContainerVariants = {
  // <<< THIS IS NOW DEFINED
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const textItemVariants = {
  // <<< THIS IS NOW DEFINED
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const galleryContainerVariants = {
  // <<< THIS IS NOW DEFINED
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.15,
    },
  },
};

const imageVariants = {
  // <<< THIS IS NOW DEFINED
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

//================================================================
// CUSTOM HOOK FOR RESPONSIVE DESIGN (Unchanged)
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
// STYLED COMPONENTS (ImageWrapper is modified for floating)
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
    padding: 2rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  color: #1a1a1a;
  @media (max-width: 900px) {
    font-size: 3rem;
  }
  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
`;

const Paragraph = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  color: #555;
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const MotionLink = styled(motion(Link))`
  display: inline-block;
  text-decoration: none;
`;

const LearnMoreButton = styled.button`
  background: linear-gradient(135deg, #66a109, #8bc34a);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 161, 9, 0.3);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 161, 9, 0.4);
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

// --- 3. APPLY THE ANIMATION TO THE IMAGE WRAPPER ---
const ImageWrapper = styled(motion.div)`
  position: absolute;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: 2px solid white;
  pointer-events: auto;

  /* --- ADDED FLOATING ANIMATION --- */
  animation-name: ${floatAnimation};
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;

  /* Different durations make the floating look natural */
  &:nth-of-type(1) {
    animation-duration: 7s;
  }
  &:nth-of-type(2) {
    animation-duration: 8s;
    animation-delay: -2s;
  }
  &:nth-of-type(3) {
    animation-duration: 6s;
    animation-delay: -4s;
  }
  &:nth-of-type(4) {
    animation-duration: 7.5s;
    animation-delay: -1s;
  }
  /* --- END OF ADDED ANIMATION --- */

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
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
`;

const LightboxImage = styled(motion.img)`
  max-width: 90%;
  max-height: 90%;
  border-radius: 16px;
  cursor: default;
`;

//================================================================
// MAIN COMPONENT (Unchanged)
//================================================================
const AboutKhalesUltimate = () => {
  const { language } = useLanguage();
  const [selectedImg, setSelectedImg] = useState(null);
  const isMobile = useMediaQuery("(max-width: 900px)");

  const currentContent = content[language] || content.eng;

  const imagePositions = [
    { top: "10%", left: "10%", width: "16vw", height: "12vw" },
    { top: "15%", right: "15%", width: "16vw", height: "12vw" },
    { bottom: "20%", left: "5%", width: "16vw", height: "12vw" },
    { bottom: "10%", right: "10%", width: "16vw", height: "12vw" },
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
          style={{
            top: "20%",
            left: "5%",
            width: "150px",
            height: "150px",
          }}
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
              <img
                src={url}
                alt={`Khales Group project showcase ${
                  index + 1
                } - Architecture and interior design work`}
              />
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
              alt="Enlarged view of Khales Group project showcase"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
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
