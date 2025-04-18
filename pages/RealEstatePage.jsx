"use client"
import React, { useEffect, useState } from "react";
import InteriorDesign from "../components/InteriorDesign/InteriorDesign";
import OurProcessWork from "../components/OurProcessWork/OurProcessWork";
import { Row2, Column } from "../utils/Globalstyles";
import { GreenText, Title as Title2 } from "../components/Whoweare/TextContent";
import CTASection from "../components/Homecontact/CTASection";
import ProjectHighlight from "../components/Projecthighlights/ProjectHighlight";
import { useLanguage } from "../Context/Languagecontext"; // Import the language context
import dynamic from "next/dynamic";
import banner from "@/public/assets/banner/project.jpeg"
const HeroSlider = dynamic(() => import('@/components/Slider/Slider'));

export const slides = {
  eng: [
    {
      id: 1,
      image:
        banner,
      title: "Your Gateway to Smart Real Estate",
      content:
        "Unlock the full potential of your investment with strategic real estate insights",
      button: "Learn More",
    },
  ],
  ar: [
    {
      id: 1,
      image:
        banner,
      title: "بوابتك نحو العقارات الذكية",
      content: "اكتشف إمكانيات استثمارك بالكامل مع استراتيجيات عقارية ذكية.",
      button: "اعرف المزيد",
    },
  ],
};

