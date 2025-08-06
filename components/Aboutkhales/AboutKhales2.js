"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import LazyImage from "../LazyImage";

// Static data can remain here
const galleryImages = [
  "https://i.ibb.co/7tKV3xP1/aboutus5.jpg",
  "https://i.ibb.co/XftcdnrY/aboutus2.jpg",
  "https://i.ibb.co/v4S8JftQ/aboutus4.jpg",
  "https://i.ibb.co/jPgtTSzr/aboutus3.jpg",
];

// --- FRAMER MOTION VARIANTS ---
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// --- STYLED COMPONENTS (IMPROVED HEADING STRUCTURE) ---
const SectionWrapper = styled(motion.section)`
  width: 100%;
  min-height: 100vh;
  padding: 5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #f9fafb;
  font-family: ${(({ lang }) =>
    lang === "ar" ? "var(--font-tajawal)" : "var(--font-inter)",
  "sans-serif")};
  overflow: hidden;
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 5%;
  position: relative;
  z-index: 5;

  @media (max-width: 992px) {
    padding: 0 2.5rem;
  }
  @media (max-width: 576px) {
    padding: 0 1.5rem;
  }
`;

const ContentCard = styled(motion.div)`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 3rem;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    padding: 2.5rem;
    gap: 2.5rem;
  }
  @media (max-width: 576px) {
    padding: 2rem 1.5rem;
  }
`;

const TextBlock = styled(motion.div)`
  display: flex;
  flex-direction: column;
  text-align: ${({ lang }) => (lang === "ar" ? "right" : "left")};
  color: #1a1a1a;
`;

// IMPROVED: Changed from h2 to h3 for better hierarchy (since page already has H1 and H2)
const Title = styled(motion.h3)`
  font-size: clamp(2.2rem, 4.5vw, 3.2rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
  span {
    color: #66a109;
  }
`;

const Paragraph = styled(motion.p)`
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  line-height: 1.8;
  margin-bottom: 2.5rem;
  color: #555;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #66a109, #7cb342);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 8px 25px rgba(102, 161, 9, 0.3);
  transition: all 0.3s ease;
  align-self: ${({ lang }) => (lang === "ar" ? "flex-end" : "flex-start")};

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(102, 161, 9, 0.4);
    background: linear-gradient(135deg, #5a9008, #689f38);
  }
`;

const ImageGallery = styled(motion.div)`
  position: relative;
  height: 450px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
`;

const GalleryImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageIndicators = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
`;

const Indicator = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: ${({ active }) =>
    active ? "#66a109" : "rgba(255, 255, 255, 0.5)"};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #66a109;
    transform: scale(1.2);
  }
`;

// Decorative shapes
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

// --- MAIN COMPONENT ---
export default function AboutKhalesUltimate({ content = {}, lang = "en" }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-cycle through images
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Fallback content
  const fallbackContent = {
    title: lang === "ar" ? "عن خالص" : "About Khales",
    subtitle: lang === "ar" ? "بناء التميز" : "Building Excellence",
    description:
      lang === "ar"
        ? "نحن في خالص نؤمن بأن كل مشروع هو فرصة لخلق شيء استثنائي. مع خبرة تزيد عن عقد من الزمن في مجال الهندسة المعمارية والتصميم الداخلي، نحن نجمع بين الإبداع والخبرة التقنية لتحويل رؤى عملائنا إلى واقع ملموس. فريقنا من المهندسين والمصممين المحترفين يعمل بشغف لتقديم حلول مبتكرة تتجاوز التوقعات وتحقق أعلى معايير الجودة والاستدامة."
        : "At Khales, we believe that every project is an opportunity to create something exceptional. With over a decade of experience in architecture and interior design, we combine creativity with technical expertise to transform our clients' visions into tangible reality. Our team of professional engineers and designers works passionately to deliver innovative solutions that exceed expectations and achieve the highest standards of quality and sustainability.",
    buttonText: lang === "ar" ? "اعرف المزيد عنا" : "Learn More About Us",
    buttonLink: "/About-Us",
  };

  const displayContent = { ...fallbackContent, ...content };

  return (
    <SectionWrapper
      lang={lang}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
    >
      <DecorativeShape1 />
      <DecorativeShape2 />

      <Container>
        <ContentCard variants={itemVariants}>
          <TextBlock lang={lang} variants={itemVariants}>
            <Title variants={itemVariants} lang={lang}>
              {displayContent.title}
              {displayContent.subtitle && (
                <>
                  <br />
                  <span>{displayContent.subtitle}</span>
                </>
              )}
            </Title>
            <Paragraph variants={itemVariants}>
              {displayContent.description}
            </Paragraph>
            <CTAButton
              href={`/${lang}${displayContent.buttonLink}`}
              lang={lang}
            >
              {displayContent.buttonText}
            </CTAButton>
          </TextBlock>

          <ImageGallery variants={itemVariants}>
            <AnimatePresence mode="wait">
              <GalleryImage
                key={currentImageIndex}
                src={galleryImages[currentImageIndex]}
                alt={`${displayContent.title} ${currentImageIndex + 1}`}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8 }}
                onClick={() =>
                  setCurrentImageIndex(
                    (prev) => (prev + 1) % galleryImages.length
                  )
                }
              />
            </AnimatePresence>

            <ImageIndicators>
              {galleryImages.map((_, index) => (
                <Indicator
                  key={index}
                  active={index === currentImageIndex}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </ImageIndicators>
          </ImageGallery>
        </ContentCard>
      </Container>
    </SectionWrapper>
  );
}
