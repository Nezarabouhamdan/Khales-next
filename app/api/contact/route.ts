import { NextRequest, NextResponse } from "next/server";
import {
  odooAuthenticate,
  odooExecuteKw,
  odooFindOrCreateSource,
  odooSubscribeDefaultFollowers,
} from "@/lib/odoo";
import { sendConfirmationEmail } from "@/lib/email";

// Odoo auth + several sequential execute_kw round-trips, plus a Resend
// send, routinely exceeds Vercel's default serverless timeout.
export const maxDuration = 60;

// Real port of Khales-next/pages/api/Contact-us.js: creates a crm.lead in
// Odoo, sends a Resend confirmation email, then writes the email's refId
// back onto the lead. Same two-system pipeline, same field names.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const { name, phone, email, message, projectType } = body ?? {};

  if (!name || !phone || !email) {
    return NextResponse.json(
      { success: false, error: "Name, phone and email are required" },
      { status: 400 },
    );
  }

  try {
    const uid = await odooAuthenticate();
    const sourceId = await odooFindOrCreateSource(uid, "Website");

    let leadDescription = `Project type: ${projectType || "Not specified"}`;
    if (message) leadDescription += `\n${message}`;

    const leadId = await odooExecuteKw<number>(uid, "crm.lead", "create", [
      {
        name: `Website Contact us page - ${name}`,
        contact_name: name,
        phone,
        email_from: email,
        description: leadDescription,
        source_id: sourceId,
      },
    ]);

    await odooSubscribeDefaultFollowers(uid, leadId);

    const emailResult = await sendConfirmationEmail(email, name, projectType || "General Inquiry");

    if (emailResult.success) {
      await odooExecuteKw(uid, "crm.lead", "write", [
        [leadId],
        {
          name: `Contact us - ${emailResult.refId}`,
          description: `${emailResult.refId}\n\n${leadDescription}`,
        },
      ]);
    }

    return NextResponse.json({
      success: true,
      leadId,
      emailSent: emailResult.success,
    });
  } catch (error) {
    console.error("Error in /api/contact:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    );
  }
}
