require('dotenv').config();
const app = require("./app");
const connectDB = require("./db/connectDB");

const port = process.env.PORT || 3001;
const url = process.env.MongoDB_URI;

async function start (){
    try{

        await connectDB(url);

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