import React, { useState } from "react";
import styled from "styled-components";
import { useLanguage } from "../../Context/Languagecontext"; // Import your language context

const StepContainer = styled.div`
  direction: ${(props) => (props.$rtl ? "rtl" : "ltr")};
`;

export default function StepOne({ formData, updateFormData, isRTL }) {
  const { language } = useLanguage();

  // Multilingual options
  const serviceOptions = {
    eng: [
      "Project Management",
      "Interior Design",
      "Landscaping",
      "Development Planning",
      "Architecture",
      "Building Contracting",
      "Engineering Consultancy",
      "Real Estate",
      "Fit-Out",
    ],
    ar: [
      "إدارة المشاريع",
      "تصميم داخلي",
      "تنسيق حدائق",
      "تخطيط التطوير",
      "هندسة معمارية",
      "مقاولات بناء",
      "استشارات هندسية",
      "عقارات",
      "تشطيب داخلي",
    ],
  };

  const branchOptions = {
    eng: [
      "Dubai Majlis",
      "Dubai Branch",
      "Fujairah Branch",
      "Sharjah Branch",
      "Abu Dhabi Branch",
    ],
    ar: ["مجلس دبي", "فرع دبي", "فرع الفجيرة", "فرع الشارقة", "فرع أبو ظبي"],
  };

  // Get current language options
  const currentServiceOptions = serviceOptions[language] || serviceOptions.eng;
  const currentBranchOptions = branchOptions[language] || branchOptions.eng;

  // Translations
  const translations = {
    eng: {
      title: "Step 1: Service & Location",
      servicePlaceholder: "Service",
      branchPlaceholder: "Branch",
    },
    ar: {
      title: "الخطوة 1: الخدمة والموقع",
      servicePlaceholder: "الخدمة",
      branchPlaceholder: "الفرع",
    },
  };

  const content = translations[language] || translations.eng;

  return (
    <StepContainer $rtl={isRTL}>
      <h2 style={{ marginTop: "30px", color: "#545454" }}>{content.title}</h2>

      <TextInput
        placeholder={content.servicePlaceholder}
        value={formData.inquiry}
        onChange={(value) => updateFormData("inquiry", value)}
        options={currentServiceOptions}
        rtl={isRTL}
      />

      <TextInput
        placeholder={content.branchPlaceholder}
        value={formData.branch}
        onChange={(value) => updateFormData("branch", value)}
        options={currentBranchOptions}
        rtl={isRTL}
      />
    </StepContainer>
  );
}

const InputContainer = styled.div`
  margin-top: 30px;
  position: relative;
  width: 100%;
  direction: ${(props) => (props.$rtl ? "rtl" : "ltr")};
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px 5px;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  font-size: 16px;
  background: transparent;
  text-align: ${(props) => (props.$rtl ? "right" : "left")};
  direction: ${(props) => (props.$rtl ? "rtl" : "ltr")};

  &:focus {
    border-bottom: 2px solid #66a109;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: ${(props) => (props.$rtl ? "auto" : "0")};
  right: ${(props) => (props.$rtl ? "0" : "auto")};
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: ${(props) => (props.open ? "block" : "none")};
  text-align: ${(props) => (props.$rtl ? "right" : "left")};
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

export const TextInput = ({
  type,
  placeholder,
  value,
  onChange,
  options,
  id,
  rtl = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (options) {
    return (
      <InputContainer $rtl={rtl}>
        <InputField
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onClick={() => setIsOpen(!isOpen)}
          readOnly
          $rtl={rtl}
        />
        <DropdownMenu open={isOpen} $rtl={rtl}>
          {options.map((option, index) => (
            <DropdownItem
              key={index}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </InputContainer>
    );
  }

  return (
    <InputContainer $rtl={rtl}>
      <InputField
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        $rtl={rtl}
      />
    </InputContainer>
  );
};
