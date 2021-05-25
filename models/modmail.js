const mongoose = require('mongoose')

module.exports = mongoose.model('modmail', new mongoose.Schema({
    Guild: String,
    Parent: String,
    Role: String
}))