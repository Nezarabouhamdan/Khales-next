// components/HeroSlider/HeroSlider.js
// --- FINAL VERSION WITH FULL RTL SUPPORT ---

"use client";

import React, { useRef } from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";

// --- Styled Components with RTL logic ---

const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: #05080a;

  /* 1. Content Alignment based on RTL prop */
  justify-content: ${({ $rtl }) => ($rtl ? "flex-end" : "flex-start")};

  @media (max-width: 768px) {
    height: 85vh;
    align-items: flex-end;
  }
`;

const BackgroundContainer = styled(motion.div)`
  position: absolute;
  top: -10%;
  left: 0;
  width: 100%;
  height: 120%;
  z-index: 1;
`;

const VideoBackground = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageBackground = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  animation: kenBurns 40s ease-in-out infinite alternate;

  @keyframes kenBurns {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.1);
    }
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;

  /* 2. Flipped Gradient Overlay for RTL */
  background: ${({ $rtl }) =>
    $rtl
      ? "linear-gradient(270deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)"
      : "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)"};

  @media (max-width: 768px) {
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.2) 60%,
      rgba(0, 0, 0, 0) 100%
    );
  }
`;

const GridOverlay = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  opacity: 0.05;

  line {
    stroke: #ffffff;
    stroke-width: 1;
    stroke-dasharray: 10 20;
    animation: dash 20s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 1000;
    }
  }
`;

const ContentContainer = styled(motion.div)`
  position: relative;
  z-index: 4;
  max-width: 1200px;
  padding: 0 5%;
  color: #fff;

  /* 3. Text Alignment for RTL */
  text-align: ${({ $rtl }) => ($rtl ? "right" : "left")};

  @media (max-width: 768px) {
    padding: 0 8%;
    margin-bottom: 20vh;
    width: 100%;
  }
`;

const Headline = styled(motion.h1)`
  font-size: 3.8rem;
  font-weight: 700;
  line-height: 1.15;
  max-width: 680px;
  margin-bottom: 1rem;
  text-shadow: 0 3px 15px rgba(0, 0, 0, 0.6);

  @media (max-width: 992px) {
    font-size: 3.2rem;
  }
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const Subline = styled(motion.p)`
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
  font-weight: 300;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 1.15rem;
  }
`;

const CTAButton = styled(motion.a)`
  position: relative;
  display: inline-block;
  padding: 16px 36px;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;
  transition: color 0.4s ease-out, border-color 0.4s ease-out;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: -1;
    /* 4. Flipped Animation Origin for RTL */
    transform-origin: ${({ $rtl }) => ($rtl ? "right" : "left")};
    transform: scaleX(0);
    transition: transform 0.4s cubic-bezier(0.7, 0, 0.2, 1);
  }

  &:hover {
    color: #000;
    border-color: #fff;
    &::before {
      transform: scaleX(1);
    }
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  opacity: 0.7;

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  div {
    width: 24px;
    height: 24px;
    border-left: 2px solid white;
    border-bottom: 2px solid white;
    transform: rotate(-45deg);
    animation: bounce 2s infinite;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// --- The Main Component ---
const HeroSlider = (props) => {
  const sectionRef = useRef(null);

  const { rtl } = props; // Extract the rtl prop

  const content =
    props.slides && props.slides.length > 0
      ? {
          imageUrl: props.slides[0].image,
          videoUrl: props.slides[0].videoUrl,
          headline: props.slides[0].title,
          subline: props.slides[0].content,
          buttonText: props.slides[0].button,
          buttonLink: "/booking",
        }
      : props;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  if (!content.imageUrl && !content.videoUrl) return null;

  return (
    <HeroSection ref={sectionRef} $rtl={rtl}>
      <BackgroundContainer style={{ y: backgroundY }}>
        {content.videoUrl ? (
          <VideoBackground
            key={content.videoUrl}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={content.videoUrl} type="video/mp4" />
          </VideoBackground>
        ) : (
          <ImageBackground
            style={{ backgroundImage: `url(${content.imageUrl})` }}
          />
        )}
      </BackgroundContainer>

      <GridOverlay width="100%" height="100%">
        {Array.from({ length: 30 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={`${i * 4}%`}
            y1="0"
            x2={`${i * 4}%`}
            y2="100%"
          />
        ))}
        {Array.from({ length: 30 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={`${i * 4}%`}
            x2="100%"
            y2={`${i * 4}%`}
          />
        ))}
      </GridOverlay>

      <Overlay $rtl={rtl} />

      <ContentContainer
        $rtl={rtl}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <Headline variants={itemVariants}>{content.headline}</Headline>
        <Subline variants={itemVariants}>{content.subline}</Subline>
        <motion.div variants={itemVariants}>
          <Link href={content.buttonLink || "/"} passHref legacyBehavior>
            <CTAButton $rtl={rtl}>{content.buttonText}</CTAButton>
          </Link>
        </motion.div>
      </ContentContainer>
    </HeroSection>
  );
};

export default HeroSlider;
