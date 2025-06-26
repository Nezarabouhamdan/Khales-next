"use client";
import React from "react";
import styled from "styled-components";
import ServiceCard from "./ServiceCard";

const ServiceSection = () => {
  return (
    <ContentColumn>
      <ContentContainer>
        <MainHeading>Services</MainHeading>
        <IntroText>
          Li Europan lingues es membres del sam familie. Lor separat existentie
          es un myth. Por scientie, musica, sport etc, litot
        </IntroText>
        <ServiceCard
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/578881cc126f22333f2f2dbac3bd2c12a3be4915?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8"
          title="Engineering consultancy"
          description="Li Europan lingues es membres del sam familie. Lor separat existentie es un myth."
          backgroundColor="rgba(0, 0, 0, 1)"
        />
        <ServiceCard
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/6492d0213a97337352efd31e678ba4684b2202b1?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8"
          title="Project management"
          description="Li Europan lingues es membres del sam familie. Lor separat existentie es un myth."
          backgroundColor="rgba(102, 161, 9, 1)"
        />
      </ContentContainer>
    </ContentColumn>
  );
};

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 54%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const ContentContainer = styled.section`
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding: 10px 80px;
  flex-direction: column;
  align-items: start;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
    padding: 100px 20px;
  }
`;

const MainHeading = styled.h1`
  transform: rotate(0.0017264287877476686rad);
  color: rgba(0, 0, 0, 1);
  font-size: 73px;
  font-weight: 800;
  margin: 0;
  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

const IntroText = styled.p`
  color: rgba(0, 0, 0, 1);
  font-size: 25px;
  font-family: Be Vietnam Pro, -apple-system, Roboto, Helvetica, sans-serif;
  font-weight: 300;
  line-height: 38px;
  margin-top: 45px;
  margin-bottom: 0;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

export default ServiceSection;
