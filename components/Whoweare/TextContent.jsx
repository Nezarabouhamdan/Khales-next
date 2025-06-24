"use client";
import React from "react";
import styled, { css } from "styled-components";
import { useLanguage } from "../../Context/Languagecontext";
import Link from "next/link";
// Step 1: Import motion from Framer Motion
import { motion } from "framer-motion";

const content = {
  eng: [
    {
      title: "Khales",
      green: "Group",
      content:
        "At Khales Project Management, we turn ideas into reality with expert architecture, construction, and fit-out solutions. Whether its a luxury development, commercial space, or residential project, we deliver turnkey solutions with precision, efficiency, and innovation. No delays, no compromises—just results that exceed expectations.",
      button: "Learn More",
    },
  ],
  ar: [
    {
      title: "مجموعة",
      green: "خالص",
      content:
        "تُعدّ خالص لإدارة المشاريع بوابتك لتحويل الأفكار إلى واقع ملموس، وذلك بتطبيق أعلى معايير الهندسة المعمارية والإنشاءات والتشطيبات الداخلية. سواء كان مشروعك فاخرًا، تجاريًا، أو سكنيًا، فإننا نقدم حلولًا متكاملة تتميز بالدقة والكفاءة والابتكار. نلتزم بتحقيق نتائج تتجاوز توقعاتك، دون أي تأخير أو تنازلات",
      button: "أعرف المزيد",
    },
  ],
};

// Step 2: Define Animation Variants
// This variant is for the container, orchestrating the children's animations.
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // This creates the "sequence" effect. Each child will animate 0.3s after the previous one.
      staggerChildren: 0.3,
      duration: 0.5,
    },
  },
};

// This variant is for each individual text item (Title, Description, Button).
const itemVariants = {
  hidden: { opacity: 0, y: 20 }, // Start invisible and 20px down
  visible: {
    opacity: 1,
    y: 0, // Animate to fully visible and its original position
    transition: {
      duration: 0.6,
      ease: "easeOut", // A smooth easing function
    },
  },
};

const TextContent = () => {
  const { language } = useLanguage();
  const selectedcontent = content[language] || content["eng"];

  return (
    // Step 3: Apply variants and in-view trigger to the main container
    <TextSection
      as={motion.div} // Use the 'as' prop to render TextSection as a motion.div
      variants={containerVariants}
      initial="hidden" // Start in the "hidden" state
      whileInView="visible" // Animate to "visible" when it enters the viewport
      viewport={{ once: true, amount: 0.3 }} // Animation triggers once when 30% is visible
      rtl={language === "ar"}
    >
      {/* Step 4: Apply the item variant to each child element */}
      <Title as={motion.h1} variants={itemVariants}>
        {selectedcontent[0].title}
        <GreenText> {selectedcontent[0].green}</GreenText>
      </Title>

      <Description as={motion.p} variants={itemVariants}>
        {selectedcontent[0].content}
      </Description>

      <motion.div variants={itemVariants}>
        <Link href={"/ABOUTUS"} passHref>
          <LearnMoreButton
            role="button"
            tabIndex={0}
            // No need for onClick/onKeyDown handlers if it's just for navigation
          >
            {selectedcontent[0].button}
          </LearnMoreButton>
        </Link>
      </motion.div>
    </TextSection>
  );
};

// No changes needed for the styled-components definitions below.
// Framer Motion will handle adding the necessary transform and opacity styles.

export const TextSection = styled.div`
  flex: 2 0 100%;
  max-width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: ${({ rtl }) => (rtl ? "flex-end" : "space-around")};
  text-align: ${({ rtl }) => (rtl ? "right" : "left")};
  height: 40vh;
  @media (max-width: 991px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 50px;
  font-weight: 600;
  color: rgb(0, 0, 0);
  margin-bottom: 20px;
  line-height: 60px;
  @media (max-width: 640px) {
    font-size: 32px;
  }
`;

export const GreenText = styled.span`
  color: rgb(0, 0, 0);
`;

const Description = styled.p`
  font-size: 16px;
  color: #838383;
  margin-bottom: 15px;
  font-family: "Playfair ";
  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

const LearnMoreButton = styled.button`
  padding: 12px 30px;
  background-color: rgb(102, 161, 9);
  font-size: 16px;

  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.2s ease;
  width: 200px;
  &:hover,
  &:focus {
    background-color: #404040;
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid #66a109;
    outline-offset: 2px;
  }
`;

export default TextContent;
