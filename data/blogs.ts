// Real editorial content, ported verbatim from Khales-next's
// data/BlogData.js (dictionaries/en.js + ar.js authored the original copy).
// Cover photography: Khales-next's own blog1.png..blog10.png files are
// missing from its public/assets folder (dead references in the source
// project), so those posts borrow existing Unsplash architecture imagery
// already used elsewhere on this site. Posts 9 and 11 keep their real,
// working cover images from Khales-next.

export type Bilingual = { en: string; ar: string };

export type BlogPostBody = {
  subtitle: string;
  paragraphs: string[];
  quote: string;
  paragraphAfterQuote: string;
  sectionTitle: string;
  thirdParagraph: string;
  listItems: string[];
  fourthParagraph: string;
};

export type BlogPost = {
  slug: string;
  tags: Bilingual[];
  title: Bilingual;
  excerpt: Bilingual;
  authorName: Bilingual;
  cover: string;
  date: string; // ISO
  body: { en: BlogPostBody; ar: BlogPostBody };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "modern-architectural-trends-in-residential-design",
    tags: [
      { en: "Design", ar: "تصميم" },
      { en: "Architecture", ar: "عمارة" },
    ],
    title: {
      en: "Modern Architectural Trends in Residential Design",
      ar: "الاتجاهات المعمارية الحديثة في التصميم السكني",
    },
    excerpt: {
      en: "In the ever-evolving landscape of residential design, staying abreast of modern architectural trends is paramount...",
      ar: "في مشهد التصميم السكني دائم التطور، تعد مواكبة الاتجاهات المعمارية الحديثة أمرًا بالغ الأهمية...",
    },
    authorName: { en: "Jonin Garcia", ar: "جونين جارسيا" },
    cover: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    date: "2024-06-28",
    body: {
      en: {
        subtitle: "Crafting contemporary luxury living spaces",
        paragraphs: [
          "In the ever-evolving landscape of residential design, staying abreast of modern architectural trends is paramount to crafting homes that seamlessly blend style, functionality, and innovation. Khales is committed to transforming living spaces into timeless expressions of contemporary luxury.",
          "Open Concept Living: Modern residential design embraces open-concept living spaces. Removing barriers between the kitchen, dining, and living areas fosters a sense of spaciousness, promoting fluidity and connectivity within the home.",
        ],
        quote:
          "In the pursuit of modern architectural excellence, Khales Project Management invites you to explore a world where innovation meets elegance.",
        paragraphAfterQuote:
          "Our commitment to staying at the forefront of residential design trends ensures that your home is not just a place to live but a testament to the artistry of contemporary living. Welcome to a new era of residential luxury.",
        sectionTitle: "Key Trends in Modern Residential Design",
        thirdParagraph:
          "Sustainable and Eco-Friendly Practices: Khales leads the way in integrating sustainable and eco-friendly practices into residential design. From energy-efficient appliances to eco-conscious building materials, our commitment to environmentally responsible design ensures homes that are both luxurious and sustainable.",
        listItems: [
          "Biophilic Design: Connecting residents with nature through large windows and natural materials",
          "Smart Home Integration: Automated lighting and security systems for enhanced comfort",
          "Minimalist Aesthetics: Clean lines and simple color palettes for tranquility",
        ],
        fourthParagraph:
          "Flexibility and Multifunctionality: Spaces are crafted with versatility in mind. Mixed Materials and Textures: Combining wood, metal, glass and stone creates visual interest. Innovative Use of Natural Light: Employing skylights and glass walls to maximize daylight. Rooftop Gardens: Enhancing aesthetics while contributing to sustainable living.",
      },
      ar: {
        subtitle: "صياغة مساحات المعيشة الفاخرة المعاصرة",
        paragraphs: [
          "في مشهد التصميم السكني دائم التطور، تعد مواكبة الاتجاهات المعمارية الحديثة أمرًا بالغ الأهمية لتصميم المنازل التي تمزج بسلاسة بين الأسلوب والوظيفة والابتكار. خالص ملتزم بتحويل مساحات المعيشة إلى تعبيرات خالدة عن الفخامة المعاصرة.",
          "مفهوم مفتوح للمعيشة: تصميم سكني حديث يضم مساحات معيشة ذات مفهوم مفتوح. تعمل إزالة الحواجز بين مناطق المطبخ وتناول الطعام والمعيشة على تعزيز الشعور بالرحابة وتعزيز الانسيابية والاتصال داخل المنزل.",
        ],
        quote:
          "في سعيها لتحقيق التميز المعماري الحديث، تدعوك شركة خالص لإدارة المشاريع لاستكشاف عالم يلتقي فيه الابتكار بالأناقة.",
        paragraphAfterQuote:
          "إن التزامنا بالبقاء في طليعة اتجاهات التصميم السكني يضمن أن منزلك ليس مجرد مكان للعيش فيه ولكنه شهادة على فن الحياة المعاصرة. مرحبًا بكم في عصر جديد من الفخامة السكنية.",
        sectionTitle: "الاتجاهات الرئيسية في التصميم السكني الحديث",
        thirdParagraph:
          "الممارسات المستدامة والصديقة للبيئة: خالص يقود الطريق في دمج الممارسات المستدامة والصديقة للبيئة في التصميم السكني. من الأجهزة الموفرة للطاقة إلى مواد البناء الصديقة للبيئة، يضمن التزامنا بالتصميم المسؤول بيئيًا توفير منازل فاخرة ومستدامة.",
        listItems: [
          "التصميم الحيوي: ربط السكان بالطبيعة من خلال النوافذ الكبيرة والمواد الطبيعية",
          "تكامل المنزل الذكي: أنظمة إضاءة وأمان آلية لتعزيز الراحة",
          "جماليات الحد الأدنى: خطوط نظيفة ولوحات ألوان بسيطة للهدوء",
        ],
        fourthParagraph:
          "المرونة وتعدد الوظائف: تم تصميم المساحات مع أخذ التنوع في الاعتبار. المواد والأنسجة المختلطة: الجمع بين الخشب والمعادن والزجاج والحجر يخلق اهتمامًا بصريًا. الاستخدام المبتكر للضوء الطبيعي: استخدام المناور والجدران الزجاجية لتحقيق أقصى قدر من ضوء النهار. حدائق الأسطح: تعزيز الجماليات مع المساهمة في الحياة المستدامة.",
      },
    },
  },
  {
    slug: "advancements-in-structural-steel-design-for-villas",
    tags: [
      { en: "Construction", ar: "بناء" },
      { en: "Engineering", ar: "هندسة" },
    ],
    title: {
      en: "Advancements in Structural Steel Design for Villas",
      ar: "التطورات في التصميم الفولاذي الإنشائي للفلل",
    },
    excerpt: {
      en: "In the realm of villa construction, the use of structural steel has evolved dramatically...",
      ar: "في عالم بناء الفيلات، تطور استخدام الفولاذ الإنشائي بشكل كبير...",
    },
    authorName: { en: "Nezar Saab", ar: "نزار صعب" },
    cover: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=80",
    date: "2024-07-15",
    body: {
      en: {
        subtitle: "Innovations in modern villa construction",
        paragraphs: [
          "In the realm of villa construction, the use of structural steel has evolved dramatically, offering not just strength but also unmatched versatility in design. At Khales Project Management, we understand the pivotal role of structural steel in crafting luxurious and enduring villas.",
          "Tailored Design Solutions: Advancements allow Khales to offer customized solutions for villa construction. Whether it's sleek modern lines or timeless classic elegance, structural steel can be adapted to each client's vision.",
        ],
        quote: "Steel is not just a material, it's a design philosophy that enables architectural freedom.",
        paragraphAfterQuote:
          "The integration of steel structures in luxury villas has opened new possibilities for open floor plans and expansive glass facades. Architects can now create cantilevers and large spans previously impossible with traditional materials.",
        sectionTitle: "The Future of Villa Construction",
        thirdParagraph:
          "As urbanization increases and land becomes more valuable, steel structures allow for taller, more efficient villa designs. These designs maximize space while minimizing environmental impact through efficient material usage.",
        listItems: [
          "High-Strength Low-Alloy (HSLA) steels for exceptional strength",
          "3D Modeling and BIM for precision engineering",
          "Fire-resistant coatings for enhanced safety",
        ],
        fourthParagraph:
          "Cost-Efficiency and Time Savings: Construction is accelerated through precise prefabrication. Looking ahead, we anticipate innovations in composite materials and smart steel technologies that respond dynamically to environmental conditions.",
      },
      ar: {
        subtitle: "الابتكارات في بناء الفيلات الحديثة",
        paragraphs: [
          "في عالم بناء الفيلات، تطور استخدام الفولاذ الإنشائي بشكل كبير، مما يوفر ليس فقط القوة ولكن أيضًا تنوعًا لا مثيل له في التصميم. في الخالص لإدارة المشاريع، ندرك الدور المحوري الذي يلعبه الفولاذ الإنشائي في تصميم الفلل الفاخرة والمتينة.",
          "حلول التصميم المخصصة: التقدم يسمح للخالص بتقديم حلول مخصصة لبناء الفلل. سواء كانت خطوط عصرية أنيقة أو أناقة كلاسيكية خالدة، يمكن تكييف الفولاذ الهيكلي مع رؤية كل عميل.",
        ],
        quote: "الفولاذ ليس مجرد مادة، إنه فلسفة تصميم تتيح الحرية المعمارية.",
        paragraphAfterQuote:
          "فتح دمج الهياكل الفولاذية في الفيلات الفاخرة إمكانيات جديدة لخطط الطوابق المفتوحة والواجهات الزجاجية الواسعة. يمكن للمهندسين المعماريين الآن إنشاء كوابيل وامتدادات كبيرة كانت مستحيلة سابقًا بالمواد التقليدية.",
        sectionTitle: "مستقبل بناء الفيلات",
        thirdParagraph:
          "مع زيادة التحضر وأصبحت الأرض أكثر قيمة، تسمح الهياكل الفولاذية بتصميمات فيلات أطول وأكثر كفاءة. تزيد هذه التصميمات من المساحة مع تقليل التأثير البيئي من خلال استخدام المواد بكفاءة.",
        listItems: [
          "الفولاذ عالي القوة والسبائك المنخفضة (HSLA) لقوة استثنائية",
          "النمذجة ثلاثية الأبعاد ونمذجة معلومات البناء (BIM) للهندسة الدقيقة",
          "الطلاءات المقاومة للحريق لتحسين السلامة",
        ],
        fourthParagraph:
          "كفاءة التكلفة وتوفير الوقت: يتم تسريع البناء من خلال التصنيع المسبق الدقيق. بالنظر إلى المستقبل، نتوقع ابتكارات في المواد المركبة وتقنيات الفولاذ الذكية التي تستجيب ديناميكيًا للظروف البيئية.",
      },
    },
  },
  {
    slug: "innovative-approaches-to-high-rise-building-structures",
    tags: [
      { en: "Construction", ar: "بناء" },
      { en: "Engineering", ar: "هندسة" },
    ],
    title: {
      en: "Innovative Approaches to High-Rise Building Structures",
      ar: "أساليب مبتكرة لهياكل المباني الشاهقة",
    },
    excerpt: {
      en: "In the dynamic landscape of construction, the demand for high-rise buildings continues to soar...",
      ar: "في المشهد الديناميكي للبناء، يستمر الطلب على المباني الشاهقة في الارتفاع...",
    },
    authorName: { en: "Alex Morgan", ar: "أليكس مورغان" },
    cover: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    date: "2024-08-05",
    body: {
      en: {
        subtitle: "Redefining the bedrock of towering structures",
        paragraphs: [
          "In the dynamic landscape of construction, the demand for high-rise buildings continues to soar, driven by urbanization and the need for efficient space utilization. As we reach new heights, Khales recognizes the importance of innovative approaches to high-rise building foundations.",
          "Advanced Pile Foundations: Advancements in technology have ushered in new methods such as helical piles and auger-cast piles. These techniques provide enhanced load-bearing capacity and reduced environmental impact.",
        ],
        quote:
          "As Khales Project Management delves into the future of high-rise construction, innovative approaches pave the way for safer, more efficient structures.",
        paragraphAfterQuote:
          "We are committed to staying at the forefront of these advancements, ensuring our projects not only reach new heights but stand firmly on foundations engineered for excellence.",
        sectionTitle: "Cutting-Edge Foundation Technologies",
        thirdParagraph:
          "Soil-Structure Interaction Studies: Modern geotechnical engineering utilizes sophisticated studies to analyze soil-structure interaction, enabling optimized foundation design based on specific site conditions.",
        listItems: [
          "Self-Compacting Concrete (SCC) Technology for efficient placement",
          "Modular Foundation Systems with prefabricated components",
          "Hybrid Foundation Designs combining various foundation types",
        ],
        fourthParagraph:
          "Advanced Monitoring and Instrumentation: Real-time monitoring of foundation performance is essential for long-term stability. Khales embraces sensor technologies providing continuous data on movements and stresses for proactive measures.",
      },
      ar: {
        subtitle: "إعادة تعريف الأساس المتين للهياكل الشاهقة",
        paragraphs: [
          "في المشهد الديناميكي للبناء، يستمر الطلب على المباني الشاهقة في الارتفاع، مدفوعًا بالتوسع الحضري والحاجة إلى الاستخدام الفعال للمساحات. مع وصولنا إلى آفاق جديدة، تدرك خالص أهمية الأساليب المبتكرة لأساسات المباني الشاهقة.",
          "أساسات الخوازيق المتقدمة: التقدم التكنولوجي قد أدى إلى ظهور أساليب جديدة مثل الخوازيق الحلزونية والخوازيق المصبوبة. توفر هذه التقنيات قدرة تحمل معززة وتقليل التأثير البيئي.",
        ],
        quote:
          "بينما تخوض إدارة مشاريع الخالص في مستقبل البناء الشاهق، تمهد الأساليب المبتكرة الطريق لهياكل أكثر أمانًا وكفاءة.",
        paragraphAfterQuote:
          "نحن ملتزمون بالبقاء في طليعة هذه التطورات، مما يضمن أن مشاريعنا لا تصل إلى آفاق جديدة فحسب، بل تقف بقوة على أسس مصممة للتميز.",
        sectionTitle: "تقنيات الأساس المتطورة",
        thirdParagraph:
          "دراسات التفاعل بين بنية التربة: تستخدم الهندسة الجيوتقنية الحديثة دراسات متطورة لتحليل التفاعل بين بنية التربة، مما يمكّن من تحسين تصميم الأساس بناءً على ظروف الموقع المحددة.",
        listItems: [
          "تقنية الخرسانة ذاتية الضغط (SCC) لوضع فعال",
          "أنظمة الأساس المعيارية مع مكونات مسبقة الصنع",
          "تصاميم الأساسات الهجينة التي تجمع بين أنواع الأساسات المختلفة",
        ],
        fourthParagraph:
          "المراقبة والأجهزة المتقدمة: تعد المراقبة الفورية لأداء الأساسات أمرًا ضروريًا للاستقرار طويل الأجل. تتبنى خالص تقنيات الاستشعار التي توفر بيانات مستمرة عن الحركات والضغوط لاتخاذ تدابير استباقية.",
      },
    },
  },
  {
    slug: "eco-friendly-materials-in-modern-interior-design",
    tags: [
      { en: "Interior", ar: "داخلي" },
      { en: "Design", ar: "تصميم" },
    ],
    title: {
      en: "Eco-Friendly Materials in Modern Interior Design",
      ar: "مواد صديقة للبيئة في التصميم الداخلي الحديث",
    },
    excerpt: {
      en: "As we strive to create spaces that marry aesthetics with ethical responsibility...",
      ar: "وبينما نسعى جاهدين لإنشاء مساحات تجمع بين الجماليات والمسؤولية الأخلاقية...",
    },
    authorName: { en: "Sara Johnson", ar: "سارة جونسون" },
    cover: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80",
    date: "2024-08-20",
    body: {
      en: {
        subtitle: "Exploring beauty and functionality of sustainable materials",
        paragraphs: [
          "As we strive to create spaces that marry aesthetics with ethical responsibility, the integration of sustainable materials becomes pivotal. Journey through the eco-conscious realm of interior design.",
          "Embracing Nature's Bounty: Sustainable design begins with reverence for nature. Choosing materials from renewable resources like bamboo and reclaimed wood infuses spaces with natural warmth.",
        ],
        quote:
          "Embracing sustainable materials in interior design is not merely a trend; it's a commitment to a more harmonious relationship with our planet.",
        paragraphAfterQuote:
          "As designers and homeowners tread the path of sustainable living, each material choice becomes a step towards a greener, more beautiful future.",
        sectionTitle: "Sustainable Design Elements",
        thirdParagraph:
          "Low VOC, High Impact: Sustainable design prioritizes indoor air quality. Low Volatile Organic Compound paints ensure spaces are visually appealing while contributing to healthier environments.",
        listItems: [
          "Recycled materials minimize waste while adding artistic touches",
          "Innovative textiles like organic cotton reduce environmental footprint",
          "Cork flooring offers acoustic insulation and eco-friendly alternative",
        ],
        fourthParagraph:
          "Upcycled Wonders: Transforming discarded items into stunning focal points fosters creativity. Holistic Design: Consider Khales for your sustainable interior design journey where beauty meets responsibility.",
      },
      ar: {
        subtitle: "استكشاف جمال وفعالية المواد المستدامة",
        paragraphs: [
          "وبينما نسعى جاهدين لإنشاء مساحات تجمع بين الجماليات والمسؤولية الأخلاقية، يصبح دمج المواد المستدامة أمرًا محوريًا. انطلق في رحلة عبر عالم التصميم الداخلي الصديق للبيئة.",
          "احتضان فضل الطبيعة: يبدأ التصميم المستدام بتقديس الطبيعة. اختيار المواد من الموارد المتجددة مثل الخيزران والخشب المستصلح يغمر المساحات بالدفء الطبيعي.",
        ],
        quote:
          "إن تبني المواد المستدامة في التصميم الداخلي ليس مجرد اتجاه؛ إنه التزام بعلاقة أكثر انسجامًا مع كوكبنا.",
        paragraphAfterQuote:
          "بينما يسير المصممون وأصحاب المنازل على طريق الحياة المستدامة، يصبح كل اختيار للمواد خطوة نحو مستقبل أكثر اخضرارًا وجمالاً.",
        sectionTitle: "عناصر التصميم المستدام",
        thirdParagraph:
          "انخفاض المركبات العضوية المتطايرة، تأثير كبير: يعطي التصميم المستدام الأولوية لجودة الهواء الداخلي. تضمن الدهانات ذات المركبات العضوية المنخفضة المتطايرة أن المساحات جذابة بصريًا مع المساهمة في بيئات أكثر صحة.",
        listItems: [
          "المواد المعاد تدويرها تقلل النفايات مع إضافة لمسات فنية",
          "المنسوجات المبتكرة مثل القطن العضوي تقلل البصمة البيئية",
          "أرضيات الفلين توفر عزلًا صوتيًا وبديلاً صديقًا للبيئة",
        ],
        fourthParagraph:
          "عجائب إعادة التدوير: تحويل العناصر المهملة إلى نقاط محورية مذهلة يعزز الإبداع. التصميم الشمولي: خذ بعين الاعتبار خالص لرحلتك في التصميم الداخلي المستدام حيث يلتقي الجمال بالمسؤولية.",
      },
    },
  },
  {
    slug: "effective-stakeholder-communication-in-project-management",
    tags: [
      { en: "Management", ar: "إدارة" },
      { en: "Communication", ar: "تواصل" },
    ],
    title: {
      en: "Effective Stakeholder Communication in Project Management",
      ar: "التواصل الفعال مع أصحاب المصلحة في إدارة المشاريع",
    },
    excerpt: {
      en: "In the intricate tapestry of project management, effective communication with stakeholders stands as a linchpin for success...",
      ar: "في النسيج المعقد لإدارة المشاريع، يعد التواصل الفعال مع أصحاب المصلحة بمثابة العمود الفقري للنجاح...",
    },
    authorName: { en: "Michael Brown", ar: "مايكل براون" },
    cover: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    date: "2024-09-03",
    body: {
      en: {
        subtitle: "Strategies that shape projects to exceed expectations",
        paragraphs: [
          "In the intricate tapestry of project management, effective communication with stakeholders stands as a linchpin for success. Khales understands that transparency throughout the project lifecycle is paramount.",
          "Our commitment to effective stakeholder communication is ingrained in every project we undertake, creating a management ecosystem where communication drives success.",
        ],
        quote:
          "Our team looks forward to creating a project management ecosystem where strategic communication is the driving force behind successful outcomes.",
        paragraphAfterQuote: "The next project will be with you, guided by clear, consistent communication that meets and exceeds expectations.",
        sectionTitle: "Key Communication Strategies",
        thirdParagraph:
          "At Khales, we implement proven strategies that ensure project success through effective stakeholder engagement:",
        listItems: [
          "Tailored Communication Plans for different stakeholder groups",
          "Establishing Clear Project Objectives from the outset",
          "Consistent and Timely Updates throughout the project lifecycle",
        ],
        fourthParagraph:
          "Additional approaches include: Utilizing Project Management Software, Proactive Issue Resolution, Engaging Stakeholders in Decision-Making, and Post-Project Evaluation to refine future communications.",
      },
      ar: {
        subtitle: "استراتيجيات تشكل المشاريع لتجاوز التوقعات",
        paragraphs: [
          "في النسيج المعقد لإدارة المشاريع، يعد التواصل الفعال مع أصحاب المصلحة بمثابة العمود الفقري للنجاح. يدرك خالص أن الشفافية طوال دورة حياة المشروع أمر بالغ الأهمية.",
          "التزامنا بالتواصل الفعال مع أصحاب المصلحة متأصل في كل مشروع نقوم به، مما يخلق نظامًا بيئيًا للإدارة حيث يكون التواصل هو المحرك للنجاح.",
        ],
        quote:
          "يتطلع فريقنا إلى إنشاء نظام بيئي لإدارة المشروع حيث يكون التواصل الاستراتيجي هو القوة الدافعة وراء النتائج الناجحة.",
        paragraphAfterQuote: "سيكون المشروع التالي معك، بتوجيه من اتصال واضح ومتسق يلبي التوقعات ويتجاوزها.",
        sectionTitle: "استراتيجيات التواصل الرئيسية",
        thirdParagraph:
          "في خالص، ننفذ استراتيجيات مثبتة تضمن نجاح المشروع من خلال إشراك أصحاب المصلحة الفعال:",
        listItems: [
          "خطط اتصال مخصصة لمجموعات أصحاب المصلحة المختلفة",
          "تحديد أهداف مشروع واضحة من البداية",
          "تحديثات متسقة وفي الوقت المناسب طوال دورة حياة المشروع",
        ],
        fourthParagraph:
          "تشمل الأساليب الإضافية: استخدام برامج إدارة المشاريع، حل المشكلات الاستباقي، إشراك أصحاب المصلحة في صنع القرار، وتقييم ما بعد المشروع لصقل الاتصالات المستقبلية.",
      },
    },
  },
  {
    slug: "achieving-balance-between-aesthetics-and-functionality-in-interior-design",
    tags: [
      { en: "Interior", ar: "داخلي" },
      { en: "Design", ar: "تصميم" },
    ],
    title: {
      en: "Achieving Balance Between Aesthetics and Functionality in Interior Design",
      ar: "تحقيق التوازن بين الجماليات والوظيفة في التصميم الداخلي",
    },
    excerpt: {
      en: "In the realm of interior design, striking the delicate balance between aesthetics and functionality is an art form...",
      ar: "في عالم التصميم الداخلي، يعد تحقيق التوازن الدقيق بين الجماليات والوظائف شكلاً من أشكال الفن...",
    },
    authorName: { en: "Emily Davis", ar: "إيميلي ديفيس" },
    cover: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    date: "2024-09-18",
    body: {
      en: {
        subtitle: "Strategies that define harmonious equilibrium",
        paragraphs: [
          "In the realm of interior design, striking the delicate balance between aesthetics and functionality is an art form. Explore the strategies with Khales that define this harmonious equilibrium.",
          "The Intersection of Form and Function: Recognizing that a well-designed space marries form and function. Each element serves a dual purpose - enhancing visual appeal while meeting practical needs.",
        ],
        quote:
          "Khales Project Management strives for a synthesis of aesthetics and functionality, creating spaces that resonate with beauty and purpose.",
        paragraphAfterQuote: "Join our pursuit of harmonious design where every element serves a purpose, and every purpose is infused with elegance.",
        sectionTitle: "Principles of Balanced Design",
        thirdParagraph:
          "Tailored Design Solutions: Rejecting one-size-fits-all approaches. Crafting solutions to unique needs ensures aesthetic choices complement required functionality.",
        listItems: [
          "Optimizing Layouts for seamless flow and efficient space use",
          "Incorporating Smart Storage Solutions for organization",
          "Creating versatile spaces that adapt to evolving needs",
        ],
        fourthParagraph:
          "At Khales, we believe in spaces that are as practical as they are beautiful. Our designs integrate smart solutions that maintain visual appeal while serving real-world needs for daily living.",
      },
      ar: {
        subtitle: "استراتيجيات تحدد التوازن المتناغم",
        paragraphs: [
          "في عالم التصميم الداخلي، يعد تحقيق التوازن الدقيق بين الجماليات والوظائف شكلاً من أشكال الفن. استكشف الاستراتيجيات مع خالص التي تحدد هذا التوازن المتناغم.",
          "تقاطع الشكل والوظيفة: إدراك أن المساحة المصممة جيدًا تجمع بين الشكل والوظيفة. يخدم كل عنصر غرضًا مزدوجًا - تعزيز الجاذبية البصرية مع تلبية الاحتياجات العملية.",
        ],
        quote:
          "تسعى شركة خالص لإدارة المشاريع جاهدة إلى الجمع بين الجماليات والوظائف، وخلق مساحات تتناسب مع الجمال والغرض.",
        paragraphAfterQuote: "كن جزءًا من سعينا وراء التصميم المتناغم حيث يخدم كل عنصر غرضًا، وكل غرض مملوء بالأناقة.",
        sectionTitle: "مبادئ التصميم المتوازن",
        thirdParagraph:
          "حلول التصميم المخصصة: رفض النهج الواحد الذي يناسب الجميع. تضمن صياغة الحلول للاحتياجات الفريدة أن الخيارات الجمالية تكمل الوظائف المطلوبة.",
        listItems: [
          "تحسين التخطيطات لتدفق سهل واستخدام فعال للمساحة",
          "دمج حلول التخزين الذكية للتنظيم",
          "إنشاء مساحات متعددة الاستخدامات تتكيف مع الاحتياجات المتطورة",
        ],
        fourthParagraph:
          "في خالص، نؤمن بالمساحات العملية والجميلة على حد سواء. تكامل تصاميمنا حلول ذكية تحافظ على الجاذبية البصرية مع خدمة احتياجات العالم الحقيقي للحياة اليومية.",
      },
    },
  },
  {
    slug: "sustainable-architecture-practices",
    tags: [
      { en: "Architecture", ar: "عمارة" },
      { en: "Sustainability", ar: "استدامة" },
    ],
    title: { en: "Sustainable Architecture Practices", ar: "ممارسات الهندسة المعمارية المستدامة" },
    excerpt: {
      en: "In the contemporary era, with increasing global focus on environmental sustainability...",
      ar: "في عصر يحتل فيه الوعي البيئي مركز الصدارة، ظهرت الهندسة المعمارية المستدامة كمبدأ توجيهي...",
    },
    authorName: { en: "David Wilson", ar: "ديفيد ويلسون" },
    cover: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=80",
    date: "2024-10-02",
    body: {
      en: {
        subtitle: "Building a greener tomorrow through responsible design",
        paragraphs: [
          "In the contemporary era, with increasing global focus on environmental sustainability, sustainable architecture has evolved into a pivotal force. At Khales, our dedication to weaving sustainability into every aspect of design is unwavering.",
          "Passive Design Strategies represent the bedrock of our sustainable ethos. These maximize natural resources like sunlight and ventilation, optimizing comfort while minimizing energy use.",
        ],
        quote: "As we look towards the future, Khales invites you to join our journey towards sustainable architecture.",
        paragraphAfterQuote: "Every project is not just a testament to architectural excellence but a declaration to build a greener, more sustainable tomorrow.",
        sectionTitle: "Core Sustainable Practices",
        thirdParagraph:
          "Green Building Materials: We meticulously select materials like recycled steel and reclaimed wood to minimize environmental impact.",
        listItems: [
          "Energy-Efficient Systems with solar panels and smart management",
          "Water Conservation through rainwater harvesting",
          "Biodiverse Landscaping with native plants and green roofs",
        ],
        fourthParagraph:
          "Waste Reduction and Recycling: We adopt circular approaches to minimize waste. Life Cycle Assessments evaluate environmental impact from conception to demolition. Combined with Agile Project Management principles, we ensure adaptive planning and efficient resource use.",
      },
      ar: {
        subtitle: "بناء غد أكثر اخضرارًا من خلال التصميم المسؤول",
        paragraphs: [
          "في العصر المعاصر، مع زيادة التركيز العالمي على الاستدامة البيئية، تطورت الهندسة المعمارية المستدامة إلى قوة محورية. في خالص، التزامنا بنسج الاستدامة في كل جانب من جوانب التصميم ثابت.",
          "استراتيجيات التصميم السلبي: تمثل أساس نهجنا المستدام. تعمل هذه على زيادة الموارد الطبيعية مثل ضوء الشمس والتهوية إلى الحد الأقصى، وتحسين الراحة مع تقليل استخدام الطاقة.",
        ],
        quote: "بينما نتطلع إلى المستقبل، تدعوكم خالص للانضمام إلى رحلتنا نحو الهندسة المعمارية المستدامة.",
        paragraphAfterQuote: "كل مشروع ليس مجرد شهادة على التميز المعماري ولكن إعلان لبناء غد أكثر اخضرارًا واستدامة.",
        sectionTitle: "الممارسات المستدامة الأساسية",
        thirdParagraph:
          "مواد البناء الخضراء: نختار بعناية مواد مثل الفولاذ المعاد تدويره والخشب المستصلح لتقليل التأثير البيئي.",
        listItems: [
          "أنظمة موفرة للطاقة مع الألواح الشمسية والإدارة الذكية",
          "الحفاظ على المياه من خلال تجميع مياه الأمطار",
          "المناظر الطبيعية المتنوعة بيولوجيًا مع النباتات المحلية والأسطح الخضراء",
        ],
        fourthParagraph:
          "الحد من النفايات وإعادة التدوير: نتبنى نهجًا دائريًا لتقليل النفايات. تقييمات دورة الحياة تقيم التأثير البيئي من التصور إلى الهدم. جنبًا إلى جنب مع مبادئ إدارة المشاريع الرشيقة، نضمن التخطيط التكيفي والاستخدام الفعال للموارد.",
      },
    },
  },
  {
    slug: "the-importance-of-agile-project-management",
    tags: [
      { en: "Management", ar: "إدارة" },
      { en: "Agile", ar: "مرونة" },
    ],
    title: { en: "The Importance of Agile Project Management", ar: "أهمية إدارة المشاريع الرشيقة" },
    excerpt: {
      en: "In the fast-paced world of construction, agility isn't just a desirable trait; it's a game-changer...",
      ar: "في عالم البناء سريع الخطى، لا تعد خفة الحركة مجرد سمة مرغوبة؛ إنها تغير قواعد اللعبة...",
    },
    authorName: { en: "Jessica Lee", ar: "جيسيكا لي" },
    cover: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    date: "2024-10-17",
    body: {
      en: {
        subtitle: "Building with adaptability and excellence",
        paragraphs: [
          "In the fast-paced world of construction, agility isn't just desirable; it's a game-changer. At Khales, we recognize Agile Project Management's paramount importance in the construction industry.",
          "Adaptive Planning: Construction projects are inherently dynamic. We embrace Agile principles to facilitate planning that evolves with changing requirements and challenges.",
        ],
        quote: "As we navigate the construction landscape, Agile Project Management emerges as a cornerstone for success.",
        paragraphAfterQuote: "At Khales Project Management, we don't just build structures; we build with agility, adaptability, and excellence.",
        sectionTitle: "Agile Principles in Action",
        thirdParagraph:
          "Enhancing Collaboration: Regular team meetings and open communication ensure all stakeholders are aligned, fostering transparency and teamwork.",
        listItems: [
          "Rapid Response to changes and client feedback",
          "Iterative Development for continuous improvement",
          "Efficient Resource Utilization prioritizing value",
        ],
        fourthParagraph:
          "Risk Mitigation: We identify potential issues early. Client-Centric Approach: Regular client involvement ensures results align with vision. Continuous Monitoring enables learning and optimization for future projects.",
      },
      ar: {
        subtitle: "البناء بالقدرة على التكيف والتميز",
        paragraphs: [
          "في عالم البناء سريع الخطى، لا تعد خفة الحركة مرغوبة فقط؛ إنها تغير قواعد اللعبة. في خالص، ندرك الأهمية القصوى لإدارة المشاريع الرشيقة في صناعة البناء والتشييد.",
          "التخطيط التكيفي: مشاريع البناء ديناميكية بطبيعتها. نحن نتبنى مبادئ Agile لتسهيل التخطيط الذي يتطور مع المتطلبات والتحديات المتغيرة.",
        ],
        quote: "بينما نتنقل في مشهد البناء، تظهر إدارة المشاريع الرشيقة كحجر الزاوية للنجاح.",
        paragraphAfterQuote: "في خالص لإدارة المشاريع، لا نبني الهياكل فحسب؛ نحن نبني بخفة الحركة والقدرة على التكيف والتميز.",
        sectionTitle: "مبادئ الرشاقة في العمل",
        thirdParagraph:
          "تعزيز التعاون: تضمن اجتماعات الفريق المنتظمة والاتصال المفتوح توافق جميع أصحاب المصلحة، وتعزيز الشفافية والعمل الجماعي.",
        listItems: [
          "الاستجابة السريعة للتغييرات وتعليقات العملاء",
          "التطوير التكراري للتحسين المستمر",
          "الاستخدام الفعال للموارد مع إعطاء الأولوية للقيمة",
        ],
        fourthParagraph:
          "تخفيف المخاطر: نحدد المشكلات المحتملة مبكرًا. نهج يركز على العميل: تضمن المشاركة المنتظمة للعملاء أن النتائج تتماشى مع الرؤية. تمكن المراقبة المستمرة من التعلم والتحسين للمشاريع المستقبلية.",
      },
    },
  },
  {
    slug: "ai-on-the-job-site-predictive-tech-construction-risk",
    tags: [
      { en: "Technology", ar: "تكنولوجيا" },
      { en: "Safety", ar: "سلامة" },
    ],
    title: {
      en: "AI on the Job Site: How Predictive Tech Is Reducing Construction Risk",
      ar: "الذكاء الاصطناعي في مواقع العمل: كيف تقلل التقنيات التنبؤية مخاطر البناء",
    },
    excerpt: {
      en: "Smart cameras, digital twins and talking sensors are rewriting the site-safety rulebook.",
      ar: "كاميرات ذكية، توائم رقمية، ومستشعرات ناطقة تعيد صياغة قواعد السلامة في المواقع.",
    },
    authorName: { en: "Tech Team", ar: "فريق التكنولوجيا" },
    // The real Khales-next cover for this post (an ibb.co-hosted image) no
    // longer resolves to anything but a tiny placeholder graphic - ibb.co
    // appears to have lost the original file. Using a stock photo instead,
    // consistent with the other posts missing real covers.
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    date: "2024-11-05",
    body: {
      en: {
        subtitle: "Why Yesterday's Checks Aren't Enough",
        paragraphs: [
          "Late deliveries, surprise breakdowns and on-site accidents still drain billions of dirhams from Gulf projects each year. Traditional inspections catch many problems only after concrete is poured or—worse—someone gets hurt.",
          "Artificial intelligence flips the timeline. By turning real-time data into early warnings, it allows crews to fix issues before they threaten the programme or the safety record.",
        ],
        quote: "Tech that protects workers also protects the bottom line.",
        paragraphAfterQuote:
          "Projects that roll out even one of these AI tools enjoy tighter budgets, smoother audits and friendlier insurance premiums. Lower incident rates also boost a contractor's pre-qualification score—pure gold when bidding on the next mega-development.",
        sectionTitle: "Three Predictive Tools Making the Difference",
        thirdParagraph: "These AI-powered solutions are transforming construction site management:",
        listItems: [
          "Computer-vision safety nets: High-res cameras detect risks like missing helmets or unsafe ladder angles, reducing lost-time injuries by ~25%",
          "Digital schedule twins: Living 3D models combining BIM with weather forecasts and delivery trackers that flag conflicts weeks before they appear on Gantt charts",
          "Sensor-based asset health: IoT tags monitor equipment health, cutting downtime by ~33% through predictive maintenance",
        ],
        fourthParagraph:
          "Voice-controlled site dashboards, drone-based progress scans and AI-generated method statements are already in pilot use around the GCC. The message is clear: data-driven sites are no longer futuristic; they are becoming the minimum standard for premium construction. Khales Project Management embeds AI vision, schedule twins and sensor analytics into every project plan—helping you deliver on time, on budget and without surprises.",
      },
      ar: {
        subtitle: "لماذا لم تعد عمليات الفحص التقليدية كافية اليوم؟",
        paragraphs: [
          "لا تزال التأخيرات في التسليم، والأعطال المفاجئة، والحوادث في مواقع العمل تستنزف مليارات الدراهم من المشاريع الخليجية كل عام. وعادةً ما تكتشف عمليات الفحص التقليدية العديد من المشاكل فقط بعد صب الخرسانة أو - ما هو أسوأ - بعد وقوع إصابات.",
          "هنا يأتي دور الذكاء الاصطناعي ليقلب هذا المفهوم رأسًا على عقب. فمن خلال تحويل البيانات الفورية إلى تحذيرات مبكرة، يُمكّن الذكاء الاصطناعي فرق العمل من إصلاح المشكلات قبل أن تهدد الجدول الزمني للمشروع أو سجل السلامة الخاص به.",
        ],
        quote: "التكنولوجيا التي تحمي العمال تحمي أيضًا الأرباح النهائية.",
        paragraphAfterQuote:
          "تتمتع المشاريع التي تطبق حتى واحدة من هذه الأدوات القائمة على الذكاء الاصطناعي في البناء في الإمارات بميزانيات أكثر إحكامًا، ومراجعات حسابات أكثر سلاسة، وأقساط تأمين أكثر ودية. كما تؤدي معدلات الحوادث المنخفضة إلى تعزيز نقاط التأهل المسبق للمقاول - وهو ما يمثل 'ذهبًا خالصًا' عند التقدم بعروض لمشاريع التطوير الضخمة القادمة.",
        sectionTitle: "ثلاث أدوات تنبؤية تُحدث الفارق في مجال البناء في الإمارات",
        thirdParagraph: "هذه الحلول المدعومة بالذكاء الاصطناعي تقوم بتحويل إدارة مواقع البناء:",
        listItems: [
          "شبكات سلامة الرؤية الحاسوبية: تكشف الكاميرات عالية الدقة عن مخاطر مثل الخوذات المفقودة أو زوايا السلالم غير الآمنة، مما يقلل الإصابات المفقودة للوقت بنحو 25٪",
          "التوائم الرقمية للجدول الزمني: نماذج ثلاثية الأبعاد حية تجمع بين نمذجة معلومات البناء مع توقعات الطقس ومتتبعات التسليم تكتشف التعارضات قبل أسابيع من ظهورها في مخططات غانت",
          "مراقبة صحة الأصول القائمة على أجهزة الاستشعار: تراقب بطاقات إنترنت الأشياء صحة المعدات، مما يقلل وقت التوقف بنحو 33٪ من خلال الصيانة التنبؤية",
        ],
        fourthParagraph:
          "أصبحت لوحات معلومات الموقع التي تعمل بالتحكم الصوتي، وعمليات مسح التقدم القائمة على الطائرات بدون طيار، وبيانات طرق العمل التي يتم إنشاؤها بواسطة الذكاء الاصطناعي، قيد الاستخدام التجريبي بالفعل في جميع أنحاء دول مجلس التعاون الخليجي. الرسالة واضحة: المواقع القائمة على البيانات لم تعد مجرد رؤى مستقبلية؛ بل أصبحت المعيار الأدنى للبناء المتميز. خالص لإدارة المشاريع تدمج رؤية الذكاء الاصطناعي، والتوائم الرقمية للجداول الزمنية، وتحليلات أجهزة الاستشعار في كل خطة مشروع - لمساعدتك على التسليم في الوقت المحدد، وفي حدود الميزانية، ودون مفاجآت.",
      },
    },
  },
  {
    slug: "the-future-of-smart-buildings-in-the-middle-east",
    tags: [
      { en: "Innovation", ar: "الابتكار" },
      { en: "Technology", ar: "التكنولوجيا" },
    ],
    title: { en: "The Future of Smart Buildings in the Middle East", ar: "مستقبل المباني الذكية في الشرق الأوسط" },
    excerpt: {
      en: "Discover how smart building technologies are revolutionizing construction and property management across the Middle East...",
      ar: "اكتشف كيف تقوم تقنيات المباني الذكية بإحداث ثورة في البناء وإدارة الممتلكات في جميع أنحاء الشرق الأوسط...",
    },
    authorName: { en: "Innovation Team", ar: "فريق الابتكار" },
    cover: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80",
    date: "2026-02-10",
    body: {
      en: {
        subtitle: "Building intelligence into the region's future infrastructure",
        paragraphs: [
          "The Middle East is at the forefront of adopting cutting-edge smart building technologies. From energy management systems to integrated security solutions, intelligent buildings are reshaping how we construct and manage properties.",
          "Smart buildings represent more than just technological advancement; they embody a commitment to sustainability, efficiency, and enhanced occupant experience. Khales Project Management is proud to be leading this transformation.",
        ],
        quote: "Smart buildings are not the future—they are the present and the standard by which excellence is measured.",
        paragraphAfterQuote:
          "As we move forward, Khales continues to pioneer smart building solutions that combine innovation with practical, measurable benefits for developers and occupants alike.",
        sectionTitle: "Key Smart Building Technologies",
        thirdParagraph:
          "From IoT sensors to AI-driven systems, modern buildings are becoming increasingly intelligent and responsive to user needs.",
        listItems: [
          "Integrated energy management systems reducing consumption by up to 40%",
          "Smart climate control optimizing comfort and efficiency",
          "Advanced security and access control systems with real-time monitoring",
        ],
        fourthParagraph:
          "The implementation of smart technologies leads to significant cost savings, improved operational efficiency, and enhanced safety. Khales integrates these innovations into every project, ensuring our developments are not just built for today, but optimized for tomorrow.",
      },
      ar: {
        subtitle: "بناء الذكاء في البنية التحتية المستقبلية للمنطقة",
        paragraphs: [
          "يقف الشرق الأوسط في طليعة اعتماد تقنيات المباني الذكية المتطورة. من أنظمة إدارة الطاقة إلى حلول الأمان المتكاملة، تعيد المباني الذكية تشكيل طريقة بنائنا وإدارتنا للممتلكات.",
          "تمثل المباني الذكية أكثر من مجرد تقدم تكنولوجي؛ فهي تجسد التزاماً بالاستدامة والكفاءة وتحسين تجربة المستخدمين. يفخر خالص لإدارة المشاريع بقيادة هذا التحول.",
        ],
        quote: "المباني الذكية ليست المستقبل - إنها الحاضر والمعيار الذي يقاس به التميز.",
        paragraphAfterQuote:
          "وبينما نتقدم للأمام، يستمر خالص في رائدة حلول المباني الذكية التي تجمع بين الابتكار والفوائد العملية القابلة للقياس للمطورين والمستخدمين على حد سواء.",
        sectionTitle: "تقنيات المباني الذكية الرئيسية",
        thirdParagraph:
          "من مستشعرات إنترنت الأشياء إلى الأنظمة المدعومة بالذكاء الاصطناعي، أصبحت المباني الحديثة أكثر ذكاءً واستجابة لاحتياجات المستخدمين.",
        listItems: [
          "أنظمة إدارة الطاقة المتكاملة التي تقلل الاستهلاك بنسبة تصل إلى 40٪",
          "التحكم المناخي الذكي لتحسين الراحة والكفاءة",
          "أنظمة الأمان والتحكم في الوصول المتقدمة مع المراقبة الفورية",
        ],
        fourthParagraph:
          "يؤدي تطبيق التقنيات الذكية إلى توفيرات تكاليف كبيرة وتحسين الكفاءة التشغيلية وتعزيز السلامة. تدمج خالص هذه الابتكارات في كل مشروع، مما يضمن أن مشاريعنا لا تُبنى ليوم واحد، بل تُحسَّن للغد.",
      },
    },
  },
  {
    slug: "the-pillars-of-history-classic-architectural-orders",
    tags: [
      { en: "Architecture", ar: "العمارة" },
      { en: "History", ar: "التاريخ" },
    ],
    title: {
      en: "The Pillars of History: A Guide to the Classic Architectural Orders",
      ar: "أعمدة التاريخ: دليل إلى الطرازات المعمارية الكلاسيكية",
    },
    excerpt: {
      en: "Discover the five classic architectural orders — Doric, Ionic, Corinthian, Tuscan, and Composite — and learn how to identify these timeless columns in buildings around the world.",
      ar: "اكتشف الطرازات المعمارية الكلاسيكية الخمسة — الدوري، والأيوني، والكورنثي، والتوسكاني، والمركب — وتعلّم كيف تتعرف على هذه الأعمدة الخالدة في المباني حول العالم.",
    },
    authorName: { en: "Khales Team", ar: "فريق خالص" },
    // Self-hosted: this one's real image loaded fine, but ibb.co's own
    // delivery was too slow/unreliable for Next's image optimizer (see the
    // AI post above for the other failure mode - a dead link entirely).
    cover: "/blog/classical-architectural-orders.png",
    date: "2026-06-11",
    body: {
      en: {
        subtitle: "The Pillars of History",
        paragraphs: [
          "When we admire the grand columns of a courthouse, a museum, or a centuries-old temple, we are often gazing at one of humanity's most enduring design legacies — classical architecture. Rooted in ancient Greece and refined by Rome, this tradition gave us the five architectural orders: Doric, Ionic, Corinthian, Tuscan, and Composite.",
          "But these are not just decorative styles. Each order is a complete system of proportions, from the base of the column to the decorated entablature above. Understanding them is a key to reading the language of classical buildings.",
        ],
        quote: "Architecture is frozen music — and the classical orders are its most enduring melody.",
        paragraphAfterQuote:
          "Do you have a favorite building in your city that uses these classical styles? Look closely next time you pass a government building, a museum, or even an old bank — you might be surprised by what you find.",
        sectionTitle: "The Five Classical Orders",
        thirdParagraph:
          "The ancient Greeks developed three fundamental orders, each with its own distinct character and proportional rules. The Romans later added two more, rounding out the classical vocabulary that architects have drawn on for over two thousand years.",
        listItems: [
          "Doric — The oldest and simplest order, recognized by its sturdy columns with no base and a plain, cushion-like capital. It projects strength and solemnity. Famous example: the Parthenon in Athens.",
          "Ionic — More elegant and slender than Doric, the Ionic order features a distinctive scroll-shaped capital called a volute. Famous example: the Temple of Athena Nike.",
          "Corinthian — The most elaborate Greek order, adorned with intricate acanthus leaf carvings on the capital and a slender, fluted shaft. Famous example: the Choragic Monument of Lysicrates.",
          "Tuscan — A Roman invention, essentially a simplified Doric with a smooth shaft and minimal decoration. It conveys rustic simplicity.",
          "Composite — Also Roman, this order combines the volute scrolls of the Ionic with the acanthus leaves of the Corinthian, creating the most ornate capital of all.",
        ],
        fourthParagraph:
          "A quick guide to identifying the orders at a glance: a flat, undecorated top means Doric or Tuscan; scrolls on the capital point to Ionic; leafy carvings suggest Corinthian; and a combination of scrolls and leaves means Composite. Once you know these cues, you will find yourself spotting classical orders everywhere — from grand public buildings to the columns on a neighborhood front porch.",
      },
      ar: {
        subtitle: "أعمدة التاريخ",
        paragraphs: [
          "عندما نُعجب بالأعمدة الشامخة في مبنى حكومي أو متحف أو معبد عريق، فإننا غالباً ما نتأمل أحد أعرق إرث التصميم الإنساني — العمارة الكلاسيكية. هذا التراث الذي ولد في اليونان القديمة واكتمل على يد الرومان، أعطانا الطرازات المعمارية الخمسة: الدوري، والأيوني، والكورنثي، والتوسكاني، والمركب.",
          "لكن هذه الطرازات ليست مجرد أساليب زخرفية؛ بل كل طراز منها نظام متكامل من النسب، يمتد من قاعدة العمود إلى الزخارف المرتفعة فوقه. إن فهم هذه الطرازات هو مفتاح قراءة لغة المباني الكلاسيكية.",
        ],
        quote: "العمارة موسيقى متجمدة — والطرازات الكلاسيكية هي أعذب ألحانها على مر العصور.",
        paragraphAfterQuote:
          "هل يوجد مبنى مفضل لديك في مدينتك يستخدم هذه الأساليب الكلاسيكية؟ ألقِ نظرة فاحصة في المرة القادمة التي تمر فيها بمبنى حكومي أو متحف أو حتى مصرف قديم — قد تُفاجأ بما ستجده.",
        sectionTitle: "الطرازات الكلاسيكية الخمسة",
        thirdParagraph:
          "طوّر الإغريق القدماء ثلاثة طرازات أساسية، لكل منها طابعه المميز وقواعده النسبية الخاصة. وقد أضاف الرومان لاحقاً طرازين آخرين، مكتملين بذلك المفردات الكلاسيكية التي استلهم منها المعماريون إبداعاتهم لأكثر من ألفي عام.",
        listItems: [
          "الدوري — أقدم الطرازات وأبسطها، يتميز بأعمدة متينة بلا قاعدة وتاج بسيط على شكل وسادة. يعكس القوة والرصانة. مثال شهير: البارثينون في أثينا.",
          "الأيوني — أكثر أناقة ورشاقة من الدوري، يتميز بتاج مزين بلفائف حلزونية تُسمى الفولوت. مثال شهير: معبد أثينا نيكي.",
          "الكورنثي — أكثر الطرازات الإغريقية تفصيلاً، يتزين بنقوش أوراق الأكانثوس المعقدة على التاج، مع عمود رفيع مجدول. مثال شهير: نصب ليسيكراتيس الخطابي.",
          "التوسكاني — طراز روماني في جوهره، وهو شكل مبسط من الدوري بعمود أملس وحد أدنى من الزخارف. يوحي بالبساطة الريفية.",
          "المركب — روماني أيضاً، يجمع بين لفائف الأيوني وأوراق الكورنثي، ليُنتج أكثر التيجان زخرفة وتعقيداً.",
        ],
        fourthParagraph:
          "دليل سريع لتمييز الطرازات للوهلة الأولى: القمة المستوية غير المزخرفة تعني الدوري أو التوسكاني؛ اللفائف على التاج تشير إلى الأيوني؛ النقوش الورقية تقترح الكورنثي؛ أما الجمع بين اللفائف والأوراق فيعني المركب. حالما تعرف هذه الإشارات، ستجد نفسك تكتشف الطرازات الكلاسيكية في كل مكان — من المباني العامة الكبرى إلى الأعمدة المزينة لبيت في حي قريب.",
      },
    },
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAdjacentBlogPost(slug: string) {
  const index = blogPosts.findIndex((post) => post.slug === slug);
  if (index === -1) return undefined;
  return blogPosts[(index + 1) % blogPosts.length];
}

export function estimateReadMinutes(post: BlogPost, lang: "en" | "ar") {
  const body = post.body[lang];
  const words = [
    body.subtitle,
    ...body.paragraphs,
    body.quote,
    body.paragraphAfterQuote,
    body.sectionTitle,
    body.thirdParagraph,
    ...body.listItems,
    body.fourthParagraph,
  ]
    .join(" ")
    .split(/\s+/).length;
  return Math.max(2, Math.round(words / 180));
}
