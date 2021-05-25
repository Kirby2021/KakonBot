const schema = require('../../models/leave-message')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'enable-leavemessage',
  aliases: ['elml'],
  usage: '[Channel] [Message]',
  timeout: '2000',
  description: "Sets Leave Message",
  run: async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You can't use this command`)
    const channel = await message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    const text = args.slice(1).join(" ")
    if(!channel) return message.channel.send(`Incorrect Usage ! \`[Channel] [Message]\``)
    if(!text) return message.channel.send(new MessageEmbed()
      .setTitle(`Valuable`)
      .setDescription(`** {user} : <@Member> \n {server} : Server Name \n {user.tag} : Member-Tag \n {user.id} : Member-ID \n {members} : Total Members **`)
      .setFooter(`Update Soon`)
      .setColor("RANDOM")
    )
    if(!channel.permissionsFor(message.member).has(["VIEW_CHANNEL"])) return message.channel.send(`You need permission to view that channel`)
    if(!channel.permissionsFor(message.guild.me).has(["VIEW_CHANNEL", "SEND_MESSAGES"])) return message.channel.send(`I need permission to view that channel, send messages to that channel`)
    schema.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(err) throw err;
      if(data) data.delete()
      new schema({
        Guild: message.guild.id,
        Channel: channel.id,
        Text: text
      }).save()
      const user = text.replace(/{user}/,`<@${message.author.id}>`).replace(/{server}/,message.guild.name).replace(/{user.tag}/,message.author.tag).replace(/{user.id}/, message.author.id).replace(/{members}/,message.guild.memberCount)
      channel.send(user)
    })
  }
}