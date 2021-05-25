const schema = require('../../models/bans')
module.exports = {
    name: 'ban-join',
    aliases: ['bj'],
    description: 'Enable Auto Ban Member when joining the server',
    timeout: '10000',
    category: 'moderation',
    requirePermission: 'Ban Members',
    run: async(client, message, args) => {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`You need **SECRET** permission to use this command`)
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(!data) {
                data = new schema({
                    Guild: message.guild.id,
                })
                data.save()
                message.reply(`Success ! Auto Ban Module for this server has been enabled`)
            } else{
                message.channel.send(`Auto Ban Module is enabled already`)
            }
        })
    }
}