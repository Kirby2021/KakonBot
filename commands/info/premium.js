const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'premium',
  description: "Buys Premium",
  timeout: '4000',
  aliases: [],
  run: async(client ,message, args) => {
    message.channel.send(new MessageEmbed().setTitle(`Premium`).setDescription(`Want to buy premium ?\n\n[Patreon](https://www.patreon.com/kakonbot)\n\nJoin support server and DM Developer to claim your premium tier`).setColor("RANDOM"))
  }
}