"use client";

import React from "react";
import styled from "styled-components";
import ContactUs from "@/components/ContactForm/ContactUs"; // Assuming this is your form
import OfficeLocationsFinal from "@/components/Locations/L2"; // Your locations component
import CTASection from "@/components/Homecontact/CTASection";

const PageWrapper = styled.div`
  /* Add padding to the top to account for the fixed navbar */
  padding-top: 90px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: rgb(255, 255, 255);
  font-family: "Inter", sans-serif;
  padding: 80px 24px;

  @media (max-width: 991px) {
    padding: 60px 20px;
  }
`;

export default function ContactClientPage({ lang, content, ctaContent }) {
  if (!content || !ctaContent) {
    return null; // Or a loading skeleton
  }

  return (
    <PageWrapper>
      <FormContainer>
        {/* Pass the form and info content to the ContactUs component */}
        <ContactUs lang={lang} content={content} />
      </FormContainer>

      {/* Pass the specific 'locations' object down to the component */}
      <OfficeLocationsFinal lang={lang} content={content.locations} />

      <CTASection lang={lang} content={ctaContent} />
    </PageWrapper>
  );
}
