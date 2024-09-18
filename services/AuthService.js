const createError = require("http-errors");
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const UserModelInstance = new UserModel();
module.exports = class AuthService {
  async register(data) {
    const { email, password } = data;
    try {
      const user = await UserModelInstance.findOneByEmail(email);
      if (user) {
        throw createError(409, "Email already in use");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      return await UserModelInstance.create(data);
    } catch (error) {
      throw createError(500, error);
    }
  }
  async login(data) {
    const { email, password } = data;
    console.log(email);
    try {
      const user = await UserModelInstance.findOneByEmail(email);
      if (!user) {
        throw createError(401, "Account doesn't exists");
      }
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (!isCorrectPassword) {
        throw createError(401, "Incorrect username or password");
      }
      return user;
    } catch (error) {
      throw createError(500, error);
    }
  }
};
