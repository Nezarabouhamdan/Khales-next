import React from "react";
import styled from "styled-components";
import { GreenText, Title } from "../Whoweare/TextContent";
import { useLanguage } from "../../Context/Languagecontext";

const contentData = {
  eng: {
    title: ["What", "we do"],
    description:
      "Khales is a leading Engineering Consultancy and Project Management Company, dominating the entire UAE, the Gulf region, and the international market. We specialize in providing luxury engineering services, delivering excellence in design, construction, and project management.",
  },
  ar: {
    title: ["ما", "نقدمه"],
    description:
      "خالدز هي شركة رائدة في الاستشارات الهندسية وإدارة المشاريع، تهيمن على كامل الإمارات العربية المتحدة ومنطقة الخليج والسوق الدولي. نختص بتقديم خدمات هندسية فاخرة، نقدم التميز في التصميم والبناء وإدارة المشاريع.",
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
  align-items: ${(props) => (props.$rtl ? "flext-end" : "flex-end")};
  margin-bottom: 6%;
  width: 32%;
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
