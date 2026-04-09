"use client";
import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/Context/CartContext";

export default function CartBadge({ lang }) {
  const { cart, isHydrated } = useCart();

  if (!isHydrated) return null;

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <Link
      href={`/${lang}/checkout`}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        color: "inherit",
        padding: "4px",
        textDecoration: "none",
      }}
    >
      <ShoppingCart size={24} />
      {cartCount > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-4px",
            right: "-4px",
            backgroundColor: "#66a109",
            color: "white",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "11px",
            fontWeight: "bold",
          }}
        >
          {cartCount}
        </span>
      )}
    </Link>
  );
}
