// components/ComingSoon.jsx
"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { useLanguage } from "@/Context/Languagecontext"; // Adjust path if needed
import { FaCog } from "react-icons/fa"; // Using a "settings/work" icon

// 1. Define the text content for both languages
const comingSoonData = {
  eng: {
    title: "Page Coming Soon!",
    description:
      "We are working hard to bring you this page. It's under construction, but it will be worth the wait. Please check back later.",
    buttonText: "Go to Homepage",
  },
  ar: {
    title: "الصفحة قيد الإنشاء!",
    description:
      "نحن نعمل بجد لإطلاق هذه الصفحة. إنها قيد الإنشاء حالياً، لكنها ستستحق الانتظار. يرجى التحقق مرة أخرى في وقت لاحق.",
    buttonText: "العودة إلى الصفحة الرئيسية",
  },
};

// 2. Define keyframe animation for the icon
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// 3. Define the styled components
const ComingSoonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh; /* Takes up most of the screen */
  padding: 2rem;
  background-color: #f8f9fa; /* A light, neutral background */
  font-family: "Inter", sans-serif;
  direction: ${(props) => props.dir};
`;

const ContentBox = styled.div`
  text-align: center;
  max-width: 600px;
  width: 100%;
  padding: 3rem 2rem;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
`;

const IconWrapper = styled.div`
  font-size: 4rem;
  color: #66a109; /* Using your brand's green */
  margin-bottom: 1.5rem;
  display: inline-block;

  /* Apply the slow, continuous rotation animation */
  animation: ${rotate} 12s linear infinite;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const HomeButton = styled(Link)`
  display: inline-block;
  background-color: #66a109;
  color: #fff;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #538307;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 161, 9, 0.25);
  }
`;

// 4. The main component logic
const ComingSoon = () => {
  const { language } = useLanguage();
  const content = comingSoonData[language] || comingSoonData.eng;

  return (
    <ComingSoonContainer dir={language === "ar" ? "rtl" : "ltr"}>
      <ContentBox>
        <IconWrapper>
          <FaCog />
        </IconWrapper>
        <Title>{content.title}</Title>
        <Description>{content.description}</Description>
        <HomeButton href="/">{content.buttonText}</HomeButton>
      </ContentBox>
    </ComingSoonContainer>
  );
};

export default ComingSoon;
