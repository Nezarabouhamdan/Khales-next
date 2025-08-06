// components/Hero/Hero.js
"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FaVolumeMute,
  FaVolumeUp,
  FaPlay,
  FaPause,
  FaRedo,
} from "react-icons/fa";

// --- MAIN ENHANCED HERO COMPONENT ---
export default function Hero({ slides = [], lang, isHomePage = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoError, setIsVideoError] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const toggleMute = () => setIsMuted((prev) => !prev);
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => setIsVideoError(true));
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };
  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => setIsVideoError(true));
    setIsPlaying(true);
  };
  const handleVideoError = () => setIsVideoError(true);

  const currentSlide = slides[currentIndex] || slides[0];
  const textContainerVariants =
    lang === "ar" ? rtlTextContainerVariants : ltrTextContainerVariants;

  if (!currentSlide) return null;

  const buttonLink = `/${lang}${currentSlide.buttonLink || ""}`;

  return (
    <Herosection lang={lang}>
      {!isVideoError && (
        <VideoBackground
          ref={videoRef}
          src={"/assets/Untitled video - Made with Clipchamp.mp4"}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster="/assets/hero-poster.jpg"
          onError={handleVideoError}
        />
      )}
      <VideoOverlay />
      <ContentContainer>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* FIXED: Only use H1 on homepage, H2 on other pages */}
            {isHomePage ? (
              <MainTitle as="h1">{currentSlide.title}</MainTitle>
            ) : (
              <MainTitle as="h2">{currentSlide.title}</MainTitle>
            )}
            <Subtitle>{currentSlide.subtitle}</Subtitle>
            <CTAButton href={buttonLink}>{currentSlide.buttonText}</CTAButton>
          </motion.div>
        </AnimatePresence>
      </ContentContainer>
      {!isVideoError && (
        <ControlsWrapper>
          <IconButton onClick={toggleMute} aria-label="Toggle Sound">
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </IconButton>
          <IconButton onClick={togglePlay} aria-label="Play/Pause">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </IconButton>
          <IconButton onClick={handleReplay} aria-label="Replay">
            <FaRedo />
          </IconButton>
        </ControlsWrapper>
      )}
    </Herosection>
  );
}

// --- STYLED COMPONENTS ---

const Herosection = styled.section`
  height: 90vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: ${({ lang }) =>
      lang === "ar" ? "var(--font-tajawal)" : "var(--font-inter)"},
    sans-serif;
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
  background-image: url("/assets/hero-poster.jpg");
  background-size: cover;
  background-position: center;
  @media (max-width: 768px) {
    height: 85vh;
  }
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const ContentContainer = styled(motion.div)`
  position: relative;
  z-index: 3;
  text-align: center;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  overflow: hidden;
`;

// FIXED: Now supports both h1 and h2 via 'as' prop
export const MainTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 700;
  line-height: 1.25;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
`;

export const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 3vw, 1.2rem);
  max-width: 650px;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  opacity: 0.9;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
`;

export const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #66a109;
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  &:hover {
    transform: translateY(-3px);
    background: #5a9008;
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
  }
`;

const ControlsWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 10;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 30px;
  backdrop-filter: blur(5px);
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: all 0.2s ease;
  &:hover {
    opacity: 1;
    transform: scale(1.15);
    color: #66a109;
  }
`;

// --- ANIMATION VARIANTS ---
const commonTransition = {
  ease: "easeInOut",
  duration: 0.8,
};
const ltrTextContainerVariants = {
  hidden: { opacity: 0, x: -200 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...commonTransition, staggerChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    x: 200,
    transition: commonTransition,
  },
};
const rtlTextContainerVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...commonTransition, staggerChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: commonTransition,
  },
};
