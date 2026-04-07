// provider/ClientProviders.js (Note the corrected filename: "Providers")
"use client";

// LanguageProvider is no longer needed
import Analytics from "@/utils/Analytics";
import CookieConsent from "@/utils/CookieConsent";
import { Globalstyle } from "@/utils/Globalstyles";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CartProvider } from "@/Context/CartContext";

export default function ClientProviders({ children }) {
  return (
    <>
      <CookieConsent />
      {/* Analytics is now in the root layout, you can remove this one if it causes duplication */}
      {/* <Analytics /> */}
      <GoogleOAuthProvider clientId="148433952091-s2n7r0q6de9q78vrjetkn3gok2o4nt2h.apps.googleusercontent.com">
        <CartProvider>
          <Globalstyle />
          {children}
        </CartProvider>
      </GoogleOAuthProvider>
    </>
  );
}
