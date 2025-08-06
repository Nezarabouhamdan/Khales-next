"use client"; //  هذا هو السطر الأهم لحل المشكلة

import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

// STYLED COMPONENTS for this section
const StyledFAQSection = styled.section`
  padding: 6rem 2rem;
  background-color: #f8f9fa;
  direction: ${(props) => (props.$isRTL ? "rtl" : "ltr")};

  .faq-container {
    max-width: 900px;
    margin: 0 auto;
  }

  .faq-title {
    font-size: 2.8rem;
    font-weight: 700;
    text-align: center;
    color: #333;
    margin-bottom: 3rem;
  }
`;

const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FAQItem = styled.div`
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  overflow: hidden;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  }
`;

const FAQQuestion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;

  .icon {
    color: #66a109;
    font-size: 1rem;
    flex-shrink: 0;
    margin-left: ${(props) => (props.$isRTL ? "0" : "1rem")};
    margin-right: ${(props) => (props.$isRTL ? "1rem" : "0")};
  }
`;

const FAQAnswer = styled(motion.div)`
  padding: 0 1.5rem 1.5rem 1.5rem;
  color: #555;
  font-size: 1.1rem;
  line-height: 1.8;
`;

// FAQ Component using the styles above
export default function FAQSection({ lang }) {
  const isRTL = lang === "ar";
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = isRTL
    ? [
        {
          question: "ما هي الخدمات التي تقدمها شركة خالص؟",
          answer:
            "نقدم خدمات شاملة تشمل التصميم المعماري، التصميم الداخلي، تصميم المناظر الطبيعية، إدارة المشاريع، والاستشارات الهندسية في جميع أنحاء الإمارات.",
        },
        {
          question: "في أي المناطق تعمل شركة خالص؟",
          answer:
            "نعمل في جميع أنحاء دولة الإمارات العربية المتحدة بما في ذلك دبي وأبوظبي والشارقة وباقي الإمارات.",
        },
        {
          question: "كم تستغرق مدة تنفيذ المشاريع؟",
          answer:
            "تختلف مدة التنفيذ حسب حجم وتعقيد المشروع، ولكننا نلتزم بالجداول الزمنية المتفق عليها مع ضمان أعلى معايير الجودة.",
        },
      ]
    : [
        {
          question: "What services does Khales offer?",
          answer:
            "We provide comprehensive services including architectural design, interior design, landscape design, project management, and engineering consultancy throughout the UAE.",
        },
        {
          question: "Which areas does Khales serve?",
          answer:
            "We serve clients across the United Arab Emirates including Dubai, Abu Dhabi, Sharjah, and all other emirates.",
        },
        {
          question: "How long do projects typically take?",
          answer:
            "Project duration varies based on size and complexity, but we commit to agreed timelines while ensuring the highest quality standards.",
        },
        {
          question: "Do you handle both residential and commercial projects?",
          answer:
            "Yes, we specialize in both luxury residential projects (villas, apartments) and commercial projects (offices, hotels, retail spaces) throughout Dubai and the UAE.",
        },
        {
          question:
            "What makes Khales different from other architecture firms in Dubai?",
          answer:
            "Our unique combination of technical expertise, creative innovation, and deep understanding of UAE market requirements sets us apart. We deliver sustainable, culturally-sensitive designs that exceed client expectations.",
        },
      ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <StyledFAQSection $isRTL={isRTL}>
      <div className="faq-container">
        <h2 className="faq-title">
          {isRTL ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
        </h2>
        <AccordionWrapper>
          {faqs.map((faq, index) => (
            <FAQItem key={index}>
              <FAQQuestion onClick={() => handleToggle(index)} $isRTL={isRTL}>
                <span>{faq.question}</span>
                <span className="icon">
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </FAQQuestion>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <FAQAnswer
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    {faq.answer}
                  </FAQAnswer>
                )}
              </AnimatePresence>
            </FAQItem>
          ))}
        </AccordionWrapper>
      </div>
    </StyledFAQSection>
  );
}
