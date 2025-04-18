"use client";
import React from "react";
import styled from "styled-components";

const Timeline = () => {
  return (
    <TimelineContainer>
      <Circle>
        <Icon className="ti ti-rocket" />
      </Circle>
      <Line />
      <Circle>
        <Icon className="ti ti-tool" />
      </Circle>
      <Line />
      <Circle>
        <Icon className="ti ti-check" />
      </Circle>
    </TimelineContainer>
  );
};

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Circle = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: #66a109;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 640px) {
    width: 60px;
    height: 60px;
  }
`;

const Icon = styled.i`
  color: white;
  font-size: 24px;
`;

const Line = styled.div`
  width: 1px;
  height: 102px;
  background-color: #9b9b9b;
  margin: 32px 0;
  @media (max-width: 640px) {
    height: 80px;
  }
`;

export default Timeline;
