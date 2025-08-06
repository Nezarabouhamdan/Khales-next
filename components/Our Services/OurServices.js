// components/Our Services/OurServices.js
"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaArrowRight,
  FaStar,
  FaProjectDiagram,
  FaBullseye,
  FaClipboardCheck,
  FaTasks,
} from "react-icons/fa";
import LazyImage from "../LazyImage"; // Assuming this path is correct

const servicesConfig = [
  {
    showcase: {
      icon: <FaStar />,
      image: "https://i.ibb.co/pGxx8cp/ENG.png",
    },
    features: [{ icon: <FaProjectDiagram /> }, { icon: <FaClipboardCheck /> }],
  },
  {
    showcase: {
      icon: <FaTasks />,
      image: "https://i.ibb.co/SwLmzSCw/PM.png",
    },
    features: [{ icon: <FaBullseye /> }, { icon: <FaClipboardCheck /> }],
  },
];

// --- STYLED COMPONENTS (WITH LAYOUT FIX) ---
const ServicesContainer = styled.section`
  width: 100%;
  padding: 6rem 0; /* Vertical padding only */
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
  overflow: hidden; /* Prevent any accidental overflow */

  @media (max-width: 992px) {
    padding: 4rem 0;
    gap: 4rem;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: 0 2rem; /* Horizontal padding is now contained */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;

  @media (max-width: 992px) {
    gap: 4rem;
    padding: 0 1.5rem;
  }
`;

const BackgroundImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  transition: transform 0.4s ease;
  border-radius: 20px;
  overflow: hidden;
`;

const ShowcaseCard = styled.div`
  position: relative;
  border-radius: 20px;
  padding: 2rem;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  overflow: hidden;
  isolation: isolate;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
    z-index: -1;
  }
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    ${BackgroundImageWrapper} {
      transform: scale(1.05);
    }
  }
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  max-width: 700px;
  /* FIXED: Changed from h1 to h2 */
  h2 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #1a1a1a;
  }
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #555;
  }
  @media (max-width: 768px) {
    h2 {
      font-size: 2.5rem;
    }
  }
`;

const ServiceRow = styled(motion.div)`
  display: flex;
  width: 100%;
  max-width: 1100px; /* Ensures content doesn't stretch too wide */
  gap: 3rem;
  align-items: center;
  flex-direction: ${(props) => (props.$isReversed ? "row-reverse" : "row")};
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const ShowcaseColumn = styled(motion.div)`
  flex: 1;
  min-width: 300px;
  width: 100%;
`;

const ShowcaseIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  color: #fff;
`;

const ShowcaseSubCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
`;

const TextColumn = styled(motion.div)`
  flex: 1.2;
`;

const ServiceTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
  span {
    color: #66a109;
  }
`;

const ServiceDescription = styled.p`
  color: #555;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #1a1a1a;
  }
  p {
    font-size: 0.9rem;
    color: #666;
    line-height: 1.6;
  }
  .icon {
    color: #66a109;
  }
`;

const ExploreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #66a109;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: gap 0.3s ease;
  .arrow-icon {
    transition: transform 0.3s ease;
  }
  &:hover .arrow-icon {
    transform: ${({ lang }) =>
      lang === "ar" ? "translateX(-4px)" : "translateX(4px)"};
  }
`;

// --- MAIN COMPONENT (Refactored Logic) ---
export default function OurServices({ lang, content }) {
  if (!content || !content.header || !content.items) {
    return null;
  }

  return (
    <ServicesContainer lang={lang}>
      <ContentWrapper>
        <SectionHeader
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          {/* FIXED: Changed h1 to h2 */}
          <h2>{content.header.title}</h2>
          <p>{content.header.subtitle}</p>
        </SectionHeader>

        {content.items.map((serviceText, index) => {
          const serviceConfig = servicesConfig[index];
          const serviceUrl = `/${lang}/services/${serviceText.slug}`;

          return (
            <ServiceRow key={serviceText.title} $isReversed={index % 2 !== 0}>
              <ShowcaseColumn>
                <ShowcaseCard>
                  <BackgroundImageWrapper>
                    <LazyImage
                      src={serviceConfig.showcase.image}
                      alt={`Showcase for ${serviceText.title}`}
                      fill
                      sizes="(max-width: 992px) 90vw, 45vw"
                    />
                  </BackgroundImageWrapper>
                  <ShowcaseIcon>{serviceConfig.showcase.icon}</ShowcaseIcon>
                  <div>
                    <ShowcaseSubCard>
                      {serviceText.showcaseSubtitle}
                    </ShowcaseSubCard>
                  </div>
                </ShowcaseCard>
              </ShowcaseColumn>

              <TextColumn>
                <motion.div>
                  {/* FIXED: Changed ServiceTitle to h3 for better hierarchy */}
                  <ServiceTitle as="h3">
                    {serviceText.title} <span>{serviceText.highlight}</span>
                  </ServiceTitle>
                  <ServiceDescription>
                    {serviceText.description}
                  </ServiceDescription>
                </motion.div>
                {Array.isArray(serviceText.features) && (
                  <FeaturesGrid>
                    {serviceText.features.map((feature, featureIndex) => (
                      <motion.div key={feature.title}>
                        <FeatureCard>
                          <h4>
                            <span className="icon">
                              {serviceConfig.features[featureIndex]?.icon}
                            </span>
                            {feature.title}
                          </h4>
                          <p>{feature.description}</p>
                        </FeatureCard>
                      </motion.div>
                    ))}
                  </FeaturesGrid>
                )}
                <motion.div>
                  <ExploreLink href={serviceUrl} lang={lang}>
                    {serviceText.linkText}
                    <FaArrowRight
                      className="arrow-icon"
                      style={{
                        transform: lang === "ar" ? "scaleX(-1)" : "scaleX(1)",
                      }}
                    />
                  </ExploreLink>
                </motion.div>
              </TextColumn>
            </ServiceRow>
          );
        })}
      </ContentWrapper>
    </ServicesContainer>
  );
}
