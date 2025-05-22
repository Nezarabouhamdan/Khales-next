import React from "react";
import styled from "styled-components";

const SocialIcon = ({ iconSrc, count }) => {
  return (
    <IconContainer>
      <IconImage src={iconSrc} alt="Social media icon" />
      <IconCount>{count}</IconCount>
    </IconContainer>
  );
};

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 28px;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const IconImage = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 28px;
`;

const IconCount = styled.div`
  margin-top: 16px;
`;

export default SocialIcon;
