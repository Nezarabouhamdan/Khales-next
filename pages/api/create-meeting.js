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

// Helper to format JS Date into Odoo's expected UTC datetime string
function formatOdooDateTime(date) {
  return date.toISOString().replace("T", " ").substring(0, 19);
}

// Authenticate and return UID
async function authenticate() {
  return new Promise((resolve, reject) => {
    commonClient.methodCall(
      "authenticate",
      [ODOO_DB, ODOO_EMAIL, ODOO_PASSWORD, {}],
      (err, uid) => {
        if (err) return reject(new Error("Odoo authentication failed"));
        if (!uid)
          return reject(new Error("Authentication returned invalid UID"));
        resolve(uid);
      },
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
    const { name, phone, appointmentDate, appointmentTime, branch, service } =
      req.body;

    // Validate all required fields
    if (
      !name ||
      !phone ||
      !appointmentDate ||
      !appointmentTime ||
      !branch ||
      !service
    ) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    // --- START: ROBUST TIME CALCULATION ---
    // --- REASON: This is the only place time is handled, ensuring consistency.

    // 1. Split the time string (e.g., "17:30") into hours and minutes.
    const [hours, minutes] = appointmentTime.split(":").map(Number);

    // 2. Create a date object from the date string (e.g., "2025-07-15").
    // This creates the date at midnight UTC.
    const startDate = new Date(appointmentDate);

    // 3. Set the hours and minutes in UTC.
    startDate.setUTCHours(hours, minutes, 0, 0);

    // 4. Per your request, subtract 4 hours to counteract the Odoo offset.
    startDate.setUTCHours(startDate.getUTCHours() - 4);

    // 5. Create the end date, 1 hour after the adjusted start time.
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // +1 hour
    // --- END: ROBUST TIME CALCULATION ---

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
              description: `Client Details:\n- Name: ${name}\n- Phone: ${phone}\n- Branch: ${branch}\n- Service: ${service}`,
              partner_ids: [9, 23, 388],
              location: branch,
            },
          ],
        ],
        (err, value) => {
          if (err) {
            return reject(err); // If the call itself errors, reject.
          }
          // --- START: CRITICAL FAILURE CHECK ---
          // --- REASON: Odoo can return 0 or false on failure without an error.
          // This check prevents a "false success" message on the frontend.
          if (!value) {
            return reject(new Error("Odoo failed to create the appointment."));
          }
          // --- END: CRITICAL FAILURE CHECK ---
          resolve(value); // Success
        },
      );
    });

    return res.status(200).json({
      success: true,
      meetingId,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    // This will now catch authentication errors, Odoo creation failures, and others.
    console.error("Error in /api/create-meeting:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
