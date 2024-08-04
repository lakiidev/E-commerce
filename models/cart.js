const db = require("db");
const pgp = require("pg-promise")({ capSQL: true });

const moment = require("moment");

module.exports = class CartModel {
  constructor(data = {}) {
    this.cretatedAt = data.cretatedAt || moment.utc().toISOString();
    this.modifiedAt = moment.utc().toISOString();
    this.converted = data.converted || null;
    this.isActive = data.isActive || true;
  }
  async create(userId) {
    try {
      const data = { userId, ...this };
      const query = pgp.helpers.insert(data, null, "carts");
      +"RETURNING *";
      const result = await db.query(query);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async findOneByUser(userId) {
    try {
      const query = `SELECT *
                     FROM carts
                     WHERE userId = $1`;
      const params = [userId];
      const result = await db.query(query, params);

      if (result.rows?.length) {
        return result.rows[0];
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  static async findOneById(id) {
    try {
      const query = `SELECT *
                     FROM carts
                     WHERE id = $1
        `;
      const params = [id];
      consolet = await db.query(query, params);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return;
    } catch (error) {
      throw new Error(error);
    }
  }
};
