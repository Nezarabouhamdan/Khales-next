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
const HeroSlider = dynamic(() => import("@/components/Slider/Slider"));

export const slides = {
  eng: [
    {
      id: 1,
      image: "https://i.ibb.co/jZBcL9d6/1-Banner-360.jpg",
      title: "Complete Project Delivery: From Concept to Handover",
      content:
        "We take full responsibility at every stage, so your project runs smoothly, on time, and to the highest standards.",
      button: "Book Appointment",
    },
  ],
  ar: [
    {
      id: 1,
      image: "https://i.ibb.co/jZBcL9d6/1-Banner-360.jpg",
      title: "تسليم كامل للمشروع: من الفكرة إلى التسليم",
      content:
        "نتحمل المسؤولية الكاملة في كل مرحلة، لضمان سير مشروعك بسلاسة، في الوقت المحدد، وبأعلى المعايير.",
      button: "احجز موعدك الآن",
    },
  ],
};
const data = {
  eng: [
    {
      title: "360 Project Management ",
      subtitle: "",
      description1:
        "Our 360 Project Management service is a fully integrated solution that covers the entire lifecycle of your project. From early planning and design coordination to authority approvals, construction management, and final handover, we handle it all. You deal with one trusted partner while we manage all consultants, contractors, documents, timelines, and decisions on your behalf.",
      description2:
        "This service is ideal for clients who want peace of mind, fewer headaches, and a professional team ensuring that the work is done right — on time, on budget, and to the standard you expect.",
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
      title: " خدمة إدارة المشاريع الشاملة (360)  ",
      subtitle: "",
      description1:
        "خدمة إدارة المشاريع الشاملة (360) التي نقدمها هي حل متكامل يغطي دورة حياة مشروعك بأكملها. من التخطيط المبكر وتنسيق التصميم إلى موافقات الجهات الحكومية وإدارة البناء والتسليم النهائي، نحن نتولى كل شيء. أنت تتعامل مع شريك واحد موثوق به بينما ندير جميع الاستشاريين والمقاولين والوثائق والجداول الزمنية والقرارات نيابةً عنك.",
      description2:
        "هذه الخدمة مثالية للعملاء الذين يرغبون في راحة البال، وتقليل المتاعب، وفريق محترف يضمن إنجاز العمل بشكل صحيح — في الوقت المحدد، وضمن الميزانية، وبالمستوى الذي تتوقعه.",
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
      title: "Project Setup & Briefing",
      content:
        " We begin by understanding your goals, site conditions, and expectations. We then build a delivery strategy that matches your timeline and budget.",
    },
    {
      title: "Design Coordination",
      content:
        "We manage architects, engineers, and consultants to ensure the design process is aligned, efficient, and technically sound.",
    },
    {
      title: "Approvals & Permitting",
      content:
        "We prepare and submit all necessary documents to local authorities, handling follow-ups and compliance.",
    },
    {
      title: "Procurement & Contractor Selection",
      content:
        "We identify qualified contractors, evaluate bids, and negotiate the best options to balance cost and quality.",
    },
    {
      title: "Construction Management",
      content:
        "We monitor site work daily, review progress, resolve conflicts, and make sure timelines and specs are followed.",
    },
    {
      title: "Final Handover",
      content:
        "We ensure the project is completed properly — with quality checks, documentation, and smooth handover to the client.",
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
      title:
        "What’s the difference between 360 Project Management and hiring a contractor directly?",
      content:
        "With 360 Project Management, you’re not just hiring a builder — you’re hiring a professional team to plan, oversee, and control every step of your project. We coordinate all parties, not just execute construction.",
    },
    {
      title: "Will I still be involved in decisions?",
      content:
        "Yes. You remain in control, and we provide structured updates and recommendations so you can make informed decisions without dealing with daily project stress.",
    },
    {
      title: "Does this include authority approvals?",
      content:
        "Yes. We handle all approval processes — drawings, permits, inspections, and submissions — as part of the full-service scope.",
    },
    {
      title: "What types of projects is this service best for?",
      content:
        "360 Project Management is ideal for private villas, luxury residences, commercial properties, or any project that requires clear coordination and accountability across all phases.",
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
          <img
            width={"300px"}
            src={"https://i.ibb.co/tdm4dt5/2-Process-360.jpg"}
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
    </>
  );
};

export default ProjectManagementPage;
