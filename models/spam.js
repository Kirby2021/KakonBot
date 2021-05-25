const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    Guild: String,
    Action: String,
    Messages: Number,
})

module.exports = mongoose.model('anti-spam',Schema)