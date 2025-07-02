// components/WhyKhalesSplit.jsx
"use client";

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaHome } from "react-icons/fa";

//================================================================
// 1. DATA & KEYFRAME ANIMATIONS
//================================================================

const featuresData = [
  {
    title: "Uncompromising Quality",
    description:
      "From foundation to finish, we use only premium materials and master artisans to ensure your home is a benchmark of durability and excellence.",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80",
  },
  {
    title: "Visionary Customization",
    description:
      "Your lifestyle is unique; your home should be too. We collaborate closely with you to create bespoke spaces that are a perfect reflection of your vision.",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
  },
  {
    title: "Transparent Timelines",
    description:
      "Through meticulous planning and clear communication, we navigate the complexities of construction to deliver your exceptional home on schedule.",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80",
  },
];

const kenBurns = keyframes`
  0% { transform: scale(1.0) translate(0, 0); }
  100% { transform: scale(1.1) translate(-1%, 2%); }
`;

//================================================================
// 2. STYLED COMPONENTS (No changes here)
//================================================================
const SectionContainer = styled.section`
  width: 100%;
  padding: 6rem 2rem;
  background-color: #f8f9fa;
  position: relative;
  overflow: hidden;
  font-family: "Inter", sans-serif;
  @media (max-width: 992px) {
    padding: 4rem 1.5rem;
  }
`;

const ContentWrapper = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Header = styled.div`
  max-width: 700px;
  margin: 0 auto 3rem auto;
  text-align: center;
`;

const Label = styled.p`
  color: #66a109;
  font-size: 2.2rem;

  font-weight: 600;
  margin-bottom: 1rem;
`;

const MainTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const SplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 4rem;
  align-items: center;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AccordionColumn = styled.div`
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
`;

const AccordionItem = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
  }
`;

const AccordionHeader = styled(motion.header)`
  padding: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    transition: color 0.3s ease;
    color: #333;
  }

  &.active h2 {
    color: #66a109;
  }
`;

const AccordionIcon = styled(motion.div)`
  font-size: 1.25rem;
  flex-shrink: 0;
  color: #888;
`;

const AccordionContent = styled(motion.section)`
  padding: 0 1.5rem 1.5rem 1.5rem;
  overflow: hidden;

  p {
    max-width: 600px;
    line-height: 1.7;
    color: #555;
  }
`;

const ImageColumn = styled.div`
  height: 600px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  @media (max-width: 992px) {
    height: 400px;
    order: -1;
  }
`;

const BackgroundImage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  animation: ${kenBurns} 20s ease-in-out infinite alternate;
`;

const DecorativeShape = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  transition: transform 0.4s ease-out;
`;

//================================================================
// 3. MAIN COMPONENT
//================================================================
const Accordion = ({ i, expanded, setExpanded, feature }) => {
  const isOpen = i === expanded;
  return (
    <AccordionItem>
      <AccordionHeader
        className={isOpen ? "active" : ""}
        onClick={() => setExpanded(i)}
      >
        <h2>{feature.title}</h2>
        <AccordionIcon
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaPlus />
        </AccordionIcon>
      </AccordionHeader>
      <AnimatePresence initial={false}>
        {isOpen && (
          <AccordionContent
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <p>{feature.description}</p>
          </AccordionContent>
        )}
      </AnimatePresence>
    </AccordionItem>
  );
};

const WhyKhalesSplit = () => {
  const [expanded, setExpanded] = useState(0);

  return (
    <SectionContainer>
      <DecorativeShape
        className="shape"
        data-factor="30"
        style={{
          top: "10%",
          left: "5%",
          width: "50px",
          height: "50px",
          background: "rgba(102, 161, 9, 0.1)",
          borderRadius: "50%",
        }}
      />
      <DecorativeShape
        className="shape"
        data-factor="-20"
        style={{
          bottom: "10%",
          right: "5%",
          width: "80px",
          height: "80px",
          border: "1px solid rgba(102, 161, 9, 0.15)",
        }}
      />

      <ContentWrapper
        as={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Header>
          {/* FIX: The text is now corrected! */}
          <Label>
            <FaHome /> Why Choose Khales
          </Label>
          <MainTitle>Elevating Home Construction Standards</MainTitle>
        </Header>
        <SplitGrid>
          <AccordionColumn>
            {featuresData.map((feature, i) => (
              <Accordion
                key={i}
                i={i}
                expanded={expanded}
                setExpanded={setExpanded}
                feature={feature}
              />
            ))}
          </AccordionColumn>
          <ImageColumn>
            <AnimatePresence>
              <BackgroundImage
                key={featuresData[expanded].imageUrl}
                imageUrl={featuresData[expanded].imageUrl}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "circOut" }}
              />
            </AnimatePresence>
          </ImageColumn>
        </SplitGrid>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default WhyKhalesSplit;
