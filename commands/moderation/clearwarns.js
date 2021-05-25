const db = require('../../models/warns')
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
    name :'clearwarns',
    description:'Clear all warns of a member',
    usage: '[Member]',
    timeout: '4000',
    aliases: ['cws','clearwarn'],
    category: 'moderation',
    requirePermission: 'Manage Server',
    run : async(client, message, args) => {
        const prefix = await client.prefix(message)
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(new MessageEmbed()
        .setDescription(`${error} You don't have permission to use this command`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    )
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send(new MessageEmbed()
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
        .setColor("RED")
        .setDescription(`**${error} You need to mention member to clear warns. Type \`\`${prefix}help clearwarns\`\` for more usage**`)
        )
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                await db.findOneAndDelete({ user : user.user.id, guildid: message.guild.id})
                message.channel.send(new MessageEmbed()
                    .setDescription(`**${success} Cleared all warns of ${user.user.tag}**`)
                    .setColor("GREEN")
                )
            } else {
                message.channel.send(new MessageEmbed()
                .setDescription(`**${error} ${member.user.tag} hasn't had any warnings**`)
                    .setColor("RED")
                )
            }
        })
    }
}