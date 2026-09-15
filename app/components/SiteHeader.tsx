"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n-config";
import type { NavigationDict } from "@/dictionaries/types";

const footerLinks = [
  { label: "FAQ", href: "/contact" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
];

type SiteHeaderProps = {
  lang?: Locale;
  navigation?: NavigationDict;
};

const defaultNavigation: NavigationDict = {
  items: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  ctaButton: "Get in touch",
};

export default function SiteHeader({ lang = "en", navigation = defaultNavigation }: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isRTL = lang === "ar";

  const otherLang: Locale = lang === "ar" ? "en" : "ar";
  const pathWithoutLang = pathname?.replace(new RegExp(`^/(en|ar)`), "") || "";
  const switchHref = `/${otherLang}${pathWithoutLang}`;
  const navLinks = navigation.items.map((item) => ({
    label: item.label,
    href: `/${lang}${item.href === "/" ? "" : item.href}`,
    active: item.href,
  }));

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-5 flex justify-between items-center backdrop-blur-md bg-black/10 border-b border-white/5 text-[#9e9d9c] font-normal text-[1.1111vw]">
      <div
        className="relative"
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        <button
          type="button"
          className={`relative flex items-center gap-3 cursor-pointer transition-colors duration-300 rounded-t-2xl px-4 -mx-4 py-2 -my-2 ${
            menuOpen ? "bg-[#f7f7f7]" : ""
          }`}
        >
          <span className="relative w-5 flex flex-col gap-1">
            <span
              className={`w-5 h-0.5 transition-transform ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              } ${menuOpen ? "bg-neutral-900" : "bg-white"}`}
            />
            <span
              className={`w-5 h-0.5 transition-opacity ${
                menuOpen ? "opacity-0" : "opacity-100"
              } ${menuOpen ? "bg-neutral-900" : "bg-white"}`}
            />
            <span
              className={`w-5 h-0.5 transition-transform ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              } ${menuOpen ? "bg-neutral-900" : "bg-white"}`}
            />
          </span>
          <span
            className={`text-xs uppercase tracking-widest font-medium transition-colors ${
              menuOpen ? "text-neutral-900" : "text-white"
            }`}
          >
            {menuOpen ? "Close" : "Menu"}
          </span>
        </button>

        <div
          className={`absolute top-full start-0 w-[92vw] max-w-[420px] rounded-b-2xl bg-[#f7f7f7] p-8 pt-4 text-neutral-900 shadow-2xl transition-all duration-300 ${
            isRTL ? "rounded-tl-2xl origin-top-right" : "rounded-tr-2xl origin-top-left"
          } ${
            menuOpen
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
          }`}
        >
          <nav className="flex flex-col mb-10">
            {navLinks.map((link) => {
              const isActive =
                link.active === "/"
                  ? pathWithoutLang === ""
                  : pathWithoutLang.startsWith(link.active);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-4xl font-medium leading-snug transition-colors ${
                    isActive
                      ? "text-neutral-900"
                      : "text-neutral-400 hover:text-neutral-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-neutral-200 text-xs uppercase tracking-widest text-neutral-400">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href === "#" ? "#" : `/${lang}${link.href}`}
                className="underline underline-offset-2 hover:text-neutral-900"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <Link href={`/${lang}`}>
          <Image
            src="/logo-mark.png"
            alt="Khales"
            width={210}
            height={50}
            className="h-4 md:h-6 w-auto"
          />
        </Link>
      </div>

      <div className="relative flex items-center gap-6">
        {/* Plain <a>, not next/link: switching locale must be a full page
            load. The root layout reads the request's x-lang header (set by
            proxy.ts) to pick <html lang/dir> - it's a Server Component
            outside the [lang] segment, so a client-side transition between
            /en and /ar reuses it as-is and never flips dir, leaving RTL
            pages laid out as LTR (menu flown off-screen, etc.) until a hard
            reload. A real navigation forces that reload. */}
        <a
          href={switchHref}
          className="text-xs tracking-widest hidden md:block underline underline-offset-4 opacity-90 hover:opacity-100 uppercase"
        >
          {otherLang}
        </a>
        <Link
          href={`/${lang}/contact`}
          className="text-xs uppercase tracking-widest font-medium px-5 py-2.5 rounded-md bg-white text-black hover:bg-neutral-200 transition-colors"
        >
          {navigation.ctaButton}
        </Link>
      </div>
    </header>
  );
}
