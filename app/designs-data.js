export const tierInfo = {
  basic: { nameAr: "أساسي", price: "2,000" },
  integrated: { nameAr: "متكامل", price: "5,000" },
  luxury: { nameAr: "فاخر", price: "15,000" },
};

export const designs = [
  {
    id: 1,
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030860046/giFYBDeFxbGe42Yyw8PTCg/hero-banner-dHKNucphgnCkPtvLjoZXtv.webp",
    titleAr: "فيلا الخوانيج العضوية",
    descriptionAr:
      "تصميم فيلا ضخمة تمزج بين الأقواس الحجرية الكبيرة والهندسة العضوية الحديثة المتدفقة. 6 غرف نوم مع إطلالات بانورامية.",
    area: "1,200 م²",
    rooms: 6,
    floors: 2,
    tier: "luxury",
    bestSeller: false,
    featured: true,
    tagsAr: ["فيلا", "عضوي", "حديث"],
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
    titleAr: "المجلس الكبير المعاصر",
    descriptionAr:
      "مساحة استقبال فخمة تمزج بين النسبة الحجرية الحديثة وتخطيط الضيافة التقليدي. سقف مزدوج الارتفاع مع أنماط إسلامية.",
    area: "85 م²",
    tier: "integrated",
    bestSeller: true,
    featured: true,
    tagsAr: ["داخلي", "مجلس", "إسلامي"],
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
    titleAr: "الجناح الكلاسيكي الجديد الفخم",
    descriptionAr:
      "جناح رئيسي يمزج بين الزخارف الجدارية الكلاسيكية والسريرة الخشبية المعاصرة وتشطيبات الرخام.",
    area: "65 م²",
    tier: "basic",
    bestSeller: false,
    featured: true,
    tagsAr: ["داخلي", "كلاسيكي جديد", "جناح"],
  },
];
