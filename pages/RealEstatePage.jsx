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
      image: "https://i.ibb.co/fVqLKY3r/investing.jpg",
      title: "Your Gateway to Smart Investment",
      content:
        "Partner with us to connect with investors and bring premium land developments to life.",
      button: "Learn More",
    },
  ],
  ar: [
    {
      id: 1,
      image: "https://i.ibb.co/fVqLKY3r/investing.jpg",
      title: "بوابتك نحو العقارات الذكية",
      content: "شركاؤنا لربطك بالمستثمرين وإحياء تطويرات الأراضي المتميزة.",
      button: "اعرف المزيد",
    },
  ],
};

const data = {
  eng: [
    {
      title: "Investing Solutions:",
      subtitle: "",
      description1:
        "Khales provides a high-value investment property introduction service that connects developers and brokers with qualified investors actively seeking land for residential or commercial development across the UAE, Middle East and Europe. We partner with trusted real estate professionals to access verified land opportunities, then match these listings with serious investors from our network. Once aligned, we facilitate direct introductions between both parties, ensuring a transparent and efficient process. Our role is strategic—we focus on deal enablement while maintaining discretion and professionalism throughout.",
      description2:
        "In addition to sourcing investment opportunities, Khales offers end-to-end support for clients who wish to develop their newly acquired land. From architectural design to full-scale construction and project management, we provide turnkey solutions that bring each investment to life. This integrated approach allows investors to move seamlessly from acquisition to execution with a single, experienced partner who understands both the market and the build environment.",
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
      title: "الحلول العقارية:",
      subtitle: "شريكك الموثوق لجميع احتياجاتك العقارية",
      description1:
        "تقدم خالص خدمة عالية القيمة لتقديم فرص الاستثمار العقاري، حيث تربط المطورين والوسطاء مع مستثمرين مؤهلين يبحثون بنشاط عن أراضٍ للتطوير السكني أو التجاري في الإمارات والشرق الأوسط وأوروبا. نتعاون مع محترفين موثوقين في القطاع العقاري للوصول إلى فرص أراضٍ مُتحقق منها، ثم نطابق هذه العروض مع مستثمرين جادين من شبكتنا. بمجرد التوافق، نسهل التعارف المباشر بين الطرفين، مع ضمان عملية شفافة وفعالة. دورنا استراتيجي—نركز على تمكين الصفقات مع الحفاظ على السرية والاحترافية.",
      description2:
        "بالإضافة إلى توفير فرص الاستثمار، تقدم خالص دعمًا متكاملًا للعملاء الراغبين في تطوير أراضيهم الجديدة. من التصميم المعماري إلى البناء الكامل وإدارة المشاريع، نقدم حلولاً شاملة تُحيي كل استثمار. هذا النهج المتكامل يسمح للمستثمرين بالانتقال بسلاسة من مرحلة التملك إلى التنفيذ مع شريك واحد ذي خبرة يفهم السوق وبيئة البناء.",
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
      title: "1. Partner Alignment",
      content:
        "We begin by partnering with select real estate developers, brokers, and landowners who offer verified and high-potential land opportunities. Each collaboration is formalized through a clear agreement outlining roles, confidentiality, and success structure.",
    },
    {
      title: "2. Property Portfolio Curation",
      content:
        "Once onboard, our partners share their available plots or off-plan assets. We review and structure each opportunity into a clean investment profile—highlighting zoning, usage, pricing, development potential, and location insights.",
    },
    {
      title: "3. Investor Matching & Introduction",
      content:
        "We engage with pre-qualified investors from our network who are actively seeking land for development. Once there’s a fit, we facilitate a direct introduction between the investor and the property partner, ensuring strategic alignment and clarity on both sides.",
    },
    {
      title: "4. Deal Facilitation & Confirmation",
      content:
        "While we do not negotiate on behalf of either party, we remain involved to ensure smooth communication throughout the early stages.",
    },
    {
      title: "5. Turnkey Development",
      content:
        "For investors looking to build, we offer a full suite of design and construction services—from concept development, architectural design, and authority approvals to execution and handover. Our in-house project team manages everything, turning land into a delivered asset.",
    },
  ],
  ar: [
    {
      title: "محاذاة الشركاء",
      content:
        "نبدأ بالشراكة مع مطورين ووسطاء عقاريين وعارضي أراضٍ مُختارين يقدمون فرص أراضٍ مُتحقق منها وعالية الإمكانات. يتم إضفاء الطابع الرسمي على كل تعاون عبر اتفاقية واضحة تحدد الأدوار والسرية وهيكل النجاح.",
    },
    {
      title: "تجميع محفظة العقارات",
      content:
        "بمجرد الانضمام، يشارك شركاؤنا قطع الأراضي المتاحة أو الأصول قيد التطوير. نقوم بمراجعة كل فرصة وتنظيمها في ملف استثماري واضح—مع إبراز التقسيمات والاستخدامات والأسعار وإمكانات التطوير ورؤى الموقع.",
    },
    {
      title: "المطابقة مع المستثمرين والتعارف",
      content:
        "نتعامل مع مستثمرين مؤهلين مسبقًا من شبكتنا الذين يبحثون بنشاط عن أراضٍ للتطوير. عند وجود توافق، نسهل التعارف المباشر بين المستثمر والشريك العقاري، مع ضمان محاذاة استراتيجية ووضوح للطرفين.",
    },
    {
      title: "تسهيل الصفقة والتأكيد",
      content:
        "بينما لا نتفاوض نيابة عن أي طرف، نبقى مشاركين لضمان تواصل سلس خلال المراحل الأولى.",
    },
    {
      title: "التطوير الشامل",
      content:
        "بالنسبة للمستثمرين الراغبين في البناء، نقدم مجموعة كاملة من خدمات التصميم والبناء—من تطوير المفهوم والتصميم المعماري والموافقات الرسمية إلى التنفيذ والتسليم. فريقنا الداخلي يدير كل شيء، محولاً الأرض إلى أصل مُسلم.",
    },
  ],
};

