import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import "../fonts/style.css";
import ClientProviders from "@/provider/ClientProvaders";
import Link from "next/link";
import { footerData } from "../data/FooterData";
import StyledComponentsRegistry from "@/utils/registry";
import ScrollToTop from "@/components/ScrollToTop";
import Script from "next/script";
import Calltoaction from "./Calltoaction";
import Footer from "@/components/Footer New/Footer";
import { Inter } from "next/font/google";
import Head from "next/head";
import CustomCursor from "@/components/CustomCursor";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

// Import enhanced structured data
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  professionalServiceSchema,
} from "../enhanced_structured_data";

// Optimize font loading for FCP
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata = {
  title: "Khales - Premier Architecture & Interior Design Company Dubai, UAE",
  description:
    "Khales is Dubai's leading architecture and interior design company specializing in luxury residential and commercial projects. Expert project management, engineering consultancy, and development planning services across UAE. Transform your vision into reality with our award-winning team.",
  keywords: [
    "architecture Dubai",
    "interior design Dubai",
    "architecture firms UAE",
    "interior design companies Dubai",
    "luxury interior design Dubai",
    "commercial architecture Dubai",
    "residential design UAE",
    "project management Dubai",
    "engineering consultancy UAE",
    "development planning Dubai",
    "fit-out companies Dubai",
    "architectural services UAE",
    "building contractors Dubai",
    "landscape design Dubai",
    "sustainable architecture UAE",
    "villa design Dubai",
    "office interior design Dubai",
    "modern interior design Dubai",
    "contemporary architecture UAE",
    "luxury villa design Dubai",
    "commercial interior design Dubai",
    "residential interior design Dubai",
    "best architects Dubai",
    "top interior designers UAE",
    "architecture firms in Dubai",
    "interior designers near me",
    "Khales",
    "Dubai architects",
    "UAE interior designers",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Khales - Premier Architecture & Interior Design Company Dubai, UAE",
    description:
      "Dubai's leading architecture and interior design company specializing in luxury residential and commercial projects. Expert project management, engineering consultancy, and development planning services across UAE.",
    url: "https://www.khales.ae/",
    siteName: "Khales",
    images: [
      {
        url: "https://www.khales.ae/assets/Khales-Logo.png",
        width: 1200,
        height: 630,
        alt: "Khales - Premier Architecture & Interior Design Company Dubai",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khales - Premier Architecture & Interior Design Company Dubai, UAE",
    description:
      "Dubai's leading architecture and interior design company specializing in luxury residential and commercial projects across UAE.",
    images: ["https://www.khales.ae/assets/Khales-Logo.png"],
  },
  authors: [{ name: "Khales Team", url: "https://www.khales.ae/" }],
  creator: "Khales",
  publisher: "Khales",
  metadataBase: new URL("https://www.khales.ae/"),
  alternates: {
    canonical: "https://www.khales.ae/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
};

const META_PIXEL_ID = "3634194126882623"; // Replace with your actual pixel ID

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <head>
        {/* Preload critical resources for FCP optimization */}
        <link rel="preload" href="/assets/Khales-Logo.png" as="image" />
        <link rel="preload" href="/fonts/style.css" as="style" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Enhanced Structured Data - Multiple Schemas */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <Script
          id="local-business-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />

        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        <Script
          id="professional-service-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceSchema),
          }}
        />

        {/* Google Analytics - Optimized loading */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FYYEQCM8Z7"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-google"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-FYYEQCM8Z7');
      `,
          }}
        />

        {/* Meta Pixel - Optimized loading */}
        <Script
          id="facebook-meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
        n.callMethod.apply(n,arguments) : n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');
      `,
          }}
        />

        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-TNHGBH7J');
    `,
          }}
        />

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
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
        <ScrollToTop />
        <StyledComponentsRegistry>
          <ClientProviders>
            <div className="uc-embed" uc-embed-show-toggle="true"></div>
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
            />
            <Link
              id="whatsapp"
              href="https://api.whatsapp.com/send?phone=+971551299880&text=Hi Khales Team! 👋

I'm interested in your [Project Management / Development Planning / Interior Design] services.

Could you please provide more details and help me get started?"
              className="float"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i id="whatsapp" className="fa fa-whatsapp my-float"></i>
            </Link>
            <Calltoaction id="call" />
            <main>{children}</main>
          </ClientProviders>
        </StyledComponentsRegistry>
        <CustomCursor />
      </body>
    </html>
  );
}
