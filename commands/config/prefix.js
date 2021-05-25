const prefixSchema = require('../../models/prefix')
const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../config.json')

module.exports = {
    name: 'prefix',
    description: 'Set a prefix for a server',
    usage: '[set/check/reset] <New Prefix (Only Required for set option)>',
    category: 'setup',
    timeout: '5000',
    requirePermission: 'Manage Server',
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permission to use this command")
        const query = args[0]
        if(!query) return message.channel.send(`You need to provide query. \`check\` for check current prefix ; \`set\` for set new prefix ; \`reset\` for reset prefix`)
        if(!(['set','check','reset']).includes(query)) return message.channel.send(`You need to provide correct query. \`check\` for check current prefix ; \`set\` for set new prefix ; \`reset\` for reset prefix`)
        prefixSchema.findOne({ Guild : message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                if(query.toLowerCase() == 'check') {
                  return message.channel.send(new MessageEmbed()
                    .setDescription(`**Current Prefix: \`${data.Prefix}\`**`)
                    .setColor("RANDOM")
                  )
                }
                if(query.toLowerCase() == 'reset') {
                  data.delete()
                  return message.channel.send(new MessageEmbed()
                    .setTitle(`Prefix`).setDescription(`Prefix Reseted\n\nNew Prefix: ${prefix}`)
                    .setColor("RANDOM")
                  )
                }
                 if(query.toLowerCase() == 'set') {
                  let res = args.slice(1).join(" ")
                  if(!res) return message.channel.send(`Oops, You need to provide new prefix.`)
                  await data.delete()
                  new prefixSchema({
                    Guild : message.guild.id,
                    Prefix : res
                }).save()
                  return message.channel.send(new MessageEmbed()
                    .setTitle(`Prefix`).setDescription(`Prefix Updated\n\nNew Prefix: \`${res}\``)
                    .setColor("RANDOM")
                  )
                }
            } else {
              if(query.toLowerCase() == 'check') {
                  return message.channel.send(new MessageEmbed()
                    .setDescription(`**Current Prefix: \`${prefix}\`**`)
                    .setColor("RANDOM")
                  )
                }
                if(query.toLowerCase() == 'reset') {
                  return message.channel.send(`Oops, I can't find any custom prefixes for this server. So current prefix is \`${prefix}\``)
                }
                 if(query.toLowerCase() == 'set') {
                  let res = args.slice(1).join(" ")
                  if(!res) return message.channel.send(`Oops, You need to provide new prefix.`)
                  new prefixSchema({
                    Guild : message.guild.id,
                    Prefix : res
                }).save()
                  return message.channel.send(new MessageEmbed()
                    .setTitle(`Prefix`).setDescription(`Prefix Updated\n\nNew Prefix: \`${res}\``)
                    .setColor("RANDOM")
                  )
                }
            }
        })
    }
}