const { MessageEmbed } = require('discord.js')
const schema = require('../../models/warns')
const { success, error } = require('../../config.json')

module.exports = {
  name: 'clearserverwarns',
  description: "Clears all active warnings on the server",
  timeout: '20000',
  aliases: [],
  run: async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`${error} You can't use this command`)
  schema.find({ guildid: message.guild.id }, async(err,data) => {
     if(!data) return message.channel.send(`${error} This server doesn't have any active warnings.`)
     let warnings = 0
     const embed = new MessageEmbed()
      .setTitle(`User Warnings:`)
      .setColor("GREEN")
      .setDescription(`All warnings of these users was deleted:`)
    data.map((d) => {
          d.content.map((w, i) => warnings = warnings + i)
          d.delete()
          embed.addField(`User`, `${message.guild.members.cache.get(d.user).user.tag}`)
})
message.channel.send(embed)
})
  }
}