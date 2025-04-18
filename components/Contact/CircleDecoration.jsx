"use client";
import React from "react";
import styled from "styled-components";

const CircleContainer = styled.div`
  background-color: rgba(26, 26, 26, 1);
  border-radius: 50%;
  align-self: flex-end;
  display: flex;
  margin-top: 42px;
  width: 182px;
  height: 182px;
  position: relative;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const InnerCircle = styled.div`
  background-color: rgba(72, 72, 72, 0.5);
  border-radius: 50%;
  position: absolute;
  top: -26px;
  left: 0;
  width: 138px;
  height: 138px;
`;

const CircleDecoration = () => (
  <CircleContainer>
    <InnerCircle />
  </CircleContainer>
);

export default CircleDecoration;
