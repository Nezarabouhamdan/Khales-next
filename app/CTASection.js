"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Phone,
  Mail,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

export default function CTASection({ content, lang }) {
  const isRtl = lang === "ar";
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');

        .cta-wrapper {
          position: relative;
          background-color: #ffffff; /* خلفية بيضاء لكسر اللون مع القسم السابق */
          padding: 120px 0;
          direction: ${isRtl ? "rtl" : "ltr"};
          font-family: 'Tajawal', sans-serif;
          color: #1a1a1a;
          overflow: hidden;
        }

        .cta-container {
          max-width: 1000px; /* صغرنا العرض شوي عشان يكون الكرت ملموم وأنيق */
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: center;
        }

        /* Card Styling */
        .cta-card {
          position: relative;
          width: 100%;
          background: #ffffff;
          border: none;
          border-radius: 32px;
          padding: 80px 40px;
          text-align: center;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.04);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .cta-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 70px rgba(102, 161, 9, 0.08);
        }

        /* إضاءة ناعمة في الزوايا */
        .cta-card::before {
          content: "";
          position: absolute;
          top: -150px;
          right: -150px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(102, 161, 9, 0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .cta-card::after {
          content: "";
          position: absolute;
          bottom: -150px;
          left: -150px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(102, 161, 9, 0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Badge Typography */
        .cta-badge {
          display: inline-flex;
          background: rgba(102, 161, 9, 0.08);
          color: #66a109;
          padding: 8px 24px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 24px;
        }

        .cta-title {
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 800;
          line-height: 1.3;
          margin-bottom: 24px;
          color: #0a0a0a;
          position: relative;
          z-index: 2;
        }

        .cta-title .gold-text {
          color: #66a109;
        }

        .cta-description {
          font-size: 18px;
          color: #666;
          line-height: 1.8;
          max-width: 650px;
          margin: 0 auto 45px;
          position: relative;
          z-index: 2;
        }

        /* Buttons Container */
        .cta-buttons-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 50px;
          position: relative;
          z-index: 2;
        }

        .btn-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #66a109;
          color: #ffffff;
          padding: 16px 36px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 16px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(102, 161, 9, 0.25);
        }

        .btn-cta-primary:hover {
          background: #5a8f08;
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(102, 161, 9, 0.35);
        }

        .btn-cta-outline {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #0a0a0a;
          padding: 16px 36px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 16px;
          text-decoration: none;
          border: 1px solid #e0e0e0;
          transition: all 0.3s ease;
        }

        .btn-cta-outline:hover {
          background: #fafafa;
          border-color: #66a109;
          color: #66a109;
          transform: translateY(-3px);
        }

        /* Contact Info */
        .cta-contact-divider {
          width: 60px;
          height: 2px;
          background: rgba(102, 161, 9, 0.2);
          margin: 0 auto 30px;
        }

        .cta-contact-info {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          position: relative;
          z-index: 2;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #555;
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .contact-item svg {
          color: #66a109;
          opacity: 0.7;
          transition: all 0.3s ease;
        }

        .contact-item:hover {
          color: #66a109;
        }

        .contact-item:hover svg {
          opacity: 1;
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .cta-buttons-group {
            flex-direction: column;
            width: 100%;
          }
          .btn-cta-primary, .btn-cta-outline {
            width: 100%;
            justify-content: center;
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
            <span className="cta-badge">{content?.badge}</span>

            <h2 className="cta-title">
              {content?.title1}{" "}
              <span className="gold-text">{content?.title2}</span>{" "}
              {content?.title3}
            </h2>

            <p className="cta-description">{content?.desc}</p>

            <div className="cta-buttons-group">
              {/* Primary Button */}
              <a href="https://wa.me/971551299880" className="btn-cta-primary">
                <MessageCircle size={20} />
                {content?.btnPrimary}
              </a>

              {/* Outline Button */}
              <a href="#consultation" className="btn-cta-outline">
                {content?.btnSecondary}
                {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </a>
            </div>

            <div className="cta-contact-divider" />

            <div className="cta-contact-info">
              <a href="mailto:info@khales.ae" className="contact-item">
                <Mail size={18} />
                <span>info@khales.ae</span>
              </a>
              <a href="tel:+971551299880" className="contact-item" dir="ltr">
                <Phone size={18} />
                <span>+971 55 129 9880</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
