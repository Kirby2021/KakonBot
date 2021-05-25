const { MessageEmbed } = require('discord.js')
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

module.exports = {
    name: 'force-nick',
    description: 'Force Nick of a member',
    aliases: ['nick','n','fn'],
    category: 'moderation',
    timeout: '2000',
    usage: '[@Member] [Name]',
    requirePermission: 'Manage Nicknames',
    run: async(client, message, args) => {
        const prefix = await client.prefix(message)
        if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send(`${error} You don't have permission to use this command`)
        if(!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.channel.send(`${error} I don't have permission to change nickname for a member`)
        const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.channel.send(new MessageEmbed()
            .setDescription(`**${error} Oops ! You need to mention the user to force nick. Like \`${prefix}force-nick 806768080331210803 Administrator | NiceDD\`**`)
            .setColor("RED")
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
            )
        )
        const nickName = args.slice(1).join(" ")
        if(!nickName) return message.channel.send(new MessageEmbed()
            .setDescription(`**${error} Oops ! You need to provide new nickname to change. Like \`${prefix}force-nick 806768080331210803 Administrator | NiceDD\`**`)
            .setColor("RED")
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
            )
        )
    if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed()
    .setDescription(`**${error} Oops ! ${member.user.tag} is higher than you !**`)
    .setColor("RED")
    .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
    )
    if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed()
    .setDescription(`**${error} Oops ! ${member.user.tag} is higher than me !**`)
    .setColor("RED")
    .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
    )
    try{
        await member.setNickname(nickName)
          await message.channel.send(new MessageEmbed()
          .setDescription(`**${success} ${member.user.tag} 's nickname was changed to \`${nickName}\`**`).setColor("GREEN")
          )
      }catch(err){
          console.log(err)
          return message.channel.send(new MessageEmbed()
              .setDescription(`**${error} Oops !! There was an error when I'm trying to nick that user !!**`)
              .setColor("RED")
              .setFooter(
                  `Requested by ${message.author.tag}`,
                  message.author.displayAvatarURL({ dynamic: true })
                )
          )
      }
    }
}