const data = {
  eng: [
    {
      title: "Real Estate Solutions:",
      subtitle: "Your Trusted Partner for All Your Real Estate Needs",
      description1:
        "Navigating the real estate landscape can be complex, but it doesn't have to be. We offer a comprehensive suite of real estate solutions designed to empower you at every stage of your property journey. From development consulting and investment analysis to property management, our team of experienced professionals provides strategic insights and tailored solutions to elevate your projects and investments. Whether you're developing a new property, expanding your portfolio, or managing existing assets, we've got you covered.",
      description2:
        "Our expertise spans Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Fujairah, Al Ain, and Ras Al Khaimah, ensuring your projects thrive no matter where they're located. With a focus on precision, sustainability, and client satisfaction, we're here to make your real estate journey seamless and successful.",
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
        "في خالص، نقدم مجموعة شاملة من خدمات الحلول العقارية والاستشارات المتعلقة بالأراضي، لتلبية احتياجات الأفراد والمستثمرين في دولة الإمارات العربية المتحدة.نعمل على تحويل رؤيتك العقارية إلى واقع ناجح من خلال تقديم استشارات دقيقة وموثوقة تغطي جميع مراحل المشروع، بدءًا من التخطيط الأولي وصولًا إلى التنفيذ والتسليم.يضمن فريقنا المتخصص تقديم نصائح متكاملة تشمل التقييم البيئي والتنفيذي والقانوني لضمان تجنب المخاطر وتحقيق أقصى استفادة من الممتلكات.",
      description2:
        "نحرص على تقديم استشارات عقارية دقيقة لمساعدتك في اتخاذ قرارات استثمارية صائبة، سواء كان هدفك شراء أرض جديدة أو تطوير عقار قائم. نقوم بإجراء تحليلات دقيقة للسوق وتقديم مشورة استثمارية مبنية على دراسات موثوقة لضمان نجاح استثمارك. كما نقدم خدمات المسح والترسيم لضمان دقة حدود العقارات وتوافقها مع المعايير القانونية، مما يساعدك على تفادي المخاطر المالية والقانونية المرتبطة بملكية الأراضي واستخدامها.",
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
      title: "Real Estate Development Consulting",
      content:
        "We begin by laying the foundation for your project's success. Our team conducts thorough market research to analyze current trends, demand, and competition in the UAE real estate market. We then perform feasibility studies to assess the financial, technical, and legal viability of your project. Based on these insights, we provide strategic recommendations to optimize your development plans and ensure maximum return on investment.",
    },
    {
      title: "Property Acquisition & Disposition",
      content:
        "When it comes to buying or selling properties, we ensure seamless transactions from start to finish. Our process includes property identification, where we source assets that align with your investment goals and budget. We then conduct valuation and due diligence to determine fair market value and identify potential risks. Finally, we handle all negotiations, contracts, and legal formalities to ensure a smooth and secure transaction.",
    },
    {
      title: "Real Estate Investment Analysis",
      content:
        "To help you make informed decisions, we provide comprehensive investment analysis. This includes market analysis to evaluate dynamics, property values, and emerging trends. We also create detailed financial models to project potential returns and assess risks. Our risk assessment process identifies and mitigates potential challenges, ensuring your investment is both profitable and secure.",
    },
    {
      title: "Project Management for Real Estate",
      content:
        "From concept to completion, we manage every aspect of your project to ensure it's delivered on time and within budget. Our process begins with planning and design, where we collaborate with architects and engineers to create a detailed project plan. We then handle procurement and tendering, sourcing high-quality materials and contractors at competitive rates. During the construction phase, we monitor progress, quality, and compliance to ensure everything aligns with your vision. Finally, we conduct final inspections and commissioning to ensure all systems are operational before handover.",
    },
    {
      title: "Real Estate Portfolio Management",
      content:
        "We help you optimize and diversify your real estate holdings for maximum profitability. Our process starts with a portfolio assessment to evaluate your current assets and identify areas for improvement. We then develop customized strategies tailored to your investment goals. Throughout the process, we provide performance monitoring to track the success of your portfolio and make adjustments as needed.",
    },
    {
      title: "Sustainability & Green Building Consultation",
      content:
        "Sustainability is at the core of everything we do. We guide you through the integration of eco-friendly materials and energy-efficient systems into your project. Our team also assists with achieving green certifications like LEED or Estidama, ensuring your project meets the highest environmental standards. Additionally, we implement practices to enhance operational efficiency, reducing energy consumption and minimizing environmental impact.",
    },
    {
      title: "Property & Facility Management",
      content:
        "We simplify the day-to-day operations of your properties, allowing you to focus on what matters most. Our services include tenant relations, where we manage leases, inquiries, and conflict resolution. We also oversee maintenance and repairs, ensuring your property remains in top condition. To keep you informed, we provide detailed financial reporting on income, expenses, and overall performance.",
    },
    {
      title: "Regulatory Compliance & Permitting",
      content:
        "Navigating the regulatory landscape can be challenging, but we make it easy. Our team stays updated on local laws and regulations affecting your project. We handle all necessary permits and approvals, ensuring your project complies with all requirements. Throughout the process, we provide ongoing support to address any regulatory changes or challenges that may arise.",
    },
  ],
  ar: [
    {
      title: "تحديد الرؤية وإعداد خطة المشروع",
      content:
        "نبدأ العملية بعقد جلسة استشارية لفهم متطلباتك وتطلعاتك الاستثمارية. نقوم بإعداد خطة مفصلة تتضمن تحليل القيمة السوقية وتحديد أفضل استخدام للأرض. تشمل هذه المرحلة أيضًا إعداد خارطة طريق واضحة تأخذ في الاعتبار جميع الجوانب المالية والقانونية والبيئية لتحقيق أفضل النتائج.",
    },
    {
      title:
        "الاستحواذ على العقارات والتصرف فيها - إدارة متكاملة لعمليات الشراء والبيع",
      content:
        "نتولى جميع جوانب عمليات الشراء والبيع بشكل يضمن تنفيذ المعاملات بسلاسة. يبدأ ذلك من تحديد العقارات المناسبة التي تتماشى مع أهدافك الاستثمارية وميزانيتك، يليه تقييم القيمة السوقية والتحقق من المخاطر المحتملة. نتولى أيضًا التفاوض على العقود وضمان التوافق مع اللوائح المحلية لتجنب المخاطر القانونية وضمان صفقة آمنة وناجحة.",
    },
    {
      title: "تحليل الاستثمار العقاري - قرارات استثمارية مستنيرة",
      content:
        "نقدم تحليلًا شاملاً للاستثمار العقاري يشمل تحليل السوق لتقييم الديناميكيات والقيم الناشئة. نقوم بتطوير نماذج مالية تفصيلية لتقدير العوائد المحتملة وتقييم المخاطر. يعتمد نهجنا على تحليل المخاطر لتحديد التحديات المحتملة ووضع استراتيجيات للتخفيف منها، مما يضمن تحقيق عائد استثماري آمن ومريح.",
    },
    {
      title: "إدارة المشاريع العقارية - من الفكرة إلى الإنجاز",
      content:
        "ندير مشاريع العقارية من التخطيط إلى التسليم، مع الحرص على تنفيذ جميع الجوانب بدقة وكفاءة. نقوم بتنسيق أعمال التصميم والبناء، وإدارة المشتريات والمناقصات، وضمان الالتزام بالجودة والمعايير الزمنية. يشرف فريقنا على متابعة سير العمل والتأكد من تنفيذ المشروع وفق أعلى معايير الجودة.",
    },
    {
      title: "إدارة المحافظ العقارية - تحقيق أقصى عائد على الاستثمار",
      content:
        "نعمل على تحسين وتنويع المحفظة العقارية لتحقيق أقصى ربحية. نبدأ بتقييم الأصول الحالية وتحديد المجالات التي يمكن تحسينها. نقوم بوضع استراتيجيات استثمارية مخصصة تتماشى مع أهدافك المالية، مع مراقبة مستمرة للأداء لضمان تحقيق أفضل النتائج.",
    },
    {
      title: "الاستدامة والاستشارات البيئية - بناء مستدام من أجل المستقبل",
      content:
        "ندرك أهمية البناء المستدام، لذا نقدم استشارات حول دمج المواد الصديقة للبيئة وتقنيات توفير الطاقة في مشاريعك. نقدم الدعم في الحصول على الشهادات البيئية مثل LEED أو Estidama لضمان التوافق مع المعايير البيئية الدولية، مما يقلل من الأثر البيئي ويحسن الكفاءة التشغيلية.",
    },
    {
      title: "إدارة الممتلكات والمرافق - راحة البال وأمان الاستثمار",
      content:
        "ندير الممتلكات لضمان تشغيل سلس وخالٍ من المشاكل. نقدم خدمات مثل إدارة علاقات المستأجرين ومعالجة استفساراتهم، بالإضافة إلى إدارة الصيانة والإصلاحات بشكل منتظم. نوفر تقارير مالية تفصيلية تعكس الدخل والنفقات لتحليل الأداء وضمان تحقيق أقصى ربحية.",
    },
    {
      title: "الامتثال التنظيمي والحصول على التصاريح - ضمان الامتثال الكامل",
      content:
        "قد يبدو التعامل مع الجوانب التنظيمية للمشاريع معقدًا، ولكننا نبسطه لك. يظل فريقنا على اطلاع دائم بالقوانين واللوائح المحلية التي تؤثر على مشروعك. نتولى مسؤولية الحصول على جميع التصاريح والموافقات اللازمة، لضمان توافق مشروعك مع كافة المتطلبات. كما نقدم دعمًا مستمرًا طوال فترة المشروع، لمعالجة أي تغييرات تنظيمية أو تحديات قد تظهر",
    },
  ],
};

