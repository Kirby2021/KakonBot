const schema = require('../../models/only')

module.exports = {
  name: 'unlock-only',
  description: "Allow the bot can use at all channels",
  aliases: ['uloc'],
  timeout: '10000',
  run: async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`Only Moderator can use this command`)
    await schema.findOneAndDelete({ Guild: message.guild.id })
    await message.channel.send(`Now, the bot can use at all channels !`)
  }
}