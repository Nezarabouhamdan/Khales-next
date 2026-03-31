"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Crown, Bed, Ruler, Layers } from "lucide-react";

// Assuming your data file exists; if not, you can replace these with static strings
// import { designs, tierInfo } from "./designs-data";

export default function FeaturedShowcase() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=DM+Serif+Display&display=swap');

        .showcase-wrapper {
          position: relative;
          background-color: #f8f9fa;
          padding: 100px 20px;
          direction: rtl;
          font-family: 'Tajawal', sans-serif;
          color: #333;
        }

        .showcase-container {
          max-width: 1200px;
          margin: 0 auto; /* This ensures the entire section is centered */
        }

        /* Header Styling */
        .showcase-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 50px;
        }

        .header-text h2 {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 800;
          margin: 0;
        }

        .header-text .gold-text {
          color: #66a109;
        }

        .header-text .subtitle {
          font-size: 12px;
          color: rgba(102, 161, 9, 0.8);
          letter-spacing: 0.2em;
          display: block;
          margin-bottom: 8px;
        }

        .view-all-link {
          color: rgba(102, 161, 9, 0.6);
          text-decoration: none;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.3s ease;
        }

        .view-all-link:hover {
          color: #66a109;
        }

        /* Grid Layout */
        .showcase-grid {
          display: grid;
          grid-template-columns: 5fr 7fr; /* 2 columns: smaller left, larger right */
          gap: 24px;
          min-height: 600px;
        }

        /* Card Base Styles */
        .featured-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid #e9ecef;
          transition: border-color 0.3s ease;
        }

        .featured-card:hover {
          border-color: rgba(102, 161, 9, 0.4);
        }

        .card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .featured-card:hover .card-img {
          transform: scale(1.08);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
          z-index: 1;
        }

        .card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 32px;
          z-index: 2;
          text-align: right;
        }

        /* Large Main Card (Right Side) */
        .main-card {
          grid-column: 2;
        }

        .main-card h3 {
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 12px 0;
        }

        .main-card p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.6;
          max-width: 500px;
          margin-bottom: 24px;
        }

        /* Pricing Bar at bottom of Main Card */
        .action-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .price-tag {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .price-value {
          font-family: 'DM Serif Display', serif;
          font-size: 32px;
          color: #66a109;
        }

        .price-currency {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
        }

        .order-btn {
          background: #66a109;
          color: #050505;
          padding: 12px 32px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          border: none;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .order-btn:hover {
          background: #5a8f08;
        }

        /* Smaller Cards (Left Stack) */
        .side-stack {
          grid-column: 1;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .side-card {
          flex: 1;
          min-height: 280px;
        }

        .side-card h3 {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 16px 0;
        }

        .side-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .showcase-grid {
            grid-template-columns: 1fr;
          }
          .main-card, .side-stack {
            grid-column: 1;
          }
        }
      `}</style>

      <section className="showcase-wrapper">
        <div className="showcase-container">
          {/* Header Area */}
          <motion.div
            className="showcase-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="header-text">
              <span className="subtitle">تصاميم مميزة</span>
              <h2 className="process-title">
                اختيارات <span className="gold-text">المحررين</span>
              </h2>
            </div>

            <a href="#all" className="view-all-link">
              عرض الكل
              <ArrowLeft size={16} />
            </a>
          </motion.div>

          {/* Main Grid */}
          <div className="showcase-grid">
            {/* Left Column: Stack of 2 small cards */}
            <div className="side-stack">
              {/* Small Card 1 */}
              <motion.div
                className="featured-card side-card"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80"
                  className="card-img"
                  alt="Classic Wing"
                />
                <div className="card-overlay" />
                <div className="card-content">
                  <div style={{ marginBottom: "12px" }}>
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#66a109",
                        border: "1px solid rgba(102, 161, 9, 0.3)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      سكني
                    </span>
                  </div>
                  <h3>الجناح الكلاسيكي الجديد الفخم</h3>
                  <div className="side-footer">
                    <div className="price-tag">
                      <span
                        className="price-value"
                        style={{ fontSize: "24px" }}
                      >
                        2,000
                      </span>
                      <span className="price-currency">درهم</span>
                    </div>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.4)",
                      }}
                    >
                      65 m²
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Small Card 2 */}
              <motion.div
                className="featured-card side-card"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600607687940-472002695733?auto=format&fit=crop&q=80"
                  className="card-img"
                  alt="Modern Council"
                />
                <div className="card-overlay" />
                <div className="card-content">
                  <div style={{ marginBottom: "12px" }}>
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#66a109",
                        border: "1px solid rgba(102, 161, 9, 0.3)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      متكامل
                    </span>
                  </div>
                  <h3>المجلس الكبير المعاصر</h3>
                  <div className="side-footer">
                    <div className="price-tag">
                      <span
                        className="price-value"
                        style={{ fontSize: "24px" }}
                      >
                        5,000
                      </span>
                      <span className="price-currency">درهم</span>
                    </div>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.4)",
                      }}
                    >
                      85 m²
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Large Main Card */}
            <motion.div
              className="featured-card main-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80"
                className="card-img"
                alt="Main Villa"
              />
              <div className="card-overlay" />
              <div className="card-content">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "12px",
                  }}
                >
                  <Crown size={14} color="#66a109" />
                  <span style={{ fontSize: "12px", color: "#66a109" }}>
                    فاخر
                  </span>
                </div>
                <h3>فيلا الخوانيج العضوية</h3>
                <p>
                  تصميم فيلا ضخمة تمزج بين الأقواس الحجرية الكبيرة والهندسة
                  العضوية الحديثة المتدفقة. 6 غرف نوم مع إطلالات بانورامية.
                </p>

                {/* Stats Bar */}
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "24px",
                    opacity: 0.6,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Ruler size={14} />{" "}
                    <span style={{ fontSize: "12px" }}>1,200 m²</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Bed size={14} />{" "}
                    <span style={{ fontSize: "12px" }}>6 غرف</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Layers size={14} />{" "}
                    <span style={{ fontSize: "12px" }}>2 طوابق</span>
                  </div>
                </div>

                {/* Bottom ActionBar */}
                <div className="action-bar">
                  <button className="order-btn">اطلب الآن</button>
                  <div className="price-tag">
                    <span className="price-value">15,000</span>
                    <span className="price-currency">درهم</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
