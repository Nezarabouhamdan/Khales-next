import React, { useState } from "react";
import styled from "styled-components";
import Stepper from "./Stepper";
import StepOne from "./Stepone";
import StepTwo from "./Steptwo";
import StepThree from "./Stepthree";
import { useLanguage } from "../../Context/Languagecontext";

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
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  direction: ${(props) => (props.$rtl ? "rtl" : "ltr")};

  @media (max-width: 768px) {
    width: 95%;
    padding: 0.5rem;
    margin: 1rem auto;
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

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://khalesapi.onrender.com/api/create-meeting",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to book appointment");
      }

      const result = await response.json();
      alert(`Appointment booked successfully! Meeting ID: ${result.meetingId}`);
    } catch (error) {
      console.error("Submission Error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <FormContainer $rtl={isRTL}>
      <Stepper steps={content.steps} currentStep={currentStep} isRTL={!!isRTL} />

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
          <NextButton onClick={handleSubmitClick}>
            {content.buttons.submit}
          </NextButton>
        )}
      </ButtonRow>
    </FormContainer>
  );
}
