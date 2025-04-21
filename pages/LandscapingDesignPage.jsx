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
      image: "https://i.ibb.co/kgQP8qQM/landsacpe.jpg",
      title: "Breathtaking Landscapes That Inspire",
      content: "Transform your outdoor space into a natural masterpiece",
      button: "Book Your Design",
    },
  ],
  ar: [
    {
      id: 1,
      image: "https://i.ibb.co/kgQP8qQM/landsacpe.jpg",
      title: "مناظر طبيعية خلابة تُلهم",
      content: "حوّل مساحتك الخارجية إلى لوحة فنية طبيعية",
      button: " احجز تصميمك الآن",
    },
  ],
};
const data = {
  eng: [
    {
      title: "Landscape Design and Garden Planning:  ",
      subtitle: " Where Art Meets Nature",
      description1:
        "At Khales, we believe that landscape design is more than just planting trees and shrubs; it’s an art of transforming outdoor spaces into beautiful, functional, and sustainable environments. As a leading landscape design and garden planning company in Dubai, our services go beyond simple greenery to include modern irrigation systems, pathways, patios, and outdoor living spaces that blend elegance with practicality.",
      description2:
        "Our team of landscape architects and garden specialists works closely with you to understand your vision and aspirations. Whether you have a sprawling garden or a compact balcony, we bring your ideas to life with creative solutions and meticulous attention to detail. By using high-quality materials and advanced construction techniques, we ensure lasting beauty and durability in every project",
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
      title: "تصميم المناظر الطبيعية وتنسيق الحدائق: ",
      subtitle: "  حيث يلتقي الفن بالطبيعة",

      description1:
        "في خالص، نؤمن بأن تصميم المناظر الطبيعية هو أكثر من مجرد غرس الأشجار وزراعة النباتات؛ بل هو فن تحويل المساحات الخارجية إلى بيئات تنبض بالجمال والراحة. نحن نقدم مجموعة متكاملة من خدمات تصميم المناظر الطبيعية وتنسيق الحدائق في دبي وجميع أنحاء الإمارات العربية المتحدة، بهدف خلق مساحات تجمع بين الأناقة والوظيفة",
      description2:
        "يقوم فريقنا المتخصص من مهندسي المناظر الطبيعية وخبراء تنسيق الحدائق بالعمل معك بشكل وثيق لفهم رؤيتك وطموحاتك، لضمان تنفيذ تصاميم متكاملة تراعي جميع التفاصيل. سواء كان لديك حديقة منزلية واسعة أو ممر تجاري جذاب، نحن نضع لمسات إبداعية تضمن الراحة والجمال وتدوم طويلاً. بفضل استخدام مواد عالية الجودة وتقنيات حديثة، نقدم حلولًا تلبي أعلى معايير الجودة والاستدامة.",
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
        "We start with a comprehensive consultation to understand your vision and requirements. Our team conducts a thorough site analysis to assess soil conditions, climate, and space utilization. After gathering insights, we develop 3D design concepts and detailed plans that perfectly align with your expectations",
    },
    {
      title: "Plant Selection and Installation",
      content:
        "Our horticulture experts choose plant varieties that thrive in the local climate and complement the overall landscape design. We carefully plan the arrangement to ensure seasonal color and aesthetic appeal while minimizing maintenance. From vibrant flowers to lush shrubs, we create a dynamic and enduring green space.",
    },
    {
      title: "Integrated Systems Installation",
      content:
        "We focus on installing modern irrigation systems that promote efficient water usage, including drip irrigation and sprinklers. Additionally, we install strategic outdoor lighting that not only enhances nighttime aesthetics but also improves safety and functionality.",
    },
    {
      title: "Hardscape and Water Features",
      content:
        "Our designers craft elegant walkways, patios, and garden paths that seamlessly connect different areas. We also incorporate water features such as fountains, waterfalls, and ponds, adding a sense of tranquility and sophistication to your outdoor environment",
    },
    {
      title: "Maintenance and Upkeep",
      content:
        "To keep your garden looking pristine, we offer comprehensive maintenance services, including pruning, irrigation management, fertilization, and pest control. We ensure your outdoor spaces remain beautiful and vibrant throughout the year.",
    },
  ],
  ar: [
    {
      title: "  الاستشارة والتخطيط",
      content:
        "نبدأ بتقديم استشارة شاملة لفهم رؤيتك واحتياجاتك. يقوم فريقنا بإجراء تحليل شامل للموقع ودراسة لتحديد أفضل تصاميم المساحات الخارجية. بعد ذلك، نقدم تصاميم ثلاثية الأبعاد تضمن وضوح الرؤية والتوافق مع توقعاتك.",
    },
    {
      title: " اختيار النباتات وتنفيذ الزراعة",
      content:
        "نقوم باختيار مجموعة متنوعة من النباتات التي تناسب المناخ المحلي وتحقق توازنًا بين الجمال والعملية. نضمن زراعة نباتات مقاومة للجفاف وتحتاج إلى صيانة قليلة، مما يضمن منظرًا طبيعيًا نابضًا بالحياة على مدار العام.",
    },
    {
      title: "تركيب الأنظمة المتكاملة",
      content:
        "نركز على تصميم أنظمة ري حديثة تضمن توزيع المياه بشكل متساوٍ، مما يقلل استهلاكها ويعزز صحة النباتات. كما نقوم بتركيب أنظمة إضاءة خارجية تعزز جمال المساحات ليلاً وتخلق أجواءً ساحرة.",
    },
    {
      title: " إنشاء الممرات والأحواض والعناصر المائية ",
      content:
        "نصمم ممرات عصرية تربط بين المساحات المختلفة، بالإضافة إلى أحواض مائية وديكورات نوافير تضفي على المساحات طابعًا فريدًا. نهتم بجميع التفاصيل لضمان تكامل التصميم وتناغم العناصر الطبيعية",
    },
    {
      title: " الصيانة الدورية ",
      content:
        "نعتمد على خطط صيانة دقيقة تضمن الحفاظ على جمال الحدائق والمساحات الخضراء. تشمل الخدمات التقليم، الري، التسميد، ومكافحة الآفات بشكل منتظم، لضمان استدامة الحدائق وجمالها طوال العام.",
    },
  ],
};
const Faq = {
  eng: [
    {
      title: "What types of outdoor spaces can you design?",
      content:
        "We design a wide range of outdoor spaces, including residential gardens, commercial landscapes, patios, terraces, and rooftop gardens.",
    },
    {
      title: " Do you provide eco-friendly landscaping solutions?",
      content:
        "Yes, we prioritize sustainable practices by using drought-resistant plants, water-efficient irrigation systems, and eco-friendly materials.",
    },
    {
      title: "How do you ensure quality in your landscape projects?",
      content:
        "Our team follows strict quality control measures, using premium materials and modern techniques to ensure longevity and durability. We also perform regular maintenance to keep your garden looking its best.",
    },
    {
      title: "Do you offer regular garden maintenance services?",
      content:
        "Yes, we provide comprehensive maintenance packages to ensure your garden remains healthy, vibrant, and well-maintained throughout the year.",
    },
    {
      title: "How can I start my landscape project with Khales?",
      content:
        "Simply reach out to us to schedule a consultation. Our team will discuss your vision, offer insights, and develop a customized landscape plan that suits your needs and preferences.",
    },
  ],
  ar: [
    {
      title: " ما هي أنواع المساحات التي يمكنكم تصميمها؟",
      content:
        "نحن نقدم خدمات تصميم المناظر الطبيعية وتنسيق الحدائق للمساحات السكنية والتجارية على حد سواء، بما في ذلك الحدائق المنزلية، المساحات التجارية، الممرات، والشرفات.",
    },
    {
      title: " هل يمكنكم تصميم حدائق صديقة للبيئة؟",
      content:
        "نعم، نحرص على استخدام نباتات مقاومة للجفاف وأنظمة ري ذكية لتقليل استهلاك المياه وضمان استدامة الحدائق.",
    },
    {
      title: "كيف تضمنون جودة التنفيذ؟",
      content:
        "نحن نلتزم بأعلى معايير الجودة من خلال استخدام مواد معتمدة وتقنيات حديثة، بالإضافة إلى إشراف مباشر من فريقنا على جميع مراحل التنفيذ.",
    },
    {
      title: "هل تشمل خدماتكم الصيانة الدورية؟",
      content:
        "نعم، نقدم خدمات صيانة شاملة تضمن بقاء الحدائق والمساحات الخارجية في أفضل حالة على مدار العام.",
    },
    {
      title: "  كيف يمكنني البدء بمشروع تصميم المناظر الطبيعية معكم؟ ",
      content:
        "ما عليك سوى الاتصال بنا لتحديد موعد استشارة. سنعمل معك على وضع خطة تصميم تلبي رؤيتك وتطلعاتك، مع ضمان تجربة متميزة من البداية حتى النهاية",
    },
  ],
};

