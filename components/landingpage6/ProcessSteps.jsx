"use client";
import React from "react";
import styled from "styled-components";
import ProcessStep from "./ProcessStep";

const ProcessSteps = () => {
  const steps = [
    {
      number: "1",
      title: "Consultation",
      description: "Understand your goals",
    },
    {
      number: "2",
      title: "Design & Planning",
      description: "Tailored drawings + strategy",
    },
    {
      number: "3",
      title: "Execution",
      description: "Full project management",
    },
    {
      number: "4",
      title: "Handover",
      description: "Delivered beyond expectations",
    },
  ];

  return (
    <ProcessContainer role="region" aria-label="Our Process Steps">
      <ProcessTitle>Our Process</ProcessTitle>
      <StepsWrapper>
        <StepsGrid>
          {steps.map((step, index) => (
            <ProcessStep
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              isFirst={index === 0}
            />
          ))}
        </StepsGrid>
      </StepsWrapper>
    </ProcessContainer>
  );
};

const ProcessContainer = styled.section`
  background-color: rgba(230, 230, 230, 1);
  display: flex;
  padding: 60px 80px;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  justify-content: center;
  align-content: center;
  align-items: center;
  @media (max-width: 991px) {
    padding: 60px 20px;
  }
`;

const ProcessTitle = styled.h2`
  color: rgba(0, 0, 0, 1);
  font-size: 30px;
  font-family: "Playfair", sans-serif;
  font-weight: 400;
  text-align: center;
  align-self: center;
  margin: 0;
`;

const StepsWrapper = styled.div`
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-top: 134px;
  width: 80%;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const StepsGrid = styled.div`
  gap: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }
`;

export default ProcessSteps;
