const schema = require('../../models/only')

module.exports = {
   name : 'lock-only',
    usage: '[#Channel]',
    description: 'Allow the bot can only use at a channel',
    category: 'setup',
    aliases: ['loc'],
    timeout: '10000',
    requirePermission: 'Manage Server',
  run: async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`Only Moderator can use this command`)
    const channel = await message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    await schema.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(!data) {
      if(!channel) return message.channel.send(`You need to mentions channel want lock bot`)
      data = new schema({
        Guild: message.guild.id,
        Channel: channel.id
      })
      await data.save()
      message.channel.send(`Now, the bot can only use at <#${channel.id}>`)
    } else {
      message.channel.send(`Before set new channel, you must run unlock-only command !`)
    }
    })
  }
}