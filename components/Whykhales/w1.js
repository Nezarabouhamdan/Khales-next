// components/WhyKhales.jsx
"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { FaArrowRight, FaHammer, FaSlidersH, FaClock } from "react-icons/fa";

//================================================================
// 1. DATA & KEYFRAME ANIMATIONS
//================================================================

const featuresData = [
  {
    icon: <FaHammer />,
    title: "Quality Craftsmanship",
    description:
      "Our unwavering commitment to excellence is evident in every detail, using premium materials and skilled artisans to build homes that last for generations.",
  },
  {
    icon: <FaSlidersH />,
    title: "Customization Options",
    description:
      "We believe your home should be a true reflection of your vision. We offer extensive customization to tailor every space to your unique lifestyle.",
  },
  {
    icon: <FaClock />,
    title: "Timely Completion",
    description:
      "With meticulous project management and transparent timelines, we ensure your new home is delivered on schedule, without compromising quality.",
  },
];

const kenBurns = keyframes`
  0% { transform: scale(1.05) translate(0, 0); }
  100% { transform: scale(1.15) translate(1%, -2%); }
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

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;
  margin: 0;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SectionDescription = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
  margin: 0;
`;

const FeaturesGrid = styled(motion.div)`
  display: grid;
  gap: 2rem;
`;

const FeatureCard = styled(motion.div)`
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  border: 1px solid rgba(102, 161, 9, 0.1);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-color: rgba(102, 161, 9, 0.3);
  }
`;

const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #66a109, #8bc34a);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
`;

const FeatureDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #666;
  margin: 0;
`;

const ImageSection = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 500px;
  @media (max-width: 992px) {
    order: -1;
    height: 400px;
  }
`;

const HeroImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("https://i.ibb.co/XftcdnrY/aboutus2.jpg");
  background-size: cover;
  background-position: center;
  animation: ${kenBurns} 20s ease-in-out infinite alternate;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(102, 161, 9, 0.2) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(135deg, #66a109, #8bc34a);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-start;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 161, 9, 0.3);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 161, 9, 0.4);
  }
`;

//================================================================
// 3. MAIN COMPONENT
//================================================================
const WhyKhales = () => {
  return (
    <SectionContainer>
      <ContentWrapper>
        <TextSection>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Choose Khales?
          </SectionTitle>

          <SectionDescription
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We believe your home should be a true reflection of your vision,
            tailored to your lifestyle and built to the highest standards. Our
            commitment to excellence, innovation, and customer satisfaction sets
            us apart in the industry.
          </SectionDescription>

          <FeaturesGrid
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {featuresData.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureContent>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureContent>
              </FeatureCard>
            ))}
          </FeaturesGrid>

          <CTAButton
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More About Us
            <FaArrowRight />
          </CTAButton>
        </TextSection>

        <ImageSection>
          <HeroImage />
          <ImageOverlay />
        </ImageSection>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default WhyKhales;
