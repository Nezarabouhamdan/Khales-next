// components/SuccessStory.jsx
"use client";

import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa"; // Import both icons
import { useLanguage } from "@/Context/Languagecontext"; // Adjust path if needed

//================================================================
// 1. DYNAMIC CONTENT
//================================================================
const storyContent = {
  eng: {
    title: "Success Story",
    testimonial1:
      "“Partnering with this team was a game-changer for our flagship project. Their strategic planning and unwavering commitment to quality turned a complex architectural vision into a stunning reality. They didn't just manage the project; they elevated it.”",
    testimonial2:
      "“Their expertise in sustainable practices and resource optimization not only ensured we met our environmental goals but also delivered significant long-term value. I wholeheartedly recommend their services to any organization serious about excellence.”",
    person: {
      name: "Majed AlKindi",
      title: "CEO and Founder of Khales Group",
      alt: "Majed AlKindi, CEO of Khales Group",
    },
  },
  ar: {
    title: "قصة نجاح",
    testimonial1:
      "”كان الشراكة مع هذا الفريق نقطة تحول لمشروعنا الرائد. تخطيطهم الاستراتيجي والتزامهم الراسخ بالجودة حوّلا رؤية معمارية معقدة إلى حقيقة مذهلة. لم يكتفوا بإدارة المشروع فحسب، بل ارتقوا به.“",
    testimonial2:
      "”خبرتهم في الممارسات المستدامة وتحسين الموارد لم تضمن فقط تحقيق أهدافنا البيئية، بل قدمت أيضًا قيمة كبيرة على المدى الطويل. أوصي بخدماتهم بشدة لأي منظمة جادة تسعى إلى التميز.“",
    person: {
      name: "ماجد الكندي",
      title: "الرئيس التنفيذي ومؤسس مجموعة خالص",
      alt: "ماجد الكندي، الرئيس التنفيذي لمجموعة خالص",
    },
  },
};

//================================================================
// 2. STYLED COMPONENTS (with RTL support)
//================================================================

const SectionContainer = styled.section`
  width: 100%;
  padding: 6rem 2rem;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  font-family: "Inter", sans-serif;
  direction: ${(props) => props.dir}; // Set overall direction
  @media (max-width: 992px) {
    padding: 4rem 1.5rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 3rem;
  position: relative;
  z-index: 2;

  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextColumn = styled(motion.div)`
  flex: 1;
  /* Set text alignment based on direction */
  text-align: ${(props) => (props.dir === "rtl" ? "right" : "left")};
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #1a1a1a;
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const QuoteIcon = styled(motion.div)`
  font-size: 3rem;
  color: #66a109;
  margin: 1.5rem 0;
`;

const TestimonialText = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const ImageColumn = styled.div`
  flex: 1;
  position: relative;
  min-height: 450px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const PersonImage = styled(motion.img)`
  max-width: 100%;
  max-height: 500px;
  position: relative;
  z-index: 2;
  transition: transform 0.4s ease-out;
`;

const Nameplate = styled(motion.div)`
  background-color: #66a109;
  color: white;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  position: absolute;
  bottom: 10%;
  z-index: 3;
  box-shadow: 0 10px 30px rgba(102, 161, 9, 0.3);
  transition: transform 0.4s ease-out;

  /* RTL FIX: Conditional positioning */
  left: ${(props) => (props.dir === "rtl" ? "auto" : "0")};
  right: ${(props) => (props.dir === "rtl" ? "0" : "auto")};

  /* RTL FIX: Text alignment */
  text-align: ${(props) => (props.dir === "rtl" ? "right" : "left")};

  h3 {
    font-size: 1.75rem;
    font-weight: 600;
    margin: 0;
  }

  p {
    font-size: 1rem;
    margin: 0.25rem 0 0;
    opacity: 0.9;
  }

  @media (max-width: 992px) {
    /* Reset for centered mobile view */
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    width: 80%;
    text-align: center;
  }
`;

const DecorativeShape = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  transition: transform 0.4s ease-out;
`;

//================================================================
// 3. MAIN COMPONENT (with RTL logic)
//================================================================
const SuccessStory = () => {
  const { language } = useLanguage();
  const content = storyContent[language] || storyContent.eng;
  const isRTL = language === "ar";

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Parallax effect (works with RTL without changes)
  const handleMouseMove = (e) => {
    // ... (no changes needed in this function)
    const { currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const nameplate = currentTarget.querySelector(".nameplate");
    const shapes = currentTarget.querySelectorAll(".shape");
    if (nameplate) {
      nameplate.style.transform = `translate(${x / 20}px, ${y / 20}px)`;
    }
    shapes.forEach((shape) => {
      const factor = parseInt(shape.getAttribute("data-factor")) || 20;
      shape.style.transform = `translate(${x / factor}px, ${y / factor}px)`;
    });
  };

  const handleMouseLeave = (e) => {
    // ... (no changes needed in this function)
    const { currentTarget } = e;
    const nameplate = currentTarget.querySelector(".nameplate");
    const shapes = currentTarget.querySelectorAll(".shape");
    if (nameplate) nameplate.style.transform = "translate(0, 0)";
    shapes.forEach((shape) => {
      shape.style.transform = "translate(0, 0)";
    });
  };

  // RTL FIX: Dynamic animation variants
  const textItemVariants = {
    hidden: { opacity: 0, x: isRTL ? 30 : -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <SectionContainer
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <DecorativeShape
        className="shape"
        data-factor="30"
        style={{
          top: "15%",
          left: isRTL ? "auto" : "5%",
          right: isRTL ? "5%" : "auto",
          width: "80px",
          height: "80px",
          background: "rgba(102, 161, 9, 0.08)",
          borderRadius: "50%",
        }}
      />
      <DecorativeShape
        className="shape"
        data-factor="-20"
        style={{
          bottom: "10%",
          right: isRTL ? "auto" : "5%",
          left: isRTL ? "5%" : "auto",
          width: "50px",
          height: "50px",
          border: "2px solid rgba(102, 161, 9, 0.1)",
        }}
      />

      <ContentWrapper>
        <TextColumn
          dir={isRTL ? "rtl" : "ltr"}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={textItemVariants}>
            <Title>{content.title}</Title>
          </motion.div>
          <QuoteIcon
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              delay: 0.3,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
          >
            {/* RTL FIX: Use the correct quote icon for the language */}
            {isRTL ? <FaQuoteRight /> : <FaQuoteLeft />}
          </QuoteIcon>
          <TestimonialText variants={textItemVariants}>
            {content.testimonial1}
          </TestimonialText>
          <TestimonialText variants={textItemVariants}>
            {content.testimonial2}
          </TestimonialText>
        </TextColumn>

        <ImageColumn>
          <PersonImage
            className="person-image"
            src="https://i.ibb.co/M5NkfbRm/Rectangle.png"
            alt={content.person.alt}
            initial={{ opacity: 0, x: isRTL ? -100 : 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <Nameplate
            dir={isRTL ? "rtl" : "ltr"}
            className="nameplate"
            initial={{ opacity: 0, x: isRTL ? 100 : -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h3>{content.person.name}</h3>
            <p>{content.person.title}</p>
          </Nameplate>
        </ImageColumn>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default SuccessStory;
