// components/ServicesOverview.jsx
"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

//================================================================
// DATA (WITH ARABIC CONTENT AND IMAGE URLS)
//================================================================
const engineeringServices = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
    title: "التصميم المبدئي",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80",
    title: "الهندسة المعمارية",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
    title: "الهيكل الإنشائي",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&q=80",
    title: "الكهروميكانيكية",
  }, // MEP
];

//================================================================
// STYLED COMPONENTS
//================================================================
const SectionWrapper = styled.section`
  padding: 6rem 2rem;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  font-family: "Almarai", sans-serif;
  direction: rtl; /* Set layout to RTL */
`;

const ContentContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 6rem;
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
  font-size: 1.1rem; /* Slightly larger for better readability in Arabic */
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

const ServiceCard = styled(motion.div)`
  border-radius: 16px;
  text-align: center;
  overflow: hidden;
  position: relative;
  height: 250px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  h4 {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
    z-index: 3;
    transition: transform 0.3s ease;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    z-index: 2;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    img {
      transform: scale(1.05);
    }
    h4 {
      transform: translate(-50%, -5px);
    }
  }
`;

const DecorativeShape = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  transition: transform 0.4s ease-out;
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

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Almarai:wght@400;700&display=swap");
      `}</style>
      <SectionWrapper>
        <DecorativeShape
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
                    <img src={service.imageUrl} alt={service.title} />
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
