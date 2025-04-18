"use client"
import React, { useEffect, useState } from "react";
import BlogGrid from "../components/Blogs/BlogGrid";
import HeroSlider from "../components/Slider/Slider";
import { useLanguage } from "../Context/Languagecontext";
import logo from "@/public/assets/Khales Logo K - favicon.png";
import CTASection from "../components/Homecontact/CTASection";
import img1 from "@/public/assets/blog1.png";
import img2 from "@/public/assets/blog2.png";
import img3 from "@/public/assets/blog3.png";
import img4 from "@/public/assets/blog4.png";
import img5 from "@/public/assets/blog5.png";
import img6 from "@/public/assets/blog6.png";
import img7 from "@/public/assets/blog7.png";
import img8 from "@/public/assets/blog8.png";

function BlogsPage() {
  const slides = {
    eng: [
      {
        id: 1,
        image:
          "https://i.ibb.co/DPKhyq7k/khales-ae-real-photograph-of-a-super-luxury-modern-mansion-fr-c2c57d33-5a47-4ccb-b054-498b16745d23-3.png",
        title: "Expert Building Contracting Services in the UAE",
        content:
          "Reliable and high-quality construction solutions for residential and commercial projects across the UAE",
        button: "Start You Project Today",
      },
    ],
    ar: [
      {
        id: 1,
        image:
          "https://i.ibb.co/DPKhyq7k/khales-ae-real-photograph-of-a-super-luxury-modern-mansion-fr-c2c57d33-5a47-4ccb-b054-498b16745d23-3.png",
        title: "خدمات مقاولات بناء احترافية في الإمارات",
        content:
          "حلول بناء موثوقة وعالية الجودة للمشاريع السكنية والتجارية في جميع أنحاء الإمارات.",
        button: " ابدأ مشروعك اليوم",
      },
    ],
  };
  const blogCardsData = [
    {
      eng: {
        coverImage: img1,

        tags: ["Design", "Architecture"],
        title: "Modern Architectural Trends in Residential Design ",
        authorImage: logo,
        authorName: "Jonin Garcia",
        date: "June 28, 2023",
        description:
          "In the ever-evolving landscape of residential design, staying abreast of modern architectural trends is paramount to crafting homes that seamlessly blend style...",
        buttonText: "View Post",
      },
      ar: {
        coverImage: img1,

        tags: ["تصميم", "عمارة"],
        title: "الاتجاهات المعمارية الحديثة في التصميم السكني",
        authorImage: logo,
        authorName: "جونين جارسيا",
        date: "٢٨ يونيو ٢٠٢٣",
        description:
          "في مشهد التصميم السكني دائم التطور، تعد مواكبة الاتجاهات المعمارية الحديثة أمرًا بالغ الأهمية لتصميم المنازل التي تمزج بسلاسة بين الأسلوب والوظيفة والابتكار. خالص ملتزم بتحويل مساحات المعيشة إلى تعبيرات خالدة عن الفخامة المعاصرة...",
        buttonText: "اكتشف المقال",
      },
    },
    {
      eng: {
        coverImage: img2,
        tags: ["Interior", "Design"],
        title: "Advancements in Structural Steel Design for Villas",
        authorImage: logo,
        authorName: "Nezar Saab",
        date: "July 15, 2023",
        description:
          "In the realm of villa construction, the use of structural steel has evolved dramatically, offering not just strength but also unmatched versatility in design...",
        buttonText: "View Post",
      },
      ar: {
        coverImage: img2,
        tags: ["داخلي", "تصميم"],
        title: "التطورات في التصميم الفولاذي الإنشائي للفلل",
        authorImage: logo,
        authorName: "نزار صعب",
        date: "١٥ يوليو ٢٠٢٣",
        description:
          "في عالم بناء الفيلات، تطور استخدام الفولاذ الإنشائي بشكل كبير، مما يوفر ليس فقط القوة ولكن أيضًا تنوعًا لا مثيل له في التصميم. في الخالص لإدارة المشاريع، ندرك الدور المحوري الذي يلعبه الفولاذ الإنشائي في تصميم الفلل الفاخرة والمتينة...",
        buttonText: "اكتشف المقال",
      },
    },
    {
      eng: {
        coverImage: img3,
        tags: ["Interior", "Design"],
        title: "Innovative Approaches to High-Rise Building Structures",
        authorImage: logo,
        authorName: "Nezar Saab",
        date: "July 15, 2023",
        description:
          "In the dynamic landscape of construction, the demand for high-rise buildings continues to soar, driven by urbanization and the need for efficient space utilization...",
        buttonText: "View Post",
      },
      ar: {
        coverImage: img3,
        tags: ["داخلي", "تصميم"],
        title: "مقاربات مبتكرة لهياكل الأبنية الشاهقة",
        authorImage: logo,
        authorName: "نزار صعب",
        date: "١٥ يوليو ٢٠٢٣",
        description:
          "في المشهد الديناميكي لقطاع البناء، يستمر الطلب على المباني الشاهقة في التصاعد، مدفوعًا بالتوسع الحضاري والحاجة إلى استغلال المساحات بكفاءة...",
        buttonText: "اكتشف المقال",
      },
    },
    {
      eng: {
        coverImage: img4,
        tags: ["Interior", "Design"],
        title: "Sustainable Elegance",
        authorImage: logo,
        authorName: "Nezar Saab",
        date: "July 15, 2023",
        description:
          "As we strive to create spaces that marry aesthetics with ethical responsibility, the integration of sustainable materials becomes pivotal... ",
        buttonText: "View Post",
      },
      ar: {
        coverImage: img4,
        tags: ["داخلي", "تصميم"],
        title: "الأناقة المستدامة",
        authorImage: logo,
        authorName: "نزار صعب",
        date: "١٥ يوليو ٢٠٢٣",
        description:
          "وبينما نسعى جاهدين لإنشاء مساحات تجمع بين الجماليات والمسؤولية الأخلاقية، يصبح دمج المواد المستدامة أمرًا محوريًا. انطلق في رحلة عبر عالم التصميم الداخلي الصديق للبيئة، واستكشف جمال وفعالية دمج المواد المستدامة.",
        buttonText: "اكتشف المقال",
      },
    },
    {
      eng: {
        coverImage: img5,
        tags: ["Interior", "Design"],
        title: "Harmonizing Spaces",
        authorImage: logo,
        authorName: "Nezar Saab",
        date: "July 15, 2023",
        description:
          "In the realm of interior design, striking the delicate balance between aesthetics and functionality is an art form. Explore the strategies and principles with Khales that define this harmonious equilibrium in interior design.",
        buttonText: "View Post",
      },
      ar: {
        coverImage: img5,
        tags: ["داخلي", "تصميم"],
        title: "تنسيق المساحات",
        authorImage: logo,
        authorName: "نزار صعب",
        date: "١٥ يوليو ٢٠٢٣",
        description:
          "في عالم التصميم الداخلي، يعد تحقيق التوازن الدقيق بين الجماليات والوظائف شكلاً من أشكال الفن. استكشف الاستراتيجيات والمبادئ مع خالص التي تحدد هذا التوازن المتناغم في التصميم الداخلي.",
        buttonText: "اكتشف المقال",
      },
    },
    {
      eng: {
        coverImage: img6,
        tags: ["Interior", "Design"],
        title: "Effective Stakeholder Communication in Project Management",
        authorImage: logo,
        authorName: "Nezar Saab",
        date: "July 15, 2023",
        description:
          "In the intricate tapestry of project management, effective communication with stakeholders stands as a linchpin for success. ",
        buttonText: "View Post",
      },
      ar: {
        coverImage: img6,
        tags: ["داخلي", "تصميم"],
        title: "التواصل الفعال مع أصحاب المصلحة في إدارة المشاريع",
        authorImage: logo,
        authorName: "نزار صعب",
        date: "١٥ يوليو ٢٠٢٣",
        description:
          "في النسيج المعقد لإدارة المشاريع، يعد التواصل الفعال مع أصحاب المصلحة بمثابة العمود الفقري للنجاح. يدرك خالص أن الشفافية والتواصل الفعال طوال دورة حياة المشروع هو الأهم على الإطلاق...",
        buttonText: "اكتشف المقال",
      },
    },
    {
      eng: {
        coverImage: img7,
        tags: ["Interior", "Design"],
        title: "The Importance of Agile Project Management",
        authorImage: logo,
        authorName: "Nezar Saab",
        date: "July 15, 2023",
        description:
          "In the fast-paced world of construction, agility isn’t just a desirable trait; it’s a game-changer. At Khales Project Management, we recognize the paramount importance of Agile Project Management in the construction industry.",
        buttonText: "View Post",
      },
      ar: {
        coverImage: img7,
        tags: ["داخلي", "تصميم"],
        title: "أهمية إدارة المشاريع الرشيقة",
        authorImage: logo,
        authorName: "نزار صعب",
        date: "١٥ يوليو ٢٠٢٣",
        description:
          "في عالم البناء سريع الخطى، لا تعد خفة الحركة مجرد سمة مرغوبة؛ إنها تغير قواعد اللعبة. في خالص لإدارة المشاريع، نحن ندرك الأهمية القصوى لإدارة المشاريع الرشيقة في صناعة البناء والتشييد...",
        buttonText: "اكتشف المقال",
      },
    },
    {
      eng: {
        coverImage: img8,
        tags: ["Interior", "Design"],
        title: "Sustainable Architecture Practices",
        authorImage: logo,
        authorName: "Nezar Saab",
        date: "July 15, 2023",
        description:
          "In the contemporary era, with an increasing global focus on environmental sustainability, the discourse around sustainable architecture has evolved into a pivotal force guiding innovative and responsible building practices.",
        buttonText: "View Post",
      },
      ar: {
        coverImage: img8,
        tags: ["داخلي", "تصميم"],
        title: "ممارسات الهندسة المعمارية المستدامة",
        authorImage: logo,
        authorName: "نزار صعب",
        date: "١٥ يوليو ٢٠٢٣",
        description:
          "في عصر يحتل فيه الوعي البيئي مركز الصدارة، ظهرت الهندسة المعمارية المستدامة كمبدأ توجيهي لممارسات البناء المبتكرة والمسؤولة. في خالص، نحن ملتزمون بنسج الاستدامة في نسيج التصميم المعماري.",
        buttonText: "اكتشف المقال",
      },
    },
  ];
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage(); // Assuming you have a language context

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <HeroSlider
        slides={slides[language] || slides["eng"]}
        language={language}
        isLoading={isLoading}
        rtl={language === "ar"}
      />
      <BlogGrid cardsData={blogCardsData} />
      <CTASection />
    </div>
  );
}

export default BlogsPage;
