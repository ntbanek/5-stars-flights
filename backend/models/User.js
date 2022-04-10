const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    lastname: String,
    date_of_birth: Date
});

const User = new mongoose.model('UserSchema', UserSchema);

module.exports = User;