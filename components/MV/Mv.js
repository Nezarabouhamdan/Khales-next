// components/MissionVision.jsx
"use client";

import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { FaStar, FaCheck } from "react-icons/fa";
import { useLanguage } from "@/Context/Languagecontext"; // Adjust path if needed

//================================================================
// 1. DYNAMIC CONTENT
//================================================================
const contentData = {
  eng: {
    mission: {
      title: "Our Mission",
      description:
        "To deliver innovative, sustainable, and results-driven project management and consultancy solutions. We aim to exceed client expectations by combining strategic planning with professional execution, ensuring each project is delivered on time and within budget.",
      tags: ["Strategic Planning", "Team Collaboration", "Innovation"],
    },
    vision: {
      title: "Our Vision",
      description:
        "To be the leading project management consultancy that consistently turns visionary ideas into sustainable and successful projects, while fostering long-term relationships with our clients through trust and excellence.",
      tags: ["Visionary Leadership", "Sustainable Growth", "Excellence"],
    },
  },
  ar: {
    mission: {
      title: "مهمتنا",
      description:
        "تقديم حلول مبتكرة ومستدامة وموجهة نحو النتائج في إدارة المشاريع والاستشارات. نهدف إلى تجاوز توقعات العملاء من خلال الجمع بين التخطيط الاستراتيجي والتنفيذ الاحترافي، مما يضمن تسليم كل مشروع في الوقت المحدد وضمن الميزانية.",
      tags: ["تخطيط استراتيجي", "تعاون الفريق", "ابتكار"],
    },
    vision: {
      title: "رؤيتنا",
      description:
        "أن نكون الشركة الرائدة في استشارات إدارة المشاريع التي تحول الأفكار الطموحة باستمرار إلى مشاريع ناجحة ومستدامة، مع بناء علاقات طويلة الأمد مع عملائنا من خلال الثقة والتميز.",
      tags: ["قيادة رؤيوية", "نمو مستدام", "التميز"],
    },
  },
};

//================================================================
// 2. STYLED COMPONENTS (Corrected for RTL)
//================================================================

const SectionWrapper = styled.section`
  display: flex;
  width: 100%;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
  overflow: hidden;
  direction: ${(props) => props.dir};

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const Column = styled(motion.div)`
  flex: 1;
  padding: 6rem 4rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1200px) {
    padding: 5rem 3rem;
  }
  @media (max-width: 992px) {
    padding: 5rem 2rem;
    min-height: 80vh;
  }
`;

const MissionColumn = styled(Column)`
  background-color: #f8f9fa;
  color: #1a1a1a;
`;

const VisionColumn = styled(Column)`
  background-color: #121212;
  color: #ffffff;
`;

const ContentWrapper = styled.div`
  max-width: 550px;
  z-index: 2;
  position: relative;
  text-align: ${(props) => (props.dir === "rtl" ? "right" : "left")};
`;

const Header = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  justify-content: flex-start;
`;

const IconWrapper = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #66a109;
  color: #ffffff;
  font-size: 1.5rem;
  flex-shrink: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.1) rotate(15deg);
    box-shadow: 0 0 25px rgba(102, 161, 9, 0.6);
  }
`;

const VisionIconWrapper = styled(IconWrapper)`
  box-shadow: 0 0 0 3px #66a109;
  border: 3px solid #121212;
`;

const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
  color: #495057;
  ${VisionColumn} & {
    color: #ced4da;
  }
`;

const TagsContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  width: 100%;
  justify-content: flex-start;
`;

const Tag = styled.span`
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: default;
  transition: all 0.3s ease;
  background-color: ${(props) => props.bg || "#66a109"};
  color: ${(props) => props.color || "#ffffff"};
  border: 1px solid ${(props) => props.border || "transparent"};
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const DecorativeShape = styled(motion.div)`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  transition: transform 0.4s ease-out; /* Added for smooth parallax */
`;

//================================================================
// 3. FRAMER MOTION VARIANTS (RESTORED)
//================================================================
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

