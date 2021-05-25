const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    Guild: String,
    User: String,
    Reason: String,
})

module.exports = mongoose.model('server-blacklist',Schema)