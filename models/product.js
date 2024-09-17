const db = require("../db");

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

  async create(data) {
    try {
      const query = `INSERT INTO products (name, description, price, image_url_url, createdAt,modifiedAt)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING *`;
      const params = [
        data.name,
        data.description,
        data.price,
        data.image_url_url,
        data.createdAt || new Date(),
        data.modifiedAt || data.createdAt || new Date(),
      ];
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
