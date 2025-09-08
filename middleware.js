// middleware.js
import { NextResponse } from "next/server";
import { i18n } from "./i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request) {
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    return locale;
  } catch (e) {
    // Fallback to default if there's an error
    return i18n.defaultLocale;
  }
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // This block is no longer needed because the matcher handles it, but it doesn't hurt to leave it.
  if (
    ["/manifest.json", "/favicon.ico"].includes(pathname) ||
    pathname.startsWith("/assets/")
  ) {
    return;
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }
}

// --- THE ONLY CHANGE IS HERE ---
export const config = {
  // Add 'robots.txt' and 'sitemap.xml' to the ignore list
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
