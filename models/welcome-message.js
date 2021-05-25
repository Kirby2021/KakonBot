const mongoose = require('mongoose')

module.exports = mongoose.model('welcome-message', new mongoose.Schema({
    Guild: String,
    Channel: String,
    Text: String,
}))