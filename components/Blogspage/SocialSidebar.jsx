"use client";
import React from "react";
import styled from "styled-components";
import SocialIcon from "./SocialIcon";

const SocialSidebar = () => {
  const socialIcons = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e9ebab5ab95c4e82344bf38ecf9d27394bd852e0?placeholderIfAbsent=true&apiKey=934bdeb679ca4a59ae6868dceb8afdbf",
      count: "10",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/75e2f5a617ac8cafcd15f236b3ce3ccbfaefa695?placeholderIfAbsent=true&apiKey=934bdeb679ca4a59ae6868dceb8afdbf",
      count: "69k",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e0be31bed2138cf7cd2820212d447bfa8b8d210f?placeholderIfAbsent=true&apiKey=934bdeb679ca4a59ae6868dceb8afdbf",
      count: "45",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7f58655be2f2217bcf1dc7da74d3530abeb9ebeb?placeholderIfAbsent=true&apiKey=934bdeb679ca4a59ae6868dceb8afdbf",
      count: "69k",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9142d4b0497072ab8df359d5a5fa50d14914ce41?placeholderIfAbsent=true&apiKey=934bdeb679ca4a59ae6868dceb8afdbf",
      count: "69k",
    },
  ];

  return (
    <SidebarContainer>
      <SidebarContent>
        <SidebarTitle>Follow Us</SidebarTitle>
        <SocialIconsContainer>
          {socialIcons.map((social, index) => (
            <SocialIcon
              key={index}
              iconSrc={social.icon}
              count={social.count}
            />
          ))}
        </SocialIconsContainer>
      </SidebarContent>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.aside`
  color: rgba(18, 20, 22, 1);
  font-weight: 400;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const SidebarContent = styled.div``;

const SidebarTitle = styled.h3`
  font-size: 25px;
  font-family:
    EuropaNuova-Bold,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  line-height: 1;
`;

const SocialIconsContainer = styled.div`
  display: flex;
  margin-top: 40px;
  align-items: start;
  gap: 40px 49px;
  font-family:
    Europa-Regular,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 16px;
  white-space: nowrap;
  line-height: 1;
  justify-content: start;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

export default SocialSidebar;
