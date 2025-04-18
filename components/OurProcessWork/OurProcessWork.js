import React, { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Accordion, Stack } from "rsuite";
import "rsuite/Accordion/styles/index.css";
import "./animation.css";
import styled from "styled-components";
import { AllProjectsLink } from "../Latest Projects/LatestProjectsStyles";
import { useLanguage } from "../../Context/Languagecontext";
import Link from "next/link";

// Wrapper for the accordion
const OurProcessWrapper = styled.div`
  width: 50%; // Fixed width for the accordion
  margin: 0;

  @media (max-width: 968px) {
    width: 100%;
  }
`;

// Wrapper for the image
const ImageWrapper = styled.div`
  width: 400px; // Set a fixed width (adjust as needed)
  height: 300px; // Set a fixed height (adjust as needed)
  overflow: hidden; // Ensure the image doesn't overflow the container
  @media (max-width: 968px) {
    width: 100%; // Full width on smaller screens
    height: auto; // Adjust height for responsiveness
  }
`;
const StyledAccordion = styled(Accordion)`
  width: 100%;
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.$rtl ? "row-reverse" : "row")};
  align-items: center;
`;

const HeaderNumber = styled.div`
  margin-right: 50px;
  font-family: "Inter ExtraLight", sans-serif;
  font-weight: 200;
  font-size: 24px;
  line-height: 36px;
  color: rgb(153, 153, 153);

  @media (max-width: 968px) {
    margin-right: 20px;
    font-size: 18px;
    line-height: 27px;
  }
`;

const HeaderTitle = styled.div`
  font-family: "Playfair";
  font-weight: 100;
  font-size: 24px;
  line-height: 28.8px;
  color: ${(props) => (props.$isActive ? "#66a109" : "black")};

  @media (max-width: 968px) {
    font-size: 18px;
    line-height: 21.6px;
  }
`;

const HeaderContainer = styled(Stack)`
  width: 100%;
`;

const PanelContent = styled.div`
  padding: 10px;
  color: grey;
  text-align: ${(props) => (props.$rtl ? "right" : "left")};
  font-family: "Inter", sans-serif;
  font-size: 16px;
  white-space: pre-line;
  @media (max-width: 968px) {
    font-size: 14px;
  }
`;

const HeaderComponent = ({ isActive, eventKey, title, language, ...rest }) => (
  <HeaderContainer
    spacing={10}
    alignItems="flex-start"
    direction="row"
    justifyContent="space-between"
    {...rest}
  >
    <Stack spacing={2} direction="column" alignItems="flex-start">
      <HeaderRow $rtl={language === "ar"}>
        <HeaderTitle $isActive={isActive}>{title}</HeaderTitle>
      </HeaderRow>
    </Stack>
  </HeaderContainer>
);

function OurProcessWork({ panels, button }) {
  const [activeKey, setActiveKey] = useState(null);
  const { language } = useLanguage();
  // Create an array of refs for each panel
  const panelRefs = useRef([]);
  
  // Initialize refs array
  if (panels && panelRefs.current.length !== panels.length) {
    // Create a ref for each panel
    panelRefs.current = Array(panels.length).fill().map(() => React.createRef());
  }

  const handleSelect = (key) => {
    setActiveKey(key === activeKey ? null : key); // Toggle active state
  };

  return (
    <OurProcessWrapper>
      <StyledAccordion activeKey={activeKey} onSelect={handleSelect}>
        {panels.map((panel, index) => {
          return (
            <Accordion.Panel
              key={index}
              header={
                <HeaderComponent
                  language={language}
                  title={panel.title}
                  isActive={activeKey === index.toString()}
                  eventKey={index.toString()}
                />
              }
              eventKey={index.toString()}
            >
              <CSSTransition
                nodeRef={panelRefs.current[index]}
                in={activeKey === index.toString()}
                timeout={1000}
                classNames="fade"
                unmountOnExit
              >
                <PanelContent ref={panelRefs.current[index]} $rtl={language === "ar"}>
                  {panel.content}
                </PanelContent>
              </CSSTransition>
            </Accordion.Panel>
          )
        })}
      </StyledAccordion>
      {button === true && (
        <Link href={"/projects"} style={{ marginTop: "50px" }}>
          <AllProjectsLink>
            More Details
          </AllProjectsLink>
        </Link>
      )}
    </OurProcessWrapper>
  );
}

export default OurProcessWork;
