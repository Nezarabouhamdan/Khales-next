// components/ClientsAndPartners.jsx
"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useLanguage } from "../../Context/Languagecontext";

import "swiper/css";

// --- DATA FOR THE COMPONENT ---
const content = {
  eng: {
    title: "Clients & Partners",
    testimonials: [
      {
        text: "From the very first consultation, Khales impressed me with their professionalism and depth of architectural knowledge. Our Ras Al Khaimah retreat now stands as a statement of contemporary elegance and balance—exactly what we dreamed of.",
        name: "IVAN K., RAS AL KHAIMAH",
        service: "ARCHITECTURAL DESIGN",
      },
      {
        text: "Working with Khales was a masterclass in professionalism. Their landscaping transformed our Dubai villa into a lush, serene retreat. Every detail was perfectly executed.",
        name: "James W. , Dubai",
        service: "Landscaping",
      },
    ],
    partners: [
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
    ],
  },
  ar: {
    title: "عملاؤنا وشركاؤنا",
    testimonials: [
      {
        text: "منذ أول استشارة، أبهرني خالص باحترافيتهم وعمق معرفتهم المعمارية. أصبح منزلنا في رأس الخيمة اليوم تحفة من الأناقة المعاصرة والتوازن، تمامًا كما حلمنا.",
        name: "إيفان ك.، رأس الخيمة",
        service: "تصميم معماري",
      },
      {
        text: "العمل مع خالص كان درسًا في الاحترافية. تنسيق الحدائق حوّل فيلتنا في دبي إلى ملاذ أخضر هادئ. كل التفاصيل نُفذت بإتقان.",
        name: "جيمس و.، دبي",
        service: "تنسيق الحدائق",
      },
    ],
    partners: [
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
    ],
  },
};

// --- MAIN COMPONENT ---
const TestimonialSlider = () => {
  const { language } = useLanguage();
  const currentContent = content[language] || content.eng;

  // Create a looped array for the marquee effect
  const loopedPartners = [
    ...currentContent.partners,
    ...currentContent.partners,
    ...currentContent.partners,
  ];

  return (
    <SectionWrapper>
      <Container>
        <Header>
          <Title>{currentContent.title}</Title>
        </Header>

        <TestimonialWrapper>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 1,
              },
            }}
          >
            {currentContent.testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <TestimonialContent>
                  <QuoteText>"{testimonial.text}"</QuoteText>
                  <Author>
                    <AuthorName>{testimonial.name}</AuthorName>
                    <AuthorService>{testimonial.service}</AuthorService>
                  </Author>
                </TestimonialContent>
              </SwiperSlide>
            ))}
          </Swiper>
        </TestimonialWrapper>
      </Container>

      <PartnersMarquee>
        <Swiper
          // FIX: Refined settings for a perfect, non-stop marquee scroll
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView="auto"
          loop={true}
          speed={10000} // This is the duration of the scroll animation. Longer is smoother.
          autoplay={{
            delay: 0, // No delay between transitions
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          // Adding loopedSlides helps Swiper calculate the loop correctly
          loopedSlides={5}
        >
          {loopedPartners.map((partner, index) => (
            <SwiperSlide key={index}>
              <PartnerCard>
                <img
                  src={partner.logo}
                  alt={`Khales partner company logo ${index + 1}`}
                />
              </PartnerCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </PartnersMarquee>
    </SectionWrapper>
  );
};

// --- STYLED COMPONENTS ---
const SectionWrapper = styled.section`
  padding: 6rem 0;
  background-color: #fff;
  position: relative;
  overflow: hidden;
  font-family: "Inter", sans-serif;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(102, 161, 9, 0.3),
      transparent
    );
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const TestimonialWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto 6rem;
`;

const TestimonialContent = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(102, 161, 9, 0.1);
`;

const QuoteText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 2rem;
  font-style: italic;
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Author = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const AuthorName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

const AuthorService = styled.span`
  font-size: 0.9rem;
  color: #66a109;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PartnersMarquee = styled.div`
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
  padding: 3rem 0;
  border-top: 1px solid rgba(102, 161, 9, 0.1);
  .swiper {
    overflow: visible;
  }
  .swiper-slide {
    width: auto !important;
  }
`;

const PartnerCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(102, 161, 9, 0.1);
  transition: all 0.3s ease;
  height: 80px;
  min-width: 120px;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
  img {
    max-height: 50px;
    max-width: 100px;
    object-fit: contain;
    filter: grayscale(100%);
    transition: filter 0.3s ease;
  }
  &:hover img {
    filter: grayscale(0%);
  }
`;

export default TestimonialSlider;
