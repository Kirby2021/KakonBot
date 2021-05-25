const Schema = require('../../models/ghostping')

module.exports = {
  name: 'enable-ghostping',
  description: "Enable Anti Ghost Ping Module",
  aliases: ['egp'],
  timeout: '10000',
  requirePermission: "Manage Server",
  run: async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You don't have permission to use this command`)
    if(!message.channel.permissionsFor(message.guild.me).has(["SEND_MESSAGES"])) return message.member.send(`:x: Cancelled the command. Reason: Require \`Send Messages\` permission !`)
    Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(data) return message.channel.send(`:x: Anti Ghost Ping Module is enabled already`)
      new Schema({
        Guild: message.guild.id
      }).save()
      message.channel.send(`Anti Ghost Ping Module has been enabled.`)
    })
  }
}