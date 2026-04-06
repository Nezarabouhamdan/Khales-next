"use client";
import { motion } from "framer-motion";
import {
  Search,
  MousePointerClick,
  ShoppingCart,
  Download,
} from "lucide-react";

const ICONS = [Search, MousePointerClick, ShoppingCart, Download];

export default function ProcessSection({ content, lang }) {
  const isRtl = lang === "ar";
  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      style={{
        position: "relative",
        padding: "96px 0 128px",
        background: "#f8f9fa",
        overflow: "hidden",
      }}
    >
      {/* Subtle center dot decoration (bottom) */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#66a109",
          opacity: 0.7,
        }}
      />
      {/* Subtle line left of dot */}
      <div
        style={{
          position: "absolute",
          bottom: "42px",
          left: "calc(50% - 60px)",
          width: "50px",
          height: "1px",
          background: "rgba(102, 161, 9, 0.25)",
        }}
      />
      {/* Subtle line right of dot */}
      <div
        style={{
          position: "absolute",
          bottom: "42px",
          left: "calc(50% + 10px)",
          width: "50px",
          height: "1px",
          background: "rgba(102, 161, 9, 0.25)",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "80px" }}
        >
          <span
            style={{
              display: "block",
              fontSize: "18px",
              fontFamily: "'Tajawal', sans-serif",
              color: "rgba(102, 161, 9, 0.60)",
              letterSpacing: "0.1em",
              marginBottom: "16px",
              fontWeight: 600,
            }}
          >
            {content?.badge}
          </span>
          <h2
            style={{
              fontFamily: "'Tajawal', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              color: "#1a1a1a",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {content?.title1}{" "}
            <span style={{ color: "#66a109" }}>{content?.title2}</span>
          </h2>
        </motion.div>

        {/* Steps Grid — RTL renders 01 on far right, 04 on far left */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "4rem",
            maxWidth: "1000px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {content?.steps?.map((step, index) => {
            const Icon = ICONS[index];
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                style={{
                  position: "relative",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                className="process-step-group"
              >
                {/* Connecting Line to next step (hidden on last) */}
                {index < (content?.steps?.length || 0) - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "45px",
                      /* In RTL, "left" means toward step n+1 */
                      left: "0",
                      width: "50%",
                      height: "1px",
                      background: "rgba(102, 161, 9, 0.12)",
                      zIndex: 0,
                    }}
                  />
                )}
                {/* Connecting Line from previous step */}
                {index > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "45px",
                      right: "0",
                      width: "50%",
                      height: "1px",
                      background: "rgba(102, 161, 9, 0.12)",
                      zIndex: 0,
                    }}
                  />
                )}

                {/* Double-Ring Icon Container */}
                <div
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "90px",
                    height: "90px",
                    zIndex: 1,
                    transition: "transform 0.3s ease",
                  }}
                  className="process-icon-wrap"
                >
                  {/* Outer faint ring */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      border: "1px solid rgba(102, 161, 9, 0.12)",
                      transition: "border-color 0.3s ease",
                    }}
                    className="outer-ring"
                  />
                  {/* Inner ring with bg */}
                  <div
                    style={{
                      position: "absolute",
                      inset: "10px",
                      borderRadius: "50%",
                      border: "1px solid rgba(102, 161, 9, 0.22)",
                      background: "#f8f9fa",
                      transition:
                        "background 0.3s ease, border-color 0.3s ease",
                    }}
                    className="inner-ring"
                  />
                  {/* Icon */}
                  <Icon
                    size={22}
                    strokeWidth={1.5}
                    style={{
                      color: "rgba(102, 161, 9, 0.80)",
                      position: "relative",
                      zIndex: 2,
                      transition: "color 0.3s ease",
                    }}
                    className="step-icon"
                  />
                </div>

                {/* Step Number */}
                <span
                  dir="ltr"
                  style={{
                    display: "block",
                    fontSize: "2rem",
                    fontFamily: "'DM Serif Display', serif",
                    color: "rgba(102, 161, 9, 0.38)",
                    marginTop: "24px",
                    marginBottom: "16px",
                    transition: "color 0.3s ease",
                  }}
                  className="step-number"
                >
                  {step.num}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Tajawal', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.15rem",
                    color: "#1a1a1a",
                    margin: "0 0 14px 0",
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Tajawal', sans-serif",
                    fontSize: "0.875rem",
                    color: "#555",
                    lineHeight: 1.8,
                    maxWidth: "220px",
                    margin: "0 auto",
                  }}
                >
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Hover styles + font import + responsive */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=DM+Serif+Display&display=swap');

        .process-step-group:hover .process-icon-wrap {
          transform: translateY(-4px);
        }
        .process-step-group:hover .outer-ring {
          border-color: rgba(102, 161, 9, 0.30) !important;
        }
        .process-step-group:hover .inner-ring {
          background: rgba(102, 161, 9, 0.05) !important;
          border-color: rgba(102, 161, 9, 0.40) !important;
        }
        .process-step-group:hover .step-icon {
          color: #66a109 !important;
        }
        .process-step-group:hover .step-number {
          color: rgba(102, 161, 9, 0.60) !important;
        }

        @media (max-width: 1024px) {
          .process-step-group > div:first-child,
          .process-step-group > div:nth-child(2) {
            display: none !important;
          }
        }

        @media (max-width: 900px) {
          [style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 3rem 2rem !important;
          }
        }

        @media (max-width: 520px) {
          [style*="grid-template-columns: repeat(4"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