const Faq = {
  eng: [
    {
      title: "What real estate services do you offer?",
      content:
        "We offer a comprehensive range of services, including development consulting, property acquisition and disposition, investment analysis, project management, portfolio management, sustainability consultation, property and facility management, and regulatory compliance.",
    },
    {
      title: "Do you work on projects across all seven emirates?",
      content:
        "Yes, we provide real estate solutions in Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Fujairah, Al Ain, and Ras Al Khaimah.",
    },
    {
      title: "How do you ensure my investment is profitable?",
      content:
        "We conduct in-depth market research, financial modeling, and risk assessments to guide your investment strategies and maximize returns. Our goal is to help you make informed decisions that align with your financial goals.",
    },
    {
      title: "Can you handle both residential and commercial projects?",
      content:
        "Absolutely. Whether it's a luxury villa, a commercial office, or a mixed-use development, we tailor our services to meet your specific needs and objectives.",
    },
    {
      title: "Do you offer sustainable real estate solutions?",
      content:
        "Yes, sustainability is a core part of our approach. We integrate eco-friendly materials, energy-efficient systems, and green building practices into every project to minimize environmental impact and enhance long-term value.",
    },
    {
      title: "How do you manage regulatory compliance?",
      content:
        "Our team stays updated on local laws and regulations and handles all necessary permits and approvals to ensure your project complies with all requirements. We also provide ongoing support to address any regulatory changes or challenges.",
    },
    {
      title: "Can you manage my existing property portfolio?",
      content:
        "Yes, we offer portfolio management services to optimize and diversify your real estate holdings. We develop customized strategies to ensure your portfolio is balanced, profitable, and aligned with your investment goals.",
    },
    {
      title: "What makes your real estate services stand out?",
      content:
        "Our client-centric approach, unparalleled expertise, and commitment to sustainability set us apart. We combine strategic insights with cutting-edge technology to deliver exceptional results tailored to your needs.",
    },
    {
      title: "How can I get started with Khales Real Estate Solutions?",
      content:
        "Simply contact us for a consultation. We'll discuss your goals, provide a customized plan, and guide you through every step of your real estate journey.",
    },
  ],
  ar: [
    {
      title: "ما هي الخدمات العقارية التي تقدمها شركة خالص؟",
      content:
        "نحن نقدم مجموعة شاملة من الخدمات العقارية تشمل الاستشارات التطويرية، الاستحواذ على العقارات والتصرف فيها، تحليل الاستثمار، إدارة المشاريع، إدارة المحافظ العقارية، الاستدامة والاستشارات البيئية، إدارة الممتلكات والمرافق، والامتثال التنظيمي. نسعى دائمًا إلى تقديم حلول متكاملة تلبي احتياجات العملاء المختلفة.",
    },
    {
      title: "هل تعملون على مشاريع في جميع الإمارات السبع؟",
      content:
        "نعم، نقدم حلولنا العقارية في جميع أنحاء دولة الإمارات العربية المتحدة، بما في ذلك دبي، أبوظبي، الشارقة، عجمان، أم القيوين، الفجيرة، العين، ورأس الخيمة.",
    },
    {
      title: "كيف تضمنون أن يكون استثماري مربحًا؟",
      content:
        "نحن نقوم بإجراء أبحاث سوقية معمقة، ونماذج مالية مفصلة، وتقييمات مخاطر لضمان اتخاذ قرارات استثمارية مدروسة. نهدف إلى تعظيم العوائد من خلال تحليل دقيق للأسواق الناشئة وضمان توافق الاستثمار مع أهدافك المالية.",
    },
    {
      title: "هل يمكنكم إدارة مشاريع سكنية وتجارية؟",
      content:
        "نعم، نقدم خدمات إدارة المشاريع لكل من المشاريع السكنية والتجارية. سواء كان ذلك فيلا فاخرة، مكتب تجاري، أو تطوير متعدد الاستخدامات، نعمل على تقديم خدمات مخصصة لتلبية احتياجاتك وأهدافك.",
    },
    {
      title: "هل تقدمون حلولًا عقارية مستدامة؟",
      content:
        "نعم، نعتبر الاستدامة جزءًا أساسيًا من نهجنا. ندمج مواد صديقة للبيئة، وأنظمة كفاءة الطاقة، وممارسات البناء الأخضر في كل مشروع للحد من التأثير البيئي وتعزيز القيمة طويلة الأمد.",
    },
    {
      title: "كيف تديرون الامتثال التنظيمي؟",
      content:
        "يبقى فريقنا على اطلاع دائم على القوانين واللوائح المحلية، ونتولى جميع الإجراءات اللازمة للحصول على التصاريح والموافقات. نقدم دعمًا مستمرًا لضمان امتثال المشروع لجميع المتطلبات القانونية.",
    },
    {
      title: "هل يمكنكم إدارة محفظتي العقارية الحالية؟",
      content:
        "نعم، نقدم خدمات إدارة المحافظ العقارية لتحسين أداء أصولك العقارية. نقوم بتطوير استراتيجيات مخصصة لضمان توازن المحفظة وزيادة الربحية بما يتماشى مع أهدافك الاستثمارية.",
    },
    {
      title: "ما الذي يميز خدماتكم العقارية عن غيرها؟",
      content:
        "ما يميزنا هو النهج الذي يركز على العميل، الخبرة العالية، والالتزام بالاستدامة. نحن نمزج بين الرؤى الاستراتيجية والتكنولوجيا الحديثة لتقديم نتائج متميزة تفوق التوقعات.",
    },
    {
      title: "كيف يمكنني البدء مع خدمات خالص للحلول العقارية؟",
      content:
        "ما عليك سوى الاتصال بنا لتحديد موعد للاستشارة. سنناقش أهدافك ونقدم خطة مخصصة لإرشادك خلال رحلتك العقارية، مما يضمن لك اتخاذ قرارات ناجحة ومستدامة.",
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
    document.title = `${language === "ar" ? "خدمات إدارة المشاريع" : "Project mangment"}`;
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

export default RealEstatePage