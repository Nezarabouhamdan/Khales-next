"use client";
import React from "react";
import styled from "styled-components";
import { StyledButton } from "../Homecontact/CTAButton";

const Left = styled.div`
  width: 48vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 3rem;
  @media (max-width: 991px) {
    width: 90vw;
  }
`;
const Right = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  width: 48vw;
  @media (max-width: 991px) {
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: flex-start;
    width: 100vw;
    margin-left: 20px;
  }
`;
const Longimg = styled.img`
  height: 50vh;
  width: 40%;
  border-radius: 15px;
  @media (max-width: 991px) {
    height: 24vh;
    width: 50%;
    border-radius: 15px;
  }
`;
const Shortimg = styled.img`
  height: 24vh;
  width: 100%;
  border-radius: 15px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
`;
const Heading = styled.p`
  font-size: 50px;
  margin-left: 100px;
  line-height: 1.3;
  color: #30302e;
  font-weight: light;
  @media (max-width: 991px) {
    font-size: 40px;

    margin-left: 20px;
  }
`;
const SubHeading = styled.h2`
  font-size: 25px;
  margin-left: 100px;
  color: #545454;
  @media (max-width: 991px) {
    font-size: 20px;

    margin-left: 20px;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 100%;
  margin-top: 150px;
  margin-bottom: 50px;
  gap: 2rem;
  @media (max-width: 991px) {
    flex-direction: COLUMN;
  }
`;
const Buttoncontainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-left: 100px;
  width: 40%;
  @media (max-width: 991px) {
    flex-direction: COLUMN;
    margin-left: 20px;
  }
`;
function LandingPage1() {
  return (
    <Container>
      <Left>
        {" "}
        <Heading>
          Designing Dreams.<br></br> Building Realities.
        </Heading>
        <SubHeading>
          From visionary concepts to flawless execution—luxury villas,
          commercial spaces, or large-scale developments.
        </SubHeading>{" "}
        <SubHeading>Book Your Consultation on WhatsApp</SubHeading>
        <Buttoncontainer>
          <StyledButton
            href="https://api.whatsapp.com/send?phone=+971551299880&text=Hi Khales Team! 👋

I’m interested in your [Project Management / Development Planning / Interior Design] services.

Could you please provide more details and help me get started?"
          >
            Message Us
          </StyledButton>
        </Buttoncontainer>
      </Left>
      <Right>
        <Longimg src="../assets/cube/4fa612ff-f5df-45ff-a473-d38cef3d2b17.jpeg"></Longimg>{" "}
        <Column>
          <Shortimg src="../assets/cube/4fa612ff-f5df-45ff-a473-d38cef3d2b17.jpeg"></Shortimg>
          <Shortimg src="../assets/cube/4fa612ff-f5df-45ff-a473-d38cef3d2b17.jpeg"></Shortimg>
        </Column>
      </Right>
    </Container>
  );
}

export default LandingPage1;
