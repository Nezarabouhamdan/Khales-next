import xmlrpc from "xmlrpc";

// ======================= DEBUGGING LOGS =======================
console.log("--- Loading API Route ---");
console.log(`[ENV] ODOO_URL: "${process.env.ODOO_URL}"`);
// ... (other logs)
// =============================================================

// Helper function to create a secure client for HTTPS URLs
const createSecureClient = (url) => {
  if (!url || !url.startsWith("https://")) {
    throw new Error(
      `Invalid or insecure Odoo URL provided. URL must start with https://. Received: "${url}"`,
    );
  }
  return xmlrpc.createSecureClient({
    url,
    // 🎯 THE FIX: Add a timeout to the client itself.
    // This will make the API fail faster and more gracefully if Odoo is unresponsive.
    // Value is in milliseconds (30000ms = 30 seconds).
    timeout: 30000,
  });
};

// Initialize clients
const commonClient = createSecureClient(
  `${process.env.ODOO_URL}/xmlrpc/2/common`,
);
const objectClient = createSecureClient(
  `${process.env.ODOO_URL}/xmlrpc/2/object`,
);

async function authenticate() {
  // ... (rest of your authentication function is perfect)
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
            err || "Invalid credentials",
          );
          return reject(new Error("Authentication failed"));
        }
        resolve(uid);
      },
    );
  });
}

async function executeKw(uid, model, method, params = [], options = {}) {
  // ... (rest of your helper function is perfect)
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
      (err, result) => (err ? reject(err) : resolve(result)),
    );
  });
}

export default async function handler(req, res) {
  // ... (Your entire handler function is perfectly written, no changes needed here)
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const uid = await authenticate();
    const { name, phone, email, description, branch, inquiry } = req.body;
    if (!name || !phone || !email) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

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

    const DEFAULT_PARTNER_IDS = [9, 23, 388];
    await executeKw(
      uid,
      "crm.lead",
      "message_subscribe",
      [[leadId], DEFAULT_PARTNER_IDS],
      { context: { mail_notify: false } },
    );

    res.status(200).json({
      success: true,
      leadId,
      message: "CRM lead created successfully",
    });
  } catch (error) {
    console.error("Error in API route:", error);
    res.status(500).json({
      success: false,
      error: error.message || "An internal server error occurred",
    });
  }
}
