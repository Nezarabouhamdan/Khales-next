"use client";
import React from "react";
import styled from "styled-components";
import HeroSection from "./HeroSection";
import StatCard from "./StatCard";

const StatisticsSection = () => {
  const statsData = [
    {
      number: "100+",
      title: "Projects Done",
      description:
        "Li Europan lingues es membres del sam familie. Lor separat existentie",
      backgroundColor: "rgba(0, 0, 0, 1)",
    },
    {
      number: "100+",
      title: "Projects Done",
      description:
        "Li Europan lingues es membres del sam familie. Lor separat existentie",
      backgroundColor: "rgba(102, 161, 9, 1)",
    },
    {
      number: "100+",
      title: "Projects Done",
      description:
        "Li Europan lingues es membres del sam familie. Lor separat existentie",
      backgroundColor: "rgba(0, 0, 0, 1)",
    },
  ];

  return (
    <MainSection>
      <ContentContainer>
        <HeroSection
          backgroundImage="https://cdn.builder.io/api/v1/image/assets/TEMP/d4cc9d615247976726bbb3329fe81e16259b5379?placeholderIfAbsent=true"
          title="Crafting Your Value Proposition"
        />
        <StatsContainer>
          <StatsGrid>
            {statsData.map((stat, index) => (
              <StatCard
                key={index}
                number={stat.number}
                title={stat.title}
                description={stat.description}
                backgroundColor={stat.backgroundColor}
              />
            ))}
          </StatsGrid>
        </StatsContainer>
      </ContentContainer>
    </MainSection>
  );
};

const MainSection = styled.section`
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  padding: 106px 80px;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  @media (max-width: 991px) {
    padding: 100px 20px;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1450px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const StatsContainer = styled.div`
  margin-top: 75px;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const StatsGrid = styled.div`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: center;
    gap: 0px;
  }
`;

export default StatisticsSection;
