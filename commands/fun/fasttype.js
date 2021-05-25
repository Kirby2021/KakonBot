const koenie06games = require('koenie06-games')
const FastTyper = new koenie06games.FastTyper()

module.exports = {
    name: 'fast-type',
    aliases: ['fast-typer','fasttype'],
    description: "Plays fast type games",
    timeout: '3000',
    run: async(client, message, args) => {
        FastTyper.newGame(message)
    }
}