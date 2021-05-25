const mongoose = require('mongoose')

module.exports = mongoose.model('leave-message', new mongoose.Schema({
    Guild: String,
    Channel: String,
    Text: String,
}))