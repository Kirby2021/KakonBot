const { MessageEmbed } = require('discord.js')
const { success, error } = require('../../config.json')

module.exports = {
  name: 'stop',
  description: "Stops a song",
  aliases: ['stop'],
  timeout: '2000',
  run: async(client, message, args) => {
    if(!message.guild.me.voice.channel) return message.channel.send(`${error} I'm not in voice channel`)
    await client.player.stop(message);
    message.channel.send(`${success} Stopped Playing`)
  }
}