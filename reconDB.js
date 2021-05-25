const { reconDB } = require('reconlx');
const client = require('./index')

const db = new reconDB(client, {
    uri: 
        'mongodb+srv://LamHanoi:baolam2010@hedydashboard.liyew.mongodb.net/test',
})

module.exports = db;