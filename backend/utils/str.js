const crypto = require('crypto');

//this function helps to generate a string for use
const generateStr = () => {
    return crypto.randomBytes(200).toString('hex');
}
console.log(generateStr());