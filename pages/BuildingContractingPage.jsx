"use client";
import React, { useEffect, useState } from "react";
import InteriorDesign from "../components/InteriorDesign/InteriorDesign";
import OurProcessWork from "../components/OurProcessWork/OurProcessWork";
import { Row2, Column } from "../utils/Globalstyles";
// import img from "../assets/4.png";
// import img2 from "../assets/Black White Tan Minimal Bold FAQ Search Bar Instagram Story.png";
import { GreenText, Title as Title2 } from "../components/Whoweare/TextContent";
import CTASection from "../components/Homecontact/CTASection";
import ProjectHighlight from "../components/Projecthighlights/ProjectHighlight";
import { useLanguage } from "../Context/Languagecontext"; // Import the language context
import dynamic from "next/dynamic";
import banner from "@/public/assets/banner/project.jpeg";
import styled from "styled-components";
const HeroSlider = dynamic(() => import("@/components/Slider/Slider"));
const slides = {
  eng: [
    {
      id: 1,
      image:
        "https://i.ibb.co/DPKhyq7k/khales-ae-real-photograph-of-a-super-luxury-modern-mansion-fr-c2c57d33-5a47-4ccb-b054-498b16745d23-3.png",
      title: "Make confident decisions with data-driven insights.",
      content: "Your roadmap to smarter investments.",
      button: "Start You Project Today",
    },
  ],
  ar: [
    {
      id: 1,
      image:
        "https://i.ibb.co/DPKhyq7k/khales-ae-real-photograph-of-a-super-luxury-modern-mansion-fr-c2c57d33-5a47-4ccb-b054-498b16745d23-3.png",
      title: "اتخذ قرارات واثقة مبنية على تحليلات دقيقة مدعومة بالبيانات.",
      content: "خارطة طريقك نحو استثمارات أكثر ذكاءً.",
      button: " ابدأ مشروعك اليوم",
    },
  ],
};

const data = {
  eng: [
    {
      title: "Project Feasibility  ",
      subtitle: "Study Service",
      description1:
        "A feasibility study is more than just a report—it’s a decision-making tool that helps you assess whether a project is worth pursuing.",
      description2:
        ". At Khales, we conduct comprehensive feasibility studies that evaluate the financial, technical, operational, and market viability of your project. We help you understand risks, identify opportunities, and build the foundation for long-term success.",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ee56b6848a5668fe4c1e75c526f9ae88908da749",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/83d057c657e643f783b5365240986c54a25d86a4",
        "https://brabbu.com/blog/wp-content/uploads/2021/02/Aati-tayer-dubai.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2d1c74189930427.65b294ce482ca.jpg",
      ],
    },
  ],
  ar: [
    {
      title: "خدمة دراسة",
      subtitle: "جدوى المشروع",
      description1:
        "دراسة الجدوى ليست مجرد تقرير، بل أداة تساعدك في اتخاذ القرار الصحيح بشأن مشروعك.",
      description2:
        "في خالص، نقوم بإعداد دراسات جدوى شاملة تُقيّم الجوانب المالية، الفنية، التشغيلية، والسوقية لأي مشروع. نساعدك على فهم المخاطر، اكتشاف الفرص، وبناء أساس قوي للنجاح المستدام.",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ee56b6848a5668fe4c1e75c526f9ae88908da749",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/83d057c657e643f783b5365240986c54a25d86a4",
        "https://brabbu.com/blog/wp-content/uploads/2021/02/Aati-tayer-dubai.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2d1c74189930427.65b294ce482ca.jpg",
      ],
    },
  ],
};

