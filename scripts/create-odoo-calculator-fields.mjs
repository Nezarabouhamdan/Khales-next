// Creates the x_calc_* custom fields on crm.lead that calculator v2 writes
// (see docs/calculator-v2.md). Idempotent: fields that already exist are
// skipped, so it's safe to run again after adding a field to the list.
//
// Needs an Odoo user allowed to create fields (Settings / Administration
// rights) - the website's own integration user usually isn't one.
//
//   node scripts/create-odoo-calculator-fields.mjs --dry-run   # report only
//   node scripts/create-odoo-calculator-fields.mjs
//
// Reads ODOO_URL, ODOO_DB, ODOO_EMAIL and ODOO_PASSWORD from the
// environment; .env.local is loaded when present (variables already set in
// the environment win), so an admin login can be passed inline, e.g.
//   ODOO_EMAIL=admin@... ODOO_PASSWORD=... node scripts/create-odoo-calculator-fields.mjs
//
// The website picks new fields up within ten minutes (it caches fields_get)
// - no redeploy. To show them on the lead form, add them with Studio or a
// view edit; they're already usable in filters, group-by and exports.

import { existsSync } from "node:fs";
import { resolve } from "node:path";
import xmlrpc from "xmlrpc";

// Copy of CALCULATOR_ODOO_FIELDS in lib/calculator/odooLead.ts (plain Node
// can't import that TypeScript file) - keep the two lists in sync.
const FIELDS = [
  { name: "x_calc_reference", type: "char", label: "Calculator reference" },
  { name: "x_calc_version", type: "char", label: "Calculator version" },
  { name: "x_calc_source", type: "char", label: "Calculator source" },
  { name: "x_calc_request_type", type: "char", label: "Calculator request type" },
  { name: "x_calc_country", type: "char", label: "Calculator country" },
  { name: "x_calc_city", type: "char", label: "Calculator city" },
  { name: "x_calc_market_mode", type: "char", label: "Calculator market mode" },
  { name: "x_calc_market_confidence", type: "char", label: "Calculator market confidence" },
  { name: "x_calc_pricing_source_date", type: "char", label: "Calculator pricing source date" },
  { name: "x_calc_anchor_date", type: "char", label: "Calculator price anchor date" },
  { name: "x_calc_input_mode", type: "char", label: "Calculator input mode" },
  { name: "x_calc_built_area_sqm", type: "float", label: "Calculator built area (m²)" },
  { name: "x_calc_budget", type: "float", label: "Calculator budget" },
  { name: "x_calc_currency", type: "char", label: "Calculator currency" },
  { name: "x_calc_finish_level", type: "char", label: "Calculator finish level" },
  { name: "x_calc_result_low", type: "float", label: "Calculator result low" },
  { name: "x_calc_result_expected", type: "float", label: "Calculator result expected" },
  { name: "x_calc_result_high", type: "float", label: "Calculator result high" },
  { name: "x_calc_area_conservative_sqm", type: "float", label: "Calculator conservative area (m²)" },
  { name: "x_calc_area_reference_sqm", type: "float", label: "Calculator reference area (m²)" },
  { name: "x_calc_area_max_sqm", type: "float", label: "Calculator maximum area (m²)" },
  { name: "x_calc_special_items", type: "char", label: "Calculator special items" },
  { name: "x_calc_land_status", type: "char", label: "Calculator land status" },
  { name: "x_calc_start_timing", type: "char", label: "Calculator start timing" },
  { name: "x_calc_has_plan_or_quote", type: "boolean", label: "Calculator has plan or contractor quote" },
  { name: "x_calc_review_goal", type: "char", label: "Calculator review goal" },
  { name: "x_calc_preferred_contact", type: "char", label: "Calculator preferred contact" },
  { name: "x_calc_contact_consent", type: "boolean", label: "Calculator contact consent" },
  { name: "x_calc_marketing_consent", type: "boolean", label: "Calculator marketing consent" },
  { name: "x_calc_lead_score", type: "integer", label: "Calculator lead score" },
  { name: "x_calc_floors", type: "char", label: "Calculator floors" },
  { name: "x_calc_family_plan", type: "text", label: "Calculator family plan" },
  { name: "x_calc_lang", type: "char", label: "Calculator language" },
  { name: "x_calc_created_at", type: "char", label: "Calculator created at" },
];

