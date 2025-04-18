"use client"
import React, { useEffect, useState } from "react";
import InteriorDesign from "../components/InteriorDesign/InteriorDesign";
import OurProcessWork from "../components/OurProcessWork/OurProcessWork";
import { Row2, Column } from "../utils/Globalstyles";
import { GreenText, Title as Title2 } from "../components/Whoweare/TextContent";
import CTASection from "../components/Homecontact/CTASection";
import ProjectHighlight from "../components/Projecthighlights/ProjectHighlight";
import dynamic from "next/dynamic";
const HeroSlider = dynamic(() => import('@/components/Slider/Slider'));
import { useLanguage } from "../Context/Languagecontext"; // Import the language context
import banner from "@/public/assets/banner/project.jpeg"

export const slides = {
  eng: [
    {
      id: 1,
      image: banner,
      title: "Engineering Excellence That Inspires",
      content: "Innovative engineering solutions tailored to your vision.",
      button: "Talk to an Expert",
    },
  ],
  ar: [
    {
      id: 1,
      image: banner,
      title: "هندسة بإتقان تلهم",
      content: "حلول هندسية مبتكرة تتماشى مع رؤيتك.",
      button: "تواصل مع خبير",
    },
  ],
};
const data = {
  eng: [
    {
      title: "Engineering Consultancy: ",
      subtitle: "Precision. Innovation. Excellence.",
      description1:
        "Engineering is more than calculations and blueprints—it’s about crafting solutions that stand the test of time. We bring your vision to life with structurally sound, functionally efficient, and environmentally responsible designs. From the first sketch to the final handover, we deliver comprehensive engineering services across Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Fujairah, Al Ain, and Ras Al Khaimah.",
      description2:
        "We take pride in our ability to meet the demands of various projects, from small residential builds to large-scale commercial developments. With a dedicated team and a client-focused approach, we guarantee innovative engineering solutions that adhere to the highest standards of quality and safety while staying on schedule and within budget.",
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
      title: "الاستشارات الهندسية:",
      subtitle: "الدقة. الابتكار. التميز.",

      description1:
        "الهندسة ليست مجرد حسابات ومخططات، بل هي صياغة حلول تصمد أمام اختبار الزمن. نحن نحول رؤيتك إلى واقع بتصاميم متينة هيكليًا، وفعالة وظيفيًا، ومسؤولة بيئيًا. من الرسم الأولي إلى التسليم النهائي، نقدم خدمات هندسية شاملة في دبي، أبوظبي، الشارقة، عجمان، أم القيوين، الفجيرة، العين، ورأس الخيمة.",
      description2:
        "الهندسة ليست مجرد حسابات ومخططات، بل هي صياغة حلول تصمد أمام اختبار الزمن. نحن نحول رؤيتك إلى واقع بتصاميم متينة هيكليًا، وفعالة وظيفيًا، ومسؤولة بيئيًا. من الرسم الأولي إلى التسليم النهائي، نقدم خدمات هندسية شاملة في دبي، أبوظبي، الشارقة، عجمان، أم القيوين، الفجيرة، العين، ورأس الخيمة.",
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
      title: "Consultation & Concept Development",
      content:
        "Every remarkable project starts with a clear vision. Our journey begins by listening to your ideas, goals, and challenges. We conduct in-depth consultations to understand your unique requirements and aspirations. With this information, we create initial concepts, feasibility studies, and 3D models that bring your vision to life. This phase guarantees that every detail aligns with your expectations and forms the foundation for a seamless project journey.\nIdea Exploration: Understanding your vision and requirements.\nFeasibility Assessment: Analyzing project viability and potential challenges.\n3D Visualization: Bringing concepts to life with detailed renderings.\nCustomized Solutions: Developing tailored plans that fit your objectives.",
    },
    {
      title: "Architectural & Structural Engineering",
      content:
        "Precision and safety are at the heart of our engineering philosophy. Our team of expert engineers designs aesthetically pleasing and structurally sound buildings that meet both local regulations and international standards. From foundation design to structural framing, we ensure your project is built to last, combining engineering innovation with technical excellence.\nStructural Integrity: Designing robust foundations and frameworks.\nRegulatory Compliance: Adhering to local and international standards.\nEngineering Precision: Leveraging advanced techniques and tools.\nDurability Assurance: Building structures that withstand time and wear.\n",
    },
    {
      title: " MEP Design & Integration",
      content:
        "Our MEP (Mechanical, Electrical, Plumbing) design services focus on sustainability, energy efficiency, and occupant comfort. We seamlessly integrate HVAC systems, electrical layouts, and plumbing networks using cutting-edge technology and industry best practices. Our goal is to create systems that are not only high-performing but also environmentally responsible.\nHVAC Optimization: Enhancing indoor air quality and comfort.Energy Efficiency: Minimizing resource consumption with smart solutions.\nPlumbing Efficiency: Ensuring reliable and sustainable water systems.\nElectrical Safety: Designing efficient and safe power networks\n",
    },
    {
      title: " Site Supervision & Quality Control",
      content:
        "Our experienced team provides comprehensive site supervision, ensuring that every phase of construction aligns with the approved plans and specifications. We maintain stringent quality control measures, performing regular inspections and audits to guarantee that every element meets industry standards. From material selection to craftsmanship, we are committed to delivering safe, durable, and high-quality outcomes.\nOn-Site Monitoring: Ensuring consistency and quality.\nRegular Inspections: Maintaining safety and compliance.\nQuality Assurance: Implementing meticulous checks at every stage.\nProactive Problem-Solving: Addressing challenges swiftly and effectively.\n",
    },
    {
      title: "Testing, Commissioning & Handover",
      content:
        "Before project completion, we conduct rigorous testing and commissioning to verify that all systems are functioning optimally. Our team performs performance tests, safety checks, and final inspections to ensure operational efficiency. The handover process is smooth and structured, with complete documentation and training to equip you with all necessary knowledge for successful project management.\nPerformance Validation: Ensuring systems operate as intended.\nSafety Assurance: Verifying compliance and safety protocols.\nFinal Inspections: Conducting thorough assessments before handover.\nComprehensive Documentation: Providing records and training materials.\n",
    },
  ],
  ar: [
    {
      title: "  الاستشارة وتطوير المفاهيم",
      content:
        "يبدأ كل مشروع متميز برؤية واضحة. تبدأ رحلتنا بالاستماع إلى أفكارك وأهدافك وتحدياتك. نجري استشارات متعمقة لفهم متطلباتك وتطلعاتك الفريدة. بناءً على هذه المعلومات، نضع مفاهيم أولية، ودراسات جدوى، ونماذج ثلاثية الأبعاد تجسد رؤيتك. تضمن هذه المرحلة توافق كل تفصيلة مع توقعاتك وتشكيل أساس لرحلة مشروع سلسة.\nاستكشاف الأفكار: فهم رؤيتك ومتطلباتك.\nتقييم الجدوى: تحليل جدوى المشروع والتحديات المحتملة.\nالتصور ثلاثي الأبعاد: إضفاء الحيوية على المفاهيم بتصاميم تفصيلية.\nحلول مخصصة: تطوير خطط مصممة خصيصًا لتناسب أهدافك",
    },
    {
      title: "الهندسة المعمارية والإنشائية",
      content:
        "الدقة والسلامة هما جوهر فلسفتنا الهندسية. يصمم فريقنا من المهندسين الخبراء مباني جذابة من الناحية الجمالية ومتينة هيكليًا، تلبي اللوائح المحلية والمعايير الدولية. من تصميم الأساسات إلى الإطارات الهيكلية، نضمن بناء مشروعك ليدوم، بدمج الابتكار الهندسي مع التميز التقني.\nالسلامة الهيكلية: تصميم أساسات وإطارات قوية.\nالامتثال التنظيمي: الالتزام بالمعايير المحلية والدولية.\nالدقة الهندسية: الاستفادة من التقنيات والأدوات المتقدمة.\nضمان المتانة: بناء هياكل تصمد أمام الزمن والتآكل.",
    },
    {
      title:
        " تصميم وتكامل أنظمة الهندسة الكهربائية والميكانيكية والسباكة (MEP)",
      content:
        "تركز خدمات تصميم نظم MEP لدينا على الاستدامة، وكفاءة الطاقة، وراحة المستخدمين. ندمج بسلاسة أنظمة التدفئة والتهوية وتكييف الهواء، والتخطيطات الكهربائية، وشبكات السباكة باستخدام أحدث التقنيات وأفضل ممارسات الصناعة. هدفنا هو إنشاء أنظمة عالية الأداء ومسؤولة بيئيًا.\nتحسين التدفئة والتهوية وتكييف الهواء: تحسين جودة الهواء الداخلي والراحة.\nكفاءة الطاقة: تقليل استهلاك الموارد بحلول ذكية.\nكفاءة السباكة: ضمان أنظمة مياه موثوقة ومستدامة.\nالسلامة الكهربائية: تصميم شبكات طاقة فعالة وآمنة.",
    },
    {
      title: "الإشراف الميداني وضمان الجودة",
      content:
        "يقدم فريقنا المتمرس إشرافًا شاملاً على الموقع، مما يضمن توافق كل مرحلة من مراحل البناء مع الخطط والمواصفات المعتمدة. نطبق إجراءات صارمة لمراقبة الجودة، ونجري عمليات تفتيش وتدقيق منتظمة لضمان تلبية كل عنصر لمعايير الصناعة. من اختيار المواد إلى الحرفية، نحن ملتزمون بتقديم نتائج آمنة ومتينة وعالية الجودة.\nالمراقبة في الموقع: ضمان الاتساق والجودة.\nعمليات التفتيش المنتظمة: الحفاظ على السلامة والامتثال.\nضمان الجودة: تطبيق فحوصات دقيقة في كل مرحلة.\nحل المشكلات الاستباقي: معالجة التحديات بسرعة وفعالية.",
    },
    {
      title: "  الاختبار والتشغيل والتسليم ",
      content:
        "قبل إتمام المشروع، نجري اختبارات وتشغيل صارمة للتحقق من أن جميع الأنظمة تعمل على النحو الأمثل. يجري فريقنا اختبارات الأداء، وفحوصات السلامة، وعمليات التفتيش النهائية لضمان الكفاءة التشغيلية. عملية التسليم سلسة ومنظمة، مع توفير وثائق كاملة وتدريب لتزويدك بكل المعرفة اللازمة لإدارة المشروع بنجاح.\nالتحقق من صحة الأداء: ضمان عمل الأنظمة كما هو مقصود./nضمان السلامة: التحقق من بروتوكولات الامتثال والسلامة./nعمليات التفتيش النهائية: إجراء تقييمات شاملة قبل التسليم./nوثائق شاملة: توفير السجلات والمواد التدريبية.",
    },
  ],
};
const Faq = {
  eng: [
    {
      title: "What types of engineering consultancy services do you offer?",
      content:
        "We offer architectural engineering, structural engineering, MEP design, site supervision, and testing & commissioning services for residential, commercial, and industrial projects.",
    },
    {
      title: " Do you work on projects across all seven emirates?",
      content:
        "Yes, we provide engineering consultancy services in Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Fujairah, Al Ain, and Ras Al Khaimah.",
    },
    {
      title: "How do you ensure the design meets my requirements?",
      content:
        "We start with a detailed consultation to understand your goals and preferences. Using 3D modeling and feasibility studies, we create designs that align with your vision and requirements.",
    },
    {
      title: "Can you handle both small and large-scale projects?",
      content:
        "Absolutely. Whether it’s a small villa or a large commercial complex, we tailor our services to meet the scale and scope of your project.",
    },
    {
      title: " Do you offer sustainable engineering solutions?",
      content:
        "Yes, sustainability is a core part of our design philosophy. We integrate eco-friendly materials, energy-efficient systems, and sustainable practices into every project.",
    },
    {
      title: "How long does the engineering consultancy process take?",
      content:
        "The timeline depends on the project’s complexity. After the initial consultation, we provide a detailed schedule to keep you informed every step of the way.",
    },
    {
      title: "Do you provide site supervision services?",
      content:
        "Yes, we offer comprehensive site supervision to ensure construction aligns with approved plans, maintaining quality, safety, and timely delivery.",
    },
    {
      title: "Can you work within my budget?",
      content:
        "We create designs that align with your budget without compromising on quality. During the consultation, we discuss your financial parameters and tailor our solutions accordingly.",
    },
    {
      title: "What makes your engineering consultancy services stand out?",
      content:
        "Our commitment to precision, innovation, and excellence sets us apart. We combine award-winning expertise with a client-centric approach to deliver exceptional results.",
    },
    {
      title: "How can I get started with Khales Engineering Consultancy?",
      content:
        "Simply contact us for a consultation. We’ll discuss your vision, provide a customized plan, and guide you through the process of creating your dream project.",
    },
  ],
  ar: [
    {
      title: " ما هي الخدمات التي تقدمونها في الاستشارات الهندسية؟",
      content:
        "نقدم مجموعة شاملة من الخدمات الهندسية، تشمل:/nالهندسة المعمارية: تصميم وتخطيط المباني السكنية والتجارية.\nالهندسة الإنشائية: تحليل وتصميم الهياكل لضمان السلامة والمتانة.\nتصميم أنظمة MEP: تكييف، كهرباء، سباكة.\nالإشراف الميداني: متابعة التنفيذ وضمان الجودة.\nالاختبار والتشغيل والتسليم: التحقق من الأداء وتسليم المشروع بملف توثيقي.",
    },
    {
      title: "هل تعملون في جميع الإمارات السبع؟",
      content:
        "نعم، نحن نقدم خدمات الاستشارات الهندسية في كل من دبي، وأبوظبي، والشارقة، وعجمان، وأم القيوين، والفجيرة، والعين، ورأس الخيمة.",
    },
    {
      title: "كيف تضمنون أن التصميم يعكس متطلباتي؟",
      content:
        "نبدأ باستشارة تفصيلية لفهم أهدافك وتفضيلاتك. بعد ذلك، نقوم بتطوير نماذج ثلاثية الأبعاد ودراسات جدوى للتأكد من أن التصميم يتماشى مع رؤيتك.",
    },
    {
      title: " هل تتعاملون مع المشاريع الصغيرة والكبيرة؟",
      content:
        "نعم، نحن نقدم خدماتنا لمختلف أنواع المشاريع، سواء كانت مشاريع سكنية صغيرة أو مجمعات تجارية كبيرة، مع حلول مخصصة تناسب حجم المشروع ونطاقه.",
    },
    {
      title: "  هل تقدمون حلولًا هندسية مستدامة؟",
      content:
        "نعم، الاستدامة هي جزء أساسي من فلسفتنا. نحن نستخدم مواد صديقة للبيئة وأنظمة موفرة للطاقة لضمان توافق مشاريعنا مع معايير الاستدامة العالمية.",
    },
    {
      title: " كم يستغرق تنفيذ عملية الاستشارات الهندسية؟",
      content:
        "يعتمد الوقت على مدى تعقيد المشروع. بعد الاستشارة الأولية، نقدم جدولًا زمنيًا مفصلًا لضمان الشفافية في جميع مراحل العمل.",
    },
    {
      title: "  هل توفرون خدمات الإشراف الميداني؟",
      content:
        "نعم، نحن نقدم إشرافًا ميدانيًا شاملاً لضمان تنفيذ المشروع وفقًا للمخططات المعتمدة، مع التركيز على الجودة والسلامة والتسليم في الوقت المحدد.",
    },
    {
      title: "هل يمكنكم العمل ضمن ميزانيتي؟",
      content:
        "نعم، نحن نحرص على تقديم حلول تتناسب مع ميزانيتك دون التنازل عن الجودة. خلال الاستشارة، نناقش الحدود المالية ونصمم حلولًا تتماشى معها.",
    },
    {
      title: " ما الذي يميز خدمات الاستشارات الهندسية الخاصة بكم؟",
      content:
        "نتميز بالتركيز على الدقة والابتكار والجودة. يجمع فريقنا بين الخبرة الواسعة والنهج الذي يركز على تلبية احتياجات العميل لضمان تقديم نتائج استثنائية.",
    },
    {
      title: "  كيف يمكنني البدء مع خالص للاستشارات الهندسية؟",
      content:
        "يمكنك التواصل معنا لحجز استشارة، حيث سنناقش رؤيتك، ونضع خطة مخصصة، ونرشدك خلال جميع مراحل تنفيذ المشروع.",
    },
  ],
};

