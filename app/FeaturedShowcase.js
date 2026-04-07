"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Crown, Bed, Ruler, Layers } from "lucide-react";
import Link from "next/link";

export default function FeaturedShowcase({ content, lang }) {
  const isRtl = lang === "ar";
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=DM+Serif+Display&display=swap');

        .showcase-wrapper {
          position: relative;
          background-color: #ffffff; /* خلفية بيضاء نظيفة */
          padding: 100px 20px;
          direction: ${isRtl ? "rtl" : "ltr"};
          font-family: 'Tajawal', sans-serif;
          color: #0a0a0a;
        }

        .showcase-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Header Styling */
        .showcase-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 50px;
        }

        .header-text h2 {
          font-size: clamp(32px, 5vw, 42px);
          font-weight: 800;
          margin: 0;
          color: #0a0a0a;
        }

        .header-text .gold-text {
          color: #66a109;
        }

        .header-text .subtitle {
          font-size: 14px;
          color: #66a109;
          font-weight: 700;
          display: block;
          margin-bottom: 8px;
        }

        .view-all-link {
          color: rgba(10, 10, 10, 0.5);
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
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
          grid-template-columns: 5fr 7fr;
          gap: 30px;
          min-height: 600px;
        }

        /* Card Base Styles */
        .featured-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          background: #111;
          box-shadow: 0 20px 40px rgba(0,0,0,0.06); /* ظل ناعم بدل الـ Border */
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .featured-card:hover {
          transform: translateY(-5px);
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

        .featured-card:hover .card-img {
          transform: scale(1.05);
        }

        /* Gradient Overlay - صار أغمق شوي من تحت عشان يبرز النص الأبيض */
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
          color: #ffffff; /* إجبار كل النصوص على الأبيض */
        }

        /* Tags / Badges */
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

        .badge-glass {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          color: #ffffff;
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
        }

        /* Large Main Card */
        .main-card {
          grid-column: 2;
        }
        
        .main-card .card-content {
          padding: 40px;
        }

        .main-card h3 {
          font-size: 36px;
          font-weight: 800;
          margin: 0 0 16px 0;
          color: #ffffff;
          line-height: 1.2;
        }

        .main-card p {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          max-width: 500px;
          margin-bottom: 28px;
        }

        /* Stats Bar */
        .stats-bar {
          display: flex;
          gap: 24px;
          margin-bottom: 32px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          font-weight: 500;
        }

        /* Action Bar at bottom of Main Card */
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
          font-size: 36px;
          color: #ffffff; /* السعر بالأبيض أفضل بكثير وأفخم */
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
          padding: 14px 36px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 15px;
          border: none;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.2s ease;
        }

        .order-btn:hover {
          background: #5a8f08;
          transform: scale(1.02);
        }

        /* Smaller Cards (Left Stack) */
        .side-stack {
          grid-column: 1;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .side-card {
          flex: 1;
          min-height: 280px;
        }

        .side-card h3 {
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 20px 0;
          color: #ffffff;
        }

        .side-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .side-footer .price-value {
          font-size: 28px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .showcase-grid {
            grid-template-columns: 1fr;
          }
          .main-card, .side-stack {
            grid-column: 1;
          }
          .main-card {
            min-height: 500px;
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
              <span className="subtitle">{content?.subtitle}</span>
              <h2 className="process-title">
                {content?.title1}{" "}
                <span className="gold-text">{content?.title2}</span>
              </h2>
            </div>

            <a href="#all" className="view-all-link">
              {content?.viewAll}
              {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </a>
          </motion.div>

          {/* Main Grid */}
          <div className="showcase-grid">
            {/* Left Column: Stack of 2 small cards */}
            <div className="side-stack">
              {/* Small Card 1 */}
              <Link
                href={`/${lang}/ready-designs/1`}
                style={{ textDecoration: "none" }}
                className="featured-card side-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80"
                  className="card-img"
                  alt="Classic Wing"
                />
                <div className="card-overlay" />
                <div className="card-content">
                  <div className="badge-primary">{content?.card1?.badge}</div>
                  <h3>{content?.card1?.title}</h3>
                  <div className="side-footer">
                    <div className="price-tag">
                      <span className="price-value" dir="ltr">
                        2,000
                      </span>
                      <span className="price-currency">
                        {content?.currency}
                      </span>
                    </div>
                    <div className="badge-glass">65 m²</div>
                  </div>
                </div>
              </Link>

              {/* Small Card 2 */}
              <Link
                href={`/${lang}/ready-designs/2`}
                style={{ textDecoration: "none" }}
                className="featured-card side-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
                  className="card-img"
                  alt="المجلس الكبير المعاصر"
                />
                <div className="card-overlay" />
                <div className="card-content">
                  <div className="badge-primary">{content?.card2?.badge}</div>
                  <h3>{content?.card2?.title}</h3>
                  <div className="side-footer">
                    <div className="price-tag">
                      <span className="price-value" dir="ltr">
                        5,000
                      </span>
                      <span className="price-currency">
                        {content?.currency}
                      </span>
                    </div>
                    <div className="badge-glass">85 m²</div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Column: Large Main Card */}
            <Link
              href={`/${lang}/ready-designs/3`}
              style={{ textDecoration: "none" }}
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
                <div className="badge-primary">
                  <Crown size={14} />
                  <span>{content?.mainCard?.badge}</span>
                </div>

                <h3>{content?.mainCard?.title}</h3>
                <p>{content?.mainCard?.desc}</p>

                {/* Stats Bar */}
                <div className="stats-bar">
                  <div className="stat-item">
                    <Ruler size={18} color="#66a109" />
                    <span dir="ltr">1,200 m²</span>
                  </div>
                  <div className="stat-item">
                    <Bed size={18} color="#66a109" />
                    <span>6 غرف</span>
                  </div>
                  <div className="stat-item">
                    <Layers size={18} color="#66a109" />
                    <span>2 طوابق</span>
                  </div>
                </div>

                {/* Bottom ActionBar */}
                <div className="action-bar">
                  <div className="price-tag">
                    <span className="price-value" dir="ltr">
                      15,000
                    </span>
                    <span className="price-currency">{content?.currency}</span>
                  </div>
                  <div
                    className="order-btn"
                    style={{ display: "inline-block" }}
                  >
                    {content?.mainCard?.btn}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
