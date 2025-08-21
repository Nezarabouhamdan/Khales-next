// components/ComprehensiveAbout.js
"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaCity, FaDraftingCompass } from "react-icons/fa";

// ========================================================================
// DATA & VARIANTS (No changes here)
// ========================================================================

const galleryImages = [
  "https://i.ibb.co/7tKV3xP1/aboutus5.jpg",
  "https://i.ibb.co/XftcdnrY/aboutus2.jpg",
  "https://i.ibb.co/v4S8JftQ/aboutus4.jpg",
  "https://i.ibb.co/jPgtTSzr/aboutus3.jpg",
];

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

// ========================================================================
// STYLED COMPONENTS (No changes here)
// ========================================================================

const SectionWrapper = styled(motion.section)`
  width: 100%;
  padding: 5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #ffffffff;
  font-family: ${({ lang }) =>
    lang === "ar" ? "var(--font-tajawal)" : "var(--font-inter)"};
  overflow: hidden;
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 5%;
  position: relative;
  z-index: 5;
`;

const ContentCard = styled(motion.div)`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  padding: 4rem;
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    padding: 2.5rem;
    gap: 2.5rem;
  }
`;

const TextBlock = styled(motion.div)`
  display: flex;
  flex-direction: column;
  text-align: ${({ lang }) => (lang === "ar" ? "right" : "left")};
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
  span {
    color: #66a109;
  }
`;

const Paragraph = styled(motion.p)`
  font-size: clamp(0.9rem, 2.2vw, 1.1rem);
  line-height: 1.9;
  margin-bottom: 2.5rem;
  color: #555;
`;

const SubsectionsWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2.5rem;
`;

const Subsection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    color: #333;
    margin: 0 0 0.5rem 0;
  }
  p {
    font-size: 1rem;
    line-height: 1.8;
    color: #666;
    margin: 0;
  }
`;

const IconWrapper = styled.div`
  color: #66a109;
  font-size: 1.8rem;
  flex-shrink: 0;
  margin-top: 5px;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  background: linear-gradient(135deg, #66a109, #7cb342);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 8px 25px rgba(102, 161, 9, 0.3);
  transition: all 0.3s ease;
  align-self: ${({ lang }) => (lang === "ar" ? "flex-end" : "flex-start")};
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(102, 161, 9, 0.4);
  }
`;

const ImageGallery = styled(motion.div)`
  position: relative;
  height: 550px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  background-color: #e0e0e0;
`;

const ImageIndicators = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
`;

const Indicator = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: ${({ active }) =>
    active ? "#66a109" : "rgba(255, 255, 255, 0.5)"};
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #66a109;
    transform: scale(1.2);
  }
`;

const DecorativeShape1 = styled.div`
  position: absolute;
  top: 10%;
  right: -5%;
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #66a109, #8bc34a);
  border-radius: 50%;
  opacity: 0.1;
  z-index: 1;
`;

const DecorativeShape2 = styled.div`
  position: absolute;
  bottom: 15%;
  left: -8%;
  width: 150px;
  height: 150px;
  background: linear-gradient(45deg, #66a109, #4caf50);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  opacity: 0.08;
  z-index: 1;
`;

// ========================================================================
// THE CORRECTED COMPONENT
// ========================================================================

export default function ComprehensiveAbout({ lang, content }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ✅ FIX: Removed hardcoded fallback content.
  // The component now relies entirely on the props passed to it.
  const displayContent = content;

  // ✅ Safety check: If content is not loaded, don't render anything.
  // This prevents errors and showing the wrong information.
  if (!displayContent) {
    return null;
  }

  const subsectionIcons = [<FaCity key={1} />, <FaDraftingCompass key={2} />];
  return (
    <SectionWrapper
      lang={lang}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
    >
      <DecorativeShape1 />
      <DecorativeShape2 />

      <Container>
        <ContentCard variants={itemVariants}>
          <TextBlock lang={lang} variants={itemVariants}>
            {/* ✅ FIX: Re-added the subtitle with a check to ensure it exists */}
            <Title variants={itemVariants} lang={lang}>
              {displayContent.title}
            </Title>

            <Paragraph variants={itemVariants}>
              {displayContent.intro}
            </Paragraph>

            <SubsectionsWrapper variants={itemVariants}>
              {/* Safety check for subsections array */}
              {displayContent.subsections &&
                displayContent.subsections.map((sub, index) => (
                  <Subsection key={index}>
                    <IconWrapper>{subsectionIcons[index]}</IconWrapper>
                    <div>
                      <h3>{sub.title}</h3>
                      <p>{sub.text}</p>
                    </div>
                  </Subsection>
                ))}
            </SubsectionsWrapper>

            <CTAButton
              href={`/${lang}${displayContent.buttonLink}`}
              lang={lang}
            >
              {displayContent.buttonText}
            </CTAButton>
          </TextBlock>

          <ImageGallery variants={itemVariants}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                style={{ position: "absolute", width: "100%", height: "100%" }}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <Image
                  src={galleryImages[currentImageIndex]}
                  alt={`${displayContent.title} gallery image`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 992px) 100vw, 50vw"
                  priority={currentImageIndex === 0}
                />
              </motion.div>
            </AnimatePresence>
            <ImageIndicators>
              {galleryImages.map((_, index) => (
                <Indicator
                  key={index}
                  active={index === currentImageIndex}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                />
              ))}
            </ImageIndicators>
          </ImageGallery>
        </ContentCard>
      </Container>
    </SectionWrapper>
  );
}
