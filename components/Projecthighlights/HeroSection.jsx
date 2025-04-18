import React from "react";
import styled from "styled-components";
import VerticalSlider from "../VerticalSlider/VerticalSlider";
const HeroContainer = styled.section`
  width: 100%;
  height: 100%;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
  @media (max-width: 991px) {
    height: 300px;
  }
  @media (max-width: 640px) {
    height: 200px;
  }
`;

const HeroSection = ({ img }) => {
  return (
    <HeroContainer>
      <VerticalSlider />
    </HeroContainer>
  );
};

export default HeroSection;
