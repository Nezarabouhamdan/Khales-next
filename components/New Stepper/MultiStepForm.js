"use client";

import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiChevronDown, FiX, FiLoader } from "react-icons/fi";

// --- ANIMATION VARIANTS (UNCHANGED) ---
const stepVariants = {
  hidden: (direction) => ({ opacity: 0, x: direction > 0 ? 50 : -50 }),
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  exit: (direction) => ({
    opacity: 0,
    x: direction < 0 ? 50 : -50,
    transition: { duration: 0.3, ease: "easeInOut" },
  }),
};

// --- STYLED COMPONENTS (UNCHANGED) ---
const FormTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  color: #1a1a1a;
  margin-bottom: 2rem;
  z-index: 2; /* Ensure title is above decorative shapes */
  direction: ${({ $rtl }) => ($rtl ? "rtl" : "ltr")};
`;

const FormContainer = styled(motion.div)`
  width: 100%;
  max-width: 650px; /* This maintains the static width you wanted */
  margin: 0 auto; /* No top/bottom margin, handled by wrapper */
  padding: 2.5rem 3rem;
  background: rgba(
    255,
    255,
    255,
    0.9
  ); /* Slightly more opaque for better readability */
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  z-index: 2; /* Ensure form is above decorative shapes */
  direction: ${({ $rtl }) => ($rtl ? "rtl" : "ltr")};
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const StepperContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  transition: opacity 0.3s ease;
`;

const StepNumber = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ completed }) => (completed ? "#66a109" : "#e0e0e0")};
  color: ${({ completed }) => (completed ? "#fff" : "#757575")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  border: 2px solid ${({ active }) => (active ? "#66a109" : "transparent")};
  transition: all 0.4s ease;
`;

const StepLabel = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: #616161;
  text-align: center;
`;

const StepConnector = styled.div`
  flex-grow: 1;
  height: 2px;
  background-color: ${({ active }) => (active ? "#66a109" : "#e0e0e0")};
  margin: 0 1rem;
  transform: translateY(-1rem);
  transition: background-color 0.4s ease;
`;

const StepContent = styled.div`
  padding: 1rem 0;
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #333;
  text-align: ${({ $rtl }) => ($rtl ? "right" : "left")};
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 2.5rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 0;
  font-size: 1rem;
  color: #333;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  background: transparent;
  &:focus ~ label,
  &:valid ~ label {
    top: -20px;
    font-size: 0.8rem;
    color: #66a109;
  }
  &:focus {
    border-bottom: 2px solid #66a109;
  }
`;

const StyledLabel = styled.label`
  position: absolute;
  top: ${({ $hasValue }) => ($hasValue ? "-20px" : "10px")};
  font-size: ${({ $hasValue }) => ($hasValue ? "0.8rem" : "1rem")};
  color: ${({ $hasValue }) => ($hasValue ? "#66a109" : "#999")};
  pointer-events: none;
  transition: 0.3s ease all;
  ${({ $rtl }) =>
    $rtl
      ? css`
          right: 0;
        `
      : css`
          left: 0;
        `}
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px 0;
  font-size: 1rem;
  color: ${({ $hasValue }) => ($hasValue ? "#333" : "#999")};
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  background: transparent;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border-radius: 0;
  &:focus {
    border-bottom: 2px solid #66a109;
  }
`;

const SelectArrow = styled(FiChevronDown)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  pointer-events: none;
  ${({ $rtl }) =>
    $rtl
      ? css`
          left: 10px;
        `
      : css`
          right: 10px;
        `}
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const FormButton = styled.button`
  padding: 12px 28px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  ${({ $secondary }) =>
    $secondary
      ? css`
          background-color: #f0f0f0;
          color: #333;
          &:hover:not(:disabled) {
            background-color: #e0e0e0;
          }
        `
      : css`
          background-color: #1a1a1a;
          color: #fff;
          &:hover:not(:disabled) {
            background-color: #333;
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }
        `}
`;

const GlobalErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 0.9rem;
  margin-top: -1rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  text-align: ${({ $rtl }) => ($rtl ? "right" : "left")};
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ReviewItem = styled.div``;
const ReviewLabel = styled.div`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 0.25rem;
`;
const ReviewValue = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
`;
const spin = keyframes`to { transform: rotate(360deg); }`;
const LoadingSpinner = styled(FiLoader)`
  animation: ${spin} 1s linear infinite;
`;
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(3px);
`;
const ModalContent = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  width: 90%;
`;
const ModalTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
`;
const ModalText = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`;
const ModalCloseButton = styled.button`
  background: #666;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s ease;
  &:hover {
    background: #555;
  }
`;

