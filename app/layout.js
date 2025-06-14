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

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
