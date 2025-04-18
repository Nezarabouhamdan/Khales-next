"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MultiStepForm from "../components/Stepper/MultiStepForm";
import { GreenText, Title } from "../components/Whoweare/TextContent";
import { useLanguage } from "../Context/Languagecontext";

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100vh; /* Adjust height as needed */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f8f9fa;

    background-image: url('/assets/Group.png');
    background-size: cover;
    background-position: center;
    opacity: 0.8; /* Adjust opacity as needed */
    z-index: -1;
  }
`;

const BookingPage = () => {
  const { language } = useLanguage(); // Assuming you have a language context
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    return () => setIsClient(false); // Cleanup
  }, []);

  // change metadata from client side
  useEffect(() => {
    document.title = `${
      language === "ar" ? "احجز موعدك" : "Book an appointemt"
    } - Khales`;
  }, [language]);

  // Don't render anything during SSR
  if (!isClient) return null;

  return (
    <>
      <Wrapper>
        <Title style={{ marginTop: "100px" }}>
          Booking
          <GreenText> appointment </GreenText>
        </Title>
        <MultiStepForm />
      </Wrapper>
    </>
  );
};

export default BookingPage;
