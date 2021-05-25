const Discord = require('discord.js')
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

module.exports = {
    name: 'slowmode',
    aliases: ['sm'],
    timeout: '1000',
    description: "Changes the slowmode of a channel",
    category: 'moderation',
    usage: '[Time (Seconds)]',
    requirePermission: 'Manage Messages or Manage Channels',
    run: async(client, message, args) => {
      const prefix = await client.prefix(message)
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS","MANAGE_MESSAGES")) return message.channel.send(new MessageEmbed()
        .setDescription(`**${error} I don't have permission to change slowmode**`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    )
    if(!message.member.hasPermission("MANAGE_CHANNELS","MANAGE_MESSAGES")) return message.channel.send(new MessageEmbed()
        .setDescription(`**${error} You don't have permission to use this command**`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    )
    const time = args[0]
    if(!time) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`**${error} You need to provide slowmode to change. Type \`\`${prefix}help slowmode\`\` for more usage**`)
    .setColor("RED")
    .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      ))
    if(time == 'none') {
        await message.channel.setRateLimitPerUser(0)
        await message.channel.send(new Discord.MessageEmbed()
        .setDescription(`**${success} Changed slowmode to \`0\` seconds**`)
        .setColor("GREEN")
          )
    } else {
        if(!Number(time)) return message.channel.send(`${error} Time must be a number. To remove slowmode, type \`${prefix}slowmode none\``)
        if(time > 21600) return message.channel.send(`${error} Time can't be more than \`21600\` seconds`)
        await message.channel.setRateLimitPerUser(time)
        await message.channel.send(new Discord.MessageEmbed()
        .setDescription(`**${success} Changed slowmode to \`${time}\` seconds**`)
        .setColor("GREEN")
        )
    }
    }
}