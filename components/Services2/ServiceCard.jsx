"use client";
import * as React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

// ServiceCard.js (Updated)
export const ServiceCard = ({
  imageSrc,
  titlePart1,
  titlePart2,
  description,
  buttonText = "Learn More",
  rtl = false,
}) => {
  // Create a URL-friendly slug
  const slug = `${titlePart1}-${titlePart2}`.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link style={{ textDecoration: "none" }} href={`/services/${slug}`}>
      <CardWrapper>
        <CardContainer $rtl={rtl}>
          <BackgroundImage src={imageSrc} alt={`${titlePart1} ${titlePart2}`} />
          <ContentWrapper>
            <ServiceTitle $rtl={rtl}>
              {titlePart1}
              <br />
              <GreenText>{titlePart2}</GreenText>
            </ServiceTitle>
            <ServiceDescription $rtl={rtl}>{description}</ServiceDescription>
            <ActionButton $rtl={rtl}>{buttonText}</ActionButton>
          </ContentWrapper>
        </CardContainer>
      </CardWrapper>
    </Link>
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
  ${(props) => props.$rtl && `direction: rtl;`}

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
  padding-left: ${(props) => (props.$rtl ? "200px" : "134px")};
  padding-right: ${(props) => (props.$rtl ? "-134px" : "0")};
  text-align: ${(props) => (props.$rtl ? "right" : "left")};
  font-size: 28px;
  line-height: 1.2; /* Reduced from 50px */
  padding-left: 134px;
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
  text-align: ${(props) => (props.$rtl ? "right" : "left")};

  font-size: 12px;
  line-height: 1.5; /* Reduced from 39px */
  margin-top: 80px; /* Adjusted margin */
  white-space: pre-line;
  ${CardContainer}:hover & {
    opacity: 0;
  }
`;

const BackgroundImage = styled(Image)`
  position: absolute;
  top: 25px;
  left: 30px;
  width: 117px;
  height: 117px;
  border-radius: 10px;
  object-fit: fill;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);

  transition: all 0.3s ease-in-out;

  ${CardContainer}:hover & {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    object-fit: cover;
    opacity: 0.3;
    border-radius: 10px;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;

  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
`;

const GreenText = styled.span`
  color: rgba(102, 161, 9, 1);
`;

const ActionButton = styled.button`
  margin-right: 60%;
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
    background-color: rgba(82, 141, 0, 1);
  }

  &:focus {
    outline: 2px solid rgba(102, 161, 9, 0.5);
    outline-offset: 2px;
  }

  ${CardContainer}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default ServiceCard;
