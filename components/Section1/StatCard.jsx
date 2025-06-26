"use client";
import React from "react";
import styled from "styled-components";

const StatCard = ({
  number,
  title,
  description,
  backgroundColor = "rgba(0, 0, 0, 1)",
}) => {
  return (
    <CardColumn>
      <CardContainer backgroundColor={backgroundColor}>
        <StatNumber>{number}</StatNumber>
        <StatTitle>{title}</StatTitle>
        <StatDescription>{description}</StatDescription>
      </CardContainer>
    </CardColumn>
  );
};

const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 33%;
  margin-left: 0px;
  &:not(:first-child) {
  }

  @media (max-width: 991px) {
    width: 100%;
    margin-left: 0px;

    &:not(:first-child) {
      margin-top: 40px;
    }
  }
`;

const CardContainer = styled.article`
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  border-radius: 8px;

  flex-grow: 1;
  padding: 32px 31px 11px 31px;
  flex-direction: column;
  align-items: flex-start;
  color: #fff;
  width: 100%;

  &:first-child {
    padding: 22px 31px;
  }

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 32px 20px 11px 20px;

    &:first-child {
      padding: 22px 20px;
    }
  }
`;

const StatNumber = styled.h2`
  color: #fff;
  font-size: 40px;
  font-weight: 600;
  line-height: 1.3;
  margin: 0;

  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

const StatTitle = styled.h3`
  color: #fff;
  font-size: 25px;
  font-weight: 700;
  line-height: 1.1;
  margin: 7px 0 0 0;
`;

const StatDescription = styled.p`
  color: #fff;
  font-size: 18px;
  font-weight: 300;
  line-height: 38px;
  align-self: stretch;
  margin: 17px 0 0 0;
`;

export default StatCard;