const ProjectHighlightdata = {
  eng: [
    {
      Title: " Case Studies",
      button: " Get in touch with us",

      Subtitle: "Al Wasl Dubai",
      Subheader: "A Turnkey Success Story",
      description: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis id purus ut magna tincidunt luctus. Curabitur euismod, turpis ac eleifend congue, nunc justo sollicitudin est, ac fermentum lorem odio eget elit. Nulla facilisi. Phasellus aliquet, felis a consectetur volutpat, nisl magna malesuada dolor, ut scelerisque nisl nulla sit amet ligula. Fusce eget metus nec nunc eleifend facilisis ut nec justo. Integer bibendum, augue eu fermentum sodales, turpis leo pharetra ex, eget dictum sapien turpis eget nunc.",
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In ut sapien quis velit vestibulum accumsan vel at lectus. Ut ut nunc at turpis molestie dignissim eget in nunc. Morbi sodales, sapien non facilisis scelerisque, velit lacus eleifend risus, eu eleifend elit elit nec ligula. Mauris sagittis orci nec nisl lacinia, id sodales arcu aliquet. Suspendisse ac ligula ex. Vestibulum in metus non erat imperdiet convallis. Nulla sed libero a metus bibendum sagittis. Fusce vehicula orci id lacus feugiat, ut ultricies nulla lacinia.",
        "Nam venenatis, libero vel fermentum hendrerit, sapien mauris luctus tortor, id laoreet purus nisi non elit. Phasellus cursus, quam eget iaculis ultricies, lorem erat euismod orci, a ultrices justo enim eu dui. Etiam tincidunt felis id odio suscipit, nec aliquet nisl pharetra. Ut in scelerisque eros. Donec eget nisi congue, facilisis arcu eget, ullamcorper odio. Nunc vel nulla a neque elementum volutpat. Duis at velit eget libero interdum ultrices.",
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In ut sapien quis velit vestibulum accumsan vel at lectus. Ut ut nunc at turpis molestie dignissim eget in nunc. Morbi sodales, sapien non facilisis scelerisque, velit lacus eleifend risus, eu eleifend elit elit nec ligula. Mauris sagittis orci nec nisl lacinia, id sodales arcu aliquet. Suspendisse ac ligula ex. Vestibulum in metus non erat imperdiet convallis. Nulla sed libero a metus bibendum sagittis. Fusce vehicula orci id lacus feugiat, ut ultricies nulla lacinia.",
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
      Subtitle: "الوصل دبي",
      Subheader: "قصة نجاح مفتاح في اليد",
      description: [
        "لوريم إيبسوم هو نص نموذجي يستخدم في صناعة الطباعة والتنضيد. لوريم إيبسوم هو نص نموذجي يستخدم في صناعة الطباعة والتنضيد.",
        "لوريم إيبسوم هو نص نموذجي يستخدم في صناعة الطباعة والتنضيد. لوريم إيبسوم هو نص نموذجي يستخدم في صناعة الطباعة والتنضيد.",
        "لوريم إيبسوم هو نص نموذجي يستخدم في صناعة الطباعة والتنضيد. لوريم إيبسوم هو نص نموذجي يستخدم في صناعة الطباعة والتنضيد.",
        "لوريم إيبسوم هو نص نموذجي يستخدم في صناعة الطباعة والتنضيد. لوريم إيبسوم هو نص نموذجي يستخدم في صناعة الطباعة والتنضيد.",
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

const EngineeringConsultancyPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { language } = useLanguage(); // Assuming you have a language context
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
      setIsClient(true);
      return () => setIsClient(false); // Cleanup
    }, []);
  
    // change metadata from client side
    useEffect(() => {
      document.title = `${language === "ar"
        ? "الاستشارات الهندسية"
        : "Engineering Consultancy"}`;
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
        <Row2 rtl={language === "ar"}>
          <OurProcessWork panels={process[language]} />
          <img width={"30%"} src={"/assets/4.png"} alt="Process Work" />
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
  )
}

export default EngineeringConsultancyPage