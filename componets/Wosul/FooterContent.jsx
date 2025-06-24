"use client";
import React from "react";
import styled from "styled-components";
import CompanyInfo from "./CompanyInfo";
import FooterNavigation from "./FooterNavigation";
import FooterContact from "./FooterContact";

const FooterContent = () => {
  return (
    <ContentContainer>
      <CompanyInfo />
      <NavigationAndContact>
        <FooterNavigation />
        <FooterContact />
      </NavigationAndContact>
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  position: relative;
  align-self: center;
  display: flex;
  margin-top: 84px;
  align-items: start;
  gap: 108px;
  justify-content: start;
  flex-wrap: wrap;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
    gap: 40px;
  }
`;

const NavigationAndContact = styled.div`
  display: flex;
  align-items: start;
  gap: 40px;
  justify-content: start;
  flex-wrap: wrap;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

export default FooterContent;
