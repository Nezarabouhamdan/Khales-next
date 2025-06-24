"use client";
import React from "react";
import styled from "styled-components";
import TeamCard from "./TeamCard";

const TeamGrid = ({ teamMembers }) => {
  return (
    <GridContainer>
      {teamMembers.map((member, index) => (
        <TeamCardWrapper key={index}>
          <TeamCard
            image={member.image}
            name={member.name}
            title={member.title}
            description={member.description}
          />
        </TeamCardWrapper>
      ))}
    </GridContainer>
  );
};

const GridContainer = styled.div`
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  align-self: center;
  display: flex;
  margin-top: 120px;
  min-height: 680px;
  width: 1144px;
  max-width: 100%;
  gap: 32px 16px;
  text-align: center;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const TeamCardWrapper = styled.div`
  align-self: stretch;
  margin-top: auto;
  margin-bottom: auto;
  padding-bottom: 32px;
  flex-grow: 1;
  flex-shrink: 1;
  width: 179px;
`;

export default TeamGrid;
