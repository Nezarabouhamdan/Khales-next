"use client";
import React from "react";
import styled from "styled-components";
import CircleDecoration from "./CircleDecoration";

const InfoSection = styled.section`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 35%;
  margin-left: 0px;
height:100%;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const InfoContent = styled.div`
  border-radius: 10px;
  background-color:#545454;
  display: flex;
  margin: 0 auto;
  width: 100%;
  padding: 40px 40px;
  flex-direction: column;
  align-items: start;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const Title = styled.h2`
  color: rgba(255, 255, 255, 1);
  font-size: 28px;
  font-family: 'Inter' ;
  font-weight: 600;
  margin: 0;
`;

const Subtitle = styled.p`
  color: rgba(201, 201, 201, 1);
  font-size: 18px;
  font-family: 'Inter' ;
  font-weight: 400;
  margin: 6px 0 0 0;
`;

const ContactItem = styled.div`
  display: flex;
  margin-top: ${(props) => props.marginTop || "50px"};
  align-items: center;
  gap: 25px;
  font-family: 'Inter' ;
  font-size: 16px;
  color: rgba(255, 255, 255, 1);
  font-weight: 400;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Icon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  flex-shrink: 0;
`;

const ContactInfo = () => {
  return (
    <InfoSection >
      <InfoContent>
        <Title>Contact Information</Title>
        <Subtitle>Say something to start a live chat!</Subtitle>

        <ContactItem marginTop="111px">
          <Icon
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/16efcee12261d35860456522f48970b4da39ef461d25553ee37bea2a565d1633?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8"
            alt="Phone icon"
          />
          <span>+971 55 129 9880
          </span>
        </ContactItem>

        <ContactItem>
          <Icon
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f33a12af71453b99485ac9031fecc220eb9409e1999afd1ffbb8eef1e6b8f8f2?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8"
            alt="Email icon"
          />
          <span>
          info@khales.ae</span>
        </ContactItem>

        <ContactItem>
          <Icon
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a95236edbb272ad63891b22868a195f09637d663fca1420ca3cc4475295718e?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8"
            alt="Location icon"
          />
          <address>
          Office M03, Mezzanine Floor, Building 5, Block B, Dubai Design District, Dubai, UAE
          </address>
        </ContactItem>

        <CircleDecoration />
      </InfoContent>
    </InfoSection>
  );
};

export default ContactInfo;
