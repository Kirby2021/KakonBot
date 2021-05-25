const { Client, Message } = require('discord.js');
const SnakeGame = require('snakecord')
module.exports = {
    name: 'snakegame',
    description: "Plays Snack Game !",
    timeout: '20000',
    aliases: ['sg'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      if(!message.channel.permissionsFor(message.guild.me).has(["MANAGE_MESSAGES"])) return message.channel.send(`I need \`MANAGE_MESSAGES\` permission to run snack game`)
        const snakeGame = new SnakeGame({
            title: 'Snake Game',
            color: "GREEN",
            timestamp: true,
            gameOverTitle: "Game Over"
        });
        return snakeGame.newGame(message);
    }
}