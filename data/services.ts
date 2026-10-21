import type { Locale } from "@/i18n-config";

// Khales service content. Interior Design, Landscape, Supervision, Owner's
// Representative and Planning keep the copy ported from the old Khales-next
// dictionaries; Design, Tendering, Contracts Review and Cost Calculation were
// written for the current service lineup.
//
// Cover/gallery images are self-hosted re-encoded JPEGs under
// /public/services (the originals lived on i.ibb.co, which made Next's image
// optimizer time out). Services without their own photography yet borrow a
// folder from the closest existing service.

export type ServiceProcessStep = { title: string; description: string };
export type ServiceFaqItem = { question: string; answer: string };

export type Service = {
  id: number;
  slug: string;
  cover: string;
  gallery: string[];
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  longDescription: string;
  longDescriptionAr: string;
  keyFeatures: string[];
  keyFeaturesAr: string[];
  process: ServiceProcessStep[];
  processAr: ServiceProcessStep[];
  faqs: ServiceFaqItem[];
  faqsAr: ServiceFaqItem[];
  metaTitle: string;
  metaTitleAr: string;
  metaDescription: string;
  metaDescriptionAr: string;
};

export const services: Service[] = [
  {
    id: 1,
    slug: "design",
    cover: "/services/engineering-design/01.jpg",
    gallery: [
      "/services/engineering-design/01.jpg",
      "/services/engineering-design/02.jpg",
      "/services/engineering-design/03.jpg",
    ],
    title: "Design",
    titleAr: "التصميم",
    description:
      "Architectural and engineering design that takes your project from first sketch to construction-ready drawings.",
    descriptionAr:
      "تصميم معماري وهندسي ينقل مشروعك من الفكرة الأولى إلى مخططات جاهزة للتنفيذ.",
    longDescription:
      "Good design starts with how you want to live or work, and ends with drawings a contractor can build without guesswork. Our design service covers the full journey: concept, architectural development, structural and MEP engineering, and the authority drawings needed to get your permit.\n\nArchitects and engineers work as one team from day one, so the building that looks right on paper is also the one that stands up, stays cool, and fits the budget. Whether it is a private villa, a residential building or a commercial project, you get one coordinated set of documents and one point of responsibility.",
    longDescriptionAr:
      "يبدأ التصميم الجيد بالطريقة التي تريد أن تعيش أو تعمل بها، وينتهي بمخططات يستطيع المقاول تنفيذها دون تخمين. تغطي خدمة التصميم لدينا الرحلة كاملة: الفكرة الأولية، والتطوير المعماري، والتصميم الإنشائي والكهروميكانيكي، ومخططات الجهات الحكومية اللازمة للحصول على رخصة البناء.\n\nيعمل المعماريون والمهندسون كفريق واحد منذ اليوم الأول، ليكون المبنى الجميل على الورق هو نفسه المبنى المتين والمريح والملتزم بالميزانية. سواء كانت فيلا خاصة أو مبنى سكنيًا أو مشروعًا تجاريًا، تحصل على مجموعة مستندات منسقة وجهة مسؤولة واحدة.",
    keyFeatures: [
      "Brief & Site Study",
      "Concept Design",
      "Design Development",
      "Structural & MEP Engineering",
      "Authority Approvals",
      "Issued for Construction Drawings",
    ],
    keyFeaturesAr: [
      "دراسة المتطلبات والموقع",
      "التصميم المبدئي",
      "تطوير التصميم",
      "التصميم الإنشائي والكهروميكانيكي",
      "موافقات الجهات الحكومية",
      "مخططات التنفيذ النهائية",
    ],
    process: [
      {
        title: "Brief & Site Study",
        description:
          "We learn how you want to use the building, review the plot, its regulations and orientation, and agree the budget the design has to respect.",
      },
      {
        title: "Concept Design",
        description:
          "We develop layout options, massing and a design direction, with 3D views so you can picture the project before committing.",
      },
      {
        title: "Design Development",
        description:
          "The chosen concept is refined into detailed plans, elevations and sections, with materials and key details resolved.",
      },
      {
        title: "Structural & MEP Engineering",
        description:
          "Our engineers produce the structural, electrical, plumbing and HVAC designs, coordinated with the architecture to avoid clashes on site.",
      },
      {
        title: "Authority Approvals",
        description:
          "We prepare and submit the permit drawings and follow them through the municipality and service authorities.",
      },
      {
        title: "Issued for Construction Drawings",
        description:
          "You receive a complete, coordinated drawing set ready for tendering and construction.",
      },
    ],
    processAr: [
      {
        title: "دراسة المتطلبات والموقع",
        description:
          "نتعرف على طريقة استخدامك للمبنى، وندرس قطعة الأرض واشتراطاتها واتجاهها، ونتفق على الميزانية التي يجب أن يلتزم بها التصميم.",
      },
      {
        title: "التصميم المبدئي",
        description:
          "نطوّر خيارات للتوزيع والكتلة واتجاهًا تصميميًا، مع مناظير ثلاثية الأبعاد لتتخيل المشروع قبل الالتزام به.",
      },
      {
        title: "تطوير التصميم",
        description:
          "نحوّل الفكرة المختارة إلى مساقط وواجهات وقطاعات تفصيلية، مع تحديد المواد والتفاصيل الرئيسية.",
      },
      {
        title: "التصميم الإنشائي والكهروميكانيكي",
        description:
          "يُعدّ مهندسونا التصاميم الإنشائية والكهربائية والصحية والتكييف بالتنسيق مع التصميم المعماري لتفادي التعارضات في الموقع.",
      },
      {
        title: "موافقات الجهات الحكومية",
        description:
          "نُعدّ مخططات الترخيص ونقدّمها ونتابعها مع البلدية وجهات الخدمات حتى اعتمادها.",
      },
      {
        title: "مخططات التنفيذ النهائية",
        description:
          "تستلم مجموعة مخططات كاملة ومنسقة، جاهزة للمناقصة والتنفيذ.",
      },
    ],
    faqs: [
      {
        question: "Do you design both villas and commercial buildings?",
        answer:
          "Yes. We design private villas, residential buildings, commercial and mixed-use projects, and industrial buildings such as warehouses.",
      },
      {
        question: "Is engineering included, or do I need a separate consultant?",
        answer:
          "Structural and MEP engineering are part of the service, so you get one coordinated set of drawings from one team.",
      },
      {
        question: "Can you design within a fixed budget?",
        answer:
          "Yes. We agree the budget at the brief stage and check the design against it at every step, with cost estimates available alongside.",
      },
      {
        question: "Do you handle the building permit?",
        answer:
          "Yes. We prepare the authority drawings and follow the submission through to approval.",
      },
    ],
    faqsAr: [
      {
        question: "هل تصممون الفلل والمباني التجارية معًا؟",
        answer:
          "نعم. نصمم الفلل الخاصة والمباني السكنية والمشاريع التجارية ومتعددة الاستخدامات، والمباني الصناعية مثل المستودعات.",
      },
      {
        question: "هل التصميم الهندسي مشمول، أم أحتاج إلى استشاري منفصل؟",
        answer:
          "التصميم الإنشائي والكهروميكانيكي جزء من الخدمة، لتحصل على مخططات منسقة من فريق واحد.",
      },
      {
        question: "هل يمكنكم التصميم ضمن ميزانية محددة؟",
        answer:
          "نعم. نتفق على الميزانية في مرحلة دراسة المتطلبات ونراجع التصميم مقابلها في كل مرحلة، مع إمكانية تقديم تقديرات للتكلفة.",
      },
      {
        question: "هل تتولون استخراج رخصة البناء؟",
        answer:
          "نعم. نُعدّ مخططات الجهات الحكومية ونتابع التقديم حتى الحصول على الموافقة.",
      },
    ],
    metaTitle: "Architectural & Engineering Design | Khales Group",
    metaTitleAr: "التصميم المعماري والهندسي | مجموعة خالص",
    metaDescription:
      "Architectural and engineering design for villas, residential and commercial projects in the UAE and the Gulf, from concept to approved, construction-ready drawings.",
    metaDescriptionAr:
      "تصميم معماري وهندسي للفلل والمشاريع السكنية والتجارية في الإمارات والخليج، من الفكرة الأولى إلى مخططات معتمدة وجاهزة للتنفيذ.",
  },
  {
    id: 2,
    slug: "interior-design",
    cover: "/services/interior-design/01.jpg",
    gallery: [
      "/services/interior-design/01.jpg",
      "/services/interior-design/02.jpg",
      "/services/interior-design/03.jpg",
    ],
    title: "Interior Design",
    titleAr: "التصميم الداخلي",
    description:
      "Shaping how people live and experience a space with functional and refined interiors.",
    descriptionAr:
      "تشكيل كيفية عيش الناس وتجربتهم للمساحة بتصميمات داخلية وظيفية ومصقولة.",
    longDescription:
      "Interior design at Khales is about more than selecting finishes; it's about shaping how people live, feel, and experience space. Our interior designers work closely with clients to create interiors that are functional, refined, and aligned with the architectural identity of the project.\n\nWe handle everything from spatial planning and mood concepts to material selection and technical drawings. Whether for a private villa, commercial space, or full development, we ensure the design reflects both the client's taste and the project's context, while staying practical, buildable, and regulation-ready.",
    longDescriptionAr:
      "التصميم الداخلي في خالص هو أكثر من مجرد اختيار التشطيبات؛ إنه يتعلق بتشكيل كيفية عيش الناس وشعورهم وتجربتهم للمساحة. يعمل مصممونا الداخليون عن كثب مع العملاء لإنشاء تصميمات داخلية وظيفية ومصقولة ومتوافقة مع الهوية المعمارية للمشروع.\n\nنتولى كل شيء من التخطيط المكاني ومفاهيم الأجواء إلى اختيار المواد والرسومات الفنية. سواء كان ذلك لفيلا خاصة أو مساحة تجارية أو مشروع تطوير كامل، فإننا نضمن أن التصميم يعكس ذوق العميل وسياق المشروع، مع الحفاظ على كونه عمليًا وقابلاً للبناء وجاهزًا للوائح.",
    keyFeatures: [
      "Client Brief & Lifestyle Understanding",
      "Moodboard & Concept Development",
      "Space Planning & Layout Optimization",
      "Material & Finish Selection",
      "Technical Drawings & Joinery Details",
      "Design Supervision",
    ],
    keyFeaturesAr: [
      "موجز العميل وفهم نمط الحياة",
      "لوحة الإلهام وتطوير المفهوم",
      "تخطيط المساحات وتحسين التوزيع",
      "اختيار المواد والتشطيبات",
      "المخططات الفنية وتفاصيل الأعمال الخشبية",
      "الإشراف على التصميم",
    ],
    process: [
      {
        title: "Client Brief & Lifestyle Understanding",
        description:
          "We begin by learning about your style, goals, and how each space will be used — function always comes first.",
      },
      {
        title: "Moodboard & Concept Development",
        description:
          "We translate your preferences into design direction — with curated references, material palettes, and layout studies.",
      },
      {
        title: "Space Planning & Layout Optimization",
        description:
          "We ensure flow, usability, and comfort by organizing space logically and in harmony with structure and light.",
      },
      {
        title: "Material & Finish Selection",
        description:
          "We help select the right materials, colors, textures, and finishes — balancing beauty, durability, and context.",
      },
      {
        title: "Technical Drawings & Joinery Details",
        description:
          "We produce detailed interior drawings (e.g., ceilings, elevations, joinery) ready for contractors and authority approvals.",
      },
      {
        title: "Design Supervision (Optional)",
        description:
          "We can also follow through with on-site visits, material submittal reviews, and built-work verification upon request.",
      },
    ],
    processAr: [
      {
        title: "موجز العميل وفهم نمط الحياة",
        description:
          "نبدأ بالتعرف على أسلوبك وأهدافك، وكيف سيتم استخدام كل مساحة — الوظيفة تأتي دائمًا في المقام الأول.",
      },
      {
        title: "لوحة الإلهام وتطوير المفهوم",
        description:
          "نترجم تفضيلاتك إلى توجه تصميمي، من خلال مراجع منسقة، ولوحات مواد، ودراسات للتوزيع.",
      },
      {
        title: "تخطيط المساحات وتحسين التوزيع",
        description:
          "نضمن الانسيابية وسهولة الاستخدام والراحة من خلال تنظيم المساحة بشكل منطقي ومتناغم مع الهيكل والإضاءة.",
      },
      {
        title: "اختيار المواد والتشطيبات",
        description:
          "نساعد في اختيار المواد والألوان والخامات والتشطيبات المناسبة، مع تحقيق التوازن بين الجمال والمتانة والسياق.",
      },
      {
        title: "المخططات الفنية وتفاصيل الأعمال الخشبية",
        description:
          "نُعدّ رسومات داخلية مفصلة (مثل الأسقف، الواجهات، الأعمال الخشبية) جاهزة للمقاولين وموافقات الجهات الحكومية.",
      },
      {
        title: "الإشراف على التصميم (اختياري)",
        description:
          "يمكننا أيضًا المتابعة من خلال زيارات ميدانية، ومراجعة تقديمات المواد، والتحقق من الأعمال المنفذة عند الطلب.",
      },
    ],
    faqs: [
      {
        question: "Do you work with existing architectural layouts or only your own?",
        answer:
          "We can design interiors for both — whether the architecture was done by Khales or by another firm.",
      },
      {
        question: "Can you help select furniture and decor too?",
        answer:
          "Yes. We can advise or fully curate furniture and accessory selections, especially if we are involved during the fit-out phase.",
      },
      {
        question: "Do you submit drawings for authority approval?",
        answer:
          "Yes. All technical drawings are prepared in line with UAE authority standards and submission formats.",
      },
      {
        question: "What kinds of interiors do you specialize in?",
        answer:
          "We design for private villas, apartments, offices, and select commercial spaces — always tailored to the project and client lifestyle.",
      },
    ],
    faqsAr: [
      {
        question: "هل تعملون على مخططات معمارية قائمة أم على تصاميمكم الخاصة فقط؟",
        answer:
          "يمكننا تصميم الديكور الداخلي لكليهما، سواء تم التصميم المعماري بواسطة شركة خالص أو شركة أخرى.",
      },
      {
        question: "هل يمكنكم المساعدة في اختيار الأثاث والديكور أيضًا؟",
        answer:
          "نعم. يمكننا تقديم المشورة أو تنسيق اختيارات الأثاث والإكسسوارات بالكامل، خاصة إذا كنا مشاركين في مرحلة التشطيب.",
      },
      {
        question: "هل تقدمون المخططات للحصول على موافقة الجهات الحكومية؟",
        answer:
          "نعم. يتم إعداد جميع المخططات الفنية بما يتماشى مع معايير الجهات الحكومية في الإمارات وصيغ التقديم المعتمدة.",
      },
      {
        question: "ما هي أنواع التصاميم الداخلية التي تتخصصون فيها؟",
        answer:
          "نصمم للفلل الخاصة، والشقق، والمكاتب، ومساحات تجارية مختارة، مع الحرص دائمًا على أن يكون التصميم مخصصًا للمشروع ونمط حياة العميل.",
      },
    ],
    metaTitle: "Luxury Interior Design Services Dubai | Khales Architecture & Design",
    metaTitleAr: "خدمات التصميم الداخلي الفاخر في دبي | شركة خالص للهندسة المعمارية",
    metaDescription:
      "Khales offers luxury interior design services in Dubai and UAE. We specialize in designing villas, offices, hotels, and commercial spaces with the highest standards of quality and creativity. Our team of professional designers transforms your vision into reality with attention to every detail.",
    metaDescriptionAr:
      "شركة خالص تقدم خدمات التصميم الداخلي الفاخر في دبي والإمارات. نحن متخصصون في تصميم الفلل، المكاتب، الفنادق، والمساحات التجارية بأعلى معايير الجودة والإبداع. فريقنا من المصممين المحترفين يحول رؤيتك إلى واقع ملموس مع الاهتمام بأدق التفاصيل.",
  },
  {
    id: 3,
    slug: "landscape-design",
    cover: "/services/landscape-design/01.jpg",
    gallery: [
      "/services/landscape-design/01.jpg",
      "/services/landscape-design/02.jpg",
      "/services/landscape-design/03.jpg",
    ],
    title: "Landscape Design",
    titleAr: "تصميم المناظر الطبيعية",
    description:
      "Designing elegant and functional outdoor spaces that balance nature with built features.",
    descriptionAr:
      "تصميم مساحات خارجية أنيقة وعملية توازن بين الطبيعة والعناصر المبنية.",
    longDescription:
      "At Khales, landscape design is not an afterthought; it's an essential part of the experience. We design outdoor spaces that are elegant, functional, and aligned with the architecture and environment around them.\n\nFrom gardens and entrances to terraces and pool decks, our landscape team balances natural elements with built features to enhance usability, flow, and visual character. Every detail, from plant selection to lighting and materials, is tailored to your climate, space, and personal vision.",
    longDescriptionAr:
      "في خالص، تصميم المناظر الطبيعية ليس فكرة ثانوية، بل هو جزء أساسي من التجربة. نحن نصمم مساحات خارجية أنيقة وعملية ومتوافقة مع الهندسة المعمارية والبيئة المحيطة بها.\n\nمن الحدائق والمداخل إلى التراسات وأسطح المسابح، يوازن فريق المناظر الطبيعية لدينا بين العناصر الطبيعية والميزات المبنية لتعزيز قابلية الاستخدام والانسيابية والطابع البصري. يتم تصميم كل التفاصيل، من اختيار النباتات إلى الإضاءة والمواد، لتناسب مناخك ومساحتك ورؤيتك الشخصية.",
    keyFeatures: [
      "Site Assessment & Briefing",
      "Concept Design & Functional Layout",
      "Planting Design & Material Selection",
      "Technical Drawings & Coordination",
      "Authority Submissions",
      "On-Site Supervision",
    ],
    keyFeaturesAr: [
      "تقييم الموقع وموجز المتطلبات",
      "تصميم المفهوم والتوزيع الوظيفي",
      "تصميم الزراعة واختيار المواد",
      "المخططات الفنية والتنسيق",
      "التقديم للجهات الحكومية",
      "الإشراف في الموقع",
    ],
    process: [
      {
        title: "Site Assessment & Briefing",
        description:
          "We evaluate your outdoor space in relation to your architecture, sun exposure, wind, access, and views.",
      },
      {
        title: "Concept Design & Functional Layout",
        description:
          "We define the purpose of each area — seating, pathways, greenery, water features — and arrange them into a cohesive, usable plan.",
      },
      {
        title: "Planting Design & Material Selection",
        description:
          "We select plants and finishes that are climate-appropriate, low-maintenance, and visually aligned with the property's identity.",
      },
      {
        title: "Technical Drawings & Coordination",
        description:
          "We prepare detailed landscape drawings for contractors, including levels, hardscape, planting, irrigation, and lighting.",
      },
      {
        title: "Authority Submissions (if applicable)",
        description:
          "We assist with municipality approvals if required — ensuring your landscape meets local guidelines.",
      },
      {
        title: "On-Site Supervision (Optional)",
        description:
          "We can support the implementation phase by reviewing shop drawings, material submittals, and site progress.",
      },
    ],
    processAr: [
      {
        title: "تقييم الموقع وموجز المتطلبات",
        description:
          "نقوم بتقييم مساحتك الخارجية وعلاقتها بالهيكل المعماري، مع الأخذ في الاعتبار التعرض للشمس والرياح وسهولة الوصول والمناظر.",
      },
      {
        title: "تصميم المفهوم والتوزيع الوظيفي",
        description:
          "نحدد الغرض من كل منطقة — أماكن الجلوس، الممرات، المساحات الخضراء، المسطحات المائية — ونرتبها في خطة متماسكة وقابلة للاستخدام.",
      },
      {
        title: "تصميم الزراعة واختيار المواد",
        description:
          "نختار النباتات والتشطيبات التي تتناسب مع المناخ، وتتطلب صيانة منخفضة، وتتماشى بصريًا مع هوية العقار.",
      },
      {
        title: "المخططات الفنية والتنسيق",
        description:
          "نُعدّ رسومات تفصيلية للمناظر الطبيعية للمقاولين، تشمل المناسيب، والعناصر الصلبة، والزراعة، والري، والإضاءة.",
      },
      {
        title: "التقديم للجهات الحكومية (إن وجد)",
        description:
          "نساعد في الحصول على موافقات البلدية إذا لزم الأمر، مما يضمن أن المناظر الطبيعية الخاصة بك تفي بالإرشادات المحلية.",
      },
      {
        title: "الإشراف في الموقع (اختياري)",
        description:
          "يمكننا دعم مرحلة التنفيذ من خلال مراجعة المخططات التنفيذية، وتقديمات المواد، وتقدم العمل في الموقع.",
      },
    ],
    faqs: [
      {
        question: "Do you design small gardens or only full landscapes?",
        answer:
          "We design all scales — from compact courtyards to full property masterplans.",
      },
      {
        question: "Can I request a low-maintenance or water-saving garden?",
        answer:
          "Absolutely. We consider both aesthetic and maintenance needs when selecting plants and materials.",
      },
      {
        question: "Do you handle lighting and irrigation as well?",
        answer:
          "Yes. These systems are included in our landscape design and coordinated with the rest of the project.",
      },
      {
        question: "Will my landscape be approved by authorities?",
        answer:
          "If approvals are required in your area, we prepare the drawings according to UAE standards and assist with submission.",
      },
    ],
    faqsAr: [
      {
        question: "هل تصممون حدائق صغيرة أم مناظر طبيعية كاملة فقط؟",
        answer:
          "نحن نصمم على جميع المستويات، من الساحات المدمجة إلى المخططات الرئيسية الكاملة للعقارات.",
      },
      {
        question: "هل يمكنني طلب حديقة تتطلب صيانة منخفضة أو موفرة للمياه؟",
        answer:
          "بالتأكيد. نأخذ في الاعتبار الاحتياجات الجمالية واحتياجات الصيانة عند اختيار النباتات والمواد.",
      },
      {
        question: "هل تتولون تصميم الإضاءة والري أيضًا؟",
        answer:
          "نعم. يتم تضمين هذه الأنظمة في تصميم المناظر الطبيعية لدينا وتنسيقها مع بقية المشروع.",
      },
      {
        question: "هل سيتم اعتماد تصميم المناظر الطبيعية من قبل الجهات الحكومية؟",
        answer:
          "إذا كانت الموافقات مطلوبة في منطقتك، فإننا نُعدّ المخططات وفقًا لمعايير الإمارات ونساعد في عملية التقديم.",
      },
    ],
    metaTitle: "Landscape and Garden Design in Dubai | Khales Group",
    metaTitleAr: "تصميم المناظر الطبيعية والحدائق في دبي | مجموعة خالص",
    metaDescription:
      "Creative outdoor space design for villas and projects in the UAE. We specialize in garden design, swimming pools, and outdoor lighting to balance beauty and sustainability.",
    metaDescriptionAr:
      "تصميم مساحات خارجية مبتكرة للفلل والمشاريع في الإمارات. متخصصون في تصميم الحدائق، والمسابح، والإضاءة الخارجية لتحقيق التوازن بين الجمال والاستدامة.",
  },
  {
    id: 4,
    slug: "supervision",
    cover: "/services/engineering-supervision/01.jpg",
    gallery: [
      "/services/engineering-supervision/01.jpg",
      "/services/engineering-supervision/02.jpg",
      "/services/engineering-supervision/03.jpg",
    ],
    title: "Supervision",
    titleAr: "الإشراف",
    description:
      "Hands-on technical monitoring to ensure work is executed per approved drawings and regulations.",
    descriptionAr:
      "مراقبة فنية عملية لضمان تنفيذ العمل وفقًا للمخططات المعتمدة واللوائح التنظيمية.",
    longDescription:
      "Our Supervision service provides hands-on technical monitoring throughout the construction phase. We visit the site regularly to check that work is being executed in line with approved engineering drawings, authority regulations, and material specifications.\n\nFrom structural details to mechanical and electrical systems, our engineers ensure that your project is progressing safely, accurately, and efficiently. We track the percentage of work completed, verify materials used, and support interim payment evaluations, protecting your investment and reinforcing long-term reliability.",
    longDescriptionAr:
      "توفر خدمة الإشراف لدينا مراقبة فنية عملية طوال مرحلة البناء. نزور الموقع بانتظام للتحقق من أن العمل يتم تنفيذه بما يتماشى مع المخططات الهندسية المعتمدة، ولوائح الجهات الحكومية، ومواصفات المواد.\n\nمن التفاصيل الإنشائية إلى الأنظمة الميكانيكية والكهربائية، يضمن مهندسونا تقدم مشروعك بأمان ودقة وكفاءة. نتتبع النسبة المئوية للأعمال المنجزة، ونتحقق من المواد المستخدمة، وندعم تقييمات الدفعات المرحلية، مما يحمي استثمارك ويعزز الموثوقية على المدى الطويل.",
    keyFeatures: [
      "Review of Approved Drawings & Scope",
      "Regular Site Visits & Inspections",
      "Material & Method Verification",
      "Progress Tracking & Reporting",
      "Support for Interim Payments",
      "Final Technical Closeout",
    ],
    keyFeaturesAr: [
      "مراجعة المخططات المعتمدة ونطاق العمل",
      "زيارات ميدانية منتظمة وعمليات تفتيش",
      "التحقق من المواد وطرق التنفيذ",
      "متابعة التقدم وإعداد التقارير",
      "دعم الدفعات المرحلية",
      "الإغلاق الفني النهائي",
    ],
    process: [
      {
        title: "Review of Approved Drawings & Scope",
        description:
          "We begin by reviewing all IFC (Issued for Construction) engineering drawings and ensuring all parties are aligned on specifications.",
      },
      {
        title: "Regular Site Visits & Inspections",
        description:
          "Our engineers conduct scheduled site visits to monitor work execution, highlight technical issues, and ensure compliance.",
      },
      {
        title: "Material & Method Verification",
        description:
          "We confirm that materials on-site match what was approved and that work is being done using proper engineering methods.",
      },
      {
        title: "Progress Tracking & Reporting",
        description:
          "We track the actual percentage of work completed, assist in validating contractor claims, and prepare technical reports.",
      },
      {
        title: "Support for Interim Payments",
        description:
          "We provide technical documentation to support milestone payments, based on verified work progress and compliance.",
      },
      {
        title: "Final Technical Closeout",
        description:
          "We participate in final inspections to ensure the project meets engineering and authority standards before handover.",
      },
    ],
    processAr: [
      {
        title: "مراجعة المخططات المعتمدة ونطاق العمل",
        description:
          "نبدأ بمراجعة جميع المخططات الهندسية الصادرة للتنفيذ (IFC) ونتأكد من توافق جميع الأطراف على المواصفات.",
      },
      {
        title: "زيارات ميدانية منتظمة وعمليات تفتيش",
        description:
          "يقوم مهندسونا بزيارات ميدانية مجدولة لمراقبة تنفيذ العمل، وتسليط الضوء على المشكلات الفنية، وضمان الامتثال للمعايير.",
      },
      {
        title: "التحقق من المواد وطرق التنفيذ",
        description:
          "نتأكد من أن المواد المستخدمة في الموقع مطابقة لما تم اعتماده، وأن العمل يتم باستخدام الأساليب الهندسية الصحيحة.",
      },
      {
        title: "متابعة التقدم وإعداد التقارير",
        description:
          "نتتبع النسبة الفعلية للأعمال المنجزة، ونساعد في التحقق من صحة مطالبات المقاول، ونقوم بإعداد التقارير الفنية.",
      },
      {
        title: "دعم الدفعات المرحلية",
        description:
          "نوفر الوثائق الفنية لدعم الدفعات المرحلية، بناءً على التقدم المعتمد في العمل والامتثال للمواصفات.",
      },
      {
        title: "الإغلاق الفني النهائي",
        description:
          "نشارك في عمليات التفتيش النهائية لضمان أن المشروع يفي بالمعايير الهندسية ومعايير الجهات الحكومية قبل التسليم.",
      },
    ],
    faqs: [
      {
        question: "What's the difference between site supervision and engineering supervision?",
        answer:
          "Site supervision looks at general construction and visual compliance. Engineering supervision is more detailed — focused on structural integrity, MEP accuracy, and technical compliance.",
      },
      {
        question: "Do you only provide supervision for your own designs?",
        answer:
          "No. We can supervise any project where engineering drawings are available and authority-approved — regardless of who designed them.",
      },
      {
        question: "How often do your engineers visit the site?",
        answer:
          "Visit frequency depends on the project phase and client needs — typically weekly or milestone-based unless daily oversight is required.",
      },
      {
        question: "Does this help with contractor accountability?",
        answer:
          "Yes. Our reports and inspections help verify the quality and progress of the work, supporting informed client decisions and fair contractor payments.",
      },
    ],
    faqsAr: [
      {
        question: "ما الفرق بين الإشراف على الموقع والإشراف الهندسي؟",
        answer:
          "الإشراف على الموقع يركز على البناء العام والامتثال البصري. أما الإشراف الهندسي فهو أكثر تفصيلاً، ويركز على السلامة الإنشائية ودقة الأنظمة الكهروميكانيكية والامتثال الفني.",
      },
      {
        question: "هل تقدمون الإشراف على تصاميمكم الخاصة فقط؟",
        answer:
          "لا. يمكننا الإشراف على أي مشروع تتوفر له مخططات هندسية وموافقات من الجهات الحكومية، بغض النظر عن الجهة التي قامت بالتصميم.",
      },
      {
        question: "كم مرة يزور مهندسوكم الموقع؟",
        answer:
          "يعتمد تكرار الزيارات على مرحلة المشروع واحتياجات العميل، وعادة ما تكون أسبوعية أو عند كل مرحلة رئيسية، ما لم تكن هناك حاجة لإشراف يومي.",
      },
      {
        question: "هل يساعد هذا في مساءلة المقاول؟",
        answer:
          "نعم. تساعد تقاريرنا وعمليات التفتيش التي نقوم بها في التحقق من جودة وتقدم العمل، مما يدعم اتخاذ قرارات مستنيرة من قبل العميل ويضمن دفعات عادلة للمقاول.",
      },
    ],
    metaTitle: "Construction Supervision | Khales Group",
    metaTitleAr: "الإشراف على التنفيذ | مجموعة خالص",
    metaDescription:
      "Professional engineering supervision services in Dubai to ensure construction quality and adherence to plans. We monitor every stage of your project for the best results.",
    metaDescriptionAr:
      "خدمات إشراف هندسي احترافية في دبي لضمان جودة البناء والالتزام بالمخططات. نراقب كل مرحلة من مراحل مشروعك لضمان أفضل النتائج.",
  },
  {
    id: 5,
    slug: "tendering",
    cover: "/services/feasibility-study/01.jpg",
    gallery: [
      "/services/feasibility-study/01.jpg",
      "/services/feasibility-study/02.jpg",
      "/services/feasibility-study/03.jpg",
    ],
    title: "Tendering",
    titleAr: "المناقصات",
    description:
      "Preparing tender documents, inviting qualified contractors and comparing bids so you award the right contract at the right price.",
    descriptionAr:
      "إعداد مستندات المناقصة، ودعوة مقاولين مؤهلين، ومقارنة العروض لترسية العقد المناسب بالسعر المناسب.",
    longDescription:
      "The contractor you choose shapes the quality, cost and timeline of your project more than almost any other decision. Our tendering service makes that choice clear and fair: we prepare complete tender documents, invite contractors with the right experience, and make sure every bid is priced against the same scope.\n\nWe then analyse the offers line by line, flag missing items and unrealistic rates, run clarifications and negotiations, and give you a written recommendation. You award the contract knowing exactly what you are paying for.",
    longDescriptionAr:
      "اختيار المقاول يحدد جودة مشروعك وتكلفته ومدته أكثر من أي قرار آخر تقريبًا. تجعل خدمة المناقصات لدينا هذا الاختيار واضحًا وعادلًا: نُعدّ مستندات مناقصة متكاملة، وندعو مقاولين ذوي خبرة مناسبة، ونضمن أن جميع العروض مسعّرة على النطاق نفسه.\n\nثم نحلل العروض بندًا ببند، ونرصد البنود الناقصة والأسعار غير الواقعية، وندير الاستيضاحات والمفاوضات، ونقدّم لك توصية مكتوبة. لتُرسي العقد وأنت تعرف تمامًا ما الذي تدفع مقابله.",
    keyFeatures: [
      "Tender Documents & BOQ",
      "Contractor Prequalification",
      "Tender Management",
      "Bid Analysis & Comparison",
      "Clarifications & Negotiation",
      "Award Recommendation",
    ],
    keyFeaturesAr: [
      "مستندات المناقصة وجداول الكميات",
      "التأهيل المسبق للمقاولين",
      "إدارة المناقصة",
      "تحليل العروض ومقارنتها",
      "الاستيضاحات والتفاوض",
      "توصية الترسية",
    ],
    process: [
      {
        title: "Tender Documents & BOQ",
        description:
          "We assemble drawings, specifications, bills of quantities and contract conditions into one clear tender package.",
      },
      {
        title: "Contractor Prequalification",
        description:
          "We shortlist contractors based on track record, capacity, financial standing and experience with similar projects.",
      },
      {
        title: "Tender Management",
        description:
          "We issue the tender, answer contractor queries, run site visits and manage addenda so every bidder works from the same information.",
      },
      {
        title: "Bid Analysis & Comparison",
        description:
          "We compare offers line by line, normalise exclusions and assumptions, and highlight risks hidden in low prices.",
      },
      {
        title: "Clarifications & Negotiation",
        description:
          "We clarify gaps with the leading bidders and negotiate price, programme and terms on your behalf.",
      },
      {
        title: "Award Recommendation",
        description:
          "You receive a written report with our recommended contractor and the reasons behind it.",
      },
    ],
    processAr: [
      {
        title: "مستندات المناقصة وجداول الكميات",
        description:
          "نجمع المخططات والمواصفات وجداول الكميات وشروط العقد في حزمة مناقصة واحدة واضحة.",
      },
      {
        title: "التأهيل المسبق للمقاولين",
        description:
          "نختار قائمة مختصرة من المقاولين بناءً على سجل أعمالهم وقدرتهم ووضعهم المالي وخبرتهم في مشاريع مشابهة.",
      },
      {
        title: "إدارة المناقصة",
        description:
          "نطرح المناقصة، ونجيب على استفسارات المقاولين، وننظم زيارات الموقع، وندير الملاحق ليعمل جميع المتقدمين على المعلومات نفسها.",
      },
      {
        title: "تحليل العروض ومقارنتها",
        description:
          "نقارن العروض بندًا ببند، ونوحّد الاستثناءات والافتراضات، ونكشف المخاطر المخفية وراء الأسعار المنخفضة.",
      },
      {
        title: "الاستيضاحات والتفاوض",
        description:
          "نستوضح الثغرات مع أفضل المتقدمين ونتفاوض على السعر والبرنامج الزمني والشروط نيابةً عنك.",
      },
      {
        title: "توصية الترسية",
        description:
          "تستلم تقريرًا مكتوبًا بالمقاول الذي نوصي به وأسباب التوصية.",
      },
    ],
    faqs: [
      {
        question: "Can you tender a project designed by another consultant?",
        answer:
          "Yes. We review the existing drawings first, flag any gaps that would cause pricing disputes, and then run the tender.",
      },
      {
        question: "How many contractors do you usually invite?",
        answer:
          "Typically three to six prequalified contractors, enough for real competition without diluting the quality of bids.",
      },
      {
        question: "Is the lowest bid always the one you recommend?",
        answer:
          "No. We recommend the best value, which weighs price against scope coverage, programme, experience and risk.",
      },
      {
        question: "Do you also prepare the contract after the tender?",
        answer:
          "Yes. We can prepare the contract with the selected contractor and review its terms as part of our Contracts Review service.",
      },
    ],
    faqsAr: [
      {
        question: "هل يمكنكم طرح مناقصة لمشروع صممه استشاري آخر؟",
        answer:
          "نعم. نراجع المخططات الحالية أولًا، ونرصد أي نواقص قد تسبب خلافات في التسعير، ثم نطرح المناقصة.",
      },
      {
        question: "كم مقاولًا تدعون عادةً؟",
        answer:
          "عادةً من ثلاثة إلى ستة مقاولين مؤهلين مسبقًا، وهو عدد كافٍ لمنافسة حقيقية دون التأثير على جودة العروض.",
      },
      {
        question: "هل توصون دائمًا بأقل سعر؟",
        answer:
          "لا. نوصي بأفضل قيمة، وهي توازن بين السعر وتغطية النطاق والبرنامج الزمني والخبرة والمخاطر.",
      },
      {
        question: "هل تُعدّون العقد بعد المناقصة؟",
        answer:
          "نعم. يمكننا إعداد العقد مع المقاول المختار ومراجعة بنوده ضمن خدمة مراجعة العقود.",
      },
    ],
    metaTitle: "Tendering & Contractor Selection | Khales Group",
    metaTitleAr: "المناقصات واختيار المقاولين | مجموعة خالص",
    metaDescription:
      "Tender documents, contractor prequalification, bid analysis and award recommendations for construction projects in the UAE and the Gulf.",
    metaDescriptionAr:
      "إعداد مستندات المناقصات، والتأهيل المسبق للمقاولين، وتحليل العروض، وتوصيات الترسية لمشاريع البناء في الإمارات والخليج.",
  },
  {
    id: 6,
    slug: "owners-representative",
    cover: "/services/project-manager-service/01.jpg",
    gallery: [
      "/services/project-manager-service/01.jpg",
      "/services/project-manager-service/02.jpg",
      "/services/project-manager-service/03.jpg",
    ],
    title: "Owner's Representative",
    titleAr: "ممثل المالك",
    description:
      "Your official representative, overseeing all teams to ensure your project stays on track.",
    descriptionAr:
      "ممثلكم الرسمي، يشرف على جميع الفرق لضمان بقاء مشروعكم على المسار الصحيح.",
    longDescription:
      "The Owner's Representative service is designed for clients who want to stay in control of their project, without managing the daily tasks and coordination themselves. Acting as your official representative, we oversee the project on your behalf, making sure all consultants, contractors, and site teams are aligned and performing according to the plan.\n\nWe handle the complexities, site meetings, document reviews, progress tracking, and approvals, while keeping you informed and supported at every step. You make the final decisions. We make sure everything else moves forward smoothly, with clarity and accountability.",
    longDescriptionAr:
      "صُممت خدمة ممثل المالك للعملاء الذين يرغبون في الحفاظ على سيطرتهم على مشاريعهم، دون إدارة المهام اليومية والتنسيق بأنفسهم. بصفتنا ممثلك الرسمي، نشرف على المشروع نيابةً عنك، ونتأكد من أن جميع الاستشاريين والمقاولين وفرق الموقع متوافقون ويعملون وفقًا للخطة.\n\nنتولى التعقيدات، واجتماعات الموقع، ومراجعة المستندات، وتتبع التقدم، والموافقات، مع إبقائك على اطلاع ودعم في كل خطوة. أنت تتخذ القرارات النهائية، ونحن نضمن أن كل شيء آخر يسير بسلاسة ووضوح ومساءلة.",
    keyFeatures: [
      "Project Brief & Role Definition",
      "Team Coordination",
      "Progress Monitoring",
      "On-Site Representation",
      "Client Reporting & Approvals",
      "Final Delivery & Closeout Support",
    ],
    keyFeaturesAr: [
      "موجز المشروع وتعريف الدور",
      "تنسيق الفريق",
      "مراقبة التقدم",
      "التمثيل في الموقع",
      "تقارير العملاء والموافقات",
      "التسليم النهائي ودعم الإغلاق",
    ],
    process: [
      {
        title: "Project Brief & Role Definition",
        description:
          "We align with your project goals and define how we'll act on your behalf throughout the duration of the project.",
      },
      {
        title: "Team Coordination",
        description:
          "We serve as the main contact between all consultants, contractors, and suppliers — ensuring clarity and direction.",
      },
      {
        title: "Progress Monitoring",
        description:
          "We review schedules, track milestones, flag risks early, and keep your project moving forward efficiently.",
      },
      {
        title: "On-Site Representation",
        description:
          "We attend key meetings, verify site work against the contract, and ensure your standards are met.",
      },
      {
        title: "Client Reporting & Approvals",
        description:
          "You receive clear updates with only the information you need — and we support you in making informed decisions.",
      },
      {
        title: "Final Delivery & Closeout Support",
        description:
          "We ensure the project is finalized properly — including punch-list coordination, handover documentation, and closing all contractual items.",
      },
    ],
    processAr: [
      {
        title: "موجز المشروع وتعريف الدور",
        description:
          "نتوافق مع أهداف مشروعك ونحدد كيفية العمل نيابةً عنك طوال مدة المشروع.",
      },
      {
        title: "تنسيق الفريق",
        description:
          "نعمل كنقطة اتصال رئيسية بين جميع الاستشاريين والمقاولين والموردين، مما يضمن الوضوح والتوجيه.",
      },
      {
        title: "مراقبة التقدم",
        description:
          "نراجع الجداول الزمنية، نتتبع المراحل الرئيسية، نكتشف المخاطر مبكرًا، ونحافظ على تقدم مشروعك بكفاءة.",
      },
      {
        title: "التمثيل في الموقع",
        description:
          "نحضر الاجتماعات الرئيسية، ونتحقق من أن العمل في الموقع يتوافق مع العقد، ونضمن تلبية معاييرك.",
      },
      {
        title: "تقارير العملاء والموافقات",
        description:
          "تتلقى تحديثات واضحة تحتوي فقط على المعلومات التي تحتاجها، وندعمك في اتخاذ قرارات مستنيرة.",
      },
      {
        title: "التسليم النهائي ودعم الإغلاق",
        description:
          "نضمن إنجاز المشروع بشكل صحيح، بما في ذلك تنسيق قائمة الملاحظات النهائية، وتوثيق التسليم، وإغلاق جميع البنود التعاقدية.",
      },
    ],
    faqs: [
      {
        question: "How is this different from Supervision?",
        answer:
          "Supervision checks that the work on site matches the approved drawings. As your Owner's Representative, we look after your interests across the whole project — consultants, contractors, budget and programme — while you remain the final decision-maker.",
      },
      {
        question: "Do I still have to be involved in every step?",
        answer:
          "No — we manage all daily tasks and coordination. You're only involved when key decisions or approvals are needed.",
      },
      {
        question: "Do you attend meetings and communicate with the contractor?",
        answer:
          "Yes. We attend all major meetings, review reports, and manage contractor communication on your behalf.",
      },
      {
        question: "What types of projects is this service suited for?",
        answer:
          "It's ideal for private villa owners, international clients, or developers who want experienced oversight without being hands-on every day.",
      },
    ],
    faqsAr: [
      {
        question: "ما الفرق بين هذه الخدمة وخدمة الإشراف؟",
        answer:
          "يتحقق الإشراف من مطابقة الأعمال في الموقع للمخططات المعتمدة. أما بصفتنا ممثلك كمالك، فنحن نرعى مصالحك في المشروع بالكامل — الاستشاريين والمقاولين والميزانية والبرنامج الزمني — بينما تظل أنت صاحب القرار النهائي.",
      },
      {
        question: "هل ما زال عليّ أن أشارك في كل خطوة؟",
        answer:
          "لا، نحن ندير جميع المهام اليومية والتنسيق. لا تحتاج للمشاركة إلا عند الحاجة إلى قرارات أو موافقات رئيسية.",
      },
      {
        question: "هل تحضرون الاجتماعات وتتواصلون مع المقاول؟",
        answer:
          "نعم. نحضر جميع الاجتماعات الرئيسية، ونراجع التقارير، وندير التواصل مع المقاول نيابة عنك.",
      },
      {
        question: "ما هي أنواع المشاريع التي تناسبها هذه الخدمة؟",
        answer:
          "إنها مثالية لملاك الفلل الخاصة، أو العملاء الدوليين، أو المطورين الذين يرغبون في إشراف ذي خبرة دون الحاجة إلى التدخل المباشر يوميًا.",
      },
    ],
    metaTitle: "Owner's Representative Service | Khales Group",
    metaTitleAr: "خدمة ممثل المالك | مجموعة خالص",
    metaDescription:
      "Acting as your official representative to manage your project in Dubai. We oversee contractors, monitor progress, and ensure quality and budget adherence on your behalf.",
    metaDescriptionAr:
      "نعمل كممثل رسمي لك لإدارة مشروعك في دبي. نشرف على المقاولين، نتابع التقدم، ونتأكد من الالتزام بالجودة والميزانية نيابة عنك.",
  },
  {
    id: 7,
    slug: "contracts-review",
    cover: "/services/project-manager-service/02.jpg",
    gallery: [
      "/services/project-manager-service/02.jpg",
      "/services/project-manager-service/03.jpg",
      "/services/project-manager-service/01.jpg",
    ],
    title: "Contracts Review",
    titleAr: "مراجعة العقود",
    description:
      "Reviewing consultant and contractor agreements so scope, payments and responsibilities protect you before you sign.",
    descriptionAr:
      "مراجعة عقود الاستشاريين والمقاولين لتكون بنود النطاق والدفعات والمسؤوليات في صالحك قبل التوقيع.",
    longDescription:
      "Most project disputes trace back to a contract that was vague, one-sided or missing something important. Our contracts review service reads every agreement from an engineer's point of view: is the scope complete, do the payment terms match real progress, and are delays, variations and defects handled fairly?\n\nWe mark up the risks, propose clear wording, and support you in negotiating the changes. During construction we can also review variation orders and claims against the contract, so what you pay always matches what was agreed.",
    longDescriptionAr:
      "تعود معظم خلافات المشاريع إلى عقد غامض أو منحاز أو ينقصه بند مهم. تقرأ خدمة مراجعة العقود لدينا كل اتفاقية من منظور هندسي: هل النطاق مكتمل، وهل شروط الدفع مرتبطة بالإنجاز الفعلي، وهل تُعالَج التأخيرات والتعديلات والعيوب بشكل عادل؟\n\nنحدد المخاطر، ونقترح صياغة واضحة، وندعمك في التفاوض على التعديلات. وخلال التنفيذ يمكننا أيضًا مراجعة أوامر التغيير والمطالبات مقابل العقد، ليبقى ما تدفعه مطابقًا لما تم الاتفاق عليه.",
    keyFeatures: [
      "Scope & Document Check",
      "Payment Terms Review",
      "Risk & Liability Review",
      "Programme & Delay Clauses",
      "Negotiation Support",
      "Variations & Claims Review",
    ],
    keyFeaturesAr: [
      "التحقق من النطاق والمستندات",
      "مراجعة شروط الدفع",
      "مراجعة المخاطر والمسؤوليات",
      "بنود البرنامج الزمني والتأخير",
      "دعم التفاوض",
      "مراجعة أوامر التغيير والمطالبات",
    ],
    process: [
      {
        title: "Scope & Document Check",
        description:
          "We confirm the contract refers to the right drawings, specifications and BOQ, and that nothing in the scope is left open.",
      },
      {
        title: "Payment Terms Review",
        description:
          "We check advance payments, milestones, retention and guarantees so payments follow verified progress.",
      },
      {
        title: "Risk & Liability Review",
        description:
          "We review insurance, defects liability, warranties and termination clauses to make sure risk sits where it should.",
      },
      {
        title: "Programme & Delay Clauses",
        description:
          "We assess completion dates, extensions of time and delay penalties for clarity and enforceability.",
      },
      {
        title: "Negotiation Support",
        description:
          "We provide a marked-up contract with proposed wording and support you in agreeing the changes with the other party.",
      },
      {
        title: "Variations & Claims Review",
        description:
          "During construction, we assess variation orders and contractor claims against the signed contract.",
      },
    ],
    processAr: [
      {
        title: "التحقق من النطاق والمستندات",
        description:
          "نتأكد من أن العقد يشير إلى المخططات والمواصفات وجداول الكميات الصحيحة، وأنه لا يوجد أي بند مفتوح في النطاق.",
      },
      {
        title: "مراجعة شروط الدفع",
        description:
          "نراجع الدفعات المقدمة والمرحلية والمحتجزات والضمانات لتكون الدفعات مرتبطة بإنجاز مُتحقَّق منه.",
      },
      {
        title: "مراجعة المخاطر والمسؤوليات",
        description:
          "نراجع بنود التأمين ومسؤولية العيوب والضمانات والإنهاء لنتأكد من توزيع المخاطر بشكل صحيح.",
      },
      {
        title: "بنود البرنامج الزمني والتأخير",
        description:
          "نقيّم مواعيد الإنجاز وتمديدات المدة وغرامات التأخير من حيث الوضوح وقابلية التطبيق.",
      },
      {
        title: "دعم التفاوض",
        description:
          "نقدّم نسخة معدّلة من العقد مع الصياغة المقترحة، وندعمك في الاتفاق على التعديلات مع الطرف الآخر.",
      },
      {
        title: "مراجعة أوامر التغيير والمطالبات",
        description:
          "خلال التنفيذ، نقيّم أوامر التغيير ومطالبات المقاول مقابل العقد الموقّع.",
      },
    ],
    faqs: [
      {
        question: "Is this a legal service?",
        answer:
          "It is a technical and commercial review by engineers and contract specialists. Where formal legal advice is needed, we work alongside your lawyer.",
      },
      {
        question: "Which contracts can you review?",
        answer:
          "Construction contracts, consultancy agreements, subcontracts, supply agreements and design-and-build contracts, including FIDIC-based forms.",
      },
      {
        question: "Can you review a contract I have already signed?",
        answer:
          "Yes. We can explain your rights and obligations, and help you manage variations, delays or disputes under the existing terms.",
      },
      {
        question: "How long does a review take?",
        answer:
          "Most contracts are reviewed within a few working days, depending on their length and the supporting documents.",
      },
    ],
    faqsAr: [
      {
        question: "هل هذه خدمة قانونية؟",
        answer:
          "هي مراجعة فنية وتجارية يقوم بها مهندسون ومختصون في العقود. وعند الحاجة إلى رأي قانوني رسمي، نعمل جنبًا إلى جنب مع محاميك.",
      },
      {
        question: "ما العقود التي يمكنكم مراجعتها؟",
        answer:
          "عقود المقاولات، واتفاقيات الاستشارات، وعقود الباطن، وعقود التوريد، وعقود التصميم والتنفيذ، بما فيها النماذج المبنية على فيديك (FIDIC).",
      },
      {
        question: "هل يمكنكم مراجعة عقد وقّعته بالفعل؟",
        answer:
          "نعم. نوضح حقوقك والتزاماتك، ونساعدك في إدارة أوامر التغيير أو التأخيرات أو الخلافات وفق البنود الحالية.",
      },
      {
        question: "كم تستغرق المراجعة؟",
        answer:
          "تتم مراجعة معظم العقود خلال أيام عمل قليلة، حسب طولها والمستندات المرفقة بها.",
      },
    ],
    metaTitle: "Construction Contracts Review | Khales Group",
    metaTitleAr: "مراجعة عقود البناء | مجموعة خالص",
    metaDescription:
      "Technical and commercial review of construction and consultancy contracts in the UAE: scope, payments, risk, delays, variations and claims.",
    metaDescriptionAr:
      "مراجعة فنية وتجارية لعقود البناء والاستشارات في الإمارات: النطاق، والدفعات، والمخاطر، والتأخير، وأوامر التغيير، والمطالبات.",
  },
  {
    id: 8,
    slug: "cost-calculation",
    cover: "/services/feasibility-study/02.jpg",
    gallery: [
      "/services/feasibility-study/02.jpg",
      "/services/feasibility-study/03.jpg",
      "/services/feasibility-study/01.jpg",
    ],
    title: "Cost Calculation",
    titleAr: "حساب التكاليف",
    description:
      "Accurate cost estimates and quantity take-offs at every stage, so you know what your project will cost before you build it.",
    descriptionAr:
      "تقديرات دقيقة للتكاليف وحصر للكميات في كل مرحلة، لتعرف تكلفة مشروعك قبل أن تبدأ البناء.",
    longDescription:
      "A budget is only useful if it is realistic. Our cost calculation service gives you reliable numbers from the earliest idea to the final account: early cost bands to test feasibility, detailed estimates as the design develops, and full bills of quantities ready for tendering.\n\nWe base our figures on current UAE and Gulf market rates and on the real costs of the projects we have delivered. During construction we keep tracking actual spend against the budget, so surprises are caught early and decisions are made with the full picture.",
    longDescriptionAr:
      "الميزانية لا تكون مفيدة إلا إذا كانت واقعية. تمنحك خدمة حساب التكاليف لدينا أرقامًا موثوقة من الفكرة الأولى حتى الحساب الختامي: نطاقات تكلفة أولية لاختبار الجدوى، وتقديرات تفصيلية مع تطور التصميم، وجداول كميات كاملة جاهزة للمناقصة.\n\nنبني أرقامنا على أسعار السوق الحالية في الإمارات والخليج وعلى التكاليف الفعلية للمشاريع التي نفذناها. وخلال التنفيذ نواصل متابعة الإنفاق الفعلي مقابل الميزانية، لاكتشاف أي مفاجآت مبكرًا واتخاذ القرارات بصورة كاملة.",
    keyFeatures: [
      "Preliminary Cost Estimate",
      "Detailed Cost Plan",
      "Quantity Take-off & BOQ",
      "Value Engineering",
      "Cost Monitoring",
      "Final Account",
    ],
    keyFeaturesAr: [
      "التقدير الأولي للتكلفة",
      "خطة التكلفة التفصيلية",
      "حصر الكميات وجداولها",
      "الهندسة القيمية",
      "متابعة التكاليف",
      "الحساب الختامي",
    ],
    process: [
      {
        title: "Preliminary Cost Estimate",
        description:
          "Based on area, type and specification level, we give you an early cost range to test whether the project fits your budget.",
      },
      {
        title: "Detailed Cost Plan",
        description:
          "As the design develops, we break the budget down by element and trade, and update it at each design stage.",
      },
      {
        title: "Quantity Take-off & BOQ",
        description:
          "We measure quantities from the drawings and prepare a priced bill of quantities for tendering and comparison.",
      },
      {
        title: "Value Engineering",
        description:
          "We suggest alternative materials and methods that save cost without compromising quality or design intent.",
      },
      {
        title: "Cost Monitoring",
        description:
          "During construction, we track actual costs, variations and payments against the approved budget.",
      },
      {
        title: "Final Account",
        description:
          "At completion, we agree the final account with the contractor so the project closes without open financial items.",
      },
    ],
    processAr: [
      {
        title: "التقدير الأولي للتكلفة",
        description:
          "بناءً على المساحة والنوع ومستوى المواصفات، نقدّم لك نطاق تكلفة مبكرًا لتعرف إن كان المشروع يناسب ميزانيتك.",
      },
      {
        title: "خطة التكلفة التفصيلية",
        description:
          "مع تطور التصميم، نوزّع الميزانية حسب العناصر والأعمال، ونحدّثها في كل مرحلة تصميم.",
      },
      {
        title: "حصر الكميات وجداولها",
        description:
          "نحصر الكميات من المخططات ونُعدّ جدول كميات مسعّرًا للمناقصة والمقارنة.",
      },
      {
        title: "الهندسة القيمية",
        description:
          "نقترح مواد وطرق تنفيذ بديلة توفر التكلفة دون المساس بالجودة أو فكرة التصميم.",
      },
      {
        title: "متابعة التكاليف",
        description:
          "خلال التنفيذ، نتابع التكاليف الفعلية وأوامر التغيير والدفعات مقابل الميزانية المعتمدة.",
      },
      {
        title: "الحساب الختامي",
        description:
          "عند الإنجاز، نتفق على الحساب الختامي مع المقاول ليُغلق المشروع دون بنود مالية معلّقة.",
      },
    ],
    faqs: [
      {
        question: "How accurate is an early estimate?",
        answer:
          "Early estimates give a realistic range; accuracy improves at each design stage, and a priced BOQ gives the closest figure before tendering.",
      },
      {
        question: "Can you check a contractor's quotation?",
        answer:
          "Yes. We compare quotations against our own estimate and market rates, and flag items that are overpriced or missing.",
      },
      {
        question: "Is this the same as the online cost calculator?",
        answer:
          "The online calculator gives a quick indicative figure. This service is a professional estimate prepared from your actual drawings and specifications.",
      },
      {
        question: "Do you cover projects outside the UAE?",
        answer:
          "Yes. We prepare estimates for projects across the Gulf and beyond, using local market rates for each location.",
      },
    ],
    faqsAr: [
      {
        question: "ما مدى دقة التقدير الأولي؟",
        answer:
          "تعطي التقديرات الأولية نطاقًا واقعيًا، وتزداد الدقة مع كل مرحلة تصميم، ويقدّم جدول الكميات المسعّر أقرب رقم قبل المناقصة.",
      },
      {
        question: "هل يمكنكم التحقق من عرض سعر مقاول؟",
        answer:
          "نعم. نقارن عروض الأسعار بتقديرنا وبأسعار السوق، ونرصد البنود المبالغ في سعرها أو الناقصة.",
      },
      {
        question: "هل هذه الخدمة هي نفسها حاسبة التكلفة على الموقع؟",
        answer:
          "تعطي الحاسبة رقمًا استرشاديًا سريعًا، أما هذه الخدمة فهي تقدير احترافي مبني على مخططاتك ومواصفاتك الفعلية.",
      },
      {
        question: "هل تغطون مشاريع خارج الإمارات؟",
        answer:
          "نعم. نُعدّ تقديرات لمشاريع في الخليج وخارجه، باستخدام أسعار السوق المحلية لكل موقع.",
      },
    ],
    metaTitle: "Construction Cost Calculation & Estimation | Khales Group",
    metaTitleAr: "حساب وتقدير تكاليف البناء | مجموعة خالص",
    metaDescription:
      "Construction cost estimates, quantity take-offs, BOQs, value engineering and cost monitoring for projects in the UAE and the Gulf.",
    metaDescriptionAr:
      "تقدير تكاليف البناء، وحصر الكميات، وجداول الكميات، والهندسة القيمية، ومتابعة التكاليف للمشاريع في الإمارات والخليج.",
  },
  {
    id: 9,
    slug: "planning",
    cover: "/services/development-planning/01.jpg",
    gallery: [
      "/services/development-planning/01.jpg",
      "/services/development-planning/02.jpg",
      "/services/development-planning/03.jpg",
    ],
    title: "Planning",
    titleAr: "التخطيط",
    description:
      "Turning a raw plot of land into a viable project with a clear, regulation-aligned plan.",
    descriptionAr:
      "تحويل قطعة أرض خام إلى مشروع قابل للتطبيق بخطة واضحة ومتوافقة مع الأنظمة.",
    longDescription:
      "Before design or construction begins, every project needs a plan. Our Planning service helps landowners, investors, and private clients understand what's possible on a site, based on regulations, project goals, market potential, and technical requirements.\n\nKhales guides you through zoning laws, land use restrictions, authority procedures, and development options, turning a raw plot into a viable project direction. This service helps avoid delays, wasted costs, or design mistakes by making sure your vision is feasible and aligned from the start.",
    longDescriptionAr:
      "قبل بدء التصميم أو البناء، يحتاج كل مشروع إلى خطة. تساعد خدمة التخطيط التي نقدمها ملاك الأراضي والمستثمرين والعملاء الخاصين على فهم ما هو ممكن في الموقع، بناءً على اللوائح التنظيمية وأهداف المشروع وإمكانيات السوق والمتطلبات الفنية.\n\nترشدك شركة خالص عبر قوانين تقسيم المناطق، وقيود استخدام الأراضي، وإجراءات الجهات الحكومية، وخيارات التطوير، لتحويل قطعة أرض خام إلى اتجاه مشروع قابل للتطبيق. تساعد هذه الخدمة على تجنب التأخير، والتكاليف المهدرة، وأخطاء التصميم من خلال التأكد من أن رؤيتك مجدية ومتوافقة منذ البداية.",
    keyFeatures: [
      "Site Review & Initial Assessment",
      "Regulatory & Municipality Check",
      "Project Concept Direction",
      "Time & Cost Planning",
      "Authority Strategy",
      "Summary Report & Recommendation",
    ],
    keyFeaturesAr: [
      "مراجعة الموقع والتقييم الأولي",
      "التدقيق التنظيمي والبلدي",
      "توجيه مفهوم المشروع",
      "تخطيط الوقت والتكلفة",
      "استراتيجية التعامل مع الجهات الحكومية",
      "التقرير الموجز والتوصيات",
    ],
    process: [
      {
        title: "Site Review & Initial Assessment",
        description:
          "We visit or study the site and gather data on size, location, zoning, utility access, topography, and authority requirements.",
      },
      {
        title: "Regulatory & Municipality Check",
        description:
          "We verify allowable FAR (floor area ratio), height limits, setbacks, building types, and special conditions based on local codes.",
      },
      {
        title: "Project Concept Direction",
        description:
          "We suggest development types (villa, residential block, mixed-use, etc.) that fit both the land and your goals.",
      },
      {
        title: "Time & Cost Planning (Optional)",
        description:
          "We can provide preliminary project timelines and rough cost bands to guide future planning and budgeting.",
      },
      {
        title: "Authority Strategy",
        description:
          "We advise on submission routes, timelines, and which approvals will be needed — helping you avoid process surprises later on.",
      },
      {
        title: "Summary Report & Recommendation",
        description:
          "We deliver a clear document summarizing your land's potential, next steps, and how to move into design and execution.",
      },
    ],
    processAr: [
      {
        title: "مراجعة الموقع والتقييم الأولي",
        description:
          "نقوم بزيارة أو دراسة الموقع وجمع البيانات حول المساحة، والموقع، والتصنيف، وتوفر الخدمات، والطبوغرافيا، ومتطلبات الجهات الحكومية.",
      },
      {
        title: "التدقيق التنظيمي والبلدي",
        description:
          "نتحقق من نسبة المساحة الطابقية المسموح بها (FAR)، وحدود الارتفاع، والارتدادات، وأنواع المباني، والشروط الخاصة بناءً على القوانين المحلية.",
      },
      {
        title: "توجيه مفهوم المشروع",
        description:
          "نقترح أنواع التطوير (فيلا، مبنى سكني، متعدد الاستخدامات، إلخ) التي تناسب كل من الأرض وأهدافك.",
      },
      {
        title: "تخطيط الوقت والتكلفة (اختياري)",
        description:
          "يمكننا تقديم جداول زمنية أولية للمشروع ونطاقات تكلفة تقريبية لتوجيه التخطيط والميزانية المستقبلية.",
      },
      {
        title: "استراتيجية التعامل مع الجهات الحكومية",
        description:
          "نقدم المشورة بشأن مسارات التقديم، والجداول الزمنية، والموافقات المطلوبة، مما يساعدك على تجنب المفاجآت الإجرائية لاحقًا.",
      },
      {
        title: "التقرير الموجز والتوصيات",
        description:
          "نسلم وثيقة واضحة تلخص إمكانيات أرضك، والخطوات التالية، وكيفية الانتقال إلى مرحلة التصميم والتنفيذ.",
      },
    ],
    faqs: [
      {
        question: "What does the planning service cover?",
        answer:
          "Planning involves creating a strategic roadmap for your project, from initial concept to long-term performance, ensuring it meets market demands and regulatory requirements.",
      },
      {
        question: "Do you work across all seven emirates and beyond?",
        answer:
          "Yes. We plan projects across Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Fujairah and Ras Al Khaimah, as well as in Saudi Arabia, Qatar, Kuwait, Oman and beyond.",
      },
      {
        question: "Can you handle both small and large-scale projects?",
        answer:
          "Absolutely. Whether it's a small villa or a large commercial complex, we tailor our services to meet the scale and scope of your project.",
      },
      {
        question: "How long does the planning process take?",
        answer:
          "The timeline depends on the project's complexity. After the initial consultation, we provide a detailed schedule to keep you informed every step of the way.",
      },
    ],
    faqsAr: [
      {
        question: "ماذا تشمل خدمة التخطيط؟",
        answer:
          "التخطيط يشمل إنشاء خارطة طريق استراتيجية لمشروعك، بدءًا من المفهوم الأولي ووصولاً إلى الأداء طويل الأمد، مع ضمان توافقه مع متطلبات السوق واللوائح التنظيمية.",
      },
      {
        question: "هل تعملون في جميع الإمارات السبع وخارجها؟",
        answer:
          "نعم. نخطط لمشاريع في دبي وأبوظبي والشارقة وعجمان وأم القيوين والفجيرة ورأس الخيمة، وكذلك في السعودية وقطر والكويت وعُمان وخارجها.",
      },
      {
        question: "هل يمكنكم التعامل مع المشاريع الصغيرة والكبيرة؟",
        answer:
          "بالتأكيد. سواء كان مشروعًا سكنيًا صغيرًا أو مجمعًا تجاريًا كبيرًا، نقدم خدمات مخصصة تناسب حجم ونطاق مشروعك.",
      },
      {
        question: "كم تستغرق عملية التخطيط؟",
        answer:
          "تعتمد المدة على تعقيد المشروع. بعد الاستشارة الأولية، نقدم جدولاً زمنياً مفصلاً لإبقائك على اطلاع بكل خطوة.",
      },
    ],
    metaTitle: "Planning | Khales Group",
    metaTitleAr: "التخطيط | مجموعة خالص",
    metaDescription:
      "Expert planning services for real estate projects in Dubai. We analyze feasibility, manage approvals, and turn land into successful projects.",
    metaDescriptionAr:
      "خدمات التخطيط للمشاريع العقارية في دبي. نحلل الجدوى، وندير الموافقات، ونحول الأراضي إلى مشاريع ناجحة.",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getAdjacentServices(slug: string) {
  const index = services.findIndex((s) => s.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };
  const prev = services[(index - 1 + services.length) % services.length];
  const next = services[(index + 1) % services.length];
  return { prev, next };
}

export type LocalizedService = Service;

export function localizeService(service: Service, lang: Locale): LocalizedService {
  const isAr = lang === "ar";
  return {
    ...service,
    title: isAr ? service.titleAr : service.title,
    description: isAr ? service.descriptionAr : service.description,
    longDescription: isAr ? service.longDescriptionAr : service.longDescription,
    keyFeatures: isAr ? service.keyFeaturesAr : service.keyFeatures,
    process: isAr ? service.processAr : service.process,
    faqs: isAr ? service.faqsAr : service.faqs,
    metaTitle: isAr ? service.metaTitleAr : service.metaTitle,
    metaDescription: isAr ? service.metaDescriptionAr : service.metaDescription,
  };
}
