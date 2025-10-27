"use client";

import React from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import { motion } from "framer-motion";

const Section = styled.section`
  position: relative;
  padding: 6rem 2rem;
  background-image: url(${({ imageUrl }) => imageUrl});
  background-size: cover;
  background-position: center;
  border-radius: 24px;
  overflow: hidden;
  margin: 5rem auto;
  max-width: 1200px;
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ lang }) =>
      lang === "ar"
        ? "linear-gradient(285deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.2) 100%)"
        : "linear-gradient(75deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.2) 100%)"};
    z-index: 1;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const TextContent = styled(motion.div)`
  max-width: 600px;
  ${({ lang }) =>
    lang === "ar"
      ? css`
          margin-right: 0;
          margin-left: auto;
          text-align: right;
        `
      : css`
          margin-left: 0;
          margin-right: auto;
          text-align: left;
        `}
`;

const Title = styled.h2`
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 1.5rem;
  line-height: 1.3;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #e5e7eb;
  margin-bottom: 2.5rem;
  line-height: 1.7;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: #66a109; /* Brighter green for better contrast */
  color: #fff;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #7ab430;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(102, 161, 9, 0.2);
  }
`;

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function VillaCostEstimatorCTA({ lang, content }) {
  if (!content) return null;

  return (
    <Section lang={lang} imageUrl={content.imageUrl}>
      <Container>
        <TextContent
          lang={lang}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={textVariants}
        >
          <Title>{content.title}</Title>
          <Description>{content.description}</Description>
          <CTAButton href={`/${lang}/Calc`}>{content.buttonText}</CTAButton>
        </TextContent>
      </Container>
    </Section>
  );
}
