"use client";

import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n-config";
import type { FooterDict } from "@/dictionaries/types";

const defaultFooter: FooterDict = {
  description:
    "Award-winning international architecture and interior design boutique, crafting iconic spaces around the world.",
  servicesTitle: "Sitemap",
  servicesLinks: [
    { text: "Home", href: "/" },
    { text: "Projects", href: "/projects" },
  ],
  companyTitle: "Legal",
  companyLinks: [
    { text: "About", href: "/about" },
    { text: "Contact", href: "/contact" },
  ],
  contactTitle: "Contact",
  email: "info@khales.ae",
  phone: "+971 XX XXX XXXX",
  copyright: "Copyright © {year} KHALES",
  legal: {
    rights: "All Rights Reserved",
    terms: { text: "Terms of Use", href: "/terms-and-conditions" },
    privacy: { text: "Privacy Policy", href: "/privacy-policy" },
  },
};

type SiteFooterProps = {
  lang?: Locale;
  content?: FooterDict;
};

export default function SiteFooter({ lang = "en", content = defaultFooter }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const localize = (href: string) => (href === "#" ? "#" : `/${lang}${href}`);

  const columns = [
    { heading: content.servicesTitle, links: content.servicesLinks },
    { heading: content.companyTitle, links: content.companyLinks },
  ];

  return (
    <footer className="relative bg-[#1a1a1a] text-neutral-400 px-6 md:px-16 pt-16 pb-8 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-6 pb-12 border-b border-white/10">
          <div className="flex flex-col gap-6 max-w-sm">
            <Image
              src="/logo-mark.png"
              alt="Khales"
              width={210}
              height={50}
              // The parent is a flex column with no items-start, so flex's
              // default align-items:stretch was forcing this image to fill
              // the column's full width (up to max-w-sm, ~384px) instead
              // of respecting w-auto's aspect-ratio-based sizing -
              // stretching the logo's actual pixels to fill that box.
              className="h-7 w-auto self-start"
            />
            <p className="text-sm leading-relaxed text-neutral-500">
              {content.description}
            </p>
            <div className="flex items-center gap-4 pt-1">
              <a
                href="https://www.instagram.com/khales.ae/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <path d="M16.0013 11.9993C13.7915 11.9993 12.0013 13.7901 12.0013 15.9993C12.0013 18.2091 13.7921 19.9993 16.0013 19.9993C18.2111 19.9993 20.0013 18.2085 20.0013 15.9993C20.0013 13.7896 18.2105 11.9993 16.0013 11.9993ZM16.0013 9.33268C19.6819 9.33268 22.668 12.3155 22.668 15.9993C22.668 19.68 19.6852 22.666 16.0013 22.666C12.3207 22.666 9.33464 19.6832 9.33464 15.9993C9.33464 12.3187 12.3174 9.33268 16.0013 9.33268ZM24.668 8.99822C24.668 9.91836 23.9203 10.6649 23.0013 10.6649C22.0812 10.6649 21.3347 9.91721 21.3347 8.99822C21.3347 8.07922 22.0823 7.33268 23.0013 7.33268C23.9191 7.33152 24.668 8.07922 24.668 8.99822ZM16.0013 5.33268C12.702 5.33268 12.1642 5.34142 10.6297 5.40975C9.5842 5.45883 8.88337 5.59944 8.23221 5.85224C7.65354 6.07667 7.23612 6.34466 6.79136 6.78941C6.34489 7.23588 6.07738 7.65219 5.85386 8.23112C5.60048 8.88378 5.4599 9.5835 5.4117 10.6275C5.3427 12.0996 5.33464 12.6141 5.33464 15.9993C5.33464 19.2987 5.34337 19.8364 5.41169 21.3708C5.4608 22.4159 5.6016 23.1177 5.85378 23.7673C6.0788 24.3468 6.34733 24.7652 6.78994 25.2079C7.23817 25.6555 7.65572 25.9239 8.22916 26.1452C8.88825 26.4 9.58864 26.5408 10.6295 26.5889C12.1016 26.6579 12.616 26.666 16.0013 26.666C19.3007 26.666 19.8384 26.6572 21.3728 26.5889C22.4156 26.54 23.118 26.3988 23.7693 26.1468C24.3472 25.9224 24.7669 25.6529 25.2099 25.2107C25.6581 24.7617 25.926 24.3452 26.1476 23.7704C26.4017 23.1137 26.5428 22.4124 26.5909 21.3712C26.6599 19.8991 26.668 19.3845 26.668 15.9993C26.668 12.7 26.6592 12.1623 26.5909 10.6278C26.5419 9.58476 26.4007 8.88134 26.1484 8.23026C25.9245 7.65319 25.6556 7.23448 25.2112 6.78941C24.764 6.34222 24.3488 6.07526 23.7695 5.85191C23.1173 5.59874 22.4165 5.45796 21.3731 5.40976C19.9011 5.34075 19.3865 5.33268 16.0013 5.33268ZM16.0013 2.66602C19.6235 2.66602 20.0757 2.67935 21.498 2.74602C22.9168 2.81158 23.8847 3.03602 24.7347 3.36602C25.6135 3.70491 26.3557 4.16268 27.0968 4.90379C27.8368 5.64491 28.2947 6.38935 28.6347 7.26602C28.9635 8.11491 29.188 9.08379 29.2547 10.5027C29.318 11.9249 29.3347 12.3771 29.3347 15.9993C29.3347 19.6216 29.3213 20.0737 29.2547 21.496C29.1891 22.9149 28.9635 23.8827 28.6347 24.7327C28.2957 25.6116 27.8368 26.3537 27.0968 27.0949C26.3557 27.8349 25.6101 28.2927 24.7347 28.6327C23.8847 28.9616 22.9168 29.186 21.498 29.2527C20.0757 29.316 19.6235 29.3327 16.0013 29.3327C12.3791 29.3327 11.9268 29.3193 10.5046 29.2527C9.08574 29.1871 8.11908 28.9616 7.26797 28.6327C6.39018 28.2937 5.64685 27.8349 4.90574 27.0949C4.16464 26.3537 3.70797 25.6083 3.36797 24.7327C3.03797 23.8827 2.81464 22.9149 2.74797 21.496C2.68464 20.0737 2.66797 19.6216 2.66797 15.9993C2.66797 12.3771 2.6813 11.9249 2.74797 10.5027C2.81352 9.08268 3.03797 8.11601 3.36797 7.26602C3.70685 6.38824 4.16464 5.64491 4.90574 4.90379C5.64685 4.16268 6.3913 3.70602 7.26797 3.36602C8.11797 3.03602 9.08464 2.81268 10.5046 2.74602C11.9268 2.68268 12.3791 2.66602 16.0013 2.66602Z" />
                </svg>
              </a>
              <a
                href="https://www.pinterest.com/khalesae/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <path d="M11.3221 25.5876C11.3538 25.1388 11.4174 24.6925 11.5127 24.2523C11.5967 23.8595 11.8516 22.7455 12.225 21.1324L12.2344 21.0915C12.3986 20.3823 12.5745 19.6249 12.7504 18.8693C12.856 18.4159 12.9381 18.0639 12.9925 17.9463C12.7335 17.3491 12.604 16.7011 12.6129 16.0491C12.6129 14.2659 13.6209 12.8841 14.9277 12.8841C15.4073 12.8768 15.8661 13.0845 16.1844 13.4527C16.5019 13.82 16.6484 14.3107 16.5872 14.7807C16.5872 15.384 16.4731 15.8452 15.982 17.4943C15.8877 17.8109 15.8232 18.0332 15.762 18.2553C15.6928 18.5059 15.6348 18.7331 15.5849 18.9508C15.4571 19.4664 15.5748 20.014 15.9016 20.4253C16.2276 20.8356 16.7228 21.0615 17.2425 21.0343C19.2323 21.0343 20.7095 18.3875 20.7095 14.9696C20.7095 12.3434 18.9883 10.605 16.1333 10.6049C14.6965 10.5477 13.2995 11.0997 12.2679 12.1325C11.2355 13.1661 10.6594 14.5909 10.6741 16.0812C10.6428 16.8837 10.8942 17.6708 11.3574 18.2731C11.5989 18.4581 11.6916 18.784 11.5902 19.0581C11.5354 19.2836 11.4034 19.7957 11.3553 19.9667C11.3262 20.1369 11.22 20.2835 11.0683 20.3613C10.9157 20.4397 10.7356 20.4389 10.5949 20.3643C9.04676 19.7265 8.19956 17.9944 8.19956 15.7792C8.19956 11.7981 11.5217 8.33228 16.4556 8.33228C20.6363 8.33228 23.7641 11.4375 23.7641 15.1855C23.7641 19.8953 21.1881 23.3249 17.5116 23.3249C16.4524 23.3596 15.4451 22.882 14.7827 22.046L14.7253 22.282C14.5999 22.7983 14.5371 23.0564 14.4491 23.4177L14.4465 23.428C14.2516 24.2283 14.1156 24.784 14.0628 24.9929C13.9216 25.4657 13.7427 25.93 13.5295 26.3781C14.3228 26.5664 15.1504 26.666 16.0013 26.666C21.8924 26.666 26.668 21.8904 26.668 15.9993C26.668 10.1083 21.8924 5.33268 16.0013 5.33268C10.1103 5.33268 5.33464 10.1083 5.33464 15.9993C5.33464 20.2119 7.77658 23.8541 11.3221 25.5876ZM16.0013 29.3327C8.6375 29.3327 2.66797 23.3631 2.66797 15.9993C2.66797 8.63555 8.6375 2.66602 16.0013 2.66602C23.3651 2.66602 29.3347 8.63555 29.3347 15.9993C29.3347 23.3631 23.3651 29.3327 16.0013 29.3327Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-12 md:gap-20">
            {columns.map((col) => (
              <div key={col.heading} className="flex flex-col gap-3">
                <p className="text-xs uppercase tracking-widest text-neutral-600 mb-1">
                  {col.heading}
                </p>
                {col.links.map((link) => (
                  <Link
                    key={link.text}
                    href={localize(link.href)}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            ))}

            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-widest text-neutral-600 mb-1">
                {content.contactTitle}
              </p>
              <a
                href={`mailto:${content.email}`}
                className="text-sm hover:text-white transition-colors"
              >
                {content.email}
              </a>
              <a
                href={`tel:${content.phone.replace(/\s+/g, "")}`}
                dir="ltr"
                className="text-sm hover:text-white transition-colors inline-block"
              >
                {content.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-xs text-neutral-500 gap-4">
          <p>{content.copyright.replace("{year}", String(year))} — {content.legal.rights}.</p>
          <div className="flex items-center gap-6">
            <Link href={localize(content.legal.terms.href)} className="hover:text-white transition-colors">
              {content.legal.terms.text}
            </Link>
            <Link href={localize(content.legal.privacy.href)} className="hover:text-white transition-colors">
              {content.legal.privacy.text}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
