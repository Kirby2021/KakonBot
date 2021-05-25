const express = require('express')
const server = express()
server.all("/", (req, res) => {
  res.send(`Hosting 24/7...`)
})

function keepAlive() {
  server.listen(3000, () => { console.log(`Ready for Hosting !` + Date.now()) })
}

module.exports = keepAlive;