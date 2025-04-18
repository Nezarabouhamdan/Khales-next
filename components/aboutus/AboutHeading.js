"use client";
import * as React from "react";
import styled from "styled-components";

export const AboutHeading = () => {
  return (
    <HeadingContainer>
      <HeadingIcon
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/73434e76f973691b7fdace17fa70b30849906609c64b3ef65c287a19a58643b2?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8"
        alt="heading icon"
        aria-hidden="true"
      />
      <Heading>About Us</Heading>
    </HeadingContainer>
  );
};

const HeadingContainer = styled.div`
  display: flex;
  margin-left: 15px;
  width: 436px;
  max-width: 100%;
  align-items: stretch;
  gap: 40px 78px;
  font-size: 35px;
  font-weight: 700;
  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

const HeadingIcon = styled.img`
  aspect-ratio: 0.13;
  object-fit: contain;
  object-position: center;
  width: 13px;
  flex-shrink: 0;
`;

const Heading = styled.h1`
  flex-grow: 1;
  flex-shrink: 1;
  width: 340px;
  flex-basis: auto;
  @media (max-width: 991px) {
    font-size: 40px;
  }
`;
