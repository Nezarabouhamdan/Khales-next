"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { motion } from "framer-motion";

// --- STYLED COMPONENTS (Your original code, with RTL direction added) ---

const Section = styled.section`
  width: 100%;
  padding: 6rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const CTAContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 900px;
  padding: 5rem;
  border-radius: 16px;
  color: #fff;
  text-align: center;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  /* This is now language-aware */
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};

  background: linear-gradient(90deg, #414141ff, #4a7c07, #66a109);
  background-size: 200% 200%;
  animation: gradientAnimation 10s ease infinite;

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 3.5rem 2rem;
  }
`;

const Heading = styled.h2`
  font-size: clamp(2.2rem, 5vw, 3rem);
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const Paragraph = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.15rem);
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
`;

const StyledCTAButton = styled(Link)`
  display: inline-block;
  background: rgba(255, 255, 255, 0.95);
  color: #1a1a1a;
  padding: 1rem 3rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    background: #fff;
    transform: scale(1.05);
    color: #111;
  }
`;

// --- ANIMATION VARIANTS (Unchanged) ---
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// --- MAIN COMPONENT (Corrected Logic) ---
export default function CTASection({ lang, content }) {
  // Robust check to prevent errors
  if (!content || !content.heading || !content.buttonText) {
    return null;
  }

  return (
    <Section>
      <CTAContainer
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={cardVariants}
        lang={lang} // Pass lang prop for styling
      >
        <Heading>{content.heading}</Heading>
        {/* Use the new 'subheading' from the dictionary */}
        <Paragraph>{content.subheading}</Paragraph>
        <StyledCTAButton href={`/${lang}/Contact`}>
          {content.buttonText}
        </StyledCTAButton>
      </CTAContainer>
    </Section>
  );
}
