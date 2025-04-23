"use client";
import * as React from "react";
import styled from "styled-components";

const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: Inter, -apple-system, Roboto, Helvetica, sans-serif;
  font-size: 15px;
  color: rgba(0, 0, 0, 1);
  font-weight: 400;
  text-align: center;
  transition: transform 0.3s ease;
  width: 100%;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const PropertyImage = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 300px;
  border-radius: 25px;
  transition: all 0.3s ease;
`;

const PropertyTitle = styled.h2`
  align-self: center;
  font-family: "Playfair";

  margin-top: 23px;
  font-size: 20px;
  font-weight: 400;
`;

const PropertyCard = ({ imageSrc, title }) => {
  return (
    <Card>
      <PropertyImage src={imageSrc} alt={`${title} property`} />
      <PropertyTitle>{title}</PropertyTitle>
    </Card>
  );
};

export default PropertyCard;
