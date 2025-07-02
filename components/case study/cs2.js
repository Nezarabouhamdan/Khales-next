// components/CaseStudy.jsx
"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";

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
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Header = styled(motion.div)`
  margin-bottom: 3rem;
`;

const CaseStudyLabel = styled.p`
  color: #66a109;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #555;
`;

const ContentBlock = styled(motion.div)`
  margin-bottom: 3rem;
`;

const Subheading = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
  border-left: 3px solid #66a109;
  padding-left: 1rem;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: #495057;
  margin-bottom: 2rem;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ImageWrapper = styled(motion.div)`
  overflow: hidden;
  border-radius: 12px;
  height: 300px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease-out;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const DecorativeShape = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  transition: transform 0.4s ease-out;
`;

//================================================================
// 2. MAIN COMPONENT
//================================================================
const CaseStudy = () => {
  const handleMouseMove = (e) => {
    const shapes = e.currentTarget.querySelectorAll(".shape");
    shapes.forEach((shape) => {
      const factor = parseInt(shape.getAttribute("data-factor")) || 20;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / factor;
      const y = (e.clientY - rect.top - rect.height / 2) / factor;
      shape.style.transform = `translate(${x}px, ${y}px)`;
    });
  };
  const handleMouseLeave = (e) => {
    const shapes = e.currentTarget.querySelectorAll(".shape");
    shapes.forEach((shape) => {
      shape.style.transform = `translate(0px, 0px)`;
    });
  };

  const sectionVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <SectionContainer
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Our signature parallax shapes, adapted for a cleaner look */}
      <DecorativeShape
        className="shape"
        data-factor="30"
        style={{
          top: "15%",
          left: "5%",
          width: "80px",
          height: "80px",
          background: "rgba(102, 161, 9, 0.05)",
          borderRadius: "50%",
        }}
      />
      <DecorativeShape
        className="shape"
        data-factor="-25"
        style={{
          top: "40%",
          right: "5%",
          width: "60px",
          height: "60px",
          border: "1px solid rgba(102, 161, 9, 0.1)",
        }}
      />
      <DecorativeShape
        className="shape"
        data-factor="20"
        style={{
          bottom: "10%",
          left: "10%",
          width: "50px",
          height: "50px",
          background: "rgba(44, 62, 80, 0.05)",
          borderRadius: "50%",
        }}
      />

      <ContentWrapper>
        <Header
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <CaseStudyLabel>Case study</CaseStudyLabel>
          <Title>Luxury Home Mountain View Estate</Title>
          <MetaInfo>
            <FaCalendarAlt />
            <span>Year - 2023</span>
          </MetaInfo>
        </Header>

        <ContentBlock
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants}>
            <Subheading>Project Overview</Subheading>
            <Paragraph>
              Our objective was to design and construct a bespoke luxury estate
              that harmonizes with its breathtaking mountain surroundings. The
              client envisioned a sanctuary of modern elegance, equipped with
              state-of-the-art technology while maintaining a warm, inviting
              atmosphere for family and guests. The project encompassed full
              architectural design, interior planning, and smart home
              integration.
            </Paragraph>
          </motion.div>
          <ImageGrid>
            <ImageWrapper variants={itemVariants}>
              <img
                src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80"
                alt="Elegant dining room"
              />
            </ImageWrapper>
            <ImageWrapper variants={itemVariants}>
              <img
                src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80" //not working
                alt="Spacious living room"
              />
            </ImageWrapper>
          </ImageGrid>
          <motion.div variants={itemVariants}>
            <Paragraph>
              The design philosophy centered on creating seamless transitions
              between indoor and outdoor spaces. We utilized natural materials
              like stone and timber, complemented by expansive glass walls that
              frame the panoramic mountain views. Every detail, from the custom
              millwork to the curated art pieces, was meticulously selected to
              reflect a sophisticated yet comfortable living experience.
            </Paragraph>
          </motion.div>
          <ImageGrid>
            <ImageWrapper variants={itemVariants}>
              <img
                src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80" //not working
                alt="Cozy seating area"
              />
            </ImageWrapper>
            <ImageWrapper variants={itemVariants}>
              <img
                src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80"
                alt="Modern luxury bedroom"
              />
            </ImageWrapper>
          </ImageGrid>
        </ContentBlock>

        <ContentBlock
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants}>
            <Subheading>Challenges & Solutions</Subheading>
            <Paragraph>
              The primary challenge was integrating extensive smart home
              automation without compromising the home's clean, minimalist
              aesthetic. Our solution involved designing custom enclosures and
              utilizing centralized control systems hidden from view. This
              provided the client with effortless control over lighting,
              climate, and security, all while preserving the integrity of the
              interior design. Another challenge was the remote location, which
              required meticulous logistical planning for materials and labor, a
              feat we accomplished through our robust project management
              framework, ensuring zero delays.
            </Paragraph>
          </motion.div>
        </ContentBlock>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default CaseStudy;
