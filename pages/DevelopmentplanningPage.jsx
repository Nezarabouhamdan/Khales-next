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
const HeroSlider = dynamic(() => import("@/components/Slider/Slider"));

export const slides = {
  eng: [
    {
      id: 1,
      image: "https://i.ibb.co/j93MLS7t/5-Banner-Development.jpg",
      title: "Turn Land into a Project — With a Clear Plan",
      content:
        "We evaluate your site and help define what can be built, what’s allowed, and how to move forward with confidence.",
      button: "Book Appointment",
    },
  ],
  ar: [
    {
      id: 1,
      image: "https://i.ibb.co/j93MLS7t/5-Banner-Development.jpg",
      title: "حوّل أرضك إلى مشروع — بخطة واضحة",
      content:
        "نقوم بتقييم موقعك ونساعد في تحديد ما يمكن بناؤه، وما هو مسموح به، وكيفية المضي قدمًا بثقة.",
      button: "احجز موعدك الآن",
    },
  ],
};
const data = {
  eng: [
    {
      title: "Development Planning ",
      subtitle: "",
      description1:
        "Before design or construction begins, every project needs a plan. Our Development Planning service helps landowners, investors, and private clients understand what’s possible on a site, based on regulations, project goals, market potential, and technical requirements.",
      description2:
        "Khales guides you through zoning laws, land use restrictions, authority procedures, and development options, turning a raw plot into a viable project direction. This service helps avoid delays, wasted costs, or design mistakes by making sure your vision is feasible and aligned from the start.",
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
      title: "التخطيط التطويري: ",
      subtitle: "",
      description1:
        "قبل بدء التصميم أو البناء، يحتاج كل مشروع إلى خطة. تساعد خدمة التخطيط التطويري التي نقدمها ملاك الأراضي والمستثمرين والعملاء الخاصين على فهم ما هو ممكن في الموقع، بناءً على اللوائح التنظيمية وأهداف المشروع وإمكانيات السوق والمتطلبات الفنية.",
      description2:
        "ترشدك شركة خالص عبر قوانين تقسيم المناطق، وقيود استخدام الأراضي، وإجراءات الجهات الحكومية، وخيارات التطوير، لتحويل قطعة أرض خام إلى اتجاه مشروع قابل للتطبيق. تساعد هذه الخدمة على تجنب التأخير، والتكاليف المهدرة، وأخطاء التصميم من خلال التأكد من أن رؤيتك مجدية ومتوافقة منذ البداية.",
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
      title: "Site Review & Initial Assessment",
      content:
        "We visit or study the site and gather data on size, location, zoning, utility access, topography, and authority requirements.",
    },
    {
      title: "Regulatory & Municipality Check",
      content:
        "We verify allowable FAR (floor area ratio), height limits, setbacks, building types, and special conditions based on local codes.",
    },
    {
      title: "Project Concept Direction",
      content:
        "We suggest development types (villa, residential block, mixed-use, etc.) that fit both the land and your goals.",
    },
    {
      title: "Time & Cost Planning (Optional)",
      content:
        "We can provide preliminary project timelines and rough cost bands to guide future planning and budgeting.",
    },
    {
      title: "Authority Strategy",
      content:
        "We advise on submission routes, timelines, and which approvals will be needed — helping you avoid process surprises later on.",
    },
    {
      title: "Summary Report & Recommendation",
      content:
        "We deliver a clear document summarizing your land’s potential, next steps, and how to move into design and execution.",
    },
  ],
  ar: [
    {
      title: "مراجعة الموقع والتقييم الأولي",
      content:
        "نقوم بزيارة أو دراسة الموقع وجمع البيانات حول المساحة، والموقع، والتصنيف، وتوفر الخدمات، والطبوغرافيا، ومتطلبات الجهات الحكومية.",
    },
    {
      title: "التدقيق التنظيمي والبلدي",
      content:
        "نتحقق من نسبة المساحة الطابقية المسموح بها (FAR)، وحدود الارتفاع، والارتدادات، وأنواع المباني، والشروط الخاصة بناءً على القوانين المحلية.",
    },
    {
      title: "توجيه مفهوم المشروع",
      content:
        "نقترح أنواع التطوير (فيلا، مبنى سكني، متعدد الاستخدامات، إلخ) التي تناسب كل من الأرض وأهدافك.",
    },
    {
      title: "تخطيط الوقت والتكلفة (اختياري)",
      content:
        "يمكننا تقديم جداول زمنية أولية للمشروع ونطاقات تكلفة تقريبية لتوجيه التخطيط والميزانية المستقبلية.",
    },
    {
      title: "استراتيجية التعامل مع الجهات الحكومية",
      content:
        "نقدم المشورة بشأن مسارات التقديم، والجداول الزمنية، والموافقات المطلوبة، مما يساعدك على تجنب المفاجآت الإجرائية لاحقًا.",
    },
    {
      title: "التقرير الموجز والتوصيات",
      content:
        "نسلم وثيقة واضحة تلخص إمكانيات أرضك، والخطوات التالية، وكيفية الانتقال إلى مرحلة التصميم والتنفيذ.",
    },
  ],
};
const Faq = {
  eng: [
    {
      title: "What is development planning?",
      content:
        "Development planning involves creating a strategic roadmap for your project, from initial concept to long-term performance, ensuring it meets market demands and regulatory requirements.",
    },
    {
      title: "Do you work on projects across all seven emirates?",
      content:
        "Yes, we provide building contracting services in Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Fujairah, Al Ain, and Ras Al Khaimah.",
    },
    {
      title: "How do you ensure my project aligns with market trends?",
      content:
        "We conduct tailored market research to analyze current trends, demands, and opportunities, ensuring your project meets investor and resident expectations.",
    },
    {
      title: "Can you handle both small and large-scale projects?",
      content:
        "Absolutely. Whether it’s a small villa or a large commercial complex, we tailor our services to meet the scale and scope of your project.",
    },
    {
      title: "Do you offer sustainable development solutions?",
      content:
        "Yes, sustainability is a core part of our planning process. We integrate eco-friendly designs and energy-efficient systems into every project.",
    },
    {
      title: "How long does the development planning process take?",
      content:
        "The timeline depends on the project’s complexity. After the initial consultation, we provide a detailed schedule to keep you informed every step of the way.",
    },
    {
      title: "Do you provide facility management planning?",
      content:
        "Yes, we integrate facility management planning from the start, ensuring your project’s long-term performance and connecting you with leading property management companies.",
    },
    {
      title: "Can you work within my budget?",
      content:
        "We create plans that align with your budget without compromising on quality. During the consultation, we discuss your financial parameters and tailor our solutions accordingly.",
    },
    {
      title: "What makes your building contracting services stand out?",
      content:
        "Our commitment to precision, innovation, and excellence sets us apart. We combine award-winning expertise with a client-centric approach to deliver exceptional results.",
    },
    {
      title: "How can I get started with Khales Building Contracting?",
      content:
        "Simply contact us for a consultation. We’ll discuss your vision, provide a customized plan, and guide you through the process of creating your dream project.",
    },
    {
      title: "Is this only for large developments?",
      content:
        "No — this is helpful for any landowner, whether you’re building one villa or planning a full investment project.",
    },
    {
      title: "Can you help us compare multiple land plots?",
      content:
        "Yes. We can provide basic development potential comparisons so you can decide which plot is more suitable.",
    },
    {
      title: "Do you also help with concept design after this?",
      content:
        "Yes. After the development plan is clear, we can proceed with full design, approvals, and project management.",
    },
    {
      title: "How long does a development plan take?",
      content:
        "Most basic development studies are completed in 1–2 weeks, depending on plot complexity and authority feedback.",
    },
  ],
  ar: [
    {
      title: "ما هو التخطيط التطويري؟",
      content:
        "التخطيط التطويري يشمل إنشاء خارطة طريق استراتيجية لمشروعك، بدءًا من المفهوم الأولي ووصولاً إلى الأداء طويل الأمد، مع ضمان توافقه مع متطلبات السوق واللوائح التنظيمية.",
    },
    {
      title: "هل تعملون على مشاريع في جميع الإمارات السبع؟",
      content:
        "نعم، نقدم خدمات التخطيط التطويري في دبي، أبوظبي، الشارقة، عجمان، أم القيوين، الفجيرة، العين، ورأس الخيمة.",
    },
    {
      title: "كيف تضمنون أن مشروعي يتوافق مع اتجاهات السوق؟",
      content:
        "نقوم بإجراء أبحاث سوق مخصصة لتحليل الاتجاهات الحالية وحجم الطلب والفرص المتاحة، مما يضمن أن مشروعك يلبي توقعات المستثمرين والمستفيدين.",
    },
    {
      title: "هل يمكنكم التعامل مع المشاريع الصغيرة والكبيرة؟",
      content:
        "بالتأكيد. سواء كان مشروعًا سكنيًا صغيرًا أو مجمعًا تجاريًا كبيرًا، نقدم خدمات مخصصة تناسب حجم ونطاق مشروعك.",
    },
    {
      title: "هل تقدمون حلولاً للتطوير المستدام؟",
      content:
        "نعم، تُعد الاستدامة جزءًا أساسيًا من عملية التخطيط لدينا. ندمج التصاميم الصديقة للبيئة والأنظمة الموفرة للطاقة في كل مشروع.",
    },
    {
      title: "كم تستغرق عملية التخطيط التطويري؟",
      content:
        "تعتمد المدة على تعقيد المشروع. بعد الاستشارة الأولية، نقدم جدولاً زمنياً مفصلاً لإبقائك على اطلاع بكل خطوة.",
    },
    {
      title: "هل تقدمون تخطيطًا لإدارة المرافق؟",
      content:
        "نعم، ندمج تخطيط إدارة المرافق من البداية، مما يضمن الأداء طويل الأمد لمشروعك وربطه بشركات إدارة العقارات الرائدة.",
    },
    {
      title: "هل يمكنكم العمل ضمن ميزانيتي؟",
      content:
        "نضع خططًا تتوافق مع ميزانيتك دون المساس بالجودة. خلال الاستشارة، نناقش معاييرك المالية ونقدم حلولاً مخصصة.",
    },
    {
      title: "كيف يمكنني البدء مع خدمات التخطيط التطويري؟",
      content:
        "ببساطة، قم بالاتصال بنا لترتيب استشارة. سنناقش رؤيتك ونقدم خطة مخصصة ونرشدك خلال عملية إنشاء مشروعك المثالي.",
    },
    {
      title: "هل هذه الخدمة مخصصة فقط للمشاريع الكبيرة؟",
      content:
        "لا، هذه الخدمة مفيدة لأي مالك أرض، سواء كنت تبني فيلا واحدة أو تخطط لمشروع استثماري كامل.",
    },
    {
      title: "هل يمكنكم المساعدة في مقارنة عدة قطع أراضٍ؟",
      content:
        "نعم، يمكننا تقديم مقارنات أساسية لإمكانيات التطوير لمساعدتك في تحديد قطعة الأرض الأنسب.",
    },
    {
      title: "هل تساعدون أيضاً في تصميم المفهوم بعد هذه المرحلة؟",
      content:
        "نعم، بعد أن تتضح خطة التطوير، يمكننا المتابعة بالتصميم الكامل، والموافقات، وإدارة المشروع.",
    },
    {
      title: "كم من الوقت تستغرق خطة التطوير؟",
      content:
        "تُستكمل معظم دراسات التطوير الأساسية في غضون أسبوع إلى أسبوعين، اعتمادًا على تعقيد قطعة الأرض وردود الجهات الحكومية.",
    },
  ],
};

