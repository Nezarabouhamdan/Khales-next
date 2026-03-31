"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, Crown, Diamond, Star } from "lucide-react";

const PACKAGES = [
  {
    id: "basic",
    name: "أساسي",
    tier: "برونزي",
    price: "2,000",
    desc: "باقة التصميم الأساسية مع المخططات الأرضية والتصور ثلاثي الأبعاد الأساسي.",
    features: [
      "المخططات الأرضية",
      "عروض ثلاثية الأبعاد أساسية",
      "لوحة المواد",
      "ملخص التصميم",
    ],
    icon: Star,
    highlight: false,
  },
  {
    id: "pro",
    name: "متكامل",
    tier: "ذهبي",
    price: "5,000",
    desc: "باقة تصميم كاملة مع مخططات تفصيلية وعروض ثلاثية الأبعاد ومواصفات المواد.",
    features: [
      "مخططات أرضية تفصيلية",
      "عروض ثلاثية الأبعاد كاملة",
      "مواصفات المواد",
      "تخطيط الأثاث",
      "مخطط الإضاءة",
      "نظام الألوان",
    ],
    icon: Crown,
    highlight: true,
    badge: "الأكثر طلباً",
  },
  {
    id: "luxury",
    name: "فاخر",
    tier: "بلاتيني",
    price: "15,000",
    desc: "تصميم فاخر مخصص مع توثيق معماري كامل وجولة واقع افتراضي واستشارة.",
    features: [
      "توثيق معماري كامل",
      "عروض ثلاثية الأبعاد فاخرة",
      "جولة واقع افتراضي",
      "دليل مصادر المواد",
      "استشارة شخصية",
      "ملاحظات إشراف البناء",
      "خطة المنزل الذكي",
    ],
    icon: Diamond,
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=DM+Serif+Display&display=swap');

        .pricing-section {
          background-color: #f8f9fa;
          padding: 120px 0;
          direction: rtl;
          font-family: 'Tajawal', sans-serif;
          color: #333;
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
          color: rgba(102, 161, 9, 0.8);
          letter-spacing: 0.1em;
          margin-bottom: 15px;
          display: block;
        }

        .pricing-header h2 {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 800;
          margin-bottom: 20px;
          color: #1a1a1a;
        }

        .pricing-header h2 span {
          color: #66a109;
        }

        .pricing-header p {
          color: #555;
          font-size: 16px;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Grid */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: stretch;
        }

        /* Cards */
        .price-card {
          background: #ffffff;
          border: 1px solid #e9ecef;
          border-radius: 20px;
          padding: 50px 35px;
          position: relative;
          display: flex;
          flex-direction: column;
          transition: all 0.4s ease;
        }

        .price-card.featured {
          border: 1px solid rgba(102, 161, 9, 0.4);
          background: #ffffff;
          transform: scale(1.03);
          z-index: 5;
        }

        .card-badge {
          position: absolute;
          top: -16px;
          right: 50%;
          transform: translateX(50%);
          background: #66a109;
          color: #fff;
          padding: 6px 24px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 800;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 25px;
        }

        .pkg-name h3 {
          font-size: 30px;
          font-weight: 800;
          margin: 0;
        }

        .pkg-name .tier {
          font-size: 14px;
          color: #66a109;
          display: block;
          margin-top: 4px;
        }

        .pkg-icon {
          width: 48px;
          height: 48px;
          background: rgba(102, 161, 9, 0.05);
          border: 1px solid rgba(102, 161, 9, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #66a109;
        }

        /* Pricing */
        .price-box {
          margin-bottom: 30px;
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .price-box .val {
          font-family: 'DM Serif Display', serif;
          font-size: 48px;
          color: #66a109;
        }

        .price-box .currency {
          font-size: 16px;
          color: #777;
        }

        .pkg-desc {
          font-size: 14px;
          color: #555;
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
          gap: 12px;
          margin-bottom: 18px;
          font-size: 15px;
          color: #333;
        }

        .feature-row svg {
          color: #66a109;
          opacity: 0.6;
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
          border: 1px solid #adb5bd;
          background: transparent;
          color: #333;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #66a109 0%, #5a8f08 100%);
          border: none;
          color: #000;
          box-shadow: 0 10px 25px rgba(102, 161, 9, 0.2);
        }

        .action-btn:hover {
          transform: translateY(-3px);
          border-color: #66a109 !important;
          background: #66a109;
          color: #fff;
        }

        .pricing-note {
          text-align: center;
          margin-top: 50px;
          font-size: 13px;
          color: #868e96;
        }

        @media (max-width: 1024px) {
          .pricing-grid {
            grid-template-columns: 1fr;
            max-width: 450px;
            margin: 0 auto;
            gap: 40px;
          }
          .price-card.featured { transform: scale(1); }
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
            <span className="tag">باقات التصميم</span>
            <h2>
              اختر <span>باقتك</span> المثالية
            </h2>
            <p>ثلاث فئات سعرية مصممة لتناسب جميع الاحتياجات والميزانيات</p>
          </motion.div>

          <div className="pricing-grid">
            {PACKAGES.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.id}
                  className={`price-card ${item.highlight ? "featured" : ""}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {item.badge && <div className="card-badge">{item.badge}</div>}

                  <div className="card-top">
                    <div className="pkg-name">
                      <h3>{item.name}</h3>
                      <span className="tier">{item.tier}</span>
                    </div>
                    <div className="pkg-icon">
                      <IconComp size={24} />
                    </div>
                  </div>

                  <div className="price-box">
                    <span className="val">{item.price}</span>
                    <span className="currency">درهم</span>
                  </div>

                  <p className="pkg-desc">{item.desc}</p>

                  <ul className="features-list">
                    {item.features.map((feat, fIdx) => (
                      <li key={fIdx} className="feature-row">
                        <Check size={18} strokeWidth={3} />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`action-btn ${item.highlight ? "primary" : ""}`}
                  >
                    استعرض التصاميم
                  </button>
                </motion.div>
              );
            })}
          </div>

          <div className="pricing-note">
            جميع الأسعار بالدرهم الإماراتي. يمكن تخصيص أي تصميم حسب طلبك بتكلفة
            إضافية.
          </div>
        </div>
      </section>
    </>
  );
}
