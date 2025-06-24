"use client";
import React from "react";
import styled from "styled-components";
import TeamHeader from "./TeamHeader";
import TeamGrid from "./TeamGrid";

const TeamSection = ({
  badgeIcon = "https://cdn.builder.io/api/v1/image/assets/TEMP/9808b1fdab26c42d80845b619d4b9b8e5558344e?placeholderIfAbsent=true&apiKey=934bdeb679ca4a59ae6868dceb8afdbf",
  badgeLabel = "Our team",
  heading = "Meet our team members",
  description = "We Focus on the details of everything we do. All to help businesses around the world\nFocus on what's most important to them.",
  primaryButtonText = "Contact Us",
  secondaryButtonText = "Apply Now",
  primaryButtonIcon = "https://cdn.builder.io/api/v1/image/assets/TEMP/b7be6cc75f7cf4366384a770016353d3445bf152?placeholderIfAbsent=true&apiKey=934bdeb679ca4a59ae6868dceb8afdbf",
  secondaryButtonIcon = "https://cdn.builder.io/api/v1/image/assets/TEMP/3c2d164915d6b1338ca279546286253c917157a1?placeholderIfAbsent=true&apiKey=934bdeb679ca4a59ae6868dceb8afdbf",
  teamMembers = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f49e629b14055c9010413cae60828c4e7327ce30?placeholderIfAbsent=true&apiKey=934bdeb679ca4a59ae6868dceb8afdbf",
      name: "Zane Sorell",
      title: "CEO",
      description: "Enjoys adventurous travel, seeks new cultures and offbeat ",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/910bbe5e7f57806c3d71c64d2bd4fe1d56d8d1a2?placeholderIfAbsent=true&apiKey=934bdeb679ca4a59ae6868dceb8afdbf",
      name: "Maya Mathy",
      title: "Founder",
      description: "Pop music lover, seeks joy and exciting pop concerts",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/095da1a0f738aa6d96aa5636d0eef6fa47a1e2d6?placeholderIfAbsent=true&apiKey=934bdeb679ca4a59ae6868dceb8afdbf",
      name: "Alexis Jensen",
      title: "CTO",
      description: "Bookworm, creative software developer with precision",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/b21042d66cea0be1744acab2f3772f33cfe7ee69?placeholderIfAbsent=true&apiKey=934bdeb679ca4a59ae6868dceb8afdbf",
      name: "Keira Battye",
      title: "Product Designer",
      description: "Creative painter capturing beauty with imaginative artwork",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e6eb520808c2d0201743d152f3f2e06114cac177?placeholderIfAbsent=true&apiKey=934bdeb679ca4a59ae6868dceb8afdbf",
      name: "Dominic Game",
      title: "3D Artist",
      description: "Football enthusiast, enjoys movie nights with friends",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/9a5f87a877e91f099784e033fbbbd53b70e0ef9f?placeholderIfAbsent=true&apiKey=934bdeb679ca4a59ae6868dceb8afdbf",
      name: "James Vial",
      title: "Head of Front-End",
      description:
        "Culinary artist, explores diverse flavors, skilled in cooking",
    },
  ],
  onPrimaryClick,
  onSecondaryClick,
}) => {
  return (
    <TeamSectionContainer>
      <TeamHeader
        badgeIcon={badgeIcon}
        badgeLabel={badgeLabel}
        heading={heading}
        description={description}
        primaryButtonText={primaryButtonText}
        secondaryButtonText={secondaryButtonText}
        primaryButtonIcon={primaryButtonIcon}
        secondaryButtonIcon={secondaryButtonIcon}
        onPrimaryClick={onPrimaryClick}
        onSecondaryClick={onSecondaryClick}
      />
      <TeamGrid teamMembers={teamMembers} />
    </TeamSectionContainer>
  );
};

const TeamSectionContainer = styled.section`
  justify-content: center;
  align-items: stretch;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family:
    Inter,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  padding: 64px 248px;
  gap: 120px;
  background-color: #fff;
  @media (max-width: 991px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export default TeamSection;
