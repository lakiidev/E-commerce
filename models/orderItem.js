const db = require("../db");
const moment = require("moment");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class OrderItemModel {
  async create(data) {
    try {
      const query =
        pgp.helpers.insert(data, null, "orderitems") + "RETURNING *";
      const result = await db.query(query);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async find(orderId) {
    try {
      const query = `SELECT 
                            oi.quantity,
                            oi.id AS "cartitemid", 
                            p.*
                         FROM "orderitems" oi
                         INNER JOIN products p ON p.id = oi."productid"
                         WHERE "orderid" = $1`;
      const params = [orderId];

      const result = await db.query(query, params);

      if (result.rows?.length) {
        return result.rows;
      }

      return [];
    } catch (error) {
      throw new Error(error);
    }
  }
};
