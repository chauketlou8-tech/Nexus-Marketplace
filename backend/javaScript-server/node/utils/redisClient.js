require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const connectRedis = require("../db/connectRedisDB");
const url = process.env.REDIS_URI;

const client = connectRedis(url);

module.exports = client;