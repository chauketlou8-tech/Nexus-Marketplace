require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const connectPostgreDB = require("../db/connectPostgreDB");
const url = process.env.POSTGREDB_URI;

const pool = connectPostgreDB(url);

module.exports = pool
