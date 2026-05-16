const { v4: uuidv4 } = require('uuid');

//creates random ids
const createRandomId = () =>{
    return uuidv4();
}

module.exports = createRandomId;