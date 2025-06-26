"use client";
import React from "react";
import styled from "styled-components";

const TitleSection = ({ subheading, heading, year }) => {
  return (
    <TitleContainer>
      <Subheading>{subheading}</Subheading>
      <MainHeading>{heading}</MainHeading>
      <MetaInfo>
        <CalendarIcon
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/539e95fc6b7888f7b582a4008c652126f417d120?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8"
          alt="Calendar icon"
        />
        <YearText>Year : {year}</YearText>
      </MetaInfo>
    </TitleContainer>
  );
};

const TitleContainer = styled.header`
  display: flex;
  width: 583px;
  max-width: 100%;
  flex-direction: column;
  align-items: stretch;
  font-family:
    Be Vietnam,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-weight: 400;
  justify-content: start;
`;

const Subheading = styled.p`
  color: #66a109;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0;
`;

const MainHeading = styled.h1`
  color: #000;
  font-size: 48px;
  line-height: 62px;
  margin: 20px 0 0 0;
  @media (max-width: 991px) {
    max-width: 100%;
    font-size: 40px;
    line-height: 58px;
  }
`;

const MetaInfo = styled.div`
  border-radius: 4px;
  align-self: start;
  display: flex;
  margin-top: 20px;
  align-items: center;
  gap: 12px;
  overflow: hidden;
  font-family:
    Manrope,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 18px;
  color: #a6afb5;
  line-height: 1.4;
  justify-content: start;
`;

const CalendarIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  align-self: stretch;
  margin: auto 0;
  flex-shrink: 0;
`;

const YearText = styled.span`
  color: #a6afb5;
  align-self: stretch;
  margin: auto 0;
`;

export default TitleSection;
