"use client";
import * as React from "react";
import styled from "styled-components";

const AboutUsContent = ({ tag, title, description }) => {
  return (
    <Column>
      <ContentWrapper>
        <Tag>{tag}</Tag>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </ContentWrapper>
    </Column>
  );
};

const Column = styled.article`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 50%;
  margin-left: 0px;

  &:nth-child(2) {
    margin-left: 20px;
  }

  @media (max-width: 991px) {
    width: 100%;
    margin-left: 0;

    &:nth-child(2) {
      margin-left: 0;
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: start;
  font-family: Inter, -apple-system, Roboto, Helvetica, sans-serif;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const Tag = styled.span`
  color: rgba(102, 161, 9, 1);
  font-size: 19px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 18.78px;
`;

const Title = styled.h2`
  color: rgb(0, 0, 0);
  font-size: 82px;
  font-family: Acumin Pro Condensed, -apple-system, Roboto, Helvetica,
    sans-serif;
  font-weight: 700;
  line-height: 1;
  margin-top: 25px;

  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

const Description = styled.p`
  color: rgba(108, 108, 108, 1);
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;
  align-self: stretch;
  margin-top: 50px;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

export default AboutUsContent;
