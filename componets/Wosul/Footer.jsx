"use client";
import React from "react";
import styled from "styled-components";
import CallToActionBanner from "./CallToActionBanner";
import FooterContent from "./FooterContent";

const Footer = () => {
  return (
    <FooterWrapper>
      <BackgroundImage
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b960271319a41e227a56e55151e836f73b7535f?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8"
        alt=""
      />
      <FooterContainer>
        <CallToActionBanner />
        <FooterContent />
      </FooterContainer>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  background-color: rgba(250, 250, 250, 1);
  overflow: hidden;
  position: relative;
`;

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 635px;
  width: 100%;
  padding: 16px 16px 59px 16px;
  align-items: stretch;
  z-index: 1;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export default Footer;
