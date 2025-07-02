// components/MissionVision.jsx
"use client"; // Add this line if you are using Next.js 13+ App Router

import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { FaStar, FaCheck } from "react-icons/fa";
import { BsFillLightningFill } from "react-icons/bs";

//================================================================
// 1. STYLED COMPONENTS (with new color #66a109)
//================================================================

const SectionWrapper = styled.section`
  display: flex;
  width: 100%;
  min-height: 100vh;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  overflow: hidden;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const Column = styled(motion.div)`
  flex: 1;
  padding: 6rem 4rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1200px) {
    padding: 5rem 3rem;
  }
  @media (max-width: 992px) {
    padding: 5rem 2rem;
    min-height: 80vh;
  }
`;

const MissionColumn = styled(Column)`
  background-color: #f8f9fa;
  color: #1a1a1a;
`;

const VisionColumn = styled(Column)`
  background-color: #121212;
  color: #ffffff;
`;

const ContentWrapper = styled.div`
  max-width: 500px;
  z-index: 2;
  position: relative;
`;

const Header = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const IconWrapper = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #66a109; /* <-- NEW COLOR */
  color: #ffffff; /* White icon for better contrast */
  font-size: 1.5rem;
  flex-shrink: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1) rotate(15deg);
    box-shadow: 0 0 25px rgba(102, 161, 9, 0.6); /* <-- NEW COLOR with alpha */
  }
`;

const VisionIconWrapper = styled(IconWrapper)`
  box-shadow: 0 0 0 3px #66a109; /* <-- NEW COLOR */
  border: 3px solid #121212;
`;

const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
  color: #495057;

  ${VisionColumn} & {
    color: #ced4da;
  }
`;

const TagsContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Tag = styled.span`
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: default;
  transition: all 0.3s ease;

  /* Using new color as default, with white text */
  background-color: ${(props) => props.bg || "#66a109"};
  color: ${(props) => props.color || "#ffffff"};
  border: 1px solid ${(props) => props.border || "transparent"};

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const DecorativeShape = styled(motion.div)`
  position: absolute;
  z-index: 1;
  pointer-events: none;
`;

const NavDots = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.75rem;
  z-index: 3;

  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #d3d3d3;
    transition: background-color 0.3s ease, transform 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: scale(1.3);
    }
  }

  span.active {
    background-color: #66a109; /* <-- NEW COLOR */
    transform: scale(1.3);
  }
`;

//================================================================
// 2. FRAMER MOTION VARIANTS
//================================================================

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

//================================================================
// 3. THE MAIN COMPONENT
//================================================================

const MissionVision = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Mouse move handler for parallax effect
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
    <SectionWrapper ref={sectionRef}>
      {/* -------------------- MISSION COLUMN -------------------- */}
      <MissionColumn
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Decorative Shapes with NEW COLOR */}
        <DecorativeShape
          className="shape"
          data-factor="-20"
          style={{
            top: "10%",
            left: "15%",
            width: "100px",
            height: "100px",
            background: "rgba(102, 161, 9, 0.2)",
            borderRadius: "50%",
            transition: "transform 0.4s ease-out",
          }}
        />
        <DecorativeShape
          className="shape"
          data-factor="30"
          style={{
            top: "20%",
            right: "15%",
            width: "50px",
            height: "50px",
            background: "#e9ecef",
            borderRadius: "10px",
            transition: "transform 0.4s ease-out",
          }}
        />
        <DecorativeShape
          className="shape"
          data-factor="-15"
          style={{
            bottom: "15%",
            left: "20%",
            width: "80px",
            height: "80px",
            border: "2px solid rgba(102, 161, 9, 0.3)",
            borderRadius: "50%",
            transition: "transform 0.4s ease-out",
          }}
        />
        <DecorativeShape
          className="shape"
          data-factor="25"
          style={{
            bottom: "10%",
            left: "10%",
            width: "60px",
            height: "60px",
            background: "#66a109",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            color: "#fff",
            transition: "transform 0.4s ease-out",
          }}
        >
          <BsFillLightningFill />
        </DecorativeShape>

        <ContentWrapper>
          <Header variants={itemVariants}>
            <IconWrapper>
              <FaStar />
            </IconWrapper>
            <Title>Our Mission</Title>
          </Header>
          <Description variants={itemVariants}>
            To deliver innovative, sustainable, and results-driven project
            management and consultancy solutions. We aim to exceed client
            expectations by combining strategic planning with professional
            execution, ensuring each project is delivered on time and within
            budget.
          </Description>
          <TagsContainer variants={itemVariants}>
            <Tag>Strategic Planning</Tag>
            <Tag bg="#121212" color="#ffffff">
              Team Collaboration
            </Tag>
            <Tag>Innovation</Tag>
          </TagsContainer>
        </ContentWrapper>
      </MissionColumn>

      {/* -------------------- VISION COLUMN -------------------- */}
      <VisionColumn
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Decorative Shapes with NEW COLOR */}
        <DecorativeShape
          className="shape"
          data-factor="-20"
          style={{
            top: "15%",
            left: "10%",
            width: "60px",
            height: "60px",
            border: "2px solid rgba(102, 161, 9, 0.4)",
            borderRadius: "10px",
            transition: "transform 0.4s ease-out",
          }}
        />
        <DecorativeShape
          className="shape"
          data-factor="30"
          style={{
            top: "25%",
            right: "20%",
            width: "80px",
            height: "80px",
            background: "rgba(102, 161, 9, 0.1)",
            borderRadius: "50%",
            transition: "transform 0.4s ease-out",
          }}
        />
        <DecorativeShape
          className="shape"
          data-factor="-15"
          style={{
            bottom: "20%",
            left: "40%",
            width: "120px",
            height: "120px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "50%",
            transition: "transform 0.4s ease-out",
          }}
        />
        <DecorativeShape
          className="shape"
          data-factor="25"
          style={{
            bottom: "8%",
            right: "10%",
            width: "60px",
            height: "60px",
            background: "#66a109",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            color: "#fff",
            transition: "transform 0.4s ease-out",
          }}
        >
          <FaStar />
        </DecorativeShape>

        <ContentWrapper>
          <Header variants={itemVariants}>
            <VisionIconWrapper>
              <FaCheck />
            </VisionIconWrapper>
            <Title>Our Vision</Title>
          </Header>
          <Description variants={itemVariants}>
            To be the leading project management consultancy that consistently
            turns visionary ideas into sustainable and successful projects,
            while fostering long-term relationships with our clients through
            trust and excellence.
          </Description>
          <TagsContainer variants={itemVariants}>
            <Tag color="#111111">Visionary Leadership</Tag>
            <Tag bg="#ffffff" color="#111111" border="1px solid #dee2e6">
              Sustainable Growth
            </Tag>
            <Tag color="#111111">Excellence</Tag>
          </TagsContainer>
        </ContentWrapper>
      </VisionColumn>
    </SectionWrapper>
  );
};

export default MissionVision;
