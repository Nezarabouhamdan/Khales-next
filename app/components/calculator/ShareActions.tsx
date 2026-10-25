"use client";

import { useState, useSyncExternalStore, type RefObject } from "react";
import { FaDownload, FaFilePdf, FaShareNodes } from "react-icons/fa6";
import type { jsPDF } from "jspdf";
import type { CalculatorDict } from "@/dictionaries/types";
import { fillTemplate } from "@/lib/calculator/format";
import { renderShareCard, type ShareCardData } from "@/lib/calculator/shareCard";

type ShareActionsProps = {
  dictionary: CalculatorDict;
  // Null while the reference is being issued - both actions wait for it.
  reference: string | null;
  // The on-screen estimate sheet; it becomes the PDF as it is.
  pdfTargetRef: RefObject<HTMLElement | null>;
  // Card content (never personal data); null until there is a reference.
  card: ShareCardData | null;
};

type Busy = "card" | "pdf" | null;

// "Keep the estimate & share the card": both files are made in the
// browser from what is already on screen - no form, no lead, no request.
export default function ShareActions({ dictionary, reference, pdfTargetRef, card }: ShareActionsProps) {
  const [busy, setBusy] = useState<Busy>(null);
  const canShareFiles = useSyncExternalStore(subscribeToNothing, supportsFileShare, () => false);
  const disabled = !reference || !card || busy !== null;

  const handleCard = async () => {
    if (!reference || !card || busy) return;
    setBusy("card");
    try {
      const target = pdfTargetRef.current;
      const blob = await renderShareCard(card, {
        fontFamily: target ? window.getComputedStyle(target).fontFamily : undefined,
      });
      const file = new File([blob], `khales-estimate-${reference}.png`, { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], text: fillTemplate(dictionary.shareText, { reference }) });
          return;
        } catch (error) {
          // Closing the share sheet isn't a failure. Anything else (e.g. the
          // browser refusing a share that no longer counts as a tap) falls
          // through to a plain download.
          if (isAbortError(error)) return;
        }
      }
      saveFile(file, file.name);
    } catch (error) {
      console.error("Failed to create the share card", error);
    } finally {
      setBusy(null);
    }
  };

  const handlePdf = async () => {
    const target = pdfTargetRef.current;
    if (!reference || !target || busy) return;
    setBusy("pdf");
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);
      let layout: CaptureLayout = { boxes: [], height: 0 };
      const canvas = await html2canvas(target, {
        scale: PDF_SCALE,
        backgroundColor: "#ffffff",
        logging: false,
        // Lay the copy out at desktop width so a phone gets the same A4 page.
        windowWidth: PDF_WINDOW_WIDTH,
        scrollX: 0,
        scrollY: 0,
        onclone: (doc, element) => {
          layout = prepareCapture(doc, element);
        },
      });

      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      pdf.setProperties({
        title: `${dictionary.shareCard.brand} ${reference}`,
        subject: dictionary.shareCard.title,
        creator: dictionary.shareCard.brand,
      });
      addPages(pdf, canvas, layout);
      pdf.save(`khales-estimate-${reference}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setBusy(null);
    }
  };

  // Labels can be long ("Share my home budget card"), so they wrap.
  const buttonClass =
    "flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 text-center text-sm font-semibold leading-snug transition-colors hover:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-neutral-300";

  return (
    <div className="flex flex-col gap-2" aria-busy={busy !== null}>
      <button type="button" onClick={handleCard} disabled={disabled} className={buttonClass}>
        {canShareFiles ? <FaShareNodes aria-hidden="true" size={13} /> : <FaDownload aria-hidden="true" size={13} />}
        {busy === "card"
          ? dictionary.generating
          : canShareFiles
            ? dictionary.shareCardButton
            : dictionary.downloadCardButton}
      </button>
      <button type="button" onClick={handlePdf} disabled={disabled} className={buttonClass}>
        <FaFilePdf aria-hidden="true" size={13} />
        {busy === "pdf" ? dictionary.generating : dictionary.downloadPdfButton}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Share card helpers
// ---------------------------------------------------------------------------

const subscribeToNothing = () => () => {};

let fileShareSupport: boolean | undefined;

// Whether the browser can hand a PNG to the native share sheet (phones,
// Windows, ChromeOS); otherwise the card is simply downloaded.
function supportsFileShare(): boolean {
  if (fileShareSupport === undefined) {
    try {
      fileShareSupport =
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files: [new File([], "card.png", { type: "image/png" })] });
    } catch {
      fileShareSupport = false;
    }
  }
  return fileShareSupport;
}

function isAbortError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "name" in error && error.name === "AbortError";
}

function saveFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Some browsers only start reading the blob after click() returns.
  window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

// ---------------------------------------------------------------------------
// PDF helpers
// ---------------------------------------------------------------------------

const PDF_SCALE = 2;
const PDF_WINDOW_WIDTH = 1100;
const PDF_MARGIN_PT = 28;

// Vertical extent, in CSS px from the top of the captured sheet, of
// something a page break must not cut through.
type Box = { top: number; bottom: number };
type CaptureLayout = { boxes: Box[]; height: number };

// html2canvas 1.4 only parses rgb()/hsl()/hex colours and throws on the
// oklch() / oklab() values Tailwind v4's palette and opacity modifiers
// compute to - so before it reads the cloned page, each colour it parses
// is rewritten to rgba() on the clone. The live page is never touched.
const MODERN_COLOR_TEST = /(?:oklch|oklab|lab|lch|hwb|color)\(/i;
const MODERN_COLOR = /(?:oklch|oklab|lab|lch|hwb|color)\([^()]*\)/gi;
const CAPTURED_COLOR_PROPERTIES = [
  "color",
  "background-color",
  "background-image",
  "border-top-color",
  "border-right-color",
  "border-bottom-color",
  "border-left-color",
  "text-decoration-color",
  "-webkit-text-stroke-color",
  "box-shadow",
  "text-shadow",
];

/** Runs on html2canvas' clone of the page, after fonts load and before it is drawn. */
function prepareCapture(doc: Document, root: HTMLElement): CaptureLayout {
  // The PDF is a plain document page: drop the on-screen card frame.
  root.style.setProperty("border", "0");
  root.style.setProperty("border-radius", "0");
  root.style.setProperty("box-shadow", "none");

  const view = doc.defaultView;
  if (view) {
    const toRgba = colorResolver(doc);
    const elements = [root, ...Array.from(root.querySelectorAll<HTMLElement | SVGElement>("*"))];
    for (const element of elements) {
      // Shapes inside an icon are drawn from the icon's own markup.
      if ("ownerSVGElement" in element && element.ownerSVGElement) continue;
      const style = view.getComputedStyle(element);
      for (const property of CAPTURED_COLOR_PROPERTIES) {
        const value = style.getPropertyValue(property);
        if (MODERN_COLOR_TEST.test(value)) {
          element.style.setProperty(property, value.replace(MODERN_COLOR, toRgba), "important");
        }
      }
      // Icons are rasterised from serialised SVG, where currentColor no
      // longer inherits the text colour - pin it on the <svg>.
      if (element.localName === "svg") element.setAttribute("color", style.color);
    }
  }
  return measureUnbreakable(doc, root);
}

/** Converts any CSS colour the browser understands to rgba() by painting one pixel. */
function colorResolver(doc: Document): (color: string) => string {
  const canvas = doc.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const cache = new Map<string, string>();
  return (color) => {
    let rgba = cache.get(color);
    if (rgba === undefined) {
      rgba = "rgba(0, 0, 0, 0)";
      if (ctx) {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = rgba;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
        rgba = `rgba(${r}, ${g}, ${b}, ${Number((a / 255).toFixed(3))})`;
      }
      cache.set(color, rgba);
    }
    return rgba;
  };
}

/** Every line of text, every icon and every [data-pdf-keep] block stays on one page. */
function measureUnbreakable(doc: Document, root: HTMLElement): CaptureLayout {
  const origin = root.getBoundingClientRect();
  const boxes: Box[] = [];
  const add = (rect: DOMRect) => {
    if (rect.height > 0) boxes.push({ top: rect.top - origin.top, bottom: rect.bottom - origin.top });
  };
  const range = doc.createRange();
  const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (!node.nodeValue?.trim()) continue;
    range.selectNodeContents(node);
    Array.from(range.getClientRects()).forEach(add);
  }
  root.querySelectorAll("svg, img, [data-pdf-keep]").forEach((element) => add(element.getBoundingClientRect()));
  return { boxes, height: origin.height };
}

/**
 * Moves a page break up until it no longer cuts through a box. Gives up
 * (and cuts at `ideal`) rather than leave more than half a page empty.
 */
function safeBreak(ideal: number, limit: number, boxes: Box[]): number {
  let y = ideal;
  for (let moved = true; moved && y > limit; ) {
    moved = false;
    for (const box of boxes) {
      if (box.top < y && y < box.bottom) {
        y = box.top - 1;
        moved = true;
      }
    }
  }
  return y > limit ? y : ideal;
}

/** Slices the captured sheet into A4 pages, breaking between lines rather than through them. */
function addPages(pdf: jsPDF, canvas: HTMLCanvasElement, layout: CaptureLayout) {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const ptPerPx = pageWidth / canvas.width;
  const pagePx = Math.floor((pageHeight - PDF_MARGIN_PT * 2) / ptPerPx);
  const pxPerCss = layout.height > 0 ? canvas.height / layout.height : PDF_SCALE;

  let start = 0;
  while (start < canvas.height) {
    let end = Math.min(canvas.height, start + pagePx);
    if (end < canvas.height) {
      const cut = safeBreak(end / pxPerCss, (start + pagePx / 2) / pxPerCss, layout.boxes);
      end = Math.min(end, Math.max(start + 1, Math.floor(cut * pxPerCss)));
    }

    const page = document.createElement("canvas");
    page.width = canvas.width;
    page.height = end - start;
    const ctx = page.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D is not available");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, page.width, page.height);
    ctx.drawImage(canvas, 0, start, canvas.width, page.height, 0, 0, page.width, page.height);

    if (start > 0) pdf.addPage();
    pdf.addImage(page.toDataURL("image/png"), "PNG", 0, PDF_MARGIN_PT, pageWidth, page.height * ptPerPx, undefined, "FAST");
    start = end;
  }
}
