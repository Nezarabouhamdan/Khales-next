"use client";
import * as React from "react";
import styled from "styled-components";

const StatItem = ({ number, label }) => (
  <StyledStatItem>
    <StatNumber>{number}</StatNumber>
    <StatLabel>{label}</StatLabel>
  </StyledStatItem>
);

const StatsBar= () => {
  return (
    <StatsContainer role="region" aria-label="Company Statistics">
      <StatItem number="10" label="Years" />
      <DividerVertical />
      <StatItem number="200+" label="Projects" />
      <DividerVertical />
      <StatItem number="75" label="Partners" />
    </StatsContainer>
  );
};

const StatsContainer = styled.section`
  position: absolute;
  left: 255px;
  border-radius:10px;
  bottom: 0;
  width: 429px;
  height: 120px;
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-around;
  align-items: center;
  top: 344px;
  background-color: #66a109;

  @media (max-width: 991px) {
    position: relative;
    left: 0;
    margin: 40px auto;
    width: 100%;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    height: auto;
    padding: 20px;
  }
`;

const StyledStatItem = styled.article`
  text-align: center;
  color: #fff;

  @media (max-width: 640px) {
    margin: 10px 0;
  }
`;

const StatNumber = styled.p`
  font-family: "Inter",  sans-serif;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 0.72px;
  margin: 0;
`;

const StatLabel = styled.p`
  font-family: "Inter",  sans-serif;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.36px;
  margin-top: 2px;
  margin: 0;
`;

const DividerVertical = styled.div`
  width: 2px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.43);

  @media (max-width: 640px) {
    display: none;
  }
`;

export default StatsBar;
