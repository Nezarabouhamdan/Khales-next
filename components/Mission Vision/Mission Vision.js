"use client";

import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { FaStar, FaCheck } from "react-icons/fa";
import Image from "next/image";
import ImageWithSkeleton from "../ImageSkeleton";

// Main section container
const SectionWrapper = styled.section`
  width: 100%;
  padding: 100px 70px;
  background-color: #ffffff;
  font-family: "Inter", sans-serif;
  overflow: hidden;
  direction: ${(props) => props.dir};

  @media (max-width: 991px) {
    padding: 60px 20px;
  }
`;

// --- MODIFIED ---
// Centered content container now reverses grid based on direction
const Container = styled.div`
  max-width: 1450px;
  margin: 0 auto;
  display: grid;
  /* 
    This is the key change:
    - LTR (English): Image (1fr) on the left, Text (1.1fr) on the right.
    - RTL (Arabic): Text (1.1fr) on the left, Image (1fr) on the right.
  */
  grid-template-columns: ${(props) =>
    props.dir === "rtl" ? "1.1fr 1fr" : "1fr 1.1fr"};
  gap: 5rem;
  align-items: center;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

// Column for the image
const ImageColumn = styled(motion.div)`
  width: 100%;
  height: 100%;
  min-height: 500px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);

  @media (max-width: 991px) {
    min-height: 350px;
    margin-bottom: 2rem;
    /* For mobile, ensure the image is always first */
    order: -1;
  }
`;

// Column for Mission and Vision text content
const ContentColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

// Card for individual Mission/Vision item
const InfoCard = styled.div`
  width: 100%;
  text-align: ${(props) => (props.dir === "rtl" ? "right" : "left")};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  justify-content: ${(props) =>
    props.dir === "rtl" ? "flex-start" : "flex-start"};
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f7e6;
  color: #66a109;
  font-size: 1.25rem;
  flex-shrink: 0;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: #495057;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: ${(props) =>
    props.dir === "rtl" ? "flex-start" : "flex-start"};
`;

const Tag = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  background-color: #f8f9fa;
  color: #343a40;
  border: 1px solid #dee2e6;
  cursor: default;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: #66a109;
  }
`;

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function MissionVision({ lang, content }) {
  const isRTL = lang === "ar";
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  if (!content) {
    return null; // Don't render if content is not available
  }

  // Define the content and image columns to avoid repetition
  const ImageComponent = (
    <ImageColumn variants={itemVariants}>
      <ImageWithSkeleton
        src="https://i.ibb.co/GvtDkZf9/Whats-App-Image-2025-09-09-at-09-40-04-d696481f.jpg"
        alt="Architectural planning and design"
        layout="fill"
        objectFit="cover"
      />
    </ImageColumn>
  );

  const ContentComponent = (
    <ContentColumn variants={itemVariants}>
      <InfoCard dir={isRTL ? "rtl" : "ltr"}>
        <Header dir={isRTL ? "rtl" : "ltr"}>
          <IconWrapper>
            <FaStar />
          </IconWrapper>
          <Title>{content.mission.title}</Title>
        </Header>
        <Description>{content.mission.description}</Description>
        <TagsContainer dir={isRTL ? "rtl" : "ltr"}>
          {content.mission.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagsContainer>
      </InfoCard>
      <InfoCard dir={isRTL ? "rtl" : "ltr"}>
        <Header dir={isRTL ? "rtl" : "ltr"}>
          <IconWrapper>
            <FaCheck />
          </IconWrapper>
          <Title>{content.vision.title}</Title>
        </Header>
        <Description>{content.vision.description}</Description>
        <TagsContainer dir={isRTL ? "rtl" : "ltr"}>
          {content.vision.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagsContainer>
      </InfoCard>
    </ContentColumn>
  );

  return (
    <SectionWrapper ref={sectionRef} dir={isRTL ? "rtl" : "ltr"}>
      <Container
        dir={isRTL ? "rtl" : "ltr"} // Pass direction prop to styled-component
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* --- MODIFIED --- */}
        {/* Conditionally render the order of components */}
        {isRTL ? (
          <>
            {ContentComponent}
            {ImageComponent}
          </>
        ) : (
          <>
            {ImageComponent}
            {ContentComponent}
          </>
        )}
      </Container>
    </SectionWrapper>
  );
}
