const db = require("db");

module.exports = class ProductModel {
  async find(options = {}) {
    try {
      const query = `SELECT * FROM products`;

      const result = await db.query(query);

      if (result.rows?.length) {
        return result.rows;
      }
      return [];
    } catch (error) {
      throw new Error(error);
    }
  }
  async findOne(id) {
    try {
      const query = `SELECT *
                    FROM products
                    WHERE id = $1
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
