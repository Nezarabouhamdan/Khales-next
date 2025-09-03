// components/HeroSlider.js
"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";

// --- Keyframes and Skeleton ---
const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const SkeletonOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: #282828;
  background-image: linear-gradient(
    to right,
    #282828 8%,
    #4d4d4d 38%,
    #282828 54%
  );
  background-size: 2000px 100%;
  animation: ${shimmer} 1.5s linear infinite;
`;

// --- Styled Components (with the final fix for the button) ---
const HeroSection = styled.section`
  height: 75vh;
  position: relative;
  display: flex;
  overflow: hidden;
  background-color: #05080a;
  align-items: center;
  justify-content: center;

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
  background-image: ${(props) =>
    props.$isLoaded ? `url(${props.$imageUrl})` : "none"};
  opacity: ${(props) => (props.$isLoaded ? 1 : 0)};
  transition: opacity 0.8s ease-in-out;

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
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );

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
  width: 100%;
  padding: 0 5%;
  color: #fff;
  text-align: center;

  @media (max-width: 768px) {
    padding: 0 8%;
    margin-bottom: 20vh;
  }
`;

const Headline = styled(motion.h1)`
  font-size: 3.8rem;
  font-weight: 700;
  line-height: 1.15;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
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
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.15rem;
  }
`;

// ======================= THE FINAL FIX =======================
// We define the button based on a standard 'div' or any non-link tag.
const CTAButtonWrapper = styled.div`
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
    transform-origin: center;
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

// --- Animation Variants ---
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
export default function HeroSlider({ slides, rtl, lang }) {
  const sectionRef = useRef(null);
  const pathname = usePathname();
  const isBlogPage = pathname.includes("/blog");
  const slide = slides && slides.length > 0 ? slides[0] : null;
  const safeLang = lang || "en";

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (!slide || !slide.image) {
      setIsImageLoaded(false);
      return;
    }
    const img = new window.Image();
    img.src = slide.image;
    img.onload = () => setIsImageLoaded(true);
    return () => {
      img.onload = null;
    };
  }, [slide]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  if (!slide) {
    return null;
  }

  return (
    <HeroSection ref={sectionRef} $rtl={rtl}>
      <BackgroundContainer style={{ y: backgroundY }}>
        {slide.videoUrl ? (
          <VideoBackground key={slide.videoUrl} autoPlay loop muted playsInline>
            <source src={slide.videoUrl} type="video/mp4" />
          </VideoBackground>
        ) : (
          <>
            {!isImageLoaded && <SkeletonOverlay />}
            <ImageBackground
              $isLoaded={isImageLoaded}
              $imageUrl={slide.image}
            />
          </>
        )}
      </BackgroundContainer>

      <GridOverlay width="100%" height="100%">
        {/* SVG lines... */}
      </GridOverlay>

      <Overlay $rtl={rtl} />

      <ContentContainer
        $rtl={rtl}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <Headline variants={itemVariants}>{slide.title}</Headline>
        <Subline variants={itemVariants}>{slide.content}</Subline>
        {!isBlogPage && (
          <motion.div variants={itemVariants}>
            {/* ======================= THE FINAL FIX ======================= */}
            {/* We wrap the styled div with the modern Link component. No legacy props needed. */}
            <Link href={`/${safeLang}/Contact`}>
              <CTAButtonWrapper>{slide.button}</CTAButtonWrapper>
            </Link>
          </motion.div>
        )}
      </ContentContainer>
    </HeroSection>
  );
}
