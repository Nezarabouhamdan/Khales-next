"use client";

import * as React from "react";
import styled from "styled-components";
import { CTAButton } from "./CTAButton";
import img from "../../public/assets/Porjects/1f5a52c5-139a-4684-a5ee-44d694eb301a.jpeg";
import { useLanguage } from "../../Context/Languagecontext"; // Import the language context
import Image from "next/image";

const Section = styled.section`
  overflow: hidden;
  font-family: Inconsolata, -apple-system, Roboto, Helvetica, sans-serif;
  color: #737373;
  font-weight: 700;
  position: relative;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 600px;
  width: 100%;
  padding: 78px 80px;
  align-items: start;
  justify-content: space-evenly;
  @media (max-width: 991px) {
    min-height: 400px;
    max-width: 100%;
    padding: 78px 20px;
  }
`;

const BackgroundImage = styled(Image)`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: fill;
  object-position: center;
`;

const Heading = styled.h2`
  position: relative;
  font-size: 60px;
  font-family: "Playfair";
  line-height: 84px;
  color: black;
  letter-spacing: 0.8px;
  width: 45%;
  margin: 0;
  margin-top: 200px;
  text-align: ${(props) =>
    props.$language === "ar" ? "right" : "left"}; // RTL support
 @media (max-width: 991px) {
    width: 100%;
    max-width: 100%;
    font-size: 25px;
    line-height: 34px;
  }
`;

const Description = styled.p`
  position: relative;
  font-size: 16px;
  color: rgb(212, 212, 212);

  font-weight: 500;
  line-height: 20px;
  margin: 25px 0;
  width: 533px;
  text-align: ${(props) =>
    props.$language === "ar" ? "right" : "left"}; // RTL support
  @media (max-width: 991px) {
    width: 80%;
    font-size: 12px;
    max-width: 100%;
  }
`;

export default function CTASection() {
  const { language } = useLanguage(); // Get the current language

  // Dynamic content based on language
  const content = {
    eng: {
      heading: (
        <>
          <span style={{ color: "white" }}>
            Looking for expert solutions? Let’s talk!
          </span>
        </>
      ),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing dui tellus commodo convallis.",
      buttonText: "Book Your Consultation",
    },
    ar: {
      heading: (
        <span style={{ color: "white" }}>تبحث عن حلول خبراء؟ لنتحدث</span>
      ),
      description:
        "لوريم إيبسوم هو نص نموذجي يستخدم في صناعة الطباعة والتنضيد. لوريم إيبسوم هو نص نموذجي يستخدم في صناعة الطباعة والتنضيد.",
      buttonText: "احجز استشارتك",
    },
  };

  return (
    <Section id="consultation-call-to-action" aria-label="Consultation Call to Action">
      <ContentWrapper>
        <BackgroundImage loading="lazy" src={img} aria-hidden="true" alt="Consultation Call to Action" />
        <Heading $language={language}>{content[language].heading}</Heading>
        <Description $language={language}>
          {content[language].description}
        </Description>
        <CTAButton>{content[language].buttonText}</CTAButton>
      </ContentWrapper>
    </Section>
  );
}
