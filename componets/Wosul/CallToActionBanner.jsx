"use client";
import React from "react";
import styled from "styled-components";

const CallToActionBanner = () => {
  const handleGetStartedClick = () => {
    // Add your navigation logic here
    console.log("Get Started clicked");
  };

  return (
    <BannerContainer>
      <BackgroundImage
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/eede2c04f53de92d527d34108921716ca6645b1a?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8"
        alt=""
      />
      <BannerContent>
        <MainHeading>Ready to work with us ?</MainHeading>
        <GetStartedButton
          onClick={handleGetStartedClick}
          aria-label="Get started with our services"
        >
          <ButtonText>Get Started</ButtonText>
          <ArrowIcon
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/40b294369bda59bfc748306f11ff4d7068821c68?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8"
            alt=""
          />
        </GetStartedButton>
      </BannerContent>
    </BannerContainer>
  );
};

const BannerContainer = styled.section`
  position: relative;
  border-radius: 30px;
  background-color: rgba(2, 6, 9, 1);
  overflow: hidden;
  font-family:
    Plus Jakarta Sans,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 235px;
  width: 100%;
  padding: 88px 64px;
  align-items: stretch;
  justify-content: center;
  @media (max-width: 991px) {
    max-width: 100%;
    padding: 88px 20px;
  }
`;

const MainHeading = styled.h2`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 1243px;
  align-items: center;
  gap: 40px 100px;
  justify-content: space-between;
  flex-wrap: wrap;
  color: rgba(255, 255, 255, 1);
  font-size: 80px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -2.4px;
  margin: 0;
  @media (max-width: 991px) {
    max-width: 100%;
    font-size: 40px;
  }
`;

const GetStartedButton = styled.button`
  border-radius: 70px;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  padding: 16px 32px;
  align-items: center;
  gap: 42px;
  font-size: 16px;
  color: rgba(1, 2, 5, 1);
  font-weight: 700;
  letter-spacing: -0.32px;
  line-height: 1.4;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-end;
  margin-top: auto;

  &:hover {
    background-color: rgba(240, 240, 240, 1);
    transform: translateY(-2px);
  }

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 1);
    outline-offset: 2px;
  }

  @media (max-width: 991px) {
    padding: 16px 20px;
    align-self: center;
    margin-top: 20px;
  }
`;

const ButtonText = styled.span`
  margin: auto 0;
`;

const ArrowIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  margin: auto 0;
  flex-shrink: 0;
`;

export default CallToActionBanner;
