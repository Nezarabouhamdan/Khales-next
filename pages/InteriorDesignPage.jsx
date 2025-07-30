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

export const slides = {
  eng: [
    {
      id: 1,
      image: "https://i.ibb.co/kgQP8qQM/landsacpe.jpg",
      title: "Elegant Interiors Designed with Purpose",
      content:
        "Creating spaces that reflect your lifestyle, align with your architecture, and stand the test of time.",
      button: "Book Appointment",
    },
  ],
  ar: [
    {
      id: 1,
      image: "https://i.ibb.co/kgQP8qQM/landsacpe.jpg",
      title: "تصاميم داخلية أنيقة مصممة لغرض",
      content:
        "نخلق مساحات تعكس نمط حياتك، وتنسجم مع عمارتك، وتصمد أمام اختبار الزمن.",
      button: "احجز موعدك الآن",
    },
  ],
};
const data = {
  eng: [
    {
      title: "Interior Design ",
      subtitle: "",
      description1:
        "Interior design at Khales is about more than selecting finishes; it’s about shaping how people live, feel, and experience space. Our interior designers work closely with clients to create interiors that are functional, refined, and aligned with the architectural identity of the project.",
      description2:
        "We handle everything from spatial planning and mood concepts to material selection and technical drawings. Whether for a private villa, commercial space, or full development, we ensure the design reflects both the client’s taste and the project’s context, while staying practical, buildable, and regulation-ready.",
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
      title: "التصميم الداخلي",
      subtitle: "",
      description1:
        "التصميم الداخلي في خالص هو أكثر من مجرد اختيار التشطيبات؛ إنه يتعلق بتشكيل كيفية عيش الناس وشعورهم وتجربتهم للمساحة. يعمل مصممونا الداخليون عن كثب مع العملاء لإنشاء تصميمات داخلية وظيفية ومصقولة ومتوافقة مع الهوية المعمارية للمشروع.",
      description2:
        "نتولى كل شيء من التخطيط المكاني ومفاهيم الأجواء إلى اختيار المواد والرسومات الفنية. سواء كان ذلك لفيلا خاصة أو مساحة تجارية أو مشروع تطوير كامل، فإننا نضمن أن التصميم يعكس ذوق العميل وسياق المشروع، مع الحفاظ على كونه عمليًا وقابلاً للبناء وجاهزًا للوائح.",
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
      title: "Client Brief & Lifestyle Understanding",
      content:
        "We begin by learning about your style, goals, and how each space will be used — function always comes first.",
    },
    {
      title: "Moodboard & Concept Development",
      content:
        "We translate your preferences into design direction — with curated references, material palettes, and layout studies.",
    },
    {
      title: "Space Planning & Layout Optimization",
      content:
        "We ensure flow, usability, and comfort by organizing space logically and in harmony with structure and light.",
    },
    {
      title: "Material & Finish Selection",
      content:
        "We help select the right materials, colors, textures, and finishes — balancing beauty, durability, and context.",
    },
    {
      title: "Technical Drawings & Joinery Details",
      content:
        "We produce detailed interior drawings (e.g., ceilings, elevations, joinery) ready for contractors and authority approvals.",
    },
    {
      title: "Design Supervision (Optional)",
      content:
        "We can also follow through with on-site visits, material submittal reviews, and built-work verification upon request.",
    },
  ],
  ar: [
    {
      title: "موجز العميل وفهم نمط الحياة",
      content:
        "نبدأ بالتعرف على أسلوبك وأهدافك، وكيف سيتم استخدام كل مساحة — الوظيفة تأتي دائمًا في المقام الأول.",
    },
    {
      title: "لوحة الإلهام وتطوير المفهوم",
      content:
        "نترجم تفضيلاتك إلى توجه تصميمي، من خلال مراجع منسقة، ولوحات مواد، ودراسات للتوزيع.",
    },
    {
      title: "تخطيط المساحات وتحسين التوزيع",
      content:
        "نضمن الانسيابية وسهولة الاستخدام والراحة من خلال تنظيم المساحة بشكل منطقي ومتناغم مع الهيكل والإضاءة.",
    },
    {
      title: "اختيار المواد والتشطيبات",
      content:
        "نساعد في اختيار المواد والألوان والخامات والتشطيبات المناسبة، مع تحقيق التوازن بين الجمال والمتانة والسياق.",
    },
    {
      title: "المخططات الفنية وتفاصيل الأعمال الخشبية",
      content:
        "نُعدّ رسومات داخلية مفصلة (مثل الأسقف، الواجهات، الأعمال الخشبية) جاهزة للمقاولين وموافقات الجهات الحكومية.",
    },
    {
      title: "الإشراف على التصميم (اختياري)",
      content:
        "يمكننا أيضًا المتابعة من خلال زيارات ميدانية، ومراجعة تقديمات المواد، والتحقق من الأعمال المنفذة عند الطلب.",
    },
  ],
};
const Faq = {
  eng: [
    {
      title:
        "Do you work with existing architectural layouts or only your own?",
      content:
        "We can design interiors for both — whether the architecture was done by Khales or by another firm.",
    },
    {
      title: "Can you help select furniture and decor too?",
      content:
        "Yes. We can advise or fully curate furniture and accessory selections, especially if we are involved during the fit-out phase.",
    },
    {
      title: "Do you submit drawings for authority approval?",
      content:
        "Yes. All technical drawings are prepared in line with UAE authority standards and submission formats.",
    },
    {
      title: "What kinds of interiors do you specialize in?",
      content:
        "We design for private villas, apartments, offices, and select commercial spaces — always tailored to the project and client lifestyle.",
    },
  ],
  ar: [
    {
      title: "هل تعملون على مخططات معمارية قائمة أم على تصاميمكم الخاصة فقط؟",
      content:
        "يمكننا تصميم الديكور الداخلي لكليهما، سواء تم التصميم المعماري بواسطة شركة خالص أو شركة أخرى.",
    },
    {
      title: "هل يمكنكم المساعدة في اختيار الأثاث والديكور أيضًا؟",
      content:
        "نعم. يمكننا تقديم المشورة أو تنسيق اختيارات الأثاث والإكسسوارات بالكامل، خاصة إذا كنا مشاركين في مرحلة التشطيب.",
    },
    {
      title: "هل تقدمون المخططات للحصول على موافقة الجهات الحكومية؟",
      content:
        "نعم. يتم إعداد جميع المخططات الفنية بما يتماشى مع معايير الجهات الحكومية في الإمارات وصيغ التقديم المعتمدة.",
    },
    {
      title: "ما هي أنواع التصاميم الداخلية التي تتخصصون فيها؟",
      content:
        "نصمم للفلل الخاصة، والشقق، والمكاتب، ومساحات تجارية مختارة، مع الحرص دائمًا على أن يكون التصميم مخصصًا للمشروع ونمط حياة العميل.",
    },
  ],
};

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
