import { Inter } from "next/font/google";
import StyledComponentsRegistry from "@/utils/registry";
import Script from "next/script"; // Import the Script component

const inter = Inter({ subsets: ["latin"] });

// We can define a minimal metadata object here as a fallback,
// but the page.js metadata will take priority.
export const metadata = {
  title: "Khales Landing Page",
  description: "Special offer from Khales Group.",
};

// This is a self-contained Root Layout for the landing page group.
export default function LandingLayout({ children, params: { lang } }) {
  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-FYYEQCM8Z7"
        />
        <Script id="google-analytics-gtag" strategy="afterInteractive">
          {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-FYYEQCM8Z7');
      `}
        </Script>
        {/* Google Tag Manager */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-10827937555"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-10827937555');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          {/* We do NOT include the Navbar or Footer here. */}
          {/* We only render the page content. */}
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
