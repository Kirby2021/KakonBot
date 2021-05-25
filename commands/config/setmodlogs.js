const schema = require('../../models/modlogs')

module.exports = {
    name: 'modlogs',
    aliases: ['modl'],
    description: "Set/Check/Delete Mod Logs !",
    category: 'config',
    usage: '[check/set/delete] <#Channel (Only for set action)>',
    timeout: '2000',
    requirePermission: 'Manage Server',
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You don't have permission to use this command`)
        const query = args[0]
        if(!query) return message.channel.send(`Oops ! You need to provide query. \`check\` for checking current mod logs ; \`set\` for set new mod logs ; \`delete\` for delete current mod logs`)
        if(!(['check','set','delete']).includes(query)) return message.channel.send(`Oops ! You need to provide correct query. \`check\` for checking current mod logs ; \`set\` for set new mod logs ; \`delete\` for delete current mod logs`)
        const channel = await message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channel;
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) {
                if(query == "check") return message.channel.send(`**Current Mod Logs: <#${data.Channel}> (${data.Channel})**`)
                if(query == "delete") {
                await data.delete()
                message.channel.send(`**:white_check_mark: Deleted Mod Logs**`)
                }
                if(query == 'set') {
                    await data.delete()
                    new schema({
                        Guild: message.guild.id,
                        Channel: channel.id
                    }).save()
                    message.channel.send(`**:white_check_mark: New Mod Logs: ${channel} (${channel.id})**`)
                }
            } else {
                if(query == "check") return message.channel.send(`**Current Mod Logs: Not Set**`)
                if(query == "delete") {
                message.channel.send(`**:x: No Mod Logs set for this server.**`)
                }
                if(query == 'set') {
                    data = new schema({
                        Guild: message.guild.id,
                        Channel: channel.id
                    })
                    data.save()
                    message.channel.send(`**:white_check_mark: New Mod Logs: ${channel} (${channel.id})**`)
            }
        }
    })
    }
}