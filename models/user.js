const db = require("../db");
const pgp = require("pg-promise")({ capSQL: true });
module.exports = class UserModel {
  // Creating users
  async create(data) {
    try {
      const query = pgp.helpers.insert(data, null, "users") + "RETURNING *";
      const result = await db.query(query);

      if (result.rows?.lenght) {
        return result.rows[0];
      }
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
  async update(data) {
    try {
      const { id, ...params } = data;

      const condition = pgp.as.format("WHERE id = ${id} RETURNING *", { id });
      const query = pgp.helpers.update(params, null, "users") + condition;

      const result = db.query(query);

      if (result.rows?.lenght) {
        return result.rows[0];
      }
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findOneByEmail(email) {
    try {
      const query = `SELECT * FROM users WHERE email = $1`;
      const params = [email];
      const result = await db.query(query, params);
      if (result.rows?.lenght) {
        return result.rows[0];
      }
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findOneById(id) {
    try {
      const query = `SELECT * FROM users WHERE id = $1`;
      const params = [id];
      const result = await db.query(query, params);
      if (result.rows?.lenght) {
        return result.rows[0];
      }
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
};
