const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    Guild: String,
    Channel: Array,
})

module.exports = mongoose.model('white-list-word',Schema)