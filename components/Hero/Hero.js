"use client"; // REQUIRED: Uses state, refs, and event handlers for interactivity

import React, { useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaVolumeMute,
  FaVolumeUp,
  FaPlay,
  FaPause,
  FaRedo,
} from "react-icons/fa";

// --- MAIN ENHANCED HERO COMPONENT ---
export default function Hero({ children, lang }) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  // State to track if the video fails to load, for graceful fallback
  const [isVideoError, setIsVideoError] = useState(false);
  const videoRef = useRef(null);

  const toggleMute = () => setIsMuted((prev) => !prev);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      // play() returns a promise which can reject if interrupted
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

  // This function is triggered by the <video> element's onError event
  const handleVideoError = () => {
    setIsVideoError(true);
  };

  return (
    // Pass the language and error state to the styled component
    <Herosection lang={lang}>
      {/*
        The video is now conditionally rendered.
        If it fails to load, it will be removed from the DOM,
        leaving only the fast-loading poster image (set via CSS background).
      */}
      {!isVideoError && (
        <VideoBackground
          ref={videoRef}
          src={"/assets/Untitled video - Made with Clipchamp.mp4"}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          // The poster attribute helps the browser display an image while the video loads.
          poster="/assets/hero-poster.jpg"
          // This error handler is key to our fallback strategy.
          onError={handleVideoError}
        />
      )}

      <VideoOverlay />

      <ContentContainer
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Renders the SEO-friendly content from the parent */}
        {children}
      </ContentContainer>

      {/* Video controls are also hidden if the video fails, preventing user confusion */}
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

// --- ANIMATION VARIANTS (Exported for reuse) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.5 },
  },
};

export const fadeInUp = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

// --- STYLED COMPONENTS (Exported for reuse) ---
const Herosection = styled.section`
  height: 90vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: white;
  font-family: ${({ lang }) =>
      lang === "ar" ? "var(--font-tajawal)" : "var(--font-inter)"},
    sans-serif;
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};

  /*
    CRITICAL LCP ENHANCEMENT:
    The poster is applied as a background image on the main section.
    This ensures it's always visible, even if the <video> tag fails or is removed.
    This makes the visual experience seamless and provides a reliable fallback.
  */
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
  background: rgba(0, 0, 0, 0.5); /* Dark overlay for text readability */
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
`;

export const MainTitle = styled(motion.h1)`
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1.25;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 650px;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  opacity: 0.9;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

export const CTAButton = styled(motion.a)`
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

  @media (max-width: 768px) {
    padding: 0.8rem 1.8rem;
    font-size: 1rem;
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
