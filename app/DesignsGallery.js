"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  Ruler,
  Bed,
  Layers,
  Home,
  Layout,
  Briefcase,
  Palmtree,
  ShoppingCart,
} from "lucide-react";

// تم تحديث الروابط بصور فخمة وشغالة 100%
const GALLERY_DESIGNS = [
  {
    id: 1,
    title: "التصميم الداخلي للفيلا التنفيذية",
    desc: "تصميم داخلي فاخر للغاية يمزج بين جماليات الخشب الداكن والإضاءة الذكية المدمجة وعناصر التصميم المتطورة.",
    price: "5,000",
    image:
      "https://images.unsplash.com/photo-1600210491369-0708f33190cb?auto=format&fit=crop&w=800&q=80",
    category: "interior",
    area: "450 m²",
    rooms: "5 غرف",
    floors: null,
    tags: ["داخلي", "مودرن", "حديث"],
    badge: "متكامل",
  },
  {
    id: 2,
    title: "المجلس الكبير المعاصر",
    desc: "مساحة استقبال ضخمة تمزج بين أنسجة الحجر الحديثة وتخطيط الضيافة التقليدي. سقف مزدوج الارتفاع مع أنماط إسلامية.",
    price: "5,000",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    category: "interior",
    area: "85 m²",
    rooms: null,
    floors: null,
    tags: ["داخلي", "مجلس", "إسلامي"],
    badge: "متكامل",
  },
  {
    id: 3,
    title: "فيلا الخوانيج العضوية",
    desc: "تصميم فيلا ضخمة تمزج بين الأقواس الحجرية الكبيرة والهندسة العضوية الحديثة المتدفقة. 6 غرف نوم مع إطلالات بانورامية.",
    price: "15,000",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    category: "villas",
    area: "1,200 m²",
    rooms: "6 غرف",
    floors: "2 طوابق",
    tags: ["فيلا", "عضوي", "حديث"],
    badge: "فاخر",
  },
];

const CATEGORIES = [
  { id: "all", label: "جميع التصاميم", icon: Layout },
  { id: "villas", label: "فلل", icon: Home },
  { id: "interior", label: "تصاميم داخلية", icon: Layout },
  { id: "commercial", label: "تجاري", icon: Briefcase },
  { id: "landscaping", label: "تنسيق حدائق", icon: Palmtree },
];

