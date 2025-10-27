import "../../globals.css";
import "../../../fonts/style.css"; // Corrected path assuming fonts is in root
import { Inter } from "next/font/google";
import Link from "next/link";
import Script from "next/script"; // Import the Script component
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

// Import All Your Layout Components and Providers
import StyledComponentsRegistry from "@/utils/registry";
import ClientProviders from "@/provider/ClientProvaders";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer New/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import CustomCursor from "@/components/CustomCursor";
import Calltoaction from "../../Calltoaction";
import LocalBusinessSchema from "@/components/LocalBusiness/LocalBusiness";
import { FaEnvelope } from "react-icons/fa";
import CookieConsent from "@/utils/CookieConsent";
import SiteProtection from "@/utils/SiteProtection";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// In app/[lang]/layout.js

export async function generateMetadata({ params: { lang } }) {
  const baseUrl = "https://www.khales.ae";

  // --- THE FIX IS HERE ---
  // We create conditional variables for both the title and the template
  const title =
    lang === "ar"
      ? "مجموعة خالص | للاستشارات الهندسية وإدارة المشاريع في الإمارات"
      : "Khales Group | Engineering Consultancy & Project Management in UAE";

  const description =
    lang === "ar"
      ? "شركة رائدة في دبي متخصصة في التصميم المعماري، والتصميم الداخلي، وإدارة المشاريع للمباني السكنية والتجارية الفاخرة."
      : "A leading firm in Dubai specializing in architectural design, interior design, and project management for luxury residential and commercial properties.";

  const titleTemplate =
    lang === "ar" ? "%s | مجموعة خالص" : "%s | Khales Group";
  // --- END OF FIX ---

  return {
    title: {
      default: title,
      template: titleTemplate, // <-- Use the new conditional template
    },
    description: description,
    metadataBase: new URL("https://www.khales.ae"),
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: { "en-US": "/en", "ar-AE": "/ar" },
    },
    openGraph: {
      title: title,
      description: description,
      url: `${baseUrl}/${lang}`,
      siteName: lang === "ar" ? "مجموعة خالص" : "Khales Group", // Also make siteName conditional
      images: [
        {
          url: "https://www.khales.ae/assets/Khales-Logo.png",
          width: 1200,
          height: 630,
        },
      ],
      locale: lang === "ar" ? "ar_AE" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
    },
  };
}

export default async function RootLayout({ children, params }) {
  const lang = params.lang || i18n.defaultLocale;
  const dictionary = await getDictionary(lang);
  const cookieContent = dictionary.cookieConsent;
  if (!dictionary) {
    return (
      <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
        <body>
          <div>
            Error: Dictionary could not be loaded. Please check server logs.
          </div>
        </body>
      </html>
    );
  }

  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={inter.className}
    >
      <head>
        {" "}
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
        </Script>
        <Script id="google-ads-click-conversion" strategy="lazyOnload">
          {`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-10827937555/BC6DCMzwjogbEJPulKso',
                  'value': 1.0,
                  'currency': 'AED',
                  'event_callback': callback
              });
              return false;
            }
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
        </Script> */}
        {/* ================= THE FIX IS HERE ================= */}
        {/* Add the link to the Font Awesome stylesheet. */}
        {/* This will load the CSS needed to render the icons. */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        {/* ====================================================== */}
        <LocalBusinessSchema />{" "}
        <meta property="fb:app_id" content="1160662655535691" />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TNHGBH7J"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <SpeedInsights />
        <Analytics />
        <StyledComponentsRegistry>
          <ClientProviders>
            <Navbar lang={lang} navigation={dictionary.navigation} />
            <SiteProtection>
              {" "}
              <main>{children}</main>
            </SiteProtection>
            <Footer lang={lang} content={dictionary.footer} />
            <ScrollToTop />
            <Link
              id="whatsapp"
              href="https://api.whatsapp.com/send?phone=971551299880"
              className="float"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* This \`<i>\` tag will now be correctly replaced by the WhatsApp icon */}
              <i id="whatsapp" className="fa fa-whatsapp my-float"></i>
            </Link>
            <Calltoaction id="call" />
          </ClientProviders>
        </StyledComponentsRegistry>
        <CustomCursor /> <CookieConsent lang={lang} content={cookieContent} />
      </body>
    </html>
  );
}
