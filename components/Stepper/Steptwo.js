import React from "react";
import styled from "styled-components";
import { TextInput } from "./Stepone";
import { useLanguage } from "../../Context/Languagecontext";

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  direction: ${(props) => (props.$rtl ? "rtl" : "ltr")};
`;

const Label = styled.label`
  margin: 0.5rem 0 0.25rem;
  text-align: ${(props) => (props.$rtl ? "right" : "left")};
`;

export default function StepTwo({ formData, updateFormData }) {
  const { language } = useLanguage();
  const isRTL = language === "ar";

  // Translations
  const translations = {
    eng: {
      title: "Personal & Appointment Details",
      labels: {
        name: "Full Name",
        phone: "Phone Number",
        date: "Appointment Date",
        time: "Appointment Time",
      },
      placeholders: {
        name: "Enter your full name",
        phone: "Enter your phone number",
      },
    },
    ar: {
      title: "المعلومات الشخصية وموعد المقابلة",
      labels: {
        name: "الاسم الكامل",
        phone: "رقم الهاتف",
        date: "تاريخ الموعد",
        time: "وقت الموعد",
      },
      placeholders: {
        name: "أدخل اسمك الكامل",
        phone: "أدخل رقم هاتفك",
      },
    },
  };

  const content = translations[language] || translations.eng;

  // Generate time slots from 10:00 to 17:30 every 30 minutes
  const generateTimeSlots = () => {
    const slots = [];
    let hour = 10;
    let minute = 0;
    while (hour < 18) {
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      slots.push(time);
      if (minute === 0) {
        minute = 30;
      } else {
        hour += 1;
        minute = 0;
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Fixed onChange handler
  const handleInputChange = (field, value) => {
    if (value && value.target) {
      // Handle regular input change
      updateFormData(field, value.target.value);
    } else {
      // Handle dropdown selection
      updateFormData(field, value);
    }
  };

  return (
    <StepContainer $rtl={isRTL}>
      <h2 style={{ marginTop: "30px", color: "#545454" }}>{content.title}</h2>

      {/* Full Name Input */}
      <Label htmlFor="name" $rtl={isRTL}>
        {content.labels.name}
      </Label>
      <TextInput
        id="name"
        placeholder={content.placeholders.name}
        type="text"
        value={formData.name}
        onChange={(e) => handleInputChange("name", e)}
        rtl={isRTL}
      />

      {/* Phone Number Input */}
      <Label htmlFor="phone" $rtl={isRTL}>
        {content.labels.phone}
      </Label>
      <TextInput
        id="phone"
        placeholder={content.placeholders.phone}
        type="tel"
        value={formData.phone}
        onChange={(e) => handleInputChange("phone", e)}
        $rtl={isRTL}
      />

      {/* Appointment Date Input */}
      <Label htmlFor="appointmentDate" $rtl={isRTL}>
        {content.labels.date}
      </Label>
      <TextInput
        id="appointmentDate"
        type="date"
        value={formData.appointmentDate}
        onChange={(e) => handleInputChange("appointmentDate", e)}
        $rtl={isRTL}
      />

      {/* Appointment Time Dropdown */}
      <Label htmlFor="appointmentTime" $rtl={isRTL}>
        {content.labels.time}
      </Label>
      <TextInput
        id="appointmentTime"
        value={formData.appointmentTime}
        onChange={(value) => handleInputChange("appointmentTime", value)}
        options={timeSlots}
        $rtl={isRTL}
      />
    </StepContainer>
  );
}
