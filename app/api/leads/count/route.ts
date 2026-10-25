import { NextResponse } from "next/server";
import { odooAuthenticate, odooExecuteKw } from "@/lib/odoo";
import { CALCULATOR_LEAD_NAME_PREFIX } from "@/lib/calculator/odooLead";

export const maxDuration = 60;
// A social-proof counter doesn't need to be live - caching this for an
// hour means the calculator's landing screen never has to wait on a
// synchronous Odoo round-trip, and Odoo itself only sees one query/hour
// regardless of site traffic.
export const revalidate = 3600;

// "{n}+ homeowners have used this calculator" adds up two kinds of crm.lead,
// identified by name prefix - the only reliable marker among all of Odoo's
// leads:
//   - "PDF Download Lead - <name>": one per run of the legacy calculator,
//     which asked for an email + phone before the PDF (that route is gone,
//     its historical leads still count);
//   - "Calculator v2 - <type> - <city> - <reference>": design / budget
//     review requests from calculator v2 (see lib/calculator/odooLead.ts).
//     v2 results are free and create no lead, so only real requests add up.
// `active in [true, false]` includes leads later archived/lost in the
// pipeline - this counts historical usage, not current pipeline health.
export async function GET() {
  try {
    const uid = await odooAuthenticate();
    const count = await odooExecuteKw<number>(uid, "crm.lead", "search_count", [
      [
        "|",
        ["name", "like", "PDF Download Lead -"],
        ["name", "like", CALCULATOR_LEAD_NAME_PREFIX],
        ["active", "in", [true, false]],
      ],
    ]);
    return NextResponse.json({ success: true, count });
  } catch (error) {
    console.error("Error in /api/leads/count:", error);
    return NextResponse.json({ success: false, count: 0 }, { status: 500 });
  }
}
