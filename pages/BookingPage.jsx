"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MultiStepForm from "../components/Stepper/MultiStepForm";
import { Title } from "../components/Whoweare/TextContent"; // Removed unused GreenText import
import { useLanguage } from "../Context/Languagecontext";

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh; /* Use min-height to ensure it fills the screen */
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Removed justify-content to allow content to start from the top */
  padding-top: 100px; /* Use padding instead of margin on the Title */
  padding-bottom: 50px;
  gap: 2rem; /* Add some gap between title and form */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f8f9fa;
    background-image: url("/assets/Group.png");
    background-size: cover;
    background-position: center;
    opacity: 0.8;
    z-index: -1;
  }
`;

const BookingPage = () => {
  const { language } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  // --- 1. Create a state variable for the page title ---
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  // --- 2. Create an effect to update BOTH the state and document.title ---
  useEffect(() => {
    // Only run this logic on the client side
    if (isClient) {
      const newTitle = language === "ar" ? "احجز موعدك" : "Book an Appointment";

      // Update the React state (this will cause the component to re-render)
      setPageTitle(newTitle);

      // Update the browser tab title
      document.title = newTitle;
    }
  }, [language, isClient]); // This effect runs when language or isClient changes

  // Don't render anything during SSR to avoid hydration errors
  if (!isClient) {
    return null;
  }

  return (
    <>
      <Wrapper>
        {/* --- 3. Use the state variable here for rendering --- */}
        <Title>{pageTitle}</Title>
        <MultiStepForm />
      </Wrapper>
    </>
  );
};

export default BookingPage;
