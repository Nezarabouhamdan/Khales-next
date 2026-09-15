import type { Locale } from "@/i18n-config";

// Real Khales service content, ported from Khales-next. The short-form
// teaser copy comes from that project's dictionaries/{en,ar}.js
// `servicesPage.subServices` block (and, for Personal Shopping, from its
// own dedicated page intro since it has no dictionary hub entry). The
// long-form description, process steps and FAQ come from each service's
// own dedicated dictionary page (e.g. `projectManagementPage`,
// `engineeringDesignPage`, ...) which power Khales-next's real
// `/services/<Slug>` pages - the richest, most accurate copy available,
// not the older/thinner `data/servicesdata.js` teaser file.
//
// Cover/gallery images: the numbered local files that `servicesdata.js`
// imports (7.png, 5.png, 6.png, 3.png, 8.png, 9.png, 11.png, 12.png) do not
// actually exist in Khales-next's `public/assets` (only 4.png does), so
// there is nothing real to copy locally for most services. The original
// source images (referenced in the old dictionaries' `subServices`,
// `slides`, and `intro.images` fields) were hosted on i.ibb.co, a free
// host rather than a real CDN - those routinely made Next's image
// optimizer time out (2-7s per cold fetch) on the larger ones, so they're
// self-hosted here as re-encoded JPEGs under /public/services instead.

export type ServiceCategory = "ProjectManagement" | "EngineeringConsultancy";

export type ServiceProcessStep = { title: string; description: string };
export type ServiceFaqItem = { question: string; answer: string };

