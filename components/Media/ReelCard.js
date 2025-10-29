// components/Media/ReelCard.js
"use client";

import React, { useState } from "react";
import styled, { css } from "styled-components";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 125%; /* Aspect ratio 4:5, common for posts */
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
  }
`;

const ThumbnailContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const PlayIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  width: 60px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #66a109; /* Brand Green */
  font-size: 20px;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  opacity: 0;

  ${CardWrapper}:hover & {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`;

const TitleOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem 1.25rem 1.25rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  transition: opacity 0.3s ease;

  ${CardWrapper}:hover & {
    opacity: 0;
  }
`;

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

export default function ReelCard({ thumbnailUrl, embedUrl, title }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handlePlayClick = () => {
    setIsVideoLoaded(true);
  };

  return (
    <CardWrapper onClick={!isVideoLoaded ? handlePlayClick : undefined}>
      {isVideoLoaded ? (
        <StyledIframe
          src={`${embedUrl}?autoplay=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          <ThumbnailContainer>
            <Image
              src={thumbnailUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              loading="lazy"
            />
          </ThumbnailContainer>
          <PlayIconWrapper>
            <FaPlay style={{ marginLeft: "3px" }} />
          </PlayIconWrapper>
          <TitleOverlay>{title}</TitleOverlay>
        </>
      )}
    </CardWrapper>
  );
}
