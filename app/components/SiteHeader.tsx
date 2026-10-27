"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n-config";
import type { NavigationDict } from "@/dictionaries/types";

type SiteHeaderProps = {
  lang?: Locale;
  navigation?: NavigationDict;
  // "light" (default): a near-opaque white bar with dark ink and the black +
  // green logo, readable over any page top, light or dark.
  // "dark": white chrome on a faint tint, only legible over a dark hero.
  tone?: "dark" | "light";
};

// The switch names the other language in that language - clearer than a
// bare "ar" / "en".
const LANGUAGE_NAMES: Record<Locale, string> = { en: "English", ar: "العربية" };

const defaultNavigation: NavigationDict = {
  items: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  ctaButton: "Get in touch",
  faqLabel: "FAQ",
  privacyLabel: "Privacy Policy",
  termsLabel: "Terms of Use",
};

export default function SiteHeader({ lang = "en", navigation = defaultNavigation, tone = "light" }: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isRTL = lang === "ar";
  const light = tone === "light";
  const barColor = menuOpen || light ? "bg-neutral-900" : "bg-white";

  const otherLang: Locale = lang === "ar" ? "en" : "ar";
  const pathWithoutLang = pathname?.replace(new RegExp(`^/(en|ar)`), "") || "";
  const switchHref = `/${otherLang}${pathWithoutLang}`;
  const navLinks = navigation.items.map((item) => ({
    label: item.label,
    href: `/${lang}${item.href === "/" ? "" : item.href}`,
    active: item.href,
  }));

  return (
    <header
      // Three columns with equal outer tracks, so the logo sits at the true
      // centre however wide the menu and CTA sides are.
      className={`fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-5 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-3 items-center backdrop-blur-md font-normal text-[1.1111vw] ${
        light ? "bg-white/85 border-b border-neutral-200 text-neutral-900" : "bg-black/10 border-b border-white/5 text-[#9e9d9c]"
      }`}
    >
      <div
        className="relative justify-self-start"
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
              } ${barColor}`}
            />
            <span
              className={`w-5 h-0.5 transition-opacity ${
                menuOpen ? "opacity-0" : "opacity-100"
              } ${barColor}`}
            />
            <span
              className={`w-5 h-0.5 transition-transform ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              } ${barColor}`}
            />
          </span>
          <span
            className={`text-xs uppercase tracking-widest font-medium transition-colors ${
              menuOpen || light ? "text-neutral-900" : "text-white"
            }`}
          >
            {menuOpen ? (isRTL ? "إغلاق" : "Close") : isRTL ? "القائمة" : "Menu"}
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
                  className={`inline-flex items-center gap-3 text-4xl font-medium leading-snug transition-colors ${
                    isActive
                      ? "text-neutral-900"
                      : "text-neutral-400 hover:text-neutral-900"
                  }`}
                >
                  {link.label}
                  {isActive && <span aria-hidden className="h-2 w-2 rounded-full bg-brand" />}
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-neutral-200 text-xs uppercase tracking-widest text-neutral-400">
            {[
              { label: navigation.faqLabel, href: "/faq" },
              { label: navigation.privacyLabel, href: "/privacy-policy" },
              { label: navigation.termsLabel, href: "/terms-and-conditions" },
            ].map((link) => (
              <Link
                key={link.href}
                href={`/${lang}${link.href}`}
                className="underline underline-offset-2 hover:text-neutral-900"
              >
                {link.label}
              </Link>
            ))}
            {/* Phones don't get the header's language switch - it lives here. */}
            <a
              href={switchHref}
              className="md:hidden normal-case tracking-normal text-sm font-semibold text-neutral-900 underline underline-offset-2"
            >
              {LANGUAGE_NAMES[otherLang]}
            </a>
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <Link href={`/${lang}`}>
          {/* The main bilingual logo with its brand-green accents: black on
              light pages, white over the dark heroes. `sizes` matches the
              rendered ~80-104px width so next/image doesn't fetch a
              full-size file. */}
          <Image
            src={light ? "/logo-color.png" : "/logo-color-white.png"}
            alt="Khales"
            width={2536}
            height={1174}
            sizes="(max-width: 768px) 80px, 104px"
            className="h-9 md:h-12 w-auto"
            priority
          />
        </Link>
      </div>

      <div className="relative flex items-center justify-self-end gap-6">
        {/* Plain <a>, not next/link: switching locale must be a full page
            load. The root layout reads the request's x-lang header (set by
            proxy.ts) to pick <html lang/dir> - it's a Server Component
            outside the [lang] segment, so a client-side transition between
            /en and /ar reuses it as-is and never flips dir, leaving RTL
            pages laid out as LTR (menu flown off-screen, etc.) until a hard
            reload. A real navigation forces that reload. */}
        <a
          href={switchHref}
          lang={otherLang}
          className={`hidden md:inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
            light
              ? "border-neutral-300 text-neutral-900 hover:border-neutral-900"
              : "border-white/50 text-white hover:bg-white/10"
          }`}
        >
          {LANGUAGE_NAMES[otherLang]}
        </a>
        {/* Points at the cost calculator rather than /contact - it's the
            higher-intent, lead-generating action, and the shimmer sweep
            (a light band crossing the button every 3s, CSS-only via
            .animate-cta-shimmer in globals.css) is there so this specific
            CTA reads as worth a second look instead of blending into the
            rest of the header's static chrome. */}
        <Link
          href={`/${lang}/calculator`}
          // Narrower on phones (the label may wrap to two lines) so it
          // fits its half of the header and the logo stays centred.
          className={`relative overflow-hidden inline-flex items-center max-w-[7.5rem] md:max-w-none text-[10px] md:text-xs leading-tight uppercase tracking-normal md:tracking-widest font-medium px-3 md:px-5 py-2 md:py-2.5 rounded-md transition-colors ${
            light ? "bg-neutral-900 text-white hover:bg-neutral-700" : "bg-white text-black hover:bg-neutral-200"
          }`}
        >
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent to-transparent animate-cta-shimmer ${
              light ? "via-white/20" : "via-black/10"
            }`}
          />
          <span aria-hidden className="relative me-2 h-1.5 w-1.5 rounded-full bg-brand" />
          <span className="relative">{navigation.ctaButton}</span>
        </Link>
      </div>
    </header>
  );
}
