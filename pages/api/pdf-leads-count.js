import xmlrpc from "xmlrpc";

const createSecureClient = (url) => {
  if (!url || !url.startsWith("https://")) {
    throw new Error("Invalid or insecure Odoo URL provided.");
  }
  return xmlrpc.createSecureClient({ url, timeout: 30000 });
};

const commonClient = process.env.ODOO_URL
  ? createSecureClient(`${process.env.ODOO_URL}/xmlrpc/2/common`)
  : null;
const objectClient = process.env.ODOO_URL
  ? createSecureClient(`${process.env.ODOO_URL}/xmlrpc/2/object`)
  : null;

async function authenticate() {
  if (!commonClient) throw new Error("Odoo URL not configured");
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
        if (err || !uid) return reject(err || new Error("Auth failed"));
        resolve(uid);
      },
    );
  });
}

async function executeKw(uid, model, method, params = [], options = {}) {
  if (!objectClient) throw new Error("Odoo URL not configured");
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
  try {
    // Only allow GET
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res
        .status(405)
        .json({ success: false, error: "Method Not Allowed" });
    }

    // Basic env check
    if (
      !process.env.ODOO_URL ||
      !process.env.ODOO_DB ||
      !process.env.ODOO_EMAIL ||
      !process.env.ODOO_PASSWORD
    ) {
      return res
        .status(200)
        .json({ success: true, count: 0, warning: "Odoo not configured" });
    }

    const uid = await authenticate();

    // Domain: name starts with 'PDF Download Lead - '
    // Use 'like' with wildcard to approximate starts-with
    const domain = [["name", "like", "PDF Download Lead - %"]];

    const count = await executeKw(uid, "crm.lead", "search_count", [domain]);

    return res.status(200).json({ success: true, count: Number(count) || 0 });
  } catch (error) {
    console.error("/api/pdf-leads-count error:", error);
    return res
      .status(200)
      .json({ success: false, count: 0, error: String(error) });
  }
}
