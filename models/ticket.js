const mongoose = require('mongoose')

module.exports = mongoose.model('ticket', new mongoose.Schema({
    Guild: String,
    Role: String,
}))