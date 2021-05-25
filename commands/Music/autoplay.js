const { success, error} = require('../../config.json')

module.exports = {
  name: 'autoplay',
  description: "Enable/Disable Autoplay Mode",
  timeout: "2000",
  aliases: ['autop'],
  run: async(client, message, args) => {
    if(!message.member.voice.channel) return message.channel.send(`${success} You must be in voice channel first`)
    if(!message.guild.me.voice.channel) return message.channel.send(`${error} I must be in voice channel`)
    if(message.guild.me.voice.channel) {
      if(message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send(`${error} You must be in my voice channel`)
    }
    let mode = client.player.toggleAutoplay(message);
    message.channel.send(`${success} Autoplay Mode: \`${mode ? "On" : "Off"}\``)
  }
}