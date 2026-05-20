"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";

import InteriorDesign from "@/components/InteriorDesign/InteriorDesign";
import OurProcessWork from "@/components/OurProcessWork/OurProcessWork";
import CTASection from "@/components/Homecontact/CTASection";
import { Row2, Column } from "@/utils/Globalstyles";
import { GreenText, Title as Title2 } from "@/components/Whoweare/TextContent";

const HeroSlider = dynamic(() => import("@/components/Slider/Slider"));

// ─── STYLED COMPONENTS ────────────────────────────────────────────────

const ProcessSectionWrapper = styled.section`
  width: 100%;
  padding: 6rem 2rem;
  font-family: "Inter", sans-serif;
  background-color: #ffffff;
  direction: ${({ $lang }) => ($lang === "ar" ? "rtl" : "ltr")};

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const SectionHeader = styled.h2`
  text-align: center;
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 3.5rem;
  color: #111;
  letter-spacing: -0.5px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: #66a109;
  }
`;

const SourcingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const SourcingCard = styled.div`
  background: #fdfdfd;
  border: 1px solid #eaeaea;
  border-radius: 16px;
  padding: 2.5rem;
  text-align: ${({ $lang }) => ($lang === "ar" ? "right" : "left")};
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.05);
    border-color: #66a109;
  }
`;

const SubSectionTitle = styled.h4`
  font-size: 1.4rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 1.25rem;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0.75rem;
`;

const MetaRow = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;

  strong,
  em {
    font-style: normal;
    display: block;
  }

  span {
    color: #555;
    font-weight: 400;
  }
`;

const BulletList = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const BulletItem = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: ${({ $lang }) => ($lang === "ar" ? "row-reverse" : "row")};
  text-align: ${({ $lang }) => ($lang === "ar" ? "right" : "left")};
  background: #fafafa;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: ${({ $lang }) => ($lang === "ar" ? "none" : "4px solid #66a109")};
  border-right: ${({ $lang }) => ($lang === "ar" ? "4px solid #66a109" : "none")};
`;

const BulletIcon = styled.div`
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #66a109;
  margin-top: 6px;
`;

const BulletTitle = styled.strong`
  display: block;
  font-size: 1.1rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 0.4rem;
`;

const BulletText = styled.span`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #555;
`;

const ProcessImage = styled.img`
  width: 300px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;

  @media (max-width: 968px) {
    width: 100%;
    max-width: 400px;
  }
`;

// ─── MAIN COMPONENT ───────────────────────────────────────────────────

export default function PersonalShoppingPage({ lang, content, ctaContent }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!content || !content.intro || !content.process || !content.faq) {
    return null;
  }

  const introData = [
    {
      title: content.intro.title,
      subtitle: content.intro.subtitle,
      description1: content.intro.description1,
      description2: content.intro.description2,
      images: content.intro.images,
    },
  ];

  const processImage =
    content.slides?.[0]?.image || "https://i.ibb.co/rGFt2Dk3/ban-eng-des.png";

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section id="hero" aria-label="hero">
        <HeroSlider
          slides={content.slides || []}
          lang={lang}
          isLoading={isLoading}
          rtl={lang === "ar"}
        />
      </section>

      {/* ── Intro ────────────────────────────────────────────────────── */}
      <InteriorDesign data={introData} lang={lang} />

      {/* ── Sourcing Approaches ───────────────────────────────────────── */}
      {content.sourcingApproaches?.items?.length > 0 && (
        <ProcessSectionWrapper $lang={lang}>
          <Container>
            <SectionHeader>
              {lang === "ar" ? "أساليب التوريد" : "Sourcing Approaches"}
            </SectionHeader>

            <SourcingGrid>
              {content.sourcingApproaches.items.map((item, i) => (
                <SourcingCard key={i} $lang={lang}>
                  <SubSectionTitle>
                    {i === 0
                      ? lang === "ar"
                        ? "التسوق الشخصي الموجه"
                        : "Guided Personal Shopping"
                      : lang === "ar"
                        ? "توريد وتجهيز FF&E الشامل"
                        : "Full-Service FF&E Procurement"}
                  </SubSectionTitle>

                  <MetaRow>
                    <strong>
                      {lang === "ar" ? "التجربة:" : "The Experience:"}
                    </strong>
                    <span>{item.experience}</span>
                  </MetaRow>

                  <MetaRow>
                    <em>{lang === "ar" ? "آلية العمل:" : "How it Works:"}</em>
                    <span>{item.howItWorks}</span>
                  </MetaRow>
                </SourcingCard>
              ))}
            </SourcingGrid>
          </Container>
        </ProcessSectionWrapper>
      )}

      {/* ── Why Clients Trust Us ──────────────────────────────────────── */}
      {content.whyTrust?.items?.length > 0 && (
        <ProcessSectionWrapper
          $lang={lang}
          style={{ backgroundColor: "#fafafa" }}
        >
          <Container>
            <SectionHeader>
              {lang === "ar"
                ? "لماذا يثق العملاء بنا في التوريد؟"
                : "Why Clients Trust Us with Sourcing"}
            </SectionHeader>

            <BulletList>
              {content.whyTrust.items.map((item, i) => (
                <BulletItem key={i} $lang={lang}>
                  <BulletIcon />
                  <div>
                    {item.title && <BulletTitle>{item.title}</BulletTitle>}
                    <BulletText>{item.text || item.content}</BulletText>
                  </div>
                </BulletItem>
              ))}
            </BulletList>
          </Container>
        </ProcessSectionWrapper>
      )}

      {/* ── Process ──────────────────────────────────────────────────── */}
      <Column>
        <Title2>
          {content.process.title}{" "}
          <GreenText>{content.process.highlight}</GreenText>
        </Title2>

        <Row2
          rtl={lang === "ar"}
          style={{
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <OurProcessWork panels={content.process.steps || []} />
          <ProcessImage src={processImage} alt={content.process.title} />
        </Row2>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <Title2>
          {content.faq.title} <GreenText>{content.faq.highlight}</GreenText>
        </Title2>

        <OurProcessWork panels={content.faq.questions || []} />
      </Column>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <CTASection lang={lang} content={ctaContent} />
    </>
  );
}
