const { success, error } = require('../../config.json')

module.exports = {
  name: 'resume',
  description: "Resume the queue",
  timeout: '2000',
  aliases: ['resum'],
  run: async(client, message, args) => {
    if(!message.member.voice.channel) return message.channel.send(`${success} You must be in voice channel first`)
    if(!message.guild.me.voice.channel) return message.channel.send(`${error} I must be in voice channel`)
    if(message.guild.me.voice.channel) {
      if(message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send(`${error} You must be in my voice channel`)
    }
    if(client.player.isPlaying(message) == true) return message.channel.send(`${error} The queue is not paused`);
    client.player.resume(message);
    message.channel.send(`${success} Resumed the queue`)
  }
}