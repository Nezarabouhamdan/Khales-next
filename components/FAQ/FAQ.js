"use client";
import React, { useState } from "react";
import styled from "styled-components";
import Script from "next/script";

const FAQContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  background: #f8f9fa;
`;

const FAQTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 50px;
  font-weight: 700;
`;

const FAQItem = styled.div`
  background: white;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 25px 30px;
  background: none;
  border: none;
  text-align: left;
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f8f9fa;
  }

  &::after {
    font-size: 1.5rem;
    font-weight: bold;
    color: #3498db;
  }
`;

const FAQAnswer = styled.div`
  overflow: hidden;
  transition: all 0.3s ease;
  color: #555;
  line-height: 1.6;
  font-size: 1rem;
`;

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqData = [
    {
      question:
        "What architecture and interior design services does Khales offer in Dubai?",
      answer:
        "Khales offers comprehensive architecture and interior design services in Dubai, UAE, including residential architecture, commercial building design, luxury interior design, project management, engineering consultancy, development planning, landscape design, and fit-out services. We specialize in both residential villas and commercial projects across the UAE.",
    },
    {
      question: "How much does interior design cost in Dubai?",
      answer:
        "Interior design costs in Dubai vary depending on the project scope, size, and luxury level. At Khales, we offer competitive pricing for residential and commercial interior design projects. Costs typically range from AED 150-500 per square foot for residential projects and AED 200-800 per square foot for commercial spaces. We provide detailed quotes after initial consultation and site assessment.",
    },
    {
      question: "What is the process for hiring an architect in Dubai?",
      answer:
        "The process for hiring Khales as your architect in Dubai includes: 1) Initial consultation to discuss your project requirements, 2) Site visit and assessment, 3) Concept development and design proposal, 4) Detailed architectural drawings and approvals, 5) Project management and construction supervision. We handle all Dubai Municipality approvals and ensure compliance with UAE building codes.",
    },
    {
      question: "How long does an architecture project take in Dubai?",
      answer:
        "Architecture project timelines in Dubai depend on project complexity and size. Typically, residential villa projects take 6-12 months from design to completion, while commercial buildings may take 12-24 months. At Khales, we provide detailed project timelines during the planning phase and ensure efficient project management to meet deadlines while maintaining quality standards.",
    },
    {
      question:
        "Does Khales provide sustainable architecture solutions in UAE?",
      answer:
        "Yes, Khales specializes in sustainable architecture and green building design in the UAE. We incorporate energy-efficient systems, sustainable materials, and environmentally conscious design principles. Our sustainable solutions include solar integration, water conservation systems, natural lighting optimization, and LEED-compliant designs that reduce environmental impact while lowering operational costs.",
    },
    {
      question: "What areas in UAE does Khales serve?",
      answer:
        "Khales provides architecture and interior design services throughout the UAE, including Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain. Our primary office is located in Dubai, and we have successfully completed projects across all emirates, serving both residential and commercial clients throughout the United Arab Emirates.",
    },
    {
      question: "Can Khales help with Dubai Municipality approvals?",
      answer:
        "Absolutely! Khales has extensive experience with Dubai Municipality approvals and UAE building regulations. Our team handles all necessary permits, approvals, and compliance requirements including building permits, NOCs (No Objection Certificates), and final approvals. We ensure your project meets all local building codes and regulations throughout the UAE.",
    },
    {
      question:
        "What makes Khales different from other architecture firms in Dubai?",
      answer:
        "Khales stands out among Dubai architecture firms through our comprehensive approach combining innovative design, local expertise, and international standards. We offer end-to-end services from concept to completion, specialize in both traditional and contemporary designs, maintain strong relationships with local authorities for smooth approvals, and provide personalized service with dedicated project management for each client.",
    },
  ];

  // Structured Data for FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <FAQContainer>
        <FAQTitle>Frequently Asked Questions</FAQTitle>
        {faqData.map((item, index) => (
          <FAQItem key={index}>
            <FAQQuestion
              isOpen={openItems[index]}
              onClick={() => toggleItem(index)}
            >
              {item.question}
            </FAQQuestion>
            <FAQAnswer isOpen={openItems[index]}>{item.answer}</FAQAnswer>
          </FAQItem>
        ))}
      </FAQContainer>
    </>
  );
};

export default FAQ;
