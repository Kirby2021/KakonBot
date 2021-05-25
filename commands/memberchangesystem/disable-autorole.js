const schema = require('../../models/autorole')

module.exports = {
    name: 'disable-autorole',
    description: 'Disable Auto Role Module of a server',
    category: 'setup',
    aliases: ['dar'],
    timeout: '5000',
    requirePermission: 'Manage Server',
    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permission to use this command")
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err
            if(!data) {
                message.channel.send(`Auto Role Module for this server is disabled already`)
            } else {
                await schema.findOneAndDelete({ Guild: message.guild.id })
                message.channel.send(`Success ! Auto Role Module has been disabled`)
            }
        })
    }
}