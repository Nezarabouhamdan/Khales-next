"use client";
import React from "react";
import styled from "styled-components";

const VisionCard = ({ title, description }) => {
  return (
    <VisionContainer>
      <VisionTitle>{title}</VisionTitle>
      <VisionDescription>{description}</VisionDescription>
    </VisionContainer>
  );
};

const VisionContainer = styled.section`
  background-color: rgb(0, 0, 0);
  display: flex;
  flex-grow: 1;
  padding: 36px 10px 36px 47px;
  flex-direction: column;
  align-items: start;
  font-family: Manrope, -apple-system, Roboto, Helvetica, sans-serif;
  color: #fff;
  width: 100%;
  @media (max-width: 991px) {
    margin-top: 40px;
    padding-left: 20px;
  }
`;

const VisionTitle = styled.h2`
  color: #fff;
  font-size: 35px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.39px;
  margin: 0;
`;

const VisionDescription = styled.p`
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: -0.2px;
  margin-top: 78px;
  margin-bottom: 0;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

export default VisionCard;
