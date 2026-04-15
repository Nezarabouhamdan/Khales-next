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
  Crown,
} from "lucide-react";
import Link from "next/link";

const CATEGORIES_ICONS = {
  all: Layout,
  villas: Home,
  interior: Layout,
  commercial: Briefcase,
  landscaping: Palmtree,
};

export default function DesignsGallery({ content, lang }) {
  const isRtl = lang === "ar";
  const [activeFilter, setActiveFilter] = useState("all");
  const galleryDesigns = content?.designs || [];
  const filteredDesigns =
    activeFilter === "all"
      ? galleryDesigns
      : galleryDesigns.filter((d) => d.category === activeFilter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=DM+Serif+Display&display=swap');

        .gallery-section {
          background-color: #fcfcfc; /* لون أبيض مريح جداً */
          padding: 100px 0;
          direction: ${isRtl ? "rtl" : "ltr"};
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
          color: #0a0a0a;
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
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          background: #111;
          box-shadow: 0 20px 40px rgba(0,0,0,0.06);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          min-height: 520px;
          display: flex;
          flex-direction: column;
        }

        .design-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 60px rgba(102, 161, 9, 0.15);
        }

        .card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .design-card:hover .card-img {
          transform: scale(1.05);
        }

        /* Gradient Overlay */
        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.1) 100%);
          z-index: 1;
        }

        .card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 32px;
          z-index: 2;
          text-align: ${isRtl ? "right" : "left"};
          color: #ffffff; 
        }

        .badge-primary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #66a109;
          color: #ffffff;
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .design-card h3 {
          font-size: 26px;
          font-weight: 800;
          margin: 0 0 16px 0;
          color: #ffffff;
          line-height: 1.2;
        }

        .design-card .card-desc {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 22px;
        }

        .tag-pill {
          background: rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.9);
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        /* Stats Bar */
        .stats-bar {
          display: flex;
          gap: 20px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          font-weight: 500;
        }

        /* Action Bar */
        .action-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }

        .price-tag {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .price-value {
          font-family: 'DM Serif Display', serif;
          font-size: 32px;
          color: #ffffff; 
          line-height: 1;
        }

        .price-currency {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
        }

        .order-btn {
          background: #66a109;
          color: #ffffff;
          padding: 12px 28px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          border: none;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.2s ease;
        }

        .order-btn:hover {
          background: #5a8f08;
          transform: scale(1.02);
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
            <span className="top-label">{content?.topLabel}</span>
            <h2>
              {content?.title1}{" "}
              <span style={{ color: "#66a109" }}>{content?.title2}</span>{" "}
              {content?.title3}
            </h2>
          </motion.div>

          {/* Filters Area */}
          <div className="filters-wrapper">
            {content?.filters?.map((cat) => {
              const IconComp = CATEGORIES_ICONS[cat.id] || Layout;
              return (
                <button
                  key={cat.id}
                  className={`filter-tab ${activeFilter === cat.id ? "active" : ""}`}
                  onClick={() => setActiveFilter(cat.id)}
                >
                  <IconComp size={16} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="stats-bar">
            <div className="filter-trigger">
              <Filter size={16} /> {content?.advancedFilters}
            </div>
            <span style={{ color: "#ccc" }}>|</span>
            <div>
              {content?.showing} {filteredDesigns.length} {content?.designWord}
            </div>
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
                  <img
                    src={design.image}
                    alt={design.title}
                    className="card-img"
                  />
                  <div className="card-overlay" />

                  <div className="card-content">
                    {design.badge && (
                      <div className="badge-primary">
                        {design.badge === "فاخر" && <Crown size={14} />}
                        <span>{design.badge}</span>
                      </div>
                    )}
                    <h3>{design.title}</h3>
                    <p className="card-desc">{design.desc}</p>

                    <div className="tags-row">
                      {design.tags.map((tag) => (
                        <span key={tag} className="tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="stats-bar">
                      <div className="spec-item">
                        <Ruler size={16} color="#66a109" />
                        <span dir="ltr">{design.area}</span>
                      </div>
                      {design.rooms && (
                        <div className="spec-item">
                          <Bed size={16} color="#66a109" />
                          <span>{design.rooms}</span>
                        </div>
                      )}
                      {design.floors && (
                        <div className="spec-item">
                          <Layers size={16} color="#66a109" />
                          <span>{design.floors}</span>
                        </div>
                      )}
                    </div>

                    <div className="action-bar">
                      <div className="price-tag">
                        <span className="price-value" dir="ltr">
                          {design.price}
                        </span>
                        <span className="price-currency">
                          {design.currency}
                        </span>
                      </div>
                      <Link
                        href={`/${lang}/ready-designs/${design.id}`}
                        className="order-btn"
                        style={{
                          textDecoration: "none",
                          display: "inline-block",
                        }}
                      >
                        {content?.orderBtn}
                      </Link>
                    </div>
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
