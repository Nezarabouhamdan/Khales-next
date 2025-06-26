// MissionVisionHeader.js
"use client";
import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  width: 100%;
  text-align: center; /* This is the key property to center the text */
  margin-bottom: 20px; /* Adds space between title and cards */
`;

const Title = styled.h2`
  color: #000;
  font-size: 56px;
  font-weight: 800; /* Bold weight */
  letter-spacing: -1px;

  @media (max-width: 991px) {
    font-size: 44px;
  }

  @media (max-width: 640px) {
    font-size: 36px;
  }
`;

const MissionVisionHeader = ({ title }) => {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
    </HeaderContainer>
  );
};

export default MissionVisionHeader;
