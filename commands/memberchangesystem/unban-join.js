const schema = require('../../models/bans')

module.exports = {
    name: 'unban-join',
    description: 'Disable Auto Ban Member when join ',
    category: 'setup',
    aliases: ['ubj'],
    timeout: '5000',
    requirePermission: 'Ban Members',
    run : async(client, message, args) => {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You don't have permission to use this command")
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err
            if(!data) {
                message.channel.send(`Auto Ban Module for this server is disabled already`)
            } else {
                await schema.findOneAndDelete({ Guild: message.guild.id })
                message.channel.send(`Success ! Auto Ban Module has been disabled`)
            }
        })
    }
}