const MODEL = "crm.lead";
const dryRun = process.argv.includes("--dry-run");

const envFile = resolve(process.cwd(), ".env.local");
if (existsSync(envFile) && typeof process.loadEnvFile === "function") {
  process.loadEnvFile(envFile);
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var ${name} (set it or add it to .env.local)`);
  return value;
}

function call(client, method, params) {
  return new Promise((resolvePromise, reject) => {
    client.methodCall(method, params, (error, value) => (error ? reject(error) : resolvePromise(value)));
  });
}

async function main() {
  const url = requireEnv("ODOO_URL");
  const db = requireEnv("ODOO_DB");
  const login = requireEnv("ODOO_EMAIL");
  const password = requireEnv("ODOO_PASSWORD");
  // Same rule as lib/odoo.ts: credentials only ever go over https.
  if (!url.startsWith("https://")) throw new Error("ODOO_URL must start with https://");

  const common = xmlrpc.createSecureClient({ url: `${url}/xmlrpc/2/common` });
  const object = xmlrpc.createSecureClient({ url: `${url}/xmlrpc/2/object` });

  const uid = await call(common, "authenticate", [db, login, password, {}]);
  if (!uid) throw new Error("Odoo authentication failed - check ODOO_DB / ODOO_EMAIL / ODOO_PASSWORD");
  const executeKw = (model, method, args, kwargs = {}) =>
    call(object, "execute_kw", [db, uid, password, model, method, args, kwargs]);

  const [modelId] = await executeKw("ir.model", "search", [[["model", "=", MODEL]]], { limit: 1 });
  if (!modelId) throw new Error(`Model ${MODEL} not found - is the CRM app installed?`);

  const existing = await executeKw(
    "ir.model.fields",
    "search_read",
    [
      [
        ["model_id", "=", modelId],
        ["name", "in", FIELDS.map((field) => field.name)],
      ],
    ],
    { fields: ["name", "ttype"] },
  );
  const existingTypes = new Map(existing.map((field) => [field.name, field.ttype]));

  console.log(`${dryRun ? "[dry run] " : ""}${MODEL} on ${url} (db ${db}): ${FIELDS.length} calculator fields\n`);
  let created = 0;
  let skipped = 0;
  for (const field of FIELDS) {
    const currentType = existingTypes.get(field.name);
    if (currentType) {
      skipped++;
      const mismatch =
        currentType === field.type
          ? ""
          : ` - expected ${field.type}; the website writes it only when the value fits ${currentType}`;
      console.log(`skip     ${field.name} (exists, ${currentType})${mismatch}`);
      continue;
    }
    if (dryRun) {
      created++;
      console.log(`create   ${field.name} (${field.type}, "${field.label}")`);
      continue;
    }
    const id = await executeKw("ir.model.fields", "create", [
      {
        name: field.name,
        field_description: field.label,
        model_id: modelId,
        model: MODEL,
        ttype: field.type,
        state: "manual",
      },
    ]);
    created++;
    console.log(`created  ${field.name} (${field.type}, id ${id})`);
  }

  console.log(
    `\n${dryRun ? `Would create ${created}` : `Created ${created}`}, skipped ${skipped} that already exist.` +
      (dryRun && created > 0 ? " Run again without --dry-run to create them." : ""),
  );
}

main().catch((error) => {
  // Odoo faults carry a full traceback; its last line names the error.
  const message = error?.faultString ? String(error.faultString).trim().split("\n").pop() : error?.message;
  console.error(`Failed: ${message ?? error}`);
  process.exitCode = 1;
});
