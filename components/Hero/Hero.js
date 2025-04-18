import React, { useState, useRef, useEffect } from "react";
import { Herosection } from "./Herostyles";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import styled from "styled-components";
import {
  FaVolumeMute,
  FaVolumeUp,
  FaPlay,
  FaPause,
  FaRedo,
} from "react-icons/fa";
import "@/app/globals.css"

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2); // Adjust the opacity here
  z-index: -1; // same as video to keep them together
`;

const StyledVideo = styled.video`
  object-fit: cover;
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: -1;
  @media screen and (max-width: 968px) {
    width: 100%;
    height: 60vh;
  }
`;

// Styled component for video controls container
const ControlsWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
  z-index: 2;
  background: rgba(0, 0, 0, 0.4);
  padding: 10px 20px;
  border-radius: 30px;
  align-items: center;
  @media screen and (max-width: 968px) {
    bottom: 30vh;
  }
`;

// Styled icon buttons
const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 22px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
    color: #66a109;
  }
`;

// Statics text style
const Statics = styled.p`
  font-family: Inter;
  margin-top: 20px;
  font-size: 20px;
`;

export default function Hero() {
  const animation = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2 });

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!inView) {
      animation.start({ opacity: 1, y: 1 });
    }
  }, [inView, animation]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleReplay = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play();
      setIsPlaying(true);
    }
  };

  // const videoSource = require("../../public/assets/Untitled video - Made with Clipchamp.mp4"); // replace with your actual video file

  return (
    <Herosection ref={ref}>
      <StyledVideo
        ref={videoRef}
        src={'./assets/Untitled video - Made with Clipchamp.mp4'}
        autoPlay
        loop
        muted={isMuted}
        playsInline
      />
      <VideoOverlay />

      {/* Controls at bottom center */}
      <ControlsWrapper>
        <IconButton onClick={toggleMute}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </IconButton>
        <IconButton onClick={togglePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </IconButton>
        <IconButton onClick={handleReplay}>
          <FaRedo />
        </IconButton>
      </ControlsWrapper>
    </Herosection>
  );
}
