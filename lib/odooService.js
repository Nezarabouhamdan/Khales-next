import { xmlrpc } from "xmlrpc";

class OdooService {
  constructor() {
    this.config = {
      db: process.env.ODOO_DB,
      url: process.env.ODOO_URL,
      email: process.env.ODOO_EMAIL,
      password: process.env.ODOO_PASSWORD,
      partners: process.env.ODOO_DEFAULT_PARTNERS.split(",").map(Number),
    };

    this.clients = {
      common: xmlrpc.createClient({
        url: `${this.config.url}/xmlrpc/2/common`,
      }),
      object: xmlrpc.createClient({
        url: `${this.config.url}/xmlrpc/2/object`,
      }),
    };
  }

  async authenticate() {
    return new Promise((resolve, reject) => {
      this.clients.common.methodCall(
        "authenticate",
        [this.config.db, this.config.email, this.config.password, {}],
        (err, uid) => {
          if (err || uid === false) reject(new Error("Authentication failed"));
          resolve(uid);
        }
      );
    });
  }

  async createRecord(model, data, context = {}) {
    const uid = await this.authenticate();
    return new Promise((resolve, reject) => {
      this.clients.object.methodCall(
        "execute_kw",
        [
          this.config.db,
          uid,
          this.config.password,
          model,
          "create",
          [data],
          context,
        ],
        (err, value) => (err ? reject(err) : resolve(value))
      );
    });
  }

  async addFollowers(model, recordId, partnerIds) {
    const uid = await this.authenticate();
    return new Promise((resolve, reject) => {
      this.clients.object.methodCall(
        "execute_kw",
        [
          this.config.db,
          uid,
          this.config.password,
          model,
          "message_subscribe",
          [[recordId], partnerIds],
          { context: { mail_notify: false } },
        ],
        (err, value) => (err ? reject(err) : resolve(value))
      );
    });
  }
}

export const odooService = new OdooService();
