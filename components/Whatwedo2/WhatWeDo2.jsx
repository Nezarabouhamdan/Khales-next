"use client";
import React from "react";
import styled from "styled-components";
import { ContentSection } from "./ContentSection";
import CubeSwiper from "../CubeSwiper/CubeSwiper";

const WhatWeDo2 = ({ rtl }) => {

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <StyledSection $rtl={rtl}>
        <ContentSection />
        <CubeSwiper />
      </StyledSection>
    </>
  );
};
const StyledSection = styled.section`
  box-sizing: border-box;
  flex-direction: ${(props) => (props.$rtl ? "row-reverse" : "row")};
  display: flex;
  padding: 40px;
  gap: 60px;
  max-width: 1286px;
  margin: 0 auto;
  background-color: #ffffff;
  justify-content: space-between;
  align-items: center;
  min-height: 60vh;
  width: 100%;
  @media (max-width: 991px) {
    flex-direction: column;
    padding: 20px;
    gap: 30px;
    text-align: center;
  }
  @media (max-width: 640px) {
    padding: 15px;
    gap: 20px;
  }
`;
export default WhatWeDo2;
