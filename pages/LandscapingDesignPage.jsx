"use client";
import React, { useEffect, useState } from "react";
import InteriorDesign from "../components/InteriorDesign/InteriorDesign";
import OurProcessWork from "../components/OurProcessWork/OurProcessWork";
import { Row2, Column } from "../utils/Globalstyles";
import { GreenText, Title as Title2 } from "../components/Whoweare/TextContent";
import CTASection from "../components/Homecontact/CTASection";
import ProjectHighlight from "../components/Projecthighlights/ProjectHighlight";
import { useLanguage } from "../Context/Languagecontext"; // Import the language context
import dynamic from "next/dynamic";
import banner from "@/public/assets/banner/project.jpeg";
const HeroSlider = dynamic(() => import("@/components/Slider/Slider"));

const ProjectHighlightdata = {
  eng: [
    {
      Title: "Case Studies",
      button: "Get in touch with us",
      Subtitle: "Arabian Ranches Villa",
      Subheader: "Landscape Design",
      description: [
        "A villa in Arabian Ranches lacked a functional outdoor space. Although the family had children and enjoyed being outdoors, the backyard was underused and didn’t reflect their lifestyle. They wanted a garden that was family-friendly, practical, and visually appealing.",
        "The challenge was creating a multi-purpose garden that included play space for kids, relaxing seating areas, and water features, all while being mindful of irrigation, maintenance, and climate-adapted planting.",
        "We started with a clear layout focused on flow and comfort. Native, heat-tolerant plants were selected for sustainability. Covered lounge areas were integrated, and a mix of hardscaping and softscaping created balance. Ambient lighting was added to enhance the mood without excess energy use.",
        "The landscape was completed in six weeks with long-term durability and low maintenance in mind.",
        "The service covered full landscape design, plant selection, lighting, water elements, and execution with a practical and elegant approach.",
      ],
      mainimage: "https://placehold.co/400x300/aaaaaa/aaaaaa",
      images: [
        "https://placehold.co/400x300/aaaaaa/aaaaaa",
        "https://placehold.co/400x300/bbbbbb/bbbbbb",
        "https://placehold.co/400x300/cccccc/cccccc",
      ],
    },
  ],
  ar: [
    {
      Title: "دراسة المشروع",
      button: "تواصل معنا",
      Subtitle: "فيلا في المرابع العربية",
      Subheader: "تنسيق الحدائق",
      description: [
        "كانت فيلا في المرابع العربية تفتقر إلى لمسة طبيعية مميزة. المساحة الخارجية كانت بسيطة وغير مستغلة على النحو الأمثل، على الرغم من أن العائلة لديها أطفال ويحبون قضاء الوقت في الحديقة. كانوا يرغبون في حديقة عملية وجميلة ومناسبة للأجواء العائلية المفعمة بالحياة.",
        "تمثل التحدي في تصميم مساحة خضراء متعددة الاستخدامات، تجمع بذكاء بين منطقة لعب آمنة للأطفال، وجلسات أنيقة لاستقبال الضيوف، وممرات مائية هادئة تضفي جمالًا، مع الأخذ في الاعتبار نظام الري الفعال، وسهولة الصيانة، واختيار التشجير المناسب للظروف المناخية الصحراوية.",
        "بدأنا بوضع تصور لحديقة مريحة ولكنها غنية بالتفاصيل الجذابة. استخدمنا النباتات المحلية المعروفة بمقاومتها للحرارة، وأضفنا جلسات مريحة ومظللة، ودمجنا ببراعة بين الأرضيات الحجرية الأنيقة والمناطق المزروعة الخضراء لخلق توازن بصري مريح للعين. كما صممنا نظام إضاءة خارجية خافتة يضيف لمسة ساحرة للأجواء العامة دون استهلاك مفرط للطاقة.",
        "تم التنفيذ بدقة وإتقان خلال ستة أسابيع فقط، مع ضمان أن يكون كل عنصر عمليًا للاستخدام اليومي وسهل الصيانة على المدى الطويل.",
        "شملت خدمة تنسيق الحدائق الشاملة: التصميم المبتكر، واختيار النباتات الملائمة، وتصميم الإضاءة الجذابة، ودمج المسطحات المائية الهادئة، والتنفيذ الكامل بطريقة تجمع بين العملية والجمالية الراقية.",
      ],
      mainimage: "https://placehold.co/400x300/aaaaaa/aaaaaa",
      images: [
        "https://placehold.co/400x300/aaaaaa/aaaaaa",
        "https://placehold.co/400x300/bbbbbb/bbbbbb",
        "https://placehold.co/400x300/cccccc/cccccc",
      ],
    },
  ],
};
export const slides = {
  eng: [
    {
      id: 1,
      image: "https://i.ibb.co/kgQP8qQM/landsacpe.jpg",
      title: "Thoughtfully Designed Outdoor Spaces That Endure",
      content:
        "Creating and molding outdoor environments that complement your architecture, climate, and lifestyle.",
      button: "Start Your Project Today",
    },
  ],
  ar: [
    {
      id: 1,
      image: "https://i.ibb.co/kgQP8qQM/landsacpe.jpg",
      title: "مساحات خارجية مصممة بعناية لتدوم",
      content: "نخلق ونشكل بيئات خارجية تكمل عمارتك ومناخك وأسلوب حياتك.",
      button: "ابدأ مشروعك اليوم",
    },
  ],
};

