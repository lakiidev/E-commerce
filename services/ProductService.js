const createError = require("http-errors");
const ProductModel = require("../models/product");
const ProductModelInstance = new ProductModel();

module.exports = class ProductService {
  async list(options) {
    try {
      const products = await ProductModelInstance.find(options);
      return products;
    } catch (error) {
      throw error;
    }
  }

  async get(id) {
    try {
      const product = await ProductModelInstance.findOne(id);
      if (!product) {
        throw createError(404, "Product not found");
      }
      return product;
    } catch (error) {
      throw error;
    }
  }
  async addProducts(data) {
    try {
      const products = await ProductModelInstance.create({
        name: data.productName,
        description: data.productDescription,
        price: data.productPrice,
        image: data.image,
      });
      return products;
    } catch (error) {
      throw error;
    }
  }
};
