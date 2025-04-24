import React from "react";
import styled from "styled-components";
import { GreenText, Title } from "../Whoweare/TextContent";
import { useLanguage } from "../../Context/Languagecontext";

const contentData = {
  eng: {
    title: ["What", "we do"],
    description:
      "At Khales Project Management, we bring your vision to life with comprehensive project management and consultancy services. From architectural design to construction and fit-out solutions, we deliver turnkey projects that combine innovation, quality, and efficiency. Whether it’s residential, commercial, or industrial, we ensure that every project is executed with precision and meets the highest standards.",
  },
  ar: {
    title: ["ما", "نقدمه"],
    description:
      "في خالص لإدارة المشاريع، نحول رؤاكم إلى واقع ملموس من خلال خدمات إدارة المشاريع والاستشارات الشاملة. بدءًا من التصميم المعماري وصولًا إلى الإنشاءات وحلول التشطيبات، نقدم مشاريع متكاملة تجمع بين الابتكار والجودة والكفاءة. سواء كان المشروع سكنيًا، تجاريًا أو صناعيًا، نضمن تنفيذ كل مشروع بدقة فائقة وفقًا لأعلى المعايير.",
  },
};

export const ContentSection = () => {
  const { language } = useLanguage();
  const content = contentData[language] || contentData.eng;

  return (
    <StyledArticle $rtl={language === "ar"}>
      <Title>
        <GreenText>{content.title[0]}</GreenText> {content.title[1]}
      </Title>
      <Description>{content.description}</Description>
    </StyledArticle>
  );
};

const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) => (props.$rtl ? "flext-end" : "flex-start")};
  margin-bottom: 6%;
  width: 45%;
  gap: 2rem;
  text-align: ${(props) => (props.$rtl ? "right" : "left")};

  @media (max-width: 980px) {
    align-items: center;
    width: 82%;
    text-align: center;
  }
`;

const Description = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333333;
  max-width: 600px;

  @media (max-width: 640px) {
    font-size: 14px;
  }
`;
