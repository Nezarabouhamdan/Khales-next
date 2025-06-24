"use client";
import React from "react";
import styled from "styled-components";

const MissionVisionHeader = ({ title = "Mission & Vision" }) => {
  return <HeaderTitle>{title}</HeaderTitle>;
};

const HeaderTitle = styled.h1`
  color: #000;
  font-family:
    Manrope,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 128px;
  font-weight: 800;
  line-height: 128px;
  letter-spacing: -1.41px;
  align-self: start;
  margin: 0;
  @media (max-width: 991px) {
    max-width: 100%;
    font-size: 40px;
    line-height: 45px;
  }
`;

export default MissionVisionHeader;
