import { Inter } from "next/font/google";
import StyledComponentsRegistry from "@/utils/registry";

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
