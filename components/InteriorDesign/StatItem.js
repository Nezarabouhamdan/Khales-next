import styled from "styled-components";



export const StatItem = ({ number, label }) => {
  return (
    <StyledStatItem>
      <StatNumber>{number}</StatNumber>
      <StatLabel>{label}</StatLabel>
    </StyledStatItem>
  );
};

const StyledStatItem = styled.article`
  text-align: center;
  color: #545454;
  font-family: "Inter", sans-serif;
`;

const StatNumber = styled.h3`
  font-size: 50px;
  font-weight: 400;
  margin: 0;
  @media (max-width: 640px) {
    font-size: 50px;
  }
`;

const StatLabel = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  @media (max-width: 640px) {
    font-size: 18px;
  }
`;
