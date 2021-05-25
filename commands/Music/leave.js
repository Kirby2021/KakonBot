const { success, error } = require('../../config.json')

module.exports = {
  name: 'leave',
  description: "Leaves a voice channel",
  timeout: '2000',
  aliases: ['leave'],
  run: async(client, message, args) => {
    if(!message.member.voice.channel) return message.channel.send(`${error} You must be in voice channel first`)
    if(message.guild.me.voice.channel) {
      if(message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send(`${error} You must be in my voice channel`)
    }
    await message.guild.me.voice.channel.leave()
    message.channel.send(`${success} Left voice channel`)
  }
}