"use client";
import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

("use client");

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import MiniCart from "./MiniCart";

export default function CartIcon({ lang }) {
  const { cart, isHydrated } = useCart();
  const [open, setOpen] = useState(false);

  if (!isHydrated) return null;

  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative text-2xl p-4 hover:scale-110 transition-transform"
        style={{ color: "inherit" }}
      >
        🛒
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>

      {open && <MiniCart close={() => setOpen(false)} />}
    </div>
  );
}
