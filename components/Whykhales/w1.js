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
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const Header = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const TitleBlock = styled.div`
  max-width: 600px;
`;

const Label = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #66a109;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const MainTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;
  @media (max-width: 992px) {
    font-size: 2.8rem;
  }
`;

const ExploreButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #66a109;
  color: white;
  padding: 1rem 1.75rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;

  .arrow {
    transition: transform 0.3s ease;
  }

  &:hover {
    box-shadow: 0 10px 20px rgba(102, 161, 9, 0.3);
    transform: translateY(-3px);
    .arrow {
      transform: translateX(5px);
    }
  }
`;

const FeaturesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  border-top: 1px solid #e9ecef;
  padding-top: 3rem;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
  transition: transform 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    background-color: #f8f9fa;
    .icon-wrapper {
      transform: scale(1.1);
      background-color: #66a109;
      color: white;
    }
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background-color: #f0f0f0;
  color: #1a1a1a;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  flex-shrink: 0;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
`;

const FeatureDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: #555;
`;

const ImageWrapper = styled(motion.div)`
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: ${kenBurns} 15s ease-in-out infinite alternate;
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
const WhyKhales = () => {
  const handleMouseMove = (e) => {
    const shapes = e.currentTarget.querySelectorAll(".shape");
    shapes.forEach((shape) => {
      const factor = parseInt(shape.getAttribute("data-factor")) || 20;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / factor;
      const y = (e.clientY - rect.top - rect.height / 2) / factor;
      shape.style.transform = `translate(${x}px, ${y}px)`;
    });
  };
  const handleMouseLeave = (e) => {
    const shapes = e.currentTarget.querySelectorAll(".shape");
    shapes.forEach((shape) => {
      shape.style.transform = `translate(0px, 0px)`;
    });
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <SectionContainer
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <DecorativeShape
        className="shape"
        data-factor="25"
        style={{
          top: "20%",
          left: "5%",
          width: "60px",
          height: "60px",
          background: "rgba(102, 161, 9, 0.05)",
          borderRadius: "50%",
        }}
      />
      <DecorativeShape
        className="shape"
        data-factor="-15"
        style={{
          top: "60%",
          right: "5%",
          width: "100px",
          height: "100px",
          border: "1px solid rgba(102, 161, 9, 0.1)",
        }}
      />

      <ContentWrapper>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Header>
            <TitleBlock>
              <motion.div variants={itemVariants}>
                <Label>
                  <FaHammer />
                  Why Khales
                </Label>
              </motion.div>
              <motion.div variants={itemVariants}>
                <MainTitle>Elevating Home Construction Standards</MainTitle>
              </motion.div>
            </TitleBlock>
            <motion.div variants={itemVariants}>
              <ExploreButton href="#">
                Explore More{" "}
                <span className="arrow">
                  <FaArrowRight />
                </span>
              </ExploreButton>
            </motion.div>
          </Header>
        </motion.div>

        <FeaturesGrid
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} variants={itemVariants}>
              <IconWrapper className="icon-wrapper">{feature.icon}</IconWrapper>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>

        <ImageWrapper
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80"
            alt="Luxurious modern living room"
          />
        </ImageWrapper>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default WhyKhales;
