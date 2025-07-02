// components/ServicesSection.jsx
"use client";

import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import {
  FaArrowRight,
  FaDraftingCompass,
  FaRegLightbulb,
  FaShieldAlt,
} from "react-icons/fa";
import { GiGears } from "react-icons/gi";

//================================================================
// 1. STYLED COMPONENTS (with new color #66a109)
//================================================================

const ServicesContainer = styled(motion.section)`
  width: 100%;
  padding: 6rem 2rem;
  background-color: #ffffff;
  color: #1a1a1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
  font-family: "Inter", sans-serif;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
    gap: 4rem;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2; /* Ensures content is above the parallax shapes */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
`;

const DecorativeShape = styled(motion.div)`
  position: absolute;
  z-index: 1; /* Behind the content */
  pointer-events: none;
  transition: transform 0.4s ease-out; /* Smooth transition for parallax */
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  max-width: 800px;
`;

const MainTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #121212;

  span {
    position: relative;
    display: inline-block;
    color: #66a109; /* <-- NEW COLOR */
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const TitleHighlight = styled(motion.div)`
  position: absolute;
  bottom: -5px;
  left: -10%;
  width: 120%;
  height: 50%;
  background-color: rgba(102, 161, 9, 0.25); /* <-- NEW COLOR with alpha */
  border-radius: 50%;
  z-index: -1;
  transform-origin: center;
`;

const IntroText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  max-width: 600px;
  margin: 0 auto;

  span {
    color: #66a109; /* <-- NEW COLOR */
    font-weight: 500;
  }
`;

const ServiceBlock = styled(motion.div)`
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const ServiceHeader = styled(motion.div)`
  text-align: left;
`;

const ServiceTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;

  span {
    color: #66a109; /* <-- NEW COLOR */
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #666;
  max-width: 700px;
`;

const ShowcaseCard = styled(motion.div)`
  background-color: #1c1c1c;
  color: #fff;
  border-radius: 20px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  min-height: 250px;

  h3 {
    font-size: 2rem;
    color: #66a109; /* <-- NEW COLOR */
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: #ccc;
    max-width: 80%;
  }

  &::before {
    content: "★";
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.1);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  padding: 2rem;
  border-radius: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  h4 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    line-height: 1.6;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const LightFeatureCard = styled(FeatureCard)`
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  color: #1a1a1a;
`;

const DarkFeatureCard = styled(FeatureCard)`
  background-color: #1c1c1c;
  color: #fff;

  h4 {
    color: #66a109; /* <-- NEW COLOR */
  }
  p {
    color: #ccc;
  }
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  color: #66a109; /* <-- NEW COLOR */
  margin-bottom: 1rem;
`;

const ExploreLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: #66a109; /* <-- NEW COLOR */
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  position: relative;

  span {
    transition: transform 0.3s ease;
  }

  &:hover span {
    transform: translateX(5px);
  }
`;

//================================================================
// 2. FRAMER MOTION VARIANTS
//================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardHover = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 300, damping: 15 },
};

//================================================================
// 3. THE MAIN COMPONENT
//================================================================

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const handleMouseMove = (e) => {
    const { currentTarget } = e;
    const shapes = currentTarget.querySelectorAll(".shape");
    const rect = currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    shapes.forEach((shape) => {
      const factor = shape.getAttribute("data-factor") || 20;
      shape.style.transform = `translate(${x / factor}px, ${y / factor}px)`;
    });
  };

  const handleMouseLeave = (e) => {
    const shapes = e.currentTarget.querySelectorAll(".shape");
    shapes.forEach((shape) => {
      shape.style.transform = `translate(0px, 0px)`;
    });
  };

  return (
    <ServicesContainer
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Parallax Shapes Layer */}
      <DecorativeShape
        className="shape"
        data-factor="25"
        style={{
          top: "5%",
          left: "10%",
          width: "80px",
          height: "80px",
          background: "rgba(102, 161, 9, 0.15)",
          borderRadius: "50%",
        }}
      />
      <DecorativeShape
        className="shape"
        data-factor="-15"
        style={{
          top: "15%",
          right: "15%",
          width: "40px",
          height: "40px",
          background: "#e9ecef",
          borderRadius: "10px",
        }}
      />
      <DecorativeShape
        className="shape"
        data-factor="20"
        style={{
          top: "40%",
          left: "5%",
          width: "60px",
          height: "60px",
          border: "2px solid rgba(102, 161, 9, 0.2)",
        }}
      />
      <DecorativeShape
        className="shape"
        data-factor="-30"
        style={{
          top: "60%",
          right: "5%",
          width: "100px",
          height: "100px",
          background: "rgba(102, 161, 9, 0.1)",
          borderRadius: "50%",
        }}
      />
      <DecorativeShape
        className="shape"
        data-factor="15"
        style={{
          top: "85%",
          left: "15%",
          width: "50px",
          height: "50px",
          background: "#66a109",
          borderRadius: "10px",
        }}
      />

      <ContentWrapper>
        <SectionHeader variants={itemVariants}>
          <MainTitle>
            Our{" "}
            <span>
              Services
              {isInView && (
                <TitleHighlight
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: "circOut" }}
                />
              )}
            </span>
          </MainTitle>
          <IntroText>
            Transforming visionary concepts into extraordinary realities with
            precision engineering, <span>strategic excellence</span>, and
            innovative solutions that define the future of enterprise success.
          </IntroText>
        </SectionHeader>

        <ServiceBlock variants={containerVariants}>
          <ServiceHeader variants={itemVariants}>
            <ServiceTitle>
              Engineering <span>Consultancy</span>
            </ServiceTitle>
            <ServiceDescription>
              Pioneering the next generation of advanced engineering solutions
              with robust methodologies that redefine industry standards.
            </ServiceDescription>
          </ServiceHeader>
          <ShowcaseCard variants={itemVariants} whileHover={cardHover}>
            <h3>Advanced Engineering Systems</h3>
            <p>
              We leverage cutting-edge technology and expertise to build systems
              that are efficient, scalable, and resilient.
            </p>
          </ShowcaseCard>
          <FeaturesGrid>
            <LightFeatureCard variants={itemVariants} whileHover={cardHover}>
              <FeatureIcon>
                <GiGears />
              </FeatureIcon>
              <h4>Structural Innovation</h4>
              <p>
                Advanced computational modeling and revolutionary stress
                analysis methodologies.
              </p>
            </LightFeatureCard>
            <LightFeatureCard variants={itemVariants} whileHover={cardHover}>
              <FeatureIcon>
                <FaShieldAlt />
              </FeatureIcon>
              <h4>Quality Excellence</h4>
              <p>
                Rigorous testing protocols and comprehensive compliance
                verification systems.
              </p>
            </LightFeatureCard>
          </FeaturesGrid>
          <ExploreLink variants={itemVariants}>
            Explore Engineering Solutions{" "}
            <span>
              <FaArrowRight />
            </span>
          </ExploreLink>
        </ServiceBlock>

        <ServiceBlock variants={containerVariants}>
          <ServiceHeader variants={itemVariants}>
            <ServiceTitle>
              Project <span>Management</span>
            </ServiceTitle>
            <ServiceDescription>
              Our comprehensive methodology ensures seamless execution from
              visionary conception to exceptional delivery for complex
              enterprise applications.
            </ServiceDescription>
          </ServiceHeader>
          <FeaturesGrid>
            <DarkFeatureCard variants={itemVariants} whileHover={cardHover}>
              <FeatureIcon>
                <FaDraftingCompass />
              </FeatureIcon>
              <h4>Resource Optimization</h4>
              <p>
                Intelligent allocation and management of resources to maximize
                efficiency and minimize waste.
              </p>
            </DarkFeatureCard>
            <DarkFeatureCard variants={itemVariants} whileHover={cardHover}>
              <FeatureIcon>
                <FaRegLightbulb />
              </FeatureIcon>
              <h4>Risk Intelligence</h4>
              <p>
                Proactive identification, assessment, and mitigation of project
                risks through data-driven insights.
              </p>
            </DarkFeatureCard>
          </FeaturesGrid>
          <ShowcaseCard variants={itemVariants} whileHover={cardHover}>
            <h3>Project Management Dashboard</h3>
            <p>
              Gain real-time insights and full control over your project
              lifecycle with our integrated dashboard solution.
            </p>
          </ShowcaseCard>
          <ExploreLink variants={itemVariants}>
            Discover Project Excellence{" "}
            <span>
              <FaArrowRight />
            </span>
          </ExploreLink>
        </ServiceBlock>
      </ContentWrapper>
    </ServicesContainer>
  );
};

export default ServicesSection;
