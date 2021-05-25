const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    Guild : String,
    Channel: String,
    Role: String,
})

module.exports = mongoose.model('verifies',Schema)