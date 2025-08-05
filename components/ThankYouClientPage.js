"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";

// --- Styled Components ---
const ThankYouContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
  background-color: #f8f9fa;
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
  line-height: 1;
  margin-bottom: 1.5rem;
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

const Message = styled.p`
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

// --- The Main Component ---
export default function ThankYouClientPage({ lang, content }) {
  return (
    <ThankYouContainer dir={lang === "ar" ? "rtl" : "ltr"}>
      <ContentBox>
        <IconWrapper>{content.icon}</IconWrapper>
        <Title>{content.title}</Title>
        <Message>{content.message}</Message>
        <HomeButton href={`/${lang}`}>{content.buttonText}</HomeButton>
      </ContentBox>
    </ThankYouContainer>
  );
}
