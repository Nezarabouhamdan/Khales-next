import React from "react";
import styled from "styled-components";
import { GreenText } from "../Whoweare/TextContent";
import { useLanguage } from "../../Context/Languagecontext";

const HeaderContainer = styled.header`
  margin-bottom: 30px;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
  @media (max-width: 640px) {
    padding: 0 10px;
  }
`;

const Title = styled.h2`
  color: #707075;
  font-size: 39px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: ${(props) => (props.$rtl ? "right" : "left")};
  @media (max-width: 991px) {
    font-size: 20px;
  }
  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

const SubTitle = styled.h1`
  font-size: 30px;
  font-weight: 400;
  color: #707075;
  margin-bottom: 5px;
  margin-top: 30px;
  text-align: ${(props) => (props.$rtl ? "right" : "left")};

  @media (max-width: 991px) {
    font-size: 28px;
  }
  @media (max-width: 640px) {
    font-size: 24px;
  }
`;

const SubHeader = styled.h3`
  font-size: 24px;
  color: #707075;
  text-align: ${(props) => (props.$rtl ? "right" : "left")};

  font-weight: 400;
  @media (max-width: 991px) {
    font-size: 20px;
  }
  @media (max-width: 640px) {
    font-size: 18px;
  }
`;
const title = {
  eng: [{ title: "case", green: "studies" }],
  ar: [{ title: "دراسة", green: "المشروع" }],
};
const ProjectHeader = ({ Subtitle, Subheader }) => {
  const { language } = useLanguage();

  return (
    <HeaderContainer>
      <Title $rtl={language === "ar"}>
        {title[language][0].title}{" "}
        <GreenText>
          {title[language][0].green}
        </GreenText>
      </Title>
      <SubTitle $rtl={language === "ar"}>{Subtitle}</SubTitle>
      <SubHeader $rtl={language === "ar"}>{Subheader}</SubHeader>
    </HeaderContainer>
  );
};

export default ProjectHeader;
