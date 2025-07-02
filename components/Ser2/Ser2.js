// components/OurServices.jsx
"use client";

import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import {
  FaArrowRight,
  FaStar,
  FaPencilRuler,
  FaProjectDiagram,
  FaLeaf,
  FaLightbulb,
  FaBullseye,
  FaChartLine,
  FaClipboardCheck,
  FaTasks,
} from "react-icons/fa";

//================================================================
// 1. DATA FOR THE SERVICES
//================================================================

const servicesData = [
  {
    title: "Engineering",
    highlight: "Consultancy",
    description:
      "Delivering comprehensive engineering solutions through strategic analysis, innovative design methodologies, and technical excellence. Our expert insight translates complex challenges into sustainable, robust systems.",
    showcase: {
      icon: <FaStar />,
      title: "Engineering Architecture",
      subtitle:
        "Configurable and modular physical system design & architecture.",
      bgColor: "#f8f9fa",
      textColor: "#1a1a1a",
    },
    features: [
      {
        icon: <FaProjectDiagram />,
        title: "Structural Analysis",
        description: "Advanced computational and stress analysis.",
      },
      {
        icon: <FaClipboardCheck />,
        title: "Quality Assurance",
        description: "Rigorous testing protocols and full compliance.",
      },
    ],
    linkText: "Explore Engineering Solutions",
  },
  {
    title: "Project",
    highlight: "Management",
    description:
      "Orchestrating complex projects with precision, transparency, and strategic oversight. Our comprehensive approach ensures seamless execution from conception to completion, delivering exceptional results on time and within budget.",
    showcase: {
      icon: <FaTasks />,
      title: "Project Dashboard",
      subtitle: "Strategic Oversight",
      bgColor: "#2c3e50",
      textColor: "#ffffff",
    },
    features: [
      {
        icon: <FaBullseye />,
        title: "Resource Planning",
        description: "Optimizing resource allocation for max efficiency.",
      },
      {
        icon: <FaClipboardCheck />,
        title: "Risk Management",
        description: "Proactive identification and mitigation strategies.",
      },
    ],
    linkText: "Discover Project Excellence",
  },
  {
    title: "Sustainability",
    highlight: "Consulting",
    description:
      "Pioneering solutions that balance environmental responsibility with business objectives. Our expertise in green technologies and sustainable practices ensures long-term value creation and regulatory compliance.",
    showcase: {
      icon: <FaPencilRuler />,
      title: "Sustainability Planning",
      subtitle: "Green Innovation",
      bgColor: "#66a109",
      textColor: "#ffffff",
    },
    features: [
      {
        icon: <FaLeaf />,
        title: "Carbon Footprint",
        description: "Integrated strategies for emission reduction.",
      },
      {
        icon: <FaLightbulb />,
        title: "Green Certification",
        description: "Attaining industry-standard green credentials.",
      },
    ],
    linkText: "Learn About Responsibility",
  },
  {
    title: "Strategic",
    highlight: "Planning",
    description:
      "Developing comprehensive organizational roadmaps that align operational goals with market opportunities. Our analytical approach transforms data into actionable insights for sustainable growth and competitive advantage.",
    showcase: {
      icon: <FaChartLine />,
      title: "Strategic Analytics",
      subtitle: "Goal Setting",
      bgColor: "#2c3e50",
      textColor: "#ffffff",
    },
    features: [
      {
        icon: <FaBullseye />,
        title: "Market Analysis",
        description: "In-depth research of market trends and positioning.",
      },
      {
        icon: <FaChartLine />,
        title: "Goal Setting",
        description: "Defining clear, measurable success metrics.",
      },
    ],
    linkText: "Explore Strategic Solutions",
  },
];

//================================================================
// 2. STYLED COMPONENTS
//================================================================

const ServicesContainer = styled.section`
  width: 100%;
  padding: 6rem 2rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;
  font-family: "Inter", sans-serif;
  position: relative;
  overflow: hidden;

  @media (max-width: 992px) {
    padding: 4rem 1.5rem;
    gap: 4rem;
  }
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  max-width: 700px;
  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #1a1a1a;
  }
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #555;
  }
  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
  }
`;

const ServiceRow = styled(motion.div)`
  display: flex;
  width: 100%;
  max-width: 1100px;
  gap: 3rem;
  align-items: center;
  flex-direction: ${(props) => (props.isReversed ? "row-reverse" : "row")};

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const ShowcaseColumn = styled(motion.div)`
  flex: 1;
  min-width: 300px;
`;

const ShowcaseCard = styled.div`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  border-radius: 20px;
  padding: 2rem;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: ${(props) =>
    props.bgColor === "#f8f9fa" ? "1px solid #e9ecef" : "none"};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ShowcaseIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background-color: ${(props) =>
    props.isDark ? "rgba(255,255,255,0.1)" : "#66a109"};
  color: #fff;