const data = {
  eng: [
    {
      title: "Landscape Design ",
      subtitle: "Service",
      description1:
        "At Khales, landscape design is not an afterthought; it’s an essential part of the experience. We design outdoor spaces that are elegant, functional, and aligned with the architecture and environment around them.",
      description2:
        "From gardens and entrances to terraces and pool decks, our landscape team balances natural elements with built features to enhance usability, flow, and visual character. Every detail, from plant selection to lighting and materials, is tailored to your climate, space, and personal vision.",
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
      title: "خدمة تصميم ",
      subtitle: "المناظر الطبيعية",
      description1:
        "في خالص، تصميم المناظر الطبيعية ليس فكرة ثانوية، بل هو جزء أساسي من التجربة. نحن نصمم مساحات خارجية أنيقة وعملية ومتوافقة مع الهندسة المعمارية والبيئة المحيطة بها.",
      description2:
        "من الحدائق والمداخل إلى التراسات وأسطح المسابح، يوازن فريق المناظر الطبيعية لدينا بين العناصر الطبيعية والميزات المبنية لتعزيز قابلية الاستخدام والانسيابية والطابع البصري. يتم تصميم كل التفاصيل، من اختيار النباتات إلى الإضاءة والمواد، لتناسب مناخك ومساحتك ورؤيتك الشخصية.",
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
      title: "Site Assessment & Briefing",
      content:
        "We evaluate your outdoor space in relation to your architecture, sun exposure, wind, access, and views.",
    },
    {
      title: "Concept Design & Functional Layout",
      content:
        "We define the purpose of each area — seating, pathways, greenery, water features — and arrange them into a cohesive, usable plan.",
    },
    {
      title: "Planting Design & Material Selection",
      content:
        "We select plants and finishes that are climate-appropriate, low-maintenance, and visually aligned with the property’s identity.",
    },
    {
      title: "Technical Drawings & Coordination",
      content:
        "We prepare detailed landscape drawings for contractors, including levels, hardscape, planting, irrigation, and lighting.",
    },
    {
      title: "Authority Submissions (if applicable)",
      content:
        "We assist with municipality approvals if required — ensuring your landscape meets local guidelines.",
    },
    {
      title: "On-Site Supervision (Optional)",
      content:
        "We can support the implementation phase by reviewing shop drawings, material submittals, and site progress.",
    },
  ],
  ar: [
    {
      title: "تقييم الموقع وموجز المتطلبات",
      content:
        "نقوم بتقييم مساحتك الخارجية وعلاقتها بالهيكل المعماري، مع الأخذ في الاعتبار التعرض للشمس والرياح وسهولة الوصول والمناظر.",
    },
    {
      title: "تصميم المفهوم والتوزيع الوظيفي",
      content:
        "نحدد الغرض من كل منطقة — أماكن الجلوس، الممرات، المساحات الخضراء، المسطحات المائية — ونرتبها في خطة متماسكة وقابلة للاستخدام.",
    },
    {
      title: "تصميم الزراعة واختيار المواد",
      content:
        "نختار النباتات والتشطيبات التي تتناسب مع المناخ، وتتطلب صيانة منخفضة، وتتماشى بصريًا مع هوية العقار.",
    },
    {
      title: "المخططات الفنية والتنسيق",
      content:
        "نُعدّ رسومات تفصيلية للمناظر الطبيعية للمقاولين، تشمل المناسيب، والعناصر الصلبة، والزراعة، والري، والإضاءة.",
    },
    {
      title: "التقديم للجهات الحكومية (إن وجد)",
      content:
        "نساعد في الحصول على موافقات البلدية إذا لزم الأمر، مما يضمن أن المناظر الطبيعية الخاصة بك تفي بالإرشادات المحلية.",
    },
    {
      title: "الإشراف في الموقع (اختياري)",
      content:
        "يمكننا دعم مرحلة التنفيذ من خلال مراجعة المخططات التنفيذية، وتقديمات المواد، وتقدم العمل في الموقع.",
    },
  ],
};
const Faq = {
  eng: [
    {
      title: "Do you design small gardens or only full landscapes?",
      content:
        "We design all scales — from compact courtyards to full property masterplans.",
    },
    {
      title: "Can I request a low-maintenance or water-saving garden?",
      content:
        "Absolutely. We consider both aesthetic and maintenance needs when selecting plants and materials.",
    },
    {
      title: "Do you handle lighting and irrigation as well?",
      content:
        "Yes. These systems are included in our landscape design and coordinated with the rest of the project.",
    },
    {
      title: "Will my landscape be approved by authorities?",
      content:
        "If approvals are required in your area, we prepare the drawings according to UAE standards and assist with submission.",
    },
  ],
  ar: [
    {
      title: "هل تصممون حدائق صغيرة أم مناظر طبيعية كاملة فقط؟",
      content:
        "نحن نصمم على جميع المستويات، من الساحات المدمجة إلى المخططات الرئيسية الكاملة للعقارات.",
    },
    {
      title: "هل يمكنني طلب حديقة تتطلب صيانة منخفضة أو موفرة للمياه؟",
      content:
        "بالتأكيد. نأخذ في الاعتبار الاحتياجات الجمالية واحتياجات الصيانة عند اختيار النباتات والمواد.",
    },
    {
      title: "هل تتولون تصميم الإضاءة والري أيضًا؟",
      content:
        "نعم. يتم تضمين هذه الأنظمة في تصميم المناظر الطبيعية لدينا وتنسيقها مع بقية المشروع.",
    },
    {
      title: "هل سيتم اعتماد تصميم المناظر الطبيعية من قبل الجهات الحكومية؟",
      content:
        "إذا كانت الموافقات مطلوبة في منطقتك، فإننا نُعدّ المخططات وفقًا لمعايير الإمارات ونساعد في عملية التقديم.",
    },
  ],
};

const LandscapingDesignPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage(); // Assuming you have a language context
  const [isClient, setIsClient] = useState(false);

  // change metadata from client side
  useEffect(() => {
    document.title = `${
      language === "ar"
        ? "تصميم المناظر الطبيعية وتنسيق الحدائق"
        : "Landscaping"
    }`;
  }, [language]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  // Don't render anything during SSR

  return (
    <>
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
          {language === "ar" ? "الأسئلة الشائعة " : "Frequently Asked"}
          <GreenText>{language === "ar" ? "" : " Questions"}</GreenText>
        </Title2>

        <OurProcessWork panels={Faq[language]} />
      </Column>
      <CTASection />
    </>
  );
};

export default LandscapingDesignPage;
