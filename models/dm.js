const mongoose = require('mongoose')

module.exports = mongoose.model('dm', new mongoose.Schema({
    Guild: String,
    Text: String,
}))