const ProjectHighlightdata = {
  eng: [
    {
      Title: " Case Studies",
      button: " Get in touch with us",

      Subtitle: "Residential Project Development – Sharjah",
      Subheader: "A Turnkey Success Story",
      description: [
        "In Sharjah, an investor owned a strategically located plot of land and planned to develop it into a medium-density residential compound. There was no clear vision for the layout, design, or execution strategy, and the investor needed a partner who could take the lead from planning through to delivery.",
        "The main challenge was turning a general vision into a practical, phased development plan. A feasibility study was needed, along with initial design concepts, budgeting, and a deep understanding of the zoning and architectural requirements of the area.",
        "We started by analyzing the land—its access points, infrastructure, and surrounding developments. From there, we developed an initial masterplan that divided the plot into villas and stand-alone units, with integrated parking and service areas. A phased execution plan was created, with budget estimates and timelines for each phase.",
        "We prepared preliminary concept designs and coordinated with local authorities in Sharjah to secure early-stage approvals. A marketing strategy was also proposed, aligned with the product type, target audience, and market analysis. This was a fully integrated project development service, covering land planning, conceptual design, financial modeling, and authority coordination—built for investors who want to turn land into successful developments without getting involved in every day-to-day detail.",
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
      Subtitle: " تطوير مشروع سكني – الشارقة",
      Subheader: "قصة نجاح مفتاح في اليد",
      description: [
        "في إمارة الشارقة، امتلك أحد المستثمرين قطعة أرض ذات موقع استراتيجي وكان يهدف إلى تحويلها إلى مجمع سكني متوسط الكثافة. لم تكن لديه رؤية واضحة فيما يتعلق بتقسيم الأراضي، أو التصميم المعماري، أو حتى استراتيجية التنفيذ الشاملة، ولذلك كان المستثمر بحاجة إلى شريك موثوق يمكنه تحويل هذه الأرض إلى مشروع استثماري ناجح ومتكامل، بدءًا من مرحلة التخطيط الأولي وصولًا إلى التسليم النهائي.",
        "تمثل التحدي الرئيسي في ترجمة هذه الرؤية الطموحة إلى خطة تطوير عملية ومفصلة قابلة للتنفيذ على أرض الواقع. كان من الضروري إجراء دراسات جدوى شاملة لتقييم الجدوى الاقتصادية للمشروع، ووضع التصاميم المعمارية الأولية التي تلبي احتياجات السوق، وتقدير الميزانيات الواقعية لكل مرحلة من مراحل التطوير، بالإضافة إلى فهم واستيعاب المتطلبات التنظيمية والمعمارية الخاصة بالمنطقة.",
        "بدأ فريقنا المتخصص بدراسة الموقع بعناية فائقة، مع الأخذ في الاعتبار جميع الجوانب الهامة مثل المداخل الرئيسية، والبنية التحتية المحيطة، والنسيج العمراني القائم. ثم قمنا بتطوير مفهوم معماري مبدئي مبتكر يشمل تقسيمًا مدروسًا للأرض إلى فلل فاخرة ووحدات سكنية مستقلة ذات تصاميم عصرية، مع توفير مواقف سيارات كافية ومناطق خدمية متكاملة. بعد ذلك، تم إعداد خطة تنفيذية مفصلة ومتعددة المراحل، مع تقدير دقيق للميزانية والجدول الزمني المتوقع لكل مرحلة من مراحل المشروع.",
        "قمنا بإعداد التصاميم المعمارية المبدئية وعرضها وتنسيقها مع الهيئات والجهات المعنية في إمارة الشارقة للحصول على الموافقات الأولية اللازمة. بالإضافة إلى ذلك، قدمنا خطة تسويقية مبدئية مستنيرة تستند إلى نوع المنتج العقاري المقترح، والجمهور المستهدف المحتمل، وتحليل شامل للسوق العقاري المحلي.",
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

const DevelopmentplanningPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage(); // Assuming you have a language context
  const [isClient, setIsClient] = useState(false);

  // change metadata from client side
  useEffect(() => {
    document.title = `${
      language === "ar" ? "التخطيط التطويري" : "Develpoment Planing"
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
            src={"https://i.ibb.co/qMyChkJ5/6-Process-Development.jpg"}
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

export default DevelopmentplanningPage;
