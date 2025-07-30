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
export const slides = {
  eng: [
    {
      id: 1,
      image: "https://i.ibb.co/WWw0FNK7/7-Banner-Feasibility.jpg",
      title: "Know the Potential Before You Build",
      content:
        "Helping you assess if your project makes sense — financially, functionally, and within your timeline.",
      button: "Start Your Project Today",
    },
  ],
  ar: [
    {
      id: 1,
      image: "https://i.ibb.co/WWw0FNK7/7-Banner-Feasibility.jpg",
      title: "اعرف إمكانيات مشروعك قبل أن تبدأ بالبناء",
      content:
        "نساعدك على تقييم ما إذا كان مشروعك منطقيًا من الناحية المالية والوظيفية وضمن جدولك الزمني.",
      button: "ابدأ مشروعك اليوم",
    },
  ],
};
const data = {
  eng: [
    {
      title: "Feasibility Study ",
      subtitle: "Service",
      description1:
        "A great idea is not always a viable project; that is where our Feasibility Study comes in. Before you invest in land, design, or construction, we help you evaluate whether the project is achievable, profitable, and aligned with your budget, site conditions, and regulatory framework.",
      description2:
        "Khales' team reviews all key factors: land potential, design requirements, authority constraints, estimated costs, and timeframes. We then prepare a clear, data-backed summary of your project’s risks, strengths, and practical next steps, so you can move forward with clarity and confidence.",
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
      title: "خدمة دراسة ",
      subtitle: "الجدوى",
      description1:
        "الفكرة العظيمة ليست دائمًا مشروعًا قابلاً للتطبيق، وهنا يأتي دور دراسة الجدوى التي نقدمها. قبل أن تستثمر في الأرض أو التصميم أو البناء، نساعدك على تقييم ما إذا كان المشروع قابلاً للتحقيق ومربحًا ومتوافقًا مع ميزانيتك وظروف الموقع والإطار التنظيمي.",
      description2:
        "يراجع فريق خالص جميع العوامل الرئيسية: إمكانيات الأرض، ومتطلبات التصميم، وقيود الجهات الحكومية، والتكاليف التقديرية، والجداول الزمنية. بعد ذلك، نُعدّ ملخصًا واضحًا مدعومًا بالبيانات لمخاطر مشروعك ونقاط قوته وخطواته العملية التالية، حتى تتمكن من المضي قدمًا بوضوح وثقة.",
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
      title: "Project Objective Review",
      content:
        "We begin by understanding what you want to build, why, and what your targets are — financial, functional, or strategic.",
    },
    {
      title: "Site & Location Analysis",
      content:
        "We assess site constraints, access, zoning, exposure, and local market dynamics.",
    },
    {
      title: "Design & Regulatory Considerations",
      content:
        "We study what’s allowed, what design challenges may arise, and what approvals will be required.",
    },
    {
      title: "Budget & Cost Estimate",
      content:
        "We develop a high-level cost estimate, factoring in design, construction, approvals, and key risks.",
    },
    {
      title: "Timeline Mapping",
      content:
        "We provide a realistic delivery timeline, including design, permitting, and construction phases.",
    },
    {
      title: "Viability Report",
      content:
        "You receive a full summary of findings — with a clear go/no-go recommendation and action plan.",
    },
  ],
  ar: [
    {
      title: "مراجعة أهداف المشروع",
      content:
        "نبدأ بفهم ما تريد بناءه، والسبب وراء ذلك، وما هي أهدافك — سواء كانت مالية أو وظيفية أو استراتيجية.",
    },
    {
      title: "تحليل الموقع والمنطقة",
      content:
        "نقوم بتقييم قيود الموقع، وسهولة الوصول إليه، والتصنيف، والرؤية، وديناميكيات السوق المحلي.",
    },
    {
      title: "اعتبارات التصميم واللوائح التنظيمية",
      content:
        "ندرس ما هو مسموح به، وما هي تحديات التصميم التي قد تظهر، وما هي الموافقات التي ستكون مطلوبة.",
    },
    {
      title: "الميزانية وتقدير التكاليف",
      content:
        "نضع تقديرًا عالي المستوى للتكاليف، مع الأخذ في الاعتبار التصميم، والبناء، والموافقات، والمخاطر الرئيسية.",
    },
    {
      title: "وضع الجدول الزمني",
      content:
        "نقدم جدولًا زمنيًا واقعيًا للتسليم، يشمل مراحل التصميم، والحصول على التصاريح، والبناء.",
    },
    {
      title: "تقرير الجدوى",
      content:
        "تتلقى ملخصًا كاملاً للنتائج — مع توصية واضحة بالمتابعة أو عدمها وخطة عمل للمضي قدمًا.",
    },
  ],
};
const Faq = {
  eng: [
    {
      title: "Who needs a feasibility study?",
      content:
        "Anyone considering a new project — villa owners, landowners, investors, or developers — should do this before committing large time or capital.",
    },
    {
      title: "Does this include financial returns or ROI projections?",
      content:
        "Yes. For investment-oriented projects, we can include basic return projections, sale/rental values, or holding cost scenarios.",
    },
    {
      title: "Will you help move forward if the project is viable?",
      content:
        "Absolutely. If the study shows green lights, we can continue with design, approvals, and full project management.",
    },
    {
      title: "How accurate are the cost and timeline estimates?",
      content:
        "They are based on current market conditions and Khales’ experience across the UAE — offering a realistic early-stage forecast.",
    },
  ],
  ar: [
    {
      title: "من يحتاج إلى دراسة جدوى؟",
      content:
        "أي شخص يفكر في مشروع جديد — سواء كان مالك فيلا، أو مالك أرض، أو مستثمر، أو مطور عقاري — يجب أن يقوم بهذه الدراسة قبل الالتزام بوقت أو رأس مال كبير.",
    },
    {
      title: "هل تشمل الدراسة توقعات العوائد المالية أو العائد على الاستثمار؟",
      content:
        "نعم. للمشاريع ذات التوجه الاستثماري، يمكننا تضمين توقعات العوائد الأساسية، أو قيم البيع/الإيجار، أو سيناريوهات تكاليف الاحتفاظ.",
    },
    {
      title: "هل تساعدون في المضي قدمًا إذا كان المشروع مجديًا؟",
      content:
        "بالتأكيد. إذا أظهرت الدراسة نتائج إيجابية، يمكننا المتابعة بالتصميم، والحصول على الموافقات، وإدارة المشروع بالكامل.",
    },
    {
      title: "ما مدى دقة تقديرات التكلفة والجدول الزمني؟",
      content:
        "تستند تقديراتنا إلى ظروف السوق الحالية وخبرة شركة خالص في جميع أنحاء الإمارات، مما يوفر توقعات واقعية للمراحل المبكرة.",
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
          <img
            width={"300px"}
            src={"https://i.ibb.co/YB8KsmD5/8-Process-Feasibility.jpg"}
            alt="Process Work"
          />
        </Row2>
        {/* <ProjectHighlight data={ProjectHighlightdata[language]} /> */}

        <Title2>
          {language === "ar" ? "الأسئلة الشائعة " : "Frequently Asked"}
          <GreenText>{language === "ar" ? "" : " Questions"}</GreenText>
        </Title2>

        <OurProcessWork panels={Faq[language]} />
      </Column>
      <CTASection />
    </div>
  );
}

export default Projectstudy;
