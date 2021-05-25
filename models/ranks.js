const mongoose = require('mongoose')

module.exports = mongoose.model('ranks', new mongoose.Schema({
    Guild: String,
    Rank: String,
    Role: String,
}))