import { NextRequest, NextResponse } from "next/server";
import {
  odooAuthenticate,
  odooExecuteKw,
  odooFindOrCreateSource,
  odooSubscribeDefaultFollowers,
} from "@/lib/odoo";

export const maxDuration = 60;

// Real port of Khales-next/pages/api/application.js: creates a crm.lead
// named `Job Application - ${position}` tagged with the "Website
// Application" utm.source.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const {
    position,
    totalExperience,
    availability,
    aiKnowledge,
    expectedSalary,
    maritalStatus,
    district,
    city,
    nationality,
    arabicLevel,
  } = body ?? {};

  if (!position) {
    return NextResponse.json({ success: false, error: "Position is required" }, { status: 400 });
  }

  try {
    const uid = await odooAuthenticate();
    const sourceId = await odooFindOrCreateSource(uid, "Website Application");

    const description = [
      `Position: ${position}`,
      `Total Experience: ${totalExperience || "Not specified"}`,
      `Availability: ${availability || "Not specified"}`,
      `AI Knowledge Level: ${aiKnowledge || "Not specified"}`,
      `Expected Monthly Salary (AED): ${expectedSalary || "Not specified"}`,
      `Marital Status: ${maritalStatus || "Not specified"}`,
      `Residence: ${[district, city].filter(Boolean).join(", ") || "Not specified"}`,
      `Nationality: ${nationality || "Not specified"}`,
      `Arabic Level: ${arabicLevel || "Not specified"}`,
    ].join("\n");

    const leadId = await odooExecuteKw<number>(uid, "crm.lead", "create", [
      { name: `Job Application - ${position}`, description, source_id: sourceId },
    ]);

    await odooSubscribeDefaultFollowers(uid, leadId);

    return NextResponse.json({ success: true, leadId });
  } catch (error) {
    console.error("Error in /api/applications/submit:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    );
  }
}
