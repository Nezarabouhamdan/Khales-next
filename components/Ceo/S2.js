// components/SuccessStory.jsx
"use client";

import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

//================================================================
// 1. STYLED COMPONENTS
//================================================================

const SectionContainer = styled.section`
  width: 100%;
  padding: 6rem 2rem;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  font-family: "Inter", sans-serif;
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
  min-height: 450px; /* Ensure space for the absolute positioned elements */
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const PersonImage = styled(motion.img)`
  max-width: 100%;
  max-height: 500px;
  position: relative;
  z-index: 2;
  /* Making the image move with parallax */
  transition: transform 0.4s ease-out;
`;

const Nameplate = styled(motion.div)`
  background-color: #66a109;
  color: white;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  position: absolute;
  bottom: 10%;
  left: 0;
  z-index: 3;
  box-shadow: 0 10px 30px rgba(102, 161, 9, 0.3);
  /* Making the nameplate move with parallax */
  transition: transform 0.4s ease-out;

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
    left: 50%;
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
// 2. MAIN COMPONENT WITH ANIMATIONS
//================================================================
const SuccessStory = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Parallax effect for the entire section
  const handleMouseMove = (e) => {
    const { currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const personImage = currentTarget.querySelector(".person-image");
    const nameplate = currentTarget.querySelector(".nameplate");
    const shapes = currentTarget.querySelectorAll(".shape");

    if (personImage) {
      personImage.style.transform = `translate(${-x / 30}px, ${-y / 30}px)`;
    }
    if (nameplate) {
      nameplate.style.transform = `translate(${x / 20}px, ${y / 20}px)`;
    }
    shapes.forEach((shape) => {
      const factor = parseInt(shape.getAttribute("data-factor")) || 20;
      shape.style.transform = `translate(${x / factor}px, ${y / factor}px)`;
    });
  };

  const handleMouseLeave = (e) => {
    const { currentTarget } = e;
    const personImage = currentTarget.querySelector(".person-image");
    const nameplate = currentTarget.querySelector(".nameplate");
    const shapes = currentTarget.querySelectorAll(".shape");

    if (personImage) personImage.style.transform = "translate(0, 0)";
    if (nameplate) nameplate.style.transform = "translate(0, 0)";
    shapes.forEach((shape) => {
      shape.style.transform = "translate(0, 0)";
    });
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <SectionContainer
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <DecorativeShape
        className="shape"
        data-factor="30"
        style={{
          top: "15%",
          left: "5%",
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
          right: "5%",
          width: "50px",
          height: "50px",
          border: "2px solid rgba(102, 161, 9, 0.1)",
        }}
      />

      <ContentWrapper>
        <TextColumn
          as={motion.div}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Title>Success Story</Title>
          </motion.div>
          <QuoteIcon
            as={motion.div}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              delay: 0.3,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
          >
            <FaQuoteLeft />
          </QuoteIcon>
          <TestimonialText variants={itemVariants}>
            “Partnering with this team was a game-changer for our flagship
            project. Their strategic planning and unwavering commitment to
            quality turned a complex architectural vision into a stunning
            reality. They didn't just manage the project; they elevated it.”
          </TestimonialText>
          <TestimonialText variants={itemVariants}>
            “Their expertise in sustainable practices and resource optimization
            not only ensured we met our environmental goals but also delivered
            significant long-term value. I wholeheartedly recommend their
            services to any organization serious about excellence.”
          </TestimonialText>
        </TextColumn>

        <ImageColumn>
          <PersonImage
            className="person-image"
            src="https://i.ibb.co/M5NkfbRm/Rectangle.png"
            alt="Majed AlKindi"
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <Nameplate
            className="nameplate"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h3>Majed AlKindi</h3>
            <p>CEO and Founder of Khales Group</p>
          </Nameplate>
        </ImageColumn>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default SuccessStory;
