"use client";
import React, { useState } from "react";
import {
  SplitLayout,
  WelcomeSection,
  WelcomeText,
  FormContainer,
  FormCard,
} from "./StyledComponents";
import { FormInput, FormSelect, FormButton } from "./FormComponents";
import { styled, keyframes } from "styled-components";

export default function InputDesign2() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "",
    branch: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const categoryOptions = [
    { value: "Project Management", label: "Project Management" },
    { value: "Development planning", label: "Development planning" },
    { value: "Project Feasability Study", label: "Project Feasability Study" },
    { value: "Interior Design", label: "Interior Design" },
    { value: "Landscaping", label: "Landscaping" },
    { value: "Engineering Consultancy", label: "Engineering Consultancy" },
    { value: "Investing", label: "Investing" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const form = new FormData(e.target);
    const payload = {
      name: form.get("fullName"),
      phone: form.get("phone"),
      email: form.get("email"),
      inquiry: form.get("category"),
      branch: form.get("branch"),
      description: "Free consultation request",
    };

    try {
      const res = await fetch("/api/create-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message: `Lead created! ID: ${data.leadId}`,
        });
        e.target.reset();
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          category: "",
          branch: "",
        });
      } else {
        setSubmitStatus({ type: "error", message: `Error: ${data.error}` });
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus({ type: "error", message: "Network error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => setSubmitStatus(null);

  return (
    <SplitLayout>
      <WelcomeSection>
        <WelcomeText>
          <span>Let's Build</span>
          <br />
          <span>Something Amazing</span>
          <br />
          <span style={{ fontSize: "15px" }}>
            Ready to start? Fill the form, we will respond within 24 hours.
          </span>
        </WelcomeText>
      </WelcomeSection>

      <FormContainer>
        <FormCard onSubmit={handleSubmit} aria-label="Contact form">
          <FormInput
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            required
            value={formData.fullName}
            onChange={handleInputChange}
          />

          <FormInput
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />

          <FormInput
            id="phone"
            name="phone"
            type="tel"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleInputChange}
          />

          <FormSelect
            id="category"
            name="category"
            options={categoryOptions}
            required
            value={formData.category}
            onChange={handleInputChange}
          />

          <FormButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoadingDots>
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </LoadingDots>
            ) : (
              "Get Free Consultation"
            )}
          </FormButton>
        </FormCard>
      </FormContainer>

      {submitStatus && (
        <ModalOverlay onClick={closePopup}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {submitStatus.type === "success" ? (
              <>
                <AnimatedCheckmark viewBox="0 0 52 52">
                  <Circle cx="26" cy="26" r="25" fill="none" />
                  <Check d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </AnimatedCheckmark>
                <ModalTitle>Success!</ModalTitle>
              </>
            ) : (
              <>
                <AnimatedXMark viewBox="0 0 52 52">
                  <Circle cx="26" cy="26" r="25" fill="none" />
                  <XLine x1="16" y1="16" x2="36" y2="36" />
                  <XLine x1="16" y1="36" x2="36" y2="16" />
                </AnimatedXMark>
                <ModalTitle>Oops!</ModalTitle>
              </>
            )}
            <ModalText>{submitStatus.message}</ModalText>
            <CloseButton onClick={closePopup}>Close</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </SplitLayout>
  );
}

const Circle = styled.circle``;
const Check = styled.path``;
const XLine = styled.line``;

const scaleUp = keyframes`
  from { transform: scale(0); }
  to { transform: scale(1); }
`;

const checkAnimation = keyframes`
  0% { stroke-dashoffset: 80; }
  100% { stroke-dashoffset: 0; }
`;

const circleAnimation = keyframes`
  0% { stroke-dashoffset: 166; }
  100% { stroke-dashoffset: 0; }
`;

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  animation: ${scaleUp} 0.3s ease-out;
  max-width: 400px;
  width: 90%;
`;

const AnimatedCheckmark = styled.svg`
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  display: block;

  ${Circle} {
    stroke: #66a109;
    stroke-width: 2;
    animation: ${circleAnimation} 0.6s ease-in-out both;
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
  }

  ${Check} {
    stroke: #66a109;
    stroke-width: 2;
    stroke-linecap: round;
    animation: ${checkAnimation} 0.6s ease-in-out 0.6s both;
    stroke-dasharray: 80;
    stroke-dashoffset: 80;
  }
`;

const AnimatedXMark = styled.svg`
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  display: block;

  ${Circle} {
    stroke: #e74c3c;
    stroke-width: 2;
    animation: ${circleAnimation} 0.6s ease-in-out both;
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
  }

  ${XLine} {
    stroke: #e74c3c;
    stroke-width: 2;
    stroke-linecap: round;
    animation: ${checkAnimation} 0.6s ease-in-out 0.6s both;
    stroke-dasharray: 80;
    stroke-dashoffset: 80;
  }
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

const CloseButton = styled.button`
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

const bounce = keyframes`
  0%, 80%, 100% { 
    transform: translateY(0);
  }
  40% {
    transform: translateY(-6px);
  }
`;

const LoadingDots = styled.div`
  display: inline-flex;
  gap: 2px;
  span {
    animation: ${bounce} 1.4s infinite ease-in-out both;
    color: inherit;
    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
    &:nth-child(3) {
      animation-delay: 0s;
    }
  }
`;
