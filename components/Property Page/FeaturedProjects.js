"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../../Context/Languagecontext";
import Link from "next/link";
// --- CHANGE 1: Import LazyImage instead of next/image ---

// --- DATA & HELPER FUNCTION (This is correct and remains the same) ---
const projectsData = [
  {
    id: 1,
    slug: "The-Royal-Villa",
    category: { eng: "Villas", ar: "فلل" },
    mainImage: "https://i.ibb.co/k69GLvRT/2.png",
    galleryImages: [
      "https://i.ibb.co/k69GLvRT/2.png",
      "https://i.ibb.co/5h2krDmw/1.png",
      "https://i.ibb.co/qLmR8MpK/3.png",
      "https://i.ibb.co/hFX56DBK/4.png",
      "https://i.ibb.co/N2w6syYQ/5.png",
      "https://i.ibb.co/7xLwfjnn/7.png",
      "https://i.ibb.co/9HxWgYVG/8.png",
      "https://i.ibb.co/G4Dn2N05/9.png",
      "https://i.ibb.co/JjtJ6WhY/10.png",
      "https://i.ibb.co/spnHPwtG/11.png",
      "https://i.ibb.co/sd1FPKPW/12.png",
    ],
    eng: {
      tags: ["Architectural Design", "Site Supervision"],
      title: "The Royal Villa",
      address: "Muscat, Oman",
      description: "Luxurious single-storey palace designed in Muscat.",
      longDescription:
        "The Royal Villa is a one-floor luxury residence in Muscat, Oman, designed to embody the presence and elegance of a true palace. Created for a private client, the design focuses on classical proportions, golden columns, and elevated ceiling heights to achieve a grand architectural expression within a single-storey layout. Khales provided full architectural design and site supervision, ensuring every detail, from the entry arches to the roofline composition, supported the vision of a timeless, royal home.",
      price: "2,500,000",
      beds: 6,
      floor: "Ground Floor",
      sqft: "12,600",
      highlights: [
        { label: "Project Type", value: "Palace" },
        { label: "Under Construction", value: "2025" },
      ],
      keyFeatures: [
        "Golden columns",
        "Classical symmetry",
        "High ceilings",
        "Detailed façade",
      ],
    },
    ar: {
      tags: ["تصميم معماري", "إشراف على الموقع"],
      title: "الفيلا الملكية",
      address: "مسقط، عمان",
      description: "قصر فخم من طابق واحد مصمم في مسقط.",
      longDescription:
        "الفيلا الملكية هي سكن فاخر من طابق واحد في مسقط، عمان، مصممة لتجسيد حضور وأناقة قصر حقيقي. تم تصميمها لعميل خاص، حيث يركز التصميم على النسب الكلاسيكية، والأعمدة الذهبية، وارتفاعات الأسقف الشاهقة لتحقيق تعبير معماري فخم ضمن تصميم من طابق واحد. قدمت خالص التصميم المعماري الكامل والإشراف على الموقع، مع التأكد من أن كل التفاصيل، من أقواس المدخل إلى تكوين خط السقف، تدعم رؤية منزل ملكي خالد.",
      price: "٢٬٥٠٠٬٠٠٠",
      beds: "٦",
      floor: "الطابق الأرضي",
      sqft: "١٢٬٦٠٠",
      highlights: [
        { label: "نوع المشروع", value: "قصر" },
        { label: "تحت الإنشاء", value: "٢٠٢٥" },
      ],
      keyFeatures: [
        "أعمدة ذهبية",
        "تناظر كلاسيكي",
        "أسقف عالية",
        "واجهة مفصلة",
      ],
    },
  },
  {
    id: 2,
    slug: "TheCrownCentral",
    category: { eng: "Commerical", ar: "تجاري" },
    mainImage: "https://i.ibb.co/1Gn1hMNV/Landscape-Saudi-Arabia.png",
    galleryImages: [
      "https://i.ibb.co/1Gn1hMNV/Landscape-Saudi-Arabia.png",
      "https://i.ibb.co/Z6jRc9zm/Riyadh-1-sq.png",
      "https://i.ibb.co/Xxp72yFD/Riyadh-2-sq.png",
    ],
    eng: {
      tags: ["Architectural Design", "Site Supervision"],
      title: "The Crown Central",
      address: "Riyadh, Saudi Arabia",
      description: "Urban luxury living in a high-rise.",
      longDescription:
        "The Crown Central is a high-rise mixed-use development located in a prime area of Riyadh. Designed to balance luxury with accessibility, the project offers an urban experience that combines residential, commercial, and lifestyle spaces within a unified architectural language. With sweeping views of the city and a high-exposure site, the design focuses on clean vertical rhythm, clear circulation, and material elegance. Khales was appointed for full architectural design and site supervision, overseeing quality and consistency from concept to delivery.",
      price: "5,750,000",
      beds: "60+ units/rooms",
      floor: "6",
      sqft: "60,100",
      keyFeatures: [
        "Vertical urban design",
        "Luxury-accessible concept",
        "Skyline views",
      ],
      highlights: [
        { label: "Project Type", value: "Mixed-Use Development" },
        { label: "Under Construction", value: "2025" },
      ],
    },
    ar: {
      tags: ["تصميم معماري", "إشراف على الموقع"],
      title: "ذا كراون سنترال",
      address: "الرياض، المملكة العربية السعودية",
      description: "حياة حضرية فاخرة في برج شاهق.",
      longDescription:
        "ذا كراون سنترال هو مشروع تطويري شاهق متعدد الاستخدامات يقع في منطقة حيوية بالرياض. تم تصميمه لتحقيق التوازن بين الفخامة وسهولة الوصول، ويقدم المشروع تجربة حضرية تجمع بين المساحات السكنية والتجارية والترفيهية ضمن لغة معمارية موحدة. مع إطلالات واسعة على المدينة وموقع بارز، يركز التصميم على الإيقاع الرأسي النظيف، والحركة الواضحة، وأناقة المواد. تم تعيين خالص لتقديم التصميم المعماري الكامل والإشراف على الموقع، ومراقبة الجودة والاتساق من الفكرة حتى التسليم.",
      price: "٥٬٧٥٠٬٠٠٠",
      beds: "+٦٠ وحدة/غرفة",
      floor: "٦",
      sqft: "٦٠٬١٠٠",
      keyFeatures: [
        "تصميم حضري رأسي",
        "مفهوم الفخامة المتاحة",
        "إطلالات على الأفق",
      ],
      highlights: [
        { label: "نوع المشروع", value: "تطوير متعدد الاستخدامات" },
        { label: "تحت الإنشاء", value: "٢٠٢٥" },
      ],
    },
  },
  {
    id: 3,
    slug: "TheOrganicVilla",
    category: { eng: "Villas", ar: "فلل" },
    mainImage: "https://i.ibb.co/4R44GVyc/1-1-Photo.jpg",
    galleryImages: [
      "https://i.ibb.co/4R44GVyc/1-1-Photo.jpg",
      "https://i.ibb.co/QjnnHK2c/1-2-Photo.jpg",
      "https://i.ibb.co/0RNvR5Wx/1-3-Photo.jpg",
      "https://i.ibb.co/gZ7rmmzw/1-4-Photo.jpg",
      "https://i.ibb.co/PvwkwnTJ/1-5-Photo.jpg",
      "https://i.ibb.co/RT4tHXR5/1-6-Photo.jpg",
      "https://i.ibb.co/Y75XsB4m/1-8-Photo.jpg",
      "https://i.ibb.co/DHd44my9/1-9-Photo.jpg",
      "https://i.ibb.co/JRFdvF4m/1-10-Photo.jpg",
      "https://i.ibb.co/Z1prj0GQ/DSC02344.jpg",
      "https://i.ibb.co/gbKW99RW/DSC02350.jpg",
      "https://i.ibb.co/5XfyFzVC/DSC02352.jpg",
      "https://i.ibb.co/zHQ9zMT8/DSC02358.jpg",
      "https://i.ibb.co/5WY5J4Wx/DSC02367.jpg",
      "https://i.ibb.co/KjswkzWT/DSC023721.jpg",
      "https://i.ibb.co/fYd1LY0C/panorama.jpg",
    ],
    eng: {
      tags: ["Project Management", "Construction Oversight"],
      title: "The Organic Villa",
      address: "Al Wasl, Dubai",
      description: "A tranquil retreat of understated luxury.",
      longDescription:
        "Located in the heart of Al Wasl, Dubai, The Organic Villa is a modern private residence that brings together calm, softness, and understated luxury. The design embraces an organic architectural language, with curved edges, natural transitions, and a focus on flow and serenity. Inspired by the concept of “less is more,” the villa was envisioned as a tranquil retreat, blending openness with refined spatial control. Khales is leading the full project management scope, overseeing design, engineering coordination, and site execution to ensure a seamless delivery from ground to roof.",
      price: "5,750,000",
      beds: "6",
      floor: "Ground + 1st + Roof",
      sqft: "10,800",
      keyFeatures: [
        "Curved façade elements",
        "Soft architectural lines",
        "Minimal palette",
        "Layered spaces",
      ],
      highlights: [
        { label: "Project Type", value: "Villa" },
        { label: "Under Construction", value: "2025" },
      ],
    },
    ar: {
      tags: ["إدارة المشاريع", "إشراف على البناء"],
      title: "الفيلا العضوية",
      address: "الوصل، دبي",
      description: "ملاذ هادئ من الفخامة البسيطة.",
      longDescription:
        "تقع الفيلا العضوية في قلب منطقة الوصل بدبي، وهي سكن خاص حديث يجمع بين الهدوء والنعومة والفخامة البسيطة. يتبنى التصميم لغة معمارية عضوية، مع حواف منحنية وتحولات طبيعية وتركيز على التدفق والسكينة. مستوحاة من مفهوم 'الأقل هو الأكثر'، تم تصور الفيلا كملاذ هادئ، يمزج بين الانفتاح والتحكم المكاني الراقي. تقود خالص نطاق إدارة المشروع بالكامل، حيث تشرف على التصميم والتنسيق الهندسي وتنفيذ الموقع لضمان تسليم سلس من الأساس إلى السقف.",
      price: "٥٬٧٥٠٬٠٠٠",
      beds: "٦",
      floor: "أرضي + أول + سطح",
      sqft: "١٠٬٨٠٠",
      keyFeatures: [
        "عناصر واجهة منحنية",
        "خطوط معمارية ناعمة",
        "ألوان بسيطة",
        "مساحات متدرجة",
      ],
      highlights: [
        { label: "نوع المشروع", value: "فيلا" },
        { label: "تحت الإنشاء", value: "٢٠٢٥" },
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
          </FilterContainer>
        </Header>

        <ProjectsGrid>
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                as={motion.div}
                key={project.id}
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
                    {/* The ProjectImage component now uses LazyImage */}
                    <ProjectImage
                      src={project.mainImage}
                      alt={project[language].title}
                      width={500}
                      height={500}
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

// --- STYLED COMPONENTS ---
const SectionWrapper = styled.section`
  /* ... styles remain the same ... */
  width: 100%;
  padding: 5rem 2rem;
  background-color: #fff;
  font-family: "Inter", sans-serif;
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
`;
const Container = styled.div`
  /* ... styles remain the same ... */
  max-width: 1200px;
  margin: 0 auto;
`;
const Header = styled.div`
  /* ... styles remain the same ... */
  margin: 0 auto 3rem auto;
`;
const Title = styled.h2`
  /* ... styles remain the same ... */
  text-align: center;
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1a1a1a;
`;
const FilterContainer = styled.div`
  /* ... styles remain the same ... */
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;
const FilterTabs = styled.div`
  /* ... styles remain the same ... */
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;
const FilterButton = styled.button`
  /* ... styles remain the same ... */
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
const ProjectsGrid = styled(motion.div)`
  /* ... styles remain the same ... */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2.5rem;
  align-items: stretch;
`;
const CardTitle = styled.h3`
  /* ... styles remain the same ... */
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.75rem 0;
  text-decoration: none;
  transition: color 0.2s ease;
`;
const Description = styled.p`
  /* ... styles remain the same ... */
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  text-decoration: none;
`;
const ProjectCard = styled(motion.div)`
  /* ... styles remain the same ... */
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    ${CardTitle}, ${Description} {
      text-decoration: underline;
      text-decoration-color: #a0a0a0;
    }
  }
`;
const ImageWrapper = styled.div`
  /* ... styles remain the same ... */
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
`;

// --- CHANGE 2: Base the styled component on LazyImage ---
const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  transition: transform 0.4s ease;
  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  /* ... styles remain the same ... */
  padding: 1.5rem;
  text-align: ${({ lang }) => (lang === "ar" ? "right" : "left")};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
const Tags = styled.p`
  /* ... styles remain the same ... */
  color: #66a109;
  font-weight: 500;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
`;

export default FeaturedProjects;
