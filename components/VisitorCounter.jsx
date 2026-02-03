"use client";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaUsers, FaChartLine } from "react-icons/fa";

// --- Styled Components ---

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const Wrapper = styled.div`
  position: relative;
  padding: 3rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const DecorativeShape = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  z-index: 0;
  opacity: 0.4;
`;

const Shape1 = styled(DecorativeShape)`
  width: 160px;
  height: 160px;
  background: #66a109; /* Brand Green */
  top: 5%;
  right: 15%;
  animation: ${float} 6s ease-in-out infinite;
`;

const Shape2 = styled(DecorativeShape)`
  width: 140px;
  height: 140px;
  background: #1a1a1a; /* Dark Accent */
  bottom: 5%;
  left: 15%;
  animation: ${float} 8s ease-in-out infinite reverse;
`;

const Card = styled.div`
  position: relative;
  z-index: 2;
  background: #ffffff;
  border-radius: 20px;
  padding: 2rem 3rem;
  display: flex;
  align-items: center;
  gap: 3rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    width: 100%;
    max-width: 380px;
  }
`;

const StatGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  flex-shrink: 0;

  /* Variant styling */
  background-color: ${(props) =>
    props.$variant === "green" ? "#eaf7e0" : "#f0f4f8"};
  color: ${(props) => (props.$variant === "green" ? "#66a109" : "#3b82f6")};
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 0.25rem;
`;

const Value = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  line-height: 1;
`;

const Divider = styled.div`
  width: 1px;
  height: 60px;
  background-color: #eee;

  @media (max-width: 768px) {
    width: 100%;
    height: 1px;
  }
`;

export default function VisitorCounter({ lang = "en" }) {
  const isArabic = lang === "ar";
  const locale = isArabic ? "ar-AE" : "en-US";

  const [stats, setStats] = useState({ visitors: "...", events: "..." });

  useEffect(() => {
    fetch("/api/visitors")
      .then((res) => res.json())
      .then((data) => {
        const visitorsNum = Number(data?.visitors) || 0;
        const eventsNum = Number(data?.events) || 0;

        setStats({
          visitors: visitorsNum.toLocaleString(locale),
          events: eventsNum.toLocaleString(locale),
        });
      })
      .catch((err) => console.error("Stats Error:", err));
  }, [lang]);

  return (
    <Wrapper>
      <Shape1 />
      <Shape2 />

      <Card>
        {/* Visitors Section */}
        <StatGroup>
          <IconWrapper $variant="blue">
            <FaUsers />
          </IconWrapper>
          <TextWrapper>
            <Label>{isArabic ? "إجمالي المستخدمين" : "Total Users"}</Label>
            <Value>{stats.visitors}</Value>
          </TextWrapper>
        </StatGroup>

        <Divider />

        {/* Events Section */}
        <StatGroup>
          <IconWrapper $variant="green">
            <FaChartLine />
          </IconWrapper>
          <TextWrapper>
            <Label>{isArabic ? "إجمالي العمليات" : "Total Actions"}</Label>
            <Value>{stats.events}</Value>
          </TextWrapper>
        </StatGroup>
      </Card>
    </Wrapper>
  );
}
