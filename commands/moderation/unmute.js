const { MessageEmbed } = require("discord.js")
const client = require('../../index')
const { success, error } = require('../../config.json')
client.prefix = async function(message) {
  let custom;

  const data = await prefixSchema.findOne({ Guild : message.guild.id })
  
  if(data) {
      custom = data.Prefix;
  } else {
      custom = prefix;
  }
  return custom;
}
const schema = require('../../models/mutes')

module.exports = {
    name: 'unmute',
    usage: '[Member] [Reason]',
    timeout: '4000',
    description: 'Unmute a member (Permantly)',
    aliases: ['unm','unhm','unhardmute','unmu'],
    requirePermission: 'Manage Messages',
    run : async(client, message, args) => {
      const prefix = await client.prefix(message)
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new MessageEmbed()
            .setDescription(`**${error} You don't have permission to use this command**`)
            .setColor("RED")
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
        )
        if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new MessageEmbed()
            .setDescription(`**${error} I don't have permission to unmute member**`)
            .setColor("RED")
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
        )
        const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = args.slice(1).join(" ") || "No reason was provided"
        if(!member) return message.channel.send(new MessageEmbed()
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
        .setColor("RED")
        .setDescription(`**${error} You need to mention member to unmute. Like \`${prefix}mute 806768080331210803 Advertising\`**`)
        )
        if(member.user.id === message.author.id) return message.channel.send(`${error} You cannot unmute yourself`);
      schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(!data) {
              message.channel.send(new MessageEmbed().setTitle(`Error`).setColor("RED").setDescription(`${error} No Muted Role set. Set it using \`${prefix}muterole set [Role]\``))
          } else {
              const roleD = message.guild.roles.cache.find(role => role.id === data.Role)
              if(!roleD) {
                message.channel.send(new MessageEmbed().setTitle(`Error`).setColor("RED").setDescription(`${error} Muted Role is deleted. Set it again using \`${prefix}muterole set [Role]\``))
                return data.delete()
              }
              if(!member.roles.cache.get(roleD.id)) return message.channel.send(new MessageEmbed()
        .setDescription(`**${error} ${member.user.username} was unmuted already. So I cannot unmute them again**`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    )
    if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed()
    .setDescription(`**${error} You can't unmute that user**`)
    .setColor("RED")
    .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
    )
    if(roleD.deleteable) return message.channel.send(new MessageEmbed()
    .setDescription(`**${error} I can't remove muted role manual**`)
    .setColor("RED")
    .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
)
await member.roles.remove(roleD.id)
   message.channel.send(new MessageEmbed().setDescription(`**${success} \`${member.user.tag}\` was unmuted by \`${message.author.tag}\` with reason \`${reason}\`**`).setColor("GREEN"))
    .catch(err => {
      console.log(err)
      message.channel.send(`**${error} An error occured when I'm trying to unmute that user**`)
    })
    client.modlogs({
      Member: member,
      Action: "Unmute",
      Color: "GREEN",
      Reason: reason
    }, message)
    member.send(new MessageEmbed()
          .setTitle(`Kakon Moderation`)
          .addField(`Unmuted User:`, `${member.user.tag} (You)`,true)
          .addField(`Action By:`,message.author.tag,true)
          .addField(`Muted At:`,message.guild.name,true)
          )
          }
      })
}
}