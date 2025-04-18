import Image from "next/image";
import React from "react";
import styled from "styled-components";

const CardHeader = ({ coverImage, avatarImage, isRTL = false }) => {
  return (
    <Header>
      <CoverImage src={coverImage} alt="Article cover" />
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 280px;
  width: 100%;
  font-family: "Playfair";
  font-size: 20px;
  color: #ffffff;
  font-weight: 700;

  @media (max-width: 991px) {
    min-height: 200px;
  }
`;

const CoverImage = styled(Image)`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const TagContainer = styled.div`
  display: flex;
  align-items: start;
  gap: 4px;
  position: absolute;
  bottom: 60px;
  ${(props) => (props.$isRTL ? "right" : "left")}: 10px;
  flex-direction: ${(props) => (props.$isRTL ? "row-reverse" : "row")};
`;

const Tag = styled.span`
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 8px 10px;
  white-space: nowrap;
  cursor: pointer;
  font-family: ${(props) => props.$isRTL ? "'Tajawal', sans-serif" : "'Playfair', serif"};

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 991px) {
    white-space: initial;
    font-size: 14px;
    padding: 6px 8px;
  }
`;

const AuthorAvatar = styled.img`
  position: absolute;
  bottom: 10px;
  ${(props) => (props.$isRTL ? "right" : "left")}: 10px;
  aspect-ratio: 1;
  object-fit: cover;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid white;
`;

export default CardHeader;
