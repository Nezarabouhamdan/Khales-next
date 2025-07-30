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
      image: "https://i.ibb.co/fGNXpJH0/3-Banner-Site-Supervision.jpg",
      title: "Technical Oversight That Safeguards Quality On-Site",
      content:
        "Ensures that every element of your project is built according to approved drawings, specs, and engineering standards.",
      button: "Book Appointment",
    },
  ],
  ar: [
    {
      id: 1,
      image: "https://i.ibb.co/fGNXpJH0/3-Banner-Site-Supervision.jpg",
      title: "إشراف فني يضمن الجودة في الموقع",
      content:
        "نضمن أن كل عنصر في مشروعك يتم بناؤه وفقًا للمخططات المعتمدة والمواصفات والمعايير الهندسية.",
      button: "احجز موعدك الآن",
    },
  ],
};
const data = {
  eng: [
    {
      title: "Engineering Supervision ",
      subtitle: "",
      description1:
        "Our Engineering Supervision service provides hands-on technical monitoring throughout the construction phase. We visit the site regularly to check that work is being executed in line with approved engineering drawings, authority regulations, and material specifications.",
      description2:
        "From structural details to mechanical and electrical systems, our engineers ensure that your project is progressing safely, accurately, and efficiently. We track the percentage of work completed, verify materials used, and support interim payment evaluations, protecting your investment and reinforcing long-term reliability.",
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
      title: "الإشراف الهندسي",
      subtitle: "",
      description1:
        "توفر خدمة الإشراف الهندسي لدينا مراقبة فنية عملية طوال مرحلة البناء. نزور الموقع بانتظام للتحقق من أن العمل يتم تنفيذه بما يتماشى مع المخططات الهندسية المعتمدة، ولوائح الجهات الحكومية، ومواصفات المواد.",
      description2:
        "من التفاصيل الإنشائية إلى الأنظمة الميكانيكية والكهربائية، يضمن مهندسونا تقدم مشروعك بأمان ودقة وكفاءة. نتتبع النسبة المئوية للأعمال المنجزة، ونتحقق من المواد المستخدمة، وندعم تقييمات الدفعات المرحلية، مما يحمي استثمارك ويعزز الموثوقية على المدى الطويل.",
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
      title: "Review of Approved Drawings & Scope",
      content:
        "We begin by reviewing all IFC (Issued for Construction) engineering drawings and ensuring all parties are aligned on specifications.",
    },
    {
      title: "Regular Site Visits & Inspections",
      content:
        "Our engineers conduct scheduled site visits to monitor work execution, highlight technical issues, and ensure compliance.",
    },
    {
      title: "Material & Method Verification",
      content:
        "We confirm that materials on-site match what was approved and that work is being done using proper engineering methods.",
    },
    {
      title: "Progress Tracking & Reporting",
      content:
        "We track the actual percentage of work completed, assist in validating contractor claims, and prepare technical reports.",
    },
    {
      title: "Support for Interim Payments",
      content:
        "We provide technical documentation to support milestone payments, based on verified work progress and compliance.",
    },
    {
      title: "Final Technical Closeout",
      content:
        "We participate in final inspections to ensure the project meets engineering and authority standards before handover.",
    },
  ],
  ar: [
    {
      title: "مراجعة المخططات المعتمدة ونطاق العمل",
      content:
        "نبدأ بمراجعة جميع المخططات الهندسية الصادرة للتنفيذ (IFC) ونتأكد من توافق جميع الأطراف على المواصفات.",
    },
    {
      title: "زيارات ميدانية منتظمة وعمليات تفتيش",
      content:
        "يقوم مهندسونا بزيارات ميدانية مجدولة لمراقبة تنفيذ العمل، وتسليط الضوء على المشكلات الفنية، وضمان الامتثال للمعايير.",
    },
    {
      title: "التحقق من المواد وطرق التنفيذ",
      content:
        "نتأكد من أن المواد المستخدمة في الموقع مطابقة لما تم اعتماده، وأن العمل يتم باستخدام الأساليب الهندسية الصحيحة.",
    },
    {
      title: "متابعة التقدم وإعداد التقارير",
      content:
        "نتتبع النسبة الفعلية للأعمال المنجزة، ونساعد في التحقق من صحة مطالبات المقاول، ونقوم بإعداد التقارير الفنية.",
    },
    {
      title: "دعم الدفعات المرحلية",
      content:
        "نوفر الوثائق الفنية لدعم الدفعات المرحلية، بناءً على التقدم المعتمد في العمل والامتثال للمواصفات.",
    },
    {
      title: "الإغلاق الفني النهائي",
      content:
        "نشارك في عمليات التفتيش النهائية لضمان أن المشروع يفي بالمعايير الهندسية ومعايير الجهات الحكومية قبل التسليم.",
    },
  ],
};
const Faq = {
  eng: [
    {
      title:
        "What’s the difference between site supervision and engineering supervision?",
      content:
        "Site supervision looks at general construction and visual compliance. Engineering supervision is more detailed — focused on structural integrity, MEP accuracy, and technical compliance.",
    },
    {
      title: "Do you only provide supervision for your own designs?",
      content:
        "No. We can supervise any project where engineering drawings are available and authority-approved — regardless of who designed them.",
    },
    {
      title: "How often do your engineers visit the site?",
      content:
        "Visit frequency depends on the project phase and client needs — typically weekly or milestone-based unless daily oversight is required.",
    },
    {
      title: "Does this help with contractor accountability?",
      content:
        "Yes. Our reports and inspections help verify the quality and progress of the work, supporting informed client decisions and fair contractor payments.",
    },
  ],
  ar: [
    {
      title: "ما الفرق بين الإشراف على الموقع والإشراف الهندسي؟",
      content:
        "الإشراف على الموقع يركز على البناء العام والامتثال البصري. أما الإشراف الهندسي فهو أكثر تفصيلاً، ويركز على السلامة الإنشائية ودقة الأنظمة الكهروميكانيكية والامتثال الفني.",
    },
    {
      title: "هل تقدمون الإشراف على تصاميمكم الخاصة فقط؟",
      content:
        "لا. يمكننا الإشراف على أي مشروع تتوفر له مخططات هندسية وموافقات من الجهات الحكومية، بغض النظر عن الجهة التي قامت بالتصميم.",
    },
    {
      title: "كم مرة يزور مهندسوكم الموقع؟",
      content:
        "يعتمد تكرار الزيارات على مرحلة المشروع واحتياجات العميل، وعادة ما تكون أسبوعية أو عند كل مرحلة رئيسية، ما لم تكن هناك حاجة لإشراف يومي.",
    },
    {
      title: "هل يساعد هذا في مساءلة المقاول؟",
      content:
        "نعم. تساعد تقاريرنا وعمليات التفتيش التي نقوم بها في التحقق من جودة وتقدم العمل، مما يدعم اتخاذ قرارات مستنيرة من قبل العميل ويضمن دفعات عادلة للمقاول.",
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

const EngineeringSupervisionPage = () => {
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
            src={"https://i.ibb.co/5XnVB1pt/4-Process-Site-Supervision.jpg"}
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

export default EngineeringSupervisionPage;
