"use client";
import * as React from "react";
import styled from "styled-components";


const FeatureCard1 = ({
  icon,
  title,
  description,
}) => {
  return (
    <CardWrapper>
      <CardIcon loading="lazy" src={icon} alt="" />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </CardWrapper>
  );
};

const CardWrapper = styled.article`
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 20px;
  justify-content: flex-start;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const CardIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 55px;
  flex-shrink: 0;
  @media (max-width: 1025px) {
  width: 35px;
  }

`;

const CardContent = styled.div`
  min-width: 240px;
  width: 795px;
   @media (max-width: 1025px) {
  width: 795px;
  }
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const CardTitle = styled.h3`
  color: #141414;
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
  margin: 0;
     @media (max-width: 1025px) {
  font-size: 15px;
  }
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const CardDescription = styled.p`
  color: #757575;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  margin: 4px 0 0;
    @media (max-width: 1025px) {
  font-size: 10px;

  }
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export default FeatureCard1;
