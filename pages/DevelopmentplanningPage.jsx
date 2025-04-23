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
      image: "https://i.ibb.co/fzFfphKy/development.jpg",
      title: "Shape Your Vision with Smart Planning",
      content:
        "Empowering your projects with innovative and sustainable planning solutions.",
      button: "Start Planning Today",
    },
  ],
  ar: [
    {
      id: 1,
      image: "https://i.ibb.co/fzFfphKy/development.jpg",
      title: "شكّل رؤيتك بتخطيط ذكي",
      content: "نُمكّن مشاريعك بحلول تخطيط مبتكرة ومستدامة.",
      button: "ابدأ التخطيط الآن",
    },
  ],
};
const data = {
  eng: [
    {
      title: "Development Planning: ",
      subtitle: "Craft Your Vision, Achieve Success",
      description1:
        "Every successful project begins with a clear and well-defined plan. We specialize in delivering comprehensive development planning services that transform your vision into a strategic roadmap for success. Our approach ensures that every aspect of your project is meticulously planned, from initial concept to final execution.We offer end-to-end solutions, starting with market research and extending to long-term facility management",
      description2:
        "Our expertise spans across key regions in the UAE, including Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Fujairah, Al Ain, and Ras Al Khaimah. No matter the scale or complexity, we are committed to ensuring your project thrives in every phase.Whether you’re envisioning a residential community, a commercial hub, or a mixed-use development, our team is here to bring your ideas to life. With a focus on innovation, sustainability, and client satisfaction, we turn challenges into opportunities and dreams into reality.",
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
      subtitle: " صياغة رؤيتك وتحقيق النجاح",
      description1:
        "يبدأ كل مشروع ناجح بخطة واضحة ومحددة بدقة. نحن نختص بتقديم خدمات التخطيط التطويري الشاملة التي تحول رؤيتك إلى خارطة طريق استراتيجية للنجاح. نضمن من خلال نهجنا الدقيق أن يتم التخطيط لكل جانب من جوانب مشروعك بدقة، بدءًا من المفهوم الأولي ووصولًا إلى التنفيذ النهائي.نقدم حلولًا شاملة تبدأ من أبحاث السوق وتمتد إلى إدارة المرافق على المدى الطويل.",
      description2:
        " تمتد خبرتنا عبر المناطق الرئيسية في الإمارات العربية المتحدة، بما في ذلك دبي، أبوظبي، الشارقة، عجمان، أم القيوين، الفجيرة، العين، ورأس الخيمة. بغض النظر عن حجم المشروع أو تعقيده، نحن ملتزمون بضمان ازدهار مشروعك في كل مرحلة.سواء كنت تتخيل مجتمعًا سكنيًا، أو مركزًا تجاريًا، أو تطويرًا مختلط الاستخدامات، فإن فريقنا موجود هنا لتحويل أفكارك إلى واقع. مع التركيز على الابتكار والاستدامة ورضا العملاء، نحول التحديات إلى فرص والأحلام إلى واقع ملموس",
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
      title: "Project Definition & Roadmap",
      content:
        "We define your project’s scope, objectives, and deliverables through meticulous programming, creating a clear roadmap for a well-coordinated development process.",
    },
    {
      title: "Tailored Market Research",
      content:
        "Our market research services analyze current trends, demands, and opportunities in the UAE real estate market, ensuring your project aligns with investor and resident needs.",
    },
    {
      title: "Pre-Feasibility Studies",
      content:
        "We conduct comprehensive pre-feasibility studies to assess your project’s potential, identifying challenges and opportunities while considering investment firms and market dynamics.",
    },
    {
      title: "Concept Design Management",
      content:
        "Through collaborative concept design management, we refine and visualize your ideas, laying a strong foundation for the next stages of development.",
    },
    {
      title: "Sustainable Construction",
      content:
        "We integrate eco-friendly materials and energy-efficient practices to minimize environmental impact, ensuring your project is as sustainable as it is stunning.",
    },
    {
      title: " Facility Management Integration",
      content:
        "We integrate facility management planning from the start, ensuring your project’s long-term performance and connecting you with leading property management companies in the UAE.",
    },
  ],
  ar: [
    {
      title: " تعريف المشروع وإعداد خارطة الطريق",
      content:
        "في بداية كل مشروع، نعمل على تحديد نطاق المشروع وأهدافه بشكل دقيق من خلال جلسات تفاعلية مع العميل. نحرص على تطوير خارطة طريق واضحة تشمل جميع المراحل المطلوبة، مما يضمن تخطيطًا منظمًا وفعالًا. يتم وضع استراتيجيات تشمل تقييم الجدوى المالية والفنية لضمان أن المشروع يسير وفق منهجية مدروسة منذ البداية وحتى الإنجاز.",
    },
    {
      title: " أبحاث السوق المخصصة",
      content:
        "نقدم خدمات أبحاث السوق المتخصصة لتحليل الاتجاهات الحالية وتقييم حجم الطلب والفرص المتاحة في سوق العقارات الإماراتي. نقوم بتجميع وتحليل البيانات لتوفير رؤى واضحة تدعم اتخاذ قرارات استراتيجية مستنيرة. يساعد ذلك في ضمان توافق المشروع مع احتياجات المستثمرين والسوق المحلي، مما يزيد من فرص النجاح ويضمن مواءمة الخطط مع المتطلبات الواقعية.",
    },
    {
      title: " دراسات الجدوى الأولية ",
      content:
        "نقوم بإجراء دراسات جدوى شاملة تأخذ في الاعتبار جميع العوامل المؤثرة في المشروع، بما في ذلك توقعات المستثمرين وديناميكيات السوق. تتيح هذه الدراسات تحديد التحديات المحتملة واستكشاف الفرص، مع وضع خطط للتعامل مع المخاطر بشكل استباقي. يضمن ذلك أن يكون المشروع مدروسًا من جميع الجوانب قبل الشروع في التنفيذ.",
    },
    {
      title: "إدارة تصميم المفهوم",
      content:
        "نؤمن بأن تصميم المفهوم هو حجر الأساس في نجاح المشروع. نقوم بتطوير الأفكار وتحويلها إلى تصاميم أولية تستند إلى رؤية واضحة ومحددة. يعمل فريقنا بشكل تعاوني لضمان أن التصاميم ليست فقط جمالية ولكن أيضًا عملية وقابلة للتنفيذ. يتم توفير نماذج ثلاثية الأبعاد ولوحات تصور تساعدك على تخيل المشروع بشكل واقعي قبل البدء في التنفيذ.",
    },
    {
      title: "  دمج إدارة المرافق  ",
      content:
        "بعد إدارة المرافق جزءًا أساسيًا من خطتنا التطويرية، حيث نقوم بدمج خطط الإدارة منذ البداية لضمان استدامة المشروع على المدى الطويل. يتم ربط المشروع بشركات إدارة العقارات الرائدة في الإمارات لضمان أداء فعال وسلس. كما نضمن أن تكون جميع الأنظمة التشغيلية ملائمة للاستخدام طويل الأمد مع توفير خدمات دعم متواصلة.",
    },
  ],
};
const Faq = {
  eng: [
    {
      title: "What is development planning?",
      content:
        "Development planning involves creating a strategic roadmap for your project, from initial concept to long-term performance, ensuring it meets market demands and regulatory requirements",
    },
    {
      title: " Do you work on projects across all seven emirates?",
      content:
        "Yes, we provide building contracting services in Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Fujairah, Al Ain, and Ras Al Khaimah.",
    },
    {
      title: "How do you ensure my project aligns with market trends?",
      content:
        "We conduct tailored market research to analyze current trends, demands, and opportunities, ensuring your project meets investor and resident expectations",
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
      title: " How long does the development planning process take?",
      content:
        "The timeline depends on the project’s complexity. After the initial consultation, we provide a detailed schedule to keep you informed every step of the way.",
    },
    {
      title: " Do you provide facility management planning?",
      content:
        "Yes, we integrate facility management planning from the start, ensuring your project’s long-term performance and connecting you with leading property management companies.",
    },
    {
      title: "Can you work within my budget?",
      content:
        "We create plans that align with your budget without compromising on quality. During the consultation, we discuss your financial parameters and tailor our solutions accordingly.",
    },
    {
      title: " What makes your building contracting services stand out?",
      content:
        "Our commitment to precision, innovation, and excellence sets us apart. We combine award-winning expertise with a client-centric approach to deliver exceptional results.",
    },
    {
      title: "How can I get started with Khales Building Contracting?",
      content:
        "Simply contact us for a consultation. We’ll discuss your vision, provide a customized plan, and guide you through the process of creating your dream project.",
    },
  ],
  ar: [
    {
      title: " ما هو التخطيط التطويري؟",
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
      title: "هل يمكنكم التعامل مع المشاريع الصغيرة والكبيرة؟  ",
      content:
        "بالتأكيد. سواء كان مشروعًا سكنيًا صغيرًا أو مجمعًا تجاريًا كبيرًا، نقدم خدمات مخصصة تناسب حجم ونطاق مشروعك.",
    },
    {
      title: " هل تقدمون حلولاً للتطوير المستدام؟ ",
      content:
        "نعم، تُعد الاستدامة جزءًا أساسيًا من عملية التخطيط لدينا. ندمج التصاميم الصديقة للبيئة والأنظمة الموفرة للطاقة في كل مشروع.",
    },
    {
      title: "  كم تستغرق عملية التخطيط التطويري؟",
      content:
        "تعتمد المدة على تعقيد المشروع. بعد الاستشارة الأولية، نقدم جدولاً زمنياً مفصلاً لإبقائك على اطلاع بكل خطوة.",
    },
    {
      title: " هل تقدمون تخطيطًا لإدارة المرافق؟",
      content:
        "نعم، ندمج تخطيط إدارة المرافق من البداية، مما يضمن الأداء طويل الأمد لمشروعك وربطه بشركات إدارة العقارات الرائدة",
    },
    {
      title: " هل يمكنكم العمل ضمن ميزانيتي؟",
      content:
        "نضع خططًا تتوافق مع ميزانيتك دون المساس بالجودة. خلال الاستشارة، نناقش معاييرك المالية ونقدم حلولاً مخصصة",
    },
    {
      title: " كيف يمكنني البدء مع خدمات التخطيط التطويري؟",
      content:
        "ببساطة، قم بالاتصال بنا لترتيب استشارة. سنناقش رؤيتك ونقدم خطة مخصصة ونرشدك خلال عملية إنشاء مشروعك المثالي.",
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

  useEffect(() => {
    setIsClient(true);
    return () => setIsClient(false); // Cleanup
  }, []);

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

export default DevelopmentplanningPage;
