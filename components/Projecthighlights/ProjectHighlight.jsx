"use client";
import React from "react";
import styled from "styled-components";
import ProjectHeader from "./ProjectHeader";
import HeroSection from "./HeroSection";
import ContentSection from "./ContentSection";
import ImageGallery from "./ImageGallery";
import { StyledButton } from "../Homecontact/CTAButton";
const ProjectHighlightContainer = styled.article`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 20px;
  font-family: "Inter", sans-serif;
  background-color: #f6f5f5;
  text-align: left;
`;
const ProjectHighlight = ({ data }) => {
  return (
    <>
      <ProjectHighlightContainer>
        <ProjectHeader
          style={{ textAlign: "left" }}
          Subtitle={data[0].Subtitle}
          Subheader={data[0].Subheader}
        />
        <HeroSection img={data[0].mainimage} />
        <ContentSection data={data[0].description} />

        {/* <ImageGallery images={data[0].images} /> */}
      </ProjectHighlightContainer>
    </>
  );
};
export default ProjectHighlight;
