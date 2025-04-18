"use client";
import * as React from "react";
import styled from "styled-components";

const ContentWrapper = styled.article`
  flex: 1;
`;

const Title = styled.h2`
  color: ${(props) => props.color || "#d5d7d4"};
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 16px;
  @media (max-width: 991px) {
    font-size: 28px;
  }
  @media (max-width: 640px) {
    font-size: 24px;
  }
`;

const Description = styled.p`
  color: #d5d7d4;
  font-size: 16px;
  line-height: 1.6;
  @media (max-width: 991px) {
    font-size: 15px;
  }
  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

const ContentBlock = ({ title, description, titleColor }) => {
  return (
    <ContentWrapper>
      <Title color={titleColor}>{title}</Title>
      <Description>{description}</Description>
    </ContentWrapper>
  );
};

export default ContentBlock;
