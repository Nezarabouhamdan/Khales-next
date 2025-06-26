"use client";
import React from "react";
import styled from "styled-components";
import MissionVisionHeader from "./MissionVisionHeader";
import MissionCard from "./MissionCard";
import VisionCard from "./VisionCard";

const MissionVisionContent = ({
  headerTitle,
  missionTitle,
  missionDescription,
  visionTitle,
  visionDescription,
}) => {
  return (
    <ContentContainer>
      <MissionVisionHeader title={headerTitle} />
      <CardsSection>
        <CardsWrapper>
          <MissionColumn>
            <MissionCard
              title={missionTitle}
              description={missionDescription}
            />
          </MissionColumn>
          <VisionColumn>
            <VisionCard title={visionTitle} description={visionDescription} />
          </VisionColumn>
        </CardsWrapper>
      </CardsSection>
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const CardsSection = styled.div`
  margin-top: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const CardsWrapper = styled.div`
  gap: 20px;
  display: flex;
  max-width: 1200px;
  width: 100%;
  justify-content: center;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const MissionColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const VisionColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

export default MissionVisionContent;
