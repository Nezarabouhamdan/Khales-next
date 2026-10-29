import { NextRequest, NextResponse } from "next/server";
import { describeOdooError as describeError, odooAuthenticate } from "@/lib/odoo";
import { looksLikeSpam } from "@/lib/spam";
import { computeEstimate, computeLeadScore, estimateFamilyPlanAreaSqm } from "@/lib/calculator/engine";
import { buildCalculatorLead } from "@/lib/calculator/odooLead";
import { saveCalculatorLead } from "@/lib/calculator/odooLeadStore";
import { CALCULATOR_RATES } from "@/lib/calculator/rates";
import {
  parseCalculatorRequest,
  type CalculatorRequestPayload,
  type RequestContext,
} from "@/lib/calculator/request";

// Odoo auth + several execute_kw round-trips (duplicate check, fields_get,
// source, tags, create, followers) can exceed Vercel's default timeout.
export const maxDuration = 60;

// The service request lead: a visitor submitting "I want to design my home"
// or "Review my home budget", with their contact details. (Every result seen
// also gets an anonymous estimate lead, from /api/calculator/snapshot.)
// Every number saved is recomputed here from the submitted inputs - the
// client's figures are never trusted.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = parseCalculatorRequest(body);
  if (!parsed.ok) {
    return NextResponse.json({ success: false, error: parsed.error }, { status: 400 });
  }
  const payload = parsed.value;
  const success = (leadId: number | null) =>
    NextResponse.json({ success: true, reference: payload.reference, leadId });

  // Bots get a normal-looking success so they don't adapt, but nothing is
  // written to Odoo (same as /api/contact).
  if (looksLikeSpam({ honeypot: payload.website, elapsedMs: payload.elapsedMs, name: payload.firstName })) {
    return success(null);
  }

  try {
    const context = rebuildContext(payload);
    const subject = context && (context.inputMode === "family_plan" ? context.familyPlan : context.estimate);
    // parseCalculatorRequest already guarantees both; this keeps the types honest.
    if (!context || !subject?.landStatus) {
      return NextResponse.json({ success: false, error: "inputs" }, { status: 400 });
    }

    const leadScore = computeLeadScore({
      landStatus: subject.landStatus,
      startTiming: payload.startTiming,
      hasAreaOrBudget: payload.inputMode !== "family_plan",
      hasPlanOrQuote: payload.hasPlanOrContractorQuote,
    });
    const lead = buildCalculatorLead({ payload, context, leadScore, createdAt: new Date() });

    // Previews / tests: everything except the Odoo write. The log carries
    // no name, email or phone - the custom fields never contain them.
    if (process.env.CALCULATOR_ODOO_DRY_RUN === "true") {
      console.info("[calculator] CALCULATOR_ODOO_DRY_RUN - lead not sent to Odoo:", lead.name, lead.customFields);
      return success(null);
    }

    return success(await saveCalculatorLead(await odooAuthenticate(), lead, { subscribeFollowers: true }));
  } catch (error) {
    console.error("Error in /api/calculator/request:", describeError(error));
    return NextResponse.json({ success: false, error: "generic" }, { status: 500 });
  }
}

/** The result the request belongs to, rebuilt from its inputs alone. */
function rebuildContext(payload: CalculatorRequestPayload): RequestContext | null {
  if (payload.inputMode === "family_plan") {
    if (!payload.familyPlan) return null;
    return {
      inputMode: "family_plan",
      familyPlan: payload.familyPlan,
      indicativeAreaSqm: estimateFamilyPlanAreaSqm(payload.familyPlan),
      reference: payload.reference,
    };
  }
  if (!payload.estimate) return null;
  return {
    inputMode: payload.inputMode,
    estimate: payload.estimate,
    outcome: computeEstimate(CALCULATOR_RATES, payload.inputMode, payload.estimate),
    reference: payload.reference,
  };
}
