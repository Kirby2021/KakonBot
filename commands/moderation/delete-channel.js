const { MessageEmbed }  = require('discord.js')
const client = require('../../index')
const { success , error } = require('../../config.json')
module.exports = {
    name : 'delete-channel',
    aliases : ['dc'],
    timeout: '4000',
    description : 'Delete a channel',
    category: 'moderation',
    usage: '<#Channel>',
    requirePermission: 'Manage Channels',
    run : async(client, message, args) => {
      const prefix = await client.prefix(message)
      if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(new MessageEmbed()
        .setDescription(`**${error} I don't have permission to delete channel**`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    )
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(new MessageEmbed()
        .setDescription(`**${error} You don't have permission to use this command**`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    )
    const channel = await message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel
      try {
        await channel.delete(`By: ${message.author.tag}`)
        message.channel.send(`**${success} Deleted channel: ${channel.name}**`)
      } catch (err) {
        console.log(err);
        message.channel.send(new Discord.MessageEmbed()
          .setDescription(`**${error} I cannot delete channel: ${channel}**`)
          .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setColor("RED")
        )
      }
    }
  }