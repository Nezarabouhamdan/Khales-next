// Portrait share card (1080 x 1350 - fits WhatsApp and Instagram) drawn
// with the plain canvas 2D API, no html2canvas. It shows only what the
// caller passes in - the estimate, never the visitor's name, email, phone
// or land address - and the only thing it fetches is the site's own logo,
// falling back to the brand name when that is slow.

export type ShareCardData = {
  lang: "en" | "ar";
  brand: string;
  title: string;
  headline: { label: string; value: string };
  subline?: { label: string; value: string };
  // Calibration notice drawn under the numbers (e.g. "UAE reference - needs
  // local partner calibration"); left out for a direct city reference.
  note?: string;
  rows: { label: string; value: string }[];
  // Small print; "\n" starts a new paragraph.
  disclaimer: string;
  footer: string;
};

export type ShareCardOptions = {
  // Font to draw with. Defaults to the page's body font; pass the
  // calculator's own font so an Arabic card uses the Arabic face.
  fontFamily?: string;
};

const WIDTH = 1080;
const HEIGHT = 1350;
const PAD = 84;
const CONTENT_WIDTH = WIDTH - PAD * 2;
// Long Arabic copy or a long calibration note shrinks everything a little
// instead of running into the small print.
const MIN_SCALE = 0.72;
const SCALE_STEP = 0.04;
// The main logo: black with the brand-green accents.
const LOGO_SRC = "/logo-color.png";
const ASSET_TIMEOUT_MS = 2000;

// A light card - dark text stays sharp on any phone and in chat previews,
// and the main logo is only legible on white.
const COLORS = {
  background: "#ffffff",
  brand: "#66a109",
  glow: "102, 161, 9",
  accent: "#3f6606",
  text: "#111111",
  muted: "#404040",
  faint: "#525252",
  rule: "rgba(0, 0, 0, 0.1)",
  panel: "#f3f7ec",
  note: "#7a4a00",
  noteBackground: "#fff4d6",
};
const BRAND_BAR = 16;

type TextStyle = { weight: number; size: number; color: string; tracking?: number };
type Paint = (ctx: CanvasRenderingContext2D) => void;

export async function renderShareCard(data: ShareCardData, options: ShareCardOptions = {}): Promise<Blob> {
  const family = options.fontFamily?.trim() || window.getComputedStyle(document.body).fontFamily || "sans-serif";
  const sample = [
    data.brand,
    data.title,
    data.headline.label,
    data.headline.value,
    data.subline?.label,
    data.subline?.value,
    data.note,
    ...data.rows.flatMap((row) => [row.label, row.value]),
    data.disclaimer,
    data.footer,
  ]
    .filter(Boolean)
    .join(" ");
  const [logo] = await Promise.all([withTimeout(loadLogo(), ASSET_TIMEOUT_MS, null), loadFonts(family, sample)]);

  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D is not available");
  const rtl = data.lang === "ar";
  ctx.direction = rtl ? "rtl" : "ltr";
  ctx.textBaseline = "middle";

  let scale = 1;
  let plan = planCard(ctx, data, family, logo, scale);
  while (plan.overflow > 0 && scale > MIN_SCALE) {
    scale = Math.max(MIN_SCALE, scale - SCALE_STEP);
    plan = planCard(ctx, data, family, logo, scale);
  }

  paintBackground(ctx, rtl);
  plan.paints.forEach((paint) => paint(ctx));
  return toBlob(canvas);
}

/**
 * Measures and positions everything at the given scale. The content runs
 * down from the top; the small print and footer sit on the bottom edge.
 * `overflow` > 0 means the two would overlap and a smaller scale is needed.
 */
