"use client";
import * as React from "react";
import styled from "styled-components";
import AboutUsContent from "./AboutUsContent";
import ImageGrid from "./ImageGrid";

const SectionAboutUs3 = () => {
  return (
    <StyledSection>
      <Container>
        <ContentWrapper>
          <ContentGrid>
            <AboutUsContent
              tag="Who We Are"
              title="Who We Are"
              description="Established in [Year of Establishment], [Your Travel Agency Name] has been dedicated to creating unforgettable travel experiences. Our journey started with a simple idea: to make travel extraordinary. Today, we continue to turn dreams into reality"
            />
            <AboutUsContent
              tag="Why Us"
              title="Why Us"
              description="What makes us unique is our unwavering commitment to excellence. We're not just a travel agency; we're your trusted travel companion. Discover the reasons why travelers like you choose us for their adventures"
            />
          </ContentGrid>
        </ContentWrapper>
        <ImageGrid />
      </Container>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  padding-left: 80px;
  padding-right: 80px;
  padding-top: 45px;
  flex-direction: column;
  overflow: hidden;
  align-items: center;

  @media (max-width: 991px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const Container = styled.div`
  display: flex;
  margin-left: 14px;
  width: 100%;
  max-width: 1108px;
  flex-direction: column;
  align-items: stretch;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const ContentWrapper = styled.div`
  align-self: start;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const ContentGrid = styled.div`
  gap: 20px;
  display: flex;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

export default SectionAboutUs3;
