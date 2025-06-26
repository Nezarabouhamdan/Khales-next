"use client";
import React from "react";
import styled from "styled-components";

const ServiceCard = ({ icon, title, description, backgroundColor }) => {
  return (
    <CardContainer backgroundColor={backgroundColor}>
      <CardContent>
        <IconColumn>
          <ServiceIcon src={icon} alt={`${title} icon`} />
        </IconColumn>
        <ContentColumn>
          <CardDetails>
            <ServiceTitle>{title}</ServiceTitle>
            <ServiceDescription>{description}</ServiceDescription>
          </CardDetails>
        </ContentColumn>
      </CardContent>
    </CardContainer>
  );
};

const CardContainer = styled.article`
  background-color: ${(props) => props.backgroundColor};
  margin-top: 30px;
  max-width: 100%;
  border-radius: 8px;
  padding: 41px 80px 41px 36px;
  @media (max-width: 991px) {
    padding: 41px 20px;
  }

  &:first-of-type {
    margin-top: 24px;
  }
`;

const CardContent = styled.div`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const IconColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 16%;
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const ServiceIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 91px;
  margin-top: auto;
  margin-bottom: auto;
  flex-shrink: 0;
  align-self: stretch;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 84%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const CardDetails = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: stretch;
  font-family: Be Vietnam, -apple-system, Roboto, Helvetica, sans-serif;
  color: rgba(255, 255, 255, 1);
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const ServiceTitle = styled.h3`
  transform: rotate(0.0017264287877476686rad);
  font-size: 30px;
  font-weight: 800;
  line-height: 1.1;
  align-self: start;
  margin: 0;
`;

const ServiceDescription = styled.p`
  font-size: 18px;
  font-weight: 300;
  line-height: 30px;
  margin-top: 25px;
  margin-bottom: 0;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export default ServiceCard;
