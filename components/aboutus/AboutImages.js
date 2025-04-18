"use client";
import * as React from "react";
import styled from "styled-components";

export const AboutImages = () => {
  return (
    <ImageContainer>
      <BackgroundImage
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/eec00acfd4a57ab3d8f0dd8ce27263fa20565ba786733a1b52892eb92c8085a4?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8"
        alt="Background texture"
      />
      <ForegroundImage
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/22ee0d2dccc57069122365b7fce4c5c26949809bb649e30a11dc76bf58421b78?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8"
        alt="About section illustration"
      />
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-blend-mode: normal;
  position: relative;
  min-height: 1602px;
  flex-grow: 1;
  padding: 346px 80px;
  align-items: flex-end;
  justify-content: center;
  @media (max-width: 991px) {
    max-width: 100%;
    padding: 100px 20px;
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const ForegroundImage = styled.img`
  aspect-ratio: 1.23;
  object-fit: contain;
  object-position: center;
  width: 1116px;
  max-width: 100%;
  position: relative;
  z-index: 1;
`;
