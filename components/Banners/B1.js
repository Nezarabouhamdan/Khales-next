// components/HeroGlass.jsx
"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

//================================================================
// 1. STYLED COMPONENTS FOR THE NEW DESIGN
//================================================================
const HeroWrapper = styled.section`
  height: 90vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Inter", sans-serif;
`;

const BackgroundVideo = styled(motion.video)`
  position: absolute;

  width: auto;
  height: auto;
  min-width: 100%;
  min-height: 100%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  z-index: 1;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 20, 30, 0.4);
  z-index: 2;
`;

const ContentPane = styled(motion.div)`
  position: relative;
  z-index: 3;
  width: 90%;
  max-width: 800px;
  padding: 3rem;
  border-radius: 16px;

  /* The "Frosted Glass" Effect */
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const AnimatedBorder = styled(motion.svg)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  rect {
    stroke-dasharray: 4000; /* A large number that's bigger than the perimeter */
    stroke-dashoffset: 4000;
  }
`;

const TextBlock = styled.div`
  color: white;
  text-align: center;
`;

const TitleWrapper = styled.div`
  overflow: hidden; /* This is key for the text reveal animation */
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SubtitleWrapper = styled(TitleWrapper)`
  margin-top: 1rem;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
  max-width: 500px;
  margin: 0 auto;
`;

const CTAButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  background-color: transparent;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  margin-top: 2rem;
  padding-bottom: 0.5rem;

  .arrow {
    transition: transform 0.3s ease;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #66a109;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease-out;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  &:hover .arrow {
    transform: translateX(5px);
  }
`;

//================================================================
// MAIN COMPONENT
//================================================================
const HeroGlass = () => {
  const wrapperRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  // Apply parallax effect to the video
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const textRevealVariants = {
    hidden: { y: "110%" },
    visible: {
      y: "0%",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const borderVariants = {
    hidden: { strokeDashoffset: 4000 },
    visible: {
      strokeDashoffset: 0,
      transition: { duration: 2, ease: "easeInOut" },
    },
  };
  const contentContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 1.5 } },
  };
  const contentItemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <HeroWrapper ref={wrapperRef}>
      <BackgroundVideo style={{ y }} autoPlay loop muted playsInline>
        {/* Find royalty-free videos on sites like Pexels or Coverr */}
        <source
          src="./assets/Untitled video - Made with Clipchamp.mp4"
          type="video/mp4"
        />
      </BackgroundVideo>
      <VideoOverlay />

      <ContentPane
        initial="hidden"
        animate="visible"
        variants={contentContainerVariants}
      >
        <AnimatedBorder
          viewBox="0 0 800 400"
          preserveAspectRatio="none"
          variants={borderVariants}
        >
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2"
          />
        </AnimatedBorder>

        <TextBlock>
          <motion.div variants={contentItemVariants}>
            <TitleWrapper>
              <Title variants={textRevealVariants}>
                Efficient Project Management
              </Title>
            </TitleWrapper>
            <TitleWrapper>
              <Title variants={textRevealVariants}>for Success</Title>
            </TitleWrapper>
          </motion.div>

          <motion.div variants={contentItemVariants}>
            <SubtitleWrapper>
              <Subtitle variants={textRevealVariants}>
                Delivering seamless projects from concept to completion
              </Subtitle>
            </SubtitleWrapper>
          </motion.div>

          <motion.div variants={contentItemVariants}>
            <CTAButton href="#">
              <span>Book Appointment</span>
              <span className="arrow">
                <FaArrowRight />
              </span>
            </CTAButton>
          </motion.div>
        </TextBlock>
      </ContentPane>
    </HeroWrapper>
  );
};

export default HeroGlass;
