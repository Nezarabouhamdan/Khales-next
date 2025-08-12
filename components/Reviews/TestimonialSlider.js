// components/Reviews/TestimonialSlider.js
"use client";

import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import ImageWithSkeleton from "../ImageSkeleton";
// Static data (logos) can remain here
const partners = [
  { logo: "/assets/Partners/1.png" },
  { logo: "/assets/Partners/2.png" },
  { logo: "/assets/Partners/3.png" },
  { logo: "/assets/Partners/4.png" },
  { logo: "/assets/Partners/5.png" },
  { logo: "/assets/Partners/6.png" },
  { logo: "/assets/Partners/7.png" },
  { logo: "/assets/Partners/8.png" },
  { logo: "/assets/Partners/9.png" },
  { logo: "/assets/Partners/10.png" },
];

// --- STYLED COMPONENTS (Your original code, unchanged) ---
const SectionWrapper = styled.section`
  padding: 8rem 0;
  background-color: #f8f9fa; // خلفية بلون رمادي فاتح لكسر الروتين
  position: relative;
  overflow: hidden;
  font-family: "Inter", sans-serif;
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
`;
const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 4rem;
  text-align: center;
`;
const TestimonialWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 6rem;
  text-align: center;
  position: relative;
  &::before,
  &::after {
    content: "“";
    font-family: "Georgia", serif;
    font-size: 8rem;
    color: #66a109;
    opacity: 0.1;
    position: absolute;
    z-index: -1;
  }
  &::before {
    top: -2rem;
    left: -2rem;
  }
  &::after {
    content: "”";
    bottom: -3rem;
    right: -2rem;
  }
  .swiper-slide {
    align-self: stretch;
  }
`;
const TestimonialContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;
const QuoteText = styled.p`
  font-size: 1.3rem;
  font-style: italic;
  line-height: 1.8;
  color: #333;
  margin: 0;
  max-width: 700px;
  @media (max-width: 768px) {
    font-size: 1.15rem;
  }
`;
const Author = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;
const AuthorName = styled.span`
  font-weight: 600;
  color: #1a1a1a;
  font-size: 1rem;
`;
const AuthorService = styled.span`
  font-weight: 600;
  color: #66a109;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;
const PartnersMarquee = styled.div`
  width: 100%;
  position: relative;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100px;
    z-index: 2;
    pointer-events: none;
  }
  &::before {
    left: 0;
    background: linear-gradient(to right, #f9fafb, transparent);
  }
  &::after {
    right: 0;
    background: linear-gradient(to left, #f9fafb, transparent);
  }
  .swiper-wrapper {
    transition-timing-function: linear !important;
  }
  .swiper-slide {
    width: auto;
  }
`;
const PartnerLogo = styled(ImageWithSkeleton)`
  width: 300px; /* Was 160px */
  height: 200px; /* Was 80px */
  filter: grayscale(100%);
  opacity: 0.5;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

// MODIFIED: Update PartnerCard to use the new component
const PartnerCard = styled.div`
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  padding: 0 2.5rem;

  /* The old 'img' styles are now in the PartnerLogo component. */
  /* This hover effect now targets the PartnerLogo component. */
  &:hover ${PartnerLogo} {
    filter: grayscale(0%);
    opacity: 1;
    transform: scale(1.1);
  }
`;
// --- ANIMATION VARIANTS (Unchanged) ---
const testimonialVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } },
};

// --- MAIN REFACTORED COMPONENT ---
export default function TestimonialSlider({ lang, content }) {
  // Robust checks for content
  if (
    !content ||
    !Array.isArray(content.reviews) ||
    content.reviews.length === 0
  ) {
    return null;
  }

  const loopedPartners = [...partners, ...partners];

  return (
    <SectionWrapper lang={lang}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <SectionTitle>{content.title}</SectionTitle>
        </motion.div>

        <TestimonialWrapper>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            speed={800}
            dir={lang === "ar" ? "rtl" : "ltr"}
            key={lang} // This is crucial to re-initialize Swiper on language change
          >
            {content.reviews.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <AnimatePresence mode="wait">
                  <TestimonialContent
                    key={testimonial.name}
                    variants={testimonialVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <QuoteText>"{testimonial.text}"</QuoteText>
                    <Author>
                      <AuthorName>{testimonial.name}</AuthorName>
                      <AuthorService>{testimonial.service}</AuthorService>
                    </Author>
                  </TestimonialContent>
                </AnimatePresence>
              </SwiperSlide>
            ))}
          </Swiper>
        </TestimonialWrapper>
      </Container>

      <PartnersMarquee>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView="auto"
          loop={true}
          speed={12000}
          autoplay={{ delay: 1, disableOnInteraction: false }}
          allowTouchMove={false}
          loopedSlides={partners.length}
        >
          {loopedPartners.map((partner, index) => (
            <SwiperSlide key={index}>
              <PartnerCard>
                {/* 
                  MODIFIED: Replaced the standard <img> tag with our new PartnerLogo component.
                  We pass objectFit="contain" to ensure logos are not stretched or cropped.
                */}
                <PartnerLogo
                  src={partner.logo}
                  alt={`Partner logo ${index + 1}`}
                  objectFit="contain" // This is important for logos
                />
              </PartnerCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </PartnersMarquee>
    </SectionWrapper>
  );
}
