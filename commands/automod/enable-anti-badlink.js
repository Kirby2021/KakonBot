const schema = require('../../models/invites')
const { sucess,error } = require('../../config.json')

module.exports = {
    name: 'enable-anti-bad-links',
    description: "Enable Anti Bad Links Module",
    category: 'automod',
    timeout: '2000',
    requirePermission: 'Manage Server',
    aliases: ['eai'],
    usage: `[mute, kick , warn, delete, ban, unmute]`,
    run: async(client, message, args) => {
        const p = await client.prefix(message)
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You don't have permission to use this command`)
        schema.findOne({Guild: message.guild.id }, async(err, data) => {
            if(!data) {
              if(!args[0]) return message.channel.send(`**${error} You need to provide action. Use \`${p}help enable-anti-bad-links\` for action**`)
              if(!(["ban","kick","delete","mute","unmute","warn"]).includes(args[0])) return message.channel.send(`**${error} You need to provide correct action. Use \`${p}help enable-anti-bad-links\` for action**`)
              if(args[0] == 'ban') {
                data = new schema({
                    Guild: message.guild.id,
                    Action: 'ban'
                })
                data.save()
                message.channel.send(`:ok_hand: Anti Bad Links Module for this server has been enabled. Action: Ban`)
              }
              if(args[0] == 'kick') {
                data = new schema({
                    Guild: message.guild.id,
                    Action: 'kick'
                })
                data.save()
                message.channel.send(`:ok_hand: Anti Bad Links Module for this server has been enabled. Action: Kick`)
              }
              if(args[0] == 'delete') {
                data = new schema({
                    Guild: message.guild.id,
                    Action: 'delete'
                })
                data.save()
                message.channel.send(`:ok_hand: Anti Bad Links Module for this server has been enabled. Action: Delete Message`)
              }
              if(args[0] == 'mute') {
                data = new schema({
                    Guild: message.guild.id,
                    Action: 'mute'
                })
                data.save()
                message.channel.send(`:ok_hand: Anti Bad Links Module for this server has been enabled. Action: Mute`)
              }
              if(args[0] == 'unmute') {
                data = new schema({
                    Guild: message.guild.id,
                    Action: 'unmute'
                })
                data.save()
                message.channel.send(`:ok_hand: Anti Bad Links Module for this server has been enabled. Action: Unmute`)
              }
              if(args[0] == 'warn') {
                data = new schema({
                  Guild: message.guild.id,
                  Action: 'warn'
                })
                data.save()
                message.channel.send(`:ok_hand: Anti Bad Links Module for this server has been enabled. Action: Warn`)
              }
            } else {
                message.channel.send(`:x: Anti Bad Links Module for this server is enabled already ! Action: ${data.Action}`)
            }
        })
    }
}