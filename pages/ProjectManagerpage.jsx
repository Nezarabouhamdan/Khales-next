// File: app/ProjectManager/page.js

"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Import Your Components
import Footer from "@/components/Footer New/Footer";
import Navbar from "@/components/Navbar/Navbar";
import InteriorDesign from "@/components/InteriorDesign/InteriorDesign";
import OurProcessWork from "@/components/OurProcessWork/OurProcessWork";
import CTASection from "@/components/Homecontact/CTASection";
import ProjectHighlight from "@/components/Projecthighlights/ProjectHighlight";
const HeroSlider = dynamic(() => import("@/components/Slider/Slider"));

// Import Your Helpers and Context
import { Row2, Column } from "@/utils/Globalstyles";
import { GreenText, Title as Title2 } from "@/components/Whoweare/TextContent";
import { useLanguage } from "@/Context/Languagecontext";

// --- All your page-specific data is now here ---

export const slides = {
  eng: [
    {
      id: 1,
      image: "https://i.ibb.co/zWKzr7cR/3-Banner-PM.jpg",
      title: "Professional Representation for Your Project",
      content:
        "We represent you throughout the project, managing progress, communication, and decisions with expert guidance.",
      button: "Book Appointment",
    },
  ],
  ar: [
    {
      id: 1,
      image: "https://i.ibb.co/zWKzr7cR/3-Banner-PM.jpg",
      title: "تمثيل احترافي لمشروعك",
      content:
        "نمثلك طوال فترة المشروع، وندير التقدم والتواصل والقرارات بتوجيه من الخبراء.",
      button: "احجز موعدك الآن",
    },
  ],
};

