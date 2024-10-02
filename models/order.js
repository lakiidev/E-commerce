const db = require("../db");
const moment = require("moment");
const pgp = require("pg-promise")({ capSQL: true });
const OrderItem = require("./orderItem");

module.exports = class OrderModel {
  constructor(data = {}) {
    this.createdat = data.created || moment.utc().toISOString();
    this.modifiedat = moment.utc().toISOString();
    this.status = data.status || "PENDING";
  }

  async create({ total, userid }) {
    try {
      const order = { userid, total, ...this };
      const statement =
        pgp.helpers.insert(order, null, "orders") + " RETURNING *";
      const result = await db.query(statement);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
  async update(data) {
    try {
      const condition = pgp.as.format("WHERE id= ${id} RETURNING *", {
        id: this.id,
      });
      const query = pgp.helpers.update(data, null, "orders") + condition;
      const result = await db.query(statement);

      if (query.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async findByUser(userId) {
    try {
      const query = `SELECT * FROM orders WHER "userId= $1`;
      const params = [userId];

      const result = await db.query(query, params);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async findById(orderId) {
    try {
      const query = `SELECT *
                         FROM orders
                         WHERE id = $1`;

      const params = [orderId];

      const result = await db.query(query, params);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return;
    } catch (error) {
      throw new Error(error);
    }
  }
};
