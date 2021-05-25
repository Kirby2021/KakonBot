const db = require('../../models/notes')
const { MessageEmbed } = require('discord.js')
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
    name :'clearnotes',
    description:'Clear all notes of a member',
    usage: '[Member]',
    timeout: '4000',
    aliases: ['cln'],
    category: 'note-system',
    requirePermission: 'Manage Server',
    run : async(client, message, args) => {
        const prefix = await client.prefix(message)
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(new MessageEmbed()
        .setDescription("You don't have permission to use this command")
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
        .setDescription(`**Incorrect Usage. Type \`\`${prefix}help clearnotes\`\` for more usage**`)
        )
        if(user.user.id === message.author.id) return;
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                await db.findOneAndDelete({ user : user.user.id, guildid: message.guild.id})
                message.channel.send(new MessageEmbed()
                    .setDescription(`**Done. Cleared all notes of ${user.user.username}**`)
                    .setFooter(
                        `Requested by ${message.author.tag}`,
                        message.author.displayAvatarURL({ dynamic: true })
                      )
                    .setColor("GREEN")
                )
            } else {
                message.channel.send(new MessageEmbed()
                .setDescription(`**${user.user.username} doesn't has any notes**`)
                    .setFooter(
                        `Requested by ${message.author.tag}`,
                        message.author.displayAvatarURL({ dynamic: true })
                      )
                    .setColor("RED")
                )
            }
        })
    }
}