import { fromSqm } from "./engine";
import type { AreaUnit } from "./types";

// Western digits in both languages - matches how prices and areas are
// written across the rest of the site.
const integerFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export function formatNumber(value: number): string {
  return integerFormat.format(value);
}

/**
 * Money is shown rounded so a range never reads more precise than the
 * evidence behind it: nearest 1,000 from 10,000 up, nearest 10 below.
 */
export function roundMoney(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.abs(value) >= 10_000 ? Math.round(value / 1000) * 1000 : Math.round(value / 10) * 10;
}

export function formatMoney(value: number, currencyLabel: string): string {
  return `${formatNumber(roundMoney(value))} ${currencyLabel}`;
}

/**
 * Areas derived from a budget are floored - never overstate what fits. The
 * small epsilon keeps a unit round trip (100 sqft -> m² -> sqft = 99.9999...)
 * from losing a whole unit to floating point.
 */
export function formatArea(sqm: number, unit: AreaUnit, unitLabel: string): string {
  return `${formatNumber(Math.floor(fromSqm(sqm, unit) + 1e-6))} ${unitLabel}`;
}

const AR_QUARTERS = ["الربع الأول", "الربع الثاني", "الربع الثالث", "الربع الرابع"];

/**
 * Anchor dates / index periods come as "YYYY", "YYYY-Qn", "YYYY-MM" or
 * "YYYY-MM-DD" in the rates file; render them for people.
 */
export function formatPeriod(value: string, lang: "en" | "ar"): string {
  const quarter = /^(\d{4})-Q([1-4])$/.exec(value);
  if (quarter) {
    const [, year, q] = quarter;
    return lang === "ar" ? `${AR_QUARTERS[Number(q) - 1]} ${year}` : `Q${q} ${year}`;
  }
  const locale = lang === "ar" ? "ar-u-nu-latn" : "en-GB";
  const day = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (day) {
    const date = new Date(Date.UTC(Number(day[1]), Number(day[2]) - 1, Number(day[3])));
    return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
      date,
    );
  }
  const month = /^(\d{4})-(\d{2})$/.exec(value);
  if (month) {
    const date = new Date(Date.UTC(Number(month[1]), Number(month[2]) - 1, 1));
    return new Intl.DateTimeFormat(locale, { month: "short", year: "numeric", timeZone: "UTC" }).format(date);
  }
  return value;
}

/** Today's date for the estimate card / PDF, e.g. "25 Oct 2026". */
export function formatEstimateDate(date: Date, lang: "en" | "ar"): string {
  const locale = lang === "ar" ? "ar-u-nu-latn" : "en-GB";
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" }).format(date);
}

/** Replaces {name} placeholders in dictionary strings. */
export function fillTemplate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match));
}
