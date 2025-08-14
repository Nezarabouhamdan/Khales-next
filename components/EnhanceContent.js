"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa"; // Using check circle for the list
import ImageWithSkeleton from "./ImageSkeleton";

// ========================================================================
// STYLED COMPONENTS (with new additions for article layout)
// ========================================================================

const StyledEnhancedContent = styled.section`
  padding: 6rem 2rem;
  background-color: #f8f9fa;
  position: relative;
  overflow: hidden;
  direction: ${(props) => (props.$isRTL ? "rtl" : "ltr")};
`;

const ContentContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: flex-start; // Changed to flex-start for better alignment

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const TextColumn = styled.div`
  h2 {
    font-size: 2.8rem;
    font-weight: 700;
    color: #1a1a1a; // Darker color for better contrast
    margin-bottom: 1.5rem;
    line-height: 1.4;
  }
  .intro-paragraph {
    font-size: 1.1rem;
    line-height: 1.9;
    color: #555;
    margin-bottom: 2rem;
  }
`;

const ImageColumn = styled(motion.div)`
  border-radius: 16px;
  overflow: hidden;
  height: 550px;
  position: sticky; // Make image sticky on scroll for a modern effect
  top: 100px; // Start sticking 100px from the top
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);

  @media (max-width: 992px) {
    height: 350px;
    order: -1;
    position: relative; // Remove stickiness on mobile
    top: 0;
  }
`;

// --- NEW STYLED COMPONENTS FOR ARTICLE LAYOUT ---

const StyledBlockquote = styled.blockquote`
  margin: 2.5rem 0;
  padding-inline-start: 1.5rem; // Use logical properties for RTL support
  border-inline-start: 4px solid #66a109; /* Your brand's green color */
  font-style: italic;
  font-size: 1.2rem;
  line-height: 1.7;
  color: #444;
  font-weight: 500;
`;

const SectionSubtitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FeatureListItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 1rem;
  line-height: 1.6;
  color: #555;

  .icon {
    color: #66a109; /* Your brand's green color */
    font-size: 1.2rem;
    margin-top: 4px; // Better alignment with the first line of text
  }
`;

// ========================================================================
// THE COMPONENT ITSELF (with updated structure)
// ========================================================================

export default function EnhancedContent({ lang }) {
  const isRTL = lang === "ar";

  // --- UPDATED CONTENT STRUCTURE ---
  const content =
    lang === "ar"
      ? {
          title: "ريادة مستقبل التصميم والبناء",
          intro:
            "في خالص، ندمج أكثر من عقد من الخبرة بشغف للابتكار. نحن متخصصون في تحويل الرؤى المعقدة إلى واقع ملموس من خلال التصميم المتطور وإدارة المشاريع الدقيقة، متجاوزين باستمرار توقعات العملاء.",
          quote:
            "الفولاذ ليس مجرد مادة، بل هو فلسفة تصميم تطلق العنان للحرية المعمارية.",
          sectionTitle: "جوهر نهجنا",
          features: [
            "خدمات متكاملة: من التصميم المعماري إلى الاستشارات الهندسية.",
            "الخبرة والإبداع: فريق يمزج بين المهارة التقنية والرؤية الفنية.",
            "مواد عالية القوة: استخدام الفولاذ المتقدم لقوة وتنوع استثنائيين.",
            "هندسة دقيقة: الاستفادة من النمذجة ثلاثية الأبعاد و BIM لتنفيذ لا تشوبه شائبة.",
          ],
        }
      : {
          title: "Pioneering the Future of Design and Construction",
          intro:
            "At Khales, we merge over a decade of experience with a passion for innovation. We specialize in transforming complex visions into tangible realities through sophisticated design and meticulous project management.",
          quote:
            "Steel is not just a material, it's a design philosophy that enables architectural freedom.",
          sectionTitle: "The Core of Our Approach",
          features: [
            "Integrated Services: From architectural design to engineering consultancy.",
            "Expertise and Creativity: A team that blends technical skill with artistic vision.",
            "High-Strength Materials: Utilizing advanced steels for exceptional strength.",
            "Precision Engineering: Leveraging 3D Modeling & BIM for flawless execution.",
          ],
        };

  // --- ANIMATION SETTINGS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <StyledEnhancedContent $isRTL={isRTL}>
      <ContentContainer
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <GridContainer>
          {/* === UPDATED TEXT COLUMN === */}
          <TextColumn>
            <motion.h2 variants={itemVariants}>{content.title}</motion.h2>

            <motion.p variants={itemVariants} className="intro-paragraph">
              {content.intro}
            </motion.p>

            <motion.div variants={itemVariants}>
              <StyledBlockquote>{content.quote}</StyledBlockquote>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionSubtitle>{content.sectionTitle}</SectionSubtitle>
            </motion.div>

            <motion.div variants={itemVariants}>
              <FeatureList>
                {content.features.map((feature, i) => (
                  <FeatureListItem key={i}>
                    <FaCheckCircle className="icon" />
                    <span>{feature}</span>
                  </FeatureListItem>
                ))}
              </FeatureList>
            </motion.div>
          </TextColumn>

          {/* Image Column (No changes needed) */}
          <ImageColumn variants={itemVariants}>
            <ImageWithSkeleton
              src="https://i.ibb.co/s9hV1Y0/khales-ae.jpg"
              alt={isRTL ? "تصميم معماري حديث" : "Modern Architectural Design"}
              sizes="(max-width: 992px) 100vw, 33vw"
            />
          </ImageColumn>
        </GridContainer>
      </ContentContainer>
    </StyledEnhancedContent>
  );
}
