"use client";
import React from "react";
import styled from "styled-components";

const HeroSection = ({ backgroundImage, title }) => {
  return (
    <HeroContainer>
      <BackgroundImage src={backgroundImage} alt="" role="presentation" />
      <HeroTitle>{title}</HeroTitle>
    </HeroContainer>
  );
};

// --- STYLED COMPONENTS ---

const HeroContainer = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  position: relative;
  width: 100%;
  min-height: 399px;
  padding: 3rem;
  color: #fff;
  overflow: hidden;

  /* This is the crucial fix to make z-index work as expected */
  isolation: isolate;

  @media (max-width: 991px) {
    min-height: 500px;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1rem;
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* This will now work correctly because of 'isolation: isolate' */
  object-fit: cover;
`;

const HeroTitle = styled.h1`
  position: relative; /* Stays on top of the z-index: -1 image */
  max-width: 450px;
  margin: 0;
  font-size: 45px;
  font-weight: 400;
  font-family: "Playfair", serif;
  line-height: 1.3;
  color: inherit;

  @media (max-width: 991px) {
    max-width: 90%;
    font-size: 38px;
  }
`;

export default HeroSection;
