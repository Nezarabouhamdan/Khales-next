"use client";
import React from "react";
import styled from "styled-components";
import ImagesSection from "./ImagesSection";
import ServiceSection from "./ServiceSection";

const Services = () => {
  return (
    <ServicesContainer>
      <MainWrapper>
        <ContentLayout>
          <ImagesSection />
          <ServiceSection />
        </ContentLayout>
      </MainWrapper>
    </ServicesContainer>
  );
};

const ServicesContainer = styled.section`
  background-color: rgb(255, 255, 255);
  display: flex;
  padding: 56px 70px;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  justify-content: center;

  @media (max-width: 991px) {
    padding: 56px 20px;
  }
`;

const MainWrapper = styled.div`
  width: 100%;
  max-width: 1450px;
  @media (max-width: 991px) {
    max-width: 100%;
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

export default Services;
