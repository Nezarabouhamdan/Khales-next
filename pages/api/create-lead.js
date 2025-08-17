import xmlrpc from "xmlrpc";

// ======================= DEBUGGING LOGS =======================
// This will print the environment variables to your server console when the API route is compiled.
console.log("--- Loading /api/create-lead ---");
console.log(`[ENV] ODOO_URL: "${process.env.ODOO_URL}"`);
console.log(`[ENV] ODOO_DB: "${process.env.ODOO_DB}"`);
console.log(`[ENV] ODOO_EMAIL: "${process.env.ODOO_EMAIL}"`);
// We don't log the password for security reasons.
console.log("------------------------------------");
// =============================================================

// Helper function to create a secure client for HTTPS URLs
const createSecureClient = (url) => {
  // Add a more detailed error message to show the problematic URL
  if (!url || !url.startsWith("https://")) {
    throw new Error(
      `Invalid or insecure Odoo URL provided. URL must start with https://. Received: "${url}"`
    );
  }
  return xmlrpc.createSecureClient({ url });
};

// Initialize clients
const commonClient = createSecureClient(
  `${process.env.ODOO_URL}/xmlrpc/2/common`
);
const objectClient = createSecureClient(
  `${process.env.ODOO_URL}/xmlrpc/2/object`
);

/**
 * Authenticates with the Odoo server.
 */
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
        if (err || uid === false) {
          console.error(
            "Odoo authentication error:",
            err || "Invalid credentials"
          );
          return reject(new Error("Authentication failed"));
        }
        resolve(uid);
      }
    );
  });
}

// ... (the rest of the file remains the same)

/**
 * Helper function to simplify making Odoo API calls.
 */
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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method Not Allowed" });
  }

  try {
    // 1. Authenticate
    const uid = await authenticate();

    // 2. Validate required fields from the request body
    const { name, phone, email, description, branch, inquiry } = req.body;
    if (!name || !phone || !email) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    // 3. Find or create the UTM Source "Website"
    let sourceIds = await executeKw(uid, "utm.source", "search", [
      [["name", "=", "Website"]],
    ]);
    let sourceId;

    if (sourceIds.length > 0) {
      sourceId = sourceIds[0];
    } else {
      sourceId = await executeKw(uid, "utm.source", "create", [
        { name: "Website" },
      ]);
    }

    // 4. Create the CRM lead
    const leadData = {
      name: `Website Lead - ${name}`,
      contact_name: name,
      phone,
      email_from: email,
      description: `Branch: ${branch || "N/A"}\nInquiry: ${inquiry || "N/A"}\n${
        description || ""
      }`,
      source_id: sourceId,
    };
    const leadId = await executeKw(uid, "crm.lead", "create", [leadData]);

    // 5. Subscribe default partners as followers
    const DEFAULT_PARTNER_IDS = [9, 23, 1041];
    await executeKw(
      uid,
      "crm.lead",
      "message_subscribe",
      [[leadId], DEFAULT_PARTNER_IDS],
      { context: { mail_notify: false } }
    );

    // 6. Return a success response
    res.status(200).json({
      success: true,
      leadId,
      message: "CRM lead created successfully",
    });
  } catch (error) {
    console.error("Error in /api/create-lead:", error);
    res.status(500).json({
      success: false,
      error: error.message || "An internal server error occurred",
    });
  }
}
