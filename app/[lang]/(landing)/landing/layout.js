import { Inter } from "next/font/google";
import StyledComponentsRegistry from "@/utils/registry";
import Script from "next/script"; // Import the Script component
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

// We can define a minimal metadata object here as a fallback,
// but the page.js metadata will take priority.
export const metadata = {
  title: "Khales Landing Page",
  description: "Special offer from Khales Group.",
};

// This is a self-contained Root Layout for the landing page group.
export default async function LandingLayout(props) {
  const { children } = props;
  const { lang } = await props.params;

  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <head>
        {/* <Script
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
        </Script>{" "}
        <Script id="google-tag-manager-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TNHGBH7J');
          `}
        </Script>
        {/* Google Tag Manager */}
        {/* <Script
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
        </Script>{" "}
         */}
      </head>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Analytics />

          {/* We do NOT include the Navbar or Footer here. */}
          {/* We only render the page content. */}
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
