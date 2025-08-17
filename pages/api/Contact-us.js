// In file: /pages/api/Contact-us.js (or equivalent)
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

// This function will run in the background
async function processOdooLead(leadPayload) {
  try {
    const uid = await authenticate();
    const { name, phone, email, description, branch, inquiry } = leadPayload;

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

    console.log(
      `Successfully processed lead ${leadId} for ${name} in background.`
    );
  } catch (error) {
    console.error("Error during background Odoo processing:", error);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const { name, phone, email } = req.body;
    if (!name || !phone || !email) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    // 1. Respond IMMEDIATELY to the user's browser.
    res.status(200).json({
      success: true,
      message: "Request received. Processing in background.",
    });

    // 2. Start the slow Odoo process AFTER responding.
    // We don't use 'await' here because we don't want to wait for it to finish.
    processOdooLead(req.body);
  } catch (error) {
    // This will only catch errors during validation, not during the Odoo process.
    console.error("Error in /api/Contact-us handler:", error);
    // Even if there's an error here, a response might have already been sent.
    // It's best to just log it.
  }
}
