import xmlrpc from "xmlrpc";

// Shared Odoo XML-RPC client, ported from Khales-next's per-route
// duplicated authenticate()/execute_kw boilerplate (see e.g.
// Khales-next/pages/api/create-pdf-lead.js) into one helper so every
// route here (contact, applications, leads, feedback) shares it.

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function createSecureClient(url: string) {
  if (!url.startsWith("https://")) {
    throw new Error(`Invalid or insecure Odoo URL. Must start with https://. Received: "${url}"`);
  }
  // `timeout` is a real, supported option on the underlying http(s) request
  // xmlrpc makes, but @types/xmlrpc's ClientOptions doesn't declare it -
  // cast through unknown rather than fight the incomplete type.
  return xmlrpc.createSecureClient({ url, timeout: 30000 } as unknown as Parameters<
    typeof xmlrpc.createSecureClient
  >[0]);
}

function getClients() {
  const odooUrl = requireEnv("ODOO_URL");
  return {
    commonClient: createSecureClient(`${odooUrl}/xmlrpc/2/common`),
    objectClient: createSecureClient(`${odooUrl}/xmlrpc/2/object`),
  };
}

export async function odooAuthenticate(): Promise<number> {
  const { commonClient } = getClients();
  const db = requireEnv("ODOO_DB");
  const email = requireEnv("ODOO_EMAIL");
  const password = requireEnv("ODOO_PASSWORD");

  return new Promise((resolve, reject) => {
    commonClient.methodCall("authenticate", [db, email, password, {}], (err, uid) => {
      if (err || !uid) return reject(new Error("Odoo authentication failed"));
      resolve(uid as number);
    });
  });
}

export async function odooExecuteKw<T = unknown>(
  uid: number,
  model: string,
  method: string,
  params: unknown[] = [],
  options: Record<string, unknown> = {},
): Promise<T> {
  const { objectClient } = getClients();
  const db = requireEnv("ODOO_DB");
  const password = requireEnv("ODOO_PASSWORD");

  return new Promise((resolve, reject) => {
    objectClient.methodCall(
      "execute_kw",
      [db, uid, password, model, method, params, options],
      (err, result) => (err ? reject(err) : resolve(result as T)),
    );
  });
}

// Finds a utm.source by name, creating it if it doesn't exist yet -
// mirrors the search-then-create pattern every Khales-next Odoo route uses
// so leads land in Odoo tagged with a source that already means something
// there ("Website", "Website Application", ...).
export async function odooFindOrCreateSource(uid: number, name: string): Promise<number> {
  const existing = await odooExecuteKw<number[]>(uid, "utm.source", "search", [
    [["name", "=", name]],
  ]);
  if (existing.length > 0) return existing[0];
  return odooExecuteKw<number>(uid, "utm.source", "create", [{ name }]);
}

// Default CRM followers subscribed on every lead created here - same
// partner ids Khales-next subscribes (see create-pdf-lead.js / application.js).
export const ODOO_DEFAULT_PARTNER_IDS = (process.env.ODOO_DEFAULT_PARTNERS || "9,23")
  .split(",")
  .map((id) => Number(id.trim()))
  .filter((id) => Number.isFinite(id));

export async function odooSubscribeDefaultFollowers(uid: number, leadId: number) {
  if (ODOO_DEFAULT_PARTNER_IDS.length === 0) return;
  await odooExecuteKw(
    uid,
    "crm.lead",
    "message_subscribe",
    [[leadId], ODOO_DEFAULT_PARTNER_IDS],
    { context: { mail_notify: false } },
  );
}
