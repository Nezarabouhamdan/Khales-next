import React, { useState } from "react";
import Stepper from "./Stepper";
import StepOne from "./Stepone";
import StepTwo from "./Steptwo";
import StepThree from "./Stepthree";
import { useLanguage } from "../../Context/Languagecontext";
import { styled, keyframes } from "styled-components";
// Form content translations
const formTranslations = {
  eng: {
    steps: ["Service & Location", "Personal Info", "Review & Confirm"],
    buttons: {
      back: "Back",
      next: "Next",
      submit: "Submit",
    },
    errors: {
      required: "Please fill out all required fields before proceeding.",
    },
    stepTwo: {
      title: "Personal & Appointment Details",
      labels: {
        name: "Full Name",
        phone: "Phone Number",
        date: "Appointment Date",
        time: "Appointment Time",
      },
    },
    stepThree: {
      title: "Review & Confirm",
      fields: {
        name: "Name",
        phone: "Phone Number",
        date: "Appointment Date",
        branch: "Branch",
        service: "Service",
      },
    },
  },
  ar: {
    steps: ["الخدمة والموقع", "المعلومات الشخصية", "مراجعة وتأكيد"],
    buttons: {
      back: "رجوع",
      next: "التالي",
      submit: "إرسال",
    },
    errors: {
      required: "يرجى ملء جميع الحقول المطلوبة قبل المتابعة.",
    },
    stepTwo: {
      title: "المعلومات الشخصية وموعد المقابلة",
      labels: {
        name: "الاسم الكامل",
        phone: "رقم الهاتف",
        date: "تاريخ الموعد",
        time: "وقت الموعد",
      },
    },
    stepThree: {
      title: "مراجعة وتأكيد",
      fields: {
        name: "الاسم",
        phone: "رقم الهاتف",
        date: "تاريخ الموعد",
        branch: "الفرع",
        service: "الخدمة",
      },
    },
  },
};

const FormContainer = styled.div`
  width: 90%;
  max-width: 600px;
  position: relative;
  z-index: 999;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  direction: ${(props) => (props.$rtl ? "rtl" : "ltr")};

  @media (max-width: 768px) {
    width: 95%;
    padding: 0.5rem;
    margin: 1rem auto;
+   z-index: 1000; /* Ensure mobile priority */
  }
`;
const ButtonRow = styled.div`
  display: flex;
  justify-content: ${(props) => (props.$rtl ? "flex-start" : "flex-end")};
  margin-top: 2rem;

  button {
    margin: ${(props) => (props.$rtl ? "0 0 0 1rem" : "0 1rem 0 0")};
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }
`;

const BackButton = styled.button`
  background-color: #ccc;
  color: #333;
`;

const NextButton = styled.button`
  background-color: #000;
  color: #fff;
`;

const GlobalErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  text-align: center;
`;

export default function MultiStepForm() {
  const { language } = useLanguage();
  const content = formTranslations[language] || formTranslations.eng;
  const isRTL = language === "ar";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    appointmentDate: "",
    inquiry: "",
    branch: "",
    appointmentTime: "",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [globalError, setGlobalError] = useState("");

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    if (currentStep === 0) {
      return formData.inquiry.trim() !== "" && formData.branch.trim() !== "";
    } else if (currentStep === 1) {
      return (
        formData.name.trim() !== "" &&
        formData.phone.trim() !== "" &&
        formData.appointmentDate.trim() !== "" &&
        formData.appointmentTime.trim() !== ""
      );
    }
    return true;
  };

  const handleNext = () => {
    if (!isStepValid()) {
      setGlobalError(content.errors.required);
      return;
    }
    setGlobalError("");
    setCurrentStep((prev) => Math.min(prev + 1, content.steps.length - 1));
  };

  const goBack = () => {
    setGlobalError("");
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmitClick = () => {
    if (!isStepValid()) {
      setGlobalError(content.errors.required);
      return;
    }
    setGlobalError("");
    handleSubmit();
  };
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/create-meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "omit",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to book appointment");
      }

      const result = await response.json();

      // ▶️ Fire the “Appointment” conversion event
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "AW-10827937555/BtCiCLz84sEaEJPulKso",
          value: 1.0,
          currency: "AED",
        });
      }

      setSubmitStatus({
        type: "success",
        message: `${content.buttons.submit} - Meeting ID: ${result.meetingId}`,
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: `${content.buttons.submit}: ${error.message}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setSubmitStatus(null);
  };

  return (
    <>
      <FormContainer $rtl={isRTL}>
        <Stepper
          steps={content.steps}
          currentStep={currentStep}
          isRTL={!!isRTL}
        />

        {globalError && <GlobalErrorMessage>{globalError}</GlobalErrorMessage>}

        {currentStep === 0 && (
          <StepOne
            formData={formData}
            updateFormData={updateFormData}
            isRTL={!!isRTL}
          />
        )}
        {currentStep === 1 && (
          <StepTwo
            formData={formData}
            updateFormData={updateFormData}
            content={content.stepTwo}
            isRTL={!!isRTL}
          />
        )}
        {currentStep === 2 && (
          <StepThree formData={formData} content={content.stepThree} />
        )}

        <ButtonRow $rtl={isRTL}>
          {currentStep > 0 && (
            <BackButton onClick={goBack}>{content.buttons.back}</BackButton>
          )}
          {currentStep < content.steps.length - 1 ? (
            <NextButton onClick={handleNext}>{content.buttons.next}</NextButton>
          ) : (
            <NextButton onClick={handleSubmitClick} disabled={isSubmitting}>
              {isSubmitting ? (
                <LoadingDots $rtl={isRTL}>
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </LoadingDots>
              ) : (
                content.buttons.submit
              )}
            </NextButton>
          )}
        </ButtonRow>
      </FormContainer>
      {submitStatus && (
        <ModalOverlay onClick={closePopup}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {submitStatus.type === "success" ? (
              <>
                <AnimatedCheckmark viewBox="0 0 52 52">
                  <Circle cx="26" cy="26" r="25" fill="none" />
                  <Check
                    stroke="white"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </AnimatedCheckmark>
                <ModalTitle>
                  {language === "ar" ? "نجاح!" : "Success!"}
                </ModalTitle>
                <ModalText>{submitStatus.message}</ModalText>
              </>
            ) : (
              <>
                <AnimatedXMark viewBox="0 0 52 52">
                  <Circle cx="26" cy="26" r="25" fill="none" />
                  <XLine x1="16" y1="16" x2="36" y2="36" />
                  <XLine x1="16" y1="36" x2="36" y2="16" />
                </AnimatedXMark>
                <ModalTitle>{language === "ar" ? "خطأ!" : "Oops!"}</ModalTitle>
                <ModalText>{submitStatus.message}</ModalText>
              </>
            )}
            <CloseButton onClick={closePopup}>
              {language === "ar" ? "إغلاق" : "Close"}
            </CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
const Circle = styled.circle``;
const Check = styled.path``;
const XLine = styled.line``;

// Animations
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
  z-index: 2000;
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
  direction: ${(props) => (props.$rtl ? "rtl" : "ltr")};
`;

const AnimatedCheckmark = styled.svg`
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  display: block;

  circle {
    stroke: #66a109;
    stroke-width: 2;
    animation: ${circleAnimation} 0.6s ease-in-out both;
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
  }

  path {
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

  circle {
    stroke: #e74c3c;
    stroke-width: 2;
    animation: ${circleAnimation} 0.6s ease-in-out both;
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
  }

  line {
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
  white-space: pre-line;
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

// Add this styled component at the bottom
const LoadingDots = styled.div`
  display: inline-flex;
  gap: 2px;
  span {
    animation: bounce 1.4s infinite ease-in-out both;
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

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-6px);
    }
  }
`;
