"use client";
import React from "react";
import styled from "styled-components";

const ProjectOverview = ({ title, description }) => {
  return (
    <OverviewSection>
      <SectionTitle>{title}</SectionTitle>
      <Description>{description}</Description>
    </OverviewSection>
  );
};

const OverviewSection = styled.section`
  margin-top: 78px;
  font-family:
    Be Vietnam,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const SectionTitle = styled.h2`
  color: #000;
  font-size: 25px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0;
`;

const Description = styled.p`
  color: #a6afb5;
  font-size: 18px;
  font-weight: 400;
  line-height: 25px;
  margin: 30px 0 0 0;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export default ProjectOverview;
