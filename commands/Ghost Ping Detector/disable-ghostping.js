const Schema = require('../../models/ghostping')

module.exports = {
  name: 'disable-ghostping',
  description: "Disable Anti Ghost Ping Module",
  aliases: ['dgp'],
  timeout: '10000',
  requirePermission: "Manage Server",
  run: async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You don't have permission to use this command`)
    if(!message.channel.permissionsFor(message.guild.me).has(["SEND_MESSAGES"])) return message.member.send(`:x: Cancelled the command. Reason: Require \`Send Messages\` permission !`)
    Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(!data) return message.channel.send(`:x: Anti Ghost Ping Module is disabled already`)
      data.delete()
      message.channel.send(`Anti Ghost Ping Module has been disabled. To enable Anti Ghost Ping Module, run \`enable-ghotstping\` command (includes server prefix)`)
    })
  }
}