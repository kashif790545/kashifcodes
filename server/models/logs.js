const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logsSchema = new Schema({
    msg: {
        type: String,
    },
    info: {
        type: String,
    },
    date: {
        type: String,
    }
})

const logModel = mongoose.model('logs', logsSchema);

module.exports = logModel;