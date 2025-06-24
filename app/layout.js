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

export const metadata = {
  title: "Welcome to Khales",
  description:
    "Welcome to Khales. Explore our luxury design and project management solutions.",
  keywords: [
    "Khales",
    "Luxury Design",
    "Interior Design",
    "Architecture",
    "Project Management",
    "Construction",
    "Khales Projects",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services",
    description:
      "Welcome to Khales. Explore our luxury design and project management solutions.",
  },
  authors: [{ name: "Khales Team", url: "https://www.khales.ae/" }],
  creator: "Khales",
  metadataBase: new URL("https://www.khales.ae/"),
};
const META_PIXEL_ID = "3634194126882623"; // Replace with your actual pixel ID

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FYYEQCM8Z7"
        ></Script>
        <Script
          dangerouslySetInnerHTML={{
            __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'G-FYYEQCM8Z7');
                    `,
          }}
        />
        {/*      <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-10827937555"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-10827937555');
          `}
        </Script>  */}
        {/* Define conversion event snippet */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
              n.callMethod.apply(n,arguments) : n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'Script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      </head>
      <body>
        {" "}
        <ScrollToTop />
        <StyledComponentsRegistry>
          <ClientProviders>
            <div className="uc-embed" uc-embed-show-toggle="true"></div>
            <Navbar />
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
            />
            <Link
              href="https://api.whatsapp.com/send?phone=+971551299880&text=Hi Khales Team! 👋

I’m interested in your [Project Management / Development Planning / Interior Design] services.

Could you please provide more details and help me get started?"
              className="float"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-whatsapp my-float"></i>
            </Link>
            <Calltoaction />
            <main>{children}</main>
            <Footer />{" "}
          </ClientProviders>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
