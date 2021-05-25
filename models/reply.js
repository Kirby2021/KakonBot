const mongoose = require('mongoose')

module.exports = mongoose.model('custom reply', new mongoose.Schema({
    Guild: String,
    Content: String,
    Response: String
}))