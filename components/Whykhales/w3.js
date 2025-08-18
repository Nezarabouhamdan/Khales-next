// components/Whykhales/w3.js
"use client";

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaHammer, FaSlidersH, FaClock, FaHome } from "react-icons/fa";
import ImageWithSkeleton from "../ImageSkeleton";

const featureAssets = [
  {
    icon: <FaHammer />,
    imageUrl: "https://i.ibb.co/vvqTFHVf/QUA.png",
  },
  {
    icon: <FaSlidersH />,
    imageUrl: "https://i.ibb.co/8LXtFg73/DES.png",
  },
  {
    icon: <FaClock />,
    imageUrl: "https://i.ibb.co/7xJBNrH5/CLEAR.png",
  },
];

// --- STYLED COMPONENTS (WITH IMPROVED HEADING STRUCTURE) ---
const kenBurns = keyframes`
  0% { transform: scale(1.0); }
  100% { transform: scale(1.1); }
`;
const SectionContainer = styled.section`
  width: 100%;
  padding: 6rem 0;
  background-color: #f8f9fa; // خلفية بلون رمادي فاتح لكسر الروتين
  position: relative;
  overflow: hidden;
  font-family: "Inter", sans-serif;
  direction: ${(props) => (props.dir === "rtl" ? "rtl" : "ltr")};
  @media (max-width: 992px) {
    padding: 4rem 0;
  }
`;
const ContentWrapper = styled(motion.div)`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  @media (max-width: 992px) {
    padding: 0 1.5rem;
  }
`;
const Header = styled.div`
  text-align: center;
`;
const Label = styled.p`
  color: #66a109;
  font-weight: 600;
  margin-bottom: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex-direction: ${(props) => (props.dir === "rtl" ? "row-reverse" : "row")};
`;

// IMPROVED: Changed from h1 to h2 to avoid multiple H1s on page
const MainTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;
const FeatureCard = styled(motion.div)`
  text-align: ${(props) => (props.dir === "rtl" ? "right" : "left")};
  padding: 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  border: 1px solid #e9ecef;
  background-color: #ffffff;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover,
  &.active {
    transform: translateY(-8px);
    border-color: #66a109;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
  }
`;
const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: #66a109;
  margin-bottom: 1rem;
  display: flex;
  justify-content: ${(props) =>
    props.dir === "rtl" ? "flex-end" : "flex-start"};
`;

// IMPROVED: Changed from h2 to h3 for better hierarchy
const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
  line-height: 1.3;
`;

const FeatureDescription = styled.p`
  color: #6c757d;
  line-height: 1.6;
  font-size: 0.95rem;
`;
const ImageSection = styled.div`
  width: 100%;
  max-width: 1100px;
  height: 500px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
`;
const FeatureImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: ${kenBurns} 20s ease-in-out infinite alternate;
`;

// Decorative shapes (unchanged)
const DecorativeShape1 = styled.div`
  position: absolute;
  top: 10%;
  right: -5%;
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #66a109, #8bc34a);
  border-radius: 50%;
  opacity: 0.1;
  z-index: 1;
`;
const DecorativeShape2 = styled.div`
  position: absolute;
  bottom: 15%;
  left: -8%;
  width: 150px;
  height: 150px;
  background: linear-gradient(45deg, #66a109, #4caf50);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  opacity: 0.08;
  z-index: 1;
`;
const AnimatedImage = styled(ImageWithSkeleton)`
  animation: ${kenBurns} 20s ease-in-out infinite alternate;
`;
// --- MAIN COMPONENT ---
export default function WhyKhalesHybrid({ content = {}, lang = "en" }) {
  const [activeFeature, setActiveFeature] = useState(0);
  const dir = lang === "ar" ? "rtl" : "ltr";

  // Auto-cycle through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % (content.features?.length || 3));
    }, 4000);
    return () => clearInterval(interval);
  }, [content.features?.length]);

  // Fallback content
  const fallbackContent = {
    label: lang === "ar" ? "لماذا تختار خالص" : "Why Choose Khales",
    title:
      lang === "ar" ? "بناء ما هو أكثر من مخطط" : "Building Beyond a Blueprint",
    features: [
      {
        title: lang === "ar" ? "جودة يمكن قياسها" : "Quality You Can Measure",
        description:
          lang === "ar"
            ? "نطبق معايير واضحة في كل مرحلة من مراحل المشروع لضمان التميز في التنفيذ."
            : "We apply clear standards at every stage of the project to ensure excellence in execution.",
      },
      {
        title:
          lang === "ar"
            ? "تصميم بهدف ودقة"
            : "Design with Purpose and Precision",
        description:
          lang === "ar"
            ? "كل مساحة مصممة لتلبية الاحتياجات الحقيقية مع الاهتمام بأدق التفاصيل."
            : "Every space is tailored to meet real needs with attention to the finest details.",
      },
      {
        title:
          lang === "ar"
            ? "عملية واضحة وتسليم موثوق"
            : "Clear Process. Reliable Delivery",
        description:
          lang === "ar"
            ? "نهجنا شفاف ومدفوع بالمواعيد النهائية لضمان تسليم المشاريع في الوقت المحدد."
            : "Our approach is transparent and deadline-driven to ensure timely project delivery.",
      },
    ],
  };

  const displayContent = { ...fallbackContent, ...content };

  return (
    <SectionContainer dir={dir}>
      <DecorativeShape1 />
      <DecorativeShape2 />

      <ContentWrapper
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Header>
          <Label dir={dir}>{displayContent.label}</Label>
          <MainTitle>{displayContent.title}</MainTitle>
        </Header>

        <FeaturesGrid>
          {displayContent.features.map((feature, index) => (
            <FeatureCard
              key={index}
              className={activeFeature === index ? "active" : ""}
              onClick={() => setActiveFeature(index)}
              dir={dir}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FeatureIcon dir={dir}>{featureAssets[index]?.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>

        <ImageSection>
          <AnimatePresence mode="wait">
            {/* 
              MODIFIED: Replaced the old FeatureImage with our new AnimatedImage.
              Framer Motion animates this component directly. The component handles
              the skeleton loading, and its styled-component wrapper handles the
              Ken Burns effect.
            */}
            <AnimatedImage
              key={activeFeature}
              src={featureAssets[activeFeature]?.imageUrl}
              alt={displayContent.features[activeFeature]?.title}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
            />
          </AnimatePresence>
        </ImageSection>
      </ContentWrapper>
    </SectionContainer>
  );
}
