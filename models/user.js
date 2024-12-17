const db = require("../db");
const pgp = require("pg-promise")({ capSQL: true });
module.exports = class UserModel {
  // Creating users
  async create(data) {
    try {
      const query = pgp.helpers.insert(data, null, "users") + "RETURNING *";
      const result = await db.query(query);

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
      const { id, ...rawParams } = data;
      const params = {
        ...rawParams,
        firstname: rawParams.firstName,
        lastname: rawParams.lastName,
        modifiedat: new Date(),
      };
      delete params.firstName;
      delete params.lastName;
      const condition = pgp.as.format("WHERE id = ${id} RETURNING *", { id });
      const query = pgp.helpers.update(params, null, "users") + condition;
      const result = await db.query(query);
      if (result.rows?.length) {
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
      if (result.rows?.length) {
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
      if (result.rows?.length) {
        return result.rows[0];
      }
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
};
