import React, { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import img1 from "../../public/assets/villa4.jpeg";
import img2 from "../../public/assets/v5.jpeg";
import img3 from "../../public/assets/v6.jpeg";
import int from "../../public/assets/int.jpg";
import int2 from "../../public/assets/int2.jpg";
import int3 from "../../public/assets/int3.jpg";
import int4 from "../../public/assets/int4.jpg";
import arc1 from "../../public/assets/arch1.jpeg";
import arc2 from "../../public/assets/arch2.jpeg";
import arc3 from "../../public/assets/arch3.jpeg";
import arc4 from "../../public/assets/arch4.jpeg";
import { useInView } from "react-intersection-observer";
import { GreenText, Title } from "../Whoweare/TextContent";
import { useLanguage } from "../../Context/Languagecontext"; // Import the language context
import Link from "next/link";
import Image from "next/image";

const Section = styled.section`
  padding: 70px 0;
  background-color: rgb(255, 255, 255);
  opacity: 1;
  transform: translateY(60px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  margin-top: -100px;
  border-top-left-radius: 40px 40px;
  border-top-right-radius: 40px 40px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: CENTER;
  padding: 0 15px;
`;

const TabsLinksWrapper = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: ${(props) => (props.$rtl ? "row-reverse" : "row")};
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const AllProjectsLink = styled.span`
  display: inline-block;
  border: 1px solid #66a109;
  border-radius: 50px;
  padding: 10px 20px;
  color: #66a109;
  text-decoration: none;
  transition: background 0.3s;
  &:hover {
    background: #66a109;
    color: #fff;
  }
`;
const ProjectsWrapper = styled.div`
  position: relative;
`;

const ProjectInfo = styled.div`
  padding: 15px;
`;
const ProjectTags = styled.div`
  margin-bottom: 10px;
  a {
    margin-right: 5px;
    font-size: 14px;
    color: #66a109;
    text-decoration: none;
  }
`;
const ProjectTitle = styled.h3`
  font-size: 20px;
  margin: 0 0 10px;
  a {
    color: #333;
    text-decoration: none;
  }
  @media (max-width: 968px) {
    font-size: 15px;
  }
`;
const ProjectText = styled.div`
  font-size: 14px;
  color: #666;
  @media (max-width: 968px) {
    font-size: 10px;
  }
`;

const NavPills = styled.ul`
  display: flex;
  flex-direction: ${(props) => (props.$rtl ? "row-reverse" : "row")};
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
  button {
    background: none;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 50px;
    transition: background 0.3s;
    &:hover,
    &.active {
      background: #66a109;
      color: #fff;
    }
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 20px;

  @media (max-width: 968px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 250px;
  }
`;

const ProjectImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProjectCard = styled.div`
  height: auto;
  min-height: 600px;

  @media (max-width: 968px) {
    min-height: 500px;
  }

  @media (max-width: 480px) {
    min-height: 400px;
  }
`;

const FeaturedProjects = () => {
  const [activeTab, setActiveTab] = useState("proj1");
  const [sectionRef, isIntersecting] = useInView({ threshold: 0.2 });
  const { language } = useLanguage(); // Get the current language

  const tabs = {
    eng: [
      { id: "proj1", label: "Featured" },
      { id: "proj2", label: "Commerical" },
      { id: "proj3", label: "Interior Design" },
      { id: "proj4", label: "Villas" },
    ],
    ar: [
      { id: "proj1", label: "مميز" },
      { id: "proj2", label: "الهندسة المعمارية" },
      { id: "proj3", label: "التصميم الداخلي" },
      { id: "proj4", label: " فلل" },
    ],
  };

  const projectsData = {
    eng: {
      proj1: [
        {
          id: 1,
          image: img1,
          tags: ["Architecture", "Furniture"],
          title: "Townhouse in San Jose",
          text: "This area is a brief description of the project. You can choose to show or hide it. This is a sample short paragraph.",
        },
        {
          id: 2,
          image: img3,
          tags: ["Furniture", "Interior Design"],
          title: "Home Renovation & Interior Design",
          text: "This area is a brief description of the project. You can choose to show or hide it. This is a sample short paragraph.",
        },
        {
          id: 3,
          image: img2,
          tags: ["Furniture", "Interior Design"],
          title: "Private Villa B63",
          text: "This area is a brief description of the project. You can choose to show or hide it. This is a sample short paragraph.",
        },
        {
          id: 4,
          image: img1,
          tags: ["Interior Design", "Furniture"],
          title: "Townhouse in San Jose",
          text: "This area is a brief description of the project. You can choose to show or hide it. This is a sample short paragraph.",
        },
      ],
      proj2: [
        {
          id: 5,
          image: arc1,
          tags: ["Furniture", "Interior Design"],
          title: "Private Villa B63",
          text: "This area is a brief description of the project. You can choose to show or hide it. This is a sample short paragraph.",
        },
        {
          id: 6,
          image: arc2,
          tags: ["Interior Design", "Furniture"],
          title: "Townhouse in San Jose",
          text: "This area is a brief description of the project. You can choose to show or hide it. This is a sample short paragraph.",
        },
        {
          id: 7,
          image: arc3,
          tags: ["Furniture", "Interior Design"],
          title: "Townhouse in San Jose",
          text: "This area is a brief description of the project. You can choose to show or hide it. This is a sample short paragraph.",
        },
        {
          id: 8,
          image: arc4,
          tags: ["Interior Design", "Furniture"],
          title: "Home Renovation & Interior Design",
          text: "This area is a brief description of the project. You can choose to show or hide it. This is a sample short paragraph.",
        },
      ],
      proj3: [
        {
          id: 9,
          image: int,
          tags: ["Furniture", "Interior Design"],
          title: "Private Villa B63",
          text: "This area is a brief description of the project. You can choose to show or hide it. This is a sample short paragraph.",
        },
        {
          id: 10,
          image: int2,
          tags: ["Interior Design", "Furniture"],
          title: "Townhouse in San Jose",
          text: "This area is a brief description of the project. You can choose to show or hide it. This is a sample short paragraph.",
        },
        {
          id: 11,
          image: int3,
          tags: ["Furniture", "Interior Design"],
          title: "Townhouse in San Jose",
          text: "This area is a brief description of the project. You can choose to show or hide it. This is a sample short paragraph.",
        },
        {
          id: 12,
          image: int4,
          tags: ["Interior Design", "Furniture"],
          title: "Home Renovation & Interior Design",
          text: "This area is a brief description of the project. You can choose to show or hide it. This is a sample short paragraph.",
        },
      ],
      proj4: [
        {
          id: 9,
          image: int,
          tags: ["Furniture", "Interior Design"],
          title: "Private Villa B63",
          text: "This area is a brief description of the project. You can choose to show or hide it. This is a sample short paragraph.",
        },
        {
          id: 10,
          image: int2,
          tags: ["Interior Design", "Furniture"],
          title: "Townhouse in San Jose",
          text: "This area is a brief description of the project. You can choose to show or hide it. This is a sample short paragraph.",
        },
        {
          id: 11,
          image: int3,
          tags: ["Furniture", "Interior Design"],
          title: "Townhouse in San Jose",
          text: "This area is a brief description of the project. You can choose to show or hide it. This is a sample short paragraph.",
        },
        {
          id: 12,
          image: int4,
          tags: ["Interior Design", "Furniture"],
          title: "Home Renovation & Interior Design",
          text: "This area is a brief description of the project. You can choose to show or hide it. This is a sample short paragraph.",
        },
      ],
    },
    ar: {
      proj1: [
        {
          id: 1,
          image: img1,
          tags: ["الهندسة المعمارية", "الأثاث"],
          title: "تاونهوس في سان خوسيه",
          text: "هذه المنطقة هي وصف موجز للمشروع. يمكنك اختيار إظهارها أو إخفائها. هذه فقرة قصيرة نموذجية.",
        },
        {
          id: 2,
          image: img3,
          tags: ["الأثاث", "التصميم الداخلي"],
          title: "تجديد المنزل والتصميم الداخلي",
          text: "هذه المنطقة هي وصف موجز للمشروع. يمكنك اختيار إظهارها أو إخفائها. هذه فقرة قصيرة نموذجية.",
        },
        {
          id: 3,
          image: img2,
          tags: ["الأثاث", "التصميم الداخلي"],
          title: "فيلا خاصة B63",
          text: "هذه المنطقة هي وصف موجز للمشروع. يمكنك اختيار إظهارها أو إخفائها. هذه فقرة قصيرة نموذجية.",
        },
        {
          id: 4,
          image: img1,
          tags: ["التصميم الداخلي", "الأثاث"],
          title: "تاونهوس في سان خوسيه",
          text: "هذه المنطقة هي وصف موجز للمشروع. يمكنك اختيار إظهارها أو إخفائها. هذه فقرة قصيرة نموذجية.",
        },
      ],
      proj2: [
        {
          id: 5,
          image: arc1,
          tags: ["الأثاث", "التصميم الداخلي"],
          title: "فيلا خاصة B63",
          text: "هذه المنطقة هي وصف موجز للمشروع. يمكنك اختيار إظهارها أو إخفائها. هذه فقرة قصيرة نموذجية.",
        },
        {
          id: 6,
          image: arc2,
          tags: ["التصميم الداخلي", "الأثاث"],
          title: "تاونهوس في سان خوسيه",
          text: "هذه المنطقة هي وصف موجز للمشروع. يمكنك اختيار إظهارها أو إخفائها. هذه فقرة قصيرة نموذجية.",
        },
        {
          id: 7,
          image: arc3,
          tags: ["الأثاث", "التصميم الداخلي"],
          title: "تاونهوس في سان خوسيه",
          text: "هذه المنطقة هي وصف موجز للمشروع. يمكنك اختيار إظهارها أو إخفائها. هذه فقرة قصيرة نموذجية.",
        },
        {
          id: 8,
          image: arc4,
          tags: ["التصميم الداخلي", "الأثاث"],
          title: "تجديد المنزل والتصميم الداخلي",
          text: "هذه المنطقة هي وصف موجز للمشروع. يمكنك اختيار إظهارها أو إخفائها. هذه فقرة قصيرة نموذجية.",
        },
      ],
      proj3: [
        {
          id: 9,
          image: int,
          tags: ["الأثاث", "التصميم الداخلي"],
          title: "فيلا خاصة B63",
          text: "هذه المنطقة هي وصف موجز للمشروع. يمكنك اختيار إظهارها أو إخفائها. هذه فقرة قصيرة نموذجية.",
        },
        {
          id: 10,
          image: int2,
          tags: ["التصميم الداخلي", "الأثاث"],
          title: "تاونهوس في سان خوسيه",
          text: "هذه المنطقة هي وصف موجز للمشروع. يمكنك اختيار إظهارها أو إخفائها. هذه فقرة قصيرة نموذجية.",
        },
        {
          id: 11,
          image: int3,
          tags: ["الأثاث", "التصميم الداخلي"],
          title: "تاونهوس في سان خوسيه",
          text: "هذه المنطقة هي وصف موجز للمشروع. يمكنك اختيار إظهارها أو إخفائها. هذه فقرة قصيرة نموذجية.",
        },
        {
          id: 12,
          image: int4,
          tags: ["التصميم الداخلي", "الأثاث"],
          title: "تجديد المنزل والتصميم الداخلي",
          text: "هذه المنطقة هي وصف موجز للمشروع. يمكنك اختيار إظهارها أو إخفائها. هذه فقرة قصيرة نموذجية.",
        },
      ],
      proj4: [
        {
          id: 9,
          image: int,
          tags: ["الأثاث", "التصميم الداخلي"],
          title: "فيلا خاصة B63",
          text: "هذه المنطقة هي وصف موجز للمشروع. يمكنك اختيار إظهارها أو إخفائها. هذه فقرة قصيرة نموذجية.",
        },
        {
          id: 10,
          image: int2,
          tags: ["التصميم الداخلي", "الأثاث"],
          title: "تاونهوس في سان خوسيه",
          text: "هذه المنطقة هي وصف موجز للمشروع. يمكنك اختيار إظهارها أو إخفائها. هذه فقرة قصيرة نموذجية.",
        },
        {
          id: 11,
          image: int3,
          tags: ["الأثاث", "التصميم الداخلي"],
          title: "تاونهوس في سان خوسيه",
          text: "هذه المنطقة هي وصف موجز للمشروع. يمكنك اختيار إظهارها أو إخفائها. هذه فقرة قصيرة نموذجية.",
        },
        {
          id: 12,
          image: int4,
          tags: ["التصميم الداخلي", "الأثاث"],
          title: "تجديد المنزل والتصميم الداخلي",
          text: "هذه المنطقة هي وصف موجز للمشروع. يمكنك اختيار إظهارها أو إخفائها. هذه فقرة قصيرة نموذجية.",
        },
      ],
    },
  };

  // Get the projects for the current language and active tab
  const projects = projectsData[language][activeTab];

  return (
    <Section
      id="featured-projects"
      aria-label="featured-projects"
      ref={sectionRef}
      className={isIntersecting ? "animate" : ""}
    >
      <Container>
        {/* Dynamic Title */}
        {language === "ar" ? (
          <Title style={{ marginTop: "20px", marginBottom: "50px" }}>
            المشاريع<GreenText>&nbsp;المميزة</GreenText>
          </Title>
        ) : (
          <Title style={{ marginTop: "20px", marginBottom: "50px" }}>
            Featured<GreenText>&nbsp;Projects</GreenText>
          </Title>
        )}

        <TabsLinksWrapper $rtl={language === "ar"}>
          <NavPills $rtl={language === "ar"}>
            {tabs[language].map((tab) => (
              <li key={tab.id}>
                <button
                  className={activeTab === tab.id ? "active" : ""}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    fontFamily: "Inter",
                    direction: language === "ar" ? "rtl" : "ltr",
                  }}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </NavPills>
          <div>
            <Link href="/">
              <AllProjectsLink>
                <span style={{ fontFamily: "Inter" }}>
                  {language === "ar"
                    ? "عرض جميع المشاريع"
                    : "View All Projects"}{" "}
                  <i className="small ms-1 ti-arrow-top-right"></i>
                </span>
              </AllProjectsLink>
            </Link>
          </div>
        </TabsLinksWrapper>

        <div className="projects">
          {/* Projects - Dynamically rendered based on language */}
          <ProjectsWrapper>
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
                    <Link href={project.image} data-fancybox="proj">
                      <ImageContainer>
                        <ProjectImage src={project.image} alt={project.title} />
                      </ImageContainer>
                    </Link>
                    <ProjectInfo>
                      <ProjectTags>
                        {project.tags.map((tag, index) => (
                          <a
                            key={index}
                            href="#"
                            style={{ fontFamily: "Inter" }}
                          >
                            {tag}
                          </a>
                        ))}
                      </ProjectTags>
                      <ProjectTitle>
                        <Link href="#" style={{ fontFamily: "Inter" }}>
                          {project.title}
                        </Link>
                      </ProjectTitle>
                      <ProjectText style={{ fontFamily: "Inter" }}>
                        {project.text}
                      </ProjectText>
                    </ProjectInfo>
                  </ProjectCard>
                </SwiperSlide>
              ))}
            </Swiper>
          </ProjectsWrapper>
        </div>
      </Container>
    </Section>
  );
};

export default FeaturedProjects;