const AnimatedCheckmark = () => (
  <motion.svg
    width="80"
    height="80"
    viewBox="0 0 52 52"
    style={{ margin: "0 auto 1rem" }}
  >
    <motion.circle
      cx="26"
      cy="26"
      r="25"
      fill="none"
      stroke="#66a109"
      strokeWidth="2"
      initial={{ strokeDashoffset: 166 }}
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration: 0.6 }}
    />
    <motion.path
      d="M14.1 27.2l7.1 7.2 16.7-16.8"
      fill="none"
      stroke="#66a109"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    />
  </motion.svg>
);
const AnimatedXMark = () => (
  <motion.svg
    width="80"
    height="80"
    viewBox="0 0 52 52"
    style={{ margin: "0 auto 1rem" }}
  >
    <motion.circle
      cx="26"
      cy="26"
      r="25"
      fill="none"
      stroke="#e74c3c"
      strokeWidth="2"
      initial={{ strokeDashoffset: 166 }}
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration: 0.6 }}
    />
    <motion.path
      d="M16 16 L 36 36 M 36 16 L 16 36"
      fill="none"
      stroke="#e74c3c"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    />
  </motion.svg>
);

// --- UI SUB-COMPONENTS (UNCHANGED) ---
const Stepper = ({ steps, currentStep }) => (
  <StepperContainer>
    {steps.map((step, index) => (
      <React.Fragment key={index}>
        <Step active={currentStep >= index} completed={currentStep > index}>
          <StepNumber>
            {currentStep > index ? <FiCheck /> : index + 1}
          </StepNumber>
          <StepLabel>{step}</StepLabel>
        </Step>
        {index < steps.length - 1 && (
          <StepConnector active={currentStep > index} />
        )}
      </React.Fragment>
    ))}
  </StepperContainer>
);

const StepOne = ({ formData, updateFormData, content, isRTL }) => (
  <StepContent>
    <StepTitle $rtl={isRTL}>{content.title}</StepTitle>
    <InputGroup>
      <StyledSelect
        value={formData.service}
        onChange={(e) => updateFormData("service", e.target.value)}
        required
        $hasValue={formData.service !== ""}
      >
        <option value="" disabled>
          {content.labels.service}
        </option>
        {content.serviceOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </StyledSelect>
      <SelectArrow $rtl={isRTL} />
    </InputGroup>
    <InputGroup>
      <StyledSelect
        value={formData.branch}
        onChange={(e) => updateFormData("branch", e.target.value)}
        required
        $hasValue={formData.branch !== ""}
      >
        <option value="" disabled>
          {content.labels.branch}
        </option>
        {content.branchOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </StyledSelect>
      <SelectArrow $rtl={isRTL} />
    </InputGroup>
  </StepContent>
);

const StepTwo = ({ formData, updateFormData, content, isRTL }) => {
  const timeSlots = (() => {
    const slots = [];
    for (let h = 10; h < 18; h++) {
      slots.push(`${h.toString().padStart(2, "0")}:00`);
      slots.push(`${h.toString().padStart(2, "0")}:30`);
    }
    return slots;
  })();
  return (
    <StepContent>
      <StepTitle $rtl={isRTL}>{content.title}</StepTitle>
      <InputGroup>
        <StyledInput
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData("name", e.target.value)}
          required
        />
        <StyledLabel $hasValue={formData.name !== ""} $rtl={isRTL}>
          {content.labels.name}
        </StyledLabel>
      </InputGroup>
      <InputGroup>
        <StyledInput
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormData("phone", e.target.value)}
          required
        />
        <StyledLabel $hasValue={formData.phone !== ""} $rtl={isRTL}>
          {content.labels.phone}
        </StyledLabel>
      </InputGroup>
      <InputGroup>
        <StyledInput
          type="date"
          value={formData.appointmentDate}
          onChange={(e) => updateFormData("appointmentDate", e.target.value)}
          required
        />
        <StyledLabel $hasValue={true} $rtl={isRTL}>
          {content.labels.date}
        </StyledLabel>
      </InputGroup>
      <InputGroup>
        <StyledSelect
          value={formData.appointmentTime}
          onChange={(e) => updateFormData("appointmentTime", e.target.value)}
          required
          $hasValue={formData.appointmentTime !== ""}
        >
          <option value="" disabled>
            {content.labels.time}
          </option>
          {timeSlots.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </StyledSelect>
        <SelectArrow $rtl={isRTL} />
      </InputGroup>
    </StepContent>
  );
};

const StepThree = ({ formData, content, isRTL }) => (
  <StepContent>
    <StepTitle $rtl={isRTL}>{content.title}</StepTitle>
    <ReviewGrid $rtl={isRTL}>
      <ReviewItem>
        <ReviewLabel>{content.fields.service}:</ReviewLabel>
        <ReviewValue>{formData.service}</ReviewValue>
      </ReviewItem>
      <ReviewItem>
        <ReviewLabel>{content.fields.branch}:</ReviewLabel>
        <ReviewValue>{formData.branch}</ReviewValue>
      </ReviewItem>
      <ReviewItem>
        <ReviewLabel>{content.fields.name}:</ReviewLabel>
        <ReviewValue>{formData.name}</ReviewValue>
      </ReviewItem>
      <ReviewItem>
        <ReviewLabel>{content.fields.phone}:</ReviewLabel>
        <ReviewValue>{formData.phone}</ReviewValue>
      </ReviewItem>
      <ReviewItem>
        <ReviewLabel>{content.fields.date}:</ReviewLabel>
        <ReviewValue>{formData.appointmentDate}</ReviewValue>
      </ReviewItem>
      <ReviewItem>
        <ReviewLabel>{content.fields.time}:</ReviewLabel>
        <ReviewValue>{formData.appointmentTime}</ReviewValue>
      </ReviewItem>
    </ReviewGrid>
  </StepContent>
);

const SubmitModal = ({ status, onClose, content }) => (
  <ModalOverlay
    as={motion.div}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <ModalContent
      as={motion.div}
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.8 }}
    >
      {status.type === "success" ? <AnimatedCheckmark /> : <AnimatedXMark />}
      <ModalTitle>{content.title}</ModalTitle>
      <ModalText>{status.message || content.text}</ModalText>
      <ModalCloseButton onClick={onClose}>{content.close}</ModalCloseButton>
    </ModalContent>
  </ModalOverlay>
);

