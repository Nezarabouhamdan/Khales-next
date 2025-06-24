"use client";
import React from "react";
import styled from "styled-components";
import Badge from "./Badge";
import Button from "./Button";

const TeamHeader = ({
  badgeIcon,
  badgeLabel,
  heading,
  description,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonIcon,
  secondaryButtonIcon,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  return (
    <HeaderContainer>
      <Badge icon={badgeIcon} label={badgeLabel} />
      <ContentContainer>
        <TextContent>
          <MainHeading>{heading}</MainHeading>
          <Description>{description}</Description>
          <ButtonGroup>
            <Button
              variant="secondary"
              icon={secondaryButtonIcon}
              onClick={onSecondaryClick}
            >
              {secondaryButtonText}
            </Button>
            <Button
              variant="primary"
              icon={primaryButtonIcon}
              onClick={onPrimaryClick}
            >
              {primaryButtonText}
            </Button>
          </ButtonGroup>
        </TextContent>
      </ContentContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  justify-content: center;
  align-items: stretch;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const ContentContainer = styled.div`
  justify-content: center;
  align-items: stretch;
  display: flex;
  margin-top: 16px;
  width: 100%;
  flex-direction: column;
  gap: 24px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const TextContent = styled.div`
  justify-content: center;
  align-items: stretch;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const MainHeading = styled.h1`
  color: #19191b;
  text-align: center;
  font-size: 48px;
  font-weight: 700;
  margin: 0;
  @media (max-width: 991px) {
    max-width: 100%;
    font-size: 40px;
  }
`;

const Description = styled.p`
  color: #5a5c62;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
  margin: 16px 0 0 0;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const ButtonGroup = styled.div`
  align-items: start;
  align-self: center;
  display: flex;
  margin-top: 16px;
  gap: 16px;
  justify-content: start;
`;

export default TeamHeader;
