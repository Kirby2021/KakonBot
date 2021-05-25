const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const client = require('../../index')
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
    name: "serverinfo",
    description: "Shows info of server",
    timeout: "1000",
    aliases: ['si'],
    run: async(client, message, args) => {
        const p = await client.prefix(message)
        const embed = new MessageEmbed()
            .setTitle(`Server Info`)
            .setColor("RANDOM")
            .addField(`General Information`, [
                `ID: ${message.guild.id}`,
                `Name: ${message.guild.name}`,
                `Owner: <@${message.guild.ownerID}>`,
            ])
            .addField(`Server Counts`, [
                `Roles: ${message.guild.roles.cache.size - 1} roles | ${message.guild.roles.cache.map(role => role.toString()).join(" , ") || "Cannot list all here"}`,
                `Emojis: ${message.guild.emojis.cache.size} emojis | Regular: ${message.guild.emojis.cache.filter(e => !e.animated).size} , Animated: ${message.guild.emojis.cache.filter(e => e.animated).size}`,
                `Channels: ${message.guild.channels.cache.filter(c => c.type == 'text').size} Text Channels , ${message.guild.channels.cache.filter(c => c.type == 'voice').size} Voice Channels , ${message.guild.channels.cache.filter(c => c.type == 'news').size} Announcement Channels`
            ])
            .addField(`Additional Information`, [
                `Created: ${moment(message.guild.createdTimestamp).format(
                    "LT"
                )} ${moment(message.guild.createdTimestamp).format(
                    "LL"
                )}  ${moment(message.guild.createdTimestamp).fromNow()}`,
                `Region: ${message.guild.region}`,
                `Vanity URL Code: ${message.guild.vanityURLCode || `No Vanity`}`,
                `Boosts Tier: ${
                    message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : "None"
                }`,
                `Boosts Counts: ${
                    message.guild.premiumSubscriptionCount ? `Count ${message.guild.premiumSubscriptionCount}` : "0"
                } boost(s)`,
                `Verification Level: ${message.guild.verificationLevel}`,
                `Verified: ${message.guild.verified}`,
                `Prefix: ${p}`,
            ])
            .setThumbnail(message.guild.iconURL({dynamic: true}))
        message.channel.send(embed)
          .catch(err => {
            const embed1 = new MessageEmbed()
            .setTitle(`Server Info`)
            .setColor("RANDOM")
            .addField(`General Information`, [
                `ID: ${message.guild.id}`,
                `Name: ${message.guild.name}`,
                `Owner: <@${message.guild.ownerID}>`,
            ])
            .addField(`Server Counts`, [
                `Roles: ${message.guild.roles.cache.size - 1} roles | Cannot list all here`,
                `Emojis: ${message.guild.emojis.cache.size} emojis | Regular: ${message.guild.emojis.cache.filter(e => !e.animated).size} , Animated: ${message.guild.emojis.cache.filter(e => e.animated).size}`,
                `Channels: ${message.guild.channels.cache.filter(c => c.type == 'text').size} Text Channels , ${message.guild.channels.cache.filter(c => c.type == 'voice').size} Voice Channels , ${message.guild.channels.cache.filter(c => c.type == 'news').size} Announcement Channels`
            ])
            .addField(`Additional Information`, [
                `Created: ${moment(message.guild.createdTimestamp).format(
                    "LT"
                )} ${moment(message.guild.createdTimestamp).format(
                    "LL"
                )}  ${moment(message.guild.createdTimestamp).fromNow()}`,
                `Region: ${message.guild.region}`,
                `Vanity URL Code: ${message.guild.vanityURLCode || `No Vanity`}`,
                `Boosts Tier: ${
                    message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : "None"
                }`,
                `Boosts Counts: ${
                    message.guild.premiumSubscriptionCount ? `Count ${message.guild.premiumSubscriptionCount}` : "0"
                } boost(s)`,
                `Verification Level: ${message.guild.verificationLevel}`,
                `Verified: ${message.guild.verified}`,
                `Prefix: ${p}`,
            ])
            .setThumbnail(message.guild.iconURL({dynamic: true}))
          message.channel.send(embed1)
          })
    }
}