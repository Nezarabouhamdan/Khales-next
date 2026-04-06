"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, Crown, Diamond, Star } from "lucide-react";

const PACKAGE_ICONS = [Star, Crown, Diamond];

export default function PricingSection({ content, lang }) {
  const isRtl = lang === "ar";
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=DM+Serif+Display&display=swap');

        .pricing-section {
          background-color: #fafafa; /* رمادي فاتح جداً يبرز الكروت البيضاء */
          padding: 120px 0;
          direction: ${isRtl ? "rtl" : "ltr"};
          font-family: 'Tajawal', sans-serif;
          color: #1a1a1a;
          position: relative;
        }

        .pricing-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Header */
        .pricing-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .pricing-header .tag {
          font-size: 13px;
          font-weight: 700;
          color: #66a109;
          letter-spacing: 0.1em;
          margin-bottom: 15px;
          display: block;
        }

        .pricing-header h2 {
          font-size: clamp(32px, 5vw, 44px);
          font-weight: 800;
          margin-bottom: 20px;
          color: #0a0a0a;
        }

        .pricing-header h2 span {
          color: #66a109;
        }

        .pricing-header p {
          color: #666;
          font-size: 16px;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Grid */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          align-items: center; /* عشان الكرت اللي بالنص يكبر براحته بدون ما يخرب المحاذاة */
        }

        /* Cards */
        .price-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 45px 35px;
          position: relative;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(0,0,0,0.04);
          border: 1px solid transparent;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          min-height: 600px;
        }

        .price-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }

        .price-card.featured {
          border: 1px solid rgba(102, 161, 9, 0.2);
          box-shadow: 0 20px 50px rgba(102, 161, 9, 0.12);
          transform: scale(1.05);
          z-index: 5;
          padding: 55px 35px; /* أطول شوي من الباقي */
          background: #ffffff;
        }

        .price-card.featured:hover {
          transform: scale(1.05) translateY(-5px);
        }

        .card-badge {
          position: absolute;
          top: -15px;
          right: 50%;
          transform: translateX(50%);
          background: #66a109;
          color: #fff;
          padding: 8px 24px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(102, 161, 9, 0.3);
          white-space: nowrap;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 25px;
        }

        .pkg-name h3 {
          font-size: 28px;
          font-weight: 800;
          color: #0a0a0a;
          margin: 0;
        }

        .pkg-name .tier {
          font-size: 14px;
          font-weight: 600;
          color: #66a109;
          display: block;
          margin-top: 6px;
        }

        .pkg-icon {
          width: 52px;
          height: 52px;
          background: rgba(102, 161, 9, 0.08);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #66a109;
        }

        /* Pricing - الرقم بالأسود يعطي فخامة */
        .price-box {
          margin-bottom: 24px;
          display: flex;
          align-items: baseline;
          gap: 8px;
          padding-bottom: 24px;
          border-bottom: 1px solid #f0f0f0;
        }

        .price-box .val {
          font-family: 'DM Serif Display', serif;
          font-size: 52px;
          color: #0a0a0a; /* أسود بدل أخضر */
          line-height: 1;
        }

        .price-box .currency {
          font-size: 16px;
          font-weight: 600;
          color: #66a109;
        }

        .pkg-desc {
          font-size: 14px;
          color: #666;
          line-height: 1.7;
          margin-bottom: 35px;
          text-align: right;
        }

        /* Features List */
        .features-list {
          list-style: none;
          padding: 0;
          margin: 0 0 45px 0;
          flex-grow: 1;
          text-align: right;
        }

        .feature-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 18px;
          font-size: 15px;
          color: #444;
          font-weight: 500;
        }

        /* تنسيق علامة الصح داخل دائرة مرتبة */
        .check-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(102, 161, 9, 0.15);
          color: #66a109;
          flex-shrink: 0;
        }

        /* Button */
        .action-btn {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          font-family: 'Tajawal', sans-serif;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          border: 1px solid #e0e0e0;
          background: #fafafa;
          color: #333;
        }

        .action-btn.primary {
          background: #66a109;
          border: none;
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(102, 161, 9, 0.25);
        }

        .action-btn:hover {
          transform: translateY(-3px);
          background: #5a8f08;
          color: #fff;
          border-color: #5a8f08;
          box-shadow: 0 12px 25px rgba(102, 161, 9, 0.3);
        }

        .pricing-note {
          text-align: center;
          margin-top: 60px;
          font-size: 14px;
          color: #888;
        }

        @media (max-width: 1024px) {
          .pricing-grid {
            grid-template-columns: 1fr;
            max-width: 450px;
            margin: 0 auto;
            gap: 40px;
          }
          .price-card.featured { transform: scale(1); padding: 45px 35px; }
          .price-card.featured:hover { transform: translateY(-5px); }
        }
      `}</style>

      <section className="pricing-section">
        <div className="pricing-container">
          <motion.div
            className="pricing-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>
              {content?.title1} <span>{content?.title2}</span> {content?.title3}
            </h2>
            <p>{content?.desc}</p>
          </motion.div>

          <div className="pricing-grid">
            {content?.packages?.map((item, idx) => {
              const IconComp = PACKAGE_ICONS[idx] || Star;
              return (
                <motion.div
                  key={item.id}
                  className={`price-card ${item.highlight ? "featured" : ""}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                >
                  {item.badge && <div className="card-badge">{item.badge}</div>}

                  <div className="card-top">
                    <div className="pkg-name">
                      <h3>{item.name}</h3>
                      <span className="tier">{item.tier}</span>
                    </div>
                    <div className="pkg-icon">
                      <IconComp size={24} strokeWidth={2.5} />
                    </div>
                  </div>

                  <div className="price-box">
                    <span className="val" dir="ltr">
                      {item.price}
                    </span>
                    <span className="currency">{content?.currency}</span>
                  </div>

                  <p className="pkg-desc">{item.desc}</p>

                  <ul className="features-list">
                    {item.features.map((feat, fIdx) => (
                      <li key={fIdx} className="feature-row">
                        <span className="check-circle">
                          <Check size={12} strokeWidth={4} />
                        </span>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`action-btn ${item.highlight ? "primary" : ""}`}
                  >
                    {content?.selectPlan}
                  </button>
                </motion.div>
              );
            })}
          </div>

          <div className="pricing-note">{content?.note}</div>
        </div>
      </section>
    </>
  );
}
