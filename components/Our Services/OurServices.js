"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link"; // <-- IMPORT NEXT.JS LINK
import {
  FaArrowRight,
  FaStar,
  FaProjectDiagram,
  FaBullseye,
  FaClipboardCheck,
  FaTasks,
} from "react-icons/fa";
import { useLanguage } from "../../Context/Languagecontext"; // Assuming this path is correct
import LazyImage from "../LazyImage";

// --- UPDATED DATA (with 'slug' for linking) ---
const content = {
  eng: {
    header: {
      title: "Our Services",
      subtitle:
        "Transforming complex challenges into strategic opportunities...",
    },
    services: [
      {
        slug: "engineering-consultancy", // <-- ADDED SLUG
        title: "Engineering",
        highlight: "Consultancy",
        description:
          "Our engineering team supports each project with clear, code-compliant...",
        showcaseSubtitle:
          "Technical solutions that support design intent and buildability.",
        features: [
          {
            title: "Structural Analysis",
            description: "Detailed engineering checks tailored...",
          },
          {
            title: "Quality Assurance",
            description: "Technical reviews and verification processes...",
          },
        ],
        linkText: "Explore Engineering Solutions",
      },
      {
        slug: "project-management", // <-- ADDED SLUG
        title: "Project",
        highlight: "Management",
        description:
          "Managing projects with a clear structure, defined responsibilities...",
        showcaseSubtitle:
          "Complete oversight from design approvals to handover.",
        features: [
          {
            title: "Resource Planning",
            description: "Efficient allocation of personnel...",
          },
          {
            title: "Risk Management",
            description:
              "Early detection of design, site, or execution risks...",
          },
        ],
        linkText: "Discover Project Excellence",
      },
    ],
  },
  ar: {
    header: {
      title: "خدماتنا",
      subtitle: "نحوّل التحديات المعقدة إلى فرص استراتيجية...",
    },
    services: [
      {
        slug: "engineering-consultancy", // <-- ADDED SLUG
        title: "الاستشارات",
        highlight: "الهندسية",
        description: "نقدم حلولاً هندسية شاملة عبر التحليل الاستراتيجي...",
        showcaseSubtitle: "تصميم وهيكلة أنظمة فيزيائية قابلة للتكوين والتركيب.",
        features: [
          { title: "التحليل الإنشائي", description: "تحليل حسابي متقدم..." },
          { title: "ضمان الجودة", description: "بروتوكولات اختبار صارمة..." },
        ],
        linkText: "اكتشف الحلول الهندسية",
      },
      {
        slug: "project-management", // <-- ADDED SLUG
        title: "إدارة",
        highlight: "المشاريع",
        description: "ننظم المشاريع المعقدة بدقة وشفافية...",
        showcaseSubtitle: "إشراف استراتيجي",
        features: [
          { title: "تخطيط الموارد", description: "تحسين تخصيص الموارد..." },
          { title: "إدارة المخاطر", description: "استراتيجيات استباقية..." },
        ],
        linkText: "اكتشف تميز المشاريع",
      },
    ],
  },
};

const servicesConfig = [
  {
    showcase: {
      icon: <FaStar />,
      image: "https://i.ibb.co/pvsmTgg6/Engineering-Consultancy.jpg",
    },
    features: [{ icon: <FaProjectDiagram /> }, { icon: <FaClipboardCheck /> }],
  },
  {
    showcase: {
      icon: <FaTasks />,
      image: "https://i.ibb.co/277qKX62/Project-Management.jpg",
    },
    features: [{ icon: <FaBullseye /> }, { icon: <FaClipboardCheck /> }],
  },
];

// --- STYLED COMPONENTS (No changes needed here) ---
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
const ServicesContainer = styled.section`
  width: 100%;
  padding: 6rem 2rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
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
  flex-direction: ${(props) => (props.isReversed ? "row-reverse" : "row")};
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;
const ShowcaseColumn = styled(motion.div)`
  flex: 1;
  min-width: 300px;
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
  /* Can stay as 'a' for styling */
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

// --- FRAMER MOTION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7 } },
};

// --- THE MAIN COMPONENT ---
const OurServices = () => {
  const { language } = useLanguage();
  const currentContent = content[language] || content.eng;

  return (
    <ServicesContainer lang={language}>
      <SectionHeader
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <h1>{currentContent.header.title}</h1>
        <p>{currentContent.header.subtitle}</p>
      </SectionHeader>

      {servicesConfig.map((serviceConfig, index) => {
        const serviceText = currentContent.services[index];
        const serviceUrl = `/services/${serviceText.slug}`; // <-- Dynamically create the URL

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
                {/* ▼▼▼ UPDATED LINK ▼▼▼ */}
                <Link href={serviceUrl} passHref>
                  <ExploreLink lang={language}>
                    {serviceText.linkText}
                    <FaArrowRight
                      className="arrow-icon"
                      style={{
                        transform:
                          language === "ar" ? "scaleX(-1)" : "scaleX(1)",
                      }}
                    />
                  </ExploreLink>
                </Link>
              </motion.div>
            </TextColumn>
          </ServiceRow>
        );
      })}
    </ServicesContainer>
  );
};

export default OurServices;
