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
          background-color: #fafafa;
          padding: 80px 0;
          direction: rtl;
          font-family: 'Tajawal', sans-serif;
        }

        .ai-banner-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* الكرت الرئيسي */
        .ai-card {
          position: relative;
          background: #ffffff;
          border: 1px solid rgba(102, 161, 9, 0.1);
          border-radius: 32px; /* زوايا أنعم */
          padding: 60px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.03); /* ظل عميق وفخم */
        }

        /* تأثير ضوئي ذكي وخفيف جداً في الزاوية */
        .ai-card::before {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(102,161,9,0.05) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        /* الجانب الأيمن: المحتوى الرئيسي */
        .ai-main-content {
          flex: 1;
          text-align: right;
          z-index: 2;
        }

        /* تصميم الـ Badge */
        .ai-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1px solid rgba(102, 161, 9, 0.2);
          padding: 8px 18px;
          border-radius: 100px;
          margin-bottom: 24px;
          box-shadow: 0 4px 15px rgba(102, 161, 9, 0.05);
        }

        .ai-badge span {
          color: #66a109;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .ai-main-content h2 {
          font-size: clamp(32px, 4vw, 42px);
          font-weight: 800;
          color: #0a0a0a;
          margin-bottom: 20px;
          line-height: 1.3;
        }

        .ai-main-content h2 span {
          color: #66a109;
        }

        .ai-main-content p {
          color: #666;
          font-size: 16px;
          line-height: 1.8;
          max-width: 550px;
          margin-bottom: 35px;
        }

        /* زر Call to Action */
        .ai-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #66a109; /* أخضر سادة أنظف من التدرج */
          color: #ffffff; /* النص الأبيض يرفع مستوى الفخامة */
          padding: 16px 36px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 16px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(102, 161, 9, 0.25);
        }

        .ai-cta-button:hover {
          background: #5a8f08;
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(102, 161, 9, 0.35);
        }

        /* الجانب الأيسر: القائمة والمزايا شكل كبسولات */
        .ai-features-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          z-index: 2;
        }

        .ai-feature-item {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #ffffff;
          border: 1px solid #f0f0f0;
          padding: 12px 24px;
          border-radius: 100px; /* شكل كبسولة فخم */
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          transition: all 0.3s ease;
          cursor: default;
        }

        .ai-feature-item:hover {
          transform: translateX(-8px); /* حركة خفيفة لليسار عند التمرير */
          border-color: rgba(102, 161, 9, 0.3);
          box-shadow: 0 8px 25px rgba(102, 161, 9, 0.08);
        }

        .ai-feature-icon-box {
          width: 44px;
          height: 44px;
          background: rgba(102, 161, 9, 0.06);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #66a109;
        }

        .ai-feature-label {
          color: #1a1a1a;
          font-size: 15px;
          font-weight: 700;
        }

        /* نقاط ديكور في الزوايا */
        .corner-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(102, 161, 9, 0.2);
          border-radius: 50%;
        }
        .dot-tr { top: 25px; right: 25px; }
        .dot-bl { bottom: 25px; left: 25px; }

        @media (max-width: 1024px) {
          .ai-card {
            flex-direction: column;
            padding: 40px 24px;
            text-align: center;
          }
          .ai-main-content {
            text-align: center;
          }
          .ai-main-content p {
            margin: 0 auto 35px;
          }
          .ai-features-list {
            width: 100%;
          }
          .ai-feature-item {
            justify-content: flex-start;
          }
          .ai-feature-item:hover {
            transform: translateY(-5px); /* تغيير الحركة في الجوال لتكون للأعلى */
          }
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
            <div className="corner-dot dot-tr" />
            <div className="corner-dot dot-bl" />

            {/* الجانب الأيمن: النص الأساسي */}
            <div className="ai-main-content">
              <div className="ai-badge">
                <Sparkles size={16} color="#66a109" />
                <span>مدعوم بالذكاء الاصطناعي</span>
              </div>

              <h2>
                تخصيص التصاميم{" "}
                <span style={{ color: "#66a109" }}>بلمسة سحرية</span>
              </h2>

              <p>
                نستخدم أحدث تقنيات الذكاء الاصطناعي لتخصيص التصاميم الجاهزة حسب
                ذوقك. اختر تصميماً أساسياً وسنقوم بتعديله ليناسب احتياجاتك بدقة
                وسرعة فائقة.
              </p>

              <a href="#" className="ai-cta-button">
                <Wand2 size={20} />
                ابدأ التخصيص الآن
              </a>
            </div>

            {/* الجانب الأيسر: أيقونات المزايا */}
            <div className="ai-features-list">
              {AI_FEATURES.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="ai-feature-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                >
                  <div className="ai-feature-icon-box">
                    <item.icon size={20} strokeWidth={2} />
                  </div>
                  <span className="ai-feature-label">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
