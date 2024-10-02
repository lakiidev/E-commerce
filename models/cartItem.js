const { raw } = require("body-parser");
const db = require("../db");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class CartItemModel {
  static async create(data) {
    try {
      const query =
        pgp.helpers.insert(data, null, "cartitems") + " RETURNING *";
      const result = await db.query(query);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async update(id, data) {
    try {
      const condition = pgp.as.format(" WHERE id = ${id} RETURNING *", { id });
      const query = pgp.helpers.update(data, null, "cartitems") + condition;
      const result = await db.query(query);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async find(cartId) {
    try {
      const query = `SELECT 
                        ci.quantity,
                        ci.id AS "cartitemid", 
                        p.*
                    FROM 
                        "cartitems" ci
                    INNER JOIN 
                        products p 
                        ON p.id = ci."productid"
                    WHERE 
                        "cartid" = $1;`;
      const params = [cartId];
      const result = await db.query(query, params);
      if (result.rows?.length) {
        return result.rows;
      }
      return [];
    } catch (error) {
      throw new Error(error);
    }
  }

  static async delete(id) {
    try {
      const query = `DELETE
                      FROM "cartitems" 
                      WHERE id= $1
                      RETURNING *
                    `;
      const params = [id];
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
