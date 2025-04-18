"use client";
import * as React from "react";
import Link from "next/link";
import styled from "styled-components";

// ServiceCard.js (Updated)
export const ServiceCard = ({
  imageSrc,
  titlePart1,
  titlePart2,
  description,
  buttonText = "Learn More",
  rtl = false,
  link,
}) => {
  // Create a URL-friendly slug

  return (
    <a
      style={{ textDecoration: "none" }}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <CardWrapper>
        <CardContainer rtl={rtl}>
          <ContentWrapper>
            <ServiceTitle rtl={rtl}>
              {titlePart1}
              <br />
              <GreenText>{titlePart2}</GreenText>
            </ServiceTitle>
            <ServiceDescription rtl={rtl}>{description}</ServiceDescription>
            <ActionButton rtl={rtl}>{buttonText}</ActionButton>
          </ContentWrapper>
        </CardContainer>
      </CardWrapper>
    </a>
  );
};

const CardWrapper = styled.section`
  height: auto; /* Replace min-height with auto */
  font-family: Inter, -apple-system, Roboto, Helvetica, sans-serif;
  color: rgba(0, 0, 0, 1);
  font-weight: 400;
  width: 400px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;
const CardContainer = styled.article`
  ${({ rtl }) => rtl && `direction: rtl;`}

  position: relative;
  width: 400px;
  height: auto; /* Remove min-height constraint */
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(230, 229, 229, 0.58);
  padding: 25px 30px 58px; /* Consider reducing bottom padding */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevent content overflow */
  @media (max-width: 991px) {
    width: 300px;
  }
`;

const ServiceTitle = styled.h2`
  font-size: 28px;
  line-height: 1.2; /* Reduced from 50px */
  margin: 0 0 10px 0; /* Add margin control */
  transition: all 0.3s ease-in-out;
  @media (max-width: 991px) {
    font-size: 15px;
    margin-top: 50px;
    width: 300px;
  }
  ${CardContainer}:hover & {
    padding-left: 0;
  }
`;

const ServiceDescription = styled.p`
  text-align: ${({ rtl }) => (rtl ? "center" : "center")};
  color: #838383;
  font-size: 12px;
  line-height: 1.5; /* Reduced from 39px */
  margin-top: 80px; /* Adjusted margin */
  white-space: pre-line;
  ${CardContainer}:hover & {
    opacity: 0;
  }
`;

const ContentWrapper = styled.div`
  text-align: ${({ rtl }) => (rtl ? "center" : "center")};

  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  align-content: center;
`;

const GreenText = styled.span`
  color: rgba(102, 161, 9, 1);
`;

const ActionButton = styled.button`
  margin-right: ${({ rtl }) => (rtl ? "40%" : "30%")};
  background-color: rgba(102, 161, 9, 1);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease-in-out;
  position: absolute;
  bottom: -40px;
  right: 0;
  margin-top: auto;

  &:hover {
    background-color: #545454;
  }

  &:focus {
    background-color: #545454;
    outline-offset: 2px;
  }

  ${CardContainer}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default ServiceCard;
