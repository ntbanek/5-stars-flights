const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    login: String,
    password: String,
    name: String,
    lastname: String,
    age: Number
});

const User = new mongoose.model('UserSchema', UserSchema);

module.exports = User;