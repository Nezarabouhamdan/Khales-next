import { NextResponse } from "next/server";
import { generateReference } from "@/lib/calculator/reference";

// Issues the short estimate reference ("K-7F3Q9C") a result, its share card
// and PDF carry, and that a later design / review request quotes. Random on
// the server, never derived from anything the visitor typed, and stateless:
// nothing is stored, logged or sent to Odoo here. The result's anonymous
// estimate lead is saved separately, by /api/calculator/snapshot.
export async function POST() {
  return NextResponse.json({ reference: generateReference() }, { headers: { "Cache-Control": "no-store" } });
}
