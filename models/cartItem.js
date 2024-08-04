const db = require("db");
const pgp = require("pg-promise")({ capSQL: true });

moduel.exports = class CartItemModel {
  static async create(data) {
    try {
      const query = pgp.helpers.insert(data, null, "cartItems") + "RETURNING *";
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
      const condition = pgp.as.format("WHERE id = ${id} RETURNING *", { id });
      const query = pgp.helpers.update(data, null, "cartItems") + condition;

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
                        ci.id AS "cartItemId", 
                        p.*
                    FROM 
                        "cartItems" ci
                    INNER JOIN 
                        products p 
                        ON p.id = ci."productId"
                    WHERE 
                        "cartId" = $1;`;
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
                      FROM "cartItems" 
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
