"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import ExamSection from "@/pages/ExamSection";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  padding-top: 90px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  font-family: "Inter", sans-serif;
  padding: 80px 24px 100px;
  direction: ${({ $isRtl }) => ($isRtl ? "rtl" : "ltr")};

  @media (max-width: 991px) {
    padding: 60px 20px 80px;
  }
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  animation: ${fadeUp} 0.4s ease both;
`;

const PageTitle = styled.h1`
  font-family: "Playfair", serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 10px;

  @media (max-width: 640px) {
    font-size: 1.7rem;
  }
`;

const GreenSpan = styled.span`
  color: #66a109;
`;

const PageSubtitle = styled.p`
  font-size: 0.88rem;
  color: #888;
  margin: 0;
  letter-spacing: 0.03em;
`;

export default function ExamPage({ lang, content }) {
  const isRtl = lang === "ar";

  if (!content) return null;

  return (
    <PageWrapper>
      <Container $isRtl={isRtl} dir={isRtl ? "rtl" : "ltr"}>
        <PageHeader>
          <PageTitle>
            {isRtl ? (
              <>
                {content.exam.title} <GreenSpan>✦</GreenSpan>
              </>
            ) : (
              <>
                Knowledge <GreenSpan>Assessment</GreenSpan>
              </>
            )}
          </PageTitle>
          <PageSubtitle>{content.exam.subtitle}</PageSubtitle>
        </PageHeader>

        <ExamSection lang={lang} content={content.exam} />
      </Container>
    </PageWrapper>
  );
}
