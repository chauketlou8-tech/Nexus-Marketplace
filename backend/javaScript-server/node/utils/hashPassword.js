// function to hash password
const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(15);
    return await bcrypt.hash(password, salt);
};

module.exports = hashPassword;