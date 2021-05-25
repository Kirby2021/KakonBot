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
    name: 'mute',
    usage: '[Member] [Reason]',
    timeout: '4000',
    description: 'Mute a member (Permantly)',
    aliases: ['m'],
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
            .setDescription(`**${error} I don't have permission to mute member**`)
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
        .setDescription(`**${error} You need to mention member to mute. Like \`${prefix}mute 806768080331210803 Advertising\`**`)
        )
        if(member.user.id === message.author.id) return message.channel.send(`${error} You cannot mute yourself`);
      schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(!data) {
              message.channel.send(new MessageEmbed().setTitle(`Error`).setColor("RED").setDescription(`${error} No Muted Role set. Set it using \`${prefix}muterole set [Role]\``))
          } else {
              const roleD = message.guild.roles.cache.find(role => role.id === data.Role)
              if(!roleD) {
                message.channel.send(new MessageEmbed().setTitle(`Error`).setColor("RED").setDescription(`${error} Muted Role deleted. Set it again using \`${prefix}muterole set [Role]\``))
                return data.delete()
              }
              if(member.roles.cache.get(roleD.id)) return message.channel.send(new MessageEmbed()
        .setDescription(`**${error} ${member.user.username} was muted already. So I cannot mute them again**`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    )
    if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed()
    .setDescription(`**${error} You can't mute that user**`)
    .setColor("RED")
    .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
    )
    if(roleD.deleteable) return message.channel.send(new MessageEmbed()
    .setDescription(`**${error} I can't add muted role manual**`)
    .setColor("RED")
    .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
)
await member.roles.add(roleD.id)
   message.channel.send(new MessageEmbed().setDescription(`**${success} \`${member.user.tag}\` was muted by \`${message.author.tag}\` with reason \`${reason}\`**`).setColor("GREEN"))
    .catch(err => {
      console.log(err)
      message.channel.send(`**${error} An error occured when I'm trying to mute that user**`)
    })
    client.modlogs({
      Member: member,
      Action: "Mute",
      Color: "ORANGE",
      Reason: reason
    }, message)
    member.send(new MessageEmbed()
          .setTitle(`Kakon Moderation`)
          .addField(`Muted User:`, `${member.user.tag} (You)`,true)
          .addField(`Action By:`,message.author.tag,true)
          .addField(`Muted At:`,message.guild.name,true)
          )
          }
      })
}
}