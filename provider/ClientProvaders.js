'use client';

import { LanguageProvider } from "@/Context/Languagecontext";
import Analytics from "@/utils/Analytics";
import CookieConsent from "@/utils/CookieConsent";
import { Globalstyle } from "@/utils/Globalstyles";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function ClientProviders({ children }) {
  return (
    <LanguageProvider>
      <CookieConsent />
      <Analytics />
      <GoogleOAuthProvider clientId="148433952091-s2n7r0q6de9q78vrjetkn3gok2o4nt2h.apps.googleusercontent.com">
        <Globalstyle />
        {children}
      </GoogleOAuthProvider>
    </LanguageProvider>
  );
}