// components/ClientsAndPartners.jsx (Improved Version)
"use client";

import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useLanguage } from "../../Context/Languagecontext";

import "swiper/css";

// --- DATA FOR THE COMPONENT (Unchanged) ---
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

// --- ANIMATION VARIANTS (IMPROVEMENT) ---
const testimonialVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <SectionTitle>{currentContent.title}</SectionTitle>
        </motion.div>

        <TestimonialWrapper>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            speed={800} // Speed of the slide transition
            effect="fade" // Added for smoother transition
            fadeEffect={{ crossFade: true }}
            dir={language === "ar" ? "rtl" : "ltr"}
            key={language}
          >
            {currentContent.testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <AnimatePresence mode="wait">
                  <TestimonialContent
                    key={testimonial.name} // Key change triggers animation
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
          spaceBetween={50} // Increased space
          slidesPerView="auto"
          loop={true}
          speed={12000} // Slightly adjusted speed for smoothness
          autoplay={{
            delay: 1, // Using 1ms instead of 0 for max browser compatibility
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          loopedSlides={currentContent.partners.length} // More accurate looped slides
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

// --- STYLED COMPONENTS (IMPROVED) ---
const SectionWrapper = styled.section`
  padding: 8rem 0;
  // IMPROVEMENT: Cleaner background
  background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);
  position: relative;
  overflow: hidden;
  font-family: "Inter", sans-serif;
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

  // IMPROVEMENT: Decorative quotation marks for better design
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
  max-width: 700px; // Constrain line length for readability
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

  // IMPROVEMENT: Gradient fade on edges for seamless look
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
    width: auto; // Let Swiper's "slidesPerView: 'auto'" handle width
  }
`;

const PartnerCard = styled.div`
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px; // Consistent height for alignment
  padding: 0 2.5rem; // Horizontal padding

  img {
    max-width: 200px; // Max logo width
    max-height: 250px; // Max logo height
    object-fit: contain; // Prevents distortion
    filter: grayscale(100%);
    opacity: 0.5;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); // Smoother transition
  }
  &:hover img {
    filter: grayscale(0%);
    opacity: 1;
    transform: scale(1.1);
  }
`;

export default ClientsAndPartners;
