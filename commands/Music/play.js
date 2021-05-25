const { MessageEmbed } = require('discord.js')
const { success, error } = require('../../config.json')

module.exports = {
  name: 'play',
  description: "Plays a song",
  aliases: ['play','p'],
  timeout: '2000',
  run: async(client, message, args) => {
    if(!message.member.voice.channel) return message.channel.send(`${error} You must be in voice channel first`)
    if(message.guild.me.voice.channel) {
      if(message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send(`${error} You must be in my voice channel`)
    }
    const query = args.join(" ")
    if(!query) return message.channel.send(`${error} You must provide Song Title/URL`);
    await client.player.play(message, query)
  }
}