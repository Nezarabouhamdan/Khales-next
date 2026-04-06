"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection({ content, lang }) {
  const isRtl = lang === "ar";
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');

        .testimonials-wrapper {
          position: relative;
          background-color: #fafafa; /* لون فاتح جداً مريح للعين */
          padding: 120px 0 160px;
          direction: ${isRtl ? "rtl" : "ltr"};
          font-family: 'Tajawal', sans-serif;
          color: #1a1a1a;
          overflow: hidden;
        }

        .testimonials-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Header Area */
        .testimonials-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .testimonials-header .badge {
          display: inline-flex;
          background: rgba(102, 161, 9, 0.08);
          color: #66a109;
          padding: 8px 20px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 20px;
        }

        .testimonials-header h2 {
          font-size: clamp(32px, 5vw, 44px);
          font-weight: 800;
          color: #0a0a0a;
          margin: 0;
        }

        .testimonials-header h2 span {
          color: #66a109;
        }

        /* Grid */
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        /* Card Styling */
        .testimonial-card {
          background: #ffffff;
          border: none;
          border-radius: 24px;
          padding: 45px 35px;
          text-align: right;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
          transition: all 0.4s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(102, 161, 9, 0.08);
        }

        /* أيقونة الاقتباس داخل دائرة أنيقة */
        .quote-icon-wrapper {
          width: 50px;
          height: 50px;
          background: rgba(102, 161, 9, 0.06);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #66a109;
          margin-bottom: 25px;
        }

        .testimonial-text {
          font-size: 16px;
          color: #555;
          line-height: 1.85;
          margin-bottom: 35px;
          flex-grow: 1;
        }

        /* الفوتر: الاسم على اليمين والنجوم على اليسار */
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #f0f0f0;
          padding-top: 24px;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .user-name {
          font-size: 18px;
          font-weight: 800;
          color: #1a1a1a;
          margin: 0;
        }

        .user-role {
          font-size: 13px;
          color: #888;
          margin: 0;
        }

        .stars-container {
          display: flex;
          gap: 4px;
        }

        /* Bottom Decoration */
        .bottom-decorator {
          position: absolute;
          bottom: 60px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          opacity: 0.3;
        }

        .decorator-line {
          width: 100px;
          height: 1px;
          background: linear-gradient(to left, transparent, #66a109, transparent);
        }

        .decorator-dot {
          width: 6px;
          height: 6px;
          background: #66a109;
          transform: rotate(45deg);
        }

        @media (max-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
          .testimonials-container { padding: 0 16px; }
        }
      `}</style>

      <section className="testimonials-wrapper">
        <div className="testimonials-container">
          <motion.div
            className="testimonials-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="badge">{content?.badge}</span>
            <h2>
              {content?.title1} <span>{content?.title2}</span>
            </h2>
          </motion.div>

          <div className="testimonials-grid">
            {content?.reviews?.map((t, index) => (
              <motion.div
                key={t.name}
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="quote-icon-wrapper">
                  <Quote
                    size={22}
                    strokeWidth={2.5}
                    fill="currentColor"
                    opacity={0.2}
                  />
                </div>

                <p className="testimonial-text">{t.text}</p>

                <div className="card-footer">
                  <div className="user-info">
                    <p className="user-name">{t.name}</p>
                    <p className="user-role">{t.role}</p>
                  </div>

                  <div className="stars-container">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={16} fill="#66a109" color="#66a109" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="bottom-decorator">
          <div className="decorator-line" />
          <div className="decorator-dot" />
          <div className="decorator-line" />
        </div>
      </section>
    </>
  );
}