// --- MAIN REFACTORED COMPONENT ---
export default function MultiStepFormnew({ lang, content }) {
  const isRTL = lang === "ar";
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    appointmentDate: "",
    service: "",
    branch: "",
    appointmentTime: "",
  });
  const [globalError, setGlobalError] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const isStepValid = () => {
    if (currentStep === 0)
      return formData.service.trim() !== "" && formData.branch.trim() !== "";
    if (currentStep === 1)
      return (
        formData.name.trim() !== "" &&
        formData.phone.trim() !== "" &&
        formData.appointmentDate.trim() !== "" &&
        formData.appointmentTime.trim() !== ""
      );
    return true;
  };

  const handleNext = () => {
    if (!isStepValid()) {
      setGlobalError(content.errors.required);
      return;
    }
    setGlobalError("");
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, content.steps.length - 1));
  };

  const goBack = () => {
    setGlobalError("");
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!isStepValid()) {
      setGlobalError(content.errors.required);
      return;
    }
    setGlobalError("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/create-meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.error || `Request failed with status ${response.status}`;
        throw new Error(errorMessage);
      }
      setSubmitStatus({ type: "success" });
    } catch (error) {
      setSubmitStatus({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <FormTitle $rtl={isRTL}>{content.title}</FormTitle>

      <FormContainer
        $rtl={isRTL}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      >
        <Stepper steps={content.steps} currentStep={currentStep} />
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={stepVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {currentStep === 0 && (
              <StepOne
                formData={formData}
                updateFormData={updateFormData}
                content={content.stepOne}
                isRTL={isRTL}
              />
            )}
            {currentStep === 1 && (
              <StepTwo
                formData={formData}
                updateFormData={updateFormData}
                content={content.stepTwo}
                isRTL={isRTL}
              />
            )}
            {currentStep === 2 && (
              <StepThree
                formData={formData}
                updateFormData={updateFormData}
                content={content.stepThree}
                isRTL={isRTL}
              />
            )}
          </motion.div>
        </AnimatePresence>
        {globalError && <GlobalErrorMessage>{globalError}</GlobalErrorMessage>}
        <ButtonRow>
          {currentStep > 0 && (
            <FormButton $secondary onClick={goBack}>
              {content.buttons.back}
            </FormButton>
          )}
          {currentStep < content.steps.length - 1 ? (
            <FormButton onClick={handleNext}>{content.buttons.next}</FormButton>
          ) : (
            <FormButton
              id="booking"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoadingSpinner /> : content.buttons.submit}
            </FormButton>
          )}
        </ButtonRow>
      </FormContainer>

      <AnimatePresence>
        {submitStatus && (
          <SubmitModal
            status={submitStatus}
            onClose={() => setSubmitStatus(null)}
            content={
              submitStatus.type === "success"
                ? content.successModal
                : content.errorModal
            }
          />
        )}
      </AnimatePresence>
    </>
  );
}
