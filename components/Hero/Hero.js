// components/Hero.jsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaVolumeMute,
  FaVolumeUp,
  FaPlay,
  FaPause,
  FaRedo,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";
import { useLanguage } from "../../Context/Languagecontext"; // Adjust path if needed

// --- CONTENT FOR THE HERO SECTION ---
const content = {
  eng: {
    title: "Building Futures, Creating Landmarks",
    subtitle:
      "Your vision, engineered with precision and delivered with excellence.",
  },
  ar: {
    title: "نبني المستقبل، ونصنع المعالم",
    subtitle: "رؤيتكم، بهندسة دقيقة وإنجاز يتسم بالتميز",
  },
};

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.5 },
  },
};

const fadeInUp = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

// --- MAIN COMPONENT ---
export default function Hero() {
  const { language } = useLanguage();
  const currentContent = content[language] || content.eng;

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

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
    <Herosection>
      <VideoBackground
        ref={videoRef}
        src={"/assets/Untitled video - Made with Clipchamp.mp4"}
        autoPlay
        loop
        muted={isMuted}
        playsInline // Important for iOS devices
      />
      <VideoOverlay />

      <ContentContainer
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <MainTitle variants={fadeInUp}>{currentContent.title}</MainTitle>
        <Subtitle variants={fadeInUp}>{currentContent.subtitle}</Subtitle>
      </ContentContainer>

      <ControlsWrapper>
        <IconButton onClick={toggleMute} aria-label="Toggle Mute">
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </IconButton>
        <IconButton onClick={togglePlay} aria-label="Toggle Play/Pause">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </IconButton>
        <IconButton onClick={handleReplay} aria-label="Replay Video">
          <FaRedo />
        </IconButton>
      </ControlsWrapper>
    </Herosection>
  );
}

// --- STYLED COMPONENTS ---

const Herosection = styled.section`
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: white;
  @media (max-width: 768px) {
    height: 80vh; /* Shorter height on mobile */
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
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
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
`;

const MainTitle = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  font-family: "Inter", sans-serif;
  max-width: 900px;
  line-height: 1.2;
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  max-width: 600px;
  margin-top: 1rem;
  line-height: 1.6;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ControlsWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
  padding: 10px 20px;
  border-radius: 30px;
  align-items: center;
  backdrop-filter: blur(5px);
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  display: flex;
  transition: transform 0.2s ease, color 0.2s ease;
  &:hover {
    transform: scale(1.2);
    color: #66a109;
  }
`;

const FloatingActionButtons = styled(motion.div)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1000;
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }
`;

const Fab = styled(motion.a)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #66a109;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
  &:hover {
    transform: scale(1.1);
    background-color: #5a9008;
  }
`;

const NButton = styled(motion.div)`
  position: fixed;
  bottom: 30px;
  left: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  z-index: 1000;
  cursor: pointer;
  @media (max-width: 768px) {
    bottom: 20px;
    left: 20px;
  }
`;
