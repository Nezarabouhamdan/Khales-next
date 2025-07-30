"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useLanguage } from "@/Context/Languagecontext";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer New/Footer";

// --- Consolidated Data (CHANGED: All descriptions shortened to ~15 words) ---

// --- Consolidated Data (CHANGED: The 'path' for each service now points to your static routes) ---
const servicesData = {
  "project-management": {
    eng: {
      title: "Project Management Services",
      intro:
        "Our project management services ensure your vision is realized with clarity, efficiency, and accountability. From initial planning to final handover, we provide expert oversight to keep your project on schedule, within budget, and to the highest standards of quality.",
    },
    ar: {
      title: "خدمات إدارة المشاريع",
      intro:
        "تضمن خدماتنا في إدارة المشاريع تحقيق رؤيتك بوضوح وكفاءة ومساءلة. من التخطيط الأولي إلى التسليم النهائي، نقدم إشرافًا متخصصًا للحفاظ على مشروعك ضمن الجدول الزمني والميزانية المحددة، وبأعلى معايير الجودة.",
    },
    subServices: [
      {
        slug: "360-project-management",
        path: "/ProjectManagement", // <-- CORRECTED PATH
        image: "https://i.ibb.co/jZBcL9d6/1-Banner-360.jpg",
        eng: {
          title: "360° Project Management",
          description:
            "A complete, end-to-end solution managing your project from initial concept to final handover.",
        },
        ar: {
          title: "إدارة المشاريع الشاملة (360°)",
          description:
            "حل متكامل وشامل لإدارة مشروعك من الفكرة الأولية حتى التسليم النهائي.",
        },
      },
      {
        slug: "project-manager-service",
        path: "/ProjectManager", // <-- CORRECTED PATH
        image: "https://i.ibb.co/zWKzr7cR/3-Banner-PM.jpg",
        eng: {
          title: "Project Manager Service",
          description:
            "Your official representative, overseeing all teams to ensure your project stays on track.",
        },
        ar: {
          title: "خدمة مدير المشروع",
          description:
            "ممثلكم الرسمي، يشرف على جميع الفرق لضمان بقاء مشروعكم على المسار الصحيح.",
        },
      },
      {
        slug: "feasibility-study",
        path: "/Projectfeasability", // <-- CORRECTED PATH (Note the spelling 'feasability')
        image: "https://i.ibb.co/WWw0FNK7/7-Banner-Feasibility.jpg",
        eng: {
          title: "Feasibility Study",
          description:
            "Evaluating if your project is achievable, profitable, and aligned with budget and regulations.",
        },
        ar: {
          title: "دراسة الجدوى",
          description:
            "تقييم ما إذا كان مشروعك قابلاً للتحقيق ومربحًا ومتوافقًا مع الميزانية واللوائح.",
        },
      },
      {
        slug: "development-planning",
        path: "/Developmentplanning", // <-- CORRECTED PATH
        image: "https://i.ibb.co/j93MLS7t/5-Banner-Development.jpg",
        eng: {
          title: "Development Planning",
          description:
            "Turning a raw plot of land into a viable project with a clear, regulation-aligned plan.",
        },
        ar: {
          title: "التخطيط التطويري",
          description:
            "تحويل قطعة أرض خام إلى مشروع قابل للتطبيق بخطة واضحة ومتوافقة مع الأنظمة.",
        },
      },
    ],
  },
  "engineering-consultancy": {
    eng: {
      title: "Engineering Consultancy Services",
      intro:
        "Our engineering team provides the technical foundation for projects that are safe, compliant, and built to last. We translate creative vision into practical, buildable solutions, ensuring every detail is meticulously planned and executed.",
    },
    ar: {
      title: "خدمات الاستشارات الهندسية",
      intro:
        "يوفر فريقنا الهندسي الأساس الفني للمشاريع لتكون آمنة ومتوافقة ومصممة لتدوم. نترجم الرؤية الإبداعية إلى حلول عملية قابلة للتنفيذ، مع ضمان تخطيط وتنفيذ كل التفاصيل بدقة.",
    },
    subServices: [
      {
        slug: "engineering-design",
        path: "/EngineeringDesign", // <-- CORRECTED PATH
        image: "https://i.ibb.co/1f92NM3V/eng.jpg",
        eng: {
          title: "Engineering Design",
          description:
            "Providing all technical documents and calculations to take your project from vision to construction.",
        },
        ar: {
          title: "التصميم الهندسي",
          description:
            "توفير جميع المستندات الفنية والحسابات اللازمة لنقل مشروعك من الرؤية إلى البناء.",
        },
      },
      {
        slug: "engineering-supervision",
        path: "/EngineeringSupervision", // <-- CORRECTED PATH
        image: "https://i.ibb.co/fGNXpJH0/3-Banner-Site-Supervision.jpg",
        eng: {
          title: "Engineering Supervision",
          description:
            "Hands-on technical monitoring to ensure work is executed per approved drawings and regulations.",
        },
        ar: {
          title: "الإشراف الهندسي",
          description:
            "مراقبة فنية عملية لضمان تنفيذ العمل وفقًا للمخططات المعتمدة واللوائح التنظيمية.",
        },
      },
      {
        slug: "interior-design",
        path: "/InteriorDesign", // <-- CORRECTED PATH
        image: "https://i.ibb.co/7bNq3fN/landscape-card.jpg",
        eng: {
          title: "Interior Design",
          description:
            "Shaping how people live and experience a space with functional and refined interiors.",
        },
        ar: {
          title: "التصميم الداخلي",
          description:
            "تشكيل كيفية عيش الناس وتجربتهم للمساحة بتصميمات داخلية وظيفية ومصقولة.",
        },
      },
      {
        slug: "landscape-design",
        path: "/LandscapingDesign", // <-- CORRECTED PATH
        image: "https://i.ibb.co/7bNq3fN/landscape-card.jpg",
        eng: {
          title: "Landscape Design",
          description:
            "Designing elegant and functional outdoor spaces that balance nature with built features.",
        },
        ar: {
          title: "تصميم المناظر الطبيعية",
          description:
            "تصميم مساحات خارجية أنيقة وعملية توازن بين الطبيعة والعناصر المبنية.",
        },
      },
    ],
  },
};
// --- STYLED COMPONENTS (Changes are here ▼▼▼) ---
const PageWrapper = styled(motion.main)`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: #333;
`;
const HeaderSection = styled(motion.header)`
  text-align: center;
  margin-bottom: 4rem;
  direction: ${({ $rtl }) => ($rtl ? "rtl" : "ltr")};
`;
const PageTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1a1a1a;
`;
const PageIntro = styled(motion.p)`
  font-size: 1.125rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.7;
  color: #555;
