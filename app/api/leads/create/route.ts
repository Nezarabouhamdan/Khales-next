import { NextRequest, NextResponse } from "next/server";
import {
  odooAuthenticate,
  odooExecuteKw,
  odooFindOrCreateSource,
  odooSubscribeDefaultFollowers,
} from "@/lib/odoo";

export const maxDuration = 60;

// Real port of Khales-next/pages/api/create-pdf-lead.js: dedupes by email
// (re-running the calculator posts a note on the existing lead instead of
// spamming duplicates) and creates a crm.lead otherwise.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const { name, phone, email, description } = body ?? {};

  if (!phone || !email) {
    return NextResponse.json(
      { success: false, error: "Missing required fields: phone and email are required." },
      { status: 400 },
    );
  }

  try {
    const uid = await odooAuthenticate();
    const leadName = name || email.split("@")[0];

    const existingIds = await odooExecuteKw<number[]>(uid, "crm.lead", "search", [
      [
        ["email_from", "=", email],
        ["active", "=", true],
      ],
    ]);

    if (existingIds.length > 0) {
      const leadId = existingIds[0];
      await odooExecuteKw(uid, "crm.lead", "message_post", [[leadId]], {
        kwargs: {
          body:
            `<p><strong>User Recalculated</strong></p>` +
            `<p>${description || "User ran the cost calculator again."}</p>`,
          message_type: "comment",
          subtype_xmlid: "mail.mt_note",
        },
      });
      return NextResponse.json({
        success: true,
        leadId,
        isExisting: true,
        message: "Existing CRM lead updated with new calculation.",
      });
    }

    const sourceId = await odooFindOrCreateSource(uid, "Website");
    const leadId = await odooExecuteKw<number>(uid, "crm.lead", "create", [
      {
        name: `PDF Download Lead - ${leadName}`,
        contact_name: leadName,
        phone,
        email_from: email,
        description: description || "Lead generated from the website's PDF cost calculator.",
        source_id: sourceId,
      },
    ]);

    await odooSubscribeDefaultFollowers(uid, leadId);

    return NextResponse.json({
      success: true,
      leadId,
      isExisting: false,
      message: "CRM lead from PDF download created successfully.",
    });
  } catch (error) {
    console.error("Error in /api/leads/create:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    );
  }
}