const ProjectHighlightdata = {
  eng: [
    {
      Title: "Case Studies",
      button: "Get in touch with us",
      Subtitle: "Arabian Ranches Villa",
      Subheader: "Landscape Design",
      description: [
        "A villa in Arabian Ranches lacked a functional outdoor space. Although the family had children and enjoyed being outdoors, the backyard was underused and didn’t reflect their lifestyle. They wanted a garden that was family-friendly, practical, and visually appealing.",
        "The challenge was creating a multi-purpose garden that included play space for kids, relaxing seating areas, and water features, all while being mindful of irrigation, maintenance, and climate-adapted planting.",
        "We started with a clear layout focused on flow and comfort. Native, heat-tolerant plants were selected for sustainability. Covered lounge areas were integrated, and a mix of hardscaping and softscaping created balance. Ambient lighting was added to enhance the mood without excess energy use.",
        "The landscape was completed in six weeks with long-term durability and low maintenance in mind.",
        "The service covered full landscape design, plant selection, lighting, water elements, and execution with a practical and elegant approach.",
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
      Subtitle: "فيلا في المرابع العربية",
      Subheader: "تنسيق الحدائق",
      description: [
        "كانت فيلا في المرابع العربية تفتقر إلى لمسة طبيعية مميزة. المساحة الخارجية كانت بسيطة وغير مستغلة على النحو الأمثل، على الرغم من أن العائلة لديها أطفال ويحبون قضاء الوقت في الحديقة. كانوا يرغبون في حديقة عملية وجميلة ومناسبة للأجواء العائلية المفعمة بالحياة.",
        "تمثل التحدي في تصميم مساحة خضراء متعددة الاستخدامات، تجمع بذكاء بين منطقة لعب آمنة للأطفال، وجلسات أنيقة لاستقبال الضيوف، وممرات مائية هادئة تضفي جمالًا، مع الأخذ في الاعتبار نظام الري الفعال، وسهولة الصيانة، واختيار التشجير المناسب للظروف المناخية الصحراوية.",
        "بدأنا بوضع تصور لحديقة مريحة ولكنها غنية بالتفاصيل الجذابة. استخدمنا النباتات المحلية المعروفة بمقاومتها للحرارة، وأضفنا جلسات مريحة ومظللة، ودمجنا ببراعة بين الأرضيات الحجرية الأنيقة والمناطق المزروعة الخضراء لخلق توازن بصري مريح للعين. كما صممنا نظام إضاءة خارجية خافتة يضيف لمسة ساحرة للأجواء العامة دون استهلاك مفرط للطاقة.",
        "تم التنفيذ بدقة وإتقان خلال ستة أسابيع فقط، مع ضمان أن يكون كل عنصر عمليًا للاستخدام اليومي وسهل الصيانة على المدى الطويل.",
        "شملت خدمة تنسيق الحدائق الشاملة: التصميم المبتكر، واختيار النباتات الملائمة، وتصميم الإضاءة الجذابة، ودمج المسطحات المائية الهادئة، والتنفيذ الكامل بطريقة تجمع بين العملية والجمالية الراقية.",
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

const LandscapingDesignPage = () => {
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
      language === "ar"
        ? "تصميم المناظر الطبيعية وتنسيق الحدائق"
        : "Landscaping"
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

export default LandscapingDesignPage;
