import xmlrpc from "xmlrpc";

const commonClient = xmlrpc.createSecureClient({
  url: `${process.env.ODOO_URL}/xmlrpc/2/common`,
});
const objectClient = xmlrpc.createSecureClient({
  url: `${process.env.ODOO_URL}/xmlrpc/2/object`,
});

async function authenticate() {
  return new Promise((resolve, reject) => {
    commonClient.methodCall(
      "authenticate",
      [
        process.env.ODOO_DB,
        process.env.ODOO_EMAIL,
        process.env.ODOO_PASSWORD,
        {},
      ],
      (err, uid) => {
        if (err || !uid) return reject(new Error("Authentication failed"));
        resolve(uid);
      },
    );
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  try {
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
    } = req.body;

    if (!position) {
      return res
        .status(400)
        .json({ success: false, error: "Position is required" });
    }

    const uid = await authenticate();

    const sourceIds = await new Promise((resolve, reject) => {
      objectClient.methodCall(
        "execute_kw",
        [
          process.env.ODOO_DB,
          uid,
          process.env.ODOO_PASSWORD,
          "utm.source",
          "search",
          [[["name", "=", "Website Application"]]],
        ],
        (err, ids) => (err ? reject(err) : resolve(ids)),
      );
    });

    const sourceId =
      sourceIds[0] ??
      (await new Promise((resolve, reject) => {
        objectClient.methodCall(
          "execute_kw",
          [
            process.env.ODOO_DB,
            uid,
            process.env.ODOO_PASSWORD,
            "utm.source",
            "create",
            [{ name: "Website Application" }],
          ],
          (err, id) => (err ? reject(err) : resolve(id)),
        );
      }));

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

    const leadData = {
      name: `Job Application - ${position}`,
      description,
      source_id: sourceId,
    };

    const leadId = await new Promise((resolve, reject) => {
      objectClient.methodCall(
        "execute_kw",
        [
          process.env.ODOO_DB,
          uid,
          process.env.ODOO_PASSWORD,
          "crm.lead",
          "create",
          [leadData],
        ],
        (err, id) => (err ? reject(err) : resolve(id)),
      );
    });

    const DEFAULT_PARTNER_IDS = [9, 23, 388];
    await new Promise((resolve, reject) => {
      objectClient.methodCall(
        "execute_kw",
        [
          process.env.ODOO_DB,
          uid,
          process.env.ODOO_PASSWORD,
          "crm.lead",
          "message_subscribe",
          [[leadId], DEFAULT_PARTNER_IDS],
          { context: { mail_notify: false } },
        ],
        (err) => (err ? reject(err) : resolve()),
      );
    });

    res.status(200).json({ success: true, leadId });
  } catch (error) {
    console.error("Error in /api/application:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
}
