"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "محمد الشامسي",
    role: "صاحب فيلا - دبي",
    text: "اشتريت تصميم فيلا جاهز من خالص ووفرت أكثر من 60% من تكلفة التصميم المخصص. الجودة ممتازة والفريق ساعدني في التعديلات البسيطة.",
    rating: 5,
  },
  {
    name: "فاطمة العلي",
    role: "مصممة داخلية - أبوظبي",
    text: "كمصممة داخلية، أستخدم تصاميم خالص الجاهزة كنقطة انطلاق لمشاريعي. التفاصيل والمواصفات دقيقة جداً وتوفر علي الكثير من الوقت.",
    rating: 5,
  },
  {
    name: "عبدالله القحطاني",
    role: "مطور عقاري - الرياض",
    text: "نستخدم تصاميم خالص الجاهزة لمشاريعنا السكنية في الرياض. الأسعار معقولة والتصاميم تناسب الذوق الخليجي بشكل مثالي.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');

        .testimonials-wrapper {
          position: relative;
          background-color: #f8f9fa; /* Changed from dark to off-white */
          padding: 120px 0 160px;
          direction: rtl;
          font-family: 'Tajawal', sans-serif;
          color: #333; /* Changed from white to dark gray */
          overflow: hidden;
        }

        .testimonials-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          text-align: center;
        }

        /* Header Area */
        .testimonials-header {
          margin-bottom: 80px;
        }

        .testimonials-header .subtitle {
          font-size: 13px;
          color: rgba(102, 161, 9, 0.6);
          letter-spacing: 0.15em;
          margin-bottom: 16px;
          display: block;
        }

        .testimonials-header h2 {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 800;
          color: #1a1a1a; /* Changed from white to almost black */
          margin: 0;
        }

        .testimonials-header h2 span {
          color: #66a109;
        }

        /* Grid */
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* Card Styling */
        .testimonial-card {
          position: relative;
          background: #ffffff; /* Changed from dark to white */
          border: 1px solid #e9ecef; /* Light border */
          border-radius: 12px;
          padding: 45px 35px;
          text-align: right;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          border-color: rgba(102, 161, 9, 0.4); /* Darker green border on hover */
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
        }

        .quote-icon {
          position: absolute;
          top: 30px;
          right: 30px;
          color: rgba(102, 161, 9, 0.25); /* Made the quote icon a bit more visible */
        }

        .testimonial-text {
          font-size: 16px;
          color: #555; /* Changed from light gray to dark gray */
          line-height: 1.85;
          margin-bottom: 35px;
          flex-grow: 1;
        }

        .card-footer {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        .stars-container {
          display: flex;
          gap: 4px;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a; /* Changed from white to almost black */
          margin: 0;
        }

        .user-role {
          font-size: 13px;
          color: #777; /* Changed from light gray to mid-gray */
          margin-top: 4px;
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
            <span className="subtitle">آراء عملائنا</span>
            <h2>
              ماذا يقول <span>عملاؤنا</span>
            </h2>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.name}
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="quote-icon">
                  <Quote size={32} strokeWidth={1.5} />
                </div>

                <p className="testimonial-text">{t.text}</p>

                <div className="card-footer">
                  <div className="stars-container">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} fill="#66a109" color="#66a109" />
                    ))}
                  </div>

                  <div className="user-info">
                    <p className="user-name">{t.name}</p>
                    <p className="user-role">{t.role}</p>
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
