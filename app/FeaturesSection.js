"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Wallet,
  RefreshCw,
  Shield,
  Headphones,
  Globe,
} from "lucide-react";

const FEATURE_ICONS = [Clock, Wallet, RefreshCw, Shield, Headphones, Globe];

export default function FeaturesSection({ content, lang }) {
  const isRtl = lang === "ar";
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');

        .features-wrapper {
          position: relative;
          background-color: #f8f9fa;
          padding: 100px 0;
          direction: ${isRtl ? "rtl" : "ltr"};
          font-family: 'Tajawal', sans-serif;
          color: #333;
        }

        .features-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Header */
        .features-header {
          text-align: center;
          margin-bottom: 70px;
        }

        .features-header .badge {
          font-size: 13px;
          color: rgba(102, 161, 9, 0.8);
          letter-spacing: 0.1em;
          margin-bottom: 15px;
          display: block;
        }

        .features-header h2 {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 800;
          margin-bottom: 20px;
          color: #1a1a1a;
        }

        .features-header h2 span {
          color: #66a109;
        }

        .features-header p {
          color: #555;
          font-size: 16px;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Grid Layout */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* Card Styling */
        .feature-card {
          background: #ffffff;
          border: 1px solid #e9ecef;
          border-radius: 12px;
          padding: 32px;
          transition: all 0.4s ease;
          position: relative;
          text-align: ${isRtl ? "right" : "left"};
        }

        .feature-card:hover {
          border-color: rgba(102, 161, 9, 0.25);
          background: #ffffff;
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
        }

        .feature-icon-box {
          width: 44px;
          height: 44px;
          background: rgba(102, 161, 9, 0.03);
          border: 1px solid rgba(102, 161, 9, 0.15);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #66a109;
          margin-bottom: 24px;
          margin-right: ${isRtl ? "0" : "auto"};
          margin-left: ${isRtl ? "auto" : "0"};
          transition: all 0.3s ease;
        }

        .feature-card:hover .feature-icon-box {
          border-color: #66a109;
          background: rgba(102, 161, 9, 0.1);
        }

        .feature-card h3 {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 15px;
          transition: color 0.3s ease;
        }

        .feature-card:hover h3 {
          color: #66a109;
        }

        .feature-card p {
          font-size: 14px;
          color: #555;
          line-height: 1.8;
          margin: 0;
        }

        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
          .features-wrapper {
            padding: 80px 0;
          }
        }
      `}</style>

      <section className="features-wrapper">
        <div className="features-container">
          <motion.div
            className="features-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="badge">{content?.badge}</span>
            <h2>
              {content?.title1} <span>{content?.title2}</span>
            </h2>
            <p>{content?.desc}</p>
          </motion.div>

          <div className="features-grid">
            {content?.items?.map((feat, idx) => {
              const IconComp = FEATURE_ICONS[idx] || Clock;
              return (
                <motion.div
                  key={idx}
                  className="feature-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="feature-icon-box">
                    <IconComp size={20} strokeWidth={1.5} />
                  </div>
                  <h3>{feat.title}</h3>
                  <p>{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
