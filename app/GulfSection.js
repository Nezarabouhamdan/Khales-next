"use client";
import React from "react";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Users, Award } from "lucide-react";

export default function GulfReachSection({ content, lang }) {
  const isRtl = lang === "ar";
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=DM+Serif+Display&display=swap');

        .gulf-section {
          background-color: #fafafa;
          padding: 120px 0;
          direction: ${isRtl ? "rtl" : "ltr"};
          font-family: 'Tajawal', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .gulf-container {
          max-width: 1250px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
        }

        /* الجانب الأيمن: النصوص والإحصائيات */
        .gulf-content {
          flex: 1;
          max-width: 500px;
          position: relative;
        }

        /* الإضاءة الخضراء الخفيفة خلف العنوان */
        .gulf-glow {
          position: absolute;
          top: 0;
          right: ${isRtl ? "auto" : "20%"};
          left: ${isRtl ? "20%" : "auto"};
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(102, 161, 9, 0.15) 0%, transparent 70%);
          z-index: 0;
          pointer-events: none;
        }

        .gulf-subtitle {
          font-size: 13px;
          color: #66a109;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
          display: block;
          position: relative;
          z-index: 1;
        }

        .gulf-title {
          font-size: clamp(36px, 4vw, 48px);
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 24px;
          line-height: 1.3;
          position: relative;
          z-index: 1;
        }

        .gulf-desc {
          font-size: 16px;
          color: #666;
          line-height: 1.8;
          margin-bottom: 50px;
          position: relative;
          z-index: 1;
        }

        /* الإحصائيات */
        .stats-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(to ${isRtl ? "right" : "left"}, rgba(102, 161, 9, 0.2), transparent);
          margin-bottom: 40px;
        }

        .stats-grid {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
        }

        .stat-item {
          text-align: ${isRtl ? "right" : "left"};
        }

        .stat-icon {
          color: #66a109;
          margin-bottom: 12px;
          opacity: 0.8;
        }

        .stat-val {
          font-family: 'DM Serif Display', serif;
          font-size: 32px;
          color: #66a109;
          line-height: 1;
          margin-bottom: 8px;
          direction: ltr;
          display: inline-block;
        }

        .stat-label {
          font-size: 12px;
          color: #888;
          font-weight: 500;
          display: block;
        }

        /* الجانب الأيسر: شبكة الدول */
        .gulf-grid {
          flex: 1.2;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .country-card {
          background: #ffffff;
          border: 1px solid #f0f0f0;
          border-radius: 16px;
          padding: 30px 24px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
        }

        .country-card:hover {
          border-color: rgba(102, 161, 9, 0.3);
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(102, 161, 9, 0.08);
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .country-name-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .country-name {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .country-icon {
          color: #66a109;
        }

        .country-code {
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
          color: #1a1a1a;
        }

        .country-desc {
          font-size: 13px;
          color: #666;
          line-height: 1.7;
          margin: 0;
        }

        /* الزخرفة العلوية والسفلية (نقاط الماس) */
        .decorator {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 20px;
          opacity: 0.3;
        }
        
        .decorator.top { top: 40px; }
        .decorator.bottom { bottom: 40px; }

        .dec-line {
          width: 80px;
          height: 1px;
          background: #66a109;
        }

        .dec-diamond {
          width: 6px;
          height: 6px;
          background: #66a109;
          transform: rotate(45deg);
        }

        @media (max-width: 1024px) {
          .gulf-container {
            flex-direction: column;
            gap: 60px;
          }
          .gulf-content {
            max-width: 100%;
            text-align: center;
          }
          .stats-divider {
            background: linear-gradient(to right, transparent, rgba(102, 161, 9, 0.2), transparent);
          }
          .stats-grid {
            justify-content: center;
            gap: 40px;
          }
          .stat-item {
            text-align: center;
          }
        }

        @media (max-width: 640px) {
          .gulf-grid {
            grid-template-columns: 1fr;
          }
          .stats-grid {
            flex-direction: column;
            align-items: center;
            gap: 30px;
          }
        }
      `}</style>

      <section className="gulf-section">
        {/* الزخرفة العلوية */}
        <div className="decorator top">
          <div
            className="dec-line"
            style={{
              background: "linear-gradient(to right, transparent, #66a109)",
            }}
          />
          <div className="dec-diamond" />
          <div
            className="dec-line"
            style={{
              background: "linear-gradient(to left, transparent, #66a109)",
            }}
          />
        </div>

        <div className="gulf-container">
          {/* النصوص والإحصائيات (اليمين) */}
          <motion.div
            className="gulf-content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="gulf-glow" />
            <span className="gulf-subtitle">{content?.badge}</span>
            <h2 className="gulf-title">{content?.title}</h2>
            <p className="gulf-desc">{content?.desc}</p>

            <div className="stats-divider" />

            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon">
                  <TrendingUp size={22} />
                </div>
                <div className="stat-val">{content?.stats?.[0]?.val}</div>
                <span className="stat-label">{content?.stats?.[0]?.label}</span>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <Users size={22} />
                </div>
                <div className="stat-val">{content?.stats?.[1]?.val}</div>
                <span className="stat-label">{content?.stats?.[1]?.label}</span>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <Award size={22} />
                </div>
                <div className="stat-val">{content?.stats?.[2]?.val}</div>
                <span className="stat-label">{content?.stats?.[2]?.label}</span>
              </div>
            </div>
          </motion.div>

          {/* شبكة الدول (اليسار) */}
          <div className="gulf-grid">
            {content?.countries?.map((country, idx) => (
              <motion.div
                key={country.code}
                className="country-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="card-top">
                  <div className="country-code">{country.code}</div>
                  <div className="country-name-wrap">
                    <span className="country-name">{country.name}</span>
                    <MapPin
                      className="country-icon"
                      size={18}
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
                <p className="country-desc">{country.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* الزخرفة السفلية */}
        <div className="decorator bottom">
          <div
            className="dec-line"
            style={{
              background: "linear-gradient(to right, transparent, #66a109)",
            }}
          />
          <div className="dec-diamond" />
          <div
            className="dec-line"
            style={{
              background: "linear-gradient(to left, transparent, #66a109)",
            }}
          />
        </div>
      </section>
    </>
  );
}
