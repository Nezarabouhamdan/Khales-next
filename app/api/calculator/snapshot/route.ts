import { NextRequest, NextResponse } from "next/server";
import { describeOdooError, odooAuthenticate } from "@/lib/odoo";
import { computeEstimate } from "@/lib/calculator/engine";
import { buildEstimateLead, ESTIMATE_ACTION_TAGS } from "@/lib/calculator/odooLead";
import { addLeadTag, saveCalculatorLead } from "@/lib/calculator/odooLeadStore";
import { CALCULATOR_RATES } from "@/lib/calculator/rates";
import { parseCalculatorSnapshot } from "@/lib/calculator/request";

export const maxDuration = 60;

// Saves an anonymous crm.lead for every result a visitor sees ("view"), and
// tags it when they share the card or download the PDF, so the team sees
// what people price and can find an estimate by the reference quoted later
// on WhatsApp. One lead per reference: a repeat only adds the tag. No
// personal data, no followers notified, and the numbers are recomputed
// from the inputs.
export async function POST(request: NextRequest) {
  const payload = parseCalculatorSnapshot(await request.json().catch(() => null));
  if (!payload) {
    return NextResponse.json({ success: false, error: "inputs" }, { status: 400 });
  }
  const outcome = computeEstimate(CALCULATOR_RATES, payload.inputMode, payload.estimate);
  // Partner-review markets show no number, so they have no card or PDF.
  if (outcome.kind === "partner_review" && payload.action !== "view") {
    return NextResponse.json({ success: false, error: "inputs" }, { status: 400 });
  }

  const lead = buildEstimateLead({ ...payload, outcome, createdAt: new Date() });
  if (process.env.CALCULATOR_ODOO_DRY_RUN === "true") {
    console.info("[calculator] CALCULATOR_ODOO_DRY_RUN - estimate not sent to Odoo:", payload.action, lead.name, lead.customFields);
    return NextResponse.json({ success: true, leadId: null });
  }

  try {
    const uid = await odooAuthenticate();
    // A share whose "view" never arrived still creates the lead first.
    const leadId = await saveCalculatorLead(uid, lead, { subscribeFollowers: false });
    if (payload.action !== "view") await addLeadTag(uid, leadId, ESTIMATE_ACTION_TAGS[payload.action]);
    return NextResponse.json({ success: true, leadId });
  } catch (error) {
    console.error("Error in /api/calculator/snapshot:", describeOdooError(error));
    return NextResponse.json({ success: false, error: "generic" }, { status: 500 });
  }
}
