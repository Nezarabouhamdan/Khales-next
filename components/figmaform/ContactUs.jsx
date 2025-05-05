"use client";
import * as React from "react";
import { useState } from "react";
import { GreenText, Title } from "../Whoweare/TextContent";
import { useLanguage } from "../../Context/Languagecontext";
import { styled, keyframes } from "styled-components";

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
      phonePlaceholder: "Phone",
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
        phone: "+971 4 557 1184",
      },
      customer: {
        title: "خدمة العملاء على مدار الساعة",
        phone: "+971 55 129 9880",
      },
      hours: {
        title: "ساعات العمل",
        text: "من الأحد إلى الخميس - 9:00 صباحًا - 6:00 مساءً",
      },
    },
    form: {
      inquiryPlaceholder: "نوع الاستفسار",
      namePlaceholder: "الاسم الكامل",
      phonePlaceholder: "رقم الهاتف",
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
      <ContactContent $dir={language === "ar" ? "rtl" : "ltr"}>
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
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    inquiry: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInquirySelect = (option) => {
    setSelectedInquiry(option);
    setFormData((prev) => ({ ...prev, inquiry: option }));
    setIsInquiryOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        "https://khalesapi.onrender.com/api/create-lead",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            description: formData.message,
            branch: "Website",
            inquiry: formData.inquiry,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Fire Google Ads contact-form conversion
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "conversion", {
            send_to: "AW-10827937555/AXXWCJ-p2MEaEJPulKso",
            value: 1.0,
            currency: "AED",
          });
        }
        setSubmitStatus("success");
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
          inquiry: "",
        });
        setSelectedInquiry("");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setSubmitStatus(null);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <DropdownContainer>
            <DropdownInput
              type="text"
              name="inquiry"
              placeholder={content.inquiryPlaceholder}
              value={selectedInquiry}
              onClick={() => setIsInquiryOpen((o) => !o)}
              readOnly
              $rtl={rtl}
              required
            />
            {isInquiryOpen && (
              <DropdownMenu $rtl={rtl}>
                {content.inquiryOptions.map((option, idx) => (
                  <DropdownItem
                    key={idx}
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
            name="name"
            placeholder={content.namePlaceholder}
            value={formData.name}
            onChange={handleInputChange}
            $rtl={rtl}
            required
          />
        </FormGroup>

        <FormGroup>
          <FormInput
            type="tel"
            name="phone"
            placeholder={content.phonePlaceholder}
            value={formData.phone}
            onChange={handleInputChange}
            $rtl={rtl}
            required
          />
        </FormGroup>

        <FormGroup>
          <FormInput
            type="email"
            name="email"
            placeholder={content.emailPlaceholder}
            value={formData.email}
            onChange={handleInputChange}
            $rtl={rtl}
            required
          />
        </FormGroup>

        <FormGroup>
          <FormInput
            as="textarea"
            name="message"
            rows={4}
            placeholder={content.messagePlaceholder}
            value={formData.message}
            onChange={handleInputChange}
            $rtl={rtl}
            required
          />
        </FormGroup>

        <SubmitButton type="submit" disabled={isSubmitting} $rtl={rtl}>
          {isSubmitting ? (
            <LoadingDots $rtl={rtl}>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </LoadingDots>
          ) : (
            content.submitText
          )}
        </SubmitButton>

        {submitStatus === "success" && (
          <SuccessMessage $rtl={rtl}>
            Thank you! Your submission has been received.
          </SuccessMessage>
        )}
        {submitStatus === "error" && (
          <ErrorMessage $rtl={rtl}>
            There was an error submitting your form. Please try again.
          </ErrorMessage>
        )}
      </Form>
      {submitStatus && (
        <ModalOverlay onClick={closePopup}>
          <ModalContent onClick={(e) => e.stopPropagation()} $rtl={rtl}>
            {submitStatus === "success" ? (
              <>
                <AnimatedCheckmark viewBox="0 0 52 52">
                  <Circle cx="26" cy="26" r="25" fill="none" />
                  <Check
                    stroke="white"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </AnimatedCheckmark>
                <ModalTitle>{rtl ? "نجاح!" : "Success!"}</ModalTitle>
                <ModalText>
                  {rtl
                    ? "شكراً لك! تم استلام طلبك بنجاح."
                    : "Thank you! Your submission has been received."}
                </ModalText>
              </>
            ) : (
              <>
                <AnimatedXMark viewBox="0 0 52 52">
                  <Circle cx="26" cy="26" r="25" fill="none" />
                  <XLine x1="16" y1="16" x2="36" y2="36" />
                  <XLine x1="16" y1="36" x2="36" y2="16" />
                </AnimatedXMark>
                <ModalTitle>{rtl ? "خطأ!" : "Oops!"}</ModalTitle>
                <ModalText>
                  {rtl
                    ? "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى."
                    : "There was an error submitting your form. Please try again."}
                </ModalText>
              </>
            )}
            <CloseButton onClick={closePopup}>
              {rtl ? "إغلاق" : "Close"}
            </CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

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

// New styled components
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

const Circle = styled.circle``;
const Check = styled.path``;
const XLine = styled.line``;
// Styled Components… (unchanged)
const SuccessMessage = styled.p`
  color: #66a109;
  margin-top: 16px;
  text-align: ${(props) => (props.$rtl ? "right" : "left")};
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  margin-top: 16px;
  text-align: ${(props) => (props.$rtl ? "right" : "left")};
`;

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
  unicode-bidi: isolate;
  direction: ${(props) => (props.$rtl ? "rtl" : "rlt")};
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
  unicode-bidi: isolate;
  direction: ${(props) => (props.$rtl ? "rtl" : "rlt")};

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
  color: #fff;
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

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
`;
const InfoTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
`;
const InfoText = styled.p`
  font-size: 16px;
  color: #666;
`;
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;
const ContactFormContainer = styled.div`
  flex: 1;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
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
