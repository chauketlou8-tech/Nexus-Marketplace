const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    course: String,
    year: Number,
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;