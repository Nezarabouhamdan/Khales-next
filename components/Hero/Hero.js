"use client"; // This is REQUIRED because it uses state and refs for interactivity

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

// --- MAIN COMPONENT ---
// Accepts `children` (your H1, P, etc.) and `lang` from the parent page
export default function Hero({ children, lang }) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  // All the video control logic remains the same
  const toggleMute = () => setIsMuted((prev) => !prev);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
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
    video.play();
    setIsPlaying(true);
  };

  return (
    // Pass the lang prop to styled-component for direction/font
    <Herosection lang={lang}>
      <VideoBackground
        ref={videoRef}
        src={"/assets/Untitled video - Made with Clipchamp.mp4"}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        poster="/path/to/your/video-poster-image.jpg"
      />
      <VideoOverlay />

      <ContentContainer
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/*
          <<< KEY CHANGE >>>
          This renders the SEO-friendly content passed from the parent server component.
        */}
        {children}
      </ContentContainer>

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
    </Herosection>
  );
}

// --- ANIMATION VARIANTS (Exported for parent component use) ---
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

// --- STYLED COMPONENTS ---
// These are exported so the parent Server Component can use them to style the content

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
  display: flex;
  gap: 1rem;
  z-index: 10;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 30px;
  backdrop-filter: blur(5px);

  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
    right: auto;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  opacity: 0.8;
  transition: all 0.2s ease;
  &:hover {
    opacity: 1;
    transform: scale(1.15);
    color: #66a109;
  }
`;
