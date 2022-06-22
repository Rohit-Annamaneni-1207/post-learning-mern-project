const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Schedule = new Schema({
    user_id: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    venue: {type: String, required: true}
});

module.exports = mongoose.model('Schedule', Schedule);