const process = {
  eng: [
    {
      title: "Project Understanding & Consultation",
      content:
        "We begin by learning about your goals, challenges, and expectations. Our team gathers all required inputs before moving into deeper market and business analysis.",
    },
    {
      title: "Market & Industry Research",
      content:
        "We analyze demand, competition, pricing, and audience behavior to assess the viability and potential of your idea.",
    },
    {
      title: "Financial & Technical Analysis",
      content:
        "We estimate capital and operational costs, revenue projections, and investment returns. Technical feasibility, including logistics and infrastructure, is also assessed.",
    },
    {
      title: "Alternatives & Risk Planning",
      content:
        "We explore different development options and identify potential risks, along with strategies to mitigate them.",
    },
    {
      title: "Conclusion & Recommendations",
      content:
        "You’ll receive a complete, clear summary that outlines whether the project is feasible and how to best proceed.",
    },
  ],
  ar: [
    {
      title: "فهم المشروع والاستشارة الأولية",
      content:
        "نبدأ بفهم أهدافك وتحدياتك وتوقعاتك. يجمع فريقنا كل المعلومات الأساسية قبل الانتقال إلى التحليل الفني والسوقي.",
    },
    {
      title: "بحث السوق والقطاع",
      content:
        "نقوم بتحليل العرض والطلب، التسعير، سلوك الجمهور، والمنافسة لفهم إمكانات المشروع",
    },
    {
      title: "التحليل المالي والفني",
      content:
        "نقدّر التكاليف الرأسمالية والتشغيلية، العائد على الاستثمار، وندرس الجوانب الفنية مثل البنية التحتية والعمليات.",
    },
    {
      title: "دراسة البدائل وتخطيط المخاطر",
      content:
        "نقترح حلول بديلة ونحدّد المخاطر المحتملة مع تقديم خطط للحد منها.",
    },
    {
      title: " التوصيات النهائية ",
      content:
        "نقدّم ملخصًا واضحًا يحدد مدى جدوى المشروع مع خطوات وتوصيات تنفيذية للمضي قدمًا.",
    },
  ],
};
const Faq = {
  eng: [
    {
      title: "Who should get a feasibility study?",
      content:
        "Real estate developers, startups, nonprofits, and investors planning a new venture or assessing land potential.",
    },
    {
      title: "How long does a feasibility study take?",
      content: "Typically 20–24 days depending on project size and scope.",
    },
    {
      title: "Can it help secure funding?",
      content:
        "Yes. Many clients use our studies to pitch to banks, investors, or government entities.",
    },
    {
      title: "Can you handle both small and large-scale projects?",
      content:
        "Absolutely. Whether it’s a small villa or a large commercial complex, we tailor our services to meet the scale and scope of your project.",
    },
    {
      title: "Is it fully customized?",
      content:
        "Absolutely. Each report is tailored to your specific location, industry, and goals.",
    },
    {
      title: "Do you offer fast-track delivery?",
      content: "Yes, expedited timelines are available upon request.",
    },
  ],
  ar: [
    {
      title: "من يحتاج إلى دراسة جدوى؟",
      content:
        "المطورون العقاريون، رواد الأعمال، الجهات غير الربحية، والمستثمرون الذين يخططون لمشاريع جديدة أو تقييم أراضٍ.",
    },
    {
      title: " كم تستغرق دراسة الجدوى؟",
      content: "تستغرق الدراسة عادة من ٢٠ إلى ٢٤ يومًا حسب حجم المشروع.",
    },
    {
      title: " هل تساعد في تأمين تمويل؟",
      content:
        "نعم، يستخدمها العديد من عملائنا للحصول على تمويل من بنوك أو جهات استثمارية أو حكومية.",
    },
    {
      title: "هل الدراسة مخصصة حسب المشروع؟",
      content:
        "بالتأكيد. يتم تخصيص كل دراسة وفقًا للقطاع، والموقع، والأهداف الخاصة بك.",
    },
    {
      title: "هل تقدمون حلول بناء مستدامة؟",
      content:
        "نعم، ندمج حلول البناء المستدام باستخدام مواد صديقة للبيئة وتقنيات موفرة للطاقة، بما يتماشى مع رؤية دولة الإمارات في الحفاظ على البيئة.",
    },
    {
      title: "هل تقدمون خدمة التسليم السريع؟ ",
      content: "نعم، يمكننا توفير خدمة عاجلة عند الطلب",
    },
  ],
};

