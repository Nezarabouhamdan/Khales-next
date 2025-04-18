"use client";
import * as React from "react";
import styled from "styled-components";
import ContentBlock from "./ContentBlock";
import { useLanguage } from "../../Context/Languagecontext";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: SPACE-EVENLY;
  align-items: center;
  width: 100%;
  height: 40vh;
  background-color: #545454;
  font-family: Inter, sans-serif;
  padding: 50px;
  @media (max-width: 991px) {
    height: 100%;
    padding: 20px;
  }
  @media (max-width: 640px) {
    padding: 16px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 48px;
  direction: ${(props) => (props.$rtl ? "rtl" : "ltr")};
  @media (max-width: 991px) {
    flex-direction: column;
    gap: 32px;
  }
  @media (max-width: 640px) {
    gap: 24px;
  }
`;

const Title = styled.h2`
  color: white;
  font-size: 32px;
  margin-bottom: 40px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 30px;
  }
`;

const GreenText = styled.span`
  color: #66a109;
`;

const MissionVisionSection = () => {
  const { language } = useLanguage();

  // Multilingual content
  const content = {
    eng: {
      mission: {
        title: "Mission",
        description:
          "To deliver innovative, sustainable, and results-driven project management and consultancy solutions. We aim to exceed client expectations by combining strategic planning with professional execution, ensuring each project is delivered on time and within budget.",
      },
      vision: {
        title: "Vision",
        description:
          "To be the leading project management consultancy that consistently turns visionary ideas into sustainable and successful projects, while fostering long-term relationships with our clients through trust and excellence.",
      },
      sectionTitle1: "Our Mission",
      sectionTitle2: "& Vision",
    },
    ar: {
      mission: {
        title: "المهمة",
        description:
          "قدم حلولاً مبتكرة ومستدامة لإدارة المشاريع والاستشارات، ترتكز على تحقيق نتائج ملموسة. نسعى جاهدين لتجاوز توقعات عملائنا من خلال دمج التخطيط الاستراتيجي والتنفيذ الاحترافي، مع ضمان تسليم كافة المشاريع في المواعيد المحددة وضمن الميزانية المقررة.",
      },
      vision: {
        title: "الرؤية",
        description:
          "تمثل رؤيتنا في أن نكون الشركة الرائدة في مجال إدارة المشاريع، التي تحول الأفكار الطموحة إلى مشاريع ناجحة ومستدامة، مع بناء علاقات طويلة الأمد مع عملائنا من خلال الثقة والتميز",
      },
      sectionTitle1: "مهمتنا ",
      sectionTitle2: " و رؤيتنا",
    },
  };

  return (
    <Section
      aria-label={language === "ar" ? "المهمة والرؤية" : "Mission and Vision"}
    >
      <Title>
        {language === "ar" ? (
          <>
            <GreenText>&nbsp;{content.ar.sectionTitle1}</GreenText>
            {content.ar.sectionTitle2}
          </>
        ) : (
          <>
            <GreenText>&nbsp;{content.eng.sectionTitle1}</GreenText>{" "}
            {content.eng.sectionTitle2}
          </>
        )}
      </Title>

      <ContentContainer $rtl={language === "ar"}>
        <ContentBlock
          title={content[language].mission.title}
          description={content[language].mission.description}
        />
        <ContentBlock
          title={content[language].vision.title}
          description={content[language].vision.description}
          titleColor="#66a109"
        />
      </ContentContainer>
    </Section>
  );
};

export default MissionVisionSection;