export type Service = {
  id: number;
  slug: string;
  category: ServiceCategory;
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

const CATEGORY_LABELS: Record<ServiceCategory, { en: string; ar: string }> = {
  ProjectManagement: { en: "Project Management", ar: "إدارة المشاريع" },
  EngineeringConsultancy: { en: "Engineering Consultancy", ar: "الاستشارات الهندسية" },
};

export const services: Service[] = [
  {
    id: 2,
    slug: "project-manager-service",
    category: "ProjectManagement",
    cover: "/services/project-manager-service/01.jpg",
    gallery: [
      "/services/project-manager-service/01.jpg",
      "/services/project-manager-service/02.jpg",
      "/services/project-manager-service/03.jpg",
    ],
    title: "Project Manager Service",
    titleAr: "خدمة مدير المشروع",
    description:
      "Your official representative, overseeing all teams to ensure your project stays on track.",
    descriptionAr:
      "ممثلكم الرسمي، يشرف على جميع الفرق لضمان بقاء مشروعكم على المسار الصحيح.",
    longDescription:
      "The Project Manager service is designed for clients who want to stay in control of their project, without managing the daily tasks and coordination themselves. Acting as your official representative, we oversee the project on your behalf, making sure all consultants, contractors, and site teams are aligned and performing according to the plan.\n\nWe handle the complexities, site meetings, document reviews, progress tracking, and approvals, while keeping you informed and supported at every step. You make the final decisions. We make sure everything else moves forward smoothly, with clarity and accountability.",
    longDescriptionAr:
      "صُممت خدمة مدير المشروع للعملاء الذين يرغبون في الحفاظ على سيطرتهم على مشاريعهم، دون إدارة المهام اليومية والتنسيق بأنفسهم. بصفتنا ممثلك الرسمي، نشرف على المشروع نيابةً عنك، ونتأكد من أن جميع الاستشاريين والمقاولين وفرق الموقع متوافقون ويعملون وفقًا للخطة.\n\nنتولى التعقيدات، واجتماعات الموقع، ومراجعة المستندات، وتتبع التقدم، والموافقات، مع إبقائك على اطلاع ودعم في كل خطوة. أنت تتخذ القرارات النهائية، ونحن نضمن أن كل شيء آخر يسير بسلاسة ووضوح ومساءلة.",
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
        question: "How is this different from full 360 Project Management?",
        answer:
          "With 360, we handle every part of the project from design to construction. As your Project Manager, we represent your interests within a project that may already have its own team — keeping everything on track while you remain the final decision-maker.",
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
        question: "ما الفرق بين هذه الخدمة والإدارة الشاملة للمشاريع (360)؟",
        answer:
          "في الإدارة الشاملة (360)، نتولى كل جزء من المشروع من التصميم إلى البناء. أما بصفتنا مدير مشروعك، فنحن نمثل مصالحك ضمن مشروع قد يكون له فريقه الخاص بالفعل، مع الحفاظ على سير كل شيء في مساره الصحيح بينما تظل أنت صاحب القرار النهائي.",
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
    metaTitle: "Project Manager (Owner's Representative) Service | Khales Group",
    metaTitleAr: "خدمة مدير المشروع (ممثل المالك) | مجموعة خالص",
    metaDescription:
      "Acting as your official representative to manage your project in Dubai. We oversee contractors, monitor progress, and ensure quality and budget adherence on your behalf.",
    metaDescriptionAr:
      "نعمل كممثل رسمي لك لإدارة مشروعك في دبي. نشرف على المقاولين، نتابع التقدم، ونتأكد من الالتزام بالجودة والميزانية نيابة عنك.",
  },
  {
    id: 3,
    slug: "feasibility-study",
    category: "ProjectManagement",
    cover: "/services/feasibility-study/01.jpg",
    gallery: [
      "/services/feasibility-study/01.jpg",
      "/services/feasibility-study/02.jpg",
      "/services/feasibility-study/03.jpg",
    ],
    title: "Feasibility Study",
    titleAr: "دراسة الجدوى",
    description:
      "Evaluating if your project is achievable, profitable, and aligned with budget and regulations.",
    descriptionAr:
      "تقييم ما إذا كان مشروعك قابلاً للتحقيق ومربحًا ومتوافقًا مع الميزانية واللوائح.",
    longDescription:
      "A great idea is not always a viable project; that is where our Feasibility Study comes in. Before you invest in land, design, or construction, we help you evaluate whether the project is achievable, profitable, and aligned with your budget, site conditions, and regulatory framework.\n\nKhales' team reviews all key factors: land potential, design requirements, authority constraints, estimated costs, and timeframes. We then prepare a clear, data-backed summary of your project's risks, strengths, and practical next steps, so you can move forward with clarity and confidence.",
    longDescriptionAr:
      "الفكرة العظيمة ليست دائمًا مشروعًا قابلاً للتطبيق، وهنا يأتي دور دراسة الجدوى التي نقدمها. قبل أن تستثمر في الأرض أو التصميم أو البناء، نساعدك على تقييم ما إذا كان المشروع قابلاً للتحقيق ومربحًا ومتوافقًا مع ميزانيتك وظروف الموقع والإطار التنظيمي.\n\nيراجع فريق خالص جميع العوامل الرئيسية: إمكانيات الأرض، ومتطلبات التصميم، وقيود الجهات الحكومية، والتكاليف التقديرية، والجداول الزمنية. بعد ذلك، نُعدّ ملخصًا واضحًا مدعومًا بالبيانات لمخاطر مشروعك ونقاط قوته وخطواته العملية التالية، حتى تتمكن من المضي قدمًا بوضوح وثقة.",
    keyFeatures: [
      "Project Objective Review",
      "Site & Location Analysis",
      "Design & Regulatory Considerations",
      "Budget & Cost Estimate",
      "Timeline Mapping",
      "Viability Report",
    ],
    keyFeaturesAr: [
      "مراجعة أهداف المشروع",
      "تحليل الموقع والمنطقة",
      "اعتبارات التصميم واللوائح التنظيمية",
      "الميزانية وتقدير التكاليف",
      "وضع الجدول الزمني",
      "تقرير الجدوى",
    ],
    process: [
      {
        title: "Project Objective Review",
        description:
          "We begin by understanding what you want to build, why, and what your targets are — financial, functional, or strategic.",
      },
      {
        title: "Site & Location Analysis",
        description:
          "We assess site constraints, access, zoning, exposure, and local market dynamics.",
      },
      {
        title: "Design & Regulatory Considerations",
        description:
          "We study what's allowed, what design challenges may arise, and what approvals will be required.",
      },
      {
        title: "Budget & Cost Estimate",
        description:
          "We develop a high-level cost estimate, factoring in design, construction, approvals, and key risks.",
      },
      {
        title: "Timeline Mapping",
        description:
          "We provide a realistic delivery timeline, including design, permitting, and construction phases.",
      },
      {
        title: "Viability Report",
        description:
          "You receive a full summary of findings — with a clear go/no-go recommendation and action plan.",
      },
    ],
    processAr: [
      {
        title: "مراجعة أهداف المشروع",
        description:
          "نبدأ بفهم ما تريد بناءه، والسبب وراء ذلك، وما هي أهدافك — سواء كانت مالية أو وظيفية أو استراتيجية.",
      },
      {
        title: "تحليل الموقع والمنطقة",
        description:
          "نقوم بتقييم قيود الموقع، وسهولة الوصول إليه، والتصنيف، والرؤية، وديناميكيات السوق المحلي.",
      },
      {
        title: "اعتبارات التصميم واللوائح التنظيمية",
        description:
          "ندرس ما هو مسموح به، وما هي تحديات التصميم التي قد تظهر، وما هي الموافقات التي ستكون مطلوبة.",
      },
      {
        title: "الميزانية وتقدير التكاليف",
        description:
          "نضع تقديرًا عالي المستوى للتكاليف، مع الأخذ في الاعتبار التصميم، والبناء، والموافقات، والمخاطر الرئيسية.",
      },
      {
        title: "وضع الجدول الزمني",
        description:
          "نقدم جدولًا زمنيًا واقعيًا للتسليم، يشمل مراحل التصميم، والحصول على التصاريح، والبناء.",
      },
      {
        title: "تقرير الجدوى",
        description:
          "تتلقى ملخصًا كاملاً للنتائج — مع توصية واضحة بالمتابعة أو عدمها وخطة عمل للمضي قدمًا.",
      },
    ],
    faqs: [
      {
        question: "Who needs a feasibility study?",
        answer:
          "Anyone considering a new project — villa owners, landowners, investors, or developers — should do this before committing large time or capital.",
      },
      {
        question: "Does this include financial returns or ROI projections?",
        answer:
          "Yes. For investment-oriented projects, we can include basic return projections, sale/rental values, or holding cost scenarios.",
      },
      {
        question: "Will you help move forward if the project is viable?",
        answer:
          "Absolutely. If the study shows green lights, we can continue with design, approvals, and full project management.",
      },
      {
        question: "How accurate are the cost and timeline estimates?",
        answer:
          "They are based on current market conditions and Khales' experience across the UAE — offering a realistic early-stage forecast.",
      },
    ],
    faqsAr: [
      {
        question: "من يحتاج إلى دراسة جدوى؟",
        answer:
          "أي شخص يفكر في مشروع جديد — سواء كان مالك فيلا، أو مالك أرض، أو مستثمر، أو مطور عقاري — يجب أن يقوم بهذه الدراسة قبل الالتزام بوقت أو رأس مال كبير.",
      },
      {
        question: "هل تشمل الدراسة توقعات العوائد المالية أو العائد على الاستثمار؟",
        answer:
          "نعم. للمشاريع ذات التوجه الاستثماري، يمكننا تضمين توقعات العوائد الأساسية، أو قيم البيع/الإيجار، أو سيناريوهات تكاليف الاحتفاظ.",
      },
      {
        question: "هل تساعدون في المضي قدمًا إذا كان المشروع مجديًا؟",
        answer:
          "بالتأكيد. إذا أظهرت الدراسة نتائج إيجابية، يمكننا المتابعة بالتصميم، والحصول على الموافقات، وإدارة المشروع بالكامل.",
      },
      {
        question: "ما مدى دقة تقديرات التكلفة والجدول الزمني؟",
        answer:
          "تستند تقديراتنا إلى ظروف السوق الحالية وخبرة شركة خالص في جميع أنحاء الإمارات، مما يوفر توقعات واقعية للمراحل المبكرة.",
      },
    ],
    metaTitle: "Feasibility Study Service | Khales Group",
    metaTitleAr: "خدمة دراسة الجدوى | مجموعة خالص",
    metaDescription:
      "A great idea is not always a viable project; that is where our Feasibility Study comes in. Before you invest in land, design, or construction, we help you evaluate whether the project is achievable, profitable, and aligned with your budget, site conditions, and regulatory framework.",
    metaDescriptionAr:
      "الفكرة العظيمة ليست دائمًا مشروعًا قابلاً للتطبيق، وهنا يأتي دور دراسة الجدوى التي نقدمها. قبل أن تستثمر في الأرض أو التصميم أو البناء، نساعدك على تقييم ما إذا كان المشروع قابلاً للتحقيق ومربحًا ومتوافقًا مع ميزانيتك وظروف الموقع والإطار التنظيمي.",
  },
  {
    id: 4,
    slug: "development-planning",
    category: "ProjectManagement",
    cover: "/services/development-planning/01.jpg",
    gallery: [
      "/services/development-planning/01.jpg",
      "/services/development-planning/02.jpg",
      "/services/development-planning/03.jpg",
    ],
    title: "Development Planning",
    titleAr: "التخطيط التطويري",
    description:
      "Turning a raw plot of land into a viable project with a clear, regulation-aligned plan.",
    descriptionAr:
      "تحويل قطعة أرض خام إلى مشروع قابل للتطبيق بخطة واضحة ومتوافقة مع الأنظمة.",
    longDescription:
      "Before design or construction begins, every project needs a plan. Our Development Planning service helps landowners, investors, and private clients understand what's possible on a site, based on regulations, project goals, market potential, and technical requirements.\n\nKhales guides you through zoning laws, land use restrictions, authority procedures, and development options, turning a raw plot into a viable project direction. This service helps avoid delays, wasted costs, or design mistakes by making sure your vision is feasible and aligned from the start.",
    longDescriptionAr:
      "قبل بدء التصميم أو البناء، يحتاج كل مشروع إلى خطة. تساعد خدمة التخطيط التطويري التي نقدمها ملاك الأراضي والمستثمرين والعملاء الخاصين على فهم ما هو ممكن في الموقع، بناءً على اللوائح التنظيمية وأهداف المشروع وإمكانيات السوق والمتطلبات الفنية.\n\nترشدك شركة خالص عبر قوانين تقسيم المناطق، وقيود استخدام الأراضي، وإجراءات الجهات الحكومية، وخيارات التطوير، لتحويل قطعة أرض خام إلى اتجاه مشروع قابل للتطبيق. تساعد هذه الخدمة على تجنب التأخير، والتكاليف المهدرة، وأخطاء التصميم من خلال التأكد من أن رؤيتك مجدية ومتوافقة منذ البداية.",
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
        question: "What is development planning?",
        answer:
          "Development planning involves creating a strategic roadmap for your project, from initial concept to long-term performance, ensuring it meets market demands and regulatory requirements.",
      },
      {
        question: "Do you work on projects across all seven emirates?",
        answer:
          "Yes, we provide building contracting services in Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Fujairah, Al Ain, and Ras Al Khaimah.",
      },
      {
        question: "Can you handle both small and large-scale projects?",
        answer:
          "Absolutely. Whether it's a small villa or a large commercial complex, we tailor our services to meet the scale and scope of your project.",
      },
      {
        question: "How long does the development planning process take?",
        answer:
          "The timeline depends on the project's complexity. After the initial consultation, we provide a detailed schedule to keep you informed every step of the way.",
      },
    ],
    faqsAr: [
      {
        question: "ما هو التخطيط التطويري؟",
        answer:
          "التخطيط التطويري يشمل إنشاء خارطة طريق استراتيجية لمشروعك، بدءًا من المفهوم الأولي ووصولاً إلى الأداء طويل الأمد، مع ضمان توافقه مع متطلبات السوق واللوائح التنظيمية.",
      },
      {
        question: "هل تعملون على مشاريع في جميع الإمارات السبع؟",
        answer:
          "نعم، نقدم خدمات التخطيط التطويري في دبي، أبوظبي، الشارقة، عجمان، أم القيوين، الفجيرة، العين، ورأس الخيمة.",
      },
      {
        question: "هل يمكنكم التعامل مع المشاريع الصغيرة والكبيرة؟",
        answer:
          "بالتأكيد. سواء كان مشروعًا سكنيًا صغيرًا أو مجمعًا تجاريًا كبيرًا، نقدم خدمات مخصصة تناسب حجم ونطاق مشروعك.",
      },
      {
        question: "كم تستغرق عملية التخطيط التطويري؟",
        answer:
          "تعتمد المدة على تعقيد المشروع. بعد الاستشارة الأولية، نقدم جدولاً زمنياً مفصلاً لإبقائك على اطلاع بكل خطوة.",
      },
    ],
    metaTitle: "Development Planning | Khales Group",
    metaTitleAr: "التخطيط التطويري | مجموعة خالص",
    metaDescription:
      "Expert development planning services for real estate projects in Dubai. We analyze feasibility, manage approvals, and turn land into successful projects.",
    metaDescriptionAr:
      "خدمات التخطيط التطويري للمشاريع العقارية في دبي. نحلل الجدوى، وندير الموافقات، ونحول الأراضي إلى مشاريع ناجحة.",
  },
  {
    id: 5,
    slug: "engineering-design",
    category: "EngineeringConsultancy",
    cover: "/services/engineering-design/01.jpg",
    gallery: [
      "/services/engineering-design/01.jpg",
      "/services/engineering-design/02.jpg",
      "/services/engineering-design/03.jpg",
    ],
    title: "Engineering Design",
    titleAr: "التصميم الهندسي",
    description:
      "Providing all technical documents and calculations to take your project from vision to construction.",
    descriptionAr:
      "توفير جميع المستندات الفنية والحسابات اللازمة لنقل مشروعك من الرؤية إلى البناء.",
    longDescription:
      "Every project needs more than a beautiful concept; it needs engineering that works. Khales Engineering Design service provides all the technical documents, calculations, and system layouts needed to take your project from vision to construction.\n\nWe prepare structural, civil, mechanical, electrical, and plumbing designs, coordinated with architectural plans and in line with local authority codes. Whether you're building a villa or a multi-use development, we ensure your project is safe, compliant, efficient, and ready for execution.",
    longDescriptionAr:
      "كل مشروع يحتاج إلى أكثر من مجرد مفهوم جميل؛ إنه يحتاج إلى هندسة فعالة. توفر خدمة التصميم الهندسي من خالص جميع المستندات الفنية والحسابات وتخطيطات الأنظمة اللازمة لنقل مشروعك من الرؤية إلى البناء.\n\nنقوم بإعداد التصاميم الإنشائية والمدنية والميكانيكية والكهربائية والصحية، بالتنسيق مع المخططات المعمارية وبما يتماشى مع قوانين السلطات المحلية. سواء كنت تبني فيلا أو مشروعًا متعدد الاستخدامات، فإننا نضمن أن مشروعك آمن ومتوافق وفعال وجاهز للتنفيذ.",
    keyFeatures: [
      "Design Coordination & Review",
      "Structural & MEP Design",
      "Code Compliance & Authority Requirements",
      "Cross-Discipline Integration",
      "Final Issued for Construction (IFC) Drawings",
    ],
    keyFeaturesAr: [
      "تنسيق ومراجعة التصميم",
      "التصميم الإنشائي وتصميم الأنظمة الكهروميكانيكية",
      "الامتثال للقوانين ومتطلبات الجهات الحكومية",
      "التكامل بين مختلف التخصصات",
      "المخططات النهائية الصادرة للتنفيذ (IFC)",
    ],
    process: [
      {
        title: "Design Coordination & Review",
        description:
          "We start by studying the approved architectural design and identifying all engineering requirements based on the site, scale, and scope.",
      },
      {
        title: "Structural & MEP Design",
        description:
          "We produce detailed structural calculations, electrical and plumbing plans, HVAC layouts, and load analysis, customized to your project.",
      },
      {
        title: "Code Compliance & Authority Requirements",
        description:
          "We design according to UAE municipal standards and ensure all drawings meet submission and approval criteria.",
      },
      {
        title: "Cross-Discipline Integration",
        description:
          "We coordinate with other consultants to ensure that all technical systems align with design, function, and construction constraints.",
      },
      {
        title: "Final Issued for Construction (IFC) Drawings",
        description:
          "We submit finalized engineering drawings for contractor use, ready for site implementation.",
      },
    ],
    processAr: [
      {
        title: "تنسيق ومراجعة التصميم",
        description:
          "نبدأ بدراسة التصميم المعماري المعتمد وتحديد جميع المتطلبات الهندسية بناءً على الموقع والحجم والنطاق.",
      },
      {
        title: "التصميم الإنشائي وتصميم الأنظمة الكهروميكانيكية",
        description:
          "نُعد حسابات إنشائية مفصلة، ومخططات كهربائية وصحية، وتصاميم لأنظمة التكييف، وتحليل للأحمال، كلها مخصصة لمشروعك.",
      },
      {
        title: "الامتثال للقوانين ومتطلبات الجهات الحكومية",
        description:
          "نصمم وفقًا لمعايير البلديات في الإمارات ونضمن أن جميع المخططات تفي بمعايير التقديم والموافقة.",
      },
      {
        title: "التكامل بين مختلف التخصصات",
        description:
          "ننسق مع الاستشاريين الآخرين لضمان توافق جميع الأنظمة الفنية مع قيود التصميم والوظيفة والبناء.",
      },
      {
        title: "المخططات النهائية الصادرة للتنفيذ (IFC)",
        description:
          "نسلّم المخططات الهندسية النهائية لاستخدام المقاول، لتكون جاهزة للتنفيذ في الموقع.",
      },
    ],
    faqs: [
      {
        question: "What's the difference between architecture and engineering design?",
        answer:
          "Architecture defines how a space looks and functions. Engineering design ensures the structure and systems behind it are buildable, safe, and compliant.",
      },
      {
        question: "Do you only offer engineering for projects designed by Khales?",
        answer:
          "No. We can provide engineering design for external architectural concepts as well — ensuring your project moves forward technically and legally.",
      },
      {
        question: "Will you also submit drawings for authority approval?",
        answer:
          "Yes. Our designs follow local municipality standards and are prepared specifically for UAE approval processes.",
      },
      {
        question: "What types of projects do you provide engineering design for?",
        answer:
          "We work across villas, residential buildings, commercial projects, and mixed-use developments of various scales.",
      },
    ],
    faqsAr: [
      {
        question: "ما الفرق بين التصميم المعماري والتصميم الهندسي؟",
        answer:
          "التصميم المعماري يحدد شكل ووظيفة المساحة. التصميم الهندسي يضمن أن الهيكل والأنظمة التي تدعمه قابلة للبناء وآمنة ومتوافقة مع المعايير.",
      },
      {
        question: "هل تقدمون التصميم الهندسي للمشاريع التي صممتها شركة خالص فقط؟",
        answer:
          "لا. يمكننا تقديم التصميم الهندسي للمفاهيم المعمارية الخارجية أيضًا، مما يضمن تقدم مشروعك من الناحية الفنية والقانونية.",
      },
      {
        question: "هل تقدمون المخططات للحصول على موافقة الجهات الحكومية؟",
        answer:
          "نعم. تتبع تصاميمنا معايير البلديات المحلية ويتم إعدادها خصيصًا لعمليات الحصول على الموافقات في الإمارات.",
      },
      {
        question: "ما هي أنواع المشاريع التي تقدمون لها التصميم الهندسي؟",
        answer:
          "نعمل على الفلل، والمباني السكنية، والمشاريع التجارية، والمشاريع متعددة الاستخدامات بمختلف الأحجام.",
      },
    ],
    metaTitle: "Engineering Design | Khales Group",
    metaTitleAr: "التصميم الهندسي | مجموعة خالص",
    metaDescription:
      "Khales Group provides professional structural, MEP, and plumbing engineering design services for projects in Dubai and the UAE. Get approved, construction-ready drawings.",
    metaDescriptionAr:
      "نقدم خدمات التصميم الهندسي الإنشائي، الكهروميكانيكي، والصحي للمشاريع في دبي والإمارات. احصل على مخططات معتمدة وجاهزة للتنفيذ.",
  },
  {
    id: 6,
    slug: "engineering-supervision",
    category: "EngineeringConsultancy",
    cover: "/services/engineering-supervision/01.jpg",
    gallery: [
      "/services/engineering-supervision/01.jpg",
      "/services/engineering-supervision/02.jpg",
      "/services/engineering-supervision/03.jpg",
    ],
    title: "Engineering Supervision",
    titleAr: "الإشراف الهندسي",
    description:
      "Hands-on technical monitoring to ensure work is executed per approved drawings and regulations.",
    descriptionAr:
      "مراقبة فنية عملية لضمان تنفيذ العمل وفقًا للمخططات المعتمدة واللوائح التنظيمية.",
    longDescription:
      "Our Engineering Supervision service provides hands-on technical monitoring throughout the construction phase. We visit the site regularly to check that work is being executed in line with approved engineering drawings, authority regulations, and material specifications.\n\nFrom structural details to mechanical and electrical systems, our engineers ensure that your project is progressing safely, accurately, and efficiently. We track the percentage of work completed, verify materials used, and support interim payment evaluations, protecting your investment and reinforcing long-term reliability.",
    longDescriptionAr:
      "توفر خدمة الإشراف الهندسي لدينا مراقبة فنية عملية طوال مرحلة البناء. نزور الموقع بانتظام للتحقق من أن العمل يتم تنفيذه بما يتماشى مع المخططات الهندسية المعتمدة، ولوائح الجهات الحكومية، ومواصفات المواد.\n\nمن التفاصيل الإنشائية إلى الأنظمة الميكانيكية والكهربائية، يضمن مهندسونا تقدم مشروعك بأمان ودقة وكفاءة. نتتبع النسبة المئوية للأعمال المنجزة، ونتحقق من المواد المستخدمة، وندعم تقييمات الدفعات المرحلية، مما يحمي استثمارك ويعزز الموثوقية على المدى الطويل.",
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
    metaTitle: "Engineering Supervision | Khales Group",
    metaTitleAr: "الإشراف الهندسي | مجموعة خالص",
    metaDescription:
      "Professional engineering supervision services in Dubai to ensure construction quality and adherence to plans. We monitor every stage of your project for the best results.",
    metaDescriptionAr:
      "خدمات إشراف هندسي احترافية في دبي لضمان جودة البناء والالتزام بالمخططات. نراقب كل مرحلة من مراحل مشروعك لضمان أفضل النتائج.",
  },
  {
    id: 7,
    slug: "interior-design",
    category: "EngineeringConsultancy",
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
    id: 8,
    slug: "landscape-design",
    category: "EngineeringConsultancy",
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
    id: 9,
    slug: "personal-shopping",
    category: "EngineeringConsultancy",
    cover: "/services/personal-shopping/01.jpg",
    gallery: [
      "/services/personal-shopping/01.jpg",
      "/services/personal-shopping/02.jpg",
      "/services/personal-shopping/03.jpg",
    ],
    title: "Personal Shopping – Interior Designer",
    titleAr: "التسوق الشخصي – مصمم داخلي",
    description: "Bespoke Sourcing & Procurement for Luxury Villas",
    descriptionAr: "توريد وتجهيز فاخر بلا مؤاخذة للفلل الراقية",
    longDescription:
      "A luxury villa is only truly complete when its interiors match its architectural grandeur. Our Bespoke Sourcing & Procurement service is a white-glove, concierge experience designed for clients who demand exclusivity, flawless execution, and a seamless journey from blueprint to beautiful living.\n\nWe bridge the gap between architectural vision and curated comfort, managing the entire furnishing journey either alongside you or entirely on your behalf.",
    longDescriptionAr:
      "الفيلا الفاخرة لا تكتمل بجمالها إلا متى تطابقت تصاميمها الداخلية مع عظمتها المعمارية. خدمة التوريد والتجهيز الفاخر لدينا هي تجربة كونسيرج «لا مؤاخذة فيها» مُصممة للعملاء الذين يطالبون بالحصرية والتنفيذ بلا أخطاء ورحلة سلسة من المخطط إلى العيش.\n\nنحن نسد الفجوة بين الرؤية المعمارية والراحة المنسقة، وندير الرحلة الكاملة للتأثيث — سواء كنت تريد مشاركتنا في كل مرحلة أو أن ندير الأمر بالكامل نيابة عنك.",
    keyFeatures: [
      "The Curation Brief",
      "The Selection Phase",
      "Logistics & Procurement",
      "White-Glove Styling",
    ],
    keyFeaturesAr: [
      "مذ Brief التنسيق",
      "مرحلة الاختيار",
      "اللوجستيات والشراء",
      "التنسيق النهائي «بلا مؤاخذة»",
    ],
    process: [
      {
        title: "The Curation Brief",
        description:
          "We review your architectural layouts, design preferences, and investment scope to build a highly tailored sourcing strategy.",
      },
      {
        title: "The Selection Phase",
        description:
          "Whether through accompanied showroom visits or a curated presentation, you approve the final mood boards, materials, and flagship furniture pieces.",
      },
      {
        title: "Logistics & Procurement",
        description:
          "We manage the entire supply chain — placing orders, securing trade pricing, coordinating international shipping, and conducting strict quality control.",
      },
      {
        title: "White-Glove Styling",
        description:
          "Our design team oversees the on-site placement, assembly, and final styling, ensuring your space is flawlessly presented and move-in ready.",
      },
    ],
    processAr: [
      {
        title: "مذ Brief التنسيق",
        description:
          "نستعرض المخططات المعمارية، تفضيلات التصميم، والنطاق الاستثماري لبناء استراتيجية توريد مصممة خصيصاً.",
      },
      {
        title: "مرحلة الاختيار",
        description:
          "سواء عبر زيارات مصحوبة إلى صالات العرض أو عرض منسق، توافق على المخططات النهائية للمزاج، المواد، والقطع الرئيسية للأثاث.",
      },
      {
        title: "اللوجستيات والشراء",
        description:
          "ندير السلسلة التوريدية بالكامل — وضع الطلبات، تأمين أسعار التجارة، التنسيق للشحن الدولي، ومراقبة الجودة الصارمة.",
      },
      {
        title: "التنسيق النهائي «بلا مؤاخذة»",
        description:
          "يشرف فريق التصميم لدينا على الموضع على الموقع، التركيب، والتنسيق النهائي، ضامناً أن تكون مساحتك مصاغة بلا عيوب وجاهزة للسكن.",
      },
    ],
    faqs: [
      {
        question: "Do you source trade-only or restricted-catalog items?",
        answer:
          "Yes. We have direct access to trade-only catalogs and international luxury brand collections closed to the general public.",
      },
      {
        question: "Can you source and install custom-made furniture?",
        answer:
          "Absolutely. We manage custom manufacturing from concept to final installation, fully in line with your villa's design intent.",
      },
      {
        question: "Do you offer full turnkey FF&E procurement?",
        answer:
          "Yes — we handle every step from the approved design concept through sourcing, international logistics, quality control, and white-glove installation — no involvement required from you.",
      },
      {
        question: "Do you accompany clients during selections?",
        answer:
          "Yes. Our Guided Personal Shopping includes accompanied visits to elite design districts, private showrooms, and artisan workshops.",
      },
    ],
    faqsAr: [
      {
        question: "هل تقومون بتوريد قطع من الكتالوجات الحصرية أو المغلقة أمام العامة؟",
        answer:
          "نعم. نحن نوفر دخولاً مباشراً إلى كتالوجات تجارية حصرية ومجموعات علامات فاخرة دولية مغلقة أمام عامة الناس.",
      },
      {
        question: "هل يمكنكم تصنيع وتوريد أثاث مخصص؟",
        answer:
          "بالتأكيد. ندير التصنيع المخصص من المفهوم الأولي إلى التركيب النهائي، بما يتوافق تماماً مع نية التصميم الداخلي لفيلتك.",
      },
      {
        question: "هل تقدمون خدمة شراء وتجهيز FF&E شاملة (مفتاح بيد)؟",
        answer:
          "نعم — نحن ندير كل خطوة من المفهوم المعتمد من خلال التوريد، والشحن الدولي، ومراقبة الجودة، والتركيب النهائي «بلا مؤاخذة» — بدون أي حاجة لتدخل منك.",
      },
      {
        question: "هل ترافقون العملاء أثناء عمليات الاختيار؟",
        answer:
          "نعم. يشمل خدماتنا «التسوق الشخصي الموجه» زيارات مصحوبة إلى أحياء تصميم نخبة، وصالات عرض خاصة، وورش حرفية عاملين.",
      },
    ],
    metaTitle: "Personal Shopping – Interior Designer | Khales Group",
    metaTitleAr: "التسوق الشخصي – مصمم داخلي | مجموعة خالص",
    metaDescription:
      "Khales Personal Shopping & Interior Designer — a white-glove sourcing experience for luxury villas in Dubai & the UAE, from exclusive trade catalogs to final installation.",
    metaDescriptionAr:
      "خدمة التسوق الشخصي ومصمم الداخلي من خالص في دبي والإمارات. تجربة تسوق فاخرة وشراء وتجهيز أثاث ff&E للفلل الفاخرة — من الكتالوجات الحصرية إلى التركيب النهائي.",
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

export type LocalizedService = Service & { categoryLabel: string };

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
    categoryLabel: isAr ? CATEGORY_LABELS[service.category].ar : CATEGORY_LABELS[service.category].en,
  };
}
