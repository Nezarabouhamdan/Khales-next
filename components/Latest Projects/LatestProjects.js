import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Tabs from './Tabs';
import ProjectSwiper from './ProjectSwiper';
import { projectsData } from '../../data/LatestImage';
import { Section, Container, Title } from './LatestProjectsStyles';

const LatestProjects = () => {
  const [activeTab, setActiveTab] = useState('proj2');
  const [sectionRef, isIntersecting] = useInView({ threshold: 0.2 });

  return (
    <Section ref={sectionRef} className={isIntersecting ? 'animate' : ''}>
      <Container>
        <Title>
          <h2>Featured Projects</h2>
        </Title>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="projects">
          {['proj1', 'proj2', 'proj3'].map(tabId => (
            activeTab === tabId && 
            <ProjectSwiper 
              key={tabId} 
              projects={projectsData[tabId]} 
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default LatestProjects;
