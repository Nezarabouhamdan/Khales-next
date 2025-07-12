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

const HeroSection = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 500px;
  background-image: url("https://i.ibb.co/7tKV3xP1/aboutus5.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 2rem;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
    z-index: 1;
  }
`;

const HeroTitle = styled(motion.h2)`
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
  @media (max-width: 768px) {
    font-size: 2.8rem;
  } /* <-- REDUCED */
`;

const StatTitle = styled.h3`
  font-size: 1.3rem; /* <-- REDUCED */
  font-weight: 600;
  margin: 0;
  @media (max-width: 768px) {
    font-size: 1.1rem;
  } /* <-- REDUCED */
`;

const StatDescription = styled.p`
  font-size: 0.95rem; /* <-- REDUCED */
  line-height: 1.5;
  opacity: 0.9;
  margin: 0;
  @media (max-width: 768px) {
    font-size: 0.85rem;
  } /* <-- REDUCED */
`;

//================================================================
// 3. COUNTER HOOK
//================================================================
const useCounter = (end, duration = 2000) => {
  const [count, setCount] = React.useState(0);
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, end, {
      duration: duration / 1000,
      onUpdate: (value) => setCount(Math.floor(value)),
    });

    return () => controls.stop();
  }, [end, duration, isInView]);

  return { count, ref: countRef };
};

//================================================================
// 4. MAIN COMPONENT
//================================================================
const ValueProposition = () => {
  return (
    <SectionContainer>
      <ContentWrapper>
        <HeroSection>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Delivering Excellence in Every Project
          </HeroTitle>
        </HeroSection>

        <StatsGrid
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {statsData.map((stat, index) => {
            const { count, ref } = useCounter(stat.value);
            return (
              <StatCard
                key={index}
                ref={ref}
                highlight={stat.highlight}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CounterText>
                  {count}
                  {stat.suffix}
                </CounterText>
                <StatTitle>{stat.title}</StatTitle>
                <StatDescription>{stat.description}</StatDescription>
              </StatCard>
            );
          })}
        </StatsGrid>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default ValueProposition;
