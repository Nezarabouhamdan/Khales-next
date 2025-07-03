// components/ServicesOverview.jsx
"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
// Icons are needed for the updated card design
import {
  FaRegBuilding,
  FaDraftingCompass,
  FaCubes,
  FaMicrochip,
} from "react-icons/fa";

//================================================================
// DATA (NOW WITH ICONS)
//================================================================
const engineeringServices = [
  { icon: <FaRegBuilding />, title: "التصميم المبدئي" },
  { icon: <FaDraftingCompass />, title: "الهندسة المعمارية" },
  { icon: <FaCubes />, title: "الهيكل الإنشائي" },
  { icon: <FaMicrochip />, title: "الكهروميكانيكية" }, // MEP
];

//================================================================
// STYLED COMPONENTS (WITH NEW ENHANCEMENTS)
//================================================================
const SectionWrapper = styled.section`
  padding: 6rem 2rem;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  font-family: "Almarai", sans-serif;
  direction: rtl;
`;

const ContentContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 4rem; /* Reduced gap slightly */
`;

const ServiceBlock = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const TextColumn = styled.div``;
const CardsColumn = styled.div``;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;

const Subtitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 400;
  color: #555;
  margin-bottom: 1.5rem;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.9;
  color: #555;
  max-width: 450px;
  margin-bottom: 1.5rem;
  @media (max-width: 992px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const ConsultButton = styled.a`
  display: inline-block;
  padding: 0.75rem 2rem;
  border: 1px solid #66a109;
  border-radius: 30px;
  color: #66a109;
  font-weight: 700;
  cursor: pointer;
  background-color: transparent;
  transition: all 0.3s ease;
  &:hover {
    background-color: #66a109;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(102, 161, 9, 0.2);
  }
`;

const CardsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

// Card design updated to use icons instead of images for a cleaner look
const ServiceCard = styled(motion.div)`
  background-color: #f8f9fa;
  border: 1px solid #f0f0f0;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  .icon {
    font-size: 2.5rem;
    color: #66a109; /* Using brand color for icon */
    margin-bottom: 1rem;
    transition: transform 0.3s ease;
  }

  h4 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #333;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
    .icon {
      transform: scale(1.1);
    }
  }
`;

const DecorativeShape = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  transition: transform 0.4s ease-out;
`;

// NEW: Animated Divider Line
const Divider = styled(motion.div)`
  height: 1px;
  background-color: #e9ecef;
  margin: 2rem 0;
`;

//================================================================
// MAIN COMPONENT
//================================================================
const ServicesOverview = () => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };
  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1, ease: [0.6, 0.01, -0.05, 0.95] },
    },
  };

  // Our signature parallax effect logic
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

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Almarai:wght@400;700&display=swap");
      `}</style>
      <SectionWrapper
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <DecorativeShape
          className="shape"
          data-factor="30"
          style={{
            top: "10%",
            right: "5%",
            width: "100px",
            height: "100px",
            background: "rgba(102, 161, 9, 0.05)",
            borderRadius: "50%",
          }}
        />
        <DecorativeShape
          className="shape"
          data-factor="-20"
          style={{
            bottom: "15%",
            left: "5%",
            width: "80px",
            height: "80px",
            border: "1px solid rgba(102, 161, 9, 0.1)",
          }}
        />

        <ContentContainer>
          <ServiceBlock
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <TextColumn>
              <motion.div variants={itemVariants}>
                <Title>إدارة المشاريع:</Title>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Subtitle>دع خالص يتولى مشروعك</Subtitle>
              </motion.div>
            </TextColumn>
            <TextColumn>
              <motion.div variants={itemVariants}>
                <Paragraph>
                  نحن نعتني بكل شيء، من الموافقات الأولية إلى التسليم النهائي.
                  يشرف مديرو المشاريع لدينا على كل التفاصيل والجداول الزمنية
                  والميزانيات لضمان التنفيذ السلس. سواء كانت فيلا أو مشروعًا
                  معقدًا، ستحصل على رؤية كاملة بدون أي ضغوط.
                </Paragraph>
              </motion.div>
              <motion.div variants={itemVariants}>
                <ConsultButton href="#">استشر الآن</ConsultButton>
              </motion.div>
            </TextColumn>
          </ServiceBlock>

          <Divider
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ transformOrigin: "center" }}
          />

          <ServiceBlock
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <TextColumn>
              <motion.div variants={itemVariants}>
                <Title>الاستشارات الهندسية</Title>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Paragraph>
                  يقوم مهندسونا بإنشاء خطط واضحة ومتوافقة تلبي جميع اللوائح
                  المحلية وظروف الموقع. تتم مراجعة كل التفاصيل من أجل السلامة
                  والكفاءة والأداء طويل الأمد.
                </Paragraph>
              </motion.div>
              <motion.div variants={itemVariants}>
                <ConsultButton href="#">استشر الآن</ConsultButton>
              </motion.div>
            </TextColumn>
            <CardsColumn>
              <CardsGrid variants={containerVariants}>
                {engineeringServices.map((service, index) => (
                  <ServiceCard key={index} variants={itemVariants}>
                    <div className="icon">{service.icon}</div>
                    <h4>{service.title}</h4>
                  </ServiceCard>
                ))}
              </CardsGrid>
            </CardsColumn>
          </ServiceBlock>
        </ContentContainer>
      </SectionWrapper>
    </>
  );
};

export default ServicesOverview;
