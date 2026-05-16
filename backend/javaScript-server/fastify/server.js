require('dotenv').config();
const app = require('./app');

const port = process.env.PORT || 3002;

async function start() {
    try {
        await app.listen({ port });
        console.log(`Server listening on port ${port}...`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

void start();
