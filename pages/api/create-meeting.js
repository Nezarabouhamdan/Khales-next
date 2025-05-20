// pages/api/create-meeting.js
import xmlrpc from "xmlrpc";

// Odoo configuration from environment
const { ODOO_URL, ODOO_DB, ODOO_EMAIL, ODOO_PASSWORD } = process.env;

// Use secure client for HTTPS
const commonClient = xmlrpc.createSecureClient({
  url: `${ODOO_URL}/xmlrpc/2/common`,
});
const objectClient = xmlrpc.createSecureClient({
  url: `${ODOO_URL}/xmlrpc/2/object`,
});

// Helper to format JS Date into Odoo datetime string
function formatOdooDateTime(date) {
  return date.toISOString().replace(/T/, " ").replace(/\..+/, "");
}

// Authenticate and return UID
async function authenticate() {
  return new Promise((resolve, reject) => {
    commonClient.methodCall(
      "authenticate",
      [ODOO_DB, ODOO_EMAIL, ODOO_PASSWORD, {}],
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
    const { name, phone, appointmentDate, appointmentTime, branch, inquiry } =
      req.body;

    // Validate required fields
    if (!name || !phone || !appointmentDate || !appointmentTime) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    // Parse and build start/end
    const [hours, minutes] = appointmentTime.split(":").map(Number);
    const startDate = new Date(appointmentDate);
    startDate.setHours(hours, minutes);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // +1 hour

    // Create calendar event
    const meetingId = await new Promise((resolve, reject) => {
      objectClient.methodCall(
        "execute_kw",
        [
          ODOO_DB,
          uid,
          ODOO_PASSWORD,
          "calendar.event",
          "create",
          [
            {
              name: `${name}'s Appointment`,
              start: formatOdooDateTime(startDate),
              stop: formatOdooDateTime(endDate),
              description: `Client Details:\n- Name: ${name}\n- Phone: ${phone}\n- Branch: ${branch}\n- Service: ${inquiry}`,
              partner_ids: [9, 23, 1041], // default partner IDs
              location: branch,
            },
          ],
        ],
        (err, value) => (err ? reject(err) : resolve(value))
      );
    });

    return res.status(200).json({
      success: true,
      meetingId,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.error("Error in /api/create-meeting:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
