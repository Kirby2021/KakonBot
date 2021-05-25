const { MessageEmbed } = require('discord.js')
const schema = require('../../models/spam')
const { success, error } = require('../../config.json')

module.exports = {
  name: 'antispam-enable',
  description: "Enables Anti Spam module",
  aliases: [],
  timeout: 0,
  run: async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`${error} You can't use this command`)
    const action = args[0]; const messages = parseInt(args[1])
    if(!action) return message.channel.send(`${error} You need provide action for spam. \`warn\` to warn a member ; \`mute\` to mute a member ; \`ban\` to ban a member ; \`kick\` to kick a member ; \`unmute\` to unmute a member`)
    if(!messages) return message.channel.send(`${error} You need provide correct messages to anti-spam`)
    if(!(["warn","mute","kick","ban","unmute"]).includes(action.toLowerCase())) return message.channel.send(`${error} You need provide correct action for spam. \`warn\` to warn a member ; \`mute\` to mute a member ; \`ban\` to ban a member ; \`kick\` to kick a member ; \`unmute\` to unmute a member`)
    if(messages <= 2) return message.channel.send(`${error} Messages can't be equal or below **2** messages`)
    await schema.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(data) data.delete()
      let newData = new schema({
        Guild: message.guild.id,
        Action: action.toLowerCase(),
        Messages: messages
      }).save()
      message.channel.send(new MessageEmbed().setTitle(`Anti Spam Enabled`).setDescription(`**Messages: ${messages}\nAction: ${action.toUpperCase()}**`).setColor("RANDOM").setThumbnail(message.guild.iconURL({ dynamci: true })))
    })
  }
}