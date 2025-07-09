"use client";
import React from "react";
import styled from "styled-components";
import Script from "next/script";

const HowToContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const HowToTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: 700;
`;

const HowToSubtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 50px;
  opacity: 0.9;
`;

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const StepCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  background: #3498db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 20px;
`;

const StepTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 15px;
  font-weight: 600;
`;

const StepDescription = styled.p`
  line-height: 1.6;
  opacity: 0.9;
`;

const HowTo = () => {
  const howToData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Choose the Right Architecture and Interior Design Company in Dubai",
    description:
      "A comprehensive guide on selecting the best architecture and interior design company in Dubai, UAE for your residential or commercial project.",
    image: "https://www.khales.ae/assets/Services.jpg",
    totalTime: "PT30M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "AED",
      value: "0",
    },
    supply: [
      {
        "@type": "HowToSupply",
        name: "Project requirements list",
      },
      {
        "@type": "HowToSupply",
        name: "Budget planning",
      },
      {
        "@type": "HowToSupply",
        name: "Timeline expectations",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Internet research",
      },
      {
        "@type": "HowToTool",
        name: "Portfolio review",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Define Your Project Requirements",
        text: 'Clearly outline your project scope, whether it"s residential villa design, commercial architecture, or interior design. Determine your budget, timeline, and specific design preferences.',
        image: "https://www.khales.ae/assets/process.jpg",
        url: "https://www.khales.ae/services",
      },
      {
        "@type": "HowToStep",
        name: "Research Architecture Firms in Dubai",
        text: "Look for established architecture and interior design companies in Dubai with proven track records. Check their portfolios, client reviews, and specializations in your project type.",
        image: "https://www.khales.ae/assets/Projects.jpg",
        url: "https://www.khales.ae/projects",
      },
      {
        "@type": "HowToStep",
        name: "Verify Credentials and Experience",
        text: "Ensure the company has proper licensing, Dubai Municipality approvals experience, and relevant certifications. Check their experience with UAE building codes and regulations.",
        image: "https://www.khales.ae/assets/aboutus1.jpg",
        url: "https://www.khales.ae/about",
      },
      {
        "@type": "HowToStep",
        name: "Schedule Consultations",
        text: "Contact shortlisted companies for initial consultations. Discuss your project, ask about their process, timeline, and get detailed quotes for comparison.",
        image: "https://www.khales.ae/assets/team1.jpg",
        url: "https://www.khales.ae/contact",
      },
      {
        "@type": "HowToStep",
        name: "Review Proposals and Make Decision",
        text: "Compare proposals based on design approach, timeline, cost, and overall value. Choose the company that best aligns with your vision and requirements.",
        image: "https://www.khales.ae/assets/Khales-Logo.png",
        url: "https://www.khales.ae/booking",
      },
    ],
  };

  const steps = [
    {
      number: "1",
      title: "Define Your Project Requirements",
      description:
        "Clearly outline your project scope, budget, timeline, and design preferences for your residential or commercial project in Dubai.",
    },
    {
      number: "2",
      title: "Research Architecture Firms in Dubai",
      description:
        "Look for established companies with proven track records, check portfolios, client reviews, and specializations in your project type.",
    },
    {
      number: "3",
      title: "Verify Credentials and Experience",
      description:
        "Ensure proper licensing, Dubai Municipality approvals experience, and knowledge of UAE building codes and regulations.",
    },
    {
      number: "4",
      title: "Schedule Consultations",
      description:
        "Contact shortlisted companies for consultations. Discuss your project, process, timeline, and get detailed quotes for comparison.",
    },
    {
      number: "5",
      title: "Review Proposals and Decide",
      description:
        "Compare proposals based on design approach, timeline, cost, and value. Choose the company that best aligns with your vision.",
    },
  ];

  return (
    <>
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToData),
        }}
      />
      <HowToContainer>
        <HowToTitle>
          How to Choose the Right Architecture Company in Dubai
        </HowToTitle>
        <HowToSubtitle>
          Follow these essential steps to select the perfect architecture and
          interior design partner for your project in the UAE
        </HowToSubtitle>

        <StepsContainer>
          {steps.map((step, index) => (
            <StepCard key={index}>
              <StepNumber>{step.number}</StepNumber>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </StepCard>
          ))}
        </StepsContainer>
      </HowToContainer>
    </>
  );
};

export default HowTo;
