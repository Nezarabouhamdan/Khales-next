"use client";
import React, { useEffect, useState } from "react";
import InteriorDesign from "../components/InteriorDesign/InteriorDesign";
import OurProcessWork from "../components/OurProcessWork/OurProcessWork";
import { Row2, Column } from "../utils/Globalstyles";
import { GreenText, Title as Title2 } from "../components/Whoweare/TextContent";
import CTASection from "../components/Homecontact/CTASection";
import ProjectHighlight from "../components/Projecthighlights/ProjectHighlight";
import dynamic from "next/dynamic";
const HeroSlider = dynamic(() => import("@/components/Slider/Slider"));
import { useLanguage } from "../Context/Languagecontext"; // Import the language context
import banner from "@/public/assets/banner/project.jpeg";

export const slides = {
  eng: [
    {
      id: 1,
      image: "https://i.ibb.co/DHxsg44Y/1-Banner-Engineering-Design.jpg",
      title: "Precision-Driven Design That Builds with Confidence",
      content:
        "Translating ideas into technical drawings that are safe, practical, and ready to be built.",
      button: "Book Appointment",
    },
  ],
  ar: [
    {
      id: 1,
      image: "https://i.ibb.co/DHxsg44Y/1-Banner-Engineering-Design.jpg",
      title: "تصميم دقيق يبني الثقة",
      content: "ترجمة الأفكار إلى رسومات فنية آمنة وعملية وجاهزة للتنفيذ.",
      button: "احجز موعدك الآن",
    },
  ],
};
const data = {
  eng: [
    {
      title: "Engineering Design: ",
      subtitle: "",
      description1:
        "Every project needs more than a beautiful concept; it needs engineering that works. Khales Engineering Design service provides all the technical documents, calculations, and system layouts needed to take your project from vision to construction.",
      description2:
        "We prepare structural, civil, mechanical, electrical, and plumbing designs, coordinated with architectural plans and in line with local authority codes. Whether you’re building a villa or a multi-use development, we ensure your project is safe, compliant, efficient, and ready for execution.",
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
      title: " التصميم الهندسي",
      subtitle: "",
      description1:
        "كل مشروع يحتاج إلى أكثر من مجرد مفهوم جميل؛ إنه يحتاج إلى هندسة فعالة. توفر خدمة التصميم الهندسي من خالص جميع المستندات الفنية والحسابات وتخطيطات الأنظمة اللازمة لنقل مشروعك من الرؤية إلى البناء.",
      description2:
        "نقوم بإعداد التصاميم الإنشائية والمدنية والميكانيكية والكهربائية والصحية، بالتنسيق مع المخططات المعمارية وبما يتماشى مع قوانين السلطات المحلية. سواء كنت تبني فيلا أو مشروعًا متعدد الاستخدامات، فإننا نضمن أن مشروعك آمن ومتوافق وفعال وجاهز للتنفيذ.",
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
      title: "Design Coordination & Review",
      content:
        "We start by studying the approved architectural design and identifying all engineering requirements based on the site, scale, and scope.",
    },
    {
      title: "Structural & MEP Design",
      content:
        "We produce detailed structural calculations, electrical and plumbing plans, HVAC layouts, and load analysis, customized to your project.",
    },
    {
      title: "Code Compliance & Authority Requirements",
      content:
        "We design according to UAE municipal standards and ensure all drawings meet submission and approval criteria.",
    },
    {
      title: "Cross-Discipline Integration",
      content:
        "We coordinate with other consultants to ensure that all technical systems align with design, function, and construction constraints.",
    },
    {
      title: "Final Issued for Construction (IFC) Drawings",
      content:
        "We submit finalized engineering drawings for contractor use, ready for site implementation.",
    },
  ],
  ar: [
    {
      title: "تنسيق ومراجعة التصميم",
      content:
        "نبدأ بدراسة التصميم المعماري المعتمد وتحديد جميع المتطلبات الهندسية بناءً على الموقع والحجم والنطاق.",
    },
    {
      title: "التصميم الإنشائي وتصميم الأنظمة الكهروميكانيكية",
      content:
        "نُعد حسابات إنشائية مفصلة، ومخططات كهربائية وصحية، وتصاميم لأنظمة التكييف، وتحليل للأحمال، كلها مخصصة لمشروعك.",
    },
    {
      title: "الامتثال للقوانين ومتطلبات الجهات الحكومية",
      content:
        "نصمم وفقًا لمعايير البلديات في الإمارات ونضمن أن جميع المخططات تفي بمعايير التقديم والموافقة.",
    },
    {
      title: "التكامل بين مختلف التخصصات",
      content:
        "ننسق مع الاستشاريين الآخرين لضمان توافق جميع الأنظمة الفنية مع قيود التصميم والوظيفة والبناء.",
    },
    {
      title: "المخططات النهائية الصادرة للتنفيذ (IFC)",
      content:
        "نسلّم المخططات الهندسية النهائية لاستخدام المقاول، لتكون جاهزة للتنفيذ في الموقع.",
    },
  ],
};
const Faq = {
  eng: [
    {
      title:
        "What’s the difference between architecture and engineering design?",
      content:
        "Architecture defines how a space looks and functions. Engineering design ensures the structure and systems behind it are buildable, safe, and compliant.",
    },
    {
      title: "Do you only offer engineering for projects designed by Khales?",
      content:
        "No. We can provide engineering design for external architectural concepts as well — ensuring your project moves forward technically and legally.",
    },
    {
      title: "Will you also submit drawings for authority approval?",
      content:
        "Yes. Our designs follow local municipality standards and are prepared specifically for UAE approval processes.",
    },
    {
      title: "What types of projects do you provide engineering design for?",
      content:
        "We work across villas, residential buildings, commercial projects, and mixed-use developments of various scales.",
    },
  ],
  ar: [
    {
      title: "ما الفرق بين التصميم المعماري والتصميم الهندسي؟",
      content:
        "التصميم المعماري يحدد شكل ووظيفة المساحة. التصميم الهندسي يضمن أن الهيكل والأنظمة التي تدعمه قابلة للبناء وآمنة ومتوافقة مع المعايير.",
    },
    {
      title: "هل تقدمون التصميم الهندسي للمشاريع التي صممتها شركة خالص فقط؟",
      content:
        "لا. يمكننا تقديم التصميم الهندسي للمفاهيم المعمارية الخارجية أيضًا، مما يضمن تقدم مشروعك من الناحية الفنية والقانونية.",
    },
    {
      title: "هل تقدمون المخططات للحصول على موافقة الجهات الحكومية؟",
      content:
        "نعم. تتبع تصاميمنا معايير البلديات المحلية ويتم إعدادها خصيصًا لعمليات الحصول على الموافقات في الإمارات.",
    },
    {
      title: "ما هي أنواع المشاريع التي تقدمون لها التصميم الهندسي؟",
      content:
        "نعمل على الفلل، والمباني السكنية، والمشاريع التجارية، والمشاريع متعددة الاستخدامات بمختلف الأحجام.",
    },
  ],
};
const ProjectHighlightdata = {
  eng: [
    {
      Title: "Case Studies",
      button: "Get in touch with us",
      Subtitle: "Al Ain",
      Subheader: "Structural & MEP Engineering",
      description: [
        "In Al Ain, a private villa project required full structural and MEP engineering to bring a complex multi-level home to life. The client had an approved architectural design but needed technical support to make sure the home would function efficiently and meet local authority standards.",
        "The challenge was the villa’s scale and layout. With a basement, rooftop terrace, and swimming pool, the systems had to be fully integrated while staying within energy and load limits. The client also wanted to avoid delays or rework during construction.",
        "We developed full structural and MEP drawings, using BIM to detect and resolve potential system clashes. We coordinated HVAC, electrical, plumbing, and drainage to fit the architectural design without compromising ceiling heights or aesthetics.",
        "All drawings were submitted to Al Ain Municipality for approval, and revisions were managed without delay. The client’s contractor was able to build with confidence, knowing every system had been accounted for and optimized.",
        "This was a complete engineering package, including structural, mechanical, electrical, and plumbing design, built for clients who need seamless functionality behind the walls.",
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
      Subtitle: "العين",
      Subheader: "الهندسة الإنشائية والميكانيكية والكهربائية والسباكة",
      description: [
        "في مدينة العين، تطلب مشروع فيلا خاصة إعداد تصاميم إنشائية وأنظمة كهرباء وميكانيكا وسباكة (MEP) متكاملة لإحياء منزل متعدد المستويات يتميز بتعقيد إنشائي ووظيفي. كان لدى العميل تصميم معماري معتمد، لكنه احتاج إلى دعم تقني متخصص لضمان كفاءة الأنظمة وتوافقها التام مع معايير الجهات المحلية.",
        "تمثل التحدي الرئيسي في حجم الفيلا الكبير وتوزيعها المعماري الفريد. فمع وجود قبو واسع، وشرفة أنيقة على السطح، ومسبح مصمم بعناية، كان من الضروري دمج الأنظمة الهندسية المختلفة بشكل متناسق دون تجاوز حدود الأحمال المسموح بها أو استهلاك الطاقة بكفاءة عالية. كما أبدى العميل حرصًا بالغًا على تجنّب أي تأخيرات غير ضرورية أو عمليات إعادة تنفيذ مكلفة خلال مرحلة البناء.",
        "باشرنا بإعداد مخططات تفصيلية وشاملة للهيكل والأنظمة المتنوعة باستخدام تقنية نماذج معلومات البناء المتقدمة (BIM) للكشف المبكر عن أي تعارضات محتملة بين مختلف الأنظمة الهندسية ومعالجتها بكفاءة قبل البدء بالتنفيذ. تم تنسيق أنظمة التكييف المركزي المتطور، وشبكات الكهرباء الذكية، وأنظمة السباكة والصرف الصحي الحديثة لتتماشى بدقة مع التصميم المعماري المعتمد دون التأثير سلبًا على ارتفاع الأسقف أو جمالية وتناسق المساحات الداخلية.",
        "تم تقديم جميع المخططات إلى بلدية العين للحصول على الموافقات الرسمية، وتم التعامل مع التعديلات المطلوبة دون أي تأخير. وقد تمكن المقاول من تنفيذ المشروع بثقة تامة، مع ضمان تكامل جميع الأنظمة بشكل فعال.",
        "لقد قدمنا حزمة هندسية متكاملة تشمل التصاميم الإنشائية والميكانيكية والكهربائية والسباكة، مصممة خصيصًا لعملاء يبحثون عن الكفاءة العالية خلف الجدران دون الحاجة إلى التدخل في التفاصيل اليومية.",
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

const EngineeringConsultancyPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage(); // Assuming you have a language context
  const [isClient, setIsClient] = useState(false);

  // change metadata from client side
  useEffect(() => {
    document.title = `${
      language === "ar" ? "الاستشارات الهندسية" : "Engineering Consultancy"
    }`;
  }, [language]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

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
            src={"https://i.ibb.co/jk0vmwPk/2-Process-Engineering-Design.jpg"}
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

export default EngineeringConsultancyPage;
