const { Pool } = require('pg');

const connectPostgreDB = (url) => {
    return new Pool({
        connectionString: url,
        host: "localhost",
    });
}

module.exports = connectPostgreDB;