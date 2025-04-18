"use client";
import React, { useState } from "react";
import styled from "styled-components";
import {
  FormInput,
  FormTextarea,
  SubmitButton,
} from "./FormElements";

const FormSection = styled.section`
height:50vh;
  display: flex;
  flex-direction: column;
  width: 55%;
  margin-left: 20px;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

const FormContent = styled.form`
  display: flex;
  margin-top: 50px;
  width: 100%;
  flex-direction: column;
  font-family: 'Inter' sans-serif;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const InputRow = styled.div`
  display: flex;
  gap: 35px;
  flex-wrap: wrap;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const SubjectOptions = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 21px;
  flex-wrap: wrap;
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: rgba(0, 0, 0, 1);
  cursor: pointer;
`;

const RadioInput = styled.input`
  margin-right: 10px;
`;

const ContactFormFields = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "general", // Default to "General Inquiry"
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <FormSection>
      <FormContent onSubmit={handleSubmit}>
        <InputRow>
          <FormInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </InputRow>

        <InputRow>
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </InputRow>



        <SubjectOptions             
            name="subject"
    label="Select Subject?"
        >
          {[
            { label: "General Inquiry", value: "general" },
            { label: "Technical Support", value: "technical" },
            { label: "Billing Question", value: "billing" },
            { label: "Feature Request", value: "feature" },
          ].map(({ label, value }) => (
            <RadioOption key={value}>
              <RadioInput
                type="radio"
                name="subject"
                value={value}
                checked={formData.subject === value}
                onChange={handleChange}
              />
              <span>{label}</span>
            </RadioOption>
          ))}
        </SubjectOptions>

        <FormTextarea
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message.."
          required
        />

        <SubmitButton type="submit">Send Message</SubmitButton>
      </FormContent>
    </FormSection>
  );
};

export default ContactFormFields;
