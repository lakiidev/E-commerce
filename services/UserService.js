const createError = require("http-errors");
const UserModel = require("../models/user");
const ProductsModel = require("../models/product");

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
      const user = await UserModelInstance.update(data);
      return user;
    } catch (error) {
      throw error;
    }
  }
};
