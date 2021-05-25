const backup = require('discord-backup')
const { MessageEmbed } = require('discord.js')
const { success, error } = require('../../config.json')

module.exports = {
  name: 'b-create',
  description: "Create a backup",
  timeout: '20000',
  requirePermission: "Bot + User : Administrator",
  aliases: ['b-crea'],
  run: async(client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**${error} You must be an Admin to use this command**`)
    if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`**${error} I must be an Admin to create a backup**`)
    const msg = await message.channel.send(`**Creating Backup...**`)
    try {
      backup
          .create(message.guild, {
            jsonSave: true,
            jsonBeautify: true,
          }).then(b => {
            msg.delete()
            message.channel.send(new MessageEmbed().setDescription(`**${success} Backup Created: \`${b.id}\`. Make sure to remember this code**`).setColor("GREEN"))
          })
    }catch(err) {
      msg.delete()
      message.channel.send(`**${error} An error occured when I'm trying to create a backup. Please check my permission first**`)
    }
  }
}