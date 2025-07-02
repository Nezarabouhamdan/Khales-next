// components/ValueProposition.jsx
"use client";

import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion, useInView, animate } from "framer-motion";

//================================================================
// 1. REAL CONTENT & KEYFRAME ANIMATIONS
//================================================================

const statsData = [
  {
    value: 120,
    suffix: "+",
    title: "Successful Projects",
    description:
      "We bring visionary ideas to life, delivering complex projects on time and exceeding expectations with precision and care.",
    highlight: false,
  },
  {
    value: 98,
    suffix: "%",
    title: "Client Satisfaction",
    description:
      "Our commitment to partnership and excellence is reflected in our client feedback. Your success is our ultimate metric.",
    highlight: true,
  },
  {
    value: 15,
    suffix: "+",
    title: "Years of Experience",
    description:
      "With over a decade of industry leadership, our seasoned experts bring invaluable knowledge and insight to every engagement.",
    highlight: false,
  },
];

const kenBurns = keyframes`
  0% { transform: scale(1.05) translate(0, 0); }
  100% { transform: scale(1.15) translate(-2%, 1%); }
`;

//================================================================
// 2. STYLED COMPONENTS (WITH REFINED SIZES)
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
  gap: 3rem;
`;

const HeroImage = styled(motion.div)`
  height: 400px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  color: white;
  display: flex;
  align-items: center;
  padding: 3rem;
  @media (max-width: 768px) {
    padding: 2rem;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: ${kenBurns} 15s ease-in-out infinite alternate;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
    z-index: 1;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.2rem; /* <-- REDUCED */
  font-weight: 700;
  max-width: 500px;
  line-height: 1.2;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) {
    font-size: 2.2rem;
  } /* <-- REDUCED */
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  background-color: ${(props) => (props.highlight ? "#66a109" : "#121212")};
  color: white;
  padding: 2rem;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${(props) =>
      props.highlight
        ? "0 15px 30px rgba(102, 161, 9, 0.4)"
        : "0 15px 30px rgba(0,0,0,0.25)"};
  }
`;

const CounterText = styled.span`
  font-size: 3.8rem; /* <-- REDUCED */
  font-weight: 700;
  line-height: 1;
`;

const StatTitle = styled.h3`
  font-size: 1.25rem; /* <-- REDUCED */
  font-weight: 600;
`;

const StatDescription = styled.p`
  font-size: 0.95rem; /* Slightly smaller for balance */
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
`;

const DecorativeShape = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  transition: transform 0.4s ease-out;
`;

//================================================================
// 3. ANIMATED NUMBER COMPONENT
//================================================================
const AnimatedNumber = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(latest) {
          if (ref.current) {
            ref.current.textContent = Math.round(latest);
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <CounterText ref={ref}>0</CounterText>;
};

//================================================================
// 4. MAIN COMPONENT
//================================================================
const ValueProposition = () => {
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
    visible: { transition: { staggerChildren: 0.15 } },
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
        data-factor="30"
        style={{
          top: "10%",
          left: "5%",
          width: "50px",
          height: "50px",
          background: "rgba(102, 161, 9, 0.1)",
          borderRadius: "10px",
        }}
      />
      <DecorativeShape
        className="shape"
        data-factor="-20"
        style={{
          top: "50%",
          right: "5%",
          width: "80px",
          height: "80px",
          border: "2px solid rgba(102, 161, 9, 0.15)",
          borderRadius: "50%",
        }}
      />
      <DecorativeShape
        className="shape"
        data-factor="15"
        style={{
          bottom: "5%",
          left: "20%",
          width: "40px",
          height: "40px",
          background: "rgba(44, 62, 80, 0.1)",
        }}
      />

      <ContentWrapper>
        <HeroImage
          as={motion.div}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80"
            alt="Modern interior design"
          />
          <HeroTitle>Crafting Your Value Proposition</HeroTitle>
        </HeroImage>

        <StatsGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              highlight={stat.highlight}
              variants={itemVariants}
            >
              <div>
                <AnimatedNumber value={stat.value} />
                <CounterText>{stat.suffix}</CounterText>
              </div>
              <StatTitle>{stat.title}</StatTitle>
              <StatDescription>{stat.description}</StatDescription>
            </StatCard>
          ))}
        </StatsGrid>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default ValueProposition;