export default function DesignsGallery() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredDesigns =
    activeFilter === "all"
      ? GALLERY_DESIGNS
      : GALLERY_DESIGNS.filter((d) => d.category === activeFilter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=DM+Serif+Display&display=swap');

        .gallery-section {
          background-color: #fcfcfc; /* لون أبيض مريح جداً */
          padding: 100px 0;
          direction: rtl;
          font-family: 'Tajawal', sans-serif;
          color: #1a1a1a;
        }

        .gallery-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Header */
        .gallery-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .gallery-header .top-label {
          font-size: 13px;
          font-weight: 700;
          color: #66a109;
          letter-spacing: 0.1em;
          margin-bottom: 12px;
          display: block;
        }

        .gallery-header h2 {
          font-size: clamp(32px, 5vw, 44px);
          font-weight: 800;
          margin-bottom: 16px;
          color: #0a0a0a;
        }

        .gallery-header p {
          color: #666;
          font-size: 16px;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Filters Bar */
        .filters-wrapper {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 30px;
        }

        .filter-tab {
          padding: 12px 24px;
          background: #ffffff;
          border: 1px solid #eaeaea;
          border-radius: 100px; /* شكل كبسولة للفلاتر يخليها أنعم */
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          color: #555;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0,0,0,0.02);
        }

        .filter-tab:hover {
          border-color: #66a109;
          color: #66a109;
          box-shadow: 0 4px 15px rgba(102, 161, 9, 0.1);
        }

        .filter-tab.active {
          background: #66a109;
          color: #ffffff;
          border-color: #66a109;
          box-shadow: 0 6px 20px rgba(102, 161, 9, 0.25);
        }

        /* Stats Bar below filters */
        .stats-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin-bottom: 50px;
          font-size: 14px;
          color: #777;
          font-weight: 500;
        }

        .filter-trigger {
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: color 0.3s;
        }
        
        .filter-trigger:hover { 
          color: #66a109; 
        }

        /* Grid */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        /* Card Styling */
        .design-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          border: none;
          box-shadow: 0 10px 35px rgba(0,0,0,0.05); /* ظل ناعم وفخم */
          display: flex;
          flex-direction: column;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .design-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 45px rgba(102, 161, 9, 0.12);
        }

        .image-container {
          position: relative;
          height: 280px; /* طولنا الصورة شوي عشان تعطي هيبة للتصميم */
          overflow: hidden;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
        }

        .design-card:hover .image-container img {
          transform: scale(1.06);
        }

        /* Price Overlay - تصميم كبسولة فخم */
        .price-overlay {
          position: absolute;
          bottom: 16px;
          left: 16px; /* نقلتها لليسار عشان التوازن البصري (RTL) */
          background: #111111;
          padding: 8px 18px;
          border-radius: 100px;
          z-index: 5;
          display: flex;
          align-items: baseline;
          gap: 6px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }

        .price-overlay .amount {
          font-family: 'DM Serif Display', serif;
          color: #ffffff; /* الرقم بالأبيض */
          font-size: 22px;
          line-height: 1;
        }

        .price-overlay .unit {
          font-size: 12px;
          color: #66a109; /* العملة بالأخضر */
          font-weight: 700;
        }

        /* Badge Overlay */
        .badge-overlay {
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 12px;
          font-weight: 700;
          background: #ffffff;
          color: #66a109;
          padding: 6px 14px;
          border-radius: 100px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          z-index: 5;
        }

        .card-body {
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-title {
          font-size: 20px;
          font-weight: 800;
          color: #0a0a0a;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .card-desc {
          font-size: 14px;
          color: #666;
          line-height: 1.7;
          margin-bottom: 24px;
        }

        .card-specs {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 24px;
          padding-top: 16px;
          border-top: 1px solid #f0f0f0;
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: #555;
        }

        .spec-item svg { 
          color: #66a109; 
        }

        .tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 28px;
        }

        .tag-pill {
          font-size: 11px;
          font-weight: 600;
          background: #f4f6f8;
          padding: 4px 12px;
          border-radius: 6px;
          color: #777;
        }

        /* Premium Order Button */
        .order-button {
          width: 100%;
          padding: 14px;
          background: rgba(102, 161, 9, 0.08); /* خلفية خضراء ناعمة جداً */
          border: none;
          border-radius: 10px;
          color: #5a8f08;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
          margin-top: auto;
        }

        .order-button:hover {
          background: #66a109;
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(102, 161, 9, 0.2);
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .gallery-grid { grid-template-columns: 1fr; }
          .gallery-container { padding: 0 16px; }
          .filters-wrapper { gap: 8px; }
          .filter-tab { padding: 10px 18px; font-size: 13px; }
        }
      `}</style>

      <section className="gallery-section">
        <div className="gallery-container">
          {/* Header */}
          <motion.div
            className="gallery-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="top-label">معرض التصاميم</span>
            <h2>
              اكتشف <span style={{ color: "#66a109" }}>تصاميمنا</span> الحصرية
            </h2>
            <p>
              تصفح مجموعتنا المتنوعة من التصاميم المعمارية والداخلية الجاهزة
              للتنفيذ بأعلى معايير الجودة والفخامة.
            </p>
          </motion.div>

          {/* Filters Area */}
          <div className="filters-wrapper">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`filter-tab ${activeFilter === cat.id ? "active" : ""}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                <cat.icon size={16} />
                {cat.label}
              </button>
            ))}
          </div>

          <div className="stats-bar">
            <div className="filter-trigger">
              <Filter size={16} /> فلاتر متقدمة
            </div>
            <span style={{ color: "#ccc" }}>|</span>
            <div>عرض {filteredDesigns.length} تصميم</div>
          </div>

          {/* Grid Layout */}
          <motion.div className="gallery-grid" layout>
            <AnimatePresence mode="popLayout">
              {filteredDesigns.map((design) => (
                <motion.div
                  key={design.id}
                  className="design-card"
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="image-container">
                    <img src={design.image} alt={design.title} />
                    {design.badge && (
                      <div className="badge-overlay">{design.badge}</div>
                    )}
                    <div className="price-overlay">
                      <span className="amount" dir="ltr">
                        {design.price}
                      </span>
                      <span className="unit">درهم</span>
                    </div>
                  </div>

                  <div className="card-body">
                    <h3 className="card-title">{design.title}</h3>
                    <p className="card-desc">{design.desc}</p>

                    <div className="card-specs">
                      <div className="spec-item">
                        <Ruler size={16} /> <span dir="ltr">{design.area}</span>
                      </div>
                      {design.rooms && (
                        <div className="spec-item">
                          <Bed size={16} /> {design.rooms}
                        </div>
                      )}
                      {design.floors && (
                        <div className="spec-item">
                          <Layers size={16} /> {design.floors}
                        </div>
                      )}
                    </div>

                    <div className="tags-row">
                      {design.tags.map((tag) => (
                        <span key={tag} className="tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="order-button">
                      <ShoppingCart size={18} /> اطلب التصميم الآن
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
