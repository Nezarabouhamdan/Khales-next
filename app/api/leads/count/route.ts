import { NextResponse } from "next/server";
import { odooAuthenticate, odooExecuteKw } from "@/lib/odoo";

export const maxDuration = 60;
// A social-proof counter doesn't need to be live - caching this for an
// hour means the calculator's landing screen never has to wait on a
// synchronous Odoo round-trip, and Odoo itself only sees one query/hour
// regardless of site traffic.
export const revalidate = 3600;

// Every calculator run creates (or, on a repeat run, notes on) a
// crm.lead named "PDF Download Lead - <name>" - see /api/leads/create.
// That name prefix is the only thing that reliably identifies a
// calculator-originated lead among all of Odoo's crm.lead records.
// `active in [true, false]` includes leads later archived/lost in the
// pipeline - this counts historical usage, not current pipeline health.
export async function GET() {
  try {
    const uid = await odooAuthenticate();
    const count = await odooExecuteKw<number>(uid, "crm.lead", "search_count", [
      [
        ["name", "like", "PDF Download Lead -"],
        ["active", "in", [true, false]],
      ],
    ]);
    return NextResponse.json({ success: true, count });
  } catch (error) {
    console.error("Error in /api/leads/count:", error);
    return NextResponse.json({ success: false, count: 0 }, { status: 500 });
  }
}
