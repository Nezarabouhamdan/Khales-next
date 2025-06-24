"use client";
import React from "react";
import styled from "styled-components";
import MissionVisionContent from "./MissionVisionContent";

const MissionVision = ({
  imageSrc = "https://cdn.builder.io/api/v1/image/assets/TEMP/ee6edeb3b1df6fe35fb7e5bb8d016128890e891f?placeholderIfAbsent=true",
  imageAlt = "Mission and Vision illustration",
  headerTitle = "Mission & Vision",
  missionTitle = "Our Mission",
  missionDescription = "To deliver innovative, sustainable, and results-driven project management and consultancy solutions. We aim to exceed client expectations by combining strategic planning with professional execution, ensuring each project is delivered on time and within budget.",
  visionTitle = "Our Vision",
  visionDescription = "To be the leading project management consultancy that consistently turns visionary ideas into sustainable and successful projects, while fostering long-term relationships with our clients through trust and excellence.",
}) => {
  return (
    <MainContainer>
      <ContentWrapper>
        <LayoutContainer>
          <ImageColumn>
            <HeroImage src={imageSrc} alt={imageAlt} />
          </ImageColumn>
          <ContentColumn>
            <MissionVisionContent
              headerTitle={headerTitle}
              missionTitle={missionTitle}
              missionDescription={missionDescription}
              visionTitle={visionTitle}
              visionDescription={visionDescription}
            />
          </ContentColumn>
        </LayoutContainer>
      </ContentWrapper>
    </MainContainer>
  );
};

const MainContainer = styled.section`
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  padding: 128px 70px;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  @media (max-width: 991px) {
    padding: 100px 20px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1645px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const LayoutContainer = styled.div`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 50%;
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const HeroImage = styled.img`
  aspect-ratio: 1.68;
  object-fit: contain;
  object-position: center;
  width: 100%;
  margin-top: auto;
  margin-bottom: auto;
  align-self: stretch;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 50%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

export default MissionVision;
