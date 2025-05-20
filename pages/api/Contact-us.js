import xmlrpc from "xmlrpc";

// Use secure client for HTTPS
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
      }
    );
  });
}
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method Not Allowed" });
  }
  try {
    // 1. Authenticate
    const uid = await authenticate();

    // 2. Validate required fields
    const { name, phone, email, description, branch, inquiry } = req.body;
    if (!name || !phone || !email) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    // 3. Ensure UTM Source “Website” exists or create it
    const sourceIds = await new Promise((resolve, reject) => {
      objectClient.methodCall(
        "execute_kw",
        [
          process.env.ODOO_DB,
          uid,
          process.env.ODOO_PASSWORD,
          "utm.source",
          "search",
          [[["name", "=", "Website"]]],
        ],
        (err, ids) => (err ? reject(err) : resolve(ids))
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
            [{ name: "Website" }],
          ],
          (err, id) => (err ? reject(err) : resolve(id))
        );
      }));

    // 4. Create the lead
    const leadData = {
      name: `Website Contact us page - ${name}`,
      contact_name: name,
      phone,
      email_from: email,
      description: `Branch: ${branch}\nInquiry: ${inquiry}\n${description}`,
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
        (err, id) => (err ? reject(err) : resolve(id))
      );
    });

    // 5. Subscribe default partners as followers without notification
    const DEFAULT_PARTNER_IDS = [9, 23, 1041];
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
        (err) => (err ? reject(err) : resolve())
      );
    });

    // 6. Return success
    res.status(200).json({
      success: true,
      leadId,
      sourceId,
      message: "CRM lead created successfully",
    });
  } catch (error) {
    console.error("Error in /api/create-lead:", error);
    res
      .status(500)
      .json({ success: false, error: error.message || "Internal error" });
  }
}
