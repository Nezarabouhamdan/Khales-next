"use client";
import * as React from "react";
import styled from "styled-components";
import PropertyCard from "./PropertyCard";

const Container = styled.section`
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  padding: 123px 70px;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  justify-content: center;

  @media (max-width: 991px) {
    padding: 100px 20px;
  }
`;

const GridWrapper = styled.div`
  width: 100%;
  max-width: 100%;
`;

const Grid = styled.div`
  gap: 20px;
  display: flex;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 33%;
  margin-left: ${(props) => (props.$first ? "0" : "20px")};

  @media (max-width: 991px) {
    width: 100%;
    margin-left: 0;
  }
`;

const PropertyListings = () => {
  const properties = [
    {
      id: 1,
      title: "Palm Jumeirah Villa",
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e8f3ecd0d215aa3d6ae13ab3c631ed34b6fc86a2?placeholderIfAbsent=true&apiKey=68955489568e4e37916091f08b0f16db",
    },
    {
      id: 2,
      title: "Downtown Dubai Office",
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1e02bc398a346ddcb6ba6030184a8880d6468946?placeholderIfAbsent=true&apiKey=68955489568e4e37916091f08b0f16db",
    },
    {
      id: 3,
      title: "Residential Tower Abu Dhabi",
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/901f2db54b33324ed966d7f92a2e7f35f32696a1?placeholderIfAbsent=true&apiKey=68955489568e4e37916091f08b0f16db",
    },
  ];

  return (
    <Container role="region" aria-label="Property Listings">
      <GridWrapper>
        {" "}
        <div style={{ marginBottom: "100px", fontSize: "30px" }}>
          {" "}
          Our Masterpieces
        </div>
        <Grid>
          {properties.map((property, index) => (
            <Column key={property.id} $first={index === 0}>
              <PropertyCard
                imageSrc={property.imageSrc}
                title={property.title}
              />
            </Column>
          ))}
        </Grid>
      </GridWrapper>
    </Container>
  );
};

export default PropertyListings;
