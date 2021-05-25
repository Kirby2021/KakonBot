const mongoose = require('mongoose')

module.exports = mongoose.model('reaction', new mongoose.Schema({
    Guild: String,
    Message: String,
    Role: String,
    Emoji: String,
}))