const { MessageEmbed } = require('discord.js')
const { error , success } = require('../../config.json')

module.exports = {
    name: 'lockdown',
    description:  'Lockdown all channels and voice',
    aliases: ['ld'],
    category: 'moderation',
    timeout: '10000',
    requirePermission: 'User: Manage Channels and Manage Messages | Bot: Administrator',
    usage: '[on/off]',
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS","MANAGE_MESSAGES")) return message.channel.send(`**${error} You don't have permission to lock server**`)
        if(!message.guild.me.hasPermission("ADMINISTRATOR"))return message.channel.send(`**${error} I must to be an Administrator to lockdown the server**`)
        if(!args[0]) return message.channel.send(`**${error} Oops ! You need to provide query. \`on\` for enable lockdown, \`off\` for disable lockdown**`)
        if(!(['on','off']).includes(args[0])) return message.channel.send(`**${error} Oops ! You need to provide correct query. \`on\` for enable lockdown, \`off\` for disable lockdown**`)
        const roleD = message.guild.roles.cache.find(role => role.name == '@everyone')
        if(args[0] == 'on') {
        const roleC = message.member.roles.highest.id
        const role = message.guild.roles.cache.get(roleC)
        message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
            await channel.updateOverwrite(roleD, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            })
            await channel.updateOverwrite(role, {
              SEND_MESSAGES: true,
              ADD_REACTIONS: true
            })
        });
        message.guild.channels.cache.filter(c => c.type === 'voice').forEach(async (channel, id) => {
            await channel.updateOverwrite(client.user, {
                CONNECT: true,
            })
            await channel.updateOverwrite(roleD, {
                CONNECT: false
            })
            await channel.createOverwrite(role, {
              CONNECT: true,
            })
        });
        message.channel.send(new MessageEmbed()
          .setDescription(`**${success} \`${message.author.tag}\` locked down the server**`)
          .setColor("GREEN")
        )
      } else if(args[0] == 'off') { 
      message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
          await channel.updateOverwrite(roleD, {
            SEND_MESSAGES: null,
          })
      });
      message.guild.channels.cache.filter(c => c.type === 'voice').forEach(async (channel, id) => {
          await channel.updateOverwrite(roleD, {
              CONNECT: null
          })
      });
      message.guild.channels.cache.filter(c => c.type === 'news').forEach(async (channel, id) => {
          await channel.updateOverwrite(roleD, {
              SEND_MESSAGES: false
          })
      });
      if(message.guild.rulesChannel) {
        await message.guild.rulesChannel.updateOverwrite(roleD, {
              SEND_MESSAGES: false
          })
      }
       message.channel.send(new MessageEmbed()
          .setDescription(`**${success} \`${message.author.tag}\` unlocked the server**`)
          .setColor("GREEN")
       )
    }
    }
}