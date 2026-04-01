"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

const HERO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663030860046/giFYBDeFxbGe42Yyw8PTCg/hero-banner-dHKNucphgnCkPtvLjoZXtv.webp";

export default function HeroSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=DM+Serif+Display&display=swap');

        .hero-section-wrapper {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          direction: rtl;
          font-family: 'Tajawal', sans-serif;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(10, 10, 10, 0.85) 0%,
            rgba(10, 10, 10, 0.55) 40%,
            rgba(10, 10, 10, 0.95) 100%
          );
        }

        .hero-content {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          padding: 100px 24px 60px;
          text-align: center;
        }

        /* Badge - جعلناه أنيق وشفاف أكثر */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          margin-bottom: 28px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .hero-badge span {
          font-family: 'Tajawal', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
          letter-spacing: 0.03em;
        }

        /* Heading - توحيد اللون للأبيض يعطي فخامة */
        .hero-title {
          font-family: 'Tajawal', sans-serif;
          font-size: clamp(52px, 8vw, 88px);
          font-weight: 800;
          line-height: 1.35;
          margin: 0 0 28px;
          text-shadow: 0 4px 24px rgba(0,0,0,0.4);
        }

        .hero-title .line-white {
          color: #ffffff;
          display: block;
        }

        /* غيرنا الكلاس بس احتفظنا فيه لو حبيت ترجع تعدل مستقبلاً */
        .hero-title .line-gold {
          color: #ffffff; 
          display: block;
        }

        /* Description */
        .hero-description {
          max-width: 640px;
          margin: 0 auto 40px;
          font-family: 'Tajawal', sans-serif;
          font-size: clamp(15px, 2vw, 18px);
          line-height: 1.85;
          color: rgba(248, 246, 240, 0.8);
          font-weight: 400;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        /* Buttons */
        .hero-buttons {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 80px;
        }

        /* الزر الرئيسي هو الوحيد اللي بيحتفظ بلون البراند بقوة */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 44px;
          background: #66a109;
          color: #ffffff; /* خليت النص أبيض بدل أسود ليكون متناسق أكثر، جربها */
          font-family: 'Tajawal', sans-serif;
          font-weight: 700;
          font-size: 17px;
          border-radius: 4px;
          text-decoration: none;
          min-width: 200px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 20px rgba(102, 161, 9, 0.2);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(102, 161, 9, 0.35);
          background: #5a8f08;
        }

        /* الزر الثانوي صار زجاجي أبيض أنيق */
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 44px;
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          font-family: 'Tajawal', sans-serif;
          font-weight: 700;
          font-size: 17px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 4px;
          text-decoration: none;
          min-width: 200px;
          transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease;
          backdrop-filter: blur(8px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: #ffffff;
          transform: translateY(-3px);
        }

        /* Stats - الأرقام بالأبيض أفضل بكثير */
        .hero-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(30px, 6vw, 80px);
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(32px, 4.5vw, 48px);
          color: #ffffff; 
          margin-bottom: 6px;
          display: block;
          line-height: 1;
        }

        .stat-label {
          font-family: 'Tajawal', sans-serif;
          font-size: clamp(13px, 1.5vw, 16px);
          color: rgba(255, 255, 255, 0.6);
          display: block;
        }

        .stat-divider {
          width: 1px;
          height: 60px;
          background: rgba(255, 255, 255, 0.2);
        }

        /* Scroll indicator */
        .hero-scroll {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          opacity: 0.65;
          transition: opacity 0.2s;
        }

        .hero-scroll:hover {
          opacity: 1;
        }

        .hero-scroll span {
          font-family: 'Tajawal', sans-serif;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.05em;
        }

        @keyframes bounce-down {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }

        .bounce-icon {
          animation: bounce-down 1.5s ease-in-out infinite;
        }

        @media (max-width: 640px) {
          .hero-buttons {
            flex-direction: column;
            gap: 12px;
          }
          .btn-primary,
          .btn-secondary {
            width: 100%;
            min-width: unset;
          }
          .hero-stats {
            flex-wrap: wrap;
            gap: 30px;
          }
          .stat-divider {
            display: none;
          }
        }
      `}</style>

      <section className="hero-section-wrapper">
        <div className="hero-bg">
          <img src={HERO_IMAGE} alt="Luxury Villa Design" />
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* خلينا اللمسة الخضراء البسيطة جداً هنا كـ Accent خفيف */}
            <Sparkles size={15} color="#66a109" />
            <span>مجموعة حصرية من التصاميم الجاهزة</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="line-white">تصاميم معمارية</span>
            <span className="line-gold">جاهزة للتنفيذ</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            اكتشف مجموعة حصرية من التصاميم المعمارية والداخلية المصممة بعناية
            فائقة. وفّر الوقت والتكلفة مع تصاميم احترافية جاهزة للتنفيذ.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <a href="#packages" className="btn-secondary">
              تعرف على الباقات
            </a>
            <a href="#designs" className="btn-primary">
              استعرض التصاميم
            </a>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {[
              { value: "3", label: "فئات سعرية" },
              { value: "500+", label: "عميل سعيد" },
              { value: "100+", label: "تصميم جاهز" },
            ].map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && <div className="stat-divider" />}
                <div className="stat-item">
                  <span className="stat-value" dir="ltr">
                    {stat.value}
                  </span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <span>اكتشف المزيد</span>
          {/* غيرنا لون السهم للأبيض المائل للشفافية */}
          <ArrowDown
            size={15}
            color="rgba(255,255,255,0.7)"
            className="bounce-icon"
          />
        </motion.div>
      </section>
    </>
  );
}
