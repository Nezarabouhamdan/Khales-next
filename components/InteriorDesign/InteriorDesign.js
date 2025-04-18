"use client";
import * as React from "react";
import styled from "styled-components";
import { StatItem } from "./StatItem";
import { ImageSection } from "./ImageSection";
import { GreenText, TextSection, Title } from "../Whoweare/TextContent";
import { useLanguage } from "../../Context/Languagecontext";

const InteriorDesign = ({ data }) => {
  const { language } = useLanguage(); // Use the context

  const MainContainer = styled.section`
    max-width: 1218px;
    margin: 0 auto;
    padding: 75px 0;
    position: relative;
    display: flex;
    flex-direction: ${(props) => (props.$rtl ? "row-reverse" : "row")};
    justify-content: space-between;
    @media (max-width: 991px) {
      flex-direction: column;
      padding: 80px 20px;
    }
  `;

  return (
    <MainContainer $rtl={language === "ar"}>
      <ContentSection $rtl={language === "ar"}>
        <Title>
          {" "}
          <GreenText>{data[0].title}</GreenText>
          {data[0].subtitle}
        </Title>
        <Description>{data[0].description1}</Description>
        <Description>{data[0].description2}</Description>
        <StartProjectButton
          onClick={() => console.log("Start Project clicked")}
          role="button"
          tabIndex={0}
        >
          {language === "ar" ? "ابدأ المشروع" : "Start Project"}
        </StartProjectButton>
      </ContentSection>
      <ImageSection images={data[0].images} />
    </MainContainer>
  );
};

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: ${(props) => (props.$rtl ? "flex-end" : "flex-start")};
  text-align: ${(props) => (props.$rtl ? "right" : "left")};
  @media (max-width: 991px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

const Description = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #545454;
  line-height: 175%;
  margin: 20px 0 30px 0;
  max-width: 559px;
  @media (max-width: 991px) {
    font-size: 20px;
    margin-bottom: 60px;
  }
  @media (max-width: 640px) {
    font-size: 16px;
    margin-bottom: 40px;
  }
`;

const StartProjectButton = styled.div`
  width: 180px;
  height: 60px;
  border-radius: 10px;
  color: #fff;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 129px;
  background-color: #66a109;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #558908;
  }

  &:focus {
    outline: 2px solid #558908;
    outline-offset: 2px;
  }

  @media (max-width: 991px) {
    width: 250px;
    height: 70px;
    font-size: 20px;
    margin-bottom: 60px;
  }
  @media (max-width: 640px) {
    width: 100%;
    height: 60px;
    font-size: 18px;
    margin-bottom: 40px;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 40px;
  @media (max-width: 991px) {
    justify-content: space-around;
    gap: 40px;
  }
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 30px;
  }
`;

export default InteriorDesign;
