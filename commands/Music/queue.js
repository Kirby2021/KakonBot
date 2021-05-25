const { success, error } = require('../../config.json')

module.exports = {
  name: 'queue',
  description: "Shows Queue",
  timeout: '3000',
  aliases: ['que'],
  run: async(client, message, args) => {
    if(!message.guild.me.voice.channel) return message.channel.send(`${error} I must be in voice channel first`)
    let queue = client.player.getQueue(message);
    message.channel.send("\`\`\`" + queue.songs.map((song, id) =>
      `${id + 1} | ${song.name} - ${song.formattedDuration}`
    ).join("\n") + "\`\`\`").catch(err => {
      message.channel.send(`${error} There is no song in queue`)
    })
  }
}