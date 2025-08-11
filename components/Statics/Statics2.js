// components/Statics/Statics2.js
"use client";

import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  motion,
  useInView,
  animate,
  useScroll,
  useTransform,
} from "framer-motion";
import { FaBuilding, FaRegThumbsUp, FaRegCalendarCheck } from "react-icons/fa";

// Static data for icons and values can remain
const statsData = [
  { icon: <FaBuilding />, value: 120, suffix: "+" },
  { icon: <FaRegThumbsUp />, value: 98, suffix: "%" },
  { icon: <FaRegCalendarCheck />, value: 15, suffix: "+" },
];

// --- STYLED COMPONENTS (IMPROVED HEADING STRUCTURE) ---
const slowZoom = keyframes`
  from { transform: scale(1.05); }
  to { transform: scale(1.2); }
`;
const SectionContainer = styled.div`
  position: relative;
  background-color: #ffffff;
  font-family: ${(({ lang }) =>
    lang === "ar" ? "var(--font-tajawal)" : "var(--font-inter)",
  "sans-serif")};
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
`;
const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(18, 18, 18, 0.5);
  z-index: 2;
`;
const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 3;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;
const SkeletonOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: #282828;
  background-image: linear-gradient(
    to right,
    #282828 8%,
    #4d4d4d 38%,
    #282828 54%
  );
  background-size: 2000px 100%;
  animation: ${shimmer} 1.5s linear infinite;
`;
const ImageBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${(props) =>
    props.$isLoaded
      ? `url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80")`
      : "none"};
  background-size: cover;
  background-position: center;
  z-index: 1;
  animation: ${slowZoom} 25s linear infinite alternate;
  will-change: transform;
  /* Add a smooth transition for opacity */
  transition: opacity 0.8s ease-in-out;
  opacity: ${(props) => (props.$isLoaded ? 1 : 0)};
`;
// IMPROVED: Changed from h1 to h2 to avoid multiple H1s on page
const MainHeading = styled.h2`
  font-size: 4.5rem;
  font-weight: 700;
  max-width: 900px;
  line-height: 1.2;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

const MainDescription = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StatsPanel = styled.div`
  background-color: #ffffff;
  padding: 6rem 2rem;
  position: relative;
  z-index: 4;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  border-radius: 16px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-color: #66a109;
  }
`;

const StatIcon = styled.div`
  font-size: 3rem;
  color: #66a109;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
`;

const StatNumber = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

// IMPROVED: Changed from h3 to h4 for better hierarchy
const StatLabel = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #6c757d;
  margin: 0;
  line-height: 1.4;
`;

// Counter component for animated numbers
const AnimatedCounter = ({ value, suffix = "", duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(0, value, {
        duration,
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(latest) + suffix;
          }
        },
      });
    }
  }, [isInView, value, suffix, duration]);

  return <StatNumber ref={ref}>0{suffix}</StatNumber>;
};

// --- MAIN COMPONENT ---
export default function ValuePropositionV2({ content = {}, lang = "en" }) {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // MODIFIED: Effect to preload the background image
  useEffect(() => {
    const imageUrl =
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80";
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => {
      setIsImageLoaded(true);
    };
  }, []); // Run only once on component mount
  // Fallback content
  const fallbackContent = {
    title: lang === "ar" ? "إطلاق إمكاناتك" : "Unlocking Your Potential",
    description:
      lang === "ar"
        ? "نحن نجمع بين الخبرة العميقة في الصناعة والحلول المبتكرة لتحقيق رؤيتك المعمارية."
        : "We combine deep industry expertise with innovative solutions to bring your architectural vision to life.",
    stats: [
      {
        label: lang === "ar" ? "مشاريع مكتملة" : "Projects Completed",
        description:
          lang === "ar"
            ? "تم تسليمها عبر النطاقات السكنية والمعمارية والداخلية."
            : "Delivered across residential, architectural and interior scopes.",
      },
      {
        label: lang === "ar" ? "رضا العملاء" : "Client Satisfaction",
        description:
          lang === "ar"
            ? "تم قياسها من خلال التسليمات المكتملة وتعليقات العملاء."
            : "Measured through completed handovers and client feedback.",
      },
      {
        label: lang === "ar" ? "سنوات من الخبرة" : "Years of Experience",
        description:
          lang === "ar"
            ? "تسليم المشاريع في جميع أنحاء الإمارات العربية المتحدة."
            : "Delivering projects across the UAE.",
      },
    ],
  };

  const displayContent = { ...fallbackContent, ...content };

  return (
    <SectionContainer lang={lang}>
      <StickyWrapper>
        {!isImageLoaded && <SkeletonOverlay />}

        <ImageBackground style={{ scale }} $isLoaded={isImageLoaded} />
        <Overlay />
        <HeroContent
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <MainHeading>{displayContent.title}</MainHeading>
          <MainDescription>{displayContent.description}</MainDescription>
        </HeroContent>
      </StickyWrapper>

      <StatsPanel>
        <StatsGrid
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <StatIcon>{stat.icon}</StatIcon>
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                duration={2 + index * 0.2}
              />
              <StatLabel>{displayContent.stats[index]?.label}</StatLabel>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#6c757d",
                  marginTop: "0.5rem",
                  lineHeight: "1.5",
                }}
              >
                {displayContent.stats[index]?.description}
              </p>
            </StatCard>
          ))}
        </StatsGrid>
      </StatsPanel>
    </SectionContainer>
  );
}
