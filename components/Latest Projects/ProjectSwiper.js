import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ProjectCard, ProjectImage, ProjectInfo ,ProjectTags} from './LatestProjectsStyles';

const ProjectSwiper = ({ projects }) => (
  <div className="projects-wrapper">
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={1.5}
      breakpoints={{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 2.5 },
      }}
    >
      {projects.map((project) => (
        <SwiperSlide key={project.id}>
          <ProjectCard>
            <a href={project.image} data-fancybox="proj">
              <ProjectImage src={project.image} alt={project.title} />
            </a>
            <ProjectInfo>
              <ProjectTags>
                {project.tags.map((tag, index) => (
                  <a key={index} href="#">{tag}</a>
                ))}
              </ProjectTags>
              <h3>{project.title}</h3>
              <div>{project.text}</div>
            </ProjectInfo>
          </ProjectCard>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default ProjectSwiper;
