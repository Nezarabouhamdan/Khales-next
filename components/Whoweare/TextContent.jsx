"use client";
import React from "react";
import styled from "styled-components";
import { useLanguage } from "../../Context/Languagecontext";
import Link from "next/link";

const content = {
  eng: [
    {
      title: "Khalesssss",
      green: "Group",
      content:
        "At Khales Project Management, we turn ideas into reality with expert architecture, construction, and fit-out solutions. Whether its a luxury development, commercial space, or residential project, we deliver turnkey solutions with precision, efficiency, and innovation. No delays, no compromises—just results that exceed expectations.",
      button: "Learn More",
    },
  ],
  ar: [
    {
      title: "مجموعة",
      green: "خالص",
      content:
        "تُعدّ خالص لإدارة المشاريع بوابتك لتحويل الأفكار إلى واقع ملموس، وذلك بتطبيق أعلى معايير الهندسة المعمارية والإنشاءات والتشطيبات الداخلية. سواء كان مشروعك فاخرًا، تجاريًا، أو سكنيًا، فإننا نقدم حلولًا متكاملة تتميز بالدقة والكفاءة والابتكار. نلتزم بتحقيق نتائج تتجاوز توقعاتك، دون أي تأخير أو تنازلات",
      button: "أعرف المزيد",
    },
  ],
};

const TextContent = () => {
  const { language } = useLanguage(); // Use the context
  const selectedcontent = content[language] || content["eng"];
  return (
    <TextSection rtl={language === "ar"}>
      <Title>
        {selectedcontent[0].title}
        <GreenText> {selectedcontent[0].green}</GreenText>
      </Title>
      <Description>{selectedcontent[0].content}</Description>
      <Link href={"/ABOUTUS"}>
        <LearnMoreButton
          role="button"
          tabIndex={0}
          onClick={() => {}}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              // Handle click
            }
          }}
        >
          {selectedcontent[0].button}
        </LearnMoreButton>
      </Link>
    </TextSection>
  );
};

export const TextSection = styled.div`
  flex: 2 0 100%;
  max-width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: ${({ rtl }) => (rtl ? "flex-end" : "space-around")};
  text-align: ${({ rtl }) => (rtl ? "right" : "left")};
  height: 40vh;
  @media (max-width: 991px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 50px;
  font-weight: 600;
  color: rgb(0, 0, 0);
  margin-bottom: 20px;
  line-height: 60px;
  @media (max-width: 640px) {
    font-size: 32px;
  }
`;

export const GreenText = styled.span`
  color: rgb(0, 0, 0);
`;

const Description = styled.p`
  font-size: 16px;
  color: #838383;
  margin-bottom: 15px;
  font-family: "Playfair ";
  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

const LearnMoreButton = styled.button`
  padding: 12px 30px;
  background-color: rgb(102, 161, 9);
  font-size: 16px;

  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.2s ease;
  width: 200px;
  &:hover,
  &:focus {
    background-color: #404040;
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid #66a109;
    outline-offset: 2px;
  }
`;

export default TextContent;
