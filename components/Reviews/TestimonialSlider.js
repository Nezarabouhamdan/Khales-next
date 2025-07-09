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
        text: "العمل مع خالص كان مثالاً للاحترافية. لقد حوّل فريق تنسيق الحدائق فيلتنا في دبي إلى ملاذ هادئ ومورق. كل تفصيلة تم تنفيذها بإتقان.",
        name: "جيمس و. ، دبي",
        service: "تنسيق حدائق",
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
const ClientsAndPartners = () => {
  const { language } = useLanguage();
  const currentContent = content[language] || content.eng;

  // Duplicate partners for a seamless, infinite loop
  const loopedPartners = [
    ...currentContent.partners,
    ...currentContent.partners,
  ];

  return (
    <SectionWrapper>
      <Container>
        <SectionTitle>{currentContent.title}</SectionTitle>

        <TestimonialWrapper>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop={true}
            // FIX: SLOWED DOWN the testimonial movement significantly (12 seconds per slide)
            autoplay={{ delay: 3200, disableOnInteraction: false }}
            speed={5000} // This is the duration of the scroll animation. Longer is smoother.
            dir={language === "ar" ? "rtl" : "ltr"}
            // Re-initializes Swiper on language change to prevent RTL bugs
            key={language}
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
                <img src={partner.logo} alt={`Partner logo ${index + 1}`} />
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
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 1400px;
    height: 100%;
    background-image: url("https://res.cloudinary.com/greenappletravel-ae/image/upload/v1730893099/greenapple/header/Untitled_design_69_k9jhxg.png");
    background-repeat: no-repeat;
    background-position: center 30%;
    background-size: contain;
    opacity: 0.15;
    z-index: 1;
  }
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
  font-size: 2.8rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 3rem;
  text-align: center;
`;

const TestimonialWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 5rem;
  text-align: center;
  .swiper-slide {
    align-self: stretch;
  }
`;

const TestimonialContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const QuoteText = styled.p`
  font-size: 1.25rem;
  font-style: italic;
  line-height: 1.8;
  color: #333;
  margin: 0;
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Author = styled.div`
  margin-top: 1.5rem;
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
  .swiper-wrapper {
    transition-timing-function: linear !important; // This is the key for non-stop scroll
  }
  .swiper-slide {
    width: 300px;
    @media (max-width: 768px) {
      width: 220px;
    }
  }
`;

const PartnerCard = styled(motion.div)`
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    opacity: 0.6;
    transition: all 0.3s ease;
  }
  &:hover img {
    filter: grayscale(0%);
    opacity: 1;
    transform: scale(1.05);
  }
`;

export default ClientsAndPartners;
