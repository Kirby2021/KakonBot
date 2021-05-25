const schema = require('../../models/kicks')

module.exports = {
    name: 'unkick-join',
    description: 'Disable Auto Kick Member when join ',
    category: 'setup',
    aliases: ['ukj'],
    timeout: '5000',
    requirePermission: 'Kick Members',
    run : async(client, message, args) => {
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have permission to use this command")
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err
            if(!data) {
                message.channel.send(`Auto Kick Module for this server is disabled already`)
            } else {
                await schema.findOneAndDelete({ Guild: message.guild.id })
                message.channel.send(`Success ! Auto Kick Module has been disabled`)
            }
        })
    }
}