"use client";
import React from "react";
import styled from "styled-components";

const TeamCard = ({ image, name, title, description }) => {
  return (
    <TeamCardContainer>
      <MemberImage src={image} alt={`${name} - ${title}`} />
      <TeamContent>
        <MemberInfo>
          <MemberName>{name}</MemberName>
          <MemberTitle>{title}</MemberTitle>
        </MemberInfo>
        <MemberDescription>{description}</MemberDescription>
      </TeamContent>
    </TeamCardContainer>
  );
};

const TeamCardContainer = styled.article`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: start;
  flex-grow: 1;
  flex-shrink: 1;
  width: 179px;
  gap: 32px;
  min-height: 307px;
  margin-top: auto;
  margin-bottom: auto;
`;

const MemberImage = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 104px;
  max-width: 100%;
`;

const TeamContent = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  max-width: 100%;
  width: 224px;
  flex-direction: column;
  gap: 16px;
  text-align: center;
`;

const MemberInfo = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: start;
  gap: 8px;
`;

const MemberName = styled.h3`
  color: #19191b;
  font-size: 18px;
  font-weight: 700;
  line-height: 2;
  margin: 0;
`;

const MemberTitle = styled.p`
  color: #66a109;
  font-size: 14px;
  font-weight: 500;
  line-height: 2;
  margin: 0;
`;

const MemberDescription = styled.p`
  color: #787a82;
  font-size: 14px;
  font-weight: 400;
  line-height: 25px;
  margin: 0;
`;

export default TeamCard;
