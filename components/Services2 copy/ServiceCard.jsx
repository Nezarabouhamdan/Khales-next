"use client";
import * as React from "react";
import styled from "styled-components";

// ServiceCard.js (Fixed Height Version)
export const ServiceCard = ({
  imageSrc,
  titlePart1,
  titlePart2,
  description,
  buttonText = "Learn More",
  rtl = false,
  link,
  height = "350px", // default fixed height
}) => {
  return (
    <a
      style={{ textDecoration: "none" }}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <CardWrapper height={height}>
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
  height: ${({ height }) => height};
  font-family: Inter, -apple-system, Roboto, Helvetica, sans-serif;
  color: rgba(0, 0, 0, 1);
  font-weight: 400;
  width: 400px;
  height: 200px;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

const CardContainer = styled.article`
  ${({ rtl }) => rtl && `direction: rtl;`}

  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(230, 229, 229, 0.58);
  padding: 15px 20px 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ServiceTitle = styled.h2`
  font-size: 24px;
  line-height: 1.2;
  margin: 0 0 8px;
  transition: all 0.3s ease-in-out;
  @media (max-width: 991px) {
    font-size: 15px;
    margin-top: 30px;
  }
  ${CardContainer}:hover & {
    padding-left: 0;
  }
`;

const ServiceDescription = styled.p`
  text-align: center;
  color: #838383;
  font-size: 12px;
  line-height: 1.4;
  margin-top: 20px;
  white-space: pre-line;
  ${CardContainer}:hover & {
    opacity: 0;
  }
`;

const ContentWrapper = styled.div`
  text-align: center;
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GreenText = styled.span`
  color: rgba(102, 161, 9, 1);
`;

const ActionButton = styled.button`
  background-color: rgba(102, 161, 9, 1);
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease-in-out;
  position: absolute;
  bottom: 10px;
  right: 120px;

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
