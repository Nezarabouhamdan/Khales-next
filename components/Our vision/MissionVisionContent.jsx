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
  align-items: stretch;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const CardsSection = styled.div`
  margin-top: 163px;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const CardsWrapper = styled.div`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const MissionColumn = styled.div`
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

const VisionColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 50%;
  margin-left: 00px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

export default MissionVisionContent;
