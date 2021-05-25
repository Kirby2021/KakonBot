const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    ID: String,
    Guild : String,
    User: String,
    Reason: String,
    Author: String,
    Channel: String,
    Status: String,
})

module.exports = mongoose.model('report2s',Schema)