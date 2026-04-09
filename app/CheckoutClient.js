"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/Context/CartContext";
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft } from "lucide-react";

export default function CheckoutClient({ content, lang }) {
  const isRtl = lang === "ar";
  const { cart, removeFromCart, updateQuantity, clearCart, isHydrated } =
    useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  if (!isHydrated) return null;

  // Calculate Total
  const cartTotal = cart.reduce((total, item) => {
    const priceNum =
      typeof item.price === "string"
        ? parseFloat(item.price.replace(/,/g, ""))
        : item.price;
    return total + priceNum * item.quantity;
  }, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: formData,
          items: cart,
          total: cartTotal,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        clearCart();
      } else {
        setError(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div
        className="checkout-page"
        style={{
          direction: isRtl ? "rtl" : "ltr",
          textAlign: "center",
          padding: "100px 20px",
        }}
      >
        <h2
          style={{
            color: "#66a109",
            marginBottom: "20px",
            fontFamily: "'Tajawal', sans-serif",
          }}
        >
          {content.successMessage}
        </h2>
        <Link
          href={`/${lang}/ready-designs`}
          style={{
            color: "#1a1a1a",
            textDecoration: "underline",
            fontFamily: "'Tajawal', sans-serif",
          }}
        >
          {content.continueShopping}
        </Link>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=DM+Serif+Display&display=swap');

        .checkout-page {
          background-color: #fafafa;
          min-height: 100vh;
          padding: 110px 0 120px;
          direction: ${isRtl ? "rtl" : "ltr"};
          font-family: 'Tajawal', sans-serif;
          color: #1a1a1a;
        }
        .checkout-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .cart-section, .form-section {
          background: #fff;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
        }
        .section-title {
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #eaeaea;
        }
        .cart-item {
          display: flex;
          gap: 20px;
          padding: 20px 0;
          border-bottom: 1px solid #eaeaea;
          align-items: center;
        }
        .item-img {
          width: 100px;
          height: 100px;
          border-radius: 12px;
          object-fit: cover;
          background: #f0f0f0;
        }
        .item-details {
          flex: 1;
        }
        .item-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .item-price {
          color: #66a109;
          font-weight: 700;
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
        }
        .qty-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f9f9f9;
          padding: 6px 12px;
          border-radius: 8px;
          margin-top: 10px;
          width: fit-content;
        }
        .qty-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #555;
          display: flex;
          align-items: center;
        }
        .qty-btn:hover { color: #66a109; }
        .remove-btn {
          background: none;
          border: none;
          color: #e74c3c;
          cursor: pointer;
          padding: 8px;
        }
        .form-group { margin-bottom: 20px; }
        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #444;
        }
        .form-input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #ddd;
          border-radius: 10px;
          font-family: inherit;
          font-size: 15px;
          transition: border-color 0.3s;
        }
        .form-input:focus {
          outline: none;
          border-color: #66a109;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          font-weight: 600;
          margin-top: 20px;
        }
        .summary-row.total {
          font-size: 22px;
          font-weight: 800;
          color: #66a109;
          border-top: 2px solid #eaeaea;
          padding-top: 20px;
        }
        .submit-btn {
          width: 100%;
          background: #66a109;
          color: white;
          border: none;
          padding: 18px;
          font-size: 18px;
          font-weight: 700;
          border-radius: 12px;
          margin-top: 30px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .submit-btn:hover { background: #5a8f08; }
        .submit-btn:disabled { background: #ccc; cursor: not-allowed; }
        .error-msg {
          color: #e74c3c;
          background: #fdf0ed;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
        }
        .empty-cart { text-align: center; padding: 40px 0; color: #777; font-size: 18px; }
        @media (max-width: 1024px) {
          .checkout-container { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="checkout-page">
        <div className="checkout-container">
          <div className="cart-section">
            <h2 className="section-title">{content.title}</h2>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>{content.emptyCart}</p>
                <Link
                  href={`/${lang}/ready-designs`}
                  style={{
                    color: "#66a109",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 10,
                  }}
                >
                  {isRtl ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}{" "}
                  {content.continueShopping}
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} className="item-img" />
                  <div className="item-details">
                    <h3 className="item-title">{item.title}</h3>
                    <div className="item-price" dir="ltr">
                      {item.price} {item.currency}
                    </div>
                    <div className="qty-controls">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="remove-btn"
                    title={content.removeItem}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="form-section">
              <h2 className="section-title">{content.checkout}</h2>
              {error && <div className="error-msg">{content.errorMessage}</div>}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">{content.name}</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="form-input"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{content.email}</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="form-input"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{content.phone}</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="form-input"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{content.notes}</label>
                  <textarea
                    name="notes"
                    rows="3"
                    className="form-input"
                    value={formData.notes}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="summary-row">
                  <span>{content.subtotal}</span>
                  <span dir="ltr">{cartTotal.toLocaleString()} AED</span>
                </div>
                <div className="summary-row total">
                  <span>{content.total}</span>
                  <span dir="ltr">{cartTotal.toLocaleString()} AED</span>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "..." : content.confirmOrder}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
