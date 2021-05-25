const { MessageEmbed, DiscordAPIError } = require('discord.js');
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
    name : 'kick',
    category : 'moderation',
    aliases: ['k'],
    timeout: '4000',
    description : 'Kicks a member from the server',
    usage: '[Member] [Reason]',
    requirePermission: 'Kick Members',

    run : async(client, message, args) => {
      const prefix = await client.prefix(message)
    if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(new MessageEmbed()
        .setDescription("**I require `KICK_MEMBERS` permission to kick the user**")
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    )
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(new MessageEmbed()
        .setDescription("**You need `KICK_MEMBERS` permission to kick the user**")
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    )
    const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send(new MessageEmbed()
        .setDescription(`**Oops ! You need to mention the user to kick. Like: \`${prefix}kick NiceDD#3360 Advertising\`**`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    )
    if(member.user.id === message.author.id) return message.channel.send(new MessageEmbed()
        .setDescription(`**Do you want kick yourself ?**`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    );
    const reason = args.slice(1).join(" ") || 'No reason was provided'
    if(!member.kickable) return message.channel.send(new MessageEmbed()
        .setDescription(`**Hmm... Please check my role order and permission before run the kick on this user !**`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    )
    if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed()
    .setDescription(`**Oops ! ${member.user.tag} is higher than you !**`)
    .setColor("RED")
    .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
    )
    try{
          await member.kick(`Kakon Moderation - Kick Command - Action By: ${message.author.tag}`)
        await message.channel.send(new MessageEmbed()
        .setDescription(`**Member Kicked**`)
        .addField(`Information`, [
          `Kicked User: **${member.user.tag}**`,
          `Action By: **${message.author.tag}**`,
          `With Reason: ${reason}`
        ])
        .setColor("GREEN")
        )
    }catch(err){
        console.log(err)
        return message.channel.send(new MessageEmbed()
            .setDescription(`**Oops !! There was an error when I'm trying to kick that user !!**`)
            .setColor("RED")
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
        )
    }
client.modlogs({
      Member: member,
      Action: "Kick",
      Color: "RED",
      Reason: reason
    }, message)
    member.send(new MessageEmbed()
          .setTitle(`Kakon Moderation`)
          .addField(`Kicked User:`, `${member.user.tag} (You)`,true)
          .addField(`Action By:`,message.author.tag,true)
          .addField(`Kicked From:`,message.guild.name,true)
          )
  }
}