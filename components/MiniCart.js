"use client";
import React from "react";
import { useCart } from "@/Context/CartContext";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MiniCart({ close, lang }) {
  const { cart, removeFromCart } = useCart();
  const isRtl = lang === "ar";

  const content = {
    title: isRtl ? "سلة المشتريات" : "Your Cart",
    empty: isRtl ? "السلة فارغة حالياً" : "Your cart is empty",
    remove: isRtl ? "حذف" : "Remove",
    total: isRtl ? "الإجمالي" : "Total",
    checkout: isRtl ? "إتمام الطلب" : "Checkout",
  };

  const total = cart.reduce((acc, item) => {
    const priceNum =
      typeof item.price === "string"
        ? parseFloat(item.price.replace(/,/g, ""))
        : item.price;
    return acc + priceNum * item.quantity;
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className="mini-cart-container"
      style={{
        direction: isRtl ? "rtl" : "ltr",
        position: "absolute",
        bottom: "80px",
        right: "0px", // Forces the box to align with the button's right edge
        width: "min(90vw, 340px)", // Responsive width
        backgroundColor: "#ffffff",
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
        border: "1px solid #eee",
        zIndex: 100000,
      }}
    >
      <h3
        style={{
          color: "#111",
          fontSize: "18px",
          fontWeight: "700",
          marginBottom: "15px",
          textAlign: isRtl ? "right" : "left",
        }}
      >
        {content.title}
      </h3>

      {cart.length === 0 ? (
        <p
          style={{
            color: "#666",
            fontSize: "14px",
            textAlign: "center",
            padding: "20px 0",
          }}
        >
          {content.empty}
        </p>
      ) : (
        <>
          <div
            style={{
              maxHeight: "250px",
              overflowY: "auto",
              paddingRight: isRtl ? "0" : "5px",
              paddingLeft: isRtl ? "5px" : "0",
            }}
          >
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: "1px solid #f5f5f5",
                }}
              >
                <div style={{ flex: 1, textAlign: isRtl ? "right" : "left" }}>
                  <p
                    style={{
                      color: "#222",
                      fontSize: "14px",
                      fontWeight: "600",
                      margin: 0,
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      color: "#888",
                      fontSize: "12px",
                      margin: "4px 0 0 0",
                    }}
                  >
                    {item.quantity} × {item.price} AED
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    color: "#ff4444",
                    background: "#fff5f5",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    cursor: "pointer",
                    fontWeight: "600",
                    marginLeft: isRtl ? "0" : "10px",
                    marginRight: isRtl ? "10px" : "0",
                  }}
                >
                  {content.remove}
                </button>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "20px",
              paddingTop: "15px",
              borderTop: "2px solid #f5f5f5",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "15px",
              }}
            >
              <span style={{ color: "#555", fontWeight: "600" }}>
                {content.total}
              </span>
              <span
                style={{ color: "#111", fontWeight: "800", fontSize: "18px" }}
              >
                {total.toLocaleString()} AED
              </span>
            </div>

            <Link
              href={`/${lang}/checkout`}
              onClick={close}
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "#66a109",
                color: "#fff",
                textAlign: "center",
                padding: "14px",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: "700",
                fontSize: "16px",
                boxShadow: "0 4px 12px rgba(102, 161, 9, 0.3)",
              }}
            >
              {content.checkout}
            </Link>
          </div>
        </>
      )}
    </motion.div>
  );
}
