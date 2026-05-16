const redis = require('redis');

const connectRedis = async (url) => {
    const client = redis.createClient({
        url
    });

    client.on('error', (err) => console.error('Redis error:', err));

    await client.connect();
    return client;
}

module.exports = connectRedis;