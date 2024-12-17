const createError = require("http-errors");
const UserModel = require("../models/user");
const ProductsModel = require("../models/product");
const bcrypt = require("bcryptjs");

const UserModelInstance = new UserModel();
const ProductsInstance = new ProductsModel();

module.exports = class UserService {
  async get(data) {
    const { id } = data;
    try {
      const user = await UserModelInstance.findOneById(id);
      if (!user) {
        throw createError(404, "User record not found");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
  async update(data) {
    try {
      const { id, oldPassword, newPassword, ...params } = data;
      const user = await UserModelInstance.findOneById(id);
      if (!user) {
        throw createError(404, "User record not found");
      }
      const isCorrectPassword = await bcrypt.compare(
        oldPassword,
        user.password
      );
      if (!isCorrectPassword) {
        throw createError(401, "Incorrect password");
      }
      if (newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        params.password = hashedPassword;
      }
      return await UserModelInstance.update({ id, ...params });
    } catch (error) {
      throw error;
    }
  }
};
