import xmlrpc from "xmlrpc";
import { sendConfirmationEmail } from "@/lib/sendEmail";

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
    const uid = await authenticate();

    // ✅ ROBUST DESTRUCTURING AND VALIDATION
    const { name, phone, email, description, branch, inquiry } = req.body;
    if (!name || !phone || !email) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

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

    // ✅ FIXED: Conditionally build the description string
    // This prevents 'undefined' from being added to the text.
    let leadDescription = `Branch: ${branch || "Not specified"}\nInquiry: ${
      inquiry || "Not specified"
    }`;
    if (description) {
      // Only add the description if it actually exists
      leadDescription += `\n${description}`;
    }

    const leadData = {
      name: `Website Contact us page - ${name}`,
      contact_name: name,
      phone,
      email_from: email,
      description: leadDescription, // Use the safely constructed string
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

    // Send confirmation email to user
    console.log("📧 Sending confirmation email to:", email);
    const emailResult = await sendConfirmationEmail(
      email,
      name,
      inquiry || "General Inquiry"
    );
    console.log("📧 Email result:", emailResult);

    if (emailResult.success && emailResult.refId) {
      const { refId } = emailResult;
      const updatedLeadData = {
        name: `Contact us - ${refId}`,
        description: `${refId}\n\n${leadDescription}`,
      };

      await new Promise((resolve, reject) => {
        objectClient.methodCall(
          "execute_kw",
          [
            process.env.ODOO_DB,
            uid,
            process.env.ODOO_PASSWORD,
            "crm.lead",
            "write", // Use 'write' to update
            [[leadId], updatedLeadData], // Pass leadId and the data to update
          ],
          (err, result) => {
            if (err) {
              console.error("Failed to update Odoo lead:", err);
              return reject(err);
            }
            console.log("✅ Odoo lead updated successfully with refId:", refId);
            resolve(result);
          }
        );
      });
    }

    res.status(200).json({
      success: true,
      leadId,
      message: "CRM lead created successfully",
      emailSent: emailResult.success,
    });
  } catch (error) {
    console.error("Error in /api/Contact-us:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
}