//================================================================
// 4. THE MAIN COMPONENT
//================================================================
const MissionVision = () => {
  const { language } = useLanguage();
  const content = contentData[language] || contentData.eng;
  const isRTL = language === "ar";

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Parallax effect handler
  const handleMouseMove = (e) => {
    const { currentTarget } = e;
    const shapes = currentTarget.querySelectorAll(".shape");
    const rect = currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    shapes.forEach((shape) => {
      const factor = shape.getAttribute("data-factor") || 20;
      shape.style.transform = `translate(${x / factor}px, ${y / factor}px)`;
    });
  };

  const handleMouseLeave = (e) => {
    const shapes = e.currentTarget.querySelectorAll(".shape");
    shapes.forEach((shape) => {
      shape.style.transform = `translate(0px, 0px)`;
    });
  };

  return (
    <SectionWrapper ref={sectionRef} dir={isRTL ? "rtl" : "ltr"}>
      {/* -------------------- MISSION COLUMN -------------------- */}
      <MissionColumn
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <DecorativeShape
          className="shape"
          data-factor="-20"
          style={{
            top: "10%",
            left: isRTL ? "auto" : "15%",
            right: isRTL ? "15%" : "auto",
            width: "100px",
            height: "100px",
            background: "rgba(102, 161, 9, 0.2)",
            borderRadius: "50%",
          }}
        />
        <DecorativeShape
          className="shape"
          data-factor="30"
          style={{
            top: "20%",
            right: isRTL ? "auto" : "15%",
            left: isRTL ? "15%" : "auto",
            width: "50px",
            height: "50px",
            background: "#e9ecef",
            borderRadius: "10px",
          }}
        />
        <DecorativeShape
          className="shape"
          data-factor="-15"
          style={{
            bottom: "15%",
            left: isRTL ? "auto" : "20%",
            right: isRTL ? "20%" : "auto",
            width: "80px",
            height: "80px",
            border: "2px solid rgba(102, 161, 9, 0.3)",
            borderRadius: "50%",
          }}
        />

        <ContentWrapper dir={isRTL ? "rtl" : "ltr"}>
          <Header variants={itemVariants}>
            <IconWrapper>
              <FaStar />
            </IconWrapper>
            <Title>{content.mission.title}</Title>
          </Header>
          <Description variants={itemVariants}>
            {content.mission.description}
          </Description>
          <TagsContainer variants={itemVariants}>
            <Tag>{content.mission.tags[0]}</Tag>
            <Tag bg="#121212" color="#ffffff">
              {content.mission.tags[1]}
            </Tag>
            <Tag>{content.mission.tags[2]}</Tag>
          </TagsContainer>
        </ContentWrapper>
      </MissionColumn>

      {/* -------------------- VISION COLUMN -------------------- */}
      <VisionColumn
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <DecorativeShape
          className="shape"
          data-factor="-20"
          style={{
            top: "15%",
            left: isRTL ? "auto" : "10%",
            right: isRTL ? "10%" : "auto",
            width: "60px",
            height: "60px",
            border: "2px solid rgba(102, 161, 9, 0.4)",
            borderRadius: "10px",
          }}
        />
        <DecorativeShape
          className="shape"
          data-factor="30"
          style={{
            top: "25%",
            right: isRTL ? "auto" : "20%",
            left: isRTL ? "20%" : "auto",
            width: "80px",
            height: "80px",
            background: "rgba(102, 161, 9, 0.1)",
            borderRadius: "50%",
          }}
        />
        <DecorativeShape
          className="shape"
          data-factor="-15"
          style={{
            bottom: "20%",
            left: isRTL ? "auto" : "40%",
            right: isRTL ? "40%" : "auto",
            width: "120px",
            height: "120px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "50%",
          }}
        />

        <ContentWrapper dir={isRTL ? "rtl" : "ltr"}>
          <Header variants={itemVariants}>
            <VisionIconWrapper>
              <FaCheck />
            </VisionIconWrapper>
            <Title>{content.vision.title}</Title>
          </Header>
          <Description variants={itemVariants}>
            {content.vision.description}
          </Description>
          <TagsContainer variants={itemVariants}>
            <Tag color="#111111">{content.vision.tags[0]}</Tag>
            <Tag bg="#ffffff" color="#111111" border="1px solid #dee2e6">
              {content.vision.tags[1]}
            </Tag>
            <Tag color="#111111">{content.vision.tags[2]}</Tag>
          </TagsContainer>
        </ContentWrapper>
      </VisionColumn>
    </SectionWrapper>
  );
};

export default MissionVision;
