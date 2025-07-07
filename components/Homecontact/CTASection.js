// components/CTASection.js
// --- ENHANCED STYLES APPLIED TO YOUR WORKING CODE ---

"use client";

import React, { useRef } from "react";
import styled from "styled-components";
import { CTAButton } from "./CTAButton";
import { useLanguage } from "../../Context/Languagecontext";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

// This is your original, working import statement.
import img from "../../public/assets/Porjects/1f5a52c5-139a-4684-a5ee-44d694eb301a.jpeg";

// --- Framer Motion Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// --- Styled Component Definitions (Updated) ---

const Section = styled(motion.section)`
  position: relative;
  width: 100%;
  height: 70vh;
  min-height: 500px;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-color: #1a1a1a;
`;

const BackgroundContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 110%; /* Taller to allow for parallax scroll */
  z-index: 1;

  /* Ken Burns Effect */
  animation: kenBurns 40s ease-in-out infinite alternate;
  @keyframes kenBurns {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.1);
    }
  }
`;

const BackgroundImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(26, 26, 26, 0.5);
  z-index: 2;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 4rem;
  display: flex;
  flex-direction: column;

  /* RTL Support */
  align-items: ${({ $rtl }) => ($rtl ? "flex-end" : "flex-start")};
  text-align: ${({ $rtl }) => ($rtl ? "right" : "left")};

  @media (max-width: 991px) {
    padding: 0 2rem;
  }
  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const Heading = styled(motion.h2)`
  font-size: 3.5rem;
  font-family: "Playfair Display", serif;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  max-width: 600px;
  margin-bottom: 2rem;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);

  @media (max-width: 991px) {
    font-size: 2.8rem;
  }
  @media (max-width: 768px) {
    font-size: 2.2rem;
    max-width: 100%;
  }
`;

// --- Main Component (Your original logic with new styled-components) ---

export default function CTASection() {
  const { language } = useLanguage();
  const isRTL = language === "ar";
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const content = {
    eng: {
      heading: "Looking for expert solutions? Let’s talk!",
      buttonText: "Book Your Consultation",
    },
    ar: {
      heading: "تبحث عن حلول خبراء؟ لنتحدث",
      buttonText: "احجز استشارتك",
    },
  };

  const currentContent = content[language] || content.eng;

  return (
    <Section
      ref={sectionRef}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <BackgroundContainer style={{ y: backgroundY }}>
        <BackgroundImage
          src={img} // Your working import
          alt="Luxury resort patio with palm trees"
          fill
          priority
        />
      </BackgroundContainer>

      <Overlay />

      <ContentWrapper $rtl={isRTL}>
        <Heading variants={itemVariants}>{currentContent.heading}</Heading>
        {/* We wrap the button in a motion.div to animate it */}
        <motion.div variants={itemVariants}>
          <CTAButton>{currentContent.buttonText}</CTAButton>
        </motion.div>
      </ContentWrapper>
    </Section>
  );
}
