// components/ValuePropositionV2.jsx (Improved Performance)
"use client";

import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components"; // Import keyframes
import {
  motion,
  useInView,
  animate,
  useScroll,
  useTransform,
} from "framer-motion";
import { FaBuilding, FaRegThumbsUp, FaRegCalendarCheck } from "react-icons/fa";
import { useLanguage } from "../../Context/Languagecontext";

// --- 1. DATA (Unchanged) ---
const content = {
  eng: {
    hero: {
      title: "Unlocking Your Potential",
      subtitle:
        "We combine deep industry expertise with proven strategies to deliver tangible value and drive sustainable growth.",
    },
    stats: [
      {
        title: "Projects Completed",
        description:
          "Delivered across residential, architectural and interior scopes.",
      },
      {
        title: "Client Satisfaction",
        description:
          "Measured through completed handovers and client feedback .",
      },
      {
        title: "Years of Experience",
        description:
          "Delivering residential and architectural projects across the UAE ",
      },
    ],
  },
  ar: {
    hero: {
      title: "إطلاق العنان لإمكانياتك",
      subtitle:
        "نحن نجمع بين الخبرة العميقة في الصناعة والاستراتيجيات المثبتة لتقديم قيمة ملموسة ودفع النمو المستدام.",
    },
    stats: [
      {
        title: "مشروع ناجح",
        description: "تنفيذ مشاريع معقدة تتجاوز التوقعات بأعلى المعايير.",
      },
      {
        title: "رضا العملاء",
        description: "التزامنا الراسخ بالتميز في كل شراكة وعمل نقوم به.",
      },
      {
        title: "سنوات من الخبرة",
        description: "فريق من الخبراء المتمرسين بمعرفة لا تقدر بثمن في المجال.",
      },
    ],
  },
};

const statsData = [
  { icon: <FaBuilding />, value: 120, suffix: "+" },
  { icon: <FaRegThumbsUp />, value: 98, suffix: "%" },
  { icon: <FaRegCalendarCheck />, value: 15, suffix: "+" },
];

// --- 2. STYLED COMPONENTS (Improved) ---

// PERFORMANCE FIX: Define a CSS keyframe animation for the smoothest result.
const slowZoom = keyframes`
  from {
    transform: scale(1.05);
  }
  to {
    transform: scale(1.2);
  }
`;

const SectionContainer = styled.div`
  position: relative;
  background-color: #ffffff;
  font-family: ${({ lang }) =>
      lang === "ar" ? "var(--font-tajawal)" : "var(--font-inter)"},
    sans-serif;
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
`;

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const ImageBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80");
  background-size: cover;
  background-position: center;
  z-index: 1;

  /* PERFORMANCE FIX: Apply the smooth CSS animation */
  animation: ${slowZoom} 25s linear infinite alternate;
  /* Hint to the browser to use hardware acceleration */
  will-change: transform;
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

  h1 {
    font-size: 4.5rem;
    font-weight: 700;
    max-width: 900px;
    line-height: 1.2;
  }
  p {
    font-size: 1.2rem;
    max-width: 600px;
    margin-top: 1.5rem;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.7;
  }
  @media (max-width: 768px) {
    h1 {
      font-size: 2.8rem;
    }
  }
`;

const StatsPanel = styled.div`
  background-color: #ffffff;
  padding: 6rem 2rem;
  position: relative;
  z-index: 4;
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #f0f7e6;
  margin-bottom: 2rem;
  transition: all 0.4s ease;
  .icon {
    font-size: 2.5rem;
    color: #66a109;
  }
`;

const StatColumn = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  border-radius: 24px;
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  .counter-container {
    margin-bottom: 0.5rem;
  }
  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
    max-width: 300px;
    margin: 0 auto;
  }
`;

const CounterText = styled.span`
  font-size: 4.5rem;
  font-weight: 700;
  line-height: 1;
  color: #1a1a1a;
`;

const Suffix = styled(CounterText)`
  color: #66a109;
`;

// --- 3. ANIMATED NUMBER COMPONENT (Unchanged) ---
const AnimatedNumber = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) ref.current.textContent = Math.round(latest);
        },
      });
    }
  }, [isInView, value]);

  return <CounterText ref={ref}></CounterText>;
};

// --- 4. MAIN COMPONENT ---
const ValuePropositionV2 = () => {
  const { language } = useLanguage();
  const currentContent = content[language] || content.eng;

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.9]);

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const gridItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <SectionContainer lang={language} ref={targetRef}>
      <StickyWrapper>
        {/* PERFORMANCE FIX: Removed the Framer Motion animate props */}
        <ImageBackground />
        <Overlay style={{ opacity: overlayOpacity }} />
        <HeroContent style={{ opacity: heroOpacity, scale: heroScale }}>
          <h1>{currentContent.hero.title}</h1>
          <p>{currentContent.hero.subtitle}</p>
        </HeroContent>
      </StickyWrapper>

      <StatsPanel>
        <StatsGrid
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {statsData.map((stat, index) => (
            <StatColumn
              key={index}
              variants={gridItemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
              }}
              transition={{ duration: 0.3 }}
            >
              <IconWrapper>
                <div className="icon">{stat.icon}</div>
              </IconWrapper>
              <div className="counter-container">
                <AnimatedNumber value={stat.value} />
                <Suffix>{stat.suffix}</Suffix>
              </div>
              <h3>{currentContent.stats[index].title}</h3>
              <p>{currentContent.stats[index].description}</p>
            </StatColumn>
          ))}
        </StatsGrid>
      </StatsPanel>
    </SectionContainer>
  );
};

export default ValuePropositionV2;
