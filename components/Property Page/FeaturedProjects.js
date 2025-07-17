// components/FeaturedProjects.jsx
"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../../Context/Languagecontext";
import Link from "next/link";
import Image from "next/image";

// --- DATA & HELPER FUNCTION (This is correct and remains the same) ---
const projectsData = [
  {
    id: 1,
    slug: "townhouse-san-jose",
    category: { eng: "Featured", ar: "مميز" },
    mainImage: "/assets/villa4.jpeg",
    galleryImages: [
      "/assets/villa4.jpeg",
      "/assets/v5.jpeg",
      "/assets/v6.jpeg",
      "/assets/int.jpg",
      "/assets/v6.jpeg",
      "/assets/int.jpg",
      "/assets/int.jpg",
      "/assets/int.jpg",
      "/assets/int.jpg",
      "/assets/v6.jpeg",
      "/assets/int.jpg",
    ],
    eng: {
      tags: ["Architecture", "Furniture"],
      title: "Townhouse in San Jose",
      address: "123 Meadow Lane, San Jose, CA 95123",
      description: "A brief description of the project.",
      longDescription:
        "An architectural masterpiece, this estate offers unparalleled luxury and privacy with breathtaking panoramic views and seamless indoor-outdoor flow.",
      price: "2,500,000",
      beds: 4,
      baths: 3,
      sqft: "3,120",
      highlights: [
        { label: "Property Type", value: "Residential" },
        { label: "Year Built", value: "2023" },
        { label: "Location", value: "San Jose, CA" },
      ],
    },
    ar: {
      tags: ["الهندسة المعمارية", "الأثاث"],
      title: "تاونهوس في سان خوسيه",
      address: "١٢٣ ميدو لين، سان خوسيه، كاليفورنيا ٩٥١٢٣",
      description: "وصف موجز للمشروع.",
      longDescription:
        "تحفة معمارية، يوفر هذا العقار فخامة وخصوصية لا مثيل لهما مع إطلالات بانورامية خلابة وتدفق سلس بين الداخل والخارج.",
      price: "٢٬٥٠٠٬٠٠٠",
      beds: "٤",
      baths: "٣",
      sqft: "٣٬١٢٠",
      highlights: [
        { label: "نوع العقار", value: "سكني" },
        { label: "سنة البناء", value: "٢٠٢٣" },
        { label: "الموقع", value: "سان خوسيه، كاليفورنيا" },
      ],
    },
  },
  {
    id: 2,
    slug: "home-renovation-design",
    category: { eng: "Interior Design", ar: "تصميم داخلي" },
    mainImage: "/assets/int.jpg",
    galleryImages: [
      "/assets/int.jpg",
      "/assets/int2.jpg",
      "/assets/int3.jpg",
      "/assets/int4.jpg",
    ],
    eng: {
      tags: ["Furniture", "Interior Design"],
      title: "Home Renovation & Design",
      address: "456 Luxe Avenue, Beverly Hills, CA 90210",
      description: "Complete overhaul of a classic space.",
      longDescription:
        "This project focused on transforming a classic villa into a modern sanctuary by blending contemporary design elements with timeless materials.",
      price: "5,750,000",
      beds: 5,
      baths: 6,
      sqft: "6,500",
      highlights: [
        { label: "Project Type", value: "Renovation" },
        { label: "Year Completed", value: "2024" },
      ],
    },
    ar: {
      tags: ["الأثاث", "التصميم الداخلي"],
      title: "تجديد وتصميم منزل",
      address: "٤٥٦ لوكس أفينيو، بيفرلي هيلز، كاليفورنيا ٩٠٢١٠",
      description: "تجديد كامل لمساحة كلاسيكية.",
      longDescription:
        "ركز هذا المشروع على تحويل فيلا كلاسيكية إلى ملاذ عصري من خلال دمج عناصر التصميم المعاصر مع المواد الخالدة.",
      price: "٥٬٧٥٠٬٠٠٠",
      beds: "٥",
      baths: "٦",
      sqft: "٦٬٥٠٠",
      highlights: [
        { label: "نوع المشروع", value: "تجديد" },
        { label: "سنة الإنجاز", value: "٢٠٢٤" },
      ],
    },
  },
];

