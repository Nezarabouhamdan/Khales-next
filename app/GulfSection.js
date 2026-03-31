"use client";
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Award, TrendingUp } from "lucide-react";

const GULF_MARKETS = [
  {
    code: "AE",
    name: "الإمارات",
    desc: "مقرنا الرئيسي في دبي مع خدمة جميع الإمارات",
  },
  {
    code: "SA",
    name: "السعودية",
    desc: "طلب متزايد على تصاميم الفلل الفاخرة في الرياض وجدة",
  },
  {
    code: "QA",
    name: "قطر",
    desc: "سوق متنامي للتصاميم المعمارية الراقية في الدوحة",
  },
  {
    code: "OM",
    name: "عُمان",
    desc: "فرص واعدة في مسقط والمناطق السياحية",
  },
];

const STATS = [
  { icon: Award, value: "10+", label: "سنوات خبرة" },
  { icon: Users, value: "2,000+", label: "عميل محتمل شهرياً" },
  { icon: TrendingUp, value: "85%", label: "نمو الطلب سنوياً" },
];

export default function GulfSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=DM+Serif+Display&display=swap');

        .gulf-wrapper {
          background-color: #f8f9fa;
          padding: 120px 0;
          direction: rtl;
          font-family: 'Tajawal', sans-serif;
          color: #333;
          position: relative;
        }

        .gulf-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Decoration Lines */
        .section-decorator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          opacity: 0.2;
          margin: 0 auto;
        }
        .decorator-top { margin-bottom: 80px; }
        .decorator-bottom { margin-top: 80px; }

        .dec-line {
          width: 80px;
          height: 1px;
          background: linear-gradient(to left, transparent, #66a109, transparent);
        }
        .dec-diamond {
          width: 6px;
          height: 6px;
          background: #66a109;
          transform: rotate(45deg);
        }

        /* Main Layout Grid */
        .gulf-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        /* Left Side: Cards Grid (2x2) */
        .cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .market-card {
          background: #ffffff;
          border: 1px solid #e9ecef;
          border-radius: 12px;
          padding: 30px;
          text-align: right;
          transition: all 0.4s ease;
          position: relative;
        }

        .market-card:hover {
          border-color: rgba(102, 161, 9, 0.3);
          background: #ffffff;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
        }

        .market-code {
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
          color: #1a1a1a;
          margin-bottom: 15px;
          display: block;
          opacity: 0.9;
        }

        .market-name-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .market-name-row h3 {
          font-size: 18px;
          font-weight: 700;
          margin: 0;
        }

        .market-name-row svg {
          color: #66a109;
          opacity: 0.6;
        }

        .market-desc {
          font-size: 13px;
          color: #777;
          line-height: 1.6;
          margin: 0;
        }

        /* Right Side: Content & Stats */
        .gulf-content {
          text-align: right;
        }

        .gulf-tag {
          font-size: 12px;
          color: rgba(102, 161, 9, 0.8);
          letter-spacing: 0.1em;
          margin-bottom: 15px;
          display: block;
        }

        .gulf-content h2 {
          font-size: clamp(32px, 4vw, 44px);
          font-weight: 800;
          line-height: 1.3;
          margin-bottom: 25px;
        }

        .gulf-content h2 span {
          color: #66a109;
        }

        .gulf-content p {
          font-size: 16px;
          color: #555;
          line-height: 1.8;
          margin-bottom: 40px;
          max-width: 500px;
        }

        /* Stats Row */
        .gulf-stats-row {
          display: flex;
          gap: 40px;
          border-top: 1px solid #e9ecef;
          padding-top: 30px;
        }

        .stat-box {
          text-align: center;
        }

        .stat-box svg {
          color: #66a109;
          margin-bottom: 12px;
          opacity: 0.8;
        }

        .stat-val {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          color: #66a109;
          display: block;
          margin-bottom: 4px;
        }

        .stat-lbl {
          font-size: 11px;
          color: #777;
        }

        @media (max-width: 1024px) {
          .gulf-main-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 50px;
          }
          .gulf-content { text-align: center; }
          .gulf-content p { margin: 0 auto 40px; }
          .gulf-stats-row { justify-content: center; }
          .cards-grid { max-width: 600px; margin: 0 auto; }
        }

        @media (max-width: 640px) {
          .cards-grid { grid-template-columns: 1fr; }
          .gulf-stats-row { gap: 20px; }
        }
      `}</style>

      <section className="gulf-wrapper">
        <div className="gulf-container">
          {/* Top Decorator Line */}
          <div className="section-decorator decorator-top">
            <div className="dec-line" />
            <div className="dec-diamond" />
            <div className="dec-line" />
          </div>

          <div className="gulf-main-grid">
            {" "}
            {/* Right Side: Content & Stats */}
            <div className="gulf-content">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="gulf-tag">أسواق الخليج</span>
                <h2>
                  نخدم جميع <span>دول الخليج</span>
                </h2>
                <p>
                  تصاميمنا الجاهزة متاحة لجميع دول مجلس التعاون الخليجي. مع
                  الطلب المتزايد على الفلل الفاخرة في المنطقة، نقدم حلولاً
                  تصميمية تناسب الذوق الخليجي الرفيع.
                </p>

                <div className="gulf-stats-row">
                  {STATS.map((stat, idx) => (
                    <div key={idx} className="stat-box">
                      <stat.icon size={22} />
                      <span className="stat-val">{stat.value}</span>
                      <span className="stat-lbl">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            {/* Left Side: Cards Grid (2x2) */}
            <div className="cards-grid">
              {GULF_MARKETS.map((market, idx) => (
                <motion.div
                  key={market.code}
                  className="market-card"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span className="market-code">{market.code}</span>
                  <div className="market-name-row">
                    <MapPin size={14} />
                    <h3>{market.name}</h3>
                  </div>
                  <p className="market-desc">{market.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Decorator Line */}
          <div className="section-decorator decorator-bottom">
            <div className="dec-line" />
            <div className="dec-diamond" />
            <div className="dec-line" />
          </div>
        </div>
      </section>
    </>
  );
}
