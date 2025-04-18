"use client";
import React, { useState } from "react";
import styled from "styled-components";
import {
  FormInput,
  FormLabel,
  FormSelect,
  FormTextarea,
  FormButton,
  ErrorMessage,
  SuccessMessage,
} from "./FormElements";
import { Title } from "../Whoweare/TextContent";

const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 84px 251px;
  width: 100%;
  border-radius: 8px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid black;

  @media (max-width: 991px) {
    padding: 60px 40px;
  }

  @media (max-width: 640px) {
    padding: 40px 20px;
  }
`;

const Form = styled.form`
  border-radius: 8px;
  width: 100%;
  max-width: 640px;
  background-color: #fff;
`;

const InputRow = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const InputGroup = styled.div`
  flex: 1;
`;

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        projectType: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <FormContainer>
      <Title>GET IN TOUCH</Title>
      <Form onSubmit={handleSubmit} noValidate>
        {submitSuccess && (
          <SuccessMessage role="alert">
            Thank you for your message! We'll get back to you soon.
          </SuccessMessage>
        )}

        <InputRow>
          <InputGroup>
            <FormLabel htmlFor="firstName">First name*</FormLabel>
            <FormInput
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.firstName}
            />
            {errors.firstName && (
              <ErrorMessage role="alert">{errors.firstName}</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <FormLabel htmlFor="lastName">Last name</FormLabel>
            <FormInput
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
            />
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <FormLabel htmlFor="email">Email address*</FormLabel>

            <FormInput
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <ErrorMessage role="alert">{errors.email}</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <FormLabel htmlFor="projectType">Project type</FormLabel>
            <FormSelect
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
            >
              <option value="">Select one</option>
              <option value="website">Website</option>
              <option value="mobile-app">Mobile App</option>
              <option value="design">Design</option>
              <option value="other">Other</option>
            </FormSelect>
          </InputGroup>
        </InputRow>

        <InputGroup>
          <FormLabel htmlFor="message">Message*</FormLabel>
          <FormTextarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message here"
            aria-required="true"
            aria-invalid={!!errors.message}
          />
          {errors.message && (
            <ErrorMessage role="alert">{errors.message}</ErrorMessage>
          )}
        </InputGroup>

        <div style={{ textAlign: "right", marginTop: "16px" }}>
          <FormButton
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </FormButton>
        </div>
      </Form>
    </FormContainer>
  );
}

export default ContactForm;
