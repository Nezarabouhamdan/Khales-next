// components/InteriorDesign/InteriorDesign.js
// --- CORRECTED WITH FULL RTL SUPPORT FOR TEXT AND DECORATIONS ---

"use client";

import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { useLanguage } from "../../Context/Languagecontext";

// --- Parallax Shape Component (Signature Atmosphere) ---
const DecorativeShape = ({ initialX, initialY, size, stiffness, rtl }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Determine the correct horizontal position based on RTL state
  const finalX = rtl ? `calc(100% - ${initialX} - ${size})` : initialX;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) / (width / 2);
      const y = (clientY - (top + height / 2)) / (height / 2);
      setPosition({ x: x * stiffness, y: y * stiffness });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [stiffness]);

  return (
    <motion.div
      ref={ref}
      style={{
        position: "absolute",
        top: initialY,
        left: finalX, // Use the RTL-aware position
        width: size,
        height: size,
        backgroundColor: "rgba(102, 161, 9, 0.05)",
        borderRadius: "50%",
        zIndex: 0,
        x: position.x,
        y: position.y,
        transition: { type: "spring", stiffness: 200, damping: 30 },
      }}
    />
  );
};

// --- Main Component ---
const InteriorDesign = ({ data }) => {
  const { language } = useLanguage();
  const rtl = language === "ar";

  if (!data || !data.length) return null;
  const content = data[0];

  return (
    <SectionWrapper
      $rtl={rtl}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ show: { transition: { staggerChildren: 0.2 } } }}
    >
      {/* Pass the RTL prop to the decorative shapes */}
      <DecorativeShape
        initialX="80%"
        initialY="10%"
        size="400px"
        stiffness={15}
        rtl={rtl}
      />
      <DecorativeShape
        initialX="5%"
        initialY="60%"
        size="300px"
        stiffness={10}
        rtl={rtl}
      />

      <TextColumn
        $rtl={rtl}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.15 } },
        }}
      >
        <Title $rtl={rtl} variants={itemVariants}>
          {content.title} {content.subtitle}
        </Title>
        <Description $rtl={rtl} variants={itemVariants}>
          {content.description1}
        </Description>
        <Description $rtl={rtl} variants={itemVariants}>
          {content.description2}
        </Description>
      </TextColumn>

      {content.images && content.images.length >= 2 && (
        <ImageColumn
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.3 },
            },
          }}
        >
          <ImageWrapper $rtl={rtl} $isFirst variants={itemVariants}>
            <StyledImage
              src={content.images[0]}
              alt={`${content.title} illustration 1`}
            />
          </ImageWrapper>
          <ImageWrapper $rtl={rtl} $isFirst={false} variants={itemVariants}>
            <StyledImage
              src={content.images[1]}
              alt={`${content.title} illustration 2`}
            />
          </ImageWrapper>
        </ImageColumn>
      )}
    </SectionWrapper>
  );
};

// --- Framer Motion Variants ---
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// --- Styled Components ---

const SectionWrapper = styled(motion.section)`
  max-width: 1218px;
  margin: 0 auto;
  padding: 100px 24px;
  position: relative;
  display: flex;
  gap: 5rem;
  flex-direction: ${({ $rtl }) => ($rtl ? "row-reverse" : "row")};
  overflow: hidden;

  @media (max-width: 991px) {
    flex-direction: column;
    padding: 80px 20px;
    gap: 3rem;
  }
`;

const TextColumn = styled(motion.div)`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  /* FIX: Align items to the end (right) in RTL mode */
  align-items: ${({ $rtl }) => ($rtl ? "flex-end" : "flex-start")};
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
  /* FIX: Align text to the right in RTL mode */
  text-align: ${({ $rtl }) => ($rtl ? "right" : "left")};

  @media (max-width: 991px) {
    font-size: 2.5rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: #545454;
  line-height: 1.8;
  max-width: 580px;
  /* FIX: Align text to the right in RTL mode */
  text-align: ${({ $rtl }) => ($rtl ? "right" : "left")};

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const ImageColumn = styled(motion.div)`
  flex: 1;
  position: relative;
  min-height: 500px;

  @media (max-width: 991px) {
    min-height: auto;
    display: flex;
    gap: 1.5rem;
  }
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled(motion.div)`
  position: absolute;
  width: 70%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 4px solid white;

  ${({ $isFirst, $rtl }) =>
    $isFirst
      ? css`
          top: 0;
          ${$rtl ? "left: 0;" : "right: 0;"}
          z-index: 2;
        `
      : css`
          bottom: 0;
          ${$rtl ? "right: 0;" : "left: 0;"}
          z-index: 1;
          width: 80%;
        `}

  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 991px) {
    position: relative;
    width: 50%;
    top: auto;
    bottom: auto;
    left: auto;
    right: auto;
  }
  @media (max-width: 640px) {
    width: 100%;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export default InteriorDesign;
