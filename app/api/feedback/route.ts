import { NextRequest, NextResponse } from "next/server";
import { odooAuthenticate, odooExecuteKw } from "@/lib/odoo";

export const maxDuration = 60;

// Real port of Khales-next/pages/api/submit-feedback.js: posts the price
// feedback as an internal note on the lead created by /api/leads/create.
const RATING_LABELS: Record<string, string> = {
  too_low: "Too Low",
  just_right: "Just Right",
  too_high: "Too High",
};

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const { leadId, rating, comment, totalPrice, totalBUA, lang } = body ?? {};

  if (!rating) {
    return NextResponse.json({ success: false, error: "Missing required field: rating" }, { status: 400 });
  }
  if (!leadId) {
    return NextResponse.json(
      { success: false, error: "Missing leadId — cannot attach feedback without a lead." },
      { status: 400 },
    );
  }

  try {
    const uid = await odooAuthenticate();
    const ratingLabel = RATING_LABELS[rating] || rating;
    const noteBody =
      `<p><strong>Calculator Price Feedback</strong></p>` +
      `<p>Rating: <strong>${ratingLabel}</strong></p>` +
      `<p>Total Estimated Price: <strong>${totalPrice ? Math.round(totalPrice).toLocaleString() + " AED" : "N/A"}</strong></p>` +
      `<p>Total BUA: <strong>${totalBUA ? Number(totalBUA).toFixed(2) + " m²" : "N/A"}</strong></p>` +
      `<p>Language: ${lang || "en"}</p>` +
      (comment ? `<p>Comment: <em>${comment}</em></p>` : "");

    await odooExecuteKw(uid, "crm.lead", "message_post", [[leadId]], {
      kwargs: {
        body: noteBody,
        message_type: "comment",
        subtype_xmlid: "mail.mt_note",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in /api/feedback:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    );
  }
}
