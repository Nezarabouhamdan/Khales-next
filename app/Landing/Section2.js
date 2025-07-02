// components/DetailedServices.jsx
"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

//================================================================
// STYLED COMPONENTS (WITH RTL & RESPONSIVE SUPPORT)
//================================================================
const SectionWrapper = styled.section`
  padding: 6rem 2rem;
  background-color: #ffffff;
  font-family: "Almarai", sans-serif;
  direction: rtl; /* Set layout to RTL */
`;

const ContentContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 6rem;
`;

const ServiceBlock = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const TextColumn = styled.div`
  @media (max-width: 992px) {
    /* On mobile, for RTL, this will be the second item. Set order to ensure it comes first. */
    order: 1;
  }
`;

const ImageColumn = styled(motion.div)`
  border-radius: 16px;
  overflow: hidden;
  height: 400px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 992px) {
    order: 2;
    height: 300px;
  }
`;

const InteriorDesignSection = styled(motion.div)``;

const InteriorGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 1rem;
  margin-top: 2rem;

  /* The main image spans 3 columns */
  .main-img {
    grid-column: span 3;
    height: 500px;
  }
  .sub-img {
    height: 250px;
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    .main-img {
      grid-column: span 2;
      height: 400px;
    }
    .sub-img {
      height: 200px;
    }
    /* Make the last odd one span full width */
    .sub-img:last-child:nth-child(odd) {
      grid-column: span 2;
    }
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    .main-img,
    .sub-img:last-child:nth-child(odd) {
      grid-column: span 1;
    }
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.9;
  color: #555;
  max-width: 450px;
  margin-bottom: 2rem;
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

//================================================================
// MAIN COMPONENT
//================================================================
const DetailedServices = () => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Almarai:wght@400;700&display=swap");
      `}</style>
      <SectionWrapper>
        <ContentContainer>
          {/* --- SITE SUPERVISION --- */}
          <ServiceBlock
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <ImageColumn variants={itemVariants}>
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80"
                alt="الإشراف على الموقع"
              />
            </ImageColumn>
            <TextColumn>
              <motion.div variants={itemVariants}>
                <Title>الإشراف على الموقع</Title>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Paragraph>
                  قوة تصميمك تكمن في تنفيذه. يضمن مشرفونا في الموقع أن كل مهمة
                  تلبي أعلى معايير الجودة وفي الوقت المحدد. نحن نمثل مصالحك،
                  ونراقب الجودة، ونمنع الأخطاء المكلفة.
                </Paragraph>
              </motion.div>
              <motion.div variants={itemVariants}>
                <ConsultButton href="#">استشر الآن</ConsultButton>
              </motion.div>
            </TextColumn>
          </ServiceBlock>

          {/* --- INTERIOR DESIGN --- */}
          <InteriorDesignSection
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={itemVariants}>
              <Title>التصميم الداخلي</Title>
              <Paragraph>
                نصمم بيئات داخلية مدروسة وعملية ومصممة خصيصًا لتناسب طابع كل
                عقار. سواء كانت حديقة خاصة أو مساحة معيشة خارجية متكاملة، فإن
                حلولنا مبنية حول نمط حياتك والبيئة المحلية، مع مراعاة الراحة
                والجمال والمناخ على المدى الطويل.
              </Paragraph>
              <ConsultButton href="#">استشر الآن</ConsultButton>
            </motion.div>

            <InteriorGallery>
              <ImageColumn variants={itemVariants} className="main-img">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80"
                  alt="تصميم داخلي فاخر"
                />
              </ImageColumn>
              <ImageColumn variants={itemVariants} className="sub-img">
                <img
                  src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80"
                  alt="تصميم داخلي - غرفة طعام"
                />
              </ImageColumn>
              <ImageColumn variants={itemVariants} className="sub-img">
                <img
                  src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80"
                  alt="تصميم داخلي - غرفة نوم"
                />
              </ImageColumn>
              <ImageColumn variants={itemVariants} className="sub-img">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
                  alt="تصميم داخلي - مطبخ"
                />
              </ImageColumn>
              <ImageColumn variants={itemVariants} className="sub-img">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
                  alt="تصميم داخلي - ركن جلوس"
                />
              </ImageColumn>
              <ImageColumn variants={itemVariants} className="sub-img">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
                  alt="تصميم داخلي - زاوية"
                />
              </ImageColumn>
            </InteriorGallery>
          </InteriorDesignSection>

          {/* --- LANDSCAPE DESIGN --- */}
          <ServiceBlock
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <ImageColumn variants={itemVariants}>
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
                alt="تصميم المناظر الطبيعية"
              />
            </ImageColumn>
            <TextColumn>
              <motion.div variants={itemVariants}>
                <Title>تصميم المناظر الطبيعية</Title>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Paragraph>
                  نصمم بيئات خارجية مدروسة وعملية ومصممة خصيصًا لتناسب طابع كل
                  عقار. سواء كانت حديقة خاصة أو مساحة معيشة خارجية متكاملة، فإن
                  حلولنا مبنية حول نمط حياتك والبيئة المحلية، مع مراعاة الراحة
                  والجمال والمناخ على المدى الطويل.
                </Paragraph>
              </motion.div>
              <motion.div variants={itemVariants}>
                <ConsultButton href="#">استشر الآن</ConsultButton>
              </motion.div>
            </TextColumn>
          </ServiceBlock>
        </ContentContainer>
      </SectionWrapper>
    </>
  );
};

export default DetailedServices;
