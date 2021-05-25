const { MessageEmbed } = require("discord.js")
const client = require('../../index')
const { success , error } = require('../../config.json')
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
    name: 'hard-mute',
    usage: '[Member] [Reason]',
    timeout: '4000',
    description: 'Hard Mute a member (Permantly) (This Command will remove all roles of a member)',
    aliases: ['m','hm'],
    requirePermission: 'Manage Messages',
    run : async(client, message, args) => {
      const prefix = await client.prefix(message)
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new MessageEmbed()
            .setDescription("**You don't have permission to use this command**")
            .setColor("RED")
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
        )
        if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new MessageEmbed()
            .setDescription("**I don't have permission to mute member**")
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
        .setDescription(`**Oops ! You need to mention the user to hard mute. Like: \`${prefix}hard-mute 806768080331210803 Advertising\`**`)
        )
        if(member.user.id === message.author.id) return message.channel.send(new MessageEmbed()
        .setDescription(`**Do you want hard mute yourself ?**`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    );
      schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(!data) {
              message.channel.send(`Oops ! There is no muted role. Set it using \`${prefix}muterole\``)
          } else {
              const roleD = message.guild.roles.cache.find(role => role.id === data.Role)
              if(!roleD) return message.channel.send(`Oops ! Muted role is delete. Set it using \`${prefix}muterole\``)
              if(member.roles.cache.get(roleD.id)) return message.channel.send(new MessageEmbed()
        .setDescription(`**${member.user.username} was muted already.**`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    )
    if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed()
    .setDescription(`**Oops ! You can't mute that user**`)
    .setColor("RED")
    .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
    )
    if(roleD.deleteable) return message.channel.send(new MessageEmbed()
    .setDescription(`**Oops ! I can't add muted role manual**`)
    .setColor("RED")
    .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
)
await member.roles.set([])
await member.roles.add(roleD, `Kakon Moderation - Hard Mute Command - Action By: ${message.author.tag}`)
        await message.channel.send(new MessageEmbed()
        .setDescription(`**Member Hard Muted**`)
        .addField(`Information`, [
          `Hard Muted User: **${member.user.tag}**`,
          `Action By: **${message.author.tag}**`,
          `With Reason: ${reason}`
        ])
        .setColor("GREEN")
        )
    .catch(err => {
      console.log(err)
      return message.channel.send(new MessageEmbed()
            .setDescription(`**Oops !! There was an error when I'm trying to muting that user !!**`)
            .setColor("RED")
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
        )
    })
    client.modlogs({
      Member: member,
      Action: "Hard-Mute",
      Color: "ORANGE",
      Reason: reason
    }, message)
    member.send(new MessageEmbed()
          .setTitle(`Kakon Moderation`)
          .addField(`Hard Muted User:`, `${member.user.tag} (You)`,true)
          .addField(`Action By:`,message.author.tag,true)
          .addField(`Hard Muted At:`,message.guild.name,true)
          )
          }
      })
}
}