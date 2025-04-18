"use client";
import * as React from "react";
import styled from "styled-components";

const HeroContent = () => {
  return (
    <ContentSection>
      <HelloSection>
        <HelloText>Hello There</HelloText>
        <Divider role="presentation" />
      </HelloSection>
      <MainTitle>We Work Professionally And Wholeheartedly</MainTitle>
      <MainDescription>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing dui
        tellus commodo convallis. Auctor eget orci pharetra non. Integer lorem
        in scelerisque tortor dui tempor, volutpat viverra faucibus. Sagittis
        maecenas tincidunt at purus. Amet non vel elit aliquet id dolor risus
        imperdiet vitae. Amet, sagittis mauris morbi erat velit id nullam. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing dui tellus
        commodo convallis.
      </MainDescription>
    </ContentSection>
  );
};

const ContentSection = styled.section`
  margin-left: 77px;
  padding-top: 50px;
  margin-right: -3px;

  @media (max-width: 991px) {
    padding-top: 30px;
    text-align: center;
  }
`;

const HelloSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const HelloText = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #000;
  letter-spacing: 0.36px;
  text-transform: capitalize;
  margin: 0;
`;

const Divider = styled.div`
  width: 80px;
  height: 2px;
  background-color: #000;
`;

const MainTitle = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 40px;
  font-weight: 700;
  line-height: 54px;
  letter-spacing: 0.8px;
  color: #000;
  text-transform: capitalize;
  margin-bottom: 35px;
  max-width: 548px;

  @media (max-width: 640px) {
    font-size: 32px;
    line-height: 42px;
  }
`;

const MainDescription = styled.p`
  font-family: "Inter",  sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: #3d3d3d;
  max-width: 533px;
  margin: 0;
`;

export default HeroContent;
