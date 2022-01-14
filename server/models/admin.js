//imports
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
})

const adminModel = mongoose.model('admins', adminSchema);

module.exports = adminModel;