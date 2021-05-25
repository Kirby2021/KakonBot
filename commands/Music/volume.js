const { MessageEmbed } = require('discord.js')
const { success, error } = require('../../config.json')

module.exports = {
  name: 'volume',
  description: "Set Volume",
  aliases: ['volu'],
  timeout: '2000',
  run: async(client, message, args) => {
    if(!message.member.voice.channel) return message.channel.send(`${error} You must be in voice channel first`)
    if(message.guild.me.voice.channel) {
      if(message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send(`${error} You must be in my voice channel`)
    }
    if(client.distube.isPlaying == false) return message.channel.send(`${error} I'm not playing any songs`)
    let number = args[0]
    if(!Number(number)) return message.channel.send(`${error} New Volume must be a number or Volume can't be \`0%\``)
    if(number > 100) return message.channel.send(`${error} Volume can't be more than \`100%\``)
    await client.player.setVolume(message, number)
    message.channel.send(`${success} Volume Updated: \`${number}%\``)
  }
}