const Faq = {
  eng: [
    {
      title: "What type of properties do you promote?",
      content:
        "We focus on prime land plots and off-plan opportunities for residential, commercial, and mixed-use development projects across the UAE.",
    },
    {
      title:
        "Do you work only as a connector, or do you manage the development too?",
      content:
        "Both. Our initial role is to connect investors with land opportunities. Once the land is secured, we offer optional design, construction, and project management services through our in-house team.",
    },
    {
      title: "Who handles negotiations and contracts?",
      content:
        "We do not engage in sales or legal representation. All negotiations and contracts are handled directly between the investor and the property partner.",
    },
    {
      title: "How are you compensated?",
      content:
        "We receive a success-based fee from the property partner upon completion of a successful deal, as agreed in a signed collaboration contract.",
    },
    {
      title:
        "Do you build custom villas or commercial properties for investors?",
      content:
        "Yes. After land acquisition, we offer tailored turnkey solutions for villa construction, residential buildings, and commercial projects—covering design, permits, build, and handover.",
    },
  ],
  ar: [
    {
      title: "ما نوع العقارات التي تروجون لها؟",
      content:
        "نركز على قطع الأراضي المتميزة وفرص الأصول قيد التطوير للمشاريع السكنية والتجارية والمختلطة في الإمارات.",
    },
    {
      title: "هل تعملون كوسيط فقط أم تديرون التطوير أيضًا؟",
      content:
        "كلا. دورنا الأولي هو ربط المستثمرين بفرص الأراضي. بمجرد تأمين الأرض، نقدم خدمات اختيارية للتصميم والبناء وإدارة المشاريع عبر فريقنا الداخلي.",
    },
    {
      title: "من يتولى المفاوضات والعقود؟",
      content:
        "نحن لا نشارك في المبيعات أو التمثيل القانوني. تتم جميع المفاوضات والعقود مباشرة بين المستثمر والشريك العقاري.",
    },
    {
      title: "كيف يتم تعويضكم؟",
      content:
        "نحصل على رسوم مبنية على النجاح من الشريك العقاري بعد إتمام الصفقة بنجاح، وفقًا لعقد تعاون موقع.",
    },
    {
      title: "هل تقومون ببناء فيلات مخصصة أو عقارات تجارية للمستثمرين؟",
      content:
        "نعم. بعد امتلاك الأرض، نقدم حلولاً شاملة لبناء الفيلات والمباني السكنية والتجارية—تشمل التصميم والتراخيص والبناء والتسليم.",
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

const RealEstatePage = () => {
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

export default RealEstatePage;
