const { MessageEmbed } = require('discord.js')
const schema = require('../../models/spam')
const { success, error } = require('../../config.json')

module.exports = {
  name: 'antispam-disable',
  description: "Disables Anti Spam module",
  aliases: [],
  timeout: 0,
  run: async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`${error} You can't use this command`)
    const action = args[0]; const messages = parseInt(args[1])
    await schema.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(!data) return message.channel.send(`${error} This server isn't enabled Anti Spam Module`)
      data.delete()
      message.channel.send(new MessageEmbed().setTitle(`Anti Spam Disabled`).setThumbnail(message.guild.iconURL({ dynamci: true })).setColor("RANDOM"))
    })
  }
}