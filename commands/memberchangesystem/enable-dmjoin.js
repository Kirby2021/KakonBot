const schema = require('../../models/dm')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'enable-dmjoin',
  aliases: ['edmj'],
  usage: '[Message]',
  timeout: '2000',
  description: "Sets Welcome Message on DMs",
  run: async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You can't use this command`)
    const text = args.join(" ")
    if(!text) return message.channel.send(new MessageEmbed()
      .setTitle(`Valuable`)
      .setDescription(`** {user} : <@New-Member> \n {server} : Server Name \n {user.tag} : New-Member-Tag \n {user.id} : New-Member-ID \n {members} : Total Members **`)
      .setFooter(`Update Soon`)
      .setColor("RANDOM")
    )
    schema.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(err) throw err;
      if(data) data.delete()
      new schema({
        Guild: message.guild.id,
        Text: text
      }).save()
      const user = text.replace(/{user}/,`<@${message.author.id}>`).replace(/{server}/,message.guild.name).replace(/{user.tag}/,message.author.tag).replace(/{user.id}/, message.author.id).replace(/{members}/,message.guild.memberCount)
      message.member.send(user).catch(err => {
        message.channel.send(`Your DMs is off. So I can't DM you`)
      })
    })
  }
}