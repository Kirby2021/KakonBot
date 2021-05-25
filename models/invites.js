const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    Guild: String,
    Action: String,
})

module.exports = mongoose.model('invites',Schema)