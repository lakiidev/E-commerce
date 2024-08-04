"use strict";

const { query } = require("express");
const { Pool } = require("pg");
const { DB } = require("../config.js");


const pool = new Pool({
    user: DB.PGUSER,
    host: DB.PGHOTS,
    database: DB.PGDATABASE,
    password: DB.PGPASSWORD,
    port: DB.PGPORT,
})

module.exports = {
    query: (text, params) => pool.query(text, params)
}