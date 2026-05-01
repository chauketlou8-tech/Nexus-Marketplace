// function to hash password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(20);
    return await bcrypt.hash(password, salt);
};

module.exports = hashPassword;