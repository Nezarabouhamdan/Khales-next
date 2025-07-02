// components/SuccessStoryV2.jsx
"use client";

import React, { useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion, useInView } from "framer-motion";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa";

//================================================================
// 1. KEYFRAME ANIMATION FOR THE IMAGE
//================================================================
const kenBurns = keyframes`
  0% { transform: scale(1.0) translate(0, 0); }
  100% { transform: scale(1.1) translate(2%, -1%); }
`;

//================================================================
// 2. STYLED COMPONENTS
//================================================================

const SectionWrapper = styled.section`
  padding: 4rem 0;
  background-color: #ffffff;
  font-family: "Inter", sans-serif;
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const SplitContainer = styled.div`
  display: flex;
  min-height: 70vh;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

  @media (max-width: 992px) {
    flex-direction: column;
    min-height: auto;
  }
`;

const ImagePanel = styled(motion.div)`
  flex: 1;
  position: relative;
  background-color: #1a1a1a;
  min-height: 500px;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: ${kenBurns} 15s ease-in-out infinite alternate;
  }
`;

const TextPanel = styled(motion.div)`
  flex: 1;
  background-color: #f8f9fa;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 992px) {
    padding: 3rem 2rem;
  }
`;

const FloatingTitle = styled(motion.h2)`
  position: absolute;
  top: 00%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
  padding: 0.5rem 1.5rem;
  border-radius: 10px;
  color: black;
  backdrop-filter: blur(5px);

  @media (max-width: 992px) {
    top: 250px; /* Position over the bottom of the image */
  }
`;

const QuoteIcon = styled(motion.div)`
  font-size: 2.5rem;
  color: #66a109;
`;

const TestimonialText = styled(motion.p)`
  font-size: 1.25rem;
  font-style: italic;
  line-height: 1.8;
  color: #333;
  margin: 1rem 0 2rem 0;
  flex-grow: 1;
`;

const AuthorInfo = styled(motion.div)`
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a1a1a;
  }
  p {
    font-size: 1rem;
    color: #555;
  }
`;

const NavArrows = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #ddd;
    background-color: #fff;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: #66a109;
      border-color: #66a109;
      color: #fff;
      transform: scale(1.1);
    }
  }
`;

//================================================================
// 3. MAIN COMPONENT WITH ANIMATIONS
//================================================================
const SuccessStoryV2 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2, delayChildren: 0.5 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  const imageVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [1, -0.05, 0.01, 0.99] },
    },
  };
  const textPanelVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };

  return (
    <SectionWrapper>
      <SectionContainer ref={ref}>
        <SplitContainer>
          <ImagePanel
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <img
              src="https://i.ibb.co/M5NkfbRm/Rectangle.png"
              alt="Majed AlKindi"
            />
          </ImagePanel>

          <TextPanel
            variants={textPanelVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <QuoteIcon variants={itemVariants}>
                <FaQuoteLeft />
              </QuoteIcon>
              <TestimonialText variants={itemVariants}>
                “Partnering with this team was a game-changer. Their strategic
                planning and unwavering commitment to quality turned a complex
                architectural vision into a stunning reality.”
              </TestimonialText>
              <AuthorInfo variants={itemVariants}>
                <h3>Majed AlKindi</h3>
                <p>CEO and Founder of Khales Group</p>
              </AuthorInfo>
              <NavArrows variants={itemVariants}>
                <button aria-label="Previous testimonial">
                  <FaArrowLeft />
                </button>
                <button aria-label="Next testimonial">
                  <FaArrowRight />
                </button>
              </NavArrows>
            </motion.div>
          </TextPanel>
        </SplitContainer>

        <FloatingTitle
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        >
          Success Story
        </FloatingTitle>
      </SectionContainer>
    </SectionWrapper>
  );
};

export default SuccessStoryV2;
