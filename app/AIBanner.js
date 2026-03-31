"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Wand2, Cpu, Palette } from "lucide-react";

const AI_FEATURES = [
  { icon: Cpu, label: "تحليل ذكي للمساحات" },
  { icon: Palette, label: "اقتراح ألوان ومواد" },
  { icon: Wand2, label: "تعديلات فورية" },
];

export default function AIBanner() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');

        .ai-banner-section {
          background-color: #f8f9fa;
          padding: 80px 0;
          direction: rtl;
          font-family: 'Tajawal', sans-serif;
        }

        .ai-banner-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .ai-card {
          position: relative;
          background: #ffffff;
          border: 1px solid #e9ecef;
          border-radius: 24px;
          padding: 60px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        /* الجانب الأيمن: المحتوى الرئيسي (العنوان والزر) */
        .ai-main-content {
          flex: 1;
          text-align: right;
          z-index: 2;
        }

        .ai-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(102, 161, 9, 0.15);
          border: 1px solid rgba(102, 161, 9, 0.3);
          padding: 6px 16px;
          border-radius: 999px;
          margin-bottom: 25px;
        }

        .ai-badge span {
          color: #66a109;
          font-size: 13px;
          font-weight: 700;
        }

        .ai-main-content h2 {
          font-size: clamp(32px, 4vw, 42px);
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .ai-main-content h2 span {
          color: #66a109;
        }

        .ai-main-content p {
          color: #555;
          font-size: 17px;
          line-height: 1.8;
          max-width: 600px;
          margin-bottom: 35px;
        }

        .ai-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, #66a109 0%, #5a8f08 100%);
          color: #000;
          padding: 14px 35px;
          border-radius: 10px;
          font-weight: 800;
          font-size: 16px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(102, 161, 9, 0.2);
        }

        /* الجانب الأيسر: القائمة والمزايا */
        .ai-features-list {
          display: flex;
          flex-direction: column;
          gap: 25px;
          z-index: 2;
          align-items: flex-end; /* لضمان محاذاة العناصر جهة اليسار في RTL */
        }

        .ai-feature-item {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .ai-feature-label {
          color: #333;
          font-size: 16px;
          font-weight: 500;
        }

        .ai-feature-icon-box {
          width: 50px;
          height: 50px;
          background: #f1f3f5;
          border: 1px solid rgba(102, 161, 9, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #66a109;
        }

        .ai-card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 90% 10%, rgba(102, 161, 9, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 10% 90%, rgba(102, 161, 9, 0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        .corner-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(102, 161, 9, 0.3);
          border-radius: 50%;
        }
        .dot-tr { top: 15px; right: 15px; }
        .dot-bl { bottom: 15px; left: 15px; }

        @media (max-width: 1024px) {
          .ai-card {
            flex-direction: column;
            padding: 40px;
          }
          .ai-main-content { text-align: center; }
          .ai-main-content p { margin: 0 auto 30px; }
          .ai-features-list { align-items: center; flex-direction: row; flex-wrap: wrap; justify-content: center; }
        }
      `}</style>

      <section className="ai-banner-section">
        <div className="ai-banner-container">
          <motion.div
            className="ai-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="ai-card-glow" />
            <div className="corner-dot dot-tr" />
            <div className="corner-dot dot-bl" />

            {/* الجانب الأيمن: النص الأساسي */}
            <div className="ai-main-content">
              <div className="ai-badge">
                <Sparkles size={14} color="#66a109" />
                <span>تقنية جديدة</span>
              </div>
              <h2>
                تخصيص بالذكاء{" "}
                <span style={{ color: "#66a109" }}>الاصطناعي</span>
              </h2>
              <p>
                نستخدم أحدث تقنيات الذكاء الاصطناعي لتخصيص التصاميم الجاهزة حسب
                ذوقك. اختر تصميماً أساسياً وسنقوم بتعديله ليناسب احتياجاتك بدقة
                وسرعة فائقة.
              </p>
              <a href="#" className="ai-cta-button">
                <Wand2 size={20} />
                اكتشف المزيد
              </a>
            </div>

            {/* الجانب الأيسر: أيقونات المزايا */}
            <div className="ai-features-list">
              {AI_FEATURES.map((item, idx) => (
                <div key={idx} className="ai-feature-item">
                  <span className="ai-feature-label">{item.label}</span>
                  <div className="ai-feature-icon-box">
                    <item.icon size={22} strokeWidth={1.5} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
