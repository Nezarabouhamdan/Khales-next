import xmlrpc from "xmlrpc";

// Helper function to create a secure client for HTTPS URLs
const createSecureClient = (url) => {
  if (!url || !url.startsWith("https://")) {
    throw new Error(
      `Invalid or insecure Odoo URL provided. URL must start with https://. Received: "${url}"`
    );
  }
  return xmlrpc.createSecureClient({
    url,
    timeout: 30000, // 30-second timeout
  });
};

// Initialize clients from environment variables
const commonClient = createSecureClient(
  `${process.env.ODOO_URL}/xmlrpc/2/common`
);
const objectClient = createSecureClient(
  `${process.env.ODOO_URL}/xmlrpc/2/object`
);

// Authenticate with Odoo and return the user ID (uid)
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
        if (err || !uid) {
          console.error(
            "Odoo authentication error:",
            err || "Invalid credentials"
          );
          return reject(new Error("Odoo authentication failed"));
        }
        resolve(uid);
      }
    );
  });
}

// Helper to execute methods on Odoo models
async function executeKw(uid, model, method, params = [], options = {}) {
  return new Promise((resolve, reject) => {
    objectClient.methodCall(
      "execute_kw",
      [
        process.env.ODOO_DB,
        uid,
        process.env.ODOO_PASSWORD,
        model,
        method,
        params,
        options,
      ],
      (err, result) => (err ? reject(err) : resolve(result))
    );
  });
}

// Main API handler
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res
      .status(405)
      .json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const uid = await authenticate();
    const { name, phone, email, description } = req.body;

    if (!phone || !email) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: phone and email are required.",
      });
    }

    // If name is not provided, use the part of the email before the @ as a default
    const leadName = name || email.split("@")[0];

    // Find or create the 'Website' UTM source
    let sourceIds = await executeKw(uid, "utm.source", "search", [
      [["name", "=", "Website"]],
    ]);
    let sourceId =
      sourceIds.length > 0
        ? sourceIds[0]
        : await executeKw(uid, "utm.source", "create", [{ name: "Website" }]);

    // Prepare the lead data, specifying the origin
    const leadData = {
      name: `PDF Download Lead - ${leadName}`, // Use the generated or provided name
      contact_name: leadName, // Use the generated or provided name
      phone,
      email_from: email,
      description:
        description || "Lead generated from the website's PDF cost calculator.",
      source_id: sourceId,
      // Optional: you can add a specific tag if you have one set up in Odoo
      // e.g., 'tag_ids': [[6, 0, [TAG_ID_FOR_PDF_DOWNLOADS]]]
    };

    const leadId = await executeKw(uid, "crm.lead", "create", [leadData]);

    // Subscribe default followers to the new lead
    const DEFAULT_PARTNER_IDS = [9, 23, 1041]; // Your default follower IDs
    if (leadId && DEFAULT_PARTNER_IDS.length > 0) {
      await executeKw(
        uid,
        "crm.lead",
        "message_subscribe",
        [[leadId], DEFAULT_PARTNER_IDS],
        { context: { mail_notify: false } }
      );
    }

    res.status(200).json({
      success: true,
      leadId,
      message: "CRM lead from PDF download created successfully.",
    });
  } catch (error) {
    console.error("Error in /api/create-pdf-lead:", error);
    res.status(500).json({
      success: false,
      error: error.message || "An internal server error occurred.",
    });
  }
}