const ProjectHighlightdata = {
  eng: [
    {
      Title: " Case Studies",
      button: " Get in touch with us",

      Subtitle: "Sharjah Residential Compound",
      Subheader: "A Turnkey Success Story",
      description: [
        "A landowner in Sharjah was unsure whether to develop a residential community or hold the property. There were concerns about zoning, costs, and buyer demand.",
        "We conducted a full feasibility study covering land analysis, design options, construction phases, cost estimates, and ROI projections. We also assessed market demand based on buyer trends and neighborhood competition.",
        "The study showed phased development was viable and allowed the client to secure approvals and attract potential investors confidently.",
      ],
      mainimage: "https://placehold.co/400x300/eeeeee/eeeeee",
      images: [
        "https://placehold.co/400x300/eeeeee/eeeeee",
        "https://placehold.co/400x300/ffffff/ffffff",
        "https://placehold.co/400x300/8b4513/8b4513",
      ],
    },
  ],
  ar: [
    {
      Title: " دراسة المشروع",
      button: "تواصل معنا",
      Subtitle: "مجمّع سكني في الشارقة",
      Subheader: "قصة نجاح مفتاح في اليد",
      description: [
        "كان لدى مالك أرض في الشارقة تردّد بشأن تطوير مجمّع سكني أو الاحتفاظ بالعقار. كانت هناك مخاوف تتعلق بالتصاريح، التكاليف، ومدى إقبال السوق.",
        "قمنا بإعداد دراسة جدوى شاملة تضمنت تحليل الموقع، خيارات التصميم، مراحل البناء، التكاليف، والعوائد المحتملة. كما حللنا طلب السوق بناءً على سلوك المشترين والمنافسة في المنطقة.",
        "أظهرت الدراسة أن التطوير المرحلي مجدٍ، مما مكّن العميل من الحصول على الموافقات وجذب المستثمرين بكل ثقة",
      ],
      mainimage: "https://placehold.co/400x300/eeeeee/eeeeee",
      images: [
        "https://placehold.co/400x300/eeeeee/eeeeee",
        "https://placehold.co/400x300/ffffff/ffffff",
        "https://placehold.co/400x300/8b4513/8b4513",
      ],
    },
  ],
};

export const Column2 = styled.div`
  display: flex;
  width: ${({ rtl }) => (rtl ? "38vw" : "70vw")};
  flex-direction: column;
  margin-top: 30%;
  @media (max-width: 1200px) {
    width: 40vw;
    margin-right: 00px;
  }
  @media (max-width: 968px) {
    height: 50vh;
    margin-top: -15%;
    justify-content: flex-end;
    align-items: flex-end;
    align-content: flex-end;
    width: 100vw;

    margin-right: 0;
  }
`;

function Projectstudy() {
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage(); // Assuming you have a language context

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <section id="hero" aria-label="hero">
        <HeroSlider
          slides={slides[language] || slides["eng"]}
          language={language}
          isLoading={isLoading}
          rtl={language === "ar"}
        />{" "}
      </section>

      <InteriorDesign data={data[language]} />
      <Column>
        <Title2>
          {language === "ar" ? "عملية عملنا" : "Our Process"}
          <GreenText>{language === "ar" ? "" : " Work"}</GreenText>
        </Title2>
        <Row2
          rtl={language === "ar"}
          style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}
        >
          <OurProcessWork panels={process[language]} />
          <img width={"300px"} src={"/assets/4.png"} alt="Process Work" />
        </Row2>
        {/* <ProjectHighlight data={ProjectHighlightdata[language]} /> */}

        <Title2>
          {language === "ar" ? "الأسئلة الشائعة" : "Frequently Asked"}
          <GreenText>{language === "ar" ? "" : " Questions"}</GreenText>
        </Title2>

        <OurProcessWork panels={Faq[language]} />
      </Column>
      <CTASection />
    </div>
  );
}

export default Projectstudy;
