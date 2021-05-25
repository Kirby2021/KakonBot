const mongoose = require('mongoose')

module.exports = mongoose.model(
    "Money",
    new mongoose.Schema({
        id: String,
        coins: Number,
    })
)