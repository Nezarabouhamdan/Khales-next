"use client";
import * as React from "react";
import styled from "styled-components";

function InputDesign() {
  return (
    <Container>
      <StyledImage
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0491edfa3d574307437ab772e1c6297f044806d3?placeholderIfAbsent=true"
        alt=""
      />
    </Container>
  );
}

const Container = styled.section`
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  max-width: 1300px;
  padding-top: 26px;
  padding-bottom: 26px;
  flex-direction: column;
  overflow: hidden;
  align-items: stretch;
  justify-content: center;
`;

const StyledImage = styled.img`
  aspect-ratio: 1.66;
  object-fit: cover;
  object-position: center;
  width: 100%;
  margin-left: 2px;
  align-self: center;
  margin-top: -2px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export default InputDesign;
