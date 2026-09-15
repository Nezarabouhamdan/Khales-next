import { NextResponse } from "next/server";

// TODO: wire to Odoo (see Khales-next/pages/api/pdf-leads-count.js) once
// ODOO_* env vars are added here. Returns 0 until then.
export async function GET() {
  return NextResponse.json({ success: true, count: 0 });
}
