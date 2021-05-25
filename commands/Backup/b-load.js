const backup = require('discord-backup')
const { MessageEmbed } = require('discord.js')
const { success, error } = require('../../config.json')

module.exports = {
  name: 'b-load',
  description: "Load a backup",
  timeout: '20000',
  requirePermission: "Bot + User : Administrator",
  aliases: ['b-loa'],
  usage: '[Backup ID]',
  run: async(client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**${error} You must be an Admin to use this command**`)
    if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`**${error} I must be an Admin to create a backup**`)
    const id = args[0]
    if(!id) return message.chanel.send(`**${error} You must provide Backup ID to load**`)
    const msg = await message.channel.send(`**Loading Backup...**`)
    try {
       backup.load(id, message.guild)
    }catch(err) {
      msg.delete()
      message.channel.send(`**${error} An error occured when I'm trying to load backup. Make sure I have enough permission and the Backup ID is correct**`)
    }
  }
}
