"use client";

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaWhatsapp } from "react-icons/fa";

// ─── Animations ───────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40%           { transform: translateY(-6px); }
`;

// ─── Page Layout (matches ContactPage.jsx) ────────────────────────────────────

const PageWrapper = styled.div`
  padding-top: 90px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  font-family: "Inter", sans-serif;
  padding: 80px 24px 100px;
  direction: ${({ $isRtl }) => ($isRtl ? "rtl" : "ltr")};

  @media (max-width: 991px) {
    padding: 60px 20px 80px;
  }
`;

// ─── Header ───────────────────────────────────────────────────────────────────

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 48px;
  animation: ${fadeUp} 0.5s ease both;
`;

const PageTitle = styled.h1`
  font-family: "Playfair", serif;
  font-size: 2.4rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 10px;

  @media (max-width: 640px) {
    font-size: 1.8rem;
  }
`;

const GreenSpan = styled.span`
  color: #66a109;
`;

const PageSubtitle = styled.p`
  font-size: 0.9rem;
  color: #888;
  margin: 0;
  letter-spacing: 0.03em;
`;

// ─── Card (matches ContactCard in ContactUs.jsx) ──────────────────────────────

const FormCard = styled.div`
  width: 100%;
  max-width: 660px;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  padding: 56px;
  animation: ${fadeUp} 0.55s ease 0.05s both;

  @media (max-width: 991px) {
    padding: 40px;
  }

  @media (max-width: 640px) {
    padding: 32px 24px;
    border-radius: 16px;
  }
`;

// ─── Question Block ───────────────────────────────────────────────────────────

const QuestionBlock = styled.div`
  margin-bottom: 32px;
`;

const QuestionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-direction: row;
`;

const QuestionNumber = styled.div`
  width: 30px;
  height: 30px;
  min-width: 30px;
  border-radius: 50%;
  background-color: #66a109;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82rem;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(102, 161, 9, 0.3);
`;

const QuestionText = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #333;

  &::after {
    content: " *";
    color: #e74c3c;
  }
`;

const OptionalLabel = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
`;

// ─── Radio Group (matches site's clean UI) ────────────────────────────────────

const RadioList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-inline-start: 42px;
`;

const RadioItem = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 0.95rem;
  color: #555;
  flex-direction: row;
  padding: 4px 0;
  transition: color 0.2s ease;

  &:hover {
    color: #66a109;
  }

  input[type="radio"] {
    width: 17px;
    height: 17px;
    min-width: 17px;
    accent-color: #66a109;
    cursor: pointer;
  }
`;

// ─── Text Inputs (matches FormInput in ContactUs.jsx exactly) ─────────────────

const InputWrapper = styled.div`
  position: relative;
  padding-inline-start: 42px;
`;

const StyledInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 14px 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  color: #333;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  text-align: ${({ $isRtl }) => ($isRtl ? "right" : "left")};
  direction: ${({ $isRtl }) => ($isRtl ? "rtl" : "ltr")};

  &:focus {
    border-color: #66a109;
    box-shadow: 0 0 0 3px rgba(102, 161, 9, 0.15);
  }

  &::placeholder {
    color: #bbb;
  }
`;

// ─── Residence Row ────────────────────────────────────────────────────────────

const ResidenceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding-inline-start: 42px;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

const ResidenceInputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const SubLabel = styled.span`
  font-size: 0.78rem;
  font-weight: 600;
  color: #888;
  text-align: ${({ $isRtl }) => ($isRtl ? "right" : "left")};
`;

const ResidenceInput = styled(StyledInput)``;

// ─── Field Error ──────────────────────────────────────────────────────────────

const FieldError = styled.p`
  color: #e74c3c;
  font-size: 0.78rem;
  margin: 6px 0 0;
  padding-inline-start: 42px;
  text-align: ${({ $isRtl }) => ($isRtl ? "right" : "left")};
`;

// ─── Divider ──────────────────────────────────────────────────────────────────

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #f0f0f0;
  margin: 0 0 32px;
`;

// ─── Buttons ──────────────────────────────────────────────────────────────────

const ButtonRow = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 40px;
  flex-direction: ${({ $isRtl }) => ($isRtl ? "row-reverse" : "row")};

  @media (max-width: 400px) {
    flex-direction: column-reverse;
  }
`;

const WhatsAppButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 14px 24px;
  background-color: #25d366;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.25);

  &:hover:not(:disabled) {
    background-color: #1ebe58;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.35);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

const ClearButton = styled.button`
  padding: 14px 28px;
  background: transparent;
  color: #666;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    border-color: #66a109;
    color: #66a109;
  }
`;

// ─── Loading Dots (matches ContactUs.jsx) ─────────────────────────────────────

const LoadingDots = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  span {
    font-size: 1.4rem;
    line-height: 1;
    animation: ${bounce} 1.4s infinite ease-in-out both;

    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const INITIAL_FORM = {
  position: "",
  totalExperience: "",
  availability: "",
  aiKnowledge: "",
  expectedSalary: "",
  maritalStatus: "",
  district: "",
  city: "",
  nationality: "",
  arabicLevel: "",
};

const REQUIRED = [
  "position",
  "availability",
  "aiKnowledge",
  "expectedSalary",
  "maritalStatus",
  "nationality",
  "arabicLevel",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ApplicationPage({ lang, content }) {
  const isRtl = lang === "ar";
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!content) return null;
  const c = content;

  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const next = {};
    REQUIRED.forEach((f) => { if (!form[f].trim()) next[f] = c.requiredField; });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildMessage = () =>
    [
      `*${c.title}*`,
      ``,
      `*${c.position}:* ${form.position}`,
      `*${c.totalExperience}:* ${form.totalExperience || "-"}`,
      `*${c.availability}:* ${form.availability ? c.availabilityOptions[form.availability] : "-"}`,
      `*${c.aiKnowledge}:* ${form.aiKnowledge ? c.aiKnowledgeOptions[form.aiKnowledge] : "-"}`,
      `*${c.expectedSalary}:* ${form.expectedSalary} AED`,
      `*${c.maritalStatus}:* ${form.maritalStatus ? c.maritalStatusOptions[form.maritalStatus] : "-"}`,
      `*${c.currentResidence}:* ${[form.district, form.city].filter(Boolean).join(", ") || "-"}`,
      `*${c.nationality}:* ${form.nationality}`,
      `*${c.arabicLevel}:* ${form.arabicLevel ? c.arabicLevelOptions[form.arabicLevel] : "-"}`,
    ].join("\n");

  const handleWhatsApp = async () => {
    if (!validate()) return;
    setSubmitting(true);

    try {
      await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (_) {
      // silent — WhatsApp still opens
    }

    window.open(
      `https://api.whatsapp.com/send?phone=971551299880&text=${encodeURIComponent(buildMessage())}`,
      "_blank",
    );

    setSubmitting(false);
    setSubmitted(true);
  };

  const handleClear = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setSubmitted(false);
  };

  const Radios = ({ field, options }) => (
    <RadioList>
      {Object.entries(options).map(([key, label]) => (
        <RadioItem key={key}>
          <input
            type="radio"
            name={field}
            value={key}
            checked={form[field] === key}
            onChange={() => set(field, key)}
          />
          {label}
        </RadioItem>
      ))}
    </RadioList>
  );

  if (submitted) {
    return (
      <PageWrapper>
        <FormContainer $isRtl={isRtl} dir={isRtl ? "rtl" : "ltr"}>
          <FormCard style={{ textAlign: "center", padding: "64px 40px" }}>
            <div style={{ fontSize: "3rem", marginBottom: 20 }}>✅</div>
            <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "#66a109", margin: 0 }}>
              {c.successMessage}
            </p>
          </FormCard>
        </FormContainer>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <FormContainer $isRtl={isRtl} dir={isRtl ? "rtl" : "ltr"}>
        {/* ── Header ── */}
        <PageHeader>
          <PageTitle>
            {isRtl ? (
              <>
                {c.title} <GreenSpan>✦</GreenSpan>
              </>
            ) : (
              <>
                Candidate <GreenSpan>Survey</GreenSpan>
              </>
            )}
          </PageTitle>
          <PageSubtitle>
            {c.subtitle} &nbsp;·&nbsp; Executive Assistant Position
          </PageSubtitle>
        </PageHeader>

        {/* ── Form Card ── */}
        <FormCard>
          <Divider />

          {/* Q1 — Position */}
          <QuestionBlock>
            <QuestionLabel>
              <QuestionNumber>1</QuestionNumber>
              <QuestionText>{c.position}</QuestionText>
            </QuestionLabel>
            <InputWrapper>
              <StyledInput
                type="text"
                placeholder={c.positionPlaceholder}
                value={form.position}
                onChange={(e) => set("position", e.target.value)}
                $isRtl={isRtl}
              />
            </InputWrapper>
            {errors.position && (
              <FieldError $isRtl={isRtl}>{errors.position}</FieldError>
            )}
          </QuestionBlock>

          {/* Q2 — Total Experience */}
          <QuestionBlock>
            <QuestionLabel>
              <QuestionNumber>2</QuestionNumber>
              <OptionalLabel>{c.totalExperience}</OptionalLabel>
            </QuestionLabel>
            <InputWrapper>
              <StyledInput
                type="text"
                placeholder={c.totalExperiencePlaceholder}
                value={form.totalExperience}
                onChange={(e) => set("totalExperience", e.target.value)}
                $isRtl={isRtl}
              />
            </InputWrapper>
          </QuestionBlock>

          {/* Q3 — Availability */}
          <QuestionBlock>
            <QuestionLabel>
              <QuestionNumber>3</QuestionNumber>
              <QuestionText>{c.availability}</QuestionText>
            </QuestionLabel>
            <Radios field="availability" options={c.availabilityOptions} />
            {errors.availability && (
              <FieldError $isRtl={isRtl}>{errors.availability}</FieldError>
            )}
          </QuestionBlock>

          {/* Q4 — AI Knowledge */}
          <QuestionBlock>
            <QuestionLabel>
              <QuestionNumber>4</QuestionNumber>
              <QuestionText>{c.aiKnowledge}</QuestionText>
            </QuestionLabel>
            <Radios field="aiKnowledge" options={c.aiKnowledgeOptions} />
            {errors.aiKnowledge && (
              <FieldError $isRtl={isRtl}>{errors.aiKnowledge}</FieldError>
            )}
          </QuestionBlock>

          {/* Q5 — Expected Salary */}
          <QuestionBlock>
            <QuestionLabel>
              <QuestionNumber>5</QuestionNumber>
              <QuestionText>{c.expectedSalary}</QuestionText>
            </QuestionLabel>
            <InputWrapper>
              <StyledInput
                type="number"
                placeholder={c.expectedSalaryPlaceholder}
                value={form.expectedSalary}
                onChange={(e) => set("expectedSalary", e.target.value)}
                $isRtl={isRtl}
                min="0"
              />
            </InputWrapper>
            {errors.expectedSalary && (
              <FieldError $isRtl={isRtl}>{errors.expectedSalary}</FieldError>
            )}
          </QuestionBlock>

          {/* Q6 — Marital Status */}
          <QuestionBlock>
            <QuestionLabel>
              <QuestionNumber>6</QuestionNumber>
              <QuestionText>{c.maritalStatus}</QuestionText>
            </QuestionLabel>
            <Radios field="maritalStatus" options={c.maritalStatusOptions} />
            {errors.maritalStatus && (
              <FieldError $isRtl={isRtl}>{errors.maritalStatus}</FieldError>
            )}
          </QuestionBlock>

          {/* Q7 — Current Residence */}
          <QuestionBlock>
            <QuestionLabel>
              <QuestionNumber>7</QuestionNumber>
              <OptionalLabel>{c.currentResidence}</OptionalLabel>
            </QuestionLabel>
            <ResidenceGrid>
              <ResidenceInputWrap>
                <SubLabel $isRtl={isRtl}>{c.district}</SubLabel>
                <ResidenceInput
                  type="text"
                  placeholder={c.districtPlaceholder}
                  value={form.district}
                  onChange={(e) => set("district", e.target.value)}
                  $isRtl={isRtl}
                />
              </ResidenceInputWrap>
              <ResidenceInputWrap>
                <SubLabel $isRtl={isRtl}>{c.city}</SubLabel>
                <ResidenceInput
                  type="text"
                  placeholder={c.cityPlaceholder}
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  $isRtl={isRtl}
                />
              </ResidenceInputWrap>
            </ResidenceGrid>
          </QuestionBlock>

          {/* Q8 — Nationality */}
          <QuestionBlock>
            <QuestionLabel>
              <QuestionNumber>8</QuestionNumber>
              <QuestionText>{c.nationality}</QuestionText>
            </QuestionLabel>
            <InputWrapper>
              <StyledInput
                type="text"
                placeholder={c.nationalityPlaceholder}
                value={form.nationality}
                onChange={(e) => set("nationality", e.target.value)}
                $isRtl={isRtl}
              />
            </InputWrapper>
            {errors.nationality && (
              <FieldError $isRtl={isRtl}>{errors.nationality}</FieldError>
            )}
          </QuestionBlock>

          {/* Q9 — Arabic Level */}
          <QuestionBlock>
            <QuestionLabel>
              <QuestionNumber>9</QuestionNumber>
              <QuestionText>{c.arabicLevel}</QuestionText>
            </QuestionLabel>
            <Radios field="arabicLevel" options={c.arabicLevelOptions} />
            {errors.arabicLevel && (
              <FieldError $isRtl={isRtl}>{errors.arabicLevel}</FieldError>
            )}
          </QuestionBlock>

          {/* ── Buttons ── */}
          <ButtonRow $isRtl={isRtl}>
            <ClearButton type="button" onClick={handleClear}>
              {c.clear}
            </ClearButton>
            <WhatsAppButton
              type="button"
              onClick={handleWhatsApp}
              disabled={submitting}
            >
              <FaWhatsapp size={20} />
              {submitting ? (
                <LoadingDots>
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </LoadingDots>
              ) : (
                c.submitWhatsApp
              )}
            </WhatsAppButton>
          </ButtonRow>
        </FormCard>
      </FormContainer>
    </PageWrapper>
  );
}
