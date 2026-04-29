require('dotenv').config();
const app = require("./app");
const connectMongoDB = require("./db/connectMongoDB");
const connectPostgreDB = require("./db/connectPostgreDB");
const connectRedis = require("./db/connectRedisDB");

const port = process.env.PORT || 3001;

//databases url
const mongoUrl = process.env.MONGODB_URI;
const postgreUrl = process.env.POSTGREDB_URI;
const redisUrl = process.env.REDIS_URI;

async function start (){
    try{

        await connectMongoDB(mongoUrl);
        await connectPostgreDB(postgreUrl);
        await connectRedis(redisUrl);

        console.log("MongoDB Connected!", "PostgreSQL Connected!", "Redis Connected!");

        app.listen(port,() => {
            console.log(`Server listening on port ${ port }...`);
        });
    }
    catch(err){
        console.log(err);
        return null;
    }
}

void start();