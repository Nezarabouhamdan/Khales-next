// components/RegisterInterestForm.jsx
"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

//================================================================
// FORM DATA (IN ARABIC)
//================================================================
const emirates = [
  "أبوظبي",
  "دبي",
  "الشارقة",
  "عجمان",
  "أم القيوين",
  "رأس الخيمة",
  "الفجيرة",
];
const budgets = [
  "800 ألف - 1.5 مليون درهم",
  "1.5 مليون - 2.5 مليون درهم",
  "أكثر من 2.5 مليون درهم",
];

//================================================================
// STYLED COMPONENTS (WITH NEW BRAND COLORS)
//================================================================
const SectionWrapper = styled.section`
  padding: 6rem 2rem;
  background-color: #ffffff;
  font-family: "Almarai", sans-serif;
  direction: rtl;
`;

const ContentContainer = styled(motion.div)`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const InfoColumn = styled.div`
  h1 {
    font-size: 2.5rem;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #1a1a1a;
  }
  p {
    margin-top: 1rem;
    color: #555;
    line-height: 1.8;
  }
  a {
    color: #66a109; /* <-- UPDATED COLOR */
    font-weight: 600;
    text-decoration: underline;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const FormGroup = styled.div`
  position: relative;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 0;
  border: none;
  border-bottom: 1px solid #ccc;
  background-color: transparent;
  font-size: 1rem;
  font-family: "Almarai", sans-serif;
  outline: none;
  transition: border-color 0.3s ease;
  text-align: right;
  &::placeholder {
    color: #888;
  }
  &:focus {
    border-bottom-color: #66a109; /* <-- UPDATED COLOR */
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  cursor: pointer;
  &::after {
    content: "▼";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%) scale(0.6);
    color: #888;
    pointer-events: none;
  }
`;
const DropdownMenu = styled(motion.ul)`
  position: absolute;
  top: 100%;
  right: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-top: 0.5rem;
  padding: 0.5rem 0;
  list-style: none;
  max-height: 200px;
  overflow-y: auto;
`;
const DropdownItem = styled.li`
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const PhoneInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid #ccc;
  transition: border-color 0.3s ease;
  &:focus-within {
    border-bottom-color: #66a109; /* <-- UPDATED COLOR */
  }
  input {
    border: none;
    flex-grow: 1;
  }
`;

const SubmitButton = styled.button`
  background-color: transparent;
  color: #66a109; /* <-- UPDATED COLOR */
  padding: 0.8rem 2rem;
  border-radius: 30px;
  border: 1px solid #66a109; /* <-- UPDATED COLOR */
  font-size: 1rem;
  font-weight: 700;
  margin-top: 1rem;
  transition: all 0.3s ease;
  align-self: flex-start;
  cursor: pointer;
  &:hover {
    background-color: #66a109; /* <-- UPDATED COLOR */
    color: white;
    transform: translateY(-3px);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const ErrorText = styled(motion.p)`
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  text-align: right;
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
  z-index: 1000;
`;
const ModalContent = styled.div`
  background: white;
  color: #333;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
`;

//================================================================
// MAIN COMPONENT
//================================================================
const RegisterInterestForm = () => {
  const [emirateOpen, setEmirateOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    emirate: "",
    budget: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validatePhone = (phone) => {
    const phoneRegex = /^05[024568]\d{7}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "phone") {
      if (validatePhone(value)) {
        setErrors((prev) => ({ ...prev, phone: null }));
      }
    }
  };

  const handleDropdownSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // FIX: Close the respective dropdown menu upon selection
    if (field === "emirate") setEmirateOpen(false);
    if (field === "budget") setBudgetOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhone(formData.phone)) {
      setErrors({
        phone: "الرجاء إدخال رقم هاتف إماراتي صحيح (مثال: 05XXXXXXXX)",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrors({});

    const description = `الإمارة: ${formData.emirate}\nالميزانية المتوقعة: ${formData.budget}`;

    try {
      const response = await fetch("/api/create-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          description: description,
          branch: "Website",
          inquiry: "Register Interest",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          emirate: "",
          budget: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const dropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };
  const errorVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Almarai:wght@400;700&display=swap");
      `}</style>
      <SectionWrapper>
        <ContentContainer
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <InfoColumn>
            <motion.h1 variants={itemVariants}>سجل اهتمامك</motion.h1>
            <motion.p variants={itemVariants}>
              لا يعجبك النموذج؟ اترك رسالة عبر البريد الإلكتروني
              <br />
              <a href="mailto:info@khales.ae">info@khales.ae</a>
            </motion.p>
          </InfoColumn>

          <motion.div variants={itemVariants}>
            <Form onSubmit={handleSubmit} noValidate>
              <FormGroup>
                <FormInput
                  name="name"
                  placeholder="الاسم الكامل"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormInput
                  name="email"
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <PhoneInputWrapper
                  style={{ borderColor: errors.phone ? "#e74c3c" : "#ccc" }}
                >
                  <span>🇦🇪</span>
                  <FormInput
                    name="phone"
                    type="tel"
                    placeholder="رقم الهاتف المتحرك (05XXXXXXXX)"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </PhoneInputWrapper>
                <AnimatePresence>
                  {errors.phone && (
                    <ErrorText
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={errorVariants}
                    >
                      {errors.phone}
                    </ErrorText>
                  )}
                </AnimatePresence>
              </FormGroup>

              <FormGroup>
                <DropdownContainer
                  onClick={() => setEmirateOpen((prev) => !prev)}
                >
                  <FormInput
                    as="div"
                    style={{ textAlign: "right", paddingRight: 0 }}
                  >
                    {formData.emirate ||
                      "في أي إمارة تخطط للحصول على قطعة الأرض؟"}
                  </FormInput>
                  <AnimatePresence>
                    {emirateOpen && (
                      <DropdownMenu
                        variants={dropdownVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        {emirates.map((e) => (
                          <DropdownItem
                            key={e}
                            onClick={() => handleDropdownSelect("emirate", e)}
                          >
                            {e}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    )}
                  </AnimatePresence>
                </DropdownContainer>
              </FormGroup>

              <FormGroup>
                <DropdownContainer
                  onClick={() => setBudgetOpen((prev) => !prev)}
                >
                  <FormInput
                    as="div"
                    style={{ textAlign: "right", paddingRight: 0 }}
                  >
                    {formData.budget || "ميزانية البناء المتوقعة"}
                  </FormInput>
                  <AnimatePresence>
                    {budgetOpen && (
                      <DropdownMenu
                        variants={dropdownVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        {budgets.map((b) => (
                          <DropdownItem
                            key={b}
                            onClick={() => handleDropdownSelect("budget", b)}
                          >
                            {b}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    )}
                  </AnimatePresence>
                </DropdownContainer>
              </FormGroup>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "جار الإرسال..." : "إرسال"}
              </SubmitButton>
            </Form>
          </motion.div>
        </ContentContainer>
        {submitStatus && (
          <ModalOverlay onClick={() => setSubmitStatus(null)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              {submitStatus === "success"
                ? "تم الإرسال بنجاح!"
                : "حدث خطأ. يرجى المحاولة مرة أخرى."}
            </ModalContent>
          </ModalOverlay>
        )}
      </SectionWrapper>
    </>
  );
};

export default RegisterInterestForm;
