// components/OurServices.jsx
"use client";

import React, { useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaStar,
  FaProjectDiagram,
  FaBullseye,
  FaClipboardCheck,
  FaTasks,
} from "react-icons/fa";
import { useLanguage } from "../../Context/Languagecontext"; // Make sure path is correct

//================================================================
// 1. DATA FOR THE SERVICES
//================================================================

// NEW: All translatable text is here
const content = {
  eng: {
    header: {
      title: "Our Services",
      subtitle:
        "Transforming complex challenges into strategic opportunities through innovative project management solutions and engineering excellence.",
    },
    services: [
      {
        title: "Engineering",
        highlight: "Consultancy",
        description:
          "Our engineering team supports each project with clear, code-compliant technical solutions. We focus on structural integrity, buildability, and long-term performance — ensuring that every design decision can be executed with confidence and precision. ",
        showcaseSubtitle:
          "Technical solutions that support design intent and buildability.",
        features: [
          {
            title: "Structural Analysis",
            description:
              "Detailed engineering checks tailored to site conditions and design requirements. ",
          },
          {
            title: "Quality Assurance",
            description:
              "Technical reviews and verification processes to ensure regulatory and structural compliance. ",
          },
        ],
        linkText: "Explore Engineering Solutions",
      },
      {
        title: "Project",
        highlight: "Management",
        description:
          "Managing projects with a clear structure, defined responsibilities, and full transparency. Our approach prioritizes coordination, risk control, and quality delivery — ensuring outcomes align with client expectations, timelines, and regulatory standards. ",
        showcaseSubtitle:
          "Complete oversight from design approvals to handover. ",
        features: [
          {
            title: "Resource Planning",
            description:
              "Efficient allocation of personnel, materials, and schedules to avoid delays. ",
          },
          {
            title: "Risk Management",
            description:
              "Early detection of design, site, or execution risks, and structured response planning. .",
          },
        ],
        linkText: "Discover Project Excellence",
      },
    ],
  },
  ar: {
    header: {
      title: "خدماتنا",
      subtitle:
        "نحوّل التحديات المعقدة إلى فرص استراتيجية من خلال حلول مبتكرة في إدارة المشاريع والتميز الهندسي.",
    },
    services: [
      {
        title: "الاستشارات",
        highlight: "الهندسية",
        description:
          "نقدم حلولاً هندسية شاملة عبر التحليل الاستراتيجي ومنهجيات التصميم المبتكرة والتميز التقني. رؤيتنا المتخصصة تترجم التحديات المعقدة إلى أنظمة مستدامة ومتينة.",
        showcaseSubtitle: "تصميم وهيكلة أنظمة فيزيائية قابلة للتكوين والتركيب.",
        features: [
          {
            title: "التحليل الإنشائي",
            description: "تحليل حسابي متقدم وتحليل الإجهاد.",
          },
          {
            title: "ضمان الجودة",
            description: "بروتوكولات اختبار صارمة وامتثال كامل للمعايير.",
          },
        ],
        linkText: "اكتشف الحلول الهندسية",
      },
      {
        title: "إدارة",
        highlight: "المشاريع",
        description:
          "ننظم المشاريع المعقدة بدقة وشفافية وإشراف استراتيجي. يضمن نهجنا الشامل التنفيذ السلس من الفكرة إلى الإنجاز، مع تحقيق نتائج استثنائية في الوقت المحدد وضمن الميزانية.",
        showcaseSubtitle: "إشراف استراتيجي",
        features: [
          {
            title: "تخطيط الموارد",
            description: "تحسين تخصيص الموارد لتحقيق أقصى كفاءة.",
          },
          {
            title: "إدارة المخاطر",
            description: "استراتيجيات استباقية لتحديد المخاطر وتخفيفها.",
          },
        ],
        linkText: "اكتشف تميز المشاريع",
      },
    ],
  },
};

// NEW: Non-translatable config data (icons, images)
const servicesConfig = [
  {
    showcase: {
      icon: <FaStar />,
      image:
        "https://i.ibb.co/rGyjXZdb/Firefly-architectural-drawing-color-palette-schedule-map-or-graph-on-the-table-with-hands-452215.jpg",
      textColor: "#ffffff",
    },
    features: [{ icon: <FaProjectDiagram /> }, { icon: <FaClipboardCheck /> }],
  },
  {
    showcase: {
      icon: <FaTasks />,
      image:
        "https://i.ibb.co/whYgvthL/Firefly-architects-and-engineers-discussing-about-a-project-they-are-in-the-meeting-room-th-623561.jpg",
      textColor: "#ffffff",
    },
    features: [{ icon: <FaBullseye /> }, { icon: <FaClipboardCheck /> }],
  },
];

