import Image from "next/image";
import React from "react";
import styled from "styled-components";

const CardHeader = ({ coverImage }) => {
  return (
    <Header>
      <CoverImage src={coverImage} alt="Article cover" fill sizes="100vw" />
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
  position: absolute !important;
  inset: 0;
  object-fit: cover;

  object-position: center;
`;

export default CardHeader;
