const db = require("../db");
const moment = require("moment");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class OrdreModel {
  constructor(data = {}) {
    this.created = data.created || moment.utc().toISOString();
    this.items = data.items || [];
    this.modified = moment.utc().toISOString();
    this.status = data.status() || "PENDING";
    this.total = data.total || 0;
    this.userId = data.userId || null;
  }

  addItems(items)
  {
    this.items = items.app(item =>)
  }

  async create()
  {
    try {
        const { items, ...order } = this;

      const statement = pgp.helpers.insert(order, null, 'orders') + ' RETURNING *';
      const result = await db.query(statement);

      if (result.rows?.length) {

        Object.assign(this, result.rows[0]);

        return result.rows[0];
      }
      return;
    } catch (error) {
        throw new Error(err)
    }
  }
  async update(data) {
    try {
        
        const condition = pgp.as.format("WHERE id= ${id} RETURNING *",{id:this.id})
        const query = pgp.helpers.update(data,null,'orders')+ condition;
        const result = await db.query(statement);

        if(query.rows?.length)
        {
            return result.rows[0];
        }

        return null;

    } catch (error) {
        throw new Error(err);
    }
  }
};
