"use client";
import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { GreenText, Title } from "../Whoweare/TextContent";
import { useLanguage } from "../../Context/Languagecontext";

// Content data for both languages
const contactData = {
  eng: {
    header: {
      title: ["Contact", "Us"],
      description:
        "Have a question or need expert guidance? Contact us for consultations, project inquiries, and bookings.",
    },
    info: {
      general: {
        title: "General Inquiries",
        email: "info@khales.ae",
        phone: "+971 4 557 1184",
      },
      customer: {
        title: "24/7 Customer Service",
        phone: "+971 55 129 9880",
      },
      hours: {
        title: "Working Hours",
        text: "Sunday to Thursday - 9:00AM - 06:00PM",
      },
    },
    form: {
      inquiryPlaceholder: "Type of Inquiry",
      namePlaceholder: "Full Name",
      emailPlaceholder: "Email",
      messagePlaceholder: "Message",
      submitText: "Submit",
      inquiryOptions: [
        "General Question",
        "Project Inquiry",
        "Consultation Request",
        "Booking",
        "Other",
      ],
    },
  },
  ar: {
    header: {
      title: ["اتصل", "بنا"],
      description:
        "هل لديك سؤال أو تحتاج إلى إرشادات خبراء؟ تواصل معنا للاستشارات واستفسارات المشاريع والحجوزات.",
    },
    info: {
      general: {
        title: "استفسارات عامة",
        email: "info@khales.ae",
        phone: "+971 4 557 1184", // Keep original LTR format
      },
      customer: {
        title: "خدمة العملاء على مدار الساعة",
        phone: "+971 55 129 9880", // Keep original LTR format
      },
      hours: {
        title: "ساعات العمل",
        text: "من الأحد إلى الخميس - 9:00 صباحًا - 6:00 مساءً",
      },
    },

    form: {
      inquiryPlaceholder: "نوع الاستفسار",
      namePlaceholder: "الاسم الكامل",
      emailPlaceholder: "البريد الإلكتروني",
      messagePlaceholder: "الرسالة",
      submitText: "إرسال",
      inquiryOptions: [
        "سؤال عام",
        "استفسار عن المشروع",
        "طلب استشارة",
        "حجز",
        "أخرى",
      ],
    },
  },
};

function ContactUs() {
  const { language } = useLanguage();
  const content = contactData[language] || contactData.eng;

  return (
    <ContactSection $dir={language === "ar" ? "rtl" : "ltr"}>
      <ContactHeader>
        <Title>
          {content.header.title[0]}{" "}
          <GreenText>{content.header.title[1]}</GreenText>
        </Title>
        <ContactDescription>{content.header.description}</ContactDescription>
      </ContactHeader>
      <ContactContent>
        <ContactInfo>
          <InfoGroup>
            <InfoTitle>{content.info.general.title}</InfoTitle>
            <InfoText>{content.info.general.email}</InfoText>
            <InfoText>
              <LtrText>{content.info.general.phone}</LtrText>
            </InfoText>
          </InfoGroup>
          <InfoGroup>
            <InfoTitle>{content.info.customer.title}</InfoTitle>
            <InfoText>
              <LtrText>{content.info.customer.phone}</LtrText>
            </InfoText>
          </InfoGroup>
          <InfoGroup>
            <InfoTitle>{content.info.hours.title}</InfoTitle>
            <InfoText>{content.info.hours.text}</InfoText>
          </InfoGroup>
        </ContactInfo>
        <ContactFormContainer>
          <ContactForm content={content.form} rtl={language === "ar"} />
        </ContactFormContainer>
      </ContactContent>
    </ContactSection>
  );
}

const ContactForm = ({ content, rtl }) => {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState("");

  const handleInquirySelect = (option) => {
    setSelectedInquiry(option);
    setIsInquiryOpen(false);
  };

  return (
    <Form>
      <FormGroup>
        <DropdownContainer>
          <DropdownInput
            type="text"
            placeholder={content.inquiryPlaceholder}
            value={selectedInquiry}
            onClick={() => setIsInquiryOpen(!isInquiryOpen)}
            readOnly
            $rtl={rtl}
          />
          {isInquiryOpen && (
            <DropdownMenu $rtl={rtl}>
              {content.inquiryOptions.map((option, index) => (
                <DropdownItem
                  key={index}
                  onClick={() => handleInquirySelect(option)}
                >
                  {option}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </DropdownContainer>
      </FormGroup>
      <FormGroup>
        <FormInput
          type="text"
          placeholder={content.namePlaceholder}
          $rtl={rtl}
        />
      </FormGroup>
      <FormGroup>
        <FormInput
          type="email"
          placeholder={content.emailPlaceholder}
          $rtl={rtl}
        />
      </FormGroup>
      <FormGroup>
        <FormInput
          type="text"
          placeholder={content.messagePlaceholder}
          $rtl={rtl}
        />
      </FormGroup>
      <SubmitButton type="submit">{content.submitText}</SubmitButton>
    </Form>
  );
};

// Styled Components (updated for RTL support)
const ContactSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: screen;
  background-color: #ebe9e9;
  font-family: Inter, sans-serif;
  padding: 40px;
  direction: ${(props) => props.$dir};

  @media (max-width: 991px) {
    padding: 32px;
  }
  @media (max-width: 640px) {
    padding: 24px;
  }
`;

const ContactHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: ${(props) => (props.$dir === "rtl" ? "right" : "left")};
`;
const LtrText = styled.span`
  direction: ltr;
  unicode-bidi: embed;
`;
const ContactDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 48px;
  text-align: center;
  @media (max-width: 991px) {
    margin-bottom: 40px;
  }
  @media (max-width: 640px) {
    margin-bottom: 32px;
  }
`;

const ContactContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  gap: 80px;
  flex-direction: ${(props) => (props.$dir === "rtl" ? "row-reverse" : "row")};

  @media (max-width: 991px) {
    gap: 40px;
  }
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-bottom: 1px solid #333;
  background-color: transparent;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  text-align: ${(props) => (props.$rtl ? "right" : "left")};
  direction: ${(props) => (props.$rtl ? "rtl" : "ltr")};

  &:focus {
    border-bottom: 2px solid #66a109;
  }
`;

const DropdownInput = styled(FormInput)`
  cursor: pointer;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: ${(props) => (props.$rtl ? "auto" : "0")};
  right: ${(props) => (props.$rtl ? "0" : "auto")};
  width: 100%;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-top: 4px;
  padding: 0;
  list-style: none;
  text-align: ${(props) => (props.$rtl ? "right" : "left")};
`;

const SubmitButton = styled.button`
  background-color: #666;
  color: #ffffff;
  padding: 12px 32px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 16px;
  transition: all 0.2s ease;
  align-self: ${(props) => (props.$rtl ? "flex-end" : "flex-start")};
  width: 25%;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }

  @media (max-width: 768px) {
    width: 40%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

// ... (keep all other styled components the same as in your original code)

const ContactTitle = styled.h1`
  font-size: 48px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  @media (max-width: 991px) {
    font-size: 40px;
  }
  @media (max-width: 640px) {
    font-size: 32px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  @media (max-width: 991px) {
    gap: 40px;
  }
  @media (max-width: 640px) {
    gap: 32px;
  }
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  @media (max-width: 991px) {
    font-size: 20px;
  }
  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

const InfoText = styled.p`
  font-size: 16px;
  color: #666;
`;

const ContactFormContainer = styled.div`
  flex: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (max-width: 991px) {
    gap: 20px;
  }
  @media (max-width: 640px) {
    gap: 16px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownItem = styled.li`
  padding: 10px 16px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export default ContactUs;
