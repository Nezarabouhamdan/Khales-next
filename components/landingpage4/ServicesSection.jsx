"use client";
import * as React from "react";
import styled from "styled-components";
import Link from "next/link";

function ServicesSection() {
  return (
    <section>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap"
        rel="stylesheet"
      />
      <ServicesContainer>
        <SectionTitle>Our Services</SectionTitle>
        <ServiceGrid>
          <ServiceCard>
            <ServiceImage
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/34484668e2e24628af8fec2890be431f8fa32d54?placeholderIfAbsent=true"
              alt="Project Management Service"
            />
            <ServiceName>Project Management</ServiceName>
          </ServiceCard>
          <ServiceCard>
            <ServiceImage
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d95cdabff8134c164b00ea4eb98ed32e92cda3d5?placeholderIfAbsent=true"
              alt="Development Planning Service"
            />
            <ServiceName>Development Planning</ServiceName>
          </ServiceCard>
          <ServiceCard>
            <ServiceImage
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a278cb1fdbeb0c2a7ffad5ef2bdc67d4e57b9b2e?placeholderIfAbsent=true"
              alt="Interior Design Service"
            />
            <ServiceName>Interior Design</ServiceName>
          </ServiceCard>
        </ServiceGrid>
        <Buttoncontainer>
          <StyledButton href={"/"}>Start your Project</StyledButton>
        </Buttoncontainer>
      </ServicesContainer>
    </section>
  );
}
export const StyledButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: center;
  z-index: 1;
  border-radius: 5px;
  background-color: rgba(92, 145, 8, 1);
  padding: 11px 25px;
  font-size: 18px;
  color: rgb(0, 0, 0);
  letter-spacing: 0.36px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-decoration: none;
  &:hover {
    background-color: #545454;
  }

  &:focus {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  @media (max-width: 991px) {
    width: 230px;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const Buttoncontainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-top: 50px;
  @media (max-width: 991px) {
    flex-direction: COLUMN;
  }
`;

const SectionTitle = styled.h2`
  color: #fff;
  font-family: "Playfair", sans-serif;
  font-size: 30px;
  margin-bottom: 30px;
`;

const ServiceName = styled.h3`
  color: #fff;
  font-family: "Playfair", sans-serif;
  font-size: 20px;
  text-align: center;
  margin: 0;
`;

const CTAButtonWrapper = styled.div`
  position: relative;
  width: 199px;
  height: 60px;
  margin-top: 30px;
  cursor: pointer;

  @media (max-width: 991px) {
    margin-top: 20px;
  }

  @media (max-width: 640px) {
    margin-top: 20px;
  }
`;

const CTAButtonBackground = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #66a109;
`;

const CTAButtonText = styled.button`
  position: absolute;
  top: 19px;
  left: 24px;
  width: 150px;
  height: 22px;
  color: #262524;
  text-align: center;
  font-family: "Inter", sans-serif;
  font-size: 18px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: 2px solid #fff;
    border-radius: 4px;
  }
`;

export default ServicesSection;
const ServicesContainer = styled.div`
  width: 100vw; /* Full viewport width */
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #292928;
  box-sizing: border-box;
  overflow: hidden; /* Prevent any potential overflow */

  @media (max-width: 991px) {
    padding: 30px 20px;
  }
`;

const ServiceGrid = styled.div`
  display: flex;
  justify-content: center; /* Changed from space-evenly */
  width: 100%;
  max-width: 1200px; /* Constrain content width */
  padding: 0 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  gap: 20px; /* Added gap control */

  @media (max-width: 991px) {
    padding: 0 20px;
    gap: 30px;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    padding: 0;
    gap: 40px;
  }
`;

const ServiceCard = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(33.33% - 40px); /* Account for gap */
  min-width: 200px;
  box-sizing: border-box;

  @media (max-width: 991px) {
    width: calc(50% - 30px); /* Two columns */
  }

  @media (max-width: 640px) {
    width: 100%;
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
const ServiceImage = styled.img`
  width: 100%;
  max-width: 199px; /* Maximum size but can shrink */
  height: auto;
  aspect-ratio: 199/288; /* Maintain original aspect ratio */
  border-radius: 150px;
  margin-bottom: 20px;
  object-fit: cover;
`;
