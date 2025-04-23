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
const HeroSlider = dynamic(() => import("@/components/Slider/Slider"));

export const slides = {
  eng: [
    {
      id: 1,
      image: "https://i.ibb.co/W4CfS4wX/project.jpg",
      title: "Efficient Project Management for Success",
      content: "Delivering seamless projects from concept to completion",
      button: "Let’s Get Started",
    },
  ],
  ar: [
    {
      id: 1,
      image: "https://i.ibb.co/W4CfS4wX/project.jpg",
      title: "إدارة مشاريع فعالة لتحقيق النجاح",
      content: "تنفيذ مشاريع متكاملة من الفكرة إلى الإنجاز",
      button: "لنبدأ الآن",
    },
  ],
};
const data = {
  eng: [
    {
      title: " Project Management ",
      subtitle: "Services",
      description1:
        "At Khales Project Management, we don't just manage projects—we deliver end-to-end solutions that transform your vision into reality. From strategic planning to execution and final handover, our expert team ensures that your projects are completed on time, within budget, and to the highest standards. Whether it’s a construction project, infrastructure development, or a complex industrial initiative, we provide turnkey solutions that drive success and exceed expectations",
      description2:
        "Our approach combines industry expertise, cutting-edge tools, and a commitment to precision and innovation. We work closely with you to understand your goals, anticipate challenges, and deliver results that align with your vision. With a focus on quality, efficiency, and sustainability, we ensure your project not only meets but surpasses its objectives.",
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
      title: " خدمات إدارة",
      subtitle: "المشاريع",

      description1:
        "في خالص لإدارة المشاريع، لا نقتصر على إدارة المشاريع فقط، بل نقدم حلولًا شاملة تحول رؤيتك إلى واقع ملموس. من التخطيط الاستراتيجي إلى التنفيذ والتسليم النهائي، يضمن فريقنا الخبير إتمام مشاريعك في الوقت المحدد، وضمن الميزانية، ووفقًا لأعلى المعايير. سواء كان مشروعًا إنشائيًا، أو تطويرًا للبنية التحتية، أو مبادرة صناعية معقدة، نقدم حلولًا متكاملة تدفع بالنجاح وتتجاوز التوقعات.",
      description2:
        "يجمع نهجنا بين الخبرة الصناعية، والأدوات المتطورة، والالتزام بالدقة والابتكار. نعمل معكم عن كثب لفهم أهدافكم، وتوقع التحديات، وتقديم نتائج تتوافق مع رؤيتكم. مع التركيز على الجودة، والكفاءة، والاستدامة، نضمن أن مشروعكم لا يلبي الأهداف فحسب، بل يتجاوزها.",
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
      title: "Strategic Planning & Consultation",
      content:
        "Every successful project starts with a clear vision. Our process begins with in-depth consultations where we listen to your ideas, objectives, and challenges. Through thorough analysis and discussion, we develop a customized project plan that serves as the foundation for successful execution. This phase ensures that all aspects are meticulously planned to achieve maximum clarity and efficiency.\nKey Elements:\nVision & Goal Setting: Understanding your project ambitions.\nFeasibility Studies: Evaluating technical and financial viability.\nRisk Assessment & Mitigation: Identifying potential challenges and developing contingency plans.\nProject Blueprint: Crafting a detailed project roadmap to ensure seamless execution",
    },
    {
      title: "Design & Development",
      content:
        "We translate your vision into reality through innovative design and precise development. Our team of experts utilizes advanced technology to create sustainable designs that balance aesthetic appeal with functionality. From material selection to custom architectural details, every aspect is thoughtfully designed to meet your unique needs.\nKey Elements:\nConceptual Design: Crafting visual representations and blueprints.\nSustainable Materials: Selecting eco-friendly and durable options.\nCollaborative Approach: Involving stakeholders at every step.\nInnovation & Precision: Ensuring cutting-edge solutions with meticulous attention to detail.",
    },
    {
      title: "Execution & Monitoring",
      content:
        "With the design phase complete, our dedicated team takes over to execute the project with unwavering commitment to quality. We manage resource allocation, timeline adherence, and quality control through real-time monitoring. Our project managers coordinate every aspect of construction, from procurement to installation, to guarantee seamless progress.\nKey Elements:\nEfficient Resource Management: Allocating materials and manpower.\nContinuous Monitoring: Keeping track of progress with regular updates.\nProactive Problem Solving: Addressing issues before they escalate.\nQuality Assurance: Adhering to the highest standards in every detail.",
    },
    {
      title: "Delivery & Evaluation",
      content:
        "We don’t just finish projects; we perfect them. Upon completion, our team conducts comprehensive evaluations to verify that every element meets our rigorous standards of excellence. We perform post-completion inspections, client walkthroughs, and performance assessments to ensure that your investment continues to deliver long-lasting value.\nKey Elements:\nFinal Inspections: Ensuring compliance with standards.\nClient Satisfaction: Walking through the finished project to verify satisfaction.\nPerformance Analysis: Assessing the efficiency and functionality of the project.\nMaintenance Recommendations: Providing guidance on upkeep and optimization.",
    },
  ],
  ar: [
    {
      title: "التخطيط الاستراتيجي والاستشارة",
      content:
        "بدأ كل مشروع ناجح برؤية واضحة. تبدأ عمليتنا باستشارات متعمقة نستمع فيها إلى أفكاركم، وأهدافكم، وتحدياتكم. من خلال التحليل والمناقشة الشاملة، نطور خطة مشروع مخصصة تعمل كأساس للتنفيذ الناجح. تضمن هذه المرحلة التخطيط الدقيق لجميع الجوانب لتحقيق أقصى قدر من الوضوح والكفاءة.\nالعناصر الرئيسية:\nتحديد الرؤية والأهداف: فهم طموحات مشروعكم.\nدراسات الجدوى: تقييم الجدوى الفنية والمالية.\nتقييم المخاطر والتخفيف: تحديد التحديات المحتملة ووضع خطط الطوارئ.\nمخطط المشروع: وضع خارطة طريق تفصيلية للمشروع لضمان التنفيذ السلس.",
    },
    {
      title: "التصميم والتطوير",
      content:
        "نحول رؤيتكم إلى واقع من خلال التصميم المبتكر والتطوير الدقيق. يستخدم فريق الخبراء لدينا التكنولوجيا المتقدمة لإنشاء تصاميم مستدامة توازن بين الجمال الوظيفي. من اختيار المواد إلى التفاصيل المعمارية المخصصة، يتم تصميم كل جانب بعناية لتلبية احتياجاتكم الفريدة.\nالعناصر الرئيسية:\nالتصميم المفاهيمي: وضع تصورات وخرائط بصرية.\nالمواد المستدامة: اختيار خيارات صديقة للبيئة ومتينة.\nالنهج التعاوني: إشراك أصحاب المصلحة في كل خطوة.\nالابتكار والدقة: ضمان حلول متطورة مع الاهتمام بالتفاصيل الدقيقة.",
    },
    {
      title: "التنفيذ والإشراف",
      content:
        "مع اكتمال مرحلة التصميم، يتولى فريقنا المتخصص تنفيذ المشروع بالتزام راسخ بالجودة. ندير تخصيص الموارد، والالتزام بالجدول الزمني، ومراقبة الجودة من خلال المتابعة الفورية. ينسق مديرو المشاريع لدينا كل جانب من جوانب البناء، من الشراء إلى التركيب، لضمان التقدم السلس.\nالعناصر الرئيسية:\nإدارة الموارد بكفاءة: تخصيص المواد والقوى العامل\nالمراقبة المستمرة: تتبع التقدم بتحديثات منتظمة.\nحل المشكلات الاستباقي: معالجة القضايا قبل تفاقمها.\nضمان الجودة: الالتزام بأعلى المعايير في كل التفاصيل.",
    },
    {
      title: "التسليم والتقييم",
      content:
        "لا نكتفي بإنجاز المشاريع، بل نتقنها. عند الانتهاء، يجري فريقنا تقييمات شاملة للتحقق من أن كل عنصر يلبي معاييرنا الصارمة للتميز. نجري عمليات تفتيش بعد الإنجاز، وجولات مع العملاء، وتقييمات للأداء لضمان استمرار استثماركم في تحقيق قيمة طويلة الأجل.\nالعناصر الرئيسية:\nعمليات التفتيش النهائية: ضمان الامتثال للمعايير.\nرضا العملاء: إجراء جولات في المشروع المنجز للتحقق من الرضا.\nتحليل الأداء: تقييم كفاءة ووظائف المشروع.\nتوصيات الصيانة: تقديم إرشادات حول الصيانة والتحسين..",
    },
  ],
};
const Faq = {
  eng: [
    {
      title: "What project management services do you offer in the UAE",
      content:
        "We provide end-to-end project management services in the UAE, including construction project management, fit-out management, MEP coordination, and sustainable building solutions. Our services are tailored to meet the unique demands of the UAE and GCC market.",
    },
    {
      title: "What makes Khales Project Management different from other firms?",
      content:
        "We stand out because we deliver bespoke solutions, prioritize sustainability, and use real-time monitoring to keep your project on track. With industry expertise and a client-first approach, we ensure your project is completed on time, within budget, and to the highest standards. From start to finish, we’re here to make your vision a reality.",
    },
    {
      title: "Do you have experience working on UAE-based projects?",
      content:
        "Yes, we have extensive experience managing projects across the UAE, including high-rise buildings, commercial developments, residential complexes, and infrastructure projects. Our team is well-versed in local regulations and standards.",
    },
    {
      title: "How do you ensure compliance with UAE regulations and standards?",
      content:
        "Our team stays updated on Dubai Municipality regulations, DDA (Dubai Development Authority) guidelines, and Abu Dhabi UPC codes. We ensure all projects adhere to local laws, permitting processes, and sustainability requirements like Al Sa’fat in Dubai.",
    },
    {
      title: "Can you manage fit-out projects across all seven emirates?",
      content:
        "Absolutely. We specialize in fit-out project management for offices, retail spaces, and hospitality venues in Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, and Fujairah. From design coordination to final handover, we handle every detail to ensure a seamless and high-quality finish.",
    },
    {
      title: "How do you handle delays caused by UAE weather or logistics?",
      content:
        "We factor in UAE-specific challenges, such as extreme weather and supply chain delays, during the planning phase. Our real-time monitoring system allows us to adapt quickly and keep projects on track.",
    },
    {
      title: "How do you ensure quality in UAE construction projects?",
      content:
        "We implement rigorous quality control processes, including regular inspections and compliance checks, to meet UAE construction standards and deliver projects of the highest quality.",
    },
    {
      title: "How can I get a quote for my project in the UAE?",
      content:
        "Simply contact us with your project details, and we’ll provide a customized quote tailored to your needs. Our team is ready to help you bring your vision to life.",
    },
  ],
  ar: [
    {
      title: "ما هي خدمات إدارة المشاريع التي تقدمونها في الإمارات؟",
      content:
        "نحن نقدم إدارة مشاريع شاملة تتضمن إدارة الإنشاءات والتشطيبات، بالإضافة إلى تنسيق أعمال الهندسة الميكانيكية والكهربائية والصحية (MEP)، وتقديم حلول بناء مستدامة. جميع خدماتنا مصممة خصيصًا لتلبية متطلبات السوق في الإمارات ودول الخليج.",
    },
    {
      title: "ما الذي يميّز شركة خالص لإدارة المشاريع عن الشركات الأخرى؟",
      content:
        "نحن نتميز بتقديم حلول مخصصة تلبي احتياجاتكم بدقة، مع التركيز على الممارسات المستدامة والمراقبة الفورية لضمان سير المشاريع بسلاسة. بفضل فريقنا المتخصص ونهجنا الذي يركز على العملاء، نضمن تسليم مشاريعكم في الوقت المحدد، وضمن الميزانية، وبأعلى معايير الجودة.",
    },
    {
      title: " هل لديكم خبرة في تنفيذ المشاريع في الإمارات؟",
      content:
        "نعم، لدينا خبرة واسعة في إدارة المشاريع في مختلف أنحاء الإمارات، وتشمل هذه المشاريع المباني الشاهقة، والمشاريع التجارية، والمجمعات السكنية، بالإضافة إلى تطوير البنية التحتية. ونحن على دراية كاملة باللوائح والمعايير المحلية.",
    },
    {
      title: "كيف تضمنون الامتثال للوائح ومعايير البناء في دولة الإمارات؟",
      content:
        "نحرص دائمًا على مواكبة أحدث اللوائح والمعايير المحلية في جميع إمارات الدولة. ففي دبي، نلتزم بمعايير بلدية دبي وإرشادات هيئة تطوير دبي، بينما نتبع في أبوظبي معايير التخطيط العمراني. كما نراعي متطلبات الاستدامة، مثل نظام السعفات في دبي. وبهذه الإجراءات، نضمن تنفيذ مشاريعنا وفقًا لأعلى المعايير المطلوبة في كل إمارة.",
    },
    {
      title: "هل تديرون مشاريع التشطيبات الداخلية في جميع الإمارات السبع؟",
      content:
        "نحن متخصصون في إدارة مشاريع التشطيبات الداخلية للمكاتب، والمساحات التجارية، والفنادق في جميع إمارات الدولة، بما في ذلك دبي وأبوظبي والشارقة وعجمان وأم القيوين ورأس الخيمة والفجيرة. نولي اهتمامًا دقيقًا بكل التفاصيل، بدءًا من التصميم وحتى التسليم النهائي، لضمان تشطيبات عالية الجودة تفوق توقعاتكم.",
    },
    {
      title:
        "كيف تتعاملون مع التأخيرات الناتجة عن الطقس أو تحديات الإمداد في الإمارات؟",
      content:
        "ظرًا للتحديات المناخية الفريدة في دولة الإمارات، كالارتفاع الشديد في درجات الحرارة والرطوبة، بالإضافة إلى تحديات سلاسل التوريد، فإننا نوليها اهتمامًا خاصًا. وخلال مرحلة التخطيط، نضع خططًا بديلة ونتعامل بمرونة مع أي تغييرات غير متوقعة. كما نعتمد نظام مراقبة فورية يسمح لنا بالتكيف السريع مع الظروف الطارئة، مما يضمن سير المشروع في مساره الصحيح دون تأخيرات كبيرة.",
    },
    {
      title: " كيف تضمنون جودة البناء في مشاريع الإمارات؟",
      content:
        "نلتزم بأعلى معايير الجودة من خلال تطبيق إجراءات صارمة لمراقبة الجودة، والتي تتضمن عمليات تفتيش منتظمة ومراجعات شاملة للتأكد من الالتزام بمعايير البناء المحلية والدولية. نحرص على متابعة كل مرحلة من مراحل المشروع بدقة، مما يضمن تسليم مشاريع عالية الجودة ومتميزة التنفيذ.",
    },
    {
      title: "كيف يمكنني الحصول على عرض سعر لمشروعي في الإمارات؟",
      content:
        "كل ما عليك فعله هو التواصل معنا وتزويدنا بتفاصيل مشروعك، وسنقوم بإعداد عرض أسعار مخصص يناسب احتياجاتك. فريقنا على أتم الاستعداد لمساعدتك في تحقيق رؤيتك.",
    },
  ],
};

