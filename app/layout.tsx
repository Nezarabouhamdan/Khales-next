import type { Metadata } from "next";
import { Geist, Geist_Mono, Tajawal } from "next/font/google";
import { headers } from "next/headers";
import SmoothScroll from "./components/SmoothScroll";
import type { Locale } from "@/i18n-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Khales | Crafting Iconic Spaces",
  description:
    "Award-winning international architecture and interior design boutique.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const headersList = await headers();
  const lang = (headersList.get("x-lang") as Locale) || "en";
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} ${tajawal.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className={`min-h-full flex flex-col selection:bg-black selection:text-white ${
          lang === "ar" ? "font-[var(--font-tajawal)]" : ""
        }`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
