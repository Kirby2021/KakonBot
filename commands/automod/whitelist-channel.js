const schema = require('../../models/white-list-word')
const { MessageEmbed } = require('discord.js')
const { success, error } = require('../../config.json')

module.exports = {
  name: 'anti-blacklist-word',
  description: 'Anti Channel from Blacklisted Word (WhiteList Channel)',
  usage: '[add/remove/display] <Channel (only  required for add/remove option)>',
  timeout: '2000',
  aliases: ['whitelistblacklist','whilbl','wlbl'],
  run: async(client, message,args) => {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`${error} You can't use this command`)
    const query = args[0]
    if(!query) return message.channel.send(`${error} You need to provide query. \`add\` to add channel ; \`remove\` to remove channel ; \`display\` list all channels`)
    if(!(["add","remove","display"]).includes(query.toLowerCase())) return message.channel.send(`${error} You need to provide query. \`add\` to add channel ; \`remove\` to remove channel ; \`display\` list all channels`)
    const guild = { Guild: message.guild.id }
    if(query.toLowerCase() == 'add') {
      const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
      schema.findOne(guild, async(err,data) => {
        if(err) throw err;
        if(data) {
          if(data.Channel.includes(channel.id)) return message.channel.send(`${error} ${channel} is already exist in whitelisted channel`)
          data.Channel.push(channel.id)
          data.save()
          message.channel.send(new MessageEmbed().setDescription(`**${success} ${channel} has been added to whitelisted channel**`).setColor("GREEN"))
        } else {
          new schema({
            Guild: message.guild.id,
            Channel: channel.id
          }).save();
          message.channel.send(new MessageEmbed().setDescription(`**${success} ${channel} has been added to whitelisted channel**`).setColor("GREEN"))
        }
      })
    } else if(query.toLowerCase() == 'remove') {
      const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
      schema.findOne(guild, async(err,data) => {
        if(err) throw err;
        if(!data) return message.channel.send(`**${error} There is no channel in whitelisted channel**`)
        if(!data.Channel.includes(channel.id)) return message.channel.send(`**${error} ${channel} is not a whitelisted channel**`)
        const filtered = data.Channel.filter(target => target !== channel.id);
        await schema.findOneAndUpdate(guild, {
          Guild: message.guild.id,
          Channel: filtered
        })
      message.channel.send(new MessageEmbed().setDescription(`**${success} ${channel} has been removed from whitelisted channel**`).setColor("GREEN"))
      })
    } else if(query.toLowerCase() == 'display') {
      schema.findOne(guild, async(err,data) => {
        if(err) throw err;
        if(!data) return message.channel.send(`**${error} There is no channel in whitelisted channel**`)
        message.channel.send(new MessageEmbed()
            .setTitle(`Whitelisted Channels`)
            .setDescription(`<#${data.Channel.join(`> <#`) || `**${error} There is no channel in whitelisted channel**`}>`)
            .setColor("RANDOM")
        )
      })
    }
  }
}