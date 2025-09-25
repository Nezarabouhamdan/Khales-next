// components/Property Page/ProjectData.js
// This file is a "neutral" module. It has NO "use client".

export const projectsData = [
  {
    id: 1,
    slug: "The-Royal-Villa",
    category: { eng: "Luxury_Villas", ar: "فلل فاخرة" },
    mainImage: "https://i.ibb.co/n8rkyLkQ/Screenshot-2025-08-06-134945.png",
    // ======================= THE FIX IS HERE =======================
    // Updated the gallery images with the new links provided.
    galleryImages: [
      "https://i.ibb.co/Z1GsRkFF/Screenshot-2025-08-06-134653.png",
      "https://i.ibb.co/rGMMdMbr/Screenshot-2025-08-06-134836.png",
      "https://i.ibb.co/XZL7n0y4/Screenshot-2025-08-06-134848.png",
      "https://i.ibb.co/1S2vShg/Screenshot-2025-08-06-134858.png",
      "https://i.ibb.co/DypDCGD/Screenshot-2025-08-06-134907.png",
      "https://i.ibb.co/v6sBCRHj/Screenshot-2025-08-06-134917.png",
      "https://i.ibb.co/V0cDtSmW/Screenshot-2025-08-06-134926.png",
      "https://i.ibb.co/BVDc1Msr/Screenshot-2025-08-06-134937.png",
      "https://i.ibb.co/n8rkyLkQ/Screenshot-2025-08-06-134945.png",
      "https://i.ibb.co/qY8yWfyy/Screenshot-2025-08-06-134958.png",
    ],
    // ===============================================================
    en: {
      tags: ["Architectural Design", "Site Supervision"],
      title: "The Royal Villa",
      address: "Muscat, Oman",
      description: "Luxurious single-storey palace designed in Muscat.",
      longDescription:
        "The Royal Villa is a one-floor luxury residence in Muscat, Oman, designed to embody the presence and elegance of a true palace. Created for a private client, the design focuses on classical proportions, golden columns, and elevated ceiling heights to achieve a grand architectural expression within a single-storey layout. Khales provided full architectural design and site supervision, ensuring every detail, from the entry arches to the roofline composition, supported the vision of a timeless, royal home.",
      price: "2,500,000",
      beds: 6,
      floor: "Ground Floor",
      sqft: "12,600",
      highlights: [
        { label: "Project Type", value: "Palace" },
        { label: "Under Construction", value: "2025" },
      ],
      keyFeatures: [
        "Golden columns",
        "Classical symmetry",
        "High ceilings",
        "Detailed façade",
      ],
    },
    ar: {
      tags: ["تصميم معماري", "إشراف على الموقع"],
      title: "الفيلا الملكية",
      address: "مسقط، عمان",
      description: "قصر فخم من طابق واحد مصمم في مسقط.",
      longDescription:
        "الفيلا الملكية هي سكن فاخر من طابق واحد في مسقط، عمان، مصممة لتجسيد حضور وأناقة قصر حقيقي. تم تصميمها لعميل خاص، حيث يركز التصميم على النسب الكلاسيكية، والأعمدة الذهبية، وارتفاعات الأسقف الشاهقة لتحقيق تعبير معماري فخم ضمن تصميم من طابق واحد. قدمت خالص التصميم المعماري الكامل والإشراف على الموقع، مع التأكد من أن كل التفاصيل، من أقواس المدخل إلى تكوين خط السقف، تدعم رؤية منزل ملكي خالد.",
      price: "٢٬٥٠٠٬٠٠٠",
      beds: "٦",
      floor: "الطابق الأرضي",
      sqft: "١٢٬٦٠٠",
      highlights: [
        { label: "نوع المشروع", value: "قصر" },
        { label: "تحت الإنشاء", value: "٢٠٢٥" },
      ],
      keyFeatures: [
        "أعمدة ذهبية",
        "تناظر كلاسيكي",
        "أسقف عالية",
        "واجهة مفصلة",
      ],
    },
  },
  {
    id: 2,
    slug: "TheCrownCentral",
    category: { eng: "Commercial", ar: "تجاري" },
    mainImage: "https://i.ibb.co/1Gn1hMNV/Landscape-Saudi-Arabia.png",
    galleryImages: [
      "https://i.ibb.co/1Gn1hMNV/Landscape-Saudi-Arabia.png",
      "https://i.ibb.co/Z6jRc9zm/Riyadh-1-sq.png",
      "https://i.ibb.co/Xxp72yFD/Riyadh-2-sq.png",
    ],
    en: {
      tags: ["Architectural Design", "Site Supervision"],
      title: "The Crown Central",
      address: "Riyadh, Saudi Arabia",
      description: "Urban luxury living in a high-rise.",
      longDescription:
        "The Crown Central is a high-rise mixed-use development located in a prime area of Riyadh. Designed to balance luxury with accessibility, the project offers an urban experience that combines residential, commercial, and lifestyle spaces within a unified architectural language. With sweeping views of the city and a high-exposure site, the design focuses on clean vertical rhythm, clear circulation, and material elegance. Khales was appointed for full architectural design and site supervision, overseeing quality and consistency from concept to delivery.",
      price: "5,750,000",
      beds: "60+ units/rooms",
      floor: "15",
      sqft: "60,100",
      keyFeatures: [
        "Vertical urban design",
        "Luxury-accessible concept",
        "Skyline views",
      ],
      highlights: [
        { label: "Project Type", value: "Mixed-Use Development" },
        { label: "Under Construction", value: "2025" },
      ],
    },
    ar: {
      tags: ["تصميم معماري", "إشراف على الموقع"],
      title: "ذا كراون سنترال",
      address: "الرياض، المملكة العربية السعودية",
      description: "حياة حضرية فاخرة في برج شاهق.",
      longDescription:
        "ذا كراون سنترال هو مشروع تطويري شاهق متعدد الاستخدامات يقع في منطقة حيوية بالرياض. تم تصميمه لتحقيق التوازن بين الفخامة وسهولة الوصول، ويقدم المشروع تجربة حضرية تجمع بين المساحات السكنية والتجارية والترفيهية ضمن لغة معمارية موحدة. مع إطلالات واسعة على المدينة وموقع بارز، يركز التصميم على الإيقاع الرأسي النظيف، والحركة الواضحة، وأناقة المواد. تم تعيين خالص لتقديم التصميم المعماري الكامل والإشراف على الموقع، ومراقبة الجودة والاتساق من الفكرة حتى التسليم.",
      price: "٥٬٧٥٠٬٠٠٠",
      beds: "+٦٠ وحدة/غرفة",
      floor: "١٥",
      sqft: "٦٠٬١٠٠",
      keyFeatures: [
        "تصميم حضري رأسي",
        "مفهوم الفخامة المتاحة",
        "إطلالات على الأفق",
      ],
      highlights: [
        { label: "نوع المشروع", value: "تطوير متعدد الاستخدامات" },
        { label: "تحت الإنشاء", value: "٢٠٢٥" },
      ],
    },
  },
  {
    id: 3,
    slug: "TheOrganicVilla",
    category: { eng: "Residential", ar: "سكني" },
    mainImage: "https://i.ibb.co/hFHH248S/IMG-20250811-WA0020.jpg",

    galleryImages: [
      "https://i.ibb.co/S44GR5MS/IMG-20250811-WA0018.jpg",
      "https://i.ibb.co/MxTqt5Yg/IMG-20250811-WA0019.jpg",
      "https://i.ibb.co/hFHH248S/IMG-20250811-WA0020.jpg",
      "https://i.ibb.co/sdWQ1Ggx/IMG-20250811-WA0021.jpg",
      "https://i.ibb.co/5xcrL6RS/IMG-20250811-WA0010.jpg",
      "https://i.ibb.co/2Yf2ym33/IMG-20250811-WA0011.jpg",
      "https://i.ibb.co/B2DKscNF/IMG-20250811-WA0012.jpg",
      "https://i.ibb.co/1fytTybY/IMG-20250811-WA0013.jpg",
      "https://i.ibb.co/0jxw5PBG/IMG-20250811-WA0014.jpg",
      "https://i.ibb.co/kVrHP0MF/IMG-20250811-WA0015.jpg",
      "https://i.ibb.co/S7yXtX6p/IMG-20250811-WA0016.jpg",
      "https://i.ibb.co/jZHKsnBq/IMG-20250811-WA0017.jpg",
    ],
    en: {
      tags: ["Project Management", "Construction Oversight"],
      title: "The Organic Villa",
      address: "Al Wasl, Dubai",
      description: "A tranquil retreat of understated luxury.",
      longDescription:
        "Located in the heart of Al Wasl, Dubai, The Organic Villa is a modern private residence that brings together calm, softness, and understated luxury. The design embraces an organic architectural language, with curved edges, natural transitions, and a focus on flow and serenity. Inspired by the concept of “less is more,” the villa was envisioned as a tranquil retreat, blending openness with refined spatial control. Khales is leading the full project management scope, overseeing design, engineering coordination, and site execution to ensure a seamless delivery from ground to roof.",
      price: "5,750,000",
      beds: "6",
      floor: "Ground + 1st + Roof",
      sqft: "10,800",
      keyFeatures: [
        "Curved façade elements",
        "Soft architectural lines",
        "Minimal palette",
        "Layered spaces",
      ],
      highlights: [
        { label: "Project Type", value: "Villa" },
        { label: "Under Construction", value: "2025" },
      ],
    },
    ar: {
      tags: ["إدارة المشاريع", "إشراف على البناء"],
      title: "الفيلا الطبيعية",
      address: "الوصل، دبي",
      description: "ملاذ هادئ من الفخامة البسيطة.",
      longDescription:
        "تقع الفيلا العضوية في قلب منطقة الوصل بدبي، وهي سكن خاص حديث يجمع بين الهدوء والنعومة والفخامة البسيطة. يتبنى التصميم لغة معمارية عضوية، مع حواف منحنية وتحولات طبيعية وتركيز على التدفق والسكينة. مستوحاة من مفهوم 'الأقل هو الأكثر'، تم تصور الفيلا كملاذ هادئ، يمزج بين الانفتاح والتحكم المكاني الراقي. تقود خالص نطاق إدارة المشروع بالكامل، حيث تشرف على التصميم والتنسيق الهندسي وتنفيذ الموقع لضمان تسليم سلس من الأساس إلى السقف.",
      price: "٥٬٧٥٠٬٠٠٠",
      beds: "٦",
      floor: "أرضي + أول + سطح",
      sqft: "١٠٬٨٠٠",
      keyFeatures: [
        "عناصر واجهة منحنية",
        "خطوط معمارية ناعمة",
        "ألوان بسيطة",
        "مساحات متدرجة",
      ],
      highlights: [
        { label: "نوع المشروع", value: "فيلا" },
        { label: "تحت الإنشاء", value: "٢٠٢٥" },
      ],
    },
  },
  {
    id: 4,
    slug: "meydan-residential-building",
    category: {
      eng: "Residential",
      ar: " سكني",
    },
    mainImage:
      "https://i.ibb.co/dwNpBPhF/Whats-App-Image-2025-09-04-at-10-44-32-5403cc4b.jpg",
    galleryImages: [
      "https://i.ibb.co/dwNpBPhF/Whats-App-Image-2025-09-04-at-10-44-32-5403cc4b.jpg",
      "https://i.ibb.co/DD59VbTS/Whats-App-Image-2025-09-04-at-10-44-33-27a6a82c.jpg",
      "https://i.ibb.co/84zFBDJF/Whats-App-Image-2025-09-04-at-10-44-33-d33f0e38.jpg",
      "https://i.ibb.co/wZW5wV8y/Whats-App-Image-2025-09-04-at-10-44-34-6c900ec8.jpg",
      "https://i.ibb.co/F45Mh4PR/Whats-App-Image-2025-09-04-at-10-44-34-dd385f2b.jpg",
    ],
    en: {
      tags: ["Residential", "Modern Architecture", "Real Estate"],
      title: "Meydan Residential Building",
      address: "Al Meydan, Dubai",
      description: "Modern G+4 residential living in Meydan.",
      longDescription:
        "This modern G+4 residential building is located in the prestigious Al Meydan area of Dubai. It offers a collection of contemporary apartments designed for a modern lifestyle, featuring high-quality finishes and thoughtful layouts. The project's prime location provides residents with excellent connectivity and access to world-class amenities.",
      price: "0",
      beds: "32+ units",
      floor: "G+4",
      sqft: "25,000",
      status: "Under Construction",
      keyFeatures: [
        "Contemporary architectural design",
        "Spacious apartment layouts",
        "Prime location in Al Meydan",
        "High-end interior finishes",
      ],
      highlights: [
        {
          label: "Project Type",
          value: "Residential Building",
        },
        {
          label: "Status",
          value: "Under Construction",
        },
      ],
    },
    ar: {
      tags: ["سكني", "عمارة حديثة", "عقارات"],
      title: "مبنى سكني في ميدان",
      address: "الميدان، دبي",
      description: "حياة عصرية في مبنى سكني G+4.",
      longDescription:
        "يقع هذا المبنى السكني الحديث المكون من أرضي + 4 طوابق في منطقة الميدان المرموقة في دبي. يقدم مجموعة من الشقق العصرية المصممة لأسلوب حياة حديث، مع تشطيبات عالية الجودة وتصاميم مدروسة. يوفر الموقع المتميز للمشروع للسكان سهولة الوصول إلى المرافق عالمية المستوى.",
      price: "٠",
      beds: "+٣٢ وحدة",
      floor: "أرضي + ٤ طوابق",
      sqft: "٢٥٬٠٠٠",
      status: "تحت الإنشاء",
      keyFeatures: [
        "تصميم معماري معاصر",
        "شقق سكنية واسعة",
        "موقع متميز في الميدان",
        "تشطيبات داخلية فاخرة",
      ],
      highlights: [
        {
          label: "نوع المشروع",
          value: "مبنى سكني",
        },
        {
          label: "الحالة",
          value: "تحت الإنشاء",
        },
      ],
    },
  },
  {
    id: 5,
    slug: "Jebel-Ali-Hills-grand-villa",
    category: {
      eng: "Residential",
      ar: "سكني",
    },
    mainImage:
      "https://i.ibb.co/1GPhqTPD/Whats-App-Image-2025-09-04-at-10-32-13-743b2078.jpg",
    galleryImages: [
      "https://i.ibb.co/1GPhqTPD/Whats-App-Image-2025-09-04-at-10-32-13-743b2078.jpg",
      "https://i.ibb.co/KRR5NY8/Whats-App-Image-2025-09-04-at-10-32-14-9f862531.jpg",
      "https://i.ibb.co/LVsR3zg/Whats-App-Image-2025-09-04-at-10-32-14-79e5bf44.jpg",
      "https://i.ibb.co/ZphXVW4P/Whats-App-Image-2025-09-04-at-10-32-14-467df346.jpg",
      "https://i.ibb.co/PsCnRPTd/Whats-App-Image-2025-09-04-at-10-32-14-2342643b.jpg",
      "https://i.ibb.co/XxxX9Grb/Whats-App-Image-2025-09-04-at-10-32-14-8146521b.jpg",
      "https://i.ibb.co/p6QPVrkr/Whats-App-Image-2025-09-04-at-10-32-14-d00a7d0c.jpg",
      "https://i.ibb.co/JjVctXys/Whats-App-Image-2025-09-04-at-10-32-14-e83d3a9f.jpg",
      "https://i.ibb.co/gFbqPR3z/Whats-App-Image-2025-09-04-at-10-32-14-f4a6a6c0.jpg",
      "https://i.ibb.co/LXmcHJB3/Whats-App-Image-2025-09-04-at-10-32-14-fbb17ca2.jpg",
    ],
    en: {
      tags: ["Neoclassical", "Luxury Villa", "Real Estate"],
      title: "Jebel Ali Hills Villa",
      address: "Jebel Ali Hills, Dubai",
      description: "A masterpiece of neoclassical design and luxury.",
      longDescription:
        "This exquisite villa in Al Barsha is a stunning example of modern neoclassical architecture. The design features a grand entrance with stately columns, leading into spacious interiors that overlook a serene central courtyard with a private swimming pool. Every detail is crafted for an unparalleled lifestyle of elegance and comfort, blending timeless design with contemporary luxury.",
      beds: "6",
      floor: "Ground + 1st",
      sqft: "7200",
      price: "0",
      status: "Newly Completed",
      keyFeatures: [
        "Grand neoclassical facade",
        "Private courtyard with swimming pool",
        "Landscaped gardens with a fountain",
        "Spacious, light-filled interiors",
        "Premium marble and wood finishes",
      ],
      highlights: [
        {
          label: "Project Type",
          value: "Luxury Villa",
        },
        {
          label: "Status",
          value: "Newly Completed",
        },
      ],
    },
    ar: {
      tags: ["نيوكلاسيكي", "فيلا فاخرة", "عقارات"],
      title: "فيلا تلال جبل علي ",
      address: "تلال جبل علي, دبي",
      description: "تحفة فنية تجمع بين التصميم النيوكلاسيكي والفخامة.",
      longDescription:
        "تعتبر هذه الفيلا الرائعة في البرشاء مثالاً مذهلاً على العمارة النيوكلاسيكية الحديثة. يتميز التصميم بمدخل فخم بأعمدة مهيبة، يؤدي إلى مساحات داخلية واسعة تطل على فناء مركزي هادئ مع مسبح خاص. تم تصميم كل التفاصيل لأسلوب حياة لا مثيل له من الأناقة والراحة، حيث يمزج التصميم الخالد مع الفخامة المعاصرة.",
      beds: "٦",
      floor: "أرضي + أول",
      sqft: "٧٠٠",
      price: "٠",
      status: "مكتمل حديثاً",
      keyFeatures: [
        "واجهة نيوكلاسيكية فخمة",
        "فناء خاص مع مسبح",
        "حدائق منسقة مع نافورة",
        "مساحات داخلية واسعة ومضيئة",
        "تشطيبات فاخرة من الرخام والخشب",
      ],
      highlights: [
        {
          label: "نوع المشروع",
          value: "فيلا فاخرة",
        },
        {
          label: "الحالة",
          value: "مكتمل حديثاً",
        },
      ],
    },
  },
  {
    id: 6,
    slug: "verdant-gardens-qatar",
    category: { eng: "Luxury_Villas", ar: "فلل فاخرة" },

    mainImage:
      "https://i.ibb.co/xtGNLgds/Whats-App-Image-2025-09-04-at-10-31-20-2df48564.jpg",
    galleryImages: [
      "https://i.ibb.co/xtGNLgds/Whats-App-Image-2025-09-04-at-10-31-20-2df48564.jpg",
      "https://i.ibb.co/JjBGD20D/Whats-App-Image-2025-09-04-at-10-31-20-4b12e02b.jpg",
      "https://i.ibb.co/Q3pwT8QK/Whats-App-Image-2025-09-04-at-10-31-20-6b3f634d.jpg",
      "https://i.ibb.co/JDLqyCk/Whats-App-Image-2025-09-04-at-10-31-20-61e36149.jpg",
      "https://i.ibb.co/m5sQtTcw/Whats-App-Image-2025-09-04-at-10-31-20-75a47559.jpg",
      "https://i.ibb.co/C3hKt7ym/Whats-App-Image-2025-09-04-at-10-31-20-081a8e4c.jpg",
      "https://i.ibb.co/svSbfWbF/Whats-App-Image-2025-09-04-at-10-31-20-bb1f4fe7.jpg",
      "https://i.ibb.co/fGq3ZFYK/Whats-App-Image-2025-09-04-at-10-31-21-8cf01818.jpg",
      "https://i.ibb.co/fdQq4sL8/Whats-App-Image-2025-09-04-at-10-31-21-14c14361.jpg",
      "https://i.ibb.co/svyJsPqn/Whats-App-Image-2025-09-04-at-10-31-21-17fb33a1.jpg",
    ],
    en: {
      tags: ["Landscape Design", "Garden Architecture", "Outdoor Living"],
      title: "Qatar Garden",
      address: "Lusail , Qatar ",
      description: "A landscape of geometric beauty and tranquility.",
      longDescription:
        "This landscape design project in Lusail , Qatar transforms an outdoor space into a private sanctuary. The design is defined by its clean, geometric pathways that create a sense of structure and flow through manicured lawns and lush plantings. Key features include serene water elements and a modern pergola that serves as a focal point for relaxation and entertainment, seamlessly extending the home's living space into the natural environment.",
      price: "0",
      sqft: "600",

      status: "Newly Completed",
      keyFeatures: [
        "Geometric concrete and grass pathways",
        "Manicured lawns and lush greenery",
        "Modern pergola for outdoor seating",
        "Integrated water features",
        "Seamless indoor-outdoor transitions",
      ],
      highlights: [
        {
          label: "Project Type",
          value: "Landscape",
        },
        {
          label: "Status",
          value: "Completed",
        },
      ],
    },
    ar: {
      tags: [
        "تصميم المناظر الطبيعية",
        "هندسة الحدائق",
        "المعيشة في الهواء الطلق",
      ],
      title: "حديقة تلال قطر",
      address: "لوسيل، قطر",
      description: "تصميم طبيعي يجمع بين الجمال الهندسي والهدوء.",
      longDescription:
        "يحول مشروع تصميم المناظر الطبيعية هذا في لوسيل - قطر المساحة الخارجية إلى ملاذ خاص. يتميز التصميم بممراته الهندسية النظيفة التي تخلق إحساسًا بالهيكل والتدفق عبر المروج المشذبة والنباتات المورقة. تشمل الميزات الرئيسية عناصر مائية هادئة وبرجولا حديثة تعمل كنقطة محورية للاسترخاء والترفيه، مما يوسع مساحة معيشة المنزل بسلاسة في البيئة الطبيعية.",
      price: "٠",
      sqft: "٦٠٠",

      status: "مكتمل حديثاً",
      keyFeatures: [
        "ممرات هندسية من الخرسانة والعشب",
        "مروج مشذبة ومساحات خضراء مورقة",
        "برجولا حديثة للجلوس في الهواء الطلق",
        "عناصر مائية مدمجة",
        "انتقالات سلسة بين الداخل والخارج",
      ],
      highlights: [
        {
          label: "نوع المشروع",
          value: "تصميم مناظر طبيعية",
        },
        {
          label: "الحالة",
          value: "مكتمل",
        },
      ],
    },
  },
];

export const findProjectBySlug = (slug) => {
  return projectsData.find((p) => p.slug === slug) || null;
};