export const findProjectBySlug = (slug) => {
  return projectsData.find((p) => p.slug === slug) || null;
};
// --- END: DATA & HELPER FUNCTION ---

const FeaturedProjects = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("Featured");
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const tabs = {
    eng: ["Featured", "Commerical", "Interior Design", "Villas"],
    ar: ["مميز", "تجاري", "تصميم داخلي", "فلل"],
  };

  const filteredProjects = projectsData.filter((p) => {
    if (activeTab === "Featured" || activeTab === "مميز") return true;
    return p.category[language] === activeTab;
  });

  return (
    <SectionWrapper ref={ref} lang={language}>
      <Container>
        <Header>
          <Title>
            {language === "ar" ? "مشاريع مميزة" : "Featured Projects"}
          </Title>
          <FilterContainer>
            <FilterTabs>
              {tabs[language].map((cat) => (
                <FilterButton
                  key={cat}
                  active={activeTab === cat}
                  onClick={() => setActiveTab(cat)}
                >
                  {cat}
                </FilterButton>
              ))}
            </FilterTabs>
            <ViewAllButton href="/projects">
              {language === "ar" ? "عرض كل المشاريع" : "View All Projects"}
            </ViewAllButton>
          </FilterContainer>
        </Header>

        <ProjectsGrid>
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                as={motion.div}
                key={project.id} // Use a stable key for animation
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, y: -50 }}
                transition={{
                  duration: 0.5,
                  delay: inView ? index * 0.1 : 0,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  passHref
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    textDecoration: "none",
                  }}
                >
                  <ImageWrapper>
                    <ProjectImage
                      src={project.mainImage}
                      alt={project[language].title}
                      width={500}
                      height={400}
                    />
                  </ImageWrapper>
                  <CardContent lang={language}>
                    <Tags>{project[language].tags.join(" / ")}</Tags>
                    <CardTitle>{project[language].title}</CardTitle>
                    <Description>{project[language].description}</Description>
                  </CardContent>
                </Link>
              </ProjectCard>
            ))}
          </AnimatePresence>
        </ProjectsGrid>
      </Container>
    </SectionWrapper>
  );
};

// --- STYLED COMPONENTS (Re-styled to match your new image) ---
const SectionWrapper = styled.section`
  width: 100%;
  padding: 5rem 2rem;
  background-color: #fff;
  font-family: "Inter", sans-serif;
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
`;
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const Header = styled.div`
  margin: 0 auto 3rem auto;
`;
const Title = styled.h2`
  text-align: center;
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1a1a1a;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;
const FilterTabs = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;
const FilterButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 99px;
  border: 1px solid ${({ active }) => (active ? "#66a109" : "#e0e0e0")};
  background-color: ${({ active }) => (active ? "#66a109" : "transparent")};
  color: ${({ active }) => (active ? "#fff" : "#555")};
  font-family: inherit;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${({ active }) => (active ? "#5a9008" : "#f5f5f5")};
  }
`;
const ViewAllButton = styled.a`
  padding: 0.6rem 1.5rem;
  border: 1px solid #66a109;
  color: #66a109;
  border-radius: 99px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  &:hover {
    background-color: #66a109;
    color: #fff;
  }
`;
const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2.5rem;
  align-items: stretch; /* This ensures all grid items in a row stretch to the same height */
`;

const CardTitle = styled.h3`
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.75rem 0;
  text-decoration: none;
  transition: color 0.2s ease;
`;

const Description = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  text-decoration: none;
`;

// THIS IS THE MAIN FIX: Making the card a flex container
const ProjectCard = styled(motion.div)`
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex; /* Makes this a flex container */
  flex-direction: column; /* Stacks children (image, content) vertically */

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);

    /* Underline text on hover */
    ${CardTitle}, ${Description} {
      text-decoration: underline;
      text-decoration-color: #a0a0a0;
    }
  }
`;
const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
`;
const ProjectImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;
const CardContent = styled.div`
  padding: 1.5rem;
  text-align: ${({ lang }) => (lang === "ar" ? "right" : "left")};
  flex-grow: 1; /* This makes the content area take up all available vertical space */
  display: flex;
  flex-direction: column;
`;
const Tags = styled.p`
  color: #66a109;
  font-weight: 500;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
`;

export default FeaturedProjects;
