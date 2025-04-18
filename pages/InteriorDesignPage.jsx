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
      image: banner,
      title: "Where Style Meets Comfort",
      content:
        "Redefine your space with tailored elegance and timeless sophistication",
      button: "Start Now",
    },
  ],
  ar: [
    {
      id: 1,
      image: banner,
      title: "حيث يلتقي الأسلوب بالراحة",
      content: "أعد تعريف مساحتك بأناقة مصممة بعناية وفخامة خالدة.",
      button: "ابدأ الآن",
    },
  ],
};
const data = {
  eng: [
    {
      title: "Interior Design:  ",
      subtitle: "Modern, Minimalist & Luxury Living",
      description1:
        "At Khales Project Management, we believe that great design goes beyond aesthetics—it’s about creating spaces that tell your story. We specialize in crafting bespoke, high-end interiors that reflect your personality, enhance your lifestyle, and elevate your environment. Whether it’s a cozy home, a sleek office, or a luxury hospitality space, we deliver innovative design solutions that blend modern elegance, minimalist sophistication, and timeless luxury.",
      description2:
        "Our team of passionate designers and project managers works closely with you to understand your vision, preferences, and functional needs. From concept development to final execution, we ensure every detail is meticulously planned and flawlessly executed. With a commitment to quality, creativity, and sustainability, we transform your space into a masterpiece that inspires and impresses.",
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
      title: "التصميم الداخلي: ",
      subtitle: "أناقة عصرية، بساطة، وفخامة.",
      description1:
        "في خالص لإدارة المشاريع، نؤمن بأن التصميم الرائع يتجاوز مجرد الجماليات - إنه يتعلق بخلق مساحات تحكي قصتك. نحن متخصصون في تصميم ديكورات داخلية عالية الجودة تعكس شخصيتك، وتعزز نمط حياتك، وترتقي ببيئتك. سواء كان منزلًا مريحًا، أو مكتبًا أنيقًا، أو مساحة ضيافة فاخرة، نقدم حلول تصميم مبتكرة تجمع بين الأناقة العصرية، والرقي البسيط، والفخامة الخالدة.",
      description2:
        "يعمل فريقنا من المصممين ومديري المشاريع المتحمسين معكم عن كثب لفهم رؤيتكم، وتفضيلاتكم، واحتياجاتكم الوظيفية. من تطوير المفهوم إلى التنفيذ النهائي، نضمن تخطيط كل التفاصيل بدقة وتنفيذها ببراعة. بالتزام بالجودة، والإبداع، والاستدامة، نحول مساحتكم إلى تحفة فنية تلهم وتثير الإعجاب",
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
        "Our journey begins with a detailed consultation to understand your vision, lifestyle needs, and aesthetic preferences. We take the time to listen to your ideas, goals, and challenges. Using this insight, we create mood boards, 3D renderings, and design concepts that bring your vision to life. This phase ensures that every aspect aligns with your expectations and lays the foundation for a seamless design experience.\nMood Boards & Concepts: Visualizing your vision.\n3D Renderings: Bringing ideas to life.\nPersonalized Approach: Ensuring every detail matches your preferences.",
    },
    {
      title: "Space Planning & Optimization",
      content:
        "We meticulously plan your space to maximize functionality and flow while maintaining a stunning aesthetic. Whether it’s a modern apartment, luxury villa, or dynamic office space, our designs enhance usability and visual appeal. By balancing aesthetic elegance with practicality, we create environments that are both efficient and captivating.\nFunctional Layouts: Enhancing usability.\nFlow Optimization: Creating seamless transitions.\nAesthetic Harmony: Uniting beauty with practicality.",
    },
    {
      title: "Design Development & Detailing",
      content:
        "Our team meticulously selects premium materials, custom furniture, and unique design elements that reflect your personality and preferences. Every aspect, from textures and colors to finishes and fittings, is thoughtfully curated to ensure a cohesive and luxurious atmosphere. This phase is where your vision truly comes to life, meticulously crafted to reflect your unique style and personality.\nMaterial Selection: High-quality and sustainable choices.\nCustom Furniture Design: Tailored to your space.\nAttention to Detail: Crafting every element with precision.",
    },
    {
      title: "Project Management & Execution",
      content:
        "We manage every aspect of the project to ensure a stress-free and flawless execution. Our experienced project managers coordinate all logistics, from procurement to installation, while adhering to timelines and budgets. We handle communication with contractors, suppliers, and craftsmen, ensuring that every step meets our high standards of quality and efficiency.\nSeamless Coordination: Overseeing every stage.\nQuality Assurance: Maintaining the highest standards.\nReal-Time Monitoring: Keeping the project on track.\n",
    },
    {
      title: "Final Styling & Handover",
      content:
        "We complete the transformation with final styling touches, including lighting, artwork, and decor accents that add warmth and personality to your space. Our team ensures that every element aligns with your original vision, conducting a thorough walkthrough to ensure satisfaction. The result is a fully finished space that surpasses expectations and leaves a lasting impression.\nDetail-Oriented Styling: Enhancing aesthetics and comfort.\nHandover Process: Ensuring your complete satisfaction.\nLasting Impact: Creating a space that inspires.",
    },
  ],
  ar: [
    {
      title: "  الاستشارة وتطوير المفهوم",
      content:
        "تبدأ رحلتنا باستشارة مفصلة لفهم رؤيتكم، ومتطلبات نمط حياتكم، وتفضيلاتكم الجمالية. نخصص الوقت للاستماع إلى أفكاركم، وأهدافكم، وتحدياتكم. باستخدام هذه الرؤى، ننشئ لوحات إلهام، وتصاميم ثلاثية الأبعاد، ومفاهيم تصميمية تحول رؤيتكم إلى واقع. تضمن هذه المرحلة توافق كل جانب مع توقعاتكم ووضع الأساس لتجربة تصميم سلسة.\nلوحات الإلهام والمفاهيم: تصور رؤيتكم.\nتصاميم ثلاثية الأبعاد: تحويل الأفكار إلى واقع.\nنهج شخصي: ضمان توافق كل التفاصيل مع تفضيلاتكم.",
    },
    {
      title: " تخطيط المساحات وتحسينها",
      content:
        "نخطط مساحتكم بدقة لتحقيق أقصى قدر من الوظائف والتدفق مع الحفاظ على جمالية مذهلة. سواء كانت شقة عصرية، أو فيلا فاخرة، أو مساحة مكتب ديناميكية، تعزز تصميماتنا سهولة الاستخدام والجاذبية البصرية. من خلال الموازنة بين الأناقة الجمالية والعملية، نخلق بيئات فعالة وجذابة.\nمخططات وظيفية: تعزيز سهولة الاستخدام.\nتحسين التدفق: خلق انتقالات سلسة.\nتناغم جمالي: الجمع بين الجمال والعملية.",
    },
    {
      title: "تطوير التصميم والتفاصيل",
      content:
        "يختار فريقنا بدقة المواد الفاخرة، والأثاث المخصص، وعناصر التصميم الفريدة التي تعكس شخصيتكم وتفضيلاتكم. يتم تنسيق كل جانب، من الأنسجة والألوان إلى التشطيبات والتركيبات، بعناية لضمان جو متماسك وفاخر. هذه المرحلة هي التي تتحول فيها رؤيتكم إلى واقع ملموس، مصممة بدقة لتعكس أسلوبكم وشخصيتكم الفريدة.\nاختيار المواد: خيارات عالية الجودة ومستدامة.\nتصميم الأثاث المخصص: مصمم خصيصًا لمساحتكم.\nالاهتمام بالتفاصيل: تصميم كل عنصر بدقة.",
    },
    {
      title: " إدارة المشاريع والتنفيذ",
      content:
        "ندير كل جانب من جوانب المشروع لضمان تنفيذ سلس وخالٍ من الإجهاد. ينسق مديرو المشاريع ذوو الخبرة لدينا جميع الخدمات اللوجستية، من الشراء إلى التركيب، مع الالتزام بالجداول الزمنية والميزانيات. نتعامل مع التواصل مع المقاولين، والموردين، والحرفيين، لضمان تلبية كل خطوة لمعاييرنا العالية من الجودة والكفاءة.\nتنسيق سلس: الإشراف على كل مرحلة.\nضمان الجودة: الحفاظ على أعلى المعايير.\nمتابعة فورية: متابعة المشروع على المسار الصحيح.",
    },
    {
      title: " التصميم النهائي والتسليم",
      content:
        "نكمل التحول بلمسات التصميم النهائي، بما في ذلك الإضاءة، والأعمال الفنية، وعناصر الديكور التي تضيف الدفء والشخصية إلى مساحتكم. يضمن فريقنا توافق كل عنصر مع رؤيتكم الأصلية، وإجراء جولة شاملة للتأكد من الرضا. النتيجة هي مساحة مكتملة تتجاوز التوقعات وتترك انطباعًا دائمًا.\nتصميم دقيق: تعزيز الجماليات والراحة.\nعملية التسليم: ضمان رضاكم الكامل.\nتأثير دائم: خلق مساحة ملهمة.",
    },
  ],
};
const Faq = {
  eng: [
    {
      title: "What types of interior design services do you offer?",
      content:
        "We offer a wide range of services, including residential design, commercial design, hospitality design, majlis design, and office design. From space planning to final styling, we handle every detail to create stunning, functional spaces.",
    },
    {
      title: " Do you work on projects across all seven emirates?",
      content:
        "Yes, we provide interior design services across Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Fujairah, Al Ain, and Ras Al Khaimah. No matter where your project is located, we deliver excellence.",
    },
    {
      title: "How do you ensure quality in your projects?",
      content:
        "We start with a detailed consultation to understand your vision, preferences, and lifestyle. Using mood boards, 3D renderings, and material samples, we create a design that’s uniquely yours.",
    },
    {
      title: "Can you handle both small and large-scale projects?",
      content:
        "Absolutely. Whether it’s a cozy apartment or a large commercial space, we tailor our services to meet the scale and scope of your project.",
    },
    {
      title: " Do you offer sustainable interior design  solutions?",
      content:
        "Yes, sustainability is a core part of our design philosophy. We use eco-friendly materials and practices to create beautiful, environmentally conscious spaces.",
    },
    {
      title: "How long does the interior design process take?",
      content:
        "The timeline depends on the project’s complexity and scale. After our initial consultation, we provide a detailed schedule to keep you informed every step of the way.",
    },
    {
      title: " Do you provide project management services?",
      content:
        "Yes, our experienced project managers oversee every aspect of the construction process, ensuring timely and budget-friendly delivery.",
    },
    {
      title: "Can you work within my budget?",
      content:
        "We create plans that align with your budget without compromising on quality. During the consultation, we discuss your financial parameters and tailor our solutions accordingly.",
    },

    {
      title: "9. How can I get started with Khales Interior Design?",
      content:
        "Simply contact us for a consultation. We’ll discuss your vision, provide a customized plan, and guide you through the process of creating your dream project.",
    },
  ],
  ar: [
    {
      title: " ما هي أنواع خدمات التصميم الداخلي التي تقدمونها؟",
      content:
        "نقدم مجموعة واسعة من الخدمات تشمل: التصميم السكني، والتصميم التجاري، وتصميم الفنادق، وتصميم المجالس، بالإضافة إلى تصميم المكاتب. بدءًا من تخطيط المساحات ووصولًا إلى التنسيق النهائي، نهتم بكل التفاصيل لإنشاء مساحات مذهلة وعملية.",
    },
    {
      title: "هل تعملون على مشاريع في جميع الإمارات السبع؟",
      content:
        "نعم، نحن نقدم خدمات التصميم الداخلي في جميع أنحاء دولة الإمارات العربية المتحدة، بما في ذلك دبي، وأبوظبي، والشارقة، وعجمان، وأم القيوين، والفجيرة، والعين، ورأس الخيمة. بغض النظر عن موقع مشروعك، نضمن لك تقديم خدمات متميزة.",
    },
    {
      title: "كيف تتحققون من أن التصميم يعكس ذوقي الشخصي؟",
      content:
        "نبدأ باستشارة مفصلة لفهم رؤيتك وتفضيلاتك وأسلوب حياتك. ثم نستخدم لوحات مزاجية وتصاميم ثلاثية الأبعاد وعينات من المواد لإنشاء تصميم يعبر عنك بشكل فريد.",
    },
    {
      title: "هل يمكنكم التعامل مع المشاريع الصغيرة والكبيرة؟",
      content:
        "نتولى إدارة جميع جوانب المشروع بدءًا من التوريد وصولًا إلى التركيب، مع ضمان تجربة خالية من التوتر وتنفيذًا لا تشوبه شائبة. يشرف مديرو المشاريع ذوو الخبرة على العملية بالكامل، وينسقون مع المقاولين والموردين والحرفيين لضمان الالتزام بالجدول الزمني والميزانية المحددة. من خلال المراقبة الفورية وحل المشكلات بشكل استباقي، نضمن بقاء المشروع على المسار الصحيح والتكيف مع أي تحديات تطرأ.",
    },
    {
      title: " هل تقدمون حلول تصميم داخلية مستدامة؟ ",
      content:
        "نعم، تُعد الاستدامة جزءًا أساسيًا من فلسفتنا التصميمية. إذ نستخدم مواد صديقة للبيئة ونتبنى ممارسات مستدامة لإنشاء مساحات جميلة ومراعية للبيئة.",
    },
    {
      title: " كم تستغرق عملية التصميم الداخلي؟",
      content:
        "تعتمد المدة الزمنية على مدى تعقيد المشروع وحجمه. بعد الاستشارة الأولية، سنقدم لك جدولًا زمنيًا مفصلًا لإبقائك على اطلاع دائم بكل مرحلة.",
    },
    {
      title: " هل تقدمون خدمات إدارة المشاريع؟",
      content:
        "نعم، نحن نقدم إدارة مشاريع شاملة، تبدأ من التوريد وصولًا إلى التثبيت. يضمن فريقنا تجربة سلسة وخالية من أي توتر.",
    },
    {
      title: " هل يمكنكم العمل ضمن ميزانيتي؟",
      content:
        "نحن نصمم حلولًا تتناسب مع ميزانيتك مع الحفاظ على الجودة. خلال الاستشارة، نناقش معاييرك المالية ونقدم حلولًا مصممة خصيصًا لتلبية احتياجاتك.",
    },
    {
      title: " كيف يمكنني البدء مع خالص للتصميم الداخلي؟",
      content:
        "كل ما عليك فعله هو الاتصال بنا لترتيب موعد استشارة. خلال هذا الموعد، سنناقش رؤيتك، ونقدم لك خطة مخصصة، ونرشدك خلال عملية تحويل مساحتك.",
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

const InteriorDesignPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage(); // Assuming you have a language context
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    return () => setIsClient(false); // Cleanup
  }, []);

  // change metadata from client side
  useEffect(() => {
    document.title = `${language === "ar" ? "التصميم الداخلي" : "Interior desgin"}`;
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
  );
};

export default InteriorDesignPage;
