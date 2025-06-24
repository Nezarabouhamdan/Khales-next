// odoo.js
import xmlrpc from "xmlrpc";

export async function connect() {
  const common = xmlrpc.createClient({
    url: `${process.env.ODOO_URL}/xmlrpc/2/common`,
  });
  const uid = await new Promise((res) =>
    common.methodCall(
      "authenticate",
      [
        process.env.ODOO_DB,

        process.env.ODOO_EMAIL,
        process.env.ODOO_PASSWORD,
        {},
      ],
      (e, u) => res(u)
    )
  );
  return {
    uid,
    client: xmlrpc.createClient({
      url: `${process.env.ODOO_URL}/xmlrpc/2/object`,
    }),
  };
}

export async function fetchEmployees({ uid, client }) {
  const ids = await new Promise((res) =>
    client.methodCall(
      "execute_kw",
      [
        process.env.ODOO_DB,
        process.env.ODOO_EMAIL,
        process.env.ODOO_PASSWORD,
        "hr.employee",
        "search",
        [[]],
      ],
      (e, r) => (e ? console.error(e) : res(r))
    )
  );
  const fields = ["id", "badge_id", "name"];
  const employees = await new Promise((res) =>
    client.methodCall(
      "execute_kw",
      [
        process.env.ODOO_DB,
        process.env.ODOO_EMAIL,
        process.env.ODOO_PASSWORD,
        "hr.employee",
        "read",
        [ids, fields],
      ],
      (e, r) => (e ? console.error(e) : res(r))
    )
  );
  return employees; // array of {id, badge_id, name}
}
