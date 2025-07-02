// components/WhyKhalesHybrid.jsx
"use client";

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaHammer, FaSlidersH, FaClock, FaHome } from "react-icons/fa";

//================================================================
// 1. DATA & KEYFRAME ANIMATIONS
//================================================================

const featuresData = [
  {
    icon: <FaHammer />,
    title: "Quality Craftsmanship",
    description:
      "Our commitment to excellence is evident in every detail, using premium materials and skilled artisans.",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80",
  },
  {
    icon: <FaSlidersH />,
    title: "Visionary Customization",
    description:
      "We believe your home should be a true reflection of your vision, tailoring every space to your unique lifestyle.",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
  },
  {
    icon: <FaClock />,
    title: "Transparent Timelines",
    description:
      "With meticulous project management, we ensure your new home is delivered on schedule, without compromising quality.",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80",
  },
];

const kenBurns = keyframes`
  0% { transform: scale(1.0); }
  100% { transform: scale(1.1); }
`;

//================================================================
// 2. STYLED COMPONENTS
//================================================================
const SectionContainer = styled.section`
  width: 100%;
  padding: 6rem 2rem;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  font-family: "Inter", sans-serif;
  @media (max-width: 992px) {
    padding: 4rem 1.5rem;
  }
`;

const ContentWrapper = styled(motion.div)`
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const Header = styled.div`
  text-align: center;
`;

const Label = styled.p`
  color: #66a109;
  font-weight: 600;
  margin-bottom: 0.75rem;
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
  text-align: left;
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

//================================================================
// 3. MAIN COMPONENT
//================================================================
const WhyKhalesHybrid = () => {
  // Default to showing the middle feature on load
  const [activeFeature, setActiveFeature] = useState(featuresData[1]);

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
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Header>
            <Label>
              <FaHome /> Why Choose Khales
            </Label>
            <MainTitle>Building Beyond a Blueprint</MainTitle>
          </Header>
        </motion.div>

        <FeaturesGrid>
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              className={activeFeature.title === feature.title ? "active" : ""}
              onMouseEnter={() => setActiveFeature(feature)}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <IconWrapper>{feature.icon}</IconWrapper>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>

        <ImageShowcase>
          <AnimatePresence>
            <ShowcaseImage
              key={activeFeature.imageUrl}
              imageUrl={activeFeature.imageUrl}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "circOut" }}
            />
          </AnimatePresence>
          <AnimatePresence>
            <ImageCaption
              key={activeFeature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3>{activeFeature.title}</h3>
              <p>{activeFeature.description}</p>
            </ImageCaption>
          </AnimatePresence>
        </ImageShowcase>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default WhyKhalesHybrid;