//================================================================
// 2. STYLED COMPONENTS
//================================================================

const ServicesContainer = styled.section`
  width: 100%;
  padding: 6rem 2rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;
  /* NEW: Dynamic font and direction for language support */
  font-family: ${({ lang }) =>
      lang === "ar" ? "var(--font-tajawal)" : "var(--font-inter)"},
    sans-serif;
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
  position: relative;
  overflow: hidden;

  @media (max-width: 992px) {
    padding: 4rem 1.5rem;
    gap: 4rem;
  }
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  max-width: 700px;
  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #1a1a1a;
    line-height: 1.2;
  }
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #555;
  }
  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
  }
`;

const ServiceRow = styled(motion.div)`
  display: flex;
  width: 100%;
  max-width: 1100px;
  gap: 3rem;
  align-items: center;
  /* Note: The parent 'direction: rtl' will automatically handle reversing the row order */
  flex-direction: ${(props) => (props.isReversed ? "row-reverse" : "row")};

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const ShowcaseColumn = styled(motion.div)`
  flex: 1;
  min-width: 300px;
`;

// UPDATED: ShowcaseCard now uses a background image with an overlay
const ShowcaseCard = styled.div`
  position: relative;
  border-radius: 20px;
  padding: 2rem;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${(props) => props.textColor};
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  isolation: isolate; // Creates a new stacking context for z-index

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${(props) => props.bgImage});
    background-size: cover;
    background-position: center;
    z-index: -2;
    transition: transform 0.4s ease;
  }

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
    &::before {
      transform: scale(1.05);
    }
  }
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

const ShowcaseTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 600;
  margin-top: auto;
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

const ServiceTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
  line-height: 1.3;
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

const ExploreLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #66a109;
  font-weight: 500;
  cursor: pointer;
  transition: gap 0.3s ease;
  .arrow-icon {
    transition: transform 0.3s ease;
  }
  &:hover .arrow-icon {
    transform: ${({ lang }) =>
      lang === "ar" ? "translateX(-4px)" : "translateX(4px)"};
  }
`;

const DecorativeShape = styled(motion.div)`
  /* ... unchanged ... */
`;

//================================================================
// 3. FRAMER MOTION VARIANTS
//================================================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};
const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

//================================================================
// 4. THE MAIN COMPONENT
//================================================================
const OurServices = () => {
  const { language } = useLanguage();
  const currentContent = content[language] || content.eng;

  return (
    <ServicesContainer lang={language}>
      {/* Decorative shapes are unchanged */}

      <SectionHeader
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <h1>{currentContent.header.title}</h1>
        <p>{currentContent.header.subtitle}</p>
      </SectionHeader>

      {/* NEW: Map over the config and get text by index */}
      {servicesConfig.map((serviceConfig, index) => {
        const serviceText = currentContent.services[index];
        return (
          <ServiceRow
            key={serviceText.title}
            isReversed={index % 2 !== 0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <ShowcaseColumn variants={itemVariants}>
              <ShowcaseCard
                bgImage={serviceConfig.showcase.image}
                textColor={serviceConfig.showcase.textColor}
              >
                <ShowcaseIcon>{serviceConfig.showcase.icon}</ShowcaseIcon>
                <div>
                  <ShowcaseTitle>{serviceText.showcaseTitle}</ShowcaseTitle>
                  <ShowcaseSubCard>
                    {serviceText.showcaseSubtitle}
                  </ShowcaseSubCard>
                </div>
              </ShowcaseCard>
            </ShowcaseColumn>

            <TextColumn variants={containerVariants}>
              <motion.div variants={itemVariants}>
                <ServiceTitle>
                  {serviceText.title} <span>{serviceText.highlight}</span>
                </ServiceTitle>
                <ServiceDescription>
                  {serviceText.description}
                </ServiceDescription>
              </motion.div>
              <FeaturesGrid>
                {serviceText.features.map((feature, featureIndex) => (
                  <motion.div key={feature.title} variants={itemVariants}>
                    <FeatureCard>
                      <h4>
                        <span className="icon">
                          {serviceConfig.features[featureIndex].icon}
                        </span>
                        {feature.title}
                      </h4>
                      <p>{feature.description}</p>
                    </FeatureCard>
                  </motion.div>
                ))}
              </FeaturesGrid>
              <motion.div variants={itemVariants}>
                <ExploreLink href="#" lang={language}>
                  {serviceText.linkText}
                  <FaArrowRight
                    className="arrow-icon"
                    style={{
                      transform: language === "ar" ? "scaleX(-1)" : "scaleX(1)",
                    }}
                  />
                </ExploreLink>
              </motion.div>
            </TextColumn>
          </ServiceRow>
        );
      })}
    </ServicesContainer>
  );
};

export default OurServices;
