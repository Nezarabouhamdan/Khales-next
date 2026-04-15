"use client";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/Context/CartContext";
import MiniCart from "./MiniCart";
import { AnimatePresence } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";

export default function CartFloat({ lang }) {
  const { cart, isHydrated } = useCart();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isHydrated) return null;

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Simplified return for CartFloat
  return (
    <div
      ref={wrapperRef}
      className="float3"
      style={{
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "none",
          border: "none",
          color: "inherit",
          cursor: "pointer",
          position: "relative", // For the badge
        }}
      >
        <ShoppingCart size={28} />{" "}
        {/* Lucide icon will now be centered by Flexbox */}
        {cartCount > 0 && (
          <span
            className="cart-count-badge"
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              backgroundColor: "#ff4444",
              color: "white",
              borderRadius: "50%",
              width: "22px",
              height: "22px",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              border: "2px solid #fff",
              zIndex: 10,
            }}
          >
            {cartCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && <MiniCart close={() => setOpen(false)} lang={lang} />}
      </AnimatePresence>
    </div>
  );
}
