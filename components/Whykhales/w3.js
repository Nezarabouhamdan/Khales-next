// components/Whykhales/w3.js
"use client";

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaHammer, FaSlidersH, FaClock, FaHome } from "react-icons/fa";

const featureAssets = [
  {
    icon: <FaHammer />,
    imageUrl: "https://i.ibb.co/n80MKYz4/Quality-you-can-measure.jpg",
  },
  {
    icon: <FaSlidersH />,
    imageUrl: "https://i.ibb.co/s95K2LPZ/Design-with-Purpose.jpg",
  },
  {
    icon: <FaClock />,
    imageUrl: "https://i.ibb.co/x8jx7JPG/Clear-Process-Reliable-Delivery.jpg",
  },
];

// --- STYLED COMPONENTS (WITH LAYOUT FIX) ---
const kenBurns = keyframes`
  0% { transform: scale(1.0); }
  100% { transform: scale(1.1); }
`;
const SectionContainer = styled.section`
  width: 100%;
  padding: 6rem 0; /* Vertical padding only */
  background-color: #ffffff;
  position: relative;
  overflow: hidden; /* CRITICAL: This contains the decorative shapes */
  font-family: "Inter", sans-serif;
  direction: ${(props) => (props.dir === "rtl" ? "rtl" : "ltr")};
  @media (max-width: 992px) {
    padding: 4rem 0;
  }
`;
const ContentWrapper = styled(motion.div)`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem; /* Horizontal padding is now contained */
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  @media (max-width: 992px) {
    padding: 0 1.5rem;
  }
`;
const Header = styled.div`
  text-align: center;
`;
const Label = styled.p`
  color: #66a109;
  font-weight: 600;
  margin-bottom: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex-direction: ${(props) => (props.dir === "rtl" ? "row-reverse" : "row")};
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
const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;
const FeatureCard = styled(motion.div)`
  text-align: ${(props) => (props.dir === "rtl" ? "right" : "left")};
  padding: 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  border: 1px solid #e9ecef;
  background-color: #ffffff;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover,
  &.active {
    transform: translateY(-8px);
    border-color: #66a109;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
  }
`;
const IconWrapper = styled.div`
  font-size: 1.5rem;
  color: #66a109;
  margin-bottom: 1rem;
`;
const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;
const FeatureDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: #555;
`;
const ImageShowcase = styled(motion.div)`
  width: 100%;
  height: 500px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
`;
const ShowcaseImage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.imageUrl});
  animation: ${kenBurns} 20s ease-in-out infinite alternate;
`;
const ImageCaption = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  color: white;
  z-index: 2;
  text-align: ${(props) => (props.dir === "rtl" ? "right" : "left")};

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
    max-width: 500px;
  }
`;
const DecorativeShape = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  transition: transform 0.4s ease-out;
`;

// --- MAIN REFACTORED COMPONENT ---
export default function WhyKhalesHybrid({ lang, content }) {
  if (
    !content ||
    !Array.isArray(content.features) ||
    content.features.length === 0
  ) {
    return null;
  }

  const [activeFeatureIndex, setActiveFeatureIndex] = useState(1);
  const activeFeature = content.features[activeFeatureIndex];
  const activeFeatureAsset = featureAssets[activeFeatureIndex];

  const isRTL = lang === "ar";

  useEffect(() => {
    setActiveFeatureIndex(1);
  }, [lang]);

  if (!activeFeature || !activeFeatureAsset) {
    return null;
  }

  return (
    <SectionContainer dir={isRTL ? "rtl" : "ltr"}>
      <DecorativeShape
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
        style={{
          bottom: "10%",
          right: "5%",
          width: "80px",
          height: "80px",
          border: "1px solid rgba(102, 161, 9, 0.15)",
        }}
      />
      <ContentWrapper
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div>
          <Header>
            <Label dir={isRTL ? "rtl" : "ltr"}>
              <FaHome />
              <span>{content.label}</span>
            </Label>
            <MainTitle>{content.title}</MainTitle>
          </Header>
        </motion.div>

        <motion.div key={lang} style={{ width: "100%" }}>
          <FeaturesGrid>
            {content.features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                dir={isRTL ? "rtl" : "ltr"}
                className={activeFeatureIndex === index ? "active" : ""}
                onMouseEnter={() => setActiveFeatureIndex(index)}
              >
                <IconWrapper>{featureAssets[index]?.icon}</IconWrapper>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </motion.div>

        <ImageShowcase>
          <AnimatePresence mode="wait">
            <ShowcaseImage
              key={activeFeatureAsset.imageUrl}
              imageUrl={activeFeatureAsset.imageUrl}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <ImageCaption
              key={activeFeature.title}
              dir={isRTL ? "rtl" : "ltr"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h3>{activeFeature.title}</h3>
              <p>{activeFeature.description}</p>
            </ImageCaption>
          </AnimatePresence>
        </ImageShowcase>
      </ContentWrapper>
    </SectionContainer>
  );
}