const ProjectHighlightdata = {
  eng: [
    {
      Title: "Case Studies",
      button: "Get in touch with us",
      Subtitle: "Dubai Hills Estate",
      Subheader: "A Turnkey Success Story",
      description: [
        "In Dubai Hills Estate, a 1,100 sqm luxury villa needed to be built from the ground up. The client, based overseas, owned the land but didn’t have time to handle permits, design approvals, or coordinate contractors. They were looking for a smooth process with one team to manage everything while they stayed informed remotely.",
        "One of the biggest challenges was communication. The client was in a different time zone, and the design was still evolving during construction. Material sourcing also needed to match their high-end taste without going over budget or missing deadlines.",
        "To fix this, we kept things simple. A dedicated project manager became their single point of contact, and we built a live dashboard with weekly updates, progress videos, and instant approvals. That meant no chasing teams, no missed updates, and full control without having to be on-site.",
        "We handled all design changes quickly, fast-tracked municipality approvals, and stayed on top of contractors with a tight schedule. In just 14 months, the villa was delivered fully complete, designed, built, and finished to luxury standards. This was a full turnkey project management service, including architecture coordination, construction, interior fit-out, and handover, tailored for anyone looking for luxury villa construction in Dubai without the usual stress.",
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
      Title: "دراسة المشروع",
      button: "تواصل معنا",
      Subtitle: "دبي هيلز استيت",
      Subheader: "قصة نجاح  ",
      description: [
        "في دبي هيلز استيت، كان هناك مشروع فيلا فاخرة بمساحة 1100 متر مربع مطلوب إنشاؤها من الصفر. كان العميل مقيماً في الخارج ويمتلك الأرض، لكنه لم يكن يملك الوقت أو الخبرة المحلية لإدارة التصاريح والموافقات التصميمية أو تنسيق أعمال المقاولين. كان يبحث عن عملية سلسة يشرف عليها فريق واحد، ويبقى على اطلاع دائم دون الحاجة للتواجد في الموقع.",
        "أحد أكبر التحديات كان في التواصل. بسبب فرق التوقيت واستمرار التعديلات في التصميم خلال التنفيذ، أصبح من الضروري الحفاظ على وضوح التواصل وسرعة اتخاذ القرار. كما أن اختيار المواد الراقية كان يحتاج إلى عناية خاصة لتحقيق الجودة المطلوبة دون التأثير على الميزانية أو الجدول الزمني.",
        "قمنا بتعيين مدير مشروع مخصص ليكون نقطة الاتصال الوحيدة للعميل، وأنشأنا لوحة متابعة رقمية تعرض التحديثات الأسبوعية، وفيديوهات من الموقع، وطلبات الموافقة الفورية. بهذه الطريقة، لم يكن العميل بحاجة لمتابعة عدة أطراف أو القلق بشأن تفاصيل التنفيذ، بل كان يتحكم في المشروع بالكامل عن بُعد.",
        "تم التعامل مع جميع التعديلات التصميمية بسرعة، والحصول على الموافقات من بلدية دبي، وهيئة كهرباء ومياه دبي بسهولة. تم الالتزام بالجدول الزمني، واستُكمل المشروع خلال 14 شهرًا بجودة عالية وفقًا لما تم الاتفاق عليه. تم تسليم المشروع كحل متكامل يشمل إدارة المشروع بالكامل، تنسيق التصاميم المعمارية، أعمال البناء، التشطيبات الداخلية، والتسليم النهائي، وهو مثالي لمن يبحث عن إنشاء فيلا فاخرة في دبي دون التعقيدات المعتادة.",
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

const ProjectManagementPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage(); // Assuming you have a language context
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    return () => setIsClient(false); // Cleanup
  }, []);

  // change metadata from client side
  useEffect(() => {
    document.title = `${
      language === "ar" ? "خدمات إدارة المشاريع" : "Project mangment"
    }`;
  }, [language]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  // Don't render anything during SSR
  if (!isClient) return null;

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
        <ProjectHighlight data={ProjectHighlightdata[language]} />

        <Title2>
          {language === "ar" ? "عملية عملنا" : "Frequently Asked"}
          <GreenText>{language === "ar" ? "" : " Questions"}</GreenText>
        </Title2>

        <OurProcessWork panels={Faq[language]} />
      </Column>
      <CTASection />
    </>
  );
};

export default ProjectManagementPage;
