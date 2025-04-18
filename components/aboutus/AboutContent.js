"use client";
import * as React from "react";
import styled from "styled-components";
import { AboutHeading } from "./AboutHeading";

export const AboutContent = () => {
  return (
    <ContentWrapper>
      <ContentContainer>
        <AboutHeading />
        <Description>
          Type somethingSed imperdiet enim ligula, vitae viverra justo porta
          vel. Duis eget felis bibendum, pretium mi sed, placerat ante. Vivamus
          sit amet interdum elit. Proin lacinia erat ac velit tempus auctor.
          Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam
          nec ex aliquet, aliquam neque non, gravida est.
        </Description>
      </ContentContainer>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  border-radius:10px;

  background-color: #66a109;
  border: 1px solid rgba(151, 151, 151, 1);
  display: flex;
  margin-top: auto;
  margin-right: -150px;
  margin-bottom: auto;
  padding: 151px 80px;
  flex-direction: column;
  align-self: stretch;
  align-items: center;
  font-family: Lato, -apple-system, Roboto, Helvetica, sans-serif;
  color: rgba(255, 255, 255, 1);
  justify-content: center;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
    padding: 100px 20px;
  }
`;

const ContentContainer = styled.div`
  width: 864px;
  max-width: 80%;
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 52px;
  margin: 80px 0 32px -2px;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;
