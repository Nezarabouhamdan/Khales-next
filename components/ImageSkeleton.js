// components/ImageWithSkeleton.js
"use client";

import React, { useState } from "react";
import Image from "next/image";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

// --- MODIFIED ---
const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  /* 
    THIS IS THE FIX! The background is now dynamic.
    It's grey when loading, and transparent after loading.
  */
  background-color: ${(props) => (props.$isLoaded ? "transparent" : "#f0f0f0")};
  transition: background-color 0.3s ease-in-out;
`;

const Skeleton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to right,
    #f0f0f0 8%,
    #ffffff 38%,
    #f0f0f0 54%
  );
  background-size: 2000px 100%;
  animation: ${shimmer} 1.5s linear infinite;
`;

const StyledImage = styled(Image)`
  transition: opacity 0.5s ease-in-out;
  opacity: ${(props) => (props.$isLoaded ? 1 : 0)};
`;

export default function ImageWithSkeleton({ src, alt, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { width, height, ...rest } = props;

  return (
    // MODIFIED: Pass the $isLoaded prop to the wrapper
    <ImageWrapper {...rest} $isLoaded={isLoaded}>
      {!isLoaded && <Skeleton />}
      <StyledImage
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover" // This can be overridden by props
        onLoad={() => setIsLoaded(true)}
        $isLoaded={isLoaded}
        {...props}
      />
    </ImageWrapper>
  );
}
