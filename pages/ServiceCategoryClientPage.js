"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { motion } from "framer-motion";

// --- STYLED COMPONENTS (from your original file) ---
const PageWrapper = styled(motion.main)`
  padding: 8rem 2rem 6rem; /* More padding top */
  max-width: 1200px;
  margin: 0 auto;
  color: #333;
`;
const HeaderSection = styled(motion.header)`
  text-align: center;
  margin-bottom: 4rem;
  direction: ${({ $rtl }) => ($rtl ? "rtl" : "ltr")};
`;
const PageTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1a1a1a;
`;
const PageIntro = styled(motion.p)`
  font-size: 1.125rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.7;
  color: #555;
`;
const ServicesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
`;
const ServiceCard = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  aspect-ratio: 4 / 3;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;
const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: transform 0.4s ease;
  ${ServiceCard}:hover & {
    transform: scale(1.05);
  }
`;
const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 30%, transparent);
  color: white;
  z-index: 2;
  direction: ${({ $rtl }) => ($rtl ? "rtl" : "ltr")};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const CardTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
const CardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
  opacity: 0.9;
`;
const CardLink = styled.span`
  font-weight: bold;
  color: #66a109;
  display: inline-block;
  transition: transform 0.2s ease;
  align-self: flex-start;
  ${ServiceCard}:hover & {
    transform: translateX(${({ $rtl }) => ($rtl ? "-5px" : "5px")});
  }
`;

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// --- Main Page Component ---
export default function ServiceCategoryClientPage({
  lang,
  categoryData,
  subServices,
  learnMoreText,
}) {
  const isRTL = lang === "ar";

  return (
    <PageWrapper variants={containerVariants} initial="hidden" animate="show">
      <HeaderSection $rtl={isRTL} variants={itemVariants}>
        <PageTitle>{categoryData.title}</PageTitle>
        <PageIntro>{categoryData.intro}</PageIntro>
      </HeaderSection>
      <ServicesGrid>
        {subServices.map((service) => (
          <motion.div key={service.path} variants={itemVariants}>
            <ServiceCard href={`/${lang}${service.path}`}>
              <CardImage src={service.image} />
              <CardContent $rtl={isRTL}>
                <div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </div>
                <CardLink $rtl={isRTL}>{learnMoreText}</CardLink>
              </CardContent>
            </ServiceCard>
          </motion.div>
        ))}
      </ServicesGrid>
    </PageWrapper>
  );
}
