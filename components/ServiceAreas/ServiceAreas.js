"use client";
import React from "react";
import styled from "styled-components";

const ServiceAreasContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  background: #f8f9fa;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 50px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const AreasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const AreaCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const AreaIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 2rem;
  color: white;
`;

const AreaName = styled.h3`
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 15px;
  font-weight: 600;
`;

const AreaDescription = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
`;

const ServiceAreas = () => {
  const serviceAreas = [
    {
      name: "Dubai",
      icon: "🏙️",
      description:
        "Complete architecture and interior design services across all areas of Dubai including Downtown, Marina, JBR, Business Bay, and residential communities.",
    },
    {
      name: "Abu Dhabi",
      icon: "🏛️",
      description:
        "Luxury residential and commercial architecture projects in Abu Dhabi, including villa design, office interiors, and government building projects.",
    },
    {
      name: "Sharjah",
      icon: "🏘️",
      description:
        "Residential architecture, interior design, and commercial projects throughout Sharjah emirate with focus on cultural sensitivity and modern design.",
    },
    {
      name: "Ajman",
      icon: "🏢",
      description:
        "Architecture and interior design services in Ajman including residential towers, commercial buildings, and mixed-use developments.",
    },
    {
      name: "Ras Al Khaimah",
      icon: "🏔️",
      description:
        "Specialized architecture services in RAK including resort design, residential villas, and commercial projects with mountain and coastal views.",
    },
    {
      name: "Fujairah",
      icon: "🌊",
      description:
        "Coastal architecture and interior design projects in Fujairah, specializing in beachfront properties and hospitality design.",
    },
    {
      name: "Umm Al Quwain",
      icon: "🏝️",
      description:
        "Residential and commercial architecture services in UAQ with focus on sustainable design and traditional Emirati architectural elements.",
    },
    {
      name: "Northern Emirates",
      icon: "🌄",
      description:
        "Comprehensive architecture and design services across the northern emirates with expertise in local regulations and cultural requirements.",
    },
  ];

  return (
    <ServiceAreasContainer>
      <Title>Our Service Areas Across the UAE</Title>
      <Subtitle>
        Khales provides professional architecture and interior design services
        throughout the United Arab Emirates. Our experienced team delivers
        exceptional projects across all seven emirates, ensuring compliance with
        local regulations and cultural preferences.
      </Subtitle>

      <AreasGrid>
        {serviceAreas.map((area, index) => (
          <AreaCard key={index}>
            <AreaIcon>{area.icon}</AreaIcon>
            <AreaName>Architecture Services in {area.name}</AreaName>
            <AreaDescription>{area.description}</AreaDescription>
          </AreaCard>
        ))}
      </AreasGrid>
    </ServiceAreasContainer>
  );
};

export default ServiceAreas;
