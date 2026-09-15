import type { Metadata } from "next";
import { Geist, Geist_Mono, Tajawal } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  // No headers()/cookies() here on purpose: reading either would opt this
  // layout (and everything under it) out of static rendering, forcing a
  // fresh serverless invocation - and its cold start - on every single
  // request instead of Vercel serving a cached/static response. lang/dir
  // is instead set lower down, on a wrapper inside app/[lang]/layout.tsx,
  // which gets `lang` as a route param (generateStaticParams-friendly)
  // rather than a request header. `[dir="rtl"] *` in globals.css and every
  // section's own `dir={dir}` attribute already scope off that wrapper,
  // not off <html>, so this doesn't change any RTL styling - the only
  // loss is the native scrollbar not flipping side on RTL pages.
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${tajawal.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col selection:bg-black selection:text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
