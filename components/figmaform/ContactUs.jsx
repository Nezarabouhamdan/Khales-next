"use client";
import * as React from "react";
import { useState } from "react";
import { GreenText, Title } from "../Whoweare/TextContent";
import { useLanguage } from "../../Context/Languagecontext";
import { styled, keyframes } from "styled-components";

// --- SVG ICONS ---
const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

// Content data for both languages (unchanged)
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
      <ContactCard>
        <ContactLayout $dir={language === "ar" ? "rtl" : "ltr"}>
          <ContactInfo>
            <InfoGroup>
              <IconWrapper>
                <EmailIcon />
              </IconWrapper>
              <InfoContent>
                <InfoTitle>{content.info.general.title}</InfoTitle>
                <InfoText>{content.info.general.email}</InfoText>
                <InfoText>
                  <LtrText>{content.info.general.phone}</LtrText>
                </InfoText>
              </InfoContent>
            </InfoGroup>
            <InfoGroup>
              <IconWrapper>
                <PhoneIcon />
              </IconWrapper>
              <InfoContent>
                <InfoTitle>{content.info.customer.title}</InfoTitle>
                <InfoText>
                  <LtrText>{content.info.customer.phone}</LtrText>
                </InfoText>
              </InfoContent>
            </InfoGroup>
            <InfoGroup>
              <IconWrapper>
                <ClockIcon />
              </IconWrapper>
              <InfoContent>
                <InfoTitle>{content.info.hours.title}</InfoTitle>
                <InfoText>{content.info.hours.text}</InfoText>
              </InfoContent>
            </InfoGroup>
          </ContactInfo>
          <ContactFormContainer>
            <ContactForm content={content.form} rtl={language === "ar"} />
          </ContactFormContainer>
        </ContactLayout>
      </ContactCard>
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
      const response = await fetch("/api/Contact-us", {
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
      });

      const data = await response.json();
      if (data.success) {
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
      <Form id="contact" onSubmit={handleSubmit}>
        <FormGroup>
          <DropdownContainer>
            <DropdownInput
              type="text"
              id="inquiry"
              name="inquiry"
              placeholder=" "
              value={selectedInquiry}
              onClick={() => setIsInquiryOpen((o) => !o)}
              readOnly
              $rtl={rtl}
              required
            />
            <FormLabel htmlFor="inquiry" $rtl={rtl}>
              {content.inquiryPlaceholder}
            </FormLabel>
            <ChevronDown $isOpen={isInquiryOpen} />
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
            id="name"
            name="name"
            placeholder=" "
            value={formData.name}
            onChange={handleInputChange}
            $rtl={rtl}
            required
          />
          <FormLabel htmlFor="name" $rtl={rtl}>
            {content.namePlaceholder}
          </FormLabel>
        </FormGroup>

        <FormGroup>
          <FormInput
            type="tel"
            id="phone"
            name="phone"
            placeholder=" "
            value={formData.phone}
            onChange={handleInputChange}
            $rtl={rtl}
            required
          />
          <FormLabel htmlFor="phone" $rtl={rtl}>
            {content.phonePlaceholder}
          </FormLabel>
        </FormGroup>

        <FormGroup>
          <FormInput
            type="email"
            id="email"
            name="email"
            placeholder=" "
            value={formData.email}
            onChange={handleInputChange}
            $rtl={rtl}
            required
          />
          <FormLabel htmlFor="email" $rtl={rtl}>
            {content.emailPlaceholder}
          </FormLabel>
        </FormGroup>

        <FormGroup>
          <FormTextarea
            as="textarea"
            id="message"
            name="message"
            rows={4}
            placeholder=" "
            value={formData.message}
            onChange={handleInputChange}
            $rtl={rtl}
            required
          />
          <FormLabel htmlFor="message" $rtl={rtl}>
            {content.messagePlaceholder}
          </FormLabel>
        </FormGroup>

        <SubmitButton
          id="contact"
          type="submit"
          disabled={isSubmitting}
          $rtl={rtl}
        >
          {isSubmitting ? (
            <LoadingDots>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </LoadingDots>
          ) : (
            content.submitText
          )}
        </SubmitButton>
      </Form>
      {submitStatus && (
        <ModalOverlay onClick={closePopup}>
          <ModalContent onClick={(e) => e.stopPropagation()} $rtl={rtl}>
            {submitStatus === "success" ? (
              <>
                <AnimatedCheckmark viewBox="0 0 52 52">
                  <Circle cx="26" cy="26" r="25" fill="none" />
                  <Check fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
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

// --- STYLED COMPONENTS ---

const ContactSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: rgb(255, 255, 255);
  font-family: "Inter", sans-serif;
  padding: 80px 24px;
  direction: ${(props) => props.$dir};

  @media (max-width: 991px) {
    padding: 60px 20px;
  }
`;

const ContactHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 48px;
`;

const ContactDescription = styled.p`
  font-size: 18px;
  color: #555;
  max-width: 600px;
  margin-top: 16px;
  line-height: 1.6;

  @media (max-width: 640px) {
    font-size: 16px;
  }
`;

const ContactCard = styled.div`
  width: 100%;
  max-width: 1200px;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  padding: 56px;
  overflow: hidden;
  /* Add a small margin for desktop view */
  margin: 0 24px;

  @media (max-width: 991px) {
    padding: 40px;
    margin: 0 20px; /* Adjust margin for tablet view */
  }

  @media (max-width: 640px) {
    padding: 32px 24px; /* More standard mobile padding */
    margin: 0; /* No margin on mobile, allowing it to be full-width */
    border-radius: 0; /* Optional: Make it a flat card on mobile */
  }
`;
const ContactLayout = styled.div`
  display: flex;
  width: 100%;
  gap: 80px;
  flex-direction: ${(props) => (props.$dir === "rtl" ? "row-reverse" : "row")};

  @media (max-width: 991px) {
    flex-direction: column;
    gap: 56px;
  }
`;

const LtrText = styled.span`
  direction: ltr;
  unicode-bidi: embed;
`;

// --- Contact Info Section ---
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  flex: 1;
`;

const InfoGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
  color: #66a109;
  margin-top: 4px;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;

  @media (max-width: 640px) {
    font-size: 20px;
  }
`;

const InfoText = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
`;

// --- Form Section ---

const ContactFormContainer = styled.div`
  flex: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  position: absolute;
  top: 15px;
  ${(props) => (props.$rtl ? "right: 16px;" : "left: 16px;")}
  color: #888;
  pointer-events: none;
  transition: all 0.2s ease-out;
  background-color: #fff;
  padding: 0 4px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  text-align: ${(props) => (props.$rtl ? "right" : "left")};

  &:focus {
    border-color: #66a109;
    box-shadow: 0 0 0 3px rgba(102, 161, 9, 0.15);
  }

  &:focus ~ ${FormLabel}, &:not(:placeholder-shown) ~ ${FormLabel} {
    top: -10px;
    font-size: 13px;
    color: #66a109;
  }
`;

const FormTextarea = styled(FormInput)`
  min-height: 120px;
  resize: vertical;
`;

const FormGroup = styled.div`
  position: relative;
  margin-bottom: 28px;
`;

// --- Custom Dropdown ---

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownInput = styled(FormInput)`
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
`;

const ChevronDown = styled.div`
  position: absolute;
  top: 50%;
  ${(props) => (props.$rtl ? "left: 16px;" : "right: 16px;")}
  transform: translateY(-50%) ${(props) =>
    props.$isOpen ? "rotate(180deg)" : "rotate(0)"};
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #888;
  pointer-events: none;
  transition: transform 0.2s ease;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 100;
  margin-top: 4px;
  padding: 8px 0;
  list-style: none;
  max-height: 200px;
  overflow-y: auto;
  text-align: ${(props) => (props.$rtl ? "right" : "left")};
`;

const DropdownItem = styled.li`
  padding: 12px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    color: #66a109;
  }
`;

const SubmitButton = styled.button`
  background-color: #66a109;
  color: #fff;
  padding: 14px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 16px;
  transition: all 0.3s ease;
  align-self: ${(props) => (props.$rtl ? "flex-end" : "flex-start")};
  border: none;
  cursor: pointer;
  min-width: 150px;
  text-align: center;

  &:hover:not(:disabled) {
    background-color: #538307;
    box-shadow: 0 4px 15px rgba(102, 161, 9, 0.25);
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

// Modal and status messages (mostly unchanged, minor style tweaks for consistency if needed)
const scaleUp = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;
const checkAnimation = keyframes`
  0% { stroke-dashoffset: 80; } 100% { stroke-dashoffset: 0; }
`;
const circleAnimation = keyframes`
  0% { stroke-dashoffset: 166; } 100% { stroke-dashoffset: 0; }
`;
const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-6px); }
`;

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
  padding: 2.5rem;
  border-radius: 16px;
  text-align: center;
  animation: ${scaleUp} 0.3s ease-out;
  max-width: 400px;
  width: 90%;
  direction: ${(props) => (props.$rtl ? "rtl" : "ltr")};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;
const AnimatedCheckmark = styled.svg`
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  display: block;
  circle {
    stroke: #66a109;
    stroke-width: 2.5;
    animation: ${circleAnimation} 0.6s ease-in-out both;
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
  }
  path {
    stroke: #66a109;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
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
    stroke-width: 2.5;
    animation: ${circleAnimation} 0.6s ease-in-out both;
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
  }
  line {
    stroke: #e74c3c;
    stroke-width: 3;
    stroke-linecap: round;
    animation: ${checkAnimation} 0.6s ease-in-out 0.6s both;
    stroke-dasharray: 80;
    stroke-dashoffset: 80;
  }
`;
const Circle = styled.circle``;
const Check = styled.path``;
const XLine = styled.line``;
const LoadingDots = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 1em;
  span {
    animation: ${bounce} 1.4s infinite ease-in-out both;
    color: inherit;
    font-size: 1.5em;
    line-height: 0;
    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
`;
const ModalTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #333;
`;
const ModalText = styled.p`
  color: #666;
  margin-bottom: 2rem;
  white-space: pre-line;
  font-size: 1rem;
`;
const CloseButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.2s ease;
  &:hover {
    background: #5a6268;
  }
`;

export default ContactUs;
