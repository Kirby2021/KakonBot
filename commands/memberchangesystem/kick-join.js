const schema = require('../../models/kicks')
module.exports = {
    name: 'kick-join',
    aliases: ['kj'],
    description: 'Enable Auto Kick Member when joining the server',
    timeout: '10000',
    category: 'moderation',
    requirePermission: 'Kick Members',
    run: async(client, message, args) => {
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`You need **SECRET** permission to use this command`)
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(!data) {
                data = new schema({
                    Guild: message.guild.id,
                })
                data.save()
                message.reply(`Success ! Auto Kick Module for this server has been enabled`)
            } else{
                message.channel.send(`Auto Kick Module is enabled already`)
            }
        })
    }
}