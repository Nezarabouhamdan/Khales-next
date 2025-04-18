import React from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";

const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  margin: auto;
  position: relative;
  flex-direction: ${(props) => (props.$rtl ? "row-reverse" : "row")};
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
`;

const StepNumber = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$completed ? "rgba(102, 161, 9, 1)" : "#fff"};
  color: ${(props) =>
    props.$active ? "#000" : props.completed ? "#fff" : "#ccc"};
  border: ${(props) => (props.$active ? "3px solid #000" : "2px solid #ccc")};
  z-index: 2;
`;

const StepText = styled.span`
  font-size: 12px;
  margin-top: 5px;
  color: ${(props) => (props.$active ? "#000" : "#ccc")};
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
  text-align: center;
`;

const Line = styled.div`
  position: absolute;
  height: 2px;
  width: 100%;
  background-color: ${(props) => (props.$completed ? "#000" : "#ccc")};
  top: 50%;
  left: ${(props) => (props.$rtl ? "auto" : "0")};
  right: ${(props) => (props.$rtl ? "0" : "auto")};
  transform: translateY(-50%);
  z-index: 1;
`;

export default function Stepper({ steps, currentStep, isRTL }) {
  return (
    <StepperContainer $rtl={isRTL}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        return (
          <StepWrapper key={index}>
            {index > 0 && (
              <Line
                $completed={index <= currentStep}
                $rtl={isRTL}
                style={{
                  width: "100%",
                  left: isRTL ? "auto" : "-50%",
                  right: isRTL ? "50%" : "auto",
                  top: "28%",
                }}
              />
            )}
            <StepNumber $active={isActive} $completed={isCompleted}>
              {isCompleted ? <FaCheck color="white" /> : index + 1}
            </StepNumber>
            <StepText $active={isActive}>{step}</StepText>
          </StepWrapper>
        );
      })}
    </StepperContainer>
  );
}
