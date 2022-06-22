const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Users = new Schema({
    email: {type: String, required: true},
    pwd: {type: String, required: true},
    schedules: {type: Array, required: true},
    token: {type: String, required: false}
});

module.exports = mongoose.model('User', Users);