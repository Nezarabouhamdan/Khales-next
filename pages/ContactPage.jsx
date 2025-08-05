// components/PageSpecific/ContactPage.js
"use client";

import React from "react";
import styled from "styled-components";

// Import your existing UI components
import ContactUs from "@/components/ContactForm/ContactUs";
import CTASection from "@/components/Homecontact/CTASection";
import OfficeLocationsFinal from "@/components/Locations/L2";

const PageWrapper = styled.div`
  /* Add padding to the top to account for the fixed navbar */
  padding-top: 90px;
`;

const FormContainer = styled.div`
  /* The original ContactSection styling is moved here */
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

export default function ContactPage({ lang, content, ctaContent }) {
  if (!content || !ctaContent) {
    return null; // Or a loading skeleton
  }

  return (
    <PageWrapper>
      <FormContainer>
        {/* Pass the specific 'form' and 'info' content to the ContactUs component */}
        <ContactUs lang={lang} content={content} />
      </FormContainer>

      <OfficeLocationsFinal lang={lang} content={content.locations} />

      <CTASection lang={lang} content={ctaContent} />
    </PageWrapper>
  );
}
