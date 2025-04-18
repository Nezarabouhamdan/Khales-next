"use client";
import * as React from "react";
import styled from "styled-components";
import FeatureCard from "./FeatureCard1";
import ImageGallery1 from "./ImageGallery1";

const PrimenestFeature = () => {
  return (
    <MainSection>
      <ContentContainer>
        <Header>
          <Heading>Find Your Dream Home with PrimeNest</Heading>
          <Description>
            At PrimeNest, we simplify the home-buying process. Explore our
            extensive listings, tailored to your preferences, and receive expert
            guidance from our dedicated team At PrimeNest, we simplify the
            home-buying process. Explore our extensive listings, tailored to
            your preferences, and receive expert guidance from our dedicated
            team
          </Description>
        </Header>
        <FeaturesWrapper>
          <FeatureCard
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/90691d5c0f4795fe602d8a00899f9e070ebc70e49fd4f61bf3352f8838e21c9a"
            title="Browse Our Listings"
            description="Use our search tool to find properties that fit your criteria"
          />
          <FeatureCard
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/e60f087f56b0a78f47f7ed1eff0bd1b13a5312288642c2e53528a0e07fd14c9c"
            title="Schedule a Viewing"
            description="Book property viewings with a few clicks, at your convenience"
          />
          <FeatureCard
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/4a27eecb5ee386db044ec6a07faae82b4ae3a4d1c1dc00279ad5d6adbe515fd3"
            title="Get Expert Advice"
            description="Our team will guide you throught negotiations, Financing, and closing the deal"
          />
        </FeaturesWrapper>
      </ContentContainer>
      <ImageGallery1 />
    </MainSection>
  );
};

const MainSection = styled.section`
  display: flex;
  padding: 50px 56px;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 991px) {
    padding: 50px 20px;
  }
`;

const ContentContainer = styled.div`
  align-self: stretch;
  min-width: 240px;
  margin: auto 0;
  font-family: Inter, -apple-system, Roboto, Helvetica, sans-serif;
  width: 704px;
    @media (max-width: 1025px) {
  width: 354px;
  }
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Header = styled.header`
  width: 100%;
  padding: 10px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Heading = styled.h1`
  color: #1e1e1e;
  font-size: 46px;
  font-weight: 700;
  line-height: 44px;
  margin: 0;
   @media (max-width: 1025px) {
      font-size: 32px;
  font-weight: 700;
  line-height: 30px;
  }
  @media (max-width: 991px) {
    max-width: 100%;
    font-size: 40px;
    line-height: 51px;
  }
`;

const Description = styled.p`
  color: #757575;
  font-size: 15px;
  font-weight: 400;
  line-height: 30px;
  margin: 10px 0 0;
  @media (max-width: 1025px) {
  font-size: 10px;
  }
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const FeaturesWrapper = styled.div`
  margin-top: 30px;
  width: 100%;
  max-width: 894px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export default PrimenestFeature;