const data = {
  eng: [
    {
      title: " Project Manager ",
      subtitle: "Service",
      description1:
        "The Project Manager service is designed for clients who want to stay in control of their project, without managing the daily tasks and coordination themselves. Acting as your official representative, we oversee the project on your behalf, making sure all consultants, contractors, and site teams are aligned and performing according to the plan.",
      description2:
        "We handle the complexities, site meetings, document reviews, progress tracking, and approvals, while keeping you informed and supported at every step. You make the final decisions. We make sure everything else moves forward smoothly, with clarity and accountability.",
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
      title: " خدمة ",
      subtitle: "مدير مشروع",
      description1:
        "صُممت خدمة مدير المشروع للعملاء الذين يرغبون في الحفاظ على سيطرتهم على مشاريعهم، دون إدارة المهام اليومية والتنسيق بأنفسهم. بصفتنا ممثلك الرسمي، نشرف على المشروع نيابةً عنك، ونتأكد من أن جميع الاستشاريين والمقاولين وفرق الموقع متوافقون ويعملون وفقًا للخطة.",
      description2:
        "نتولى التعقيدات، واجتماعات الموقع، ومراجعة المستندات، وتتبع التقدم، والموافقات، مع إبقائك على اطلاع ودعم في كل خطوة. أنت تتخذ القرارات النهائية، ونحن نضمن أن كل شيء آخر يسير بسلاسة ووضوح ومساءلة.",
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
      title: "Project Brief & Role Definition",
      content:
        "We align with your project goals and define how we’ll act on your behalf throughout the duration of the project.",
    },
    {
      title: "Team Coordination",
      content:
        "We serve as the main contact between all consultants, contractors, and suppliers — ensuring clarity and direction.",
    },
    {
      title: "Progress Monitoring",
      content:
        "We review schedules, track milestones, flag risks early, and keep your project moving forward efficiently.",
    },
    {
      title: "On-Site Representation",
      content:
        "We attend key meetings, verify site work against the contract, and ensure your standards are met.",
    },
    {
      title: "Client Reporting & Approvals",
      content:
        "You receive clear updates with only the information you need — and we support you in making informed decisions.",
    },
    {
      title: "Final Delivery & Closeout Support",
      content:
        "We ensure the project is finalized properly — including punch-list coordination, handover documentation, and closing all contractual items.",
    },
  ],
  ar: [
    {
      title: "موجز المشروع وتعريف الدور",
      content:
        "نتوافق مع أهداف مشروعك ونحدد كيفية العمل نيابةً عنك طوال مدة المشروع.",
    },
    {
      title: "تنسيق الفريق",
      content:
        "نعمل كنقطة اتصال رئيسية بين جميع الاستشاريين والمقاولين والموردين، مما يضمن الوضوح والتوجيه.",
    },
    {
      title: "مراقبة التقدم",
      content:
        "نراجع الجداول الزمنية، نتتبع المراحل الرئيسية، نكتشف المخاطر مبكرًا، ونحافظ على تقدم مشروعك بكفاءة.",
    },
    {
      title: "التمثيل في الموقع",
      content:
        "نحضر الاجتماعات الرئيسية، ونتحقق من أن العمل في الموقع يتوافق مع العقد، ونضمن تلبية معاييرك.",
    },
    {
      title: "تقارير العملاء والموافقات",
      content:
        "تتلقى تحديثات واضحة تحتوي فقط على المعلومات التي تحتاجها، وندعمك في اتخاذ قرارات مستنيرة.",
    },
    {
      title: "التسليم النهائي ودعم الإغلاق",
      content:
        "نضمن إنجاز المشروع بشكل صحيح، بما في ذلك تنسيق قائمة الملاحظات النهائية، وتوثيق التسليم، وإغلاق جميع البنود التعاقدية.",
    },
  ],
};
const Faq = {
  eng: [
    {
      title: "What project management services do you offer in the UAE?",
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
    {
      title: "How is this different from full 360 Project Management?",
      content:
        "With 360, we handle every part of the project from design to construction. As your Project Manager, we represent your interests within a project that may already have its own team — keeping everything on track while you remain the final decision-maker.",
    },
    {
      title: "Do I still have to be involved in every step?",
      content:
        "No — we manage all daily tasks and coordination. You’re only involved when key decisions or approvals are needed.",
    },
    {
      title: "Do you attend meetings and communicate with the contractor?",
      content:
        "Yes. We attend all major meetings, review reports, and manage contractor communication on your behalf.",
    },
    {
      title: "What types of projects is this service suited for?",
      content:
        "It’s ideal for private villa owners, international clients, or developers who want experienced oversight without being hands-on every day.",
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
    {
      title: "ما الفرق بين هذه الخدمة والإدارة الشاملة للمشاريع (360)؟",
      content:
        "في الإدارة الشاملة (360)، نتولى كل جزء من المشروع من التصميم إلى البناء. أما بصفتنا مدير مشروعك، فنحن نمثل مصالحك ضمن مشروع قد يكون له فريقه الخاص بالفعل، مع الحفاظ على سير كل شيء في مساره الصحيح بينما تظل أنت صاحب القرار النهائي.",
    },
    {
      title: "هل ما زال عليّ أن أشارك في كل خطوة؟",
      content:
        "لا، نحن ندير جميع المهام اليومية والتنسيق. لا تحتاج للمشاركة إلا عند الحاجة إلى قرارات أو موافقات رئيسية.",
    },
    {
      title: "هل تحضرون الاجتماعات وتتواصلون مع المقاول؟",
      content:
        "نعم. نحضر جميع الاجتماعات الرئيسية، ونراجع التقارير، وندير التواصل مع المقاول نيابة عنك.",
    },
    {
      title: "ما هي أنواع المشاريع التي تناسبها هذه الخدمة؟",
      content:
        "إنها مثالية لملاك الفلل الخاصة، أو العملاء الدوليين، أو المطورين الذين يرغبون في إشراف ذي خبرة دون الحاجة إلى التدخل المباشر يوميًا.",
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

// --- The main page component ---

const ProjectManagerpage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    document.title = `${
      language === "ar" ? "خدمات إدارة المشاريع" : "Project Management"
    }`;
  }, [language]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Navbar />

      {/* This is the main content area */}
      <main>
        <section id="hero" aria-label="hero">
          <HeroSlider
            slides={slides[language] || slides["eng"]}
            language={language}
            isLoading={isLoading}
            rtl={language === "ar"}
          />
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
              src={"https://i.ibb.co/bMNgfRYp/4-Process-PM.jpg"}
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
      </main>
    </div>
  );
};

export default ProjectManagerpage;
