// app/[lang]/layout.js

import "../../globals.css";
import "../../../fonts/style.css"; // Corrected path assuming fonts is in root
import { Inter } from "next/font/google";
import Link from "next/link";
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

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

// This function tells Next.js to pre-build the 'en' and 'ar' routes

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// This is the ROOT METADATA. It acts as a fallback for pages
// that might not have their own specific metadata.

export async function generateMetadata({ params: { lang } }) {
  // You can even translate your fallback metadata
  const title =
    lang === "ar"
      ? "مجموعة خالص | للاستشارات الهندسية وإدارة المشاريع في دبي"
      : "Khales Group | Engineering Consultancy & Project Management in Dubai";

  const description =
    lang === "ar"
      ? "شركة رائدة في دبي متخصصة في التصميم المعماري، والتصميم الداخلي، وإدارة المشاريع للمباني السكنية والتجارية الفاخرة."
      : "A leading firm in Dubai specializing in architectural design, interior design, and project management for luxury residential and commercial properties.";

  return {
    title: {
      default: title,
      template: `%s | Khales Group`, // Child pages will append their title
    },
    description: description,
    metadataBase: new URL("https://www.khales.ae"),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en",
        "ar-AE": "/ar",
      },
    },
    openGraph: {
      title: title,
      description: description,
      url: "https://www.khales.ae",
      siteName: "Khales Group",
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

// This is the Root Layout component
export default async function RootLayout({ children, params }) {
  const lang = params.lang || i18n.defaultLocale;
  const dictionary = await getDictionary(lang);

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
        {/* Your <head> tags like scripts, fonts, etc. can go here */}
        {/* The LocalBusinessSchema will appear on every page for great SEO */}
        <LocalBusinessSchema />
      </head>
      <body>
        <SpeedInsights />
        <Analytics />

        <StyledComponentsRegistry>
          <ClientProviders>
            {/* The Navbar and Footer now wrap the main content */}
            <Navbar lang={lang} navigation={dictionary.navigation} />
            <main>{children}</main>
            <Footer lang={lang} content={dictionary.footer} />

            {/* Other sitewide components */}
            <ScrollToTop />
            <Link
              id="whatsapp"
              href="https://api.whatsapp.com/send?phone=+971551299880"
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
      </body>
    </html>
  );
}
