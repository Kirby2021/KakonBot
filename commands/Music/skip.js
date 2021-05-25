const { success, error } = require('../../config.json')

module.exports = {
  name: 'skip',
  description: "Skips Current Song",
  timeout: '1000',
  aliases: ['skip'],
  run: async(client, message, args) => {
    if(!message.member.voice.channel) return message.channel.send(`${success} You must be in voice channel first`)
    if(!message.guild.me.voice.channel) return message.channel.send(`${error} I must be in voice channel`)
    if(message.guild.me.voice.channel) {
      if(message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send(`${error} You must be in my voice channel`)
    }
    client.player.skip(message);
    message.channel.send(`${success} Skipped current song`)
  }
}