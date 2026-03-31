"use client";
import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Phone, Mail, ArrowLeft } from "lucide-react";

export default function CTASection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');

        .cta-wrapper {
          position: relative;
          background-color: #f8f9fa;
          padding: 100px 0;
          direction: rtl;
          font-family: 'Tajawal', sans-serif;
          color: #333;
          overflow: hidden;
        }

        .cta-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: center;
        }

        /* Card Styling */
        .cta-card {
          position: relative;
          width: 100%;
          max-width: 900px;
          background: #ffffff;
          border: 1px solid #e9ecef;
          border-radius: 24px;
          padding: 80px 40px;
          text-align: center;
          overflow: hidden;
        }

        .cta-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(102, 161, 9, 0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Typography */
        .cta-top-label {
          font-size: 13px;
          color: #777;
          letter-spacing: 0.1em;
          margin-bottom: 20px;
          display: block;
        }

        .cta-title {
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 800;
          line-height: 1.3;
          margin-bottom: 24px;
          color: #1a1a1a;
        }

        .cta-title .gold-text {
          color: #66a109;
        }

        .cta-description {
          font-size: 17px;
          color: #555;
          line-height: 1.8;
          max-width: 650px;
          margin: 0 auto 45px;
        }

        /* Buttons Container */
        .cta-buttons-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 50px;
        }

        .btn-cta-gold {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #66a109 0%, #5a8f08 100%);
          color: #000;
          padding: 16px 36px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 16px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(102, 161, 9, 0.15);
        }

        .btn-cta-gold:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(102, 161, 9, 0.25);
        }

        .btn-cta-outline {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #66a109;
          padding: 15px 36px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 16px;
          text-decoration: none;
          border: 1px solid rgba(102, 161, 9, 0.4);
          transition: all 0.3s ease;
        }

        .btn-cta-outline:hover {
          background: rgba(102, 161, 9, 0.05);
          border-color: #66a109;
          transform: translateY(-3px);
        }

        /* Contact Info */
        .cta-contact-info {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          opacity: 0.5;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #333;
          text-decoration: none;
          font-size: 15px;
          transition: opacity 0.3s;
        }

        .contact-item:hover {
          opacity: 1;
          color: #66a109;
        }

        @media (max-width: 768px) {
          .cta-buttons-group {
            flex-direction: column;
            width: 100%;
          }
          .btn-cta-gold, .btn-cta-outline {
            width: 100%;
          }
          .cta-contact-info {
            flex-direction: column;
            gap: 20px;
          }
          .cta-card {
            padding: 60px 24px;
          }
        }
      `}</style>

      <section className="cta-wrapper">
        <div className="cta-container">
          <motion.div
            className="cta-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="cta-top-label">ابدأ مشروعك اليوم</span>

            <h2 className="cta-title">
              هل أنت مستعد لتحويل <span className="gold-text">رؤيتك</span> إلى
              واقع؟
            </h2>

            <p className="cta-description">
              تواصل معنا الآن للحصول على استشارة مجانية أو لشراء أي تصميم من
              مجموعتنا الحصرية. فريقنا جاهز لمساعدتك في اختيار التصميم المثالي.
            </p>

            <div className="cta-buttons-group">
              {/* Gold Button (Right) */}
              <a href="https://wa.me/971551299880" className="btn-cta-gold">
                <MessageCircle size={20} />
                تواصل عبر واتساب
              </a>

              {/* Outline Button (Left) */}
              <a href="#consultation" className="btn-cta-outline">
                <ArrowLeft size={18} />
                احجز استشارة مجانية
              </a>
            </div>

            <div className="cta-contact-info">
              <a href="mailto:info@khales.ae" className="contact-item">
                <Mail size={18} />
                <span>info@khales.ae</span>
              </a>
              <a href="tel:+971551299880" className="contact-item" dir="ltr">
                <span>+971 55 129 9880</span>
                <Phone size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