function planCard(
  ctx: CanvasRenderingContext2D,
  data: ShareCardData,
  family: string,
  logo: HTMLImageElement | null,
  scale: number,
): { paints: Paint[]; overflow: number } {
  const rtl = data.lang === "ar";
  const s = (value: number) => Math.round(value * scale);
  const startX = rtl ? WIDTH - PAD : PAD;
  const endX = rtl ? PAD : WIDTH - PAD;
  // Moves x towards the middle from the start / end edge.
  const fromStart = (x: number, by: number) => (rtl ? x - by : x + by);
  const fromEnd = (x: number, by: number) => (rtl ? x + by : x - by);
  // Small labels are spaced capitals in English. Arabic has no capitals and
  // is never letter-spaced - spacing pulls its joined letters apart.
  const caps = (text: string) => (rtl ? text : text.toLocaleUpperCase("en"));
  const tracking = (px: number) => (rtl ? 0 : s(px));

  const apply = (target: CanvasRenderingContext2D, style: TextStyle) => {
    target.font = `${style.weight} ${style.size}px ${family}`;
    target.letterSpacing = `${style.tracking ?? 0}px`;
    target.fillStyle = style.color;
  };
  const measure = (text: string, style: TextStyle) => {
    apply(ctx, style);
    return ctx.measureText(text).width;
  };
  const wrap = (text: string, style: TextStyle, maxWidth: number) => {
    apply(ctx, style);
    return wrapText(ctx, text, maxWidth);
  };

  const paints: Paint[] = [];
  // Queues the lines one under another from `top`; returns the height used.
  const writeLines = (
    lines: string[],
    style: TextStyle,
    lineHeight: number,
    x: number,
    top: number,
    align: CanvasTextAlign,
  ) => {
    lines.forEach((line, i) => {
      const centerY = top + i * lineHeight + lineHeight / 2;
      paints.push((target) => {
        apply(target, style);
        target.textAlign = align;
        target.fillText(line, x, centerY);
      });
    });
    return lines.length * lineHeight;
  };

  let y = PAD;

  // Brand (white logo, or the brand name) with the card title opposite it.
  const brandHeight = s(104);
  let brandWidth: number;
  if (logo && logo.naturalHeight > 0) {
    const width = Math.round((logo.naturalWidth / logo.naturalHeight) * brandHeight);
    const x = rtl ? WIDTH - PAD - width : PAD;
    const top = y;
    paints.push((target) => target.drawImage(logo, x, top, width, brandHeight));
    brandWidth = width;
  } else {
    const style: TextStyle = { weight: 700, size: s(44), color: COLORS.text };
    brandWidth = measure(data.brand, style);
    writeLines([data.brand], style, brandHeight, startX, y, "start");
  }
  const titleStyle: TextStyle = { weight: 700, size: s(24), color: COLORS.accent, tracking: tracking(3) };
  const titleLineHeight = s(30);
  const titleLines = wrap(caps(data.title), titleStyle, CONTENT_WIDTH - brandWidth - s(48));
  const titleHeight = titleLines.length * titleLineHeight;
  writeLines(titleLines, titleStyle, titleLineHeight, endX, y + Math.max(0, (brandHeight - titleHeight) / 2), "end");
  y += Math.max(brandHeight, titleHeight) + s(68);

  // Headline: the cost range, or the area range a budget may cover. Shrunk
  // to stay on one line where possible.
  const labelStyle: TextStyle = { weight: 700, size: s(25), color: COLORS.accent, tracking: tracking(3) };
  const labelLineHeight = s(32);
  y += writeLines(wrap(caps(data.headline.label), labelStyle, CONTENT_WIDTH), labelStyle, labelLineHeight, startX, y, "start");
  y += s(10);
  let heroSize = s(96);
  while (heroSize > s(60) && measure(data.headline.value, { weight: 700, size: heroSize, color: COLORS.accent }) > CONTENT_WIDTH) {
    heroSize -= 2;
  }
  const heroStyle: TextStyle = { weight: 700, size: heroSize, color: COLORS.accent };
  y += writeLines(wrap(data.headline.value, heroStyle, CONTENT_WIDTH), heroStyle, Math.round(heroSize * 1.15), startX, y, "start");

  if (data.subline) {
    y += s(30);
    const sublabelStyle: TextStyle = { weight: 700, size: s(23), color: COLORS.muted, tracking: tracking(3) };
    y += writeLines(wrap(caps(data.subline.label), sublabelStyle, CONTENT_WIDTH), sublabelStyle, s(30), startX, y, "start");
    y += s(6);
    const valueStyle: TextStyle = { weight: 600, size: s(42), color: COLORS.text };
    y += writeLines(wrap(data.subline.value, valueStyle, CONTENT_WIDTH), valueStyle, s(52), startX, y, "start");
  }

  if (data.note) {
    y += s(36);
    const noteStyle: TextStyle = { weight: 600, size: s(24), color: COLORS.note };
    const padX = s(28);
    const padY = s(20);
    const lineHeight = s(34);
    const lines = wrap(data.note, noteStyle, CONTENT_WIDTH - padX * 2);
    const height = lines.length * lineHeight + padY * 2;
    const top = y;
    paints.push((target) => {
      target.fillStyle = COLORS.noteBackground;
      roundedRect(target, PAD, top, CONTENT_WIDTH, height, s(22));
      target.fill();
    });
    writeLines(lines, noteStyle, lineHeight, fromStart(startX, padX), top + padY, "start");
    y += height;
  }

  // Facts panel: label on the start side, value on the end side.
  if (data.rows.length > 0) {
    y += s(40);
    const padX = s(32);
    const padY = s(8);
    const innerWidth = CONTENT_WIDTH - padX * 2;
    const rowLabelStyle: TextStyle = { weight: 600, size: s(22), color: COLORS.muted, tracking: tracking(2) };
    const rowValueStyle: TextStyle = { weight: 700, size: s(28), color: COLORS.text };
    const lineHeight = s(36);
    const rowPadY = s(14);
    const top = y;
    const backgroundIndex = paints.length;
    let rowTop = top + padY;
    data.rows.forEach((row, index) => {
      if (index > 0) {
        const ruleY = rowTop;
        paints.push((target) => {
          target.fillStyle = COLORS.rule;
          target.fillRect(PAD + padX, ruleY, innerWidth, 1);
        });
      }
      const labelLines = wrap(caps(row.label), rowLabelStyle, innerWidth * 0.42);
      const labelWidth = labelLines.length > 0 ? Math.max(...labelLines.map((line) => measure(line, rowLabelStyle))) : 0;
      const valueLines = wrap(row.value, rowValueStyle, innerWidth - labelWidth - s(32));
      writeLines(labelLines, rowLabelStyle, lineHeight, fromStart(startX, padX), rowTop + rowPadY, "start");
      writeLines(valueLines, rowValueStyle, lineHeight, fromEnd(endX, padX), rowTop + rowPadY, "end");
      rowTop += Math.max(labelLines.length, valueLines.length, 1) * lineHeight + rowPadY * 2;
    });
    const height = rowTop + padY - top;
    paints.splice(backgroundIndex, 0, (target) => {
      target.fillStyle = COLORS.panel;
      roundedRect(target, PAD, top, CONTENT_WIDTH, height, s(28));
      target.fill();
    });
    y += height;
  }

  // Bottom edge: footer, then the small print (scope + disclaimer) above it.
  const footerStyle: TextStyle = { weight: 600, size: s(22), color: COLORS.muted };
  const footerLineHeight = s(30);
  const footerLines = wrap(data.footer, footerStyle, CONTENT_WIDTH);
  const footerTop = HEIGHT - PAD - footerLines.length * footerLineHeight;
  writeLines(footerLines, footerStyle, footerLineHeight, WIDTH / 2, footerTop, "center");

  const fineStyle: TextStyle = { weight: 500, size: s(21), color: COLORS.faint };
  const fineLineHeight = s(29);
  const fineLines = wrap(data.disclaimer, fineStyle, CONTENT_WIDTH);
  const fineTop = footerTop - s(28) - fineLines.length * fineLineHeight;
  writeLines(fineLines, fineStyle, fineLineHeight, startX, fineTop, "start");

  const ruleY = fineTop - s(28);
  paints.push((target) => {
    target.fillStyle = COLORS.rule;
    target.fillRect(PAD, ruleY, CONTENT_WIDTH, 1);
  });

  return { paints, overflow: y + s(36) - ruleY };
}

