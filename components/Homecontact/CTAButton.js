"use client";

import Link from "next/link";
import * as React from "react";
import styled from "styled-components";

export const StyledButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: center;
  z-index: 1;
  border-radius: 5px;
  background-color: rgba(92, 145, 8, 1);
  padding: 11px 25px;
  font-size: 18px;
  color: rgba(255, 255, 255, 1);
  letter-spacing: 0.36px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-decoration: none;
  &:hover {
    background-color: #545454;
  }

  &:focus {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  @media (max-width: 991px) {
    width: 230px;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const ButtonText = styled.span`
  align-self: stretch;
  margin: auto 0;
  @media (max-width: 991px) {
    font-size: 12px;
  }
`;

const ButtonIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  align-self: stretch;
  margin: auto 0;
  flex-shrink: 0;
  @media (max-width: 991px) {
    width: 20px;
  }
`;

export const CTAButton = ({ children, onClick }) => {
  return (
    <StyledButton href={"/contact"} aria-label="Contact us">
      <ButtonText>{children}</ButtonText>
      <ButtonIcon
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/db98ceeb93fa8fe08fe5ecdbfa924a2b80fbc4555d9dfb5e1b35fc239e9f5393?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8"
        alt=""
        aria-hidden="true"
      />
    </StyledButton>
  );
};
