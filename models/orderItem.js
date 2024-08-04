const db = require("../db");
const moment = require("moment");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class OrderItemModel {
  constructor(data = {}) {
    this.createdAt = data.created || moment.utc().toISOString();
    this.modifiedAt = moment.utc().toISOString();
    this.description = data.description;
    this.name = data.name;
    this.price = data.price || 0;
    this.productId = data.id;
    this.quantity = data.quantity;
    this.orderId = data.orderId;
  }

  async create(data) {}
};
