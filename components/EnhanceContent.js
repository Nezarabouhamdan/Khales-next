"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { motion } from "framer-motion"; // لإضافة الحركة
import { FaCogs, FaStar } from "react-icons/fa"; // أيقونات احترافية

// ========================================================================
// STYLED COMPONENTS (المكونات المصممة)
// ========================================================================

const StyledEnhancedContent = styled.section`
  padding: 6rem 2rem;
  background-color: #f8f9fa; // خلفية بلون رمادي فاتح لكسر الروتين
  position: relative;
  overflow: hidden;
  direction: ${(props) => (props.$isRTL ? "rtl" : "ltr")};
`;

const ContentContainer = styled(motion.div)`
  max-width: 1200px; // مساحة أعرض للمحتوى
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const GridContainer = styled.div`
  display: grid;
  // إعطاء النص مساحة أكبر (ثلثين) والصورة (ثلث)
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const TextColumn = styled.div`
  h2 {
    font-size: 2.8rem; // عنوان أكبر وأكثر تأثيراً
    font-weight: 700;
    color: #333;
    margin-bottom: 2rem;
    line-height: 1.4;
  }
  // الفقرة الرئيسية (المقدمة)
  .intro-paragraph {
    font-size: 1.1rem;
    line-height: 1.9;
    color: #555;
    margin-bottom: 2.5rem;
  }
`;

const ImageColumn = styled(motion.div)`
  border-radius: 16px;
  overflow: hidden;
  height: 550px; // زيادة ارتفاع الصورة لتوازن أفضل
  position: relative;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);

  @media (max-width: 992px) {
    height: 350px;
    order: -1;
  }
`;

// حاوية الأقسام الفرعية
const SubsectionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

// تصميم كل قسم فرعي على حدة (أيقونة + عنوان + نص)
const Subsection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;

  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    color: #333;
    margin: 0 0 0.5rem 0;
  }

  p {
    font-size: 1rem;
    line-height: 1.8;
    color: #666;
    margin: 0;
  }
`;

// تصميم حاوية الأيقونة
const IconWrapper = styled.div`
  color: #66a109; // لونكم الأخضر
  font-size: 1.8rem;
  flex-shrink: 0;
  margin-top: 5px;
`;

// ========================================================================
// THE COMPONENT ITSELF (المكون نفسه)
// ========================================================================

export default function EnhancedContent({ lang }) {
  const isRTL = lang === "ar";

  const content =
    lang === "ar"
      ? {
          title: "خالص - رواد الهندسة المعمارية والتصميم الداخلي في دبي",
          intro:
            "مع خبرة تزيد عن عقد من الزمن، نحن في خالص متخصصون في تحويل الرؤى إلى واقع ملموس من خلال حلول تصميمية مبتكرة ومتطورة تلبي وتتجاوز توقعات عملائنا.",
          services: {
            title: "خدماتنا المتكاملة",
            text: "تشمل خدماتنا التصميم المعماري، التصميم الداخلي الفاخر، تصميم المناظر الطبيعية، إدارة المشاريع الشاملة، والاستشارات الهندسية المتخصصة في جميع أنحاء الإمارات.",
          },
          expertise: {
            title: "خبرة وإبداع",
            text: "يجمع فريقنا من المحترفين بين الخبرة التقنية والإبداع الفني لتقديم مشاريع استثنائية تلبي أعلى معايير الجودة والاستدامة، من الفلل الفاخرة إلى المجمعات التجارية.",
          },
        }
      : {
          title:
            "Khales - Premier Architecture & Interior Design Company in Dubai",
          intro:
            "With over a decade of experience, we at Khales specialize in transforming visions into reality through innovative and sophisticated design solutions that exceed client expectations.",
          services: {
            title: "Our Integrated Services",
            text: "Our services encompass architectural design, luxury interior design, landscape design, comprehensive project management, and specialized engineering consultancy across the UAE.",
          },
          expertise: {
            title: "Expertise and Creativity",
            text: "Our team of professionals combines technical expertise with artistic creativity to deliver outstanding projects that meet the highest standards of quality and sustainability, from luxury villas to commercial complexes.",
          },
        };

  // إعدادات الحركة
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <StyledEnhancedContent $isRTL={isRTL}>
      <ContentContainer
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <GridContainer>
          {/* عمود النص */}
          <TextColumn>
            <motion.h2 variants={itemVariants}>{content.title}</motion.h2>
            <motion.p variants={itemVariants} className="intro-paragraph">
              {content.intro}
            </motion.p>

            <SubsectionsWrapper>
              <motion.div variants={itemVariants}>
                <Subsection>
                  <IconWrapper>
                    <FaCogs />
                  </IconWrapper>
                  <div>
                    <h3>{content.services.title}</h3>
                    <p>{content.services.text}</p>
                  </div>
                </Subsection>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Subsection>
                  <IconWrapper>
                    <FaStar />
                  </IconWrapper>
                  <div>
                    <h3>{content.expertise.title}</h3>
                    <p>{content.expertise.text}</p>
                  </div>
                </Subsection>
              </motion.div>
            </SubsectionsWrapper>
          </TextColumn>

          {/* عمود الصورة */}
          <ImageColumn variants={itemVariants}>
            <Image
              src="https://images.pexels.com/photos/1261314/pexels-photo-1261314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt={isRTL ? "تصميم معماري حديث" : "Modern Architectural Design"}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 992px) 100vw, 33vw"
            />
          </ImageColumn>
        </GridContainer>
      </ContentContainer>
    </StyledEnhancedContent>
  );
}
