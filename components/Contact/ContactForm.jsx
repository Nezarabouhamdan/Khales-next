"use client";
import React from "react";
import styled from "styled-components";
import ContactInfo from "./ContactInfo";
import ContactFormFields from "./ContactFormFields";

const ContactFormWrapper = styled.div`
  border-radius: 0px 0px 0px 0px;
`;

const FormContainer = styled.div`
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 60px 30px rgba(0, 0, 0, 0.03);
  width: 100%;
  padding: 10px 50px 10px 10px;

  @media (max-width: 991px) {
    max-width: 100%;
    padding-right: 20px;
  }
`;

const ContentLayout = styled.div`
  gap: 20px;
  display: flex;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const ContactForm = () => {
  const handleSubmit = (formData) => {
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <ContactFormWrapper style={{ margin: "100px auto" }}>
      <FormContainer>
        <ContentLayout>
          <ContactInfo />
          <ContactFormFields onSubmit={handleSubmit} />
        </ContentLayout>
      </FormContainer>
    </ContactFormWrapper>
  );
};

export default ContactForm;
