"use client";
import React from "react";
import styled from "styled-components";

const ProcessStep = ({ number, title, description, isFirst }) => {
  return (
    <StepColumn isFirst={isFirst}>
      <StepContent>
        <StepNumber aria-hidden="true">{number}</StepNumber>
        <StepInfo>
          <StepTitle>{title}</StepTitle>
          <StepDescription>{description}</StepDescription>
        </StepInfo>
      </StepContent>
    </StepColumn>
  );
};

const StepColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 25%;
  margin-left: ${(props) => (props.isFirst ? "0" : "20px")};

  @media (max-width: 991px) {
    width: 100%;
    margin-left: 0;
  }
`;

const StepContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: stretch;
  font-family: Inter, -apple-system, Roboto, Helvetica, sans-serif;
  font-size: 15px;
  font-weight: 600;
  text-align: center;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const StepNumber = styled.div`
  background-color: rgba(102, 161, 9, 1);
  border-radius: 50%;
  align-self: center;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 1);
  white-space: nowrap;

  @media (max-width: 991px) {
    padding: 0;
    white-space: initial;
  }
`;

const StepInfo = styled.div`
  margin-top: 14px;
  color: rgba(0, 0, 0, 1);
`;

const StepTitle = styled.h3`
  margin: 0;
  font-weight: 600;
  font-size: 15px;
`;

const StepDescription = styled.p`
  margin: 0;
  font-weight: 300;
  font-size: 13px;
`;

export default ProcessStep;
