const { MessageEmbed } = require("discord.js")
const client = require('../../index')
const schema = require('../../models/mutes')
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
const ms = require('ms')

module.exports = {
    name: 'tempmute',
    usage: '[Member] [Time] <Reason>',
    timeout: '4000',
    description: 'Tempmute a member (Permantly)',
    aliases: ['tm'],
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
        if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(new MessageEmbed()
            .setDescription("**I don't have permission to mute member**")
            .setColor("RED")
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
        )
        const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const time = args[1]
        const reason = args.slice(2).join(" ") || "No reason was provided"
        if(!member) return message.channel.send(new MessageEmbed()
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
        .setColor("RED")
        .setDescription(`**Incorrect Usage. Type \`\`${prefix}help tempmute\`\` for more usage**`)
        )
        if(member.user.id === message.author.id) return message.channel.send(`You cannot mute yourself`);
        if(!time) return message.channel.send(new MessageEmbed()
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
        .setColor("RED")
        .setDescription(`**Incorrect Usage. Type \`\`${prefix}help tempmute\`\` for more usage**`)
        )
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            const roleD = message.guild.roles.cache.find(role => role.id === data.Role)
            if(!data) {
                message.channel.send(`No Muted role found ! Ask Staff for set muted role`)
            } else {
                if(!roleD) return message.channel.send(`The Muted Role for this server was deleted. Ask Staff for set muted role again`)
                if(member.roles.cache.get(roleD.id)) return message.channel.send(new MessageEmbed()
          .setDescription(`**${member.user.username} was muted already. So I cannot mute them again**`)
          .setColor("RED")
          .setFooter(
              `Requested by ${message.author.tag}`,
              message.author.displayAvatarURL({ dynamic: true })
            )
      )
      if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed()
      .setDescription(`**Mentioned member's highest role is above or equals your highest role**`)
      .setColor("RED")
      .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
      )
      if(roleD.position >= message.guild.me.roles.highest.position) return message.channel.send(new MessageEmbed()
      .setDescription(`**Muted role position is above or equals my highest role**`)
      .setColor("RED")
      .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
  )
  await member.roles.add(roleD.id)
      message.channel.send(new MessageEmbed()
          .setDescription(`**Done. ${member.user.username} was muted || Reason: ${reason} | Time: ${time}**`)
          .setColor("GREEN")
          .setFooter(
              `Requested by ${message.author.tag}`,
              message.author.displayAvatarURL({ dynamic: true })
            )
      )
      .catch(err => console.log(err))
      client.modlogs({
        Member: member,
        Action: "Tempmute",
        Color: "ORANGE",
        Reason: reason
      }, message)
  member.send(new MessageEmbed()
  .setDescription(`**You were muted from ${message.guild.name} with reason: ${reason} || Duration: ${time}**`)
  .setColor("YELLOW")
  .setFooter(
      `Requested by ${message.author.tag}`,
      message.author.displayAvatarURL({ dynamic: true })
    )
)
            }
    setTimeout(async function () {
    await member.roles.remove(roleD.id)
    message.channel.send(new MessageEmbed()
        .setDescription(`**Done. ${member.user.username} was unmuted || Reason: Mute Duration was expired**`)
        .setColor("GREEN")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    )
    }, ms(time))
})
}
}