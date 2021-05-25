const mongoose = require('mongoose')

module.exports = mongoose.model('only', new mongoose.Schema({
    Guild: String,
    Channel: String,
}))