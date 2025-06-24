"use client";
import React from "react";
import styled from "styled-components";

const Badge = ({ icon, label }) => {
  return (
    <BadgeContainer>
      <BadgeIcon src={icon} alt="" />
      <BadgeLabel>{label}</BadgeLabel>
    </BadgeContainer>
  );
};

const BadgeContainer = styled.div`
  align-items: center;
  border-radius: 6px;
  align-self: center;
  display: flex;
  min-height: 24px;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 2px;
  padding-bottom: 2px;
  gap: 4px;
  font-size: 12px;
  color: #66a109;
  font-weight: 500;
  line-height: 2;
  justify-content: start;
  background-color: rgba(118, 118, 128, 0.12);
`;

const BadgeIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 16px;
  align-self: stretch;
  margin-top: auto;
  margin-bottom: auto;
  flex-shrink: 0;
`;

const BadgeLabel = styled.span`
  align-self: stretch;
  margin-top: auto;
  margin-bottom: auto;
`;

export default Badge;
