// Real video reels, ported verbatim from Khales-next's
// dictionaries/en.js + ar.js `mediaCenterPage.reels` (the actual YouTube
// library the Media Center already runs on) instead of invented placeholder
// media.

export type ReelCategory = "Design" | "Architecture" | "Construction" | "Development" | "Sales";

export type Reel = {
  title: { en: string; ar: string };
  category: ReelCategory;
  thumbnailUrl: string;
  embedUrl: string;
};

export const reels: Reel[] = [
  {
    title: { en: "Glossy vs Matte: Design Beyond Trends", ar: "لامع أم مطفي: تصميم يتجاوز الصيحات" },
    category: "Design",
    thumbnailUrl: "https://i.ytimg.com/vi/dgZ4w-Dy16Y/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/dgZ4w-Dy16Y",
  },
  {
    title: { en: "Designed with intent. Built with excellence", ar: "مصمم بقصد. مبني بامتياز" },
    category: "Design",
    thumbnailUrl: "https://i.ytimg.com/vi/ZdAvC0XyGb4/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/ZdAvC0XyGb4",
  },
  {
    title: { en: "Design without logic is just guessing with style", ar: "التصميم بلا منطق هو مجرد تخمين بأسلوب" },
    category: "Design",
    thumbnailUrl: "https://i.ytimg.com/vi/6UR3BwMoryE/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/6UR3BwMoryE",
  },
  {
    title: {
      en: "Don't Receive Your Home Before Checking Smart Details",
      ar: "لا تستلم بيتك قبل ما تتأكد من هالتفاصيل المهمة",
    },
    category: "Construction",
    thumbnailUrl: "https://i.ytimg.com/vi/rjAovsfJ9Oo/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/rjAovsfJ9Oo",
  },
  {
    title: { en: "Color Is Not a Choice. It's a Decision", ar: "اللون ليس خياراً… بل قراراً" },
    category: "Design",
    thumbnailUrl: "https://i.ytimg.com/vi/Nu9G5zHLhgc/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/Nu9G5zHLhgc",
  },
  {
    title: { en: "Crafting Meaningful Design Experiences", ar: "نصنع تجارب تصميم ذات معنى" },
    category: "Design",
    thumbnailUrl: "https://i.ytimg.com/vi/FiB5BMQF25E/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/FiB5BMQF25E",
  },
  {
    title: { en: "Crafting Meaningful Design Experiences", ar: "نصنع تجارب تصميم ذات معنى" },
    category: "Design",
    thumbnailUrl: "https://i.ytimg.com/vi/hPDXO_yBSSA/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/hPDXO_yBSSA",
  },
  {
    title: { en: "How Modern Design Started – Before You Build Yours", ar: "كيف بدأ التصميم المودرن – قبل ما تبني بيتك" },
    category: "Design",
    thumbnailUrl: "https://i.ytimg.com/vi/wTJFHnZ2iYU/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/wTJFHnZ2iYU",
  },
  {
    title: {
      en: "From Planning to Execution: A Complete Project Journey",
      ar: "من التخطيط إلى التنفيذ: رحلة مشروع متكاملة",
    },
    category: "Development",
    thumbnailUrl: "https://i.ytimg.com/vi/ZCWvJ3KqU3A/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/ZCWvJ3KqU3A",
  },
  {
    title: {
      en: "Invest today, so your future self can thank you tomorrow",
      ar: "استثمر اليوم… عشان مستقبلَك يشكرك بكرا",
    },
    category: "Development",
    thumbnailUrl: "https://i.ytimg.com/vi/__O_77cPcU8/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/__O_77cPcU8",
  },
  {
    title: { en: "Calculate Your Villa Cost Easily", ar: "احسب تكلفة بناء فيلتك بسهولة" },
    category: "Development",
    thumbnailUrl: "https://i.ytimg.com/vi/nxcI4xfwXaE/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/nxcI4xfwXaE",
  },
  {
    title: {
      en: "Top 5 Aesthetic Materials Redefining Design Trends",
      ar: "أفضل 5 مواد جمالية تشكّل اتجاهات التصميم",
    },
    category: "Design",
    thumbnailUrl: "https://i.ytimg.com/vi/jqIn_baahWw/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/jqIn_baahWw",
  },
  {
    title: { en: "3 Things You Must Inspect Yourself", ar: "شوف أهم الفحوصات اللي لازم تسويها بنفسك" },
    category: "Architecture",
    thumbnailUrl: "https://i.ytimg.com/vi/pvPCon2uWOk/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/pvPCon2uWOk",
  },
  {
    title: { en: "Luxury Dubai Villas for Emiratis", ar: "فلل فاخرة في دبي للإماراتيين" },
    category: "Sales",
    thumbnailUrl: "https://i.ytimg.com/vi/tuKWll12qLk/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/tuKWll12qLk",
  },
  {
    title: { en: "Al Wasl – Your Ready Dream Home Awaits", ar: "في الوصل... بيتك الجاهز ينتظرك" },
    category: "Architecture",
    thumbnailUrl: "https://i.ytimg.com/vi/ScdKGWxPkaE/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/ScdKGWxPkaE",
  },
  {
    title: {
      en: "protect your investment, keep your vision on track",
      ar: "احمِي استثمارك… وخلي رؤيتك تمشي على الخطة الصح",
    },
    category: "Development",
    thumbnailUrl: "https://i.ytimg.com/vi/mC7rJZoBvVQ/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/mC7rJZoBvVQ",
  },
  {
    title: {
      en: "Why Every Successful Project Needs a Project Manager",
      ar: "ليش كل مشروع ناجح يحتاج مدير مشروع",
    },
    category: "Development",
    thumbnailUrl: "https://i.ytimg.com/vi/nXYW561Kuok/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/nXYW561Kuok",
  },
  {
    title: { en: "Designing with Shades & Harmony", ar: "التنسيق اللوني سر جاذبية التصميم الخارجي" },
    category: "Design",
    thumbnailUrl: "https://i.ytimg.com/vi/Vcl2cgFTIx4/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/Vcl2cgFTIx4",
  },
  {
    title: {
      en: "Interior Design Concepts Explained by Eng. Samer",
      ar: "خمس مفاهيم مختلفة للتصميم الداخلي مع المهندس سامر",
    },
    category: "Design",
    thumbnailUrl: "https://i.ytimg.com/vi/9afpoZ-hAXE/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/9afpoZ-hAXE",
  },
  {
    title: { en: "The Architect: Shaping the Future", ar: "المعماري: أساس المستقبل" },
    category: "Architecture",
    thumbnailUrl: "https://i.ytimg.com/vi/d3VPrwh2Zmg/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/d3VPrwh2Zmg",
  },
  {
    title: { en: "Every Entrance Is a Beginning of Luxury", ar: "كل مدخل هو بداية للفخامة" },
    category: "Sales",
    thumbnailUrl: "https://i.ytimg.com/vi/CbGAM0kiLmM/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/CbGAM0kiLmM",
  },
  {
    title: { en: "Key Points In Any Successful Project", ar: "نقاط أساسية في أي مشروع ناجح" },
    category: "Construction",
    thumbnailUrl: "https://i.ytimg.com/vi/c4k6aGyFPqk/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/c4k6aGyFPqk",
  },
];