`;
const ServicesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
`;
const ServiceCard = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;

  // --- CHANGED: Taller aspect ratio ---
  aspect-ratio: 4 / 3;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;
const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: transform 0.4s ease;
  ${ServiceCard}:hover & {
    transform: scale(1.05);
  }
`;
const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 30%, transparent);
  color: white;
  z-index: 2;
  direction: ${({ $rtl }) => ($rtl ? "rtl" : "ltr")};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const CardTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
const CardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
  opacity: 0.9;
`;
const CardLink = styled.span`
  font-weight: bold;
  color: #66a109;
  display: inline-block;
  transition: transform 0.2s ease;
  align-self: flex-start;
  ${ServiceCard}:hover & {
    transform: translateX(${({ $rtl }) => ($rtl ? "-5px" : "5px")});
  }
`;

// --- Framer Motion Variants (No changes) ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// --- Main Page Component (No changes) ---
export default function ServiceCategoryPage({ params }) {
  const { language } = useLanguage();
  const rtl = language === "ar";
  const { category } = params;
  const categoryData = servicesData[category];

  if (!categoryData) {
    notFound();
  }

  const langData = categoryData[language];
  const learnMoreText = rtl ? "اعرف المزيد ←" : "Learn More →";

  return (
    <>
      <Navbar />{" "}
      <PageWrapper variants={containerVariants} initial="hidden" animate="show">
        <HeaderSection $rtl={rtl} variants={itemVariants}>
          <PageTitle>{langData.title}</PageTitle>
          <PageIntro>{langData.intro}</PageIntro>
        </HeaderSection>
        <ServicesGrid>
          {categoryData.subServices.map((service) => (
            <motion.div key={service.slug} variants={itemVariants}>
              <ServiceCard href={service.path}>
                <CardImage src={service.image} />
                <CardContent $rtl={rtl}>
                  <div>
                    <CardTitle>{service[language].title}</CardTitle>
                    <CardDescription>
                      {service[language].description}
                    </CardDescription>
                  </div>
                  <CardLink $rtl={rtl}>{learnMoreText}</CardLink>
                </CardContent>
              </ServiceCard>
            </motion.div>
          ))}
        </ServicesGrid>
      </PageWrapper>
      <Footer />
    </>
  );
}