`;

const ShowcaseTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 600;
  margin-top: auto;
`;

const ShowcaseSubCard = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.08);

  ${ShowcaseCard}[data-dark="true"] & {
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }
`;

const TextColumn = styled(motion.div)`
  flex: 1.2;
`;

const ServiceTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
  span {
    color: #66a109;
  }
`;

const ServiceDescription = styled.p`
  color: #555;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #1a1a1a;
  }
  p {
    font-size: 0.9rem;
    color: #666;
    line-height: 1.6;
  }
  .icon {
    color: #66a109;
  }
`;

const ExploreLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #66a109;
  font-weight: 500;
  cursor: pointer;
  transition: gap 0.3s ease;
  &:hover {
    gap: 0.8rem;
  }
`;

const DecorativeShape = styled(motion.div)`
  position: absolute;
  z-index: 0;
  pointer-events: none;
  transition: transform 0.4s ease-out;
`;

//================================================================
// 3. FRAMER MOTION VARIANTS
//================================================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

//================================================================
// 4. THE MAIN COMPONENT
//================================================================
const OurServices = () => {
  const sectionRef = useRef(null);

  const handleMouseMove = (e) => {
    const { currentTarget } = e;
    const shapes = currentTarget.querySelectorAll(".shape");
    const rect = currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    shapes.forEach((shape) => {
      const factor = shape.getAttribute("data-factor") || 20;
      shape.style.transform = `translate(${x / factor}px, ${y / factor}px)`;
    });
  };

  const handleMouseLeave = (e) => {
    const shapes = e.currentTarget.querySelectorAll(".shape");
    shapes.forEach((shape) => {
      shape.style.transform = `translate(0px, 0px)`;
    });
  };

  return (
    <ServicesContainer
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Parallax Shapes Layer */}
      <DecorativeShape
        className="shape"
        data-factor="25"
        style={{
          top: "5%",
          left: "10%",
          width: "20px",
          height: "20px",
          background: "rgba(102, 161, 9, 0.2)",
          borderRadius: "50%",
        }}
      />
      <DecorativeShape
        className="shape"
        data-factor="-20"
        style={{
          top: "20%",
          right: "5%",
          width: "40px",
          height: "40px",
          background: "#e9ecef",
          borderRadius: "10px",
        }}
      />
      <DecorativeShape
        className="shape"
        data-factor="15"
        style={{
          top: "45%",
          left: "2%",
          width: "60px",
          height: "60px",
          border: "2px solid rgba(102, 161, 9, 0.2)",
          borderRadius: "50%",
        }}
      />
      <DecorativeShape
        className="shape"
        data-factor="-30"
        style={{
          top: "65%",
          right: "10%",
          width: "50px",
          height: "50px",
          background: "rgba(44, 62, 80, 0.1)",
        }}
      />
      <DecorativeShape
        className="shape"
        data-factor="20"
        style={{
          top: "90%",
          left: "15%",
          width: "30px",
          height: "30px",
          background: "#66a109",
          borderRadius: "10px",
        }}
      />

      <SectionHeader
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Our Services</h1>
        <p>
          Transforming complex challenges into strategic opportunities through
          innovative project management solutions and engineering excellence.
        </p>
      </SectionHeader>

      {servicesData.map((service, index) => (
        <ServiceRow
          key={service.title}
          isReversed={index % 2 !== 0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <ShowcaseColumn variants={itemVariants}>
            <ShowcaseCard
              bgColor={service.showcase.bgColor}
              textColor={service.showcase.textColor}
              data-dark={service.showcase.bgColor !== "#f8f9fa"}
            >
              <ShowcaseIcon isDark={service.showcase.bgColor !== "#f8f9fa"}>
                {service.showcase.icon}
              </ShowcaseIcon>
              <div>
                <ShowcaseTitle>{service.showcase.title}</ShowcaseTitle>
                <ShowcaseSubCard>{service.showcase.subtitle}</ShowcaseSubCard>
              </div>
            </ShowcaseCard>
          </ShowcaseColumn>

          <TextColumn variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <ServiceTitle>
                {service.title} <span>{service.highlight}</span>
              </ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
            </motion.div>
            <FeaturesGrid>
              {service.features.map((feature) => (
                <motion.div key={feature.title} variants={itemVariants}>
                  <FeatureCard>
                    <h4>
                      <span className="icon">{feature.icon}</span>
                      {feature.title}
                    </h4>
                    <p>{feature.description}</p>
                  </FeatureCard>
                </motion.div>
              ))}
            </FeaturesGrid>
            <motion.div variants={itemVariants}>
              <ExploreLink href="#">
                {service.linkText} <FaArrowRight />
              </ExploreLink>
            </motion.div>
          </TextColumn>
        </ServiceRow>
      ))}
    </ServicesContainer>
  );
};

export default OurServices;
