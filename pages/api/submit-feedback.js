import xmlrpc from "xmlrpc";

const createSecureClient = (url) => {
  if (!url || !url.startsWith("https://")) {
    throw new Error(`Invalid Odoo URL: "${url}"`);
  }
  return xmlrpc.createSecureClient({ url, timeout: 30000 });
};

const commonClient = createSecureClient(
  `${process.env.ODOO_URL}/xmlrpc/2/common`
);
const objectClient = createSecureClient(
  `${process.env.ODOO_URL}/xmlrpc/2/object`
);

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
        if (err || !uid) return reject(new Error("Odoo authentication failed"));
        resolve(uid);
      }
    );
  });
}

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

const RATING_LABELS = {
  too_low: "Too Low (أقل من المتوقع)",
  just_right: "Just Right (مناسب)",
  too_high: "Too High (أعلى من المتوقع)",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const { leadId, rating, comment, totalPrice, totalBUA, lang } = req.body;

    if (!rating) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required field: rating" });
    }

    if (!leadId) {
      return res
        .status(400)
        .json({ success: false, error: "Missing leadId — cannot attach feedback without a lead." });
    }

    const uid = await authenticate();

    const ratingLabel = RATING_LABELS[rating] || rating;
    const noteBody =
      `<p><strong>📊 Calculator Price Feedback</strong></p>` +
      `<p>Rating: <strong>${ratingLabel}</strong></p>` +
      `<p>Total Estimated Price: <strong>${totalPrice ? Math.round(totalPrice).toLocaleString() + " AED" : "N/A"}</strong></p>` +
      `<p>Total BUA: <strong>${totalBUA ? Number(totalBUA).toFixed(2) + " m²" : "N/A"}</strong></p>` +
      `<p>Language: ${lang || "en"}</p>` +
      (comment ? `<p>Comment: <em>${comment}</em></p>` : "");

    // Post as an internal note on the existing lead
    await executeKw(uid, "crm.lead", "message_post", [[leadId]], {
      kwargs: {
        body: noteBody,
        message_type: "comment",
        subtype_xmlid: "mail.mt_note",
      },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in /api/submit-feedback:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
}
