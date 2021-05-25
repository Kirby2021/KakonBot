const { MessageEmbed } = require('discord.js')
const { success, error } = require('../../config.json')

module.exports = {
  name: 'jump',
  description: "Jump to a song",
  aliases: ['jum'],
  timeout: '2000',
  run: async(client, message, args) => {
    if(!message.member.voice.channel) return message.channel.send(`${error} You must be in voice channel first`)
    if(message.guild.me.voice.channel) {
      if(message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send(`${error} You must be in my voice channel`)
    }
    if(client.player.isPlaying(message) == false) return message.channel.send(`${error} The queue is not playing`);
    if(!args[0]) return message.channel.send(`${error} You need to provide song number`)
    if(!Number(args[0])) return message.channel.send(`You need to provide correct song number`)
    client.player.jump(message, parseInt(args[0]) - 1)
    message.channel.send(`${success} Jumped to Song: \`${args[0]}\``)
  }
}