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

// البيانات مطابقة تماماً للصورة اللي بعتها
const GALLERY_DESIGNS = [
  {
    id: 1,
    title: "التصميم الداخلي للفيلا التنفيذية",
    desc: "تصميم داخلي فاخر للغاية يمزج بين جماليات الخشب الداكن والإضاءة الذكية المدمجة وعناصر التصميم المتطورة.",
    price: "5,000",
    image:
      "https://images.unsplash.com/photo-1600607687940-472002695733?auto=format&fit=crop&q=80",
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
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80",
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
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80",
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
          background-color: #f8f9fa;
          padding: 100px 0;
          direction: rtl;
          font-family: 'Tajawal', sans-serif;
          color: #333;
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
          font-size: 12px;
          color: rgba(102, 161, 9, 0.8);
          letter-spacing: 0.1em;
          margin-bottom: 12px;
          display: block;
        }

        .gallery-header h2 {
          font-size: clamp(32px, 5vw, 44px);
          font-weight: 800;
          margin-bottom: 16px;
          color: #1a1a1a;
        }

        .gallery-header p {
          color: #555;
          font-size: 15px;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Filters Bar */
        .filters-wrapper {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 30px;
        }

        .filter-tab {
          padding: 10px 22px;
          background: #ffffff;
          border: 1px solid #dee2e6;
          border-radius: 10px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          color: #555;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .filter-tab:hover {
          border-color: rgba(102, 161, 9, 0.3);
          background: rgba(102, 161, 9, 0.05);
        }

        .filter-tab.active {
          background: #66a109;
          color: #fff;
          border-color: #66a109;
        }

        /* Stats Bar below filters */
        .stats-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin-bottom: 40px;
          font-size: 13px;
          color: #777;
        }

        .filter-trigger {
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: color 0.3s;
        }
        .filter-trigger:hover { color: #66a109; }

        /* Grid */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
        }

        /* Card Styling */
        .design-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e9ecef;
          display: flex;
          flex-direction: column;
          transition: border-color 0.3s ease;
        }

        .design-card:hover {
          border-color: rgba(102, 161, 9, 0.3);
        }

        .image-container {
          position: relative;
          height: 260px;
          overflow: hidden;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .design-card:hover .image-container img {
          transform: scale(1.08);
        }

        /* Price Overlay */
        .price-overlay {
          position: absolute;
          bottom: 15px;
          right: 15px;
          background: rgba(0,0,0,0.85);
          padding: 6px 14px;
          border-radius: 6px;
          border-left: 3px solid #66a109;
          z-index: 5;
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .price-overlay .amount {
          font-family: 'DM Serif Display', serif;
          color: #66a109;
          font-size: 20px;
        }

        .price-overlay .unit {
          font-size: 10px;
          color: rgba(255,255,255,0.5);
        }

        /* Badge Overlay */
        .badge-overlay {
          position: absolute;
          top: 15px;
          left: 15px;
          font-size: 10px;
          background: rgba(102, 161, 9, 0.15);
          color: #66a109;
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid rgba(102, 161, 9, 0.3);
          backdrop-filter: blur(4px);
        }

        .card-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-title {
          font-size: 19px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .card-desc {
          font-size: 13px;
          color: #555;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .card-specs {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
          padding-top: 15px;
          border-top: 1px solid #e9ecef;
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #777;
        }

        .spec-item svg { color: #66a109; opacity: 0.6; }

        .tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 25px;
        }

        .tag-pill {
          font-size: 10px;
          background: #f1f3f5;
          padding: 3px 10px;
          border-radius: 4px;
          color: #868e96;
        }

        .order-button {
          width: 100%;
          padding: 12px;
          background: transparent;
          border: 1px solid rgba(102, 161, 9, 0.4);
          border-radius: 8px;
          color: #66a109;
          font-weight: 700;
          font-size: 14px;
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
          color: #000;
        }

        @media (max-width: 1024px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .gallery-grid { grid-template-columns: 1fr; }
          .gallery-container { padding: 0 16px; }
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
              للتنفيذ.
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
                <cat.icon size={15} />
                {cat.label}
              </button>
            ))}
          </div>

          <div className="stats-bar">
            <div className="filter-trigger">
              <Filter size={14} /> فلاتر متقدمة
            </div>
            <span>|</span>
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
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="image-container">
                    <img src={design.image} alt={design.title} />
                    {design.badge && (
                      <div className="badge-overlay">{design.badge}</div>
                    )}
                    <div className="price-overlay">
                      <span className="amount">{design.price}</span>
                      <span className="unit">درهم</span>
                    </div>
                  </div>

                  <div className="card-body">
                    <h3 className="card-title">{design.title}</h3>
                    <p className="card-desc">{design.desc}</p>

                    <div className="card-specs">
                      <div className="spec-item">
                        <Ruler size={14} /> {design.area}
                      </div>
                      {design.rooms && (
                        <div className="spec-item">
                          <Bed size={14} /> {design.rooms}
                        </div>
                      )}
                      {design.floors && (
                        <div className="spec-item">
                          <Layers size={14} /> {design.floors}
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
                      <ShoppingCart size={16} /> اطلب الآن
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
