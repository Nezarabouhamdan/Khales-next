import "../../globals.css";
import "../../../fonts/style.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { getDictionary } from "@/get-dictionary";
import { i18n } from "@/i18n-config";

import StyledComponentsRegistry from "@/utils/registry";
import ClientProviders from "@/provider/ClientProvaders";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer New/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import CustomCursor from "@/components/CustomCursor";
import Calltoaction from "../../Calltoaction";
import LocalBusinessSchema from "@/components/LocalBusiness/LocalBusiness";
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

// --- تصحيح دالة Metadata ---
export async function generateMetadata(props) {
  const params = await props.params; // ✅ يجب الانتظار هنا
  const { lang } = params;

  const baseUrl = "https://www.khales.ae";

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

  return {
    title: {
      default: title,
      template: titleTemplate,
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
      siteName: lang === "ar" ? "مجموعة خالص" : "Khales Group",
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

// --- تصحيح دالة RootLayout (السبب الرئيسي للخطأ 500) ---
export default async function RootLayout(props) {
  const params = await props.params; // ✅ إضافة await ضرورية جداً في Next.js 15
  const { lang } = params;
  const { children } = props;

  const dictionary = await getDictionary(lang);
  const cookieContent = dictionary?.cookieConsent;

  // في حال فشل تحميل القاموس
  if (!dictionary) {
    return (
      <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
        <body>
          <div>Error: Dictionary could not be loaded.</div>
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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <LocalBusinessSchema />
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
              <i id="whatsapp" className="fa fa-whatsapp my-float"></i>
            </Link>
            <Calltoaction id="call" />
          </ClientProviders>
        </StyledComponentsRegistry>
        <CustomCursor />
        <CookieConsent lang={lang} content={cookieContent} />
      </body>
    </html>
  );
}
