const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'bug-report',
  description: "Reports a bug",
  timeout: '10',
  aliases: ['brp'],
  usage: '[Bug]',
  run: async(client, message, args) => {
    const bug = args.join(" ")
    if(!bug) return message.channel.send(`You need provide a bug to report`)
    const bug1 = new MessageEmbed()
      .setTitle(`New Bug Reported`)
      .setColor("RANDOM")
      .setDescription(`${bug}`)
      .addField(`General Information`, [
        `User: ${message.author.tag} / ${message.author.id}`,
        `Guild: ${message.guild.name} / ${message.guild.id}`
      ])
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    const channel = await client.channels.cache.get('836637569202126889')
    channel.send(bug1)
    message.channel.send(`Your Bug Report has been sent.`)
  }
}