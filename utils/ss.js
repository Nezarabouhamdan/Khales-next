import React from "react";
import styled, { keyframes } from "styled-components";
import icon from "./assets/Khales Logo K - favicon.png";
import { Column } from "./Globalstyles";
import { GreenText, Title } from "./components/Whoweare/TextContent";
// Keyframes for rotating animation
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Container for the entire section
const Section = styled.section`
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  align-items: space-evenly;
  padding: 160px 0;
  background-color: rgb(255, 255, 255);
`;

// Flex container for layout
const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

// Rotating text container
export const RotateBox = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin-bottom: 20px;
`;

// Rotating SVG text
export const RotatingText = styled.svg`
  width: 100%;
  height: 100%;
  animation: ${rotate} 20s linear infinite;
`;

// Static icon inside rotating text
export const Icon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  transform: translate(-50%, -50%);
`;

// Information text
const InfoText = styled.div`
  width: 30%;
  margin: 20px;
  font-size: 1.25rem;
  font-weight: 400;
  color: #000;
  line-height: 180%;
  @media (max-width: 991px) {
    width: 80%;

    font-size: 1rem;
  }
`;

// Statistics container
const Numbers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 70px;
`;

// Individual statistic card
const NumberCard = styled.div`
  text-align: center;
`;

// Statistic number
const Number = styled.h2`
  font-size: 2rem;
  color: #66a109; /* Primary color */
`;

// Statistic description
const Description = styled.small`
  font-size: 1rem;
  color: #6c757d;
`;

const AboutSection = () => {
  return (
    <Section>
      <Column>
        <Title style={{ marginBottom: "50px" }}>
          Our <GreenText>&nbsp;Story</GreenText>
        </Title>
        <Container>
          <RotateBox>
            <RotatingText viewBox="0 0 500 500">
              <defs>
                <path
                  id="textcircle"
                  d="M250,400 a150,150 0 1,1 0,-300 a150,150 0 1,1 0,300"
                />
              </defs>
              <text style={{ fontSize: "35px" }}>
                <textPath href="#textcircle" textLength="900">
                  Landscape design - Khales -
                </textPath>
              </text>
            </RotatingText>
            <Icon src={icon} alt="Leaf Icon" />
          </RotateBox>
          <InfoText>
            <p>
              Khales is a landscape design and construction firm based in
              Portland, Oregon that creates residential outdoor living spaces
              and gardens. We strive to create meaningful spaces that fulfill
              our clients' visions and function great for years to come.
            </p>
            <p>
              Our mission is to bring a balance of healthy, beautiful living
              spaces to our clients.
            </p>
          </InfoText>
          <Numbers>
            <NumberCard>
              <Number>100%</Number>
              <Description>Clients Satisfied and Repeating</Description>
            </NumberCard>
            <NumberCard>
              <Number>125</Number>
              <Description>Projects Done</Description>
            </NumberCard>
          </Numbers>
        </Container>
      </Column>
    </Section>
  );
};

export default AboutSection;
