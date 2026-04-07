"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useParams } from "next/navigation";
// Dictionary will be passed via context or global - simplified for now
// import getDictionary from '@/lib/get-dictionary' would require async/server component

export default function MiniCart({ close }) {
  const { cart, removeFromCart, isHydrated } = useCart();
  const params = useParams();
  const lang = params?.lang || "en";

  const content = { title: lang === "ar" ? "سلة المشتريات" : "Cart" };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isHydrated) return null;

  return (
    <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-2xl p-4 z-50 border">
      <h3 className="font-bold mb-3">{content.title}</h3>

      {cart.length === 0 ? (
        <p className="text-sm text-gray-500">Cart is empty</p>
      ) : (
        <>
          <div className="max-h-60 overflow-y-auto space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} × {item.price}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-xs hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-3">
            <p className="font-semibold">Total: {total.toLocaleString()}</p>

            <Link
              href={`/${lang}/checkout`}
              onClick={close}
              className="block mt-3 text-center bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
