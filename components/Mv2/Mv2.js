// components/MissionVisionUltimate.jsx
"use client";

import React, { useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion, useInView } from "framer-motion";
import { FaArrowRight, FaCheck } from "react-icons/fa";

//================================================================
// 1. KEYFRAME ANIMATIONS (WITH FIXES)
//================================================================
const rotateClockwise = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const rotateCounterClockwise = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// Slower bar wave animation
const barWave = keyframes`
  0%, 100% { transform: scaleY(0.3); }
  50% { transform: scaleY(1.0); }
`;

//================================================================
// 2. STYLED COMPONENTS (WITH FIXES)
//================================================================

// --- Main Layout ---
const SectionWrapper = styled.section`
  display: flex;
  width: 100%;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
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
  text-align: center;
`;

const AnimationHeader = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  margin-top: 2rem;
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
  justify-content: center;
  gap: 1rem;
`;

const Tag = styled.span`
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: default;
  transition: all 0.3s ease;
  background-color: ${(props) => props.bg || "#66a109"};
  color: ${(props) => props.color || "#ffffff"};
  border: 1px solid ${(props) => props.border || "transparent"};
  &:hover {
    transform: translateY(-3px) scale(1.05);
  }
`;

const DecorativeShape = styled(motion.div)`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  transition: transform 0.4s ease-out;
`;

// --- Mission "Galaxy" Animation Components (UPDATED) ---
const GalaxyContainer = styled.div`
  width: 180px;
  height: 180px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Orbit = styled.div`
  position: absolute;
  border-radius: 50%;
  border-style: dashed;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  /* FIX: Hint to the browser to keep this animation layer active */
  will-change: transform;

  &.outer {
    width: 100%;
    height: 100%;
    animation-name: ${rotateClockwise};
    animation-duration: 25s;
  }
  &.inner {
    width: 60%;
    height: 60%;
    animation-name: ${rotateCounterClockwise};
    animation-duration: 20s;
  }
`;
const Planet = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #66a109;
  &.p1 {
    top: -6px;
    left: calc(50% - 6px);
  }
  &.p2 {
    bottom: 20%;
    right: -3px;
    width: 8px;
    height: 8px;
  }
  &.p3 {
    top: 25%;
    left: -4px;
    width: 10px;
    height: 10px;
    background-color: #333;
  }
`;
const Sun = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #121212;
  z-index: 1;
  animation: ${pulse} 5s infinite ease-in-out;
`;

// --- Vision Bar Chart Animation Components (UPDATED) ---
const VisionGraphicContainer = styled.div`
  width: 200px;
  height: 120px;
  position: relative;
`;
const BarChart = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
  height: 100%;
`;
const Bar = styled.div`
  background-color: #66a109;
  width: 18px;
  height: ${(props) => props.height};
  border-radius: 4px;
  transform-origin: bottom;

  /* FIX: Slower animation duration and adjusted delay */
  animation: ${barWave} 3.5s infinite ease-in-out;
  animation-delay: ${(props) => props.delay}s;
`;
const CheckMark = styled(motion.div)`
  position: absolute;
  top: -10px;
  right: 10%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #66a109;
  color: #121212;
  display: flex;
  align-items: center;
  justify-content: center;
`;

//================================================================
// 3. THE ANIMATED HEADER COMPONENTS
//================================================================
const MissionAnimation = () => (
  <GalaxyContainer>
    <Sun />
    <Orbit className="outer">
      <Planet className="p1" />
      <Planet className="p2" />
    </Orbit>
    <Orbit className="inner">
      <Planet className="p3" />
    </Orbit>
  </GalaxyContainer>
);

const VisionAnimation = () => {
  const barMaxHeights = [40, 70, 60, 95, 80, 50, 65];

  return (
    <VisionGraphicContainer>
      <BarChart>
        {barMaxHeights.map((height, i) => (
          <Bar
            key={i}
            height={`${height}%`}
            delay={i * 0.3} // Adjusted delay for slower wave
          />
        ))}
      </BarChart>
      <CheckMark
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <FaCheck />
      </CheckMark>
    </VisionGraphicContainer>
  );
};

//================================================================
// 4. FRAMER MOTION & MAIN COMPONENT
//================================================================
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "circOut" } },
};

const MissionVisionUltimate = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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

  return (
    <SectionWrapper ref={ref}>
      <MissionColumn
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
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
          }}
        />

        <ContentWrapper>
          <AnimationHeader variants={itemVariants}>
            <MissionAnimation />
            <Title>Our Mission</Title>
          </AnimationHeader>
          <Description variants={itemVariants}>
            Delivering exceptional project management solutions through
            strategic collaboration, innovative methodologies, and unwavering
            commitment to excellence in every engagement.
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

      <VisionColumn
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
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
          }}
        />

        <ContentWrapper>
          <AnimationHeader variants={itemVariants}>
            <VisionAnimation />
            <Title>Our Vision</Title>
          </AnimationHeader>
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

export default MissionVisionUltimate;
