"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Ruler,
  Bed,
  Layers,
  ShoppingCart,
  CreditCard,
  CheckCircle,
  Home,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/Context/CartContext";

export default function DesignDetailsClient({ design, content, lang }) {
  const isRtl = lang === "ar";
  // Use the images array if exists, otherwise fallback to repeating the main image
  const galleryImages =
    design.images && design.images.length > 0
      ? design.images
      : [design.image, design.image, design.image];

  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart({
      id: design.id,
      title: design.title,
      price: design.price,
      currency: design.currency,
      image: galleryImages[0],
      category: design.category || "Ready Design",
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push(`/${lang}/checkout`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=DM+Serif+Display&display=swap');

        .details-page {
          background-color: #fafafa;
          min-height: 100vh;
          padding: 110px 0 120px;
          direction: ${isRtl ? "rtl" : "ltr"};
          font-family: 'Tajawal', sans-serif;
          color: #1a1a1a;
        }

        .details-container {
          max-width: 1250px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Breadcrumb */
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 40px;
          font-size: 14px;
          font-weight: 500;
          color: #777;
        }

        .breadcrumb a {
          color: #777;
          text-decoration: none;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .breadcrumb a:hover {
          color: #66a109;
        }

        .breadcrumb .current {
          color: #1a1a1a;
          font-weight: 600;
        }

        /* Layout Grid */
        .product-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        /* --- Gallery Section (Right/Left depending on RTL) --- */
        .gallery-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: sticky;
          top: 100px;
        }

        .main-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.06);
          background: #e9ecef;
        }

        .main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .thumbnails-row {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding-bottom: 10px; /* For scrollbar if many */
        }

        .thumbnails-row::-webkit-scrollbar {
          height: 6px;
        }
        .thumbnails-row::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }

        .thumb-wrapper {
          width: 120px;
          height: 90px;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          flex-shrink: 0;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          opacity: 0.6;
        }

        .thumb-wrapper:hover {
          opacity: 0.9;
        }

        .thumb-wrapper.active {
          border-color: #66a109;
          opacity: 1;
          box-shadow: 0 4px 15px rgba(102, 161, 9, 0.2);
        }

        .thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* --- Info Section --- */
        .info-section {
          display: flex;
          flex-direction: column;
        }

        .category-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(102, 161, 9, 0.08);
          color: #66a109;
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 20px;
          align-self: flex-start;
        }

        .product-title {
          font-size: clamp(32px, 4vw, 42px);
          font-weight: 800;
          color: #1a1a1a;
          margin: 0 0 16px 0;
          line-height: 1.3;
        }

        .product-desc {
          font-size: 16px;
          color: #555;
          line-height: 1.8;
          margin-bottom: 30px;
        }

        .price-wrap {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 40px;
          padding-bottom: 30px;
          border-bottom: 1px solid #eaeaea;
        }

        .price-value {
          font-family: 'DM Serif Display', serif;
          font-size: 48px;
          color: #1a1a1a;
          line-height: 1;
        }

        .price-currency {
          font-size: 18px;
          font-weight: 600;
          color: #66a109;
        }

        /* Specifications Grid */
        .specs-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #1a1a1a;
        }

        .specs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid #eaeaea;
        }

        .spec-box {
          background: #ffffff;
          border: 1px solid #f0f0f0;
          padding: 20px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
        }

        .spec-icon-wrap {
          width: 44px;
          height: 44px;
          background: rgba(102, 161, 9, 0.05);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #66a109;
        }

        .spec-label {
          font-size: 13px;
          color: #888;
          font-weight: 600;
        }

        .spec-val {
          font-size: 18px;
          font-weight: 800;
          color: #1a1a1a;
        }

        /* Included Files Section */
        .included-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #1a1a1a;
        }

        .included-list {
          list-style: none;
          padding: 0;
          margin: 0 0 40px 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .included-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 15px;
          color: #444;
          font-weight: 500;
        }

        .included-item svg {
          color: #66a109;
          flex-shrink: 0;
        }

        /* Actions */
        .actions-group {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .btn-primary {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #66a109;
          color: #ffffff;
          padding: 18px 30px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 17px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(102, 161, 9, 0.25);
        }

        .btn-primary:hover {
          background: #5a8f08;
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(102, 161, 9, 0.35);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: transparent;
          color: #1a1a1a;
          padding: 18px 30px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 17px;
          text-decoration: none;
          border: 1px solid #ddd;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: #f0f0f0;
          border-color: #66a109;
          color: #66a109;
        }

        @media (max-width: 1024px) {
          .product-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .gallery-section {
            position: static;
          }
        }

        @media (max-width: 640px) {
          .specs-grid {
            grid-template-columns: 1fr;
          }
          .actions-group {
            flex-direction: column;
          }
          .btn-primary, .btn-secondary {
            width: 100%;
          }
        }
      `}</style>

      <div className="details-page">
        <div className="details-container">
          {/* Breadcrumb Navigation */}
          <nav className="breadcrumb">
            <Link href={`/${lang}`}>
              <Home size={16} /> {content?.breadcrumbHome}
            </Link>
            <ChevronRight
              size={14}
              style={{ transform: isRtl ? "rotate(180deg)" : "none" }}
            />
            <Link href={`/${lang}/ready-designs`}>
              {content?.breadcrumbGallery}
            </Link>
            <ChevronRight
              size={14}
              style={{ transform: isRtl ? "rotate(180deg)" : "none" }}
            />
            <span className="current">{design.title}</span>
          </nav>

          <div className="product-grid">
            {/* Image Gallery */}
            <div className="gallery-section">
              <motion.div
                className="main-image-wrapper"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIdx}
                    src={galleryImages[activeImageIdx]}
                    alt={`${design.title} - Image ${activeImageIdx + 1}`}
                    className="main-image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
              </motion.div>

              <div className="thumbnails-row">
                {galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`thumb-wrapper ${activeImageIdx === idx ? "active" : ""}`}
                    onClick={() => setActiveImageIdx(idx)}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="thumb-img"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Info and Specs */}
            <motion.div
              className="info-section"
              initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {design.badge && (
                <div className="category-badge">{design.badge}</div>
              )}

              <h1 className="product-title">{design.title}</h1>
              <p className="product-desc">{design.desc}</p>

              <div className="price-wrap">
                <span className="price-value" dir="ltr">
                  {design.price}
                </span>
                <span className="price-currency">{design.currency}</span>
              </div>

              <h3 className="specs-title">{content?.specsTitle}</h3>
              <div className="specs-grid">
                <div className="spec-box">
                  <div className="spec-icon-wrap">
                    <Ruler size={20} />
                  </div>
                  <div className="spec-text">
                    <span className="spec-label">{content?.areaLabel}</span>
                    <div className="spec-val" dir="ltr">
                      {design.area}
                    </div>
                  </div>
                </div>

                {design.rooms && (
                  <div className="spec-box">
                    <div className="spec-icon-wrap">
                      <Bed size={20} />
                    </div>
                    <div className="spec-text">
                      <span className="spec-label">{content?.roomsLabel}</span>
                      <div className="spec-val">{design.rooms}</div>
                    </div>
                  </div>
                )}

                {design.floors && (
                  <div className="spec-box">
                    <div className="spec-icon-wrap">
                      <Layers size={20} />
                    </div>
                    <div className="spec-text">
                      <span className="spec-label">{content?.floorsLabel}</span>
                      <div className="spec-val">{design.floors}</div>
                    </div>
                  </div>
                )}
              </div>

              <h3 className="included-title">{content?.includedTitle}</h3>
              <ul className="included-list">
                {content?.includedFiles?.map((file, idx) => (
                  <li key={idx} className="included-item">
                    <CheckCircle size={20} strokeWidth={2.5} />
                    {file}
                  </li>
                ))}
              </ul>

              <div className="actions-group">
                <button className="btn-primary" onClick={handleBuyNow}>
                  <CreditCard size={20} />
                  {content?.buyNowBtn}
                </button>
                <button className="btn-secondary" onClick={handleAddToCart}>
                  <ShoppingCart size={20} />
                  {content?.addToCartBtn}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