function paintBackground(ctx: CanvasRenderingContext2D, rtl: boolean) {
  ctx.fillStyle = COLORS.background;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  // A faint brand-green light in the corner opposite the logo.
  const x = rtl ? 0 : WIDTH;
  const glow = ctx.createRadialGradient(x, 0, 0, x, 0, WIDTH * 0.8);
  glow.addColorStop(0, `rgba(${COLORS.glow}, 0.12)`);
  glow.addColorStop(1, `rgba(${COLORS.glow}, 0)`);
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  // Brand-green edge along the top.
  ctx.fillStyle = COLORS.brand;
  ctx.fillRect(0, 0, WIDTH, BRAND_BAR);
}

/** Splits text into lines no wider than maxWidth; "\n" forces a break. */
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split("\n")) {
    let line = "";
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      const candidate = line ? `${line} ${word}` : word;
      if (!line || ctx.measureText(candidate).width <= maxWidth) {
        line = candidate;
      } else {
        lines.push(line);
        line = word;
      }
      // A single word wider than the card (a long URL) is cut by characters.
      while (ctx.measureText(line).width > maxWidth) {
        const chars = Array.from(line);
        if (chars.length < 2) break;
        let cut = chars.length - 1;
        while (cut > 1 && ctx.measureText(chars.slice(0, cut).join("")).width > maxWidth) cut--;
        lines.push(chars.slice(0, cut).join(""));
        line = chars.slice(cut).join("");
      }
    }
    if (line) lines.push(line);
  }
  return lines;
}

// CanvasRenderingContext2D.roundRect is newer than the browsers we support.
function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

let logoRequest: Promise<HTMLImageElement | null> | null = null;

// Loaded once per page; a failed load is retried on the next card.
function loadLogo(): Promise<HTMLImageElement | null> {
  if (!logoRequest) {
    logoRequest = new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => {
        logoRequest = null;
        resolve(null);
      };
      image.src = LOGO_SRC;
    });
  }
  return logoRequest;
}

// Canvas text silently falls back to another font when the web font isn't
// loaded yet, so load every weight the card uses for the card's own text.
async function loadFonts(family: string, sample: string): Promise<void> {
  const fonts = document.fonts;
  if (!fonts) return;
  const loads = [400, 500, 600, 700].map((weight) => fonts.load(`${weight} 40px ${family}`, sample).catch(() => []));
  await withTimeout(
    Promise.all(loads)
      .then(() => fonts.ready)
      .then(() => undefined),
    ASSET_TIMEOUT_MS,
    undefined,
  );
}

function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(fallback), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      () => {
        clearTimeout(timer);
        resolve(fallback);
      },
    );
  });
}

function toBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Could not encode the share card"))), "image/png");
  });
}
