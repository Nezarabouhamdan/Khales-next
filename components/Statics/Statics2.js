// components/ValuePropositionV2.jsx
"use client";

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useInView, animate } from "framer-motion";
import { FaBuilding, FaRegThumbsUp, FaRegCalendarCheck } from "react-icons/fa";
import { useLanguage } from "../../Context/Languagecontext"; // Make sure this path is correct

//================================================================
// 1. DATA (Translatable & Non-Translatable)
//================================================================

// NEW: All text content is now in this object for easy translation
const content = {
  eng: {
    hero: {
      title: "Unlocking Your Potential",
      subtitle:
        "We combine deep industry expertise with proven strategies to deliver tangible value and drive sustainable growth.",
    },
    stats: [
      {
        title: "Successful Projects",
        description: "Delivering complex projects that exceed expectations.",
      },
      {
        title: "Client Satisfaction",
        description: "Our commitment to partnership and excellence.",
      },
      {
        title: "Years of Experience",
        description: "Seasoned experts with invaluable industry knowledge.",
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

// This data remains, but without the text descriptions
const statsData = [
  { icon: <FaBuilding />, value: 120, suffix: "+" },
  { icon: <FaRegThumbsUp />, value: 98, suffix: "%" },
  { icon: <FaRegCalendarCheck />, value: 15, suffix: "+" },
];

//================================================================
// 2. STYLED COMPONENTS
//================================================================

const SectionContainer = styled.section`
  padding-bottom: 5rem;
  background-color: #ffffff;
  /* NEW: Dynamic font and direction based on language */
  font-family: ${({ lang }) =>
      lang === "ar" ? "var(--font-tajawal)" : "var(--font-inter)"},
    sans-serif;
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
`;

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  height: 60vh;
  width: 100%;
  overflow: hidden;
  background-color: #121212;
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
`;

const Overlay = styled.div`
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
    font-size: 4rem;
    font-weight: 700;
    max-width: 800px;
    line-height: 1.2;
  }
  p {
    font-size: 1.2rem;
    max-width: 600px;
    margin-top: 1rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.7;
  }
  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
  }
`;

const StatsPanel = styled.div`
  background-color: #ffffff;
  padding: 5rem;
  border-radius: 30px 30px 0 0;
  box-shadow: 0 -20px 50px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 4;
  margin-top: -10vh;
  @media (max-width: 992px) {
    padding: 4rem 2rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  max-width: 1100px;
  margin: 0 auto;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const StatColumn = styled(motion.div)`
  text-align: center;
  .icon {
    font-size: 2.5rem;
    color: #66a109;
    margin-bottom: 1.5rem;
    transition: transform 0.3s ease;
  }
  .counter-container {
    margin-bottom: 0.5rem;
    transition: transform 0.3s ease;
  }
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
  }
  &:hover {
    .icon,
    .counter-container {
      transform: scale(1.1);
    }
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

//================================================================
// 3. ANIMATED NUMBER COMPONENT
//================================================================
const AnimatedNumber = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) ref.current.textContent = Math.round(latest);
        },
      });
    }
  }, [isInView, value]);

  return <CounterText ref={ref}>0</CounterText>;
};

//================================================================
// 4. MAIN COMPONENT
//================================================================
const ValuePropositionV2 = () => {
  const { language } = useLanguage(); // NEW: Get language from context
  const currentContent = content[language] || content.eng; // NEW: Select the correct content object

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <SectionContainer lang={language}>
      <StickyWrapper>
        <ImageBackground
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.2 }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        <Overlay />
        <HeroContent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* NEW: Dynamic text */}
          <h1>{currentContent.hero.title}</h1>
          <p>{currentContent.hero.subtitle}</p>
        </HeroContent>
      </StickyWrapper>

      <StatsPanel>
        <StatsGrid>
          {statsData.map((stat, index) => (
            <StatColumn
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="icon">{stat.icon}</div>
              <div className="counter-container">
                <AnimatedNumber value={stat.value} />
                <Suffix>{stat.suffix}</Suffix>
              </div>
              {/* NEW: Dynamic text from content object */}
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
