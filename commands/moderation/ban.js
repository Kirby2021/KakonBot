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
    name : 'ban',
    category : 'moderation',
    aliases: ['b'],
    timeout: '4000',
    description : 'Bans a member from the server',
    usage: '[Member] [Reason]',
    requirePermission: 'Ban Members',

    run : async(client, message, args) => {
      const prefix = await client.prefix(message)
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(new MessageEmbed()
        .setDescription(`**${error} I need \`BAN_MEMBERS\` permission to ban the user**`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    )
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(new MessageEmbed()
        .setDescription(`**${error} You need \`BAN_MEMBERS\` permission to ban the user**`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    )
    const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send(new MessageEmbed()
        .setDescription(`**${error} Oops ! You need to mention the user to ban. Like: \`${prefix}ban 155149108183695360 Advertising\`**`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    )
    if(member.user.id === message.author.id) return message.channel.send(new MessageEmbed()
        .setDescription(`**Do you want ban yourself ?**`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    );
    if(member.user.id == message.guild.owner.id) return message.channel.send(`  `)
    const reason = args.slice(1).join(" ") || 'No reason was provided'
    if(!member.bannable) return message.channel.send(new MessageEmbed()
        .setDescription(`**${error} Hmm... Please check my role order and permission before run the ban on this user !**`)
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
    try{
        await member.ban({
            reason: `Kakon Moderation - Ban Command - Action By: ${message.author.tag}`
        })
      message.channel.send(new MessageEmbed().setDescription(`**${success} ${member.user.tag} was banned with reason \`${reason}\`**`).setColor("GREEN"))
    }catch(err){
        console.log(err)
        return message.channel.send(new MessageEmbed()
            .setDescription(`**${error} Oops !! There was an error when I'm trying to ban that user !!**`)
            .setColor("RED")
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
        )
    }
    client.modlogs({
      Member: member,
      Action: "Ban",
      Color: "RED",
      Reason: reason
    }, message)
    member.send(new MessageEmbed()
            .setDescription(`**CAUTION: YOU WERE BANNED FROM \`${message.guild.name}\` WITH REASON: \`${reason}\`. ACTION BY: \`${message.author.username}#null\`**`)
            .setColor("YELLOW")
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
        )
  }
    }