const { MessageEmbed } = require('discord.js')
const schema = require('../../models/alt.js')

module.exports = {
  name: 'disable-alt',
  description: "Disable Alt Identifier Module",
  aliases: ['dalt'],
  timeout: '10000',
  requirePermission: "Administrator",
  run: async(client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`You need Admin permission to use this command`);
    if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`I need Admin permission to run Alt Identifier Module`);
    schema.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(!data) return message.channel.send(`:x: Alt Identifier Module is disabled already`) 
      data.delete()
      message.channel.send(`Disabled Alt Identifier Module .`)
      })
    }
}