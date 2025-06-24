"use client";
import styled from "styled-components";

const SectionHeader = ({ children, className }) => {
  return (
    <HeaderContainer className={className}>
      <MainHeading>{children}</MainHeading>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  align-items: flex-start;
`;

const MainHeading = styled.h1`
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
  margin: 0;

  @media (max-width: 991px) {
    font-size: 40px;
    line-height: 45px;
  }
`;

export default SectionHeader;
