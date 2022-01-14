//imports
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    dob: {
        type: String,
    },
    phone: {
        type: String,
    },
    lastLogin: {
        type: String,
    }
})

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;