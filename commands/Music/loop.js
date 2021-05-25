const { success, error } = require('../../config.json')

module.exports = {
  name: 'loop',
  description: "Loops Current Songs",
  timeout: '1000',
  aliases: ['loop','repeat'],
  run: async(client, message, args) => {
    if(!message.member.voice.channel) return message.channel.send(`${error} You must be in voice channel first`)
    if(message.guild.me.voice.channel) {
      if(message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send(`${error} You must be in my voice channel`)
    }
    if(client.distube.isPlaying == false) return message.channel.send(`${error} I'm not playing any songs`)
    let number = args[0]
    if(!(["0","1","2"]).includes(args[0])) return message.channel.send(`${error} You need to provide repeat mode: \`0\` for Disable Repeat Mode ; \`1\` for Repeat Current Songs ; \`2\` for Repeat all the queue`);
    let mode = client.player.setRepeatMode(message, number);
    mode = mode ? mode == 2 ? "Repeat Queue" : "Repeat Current Song" : "Off";
    message.channel.send(`${success} Repeat Mode: \`${mode}\``)
  }
}