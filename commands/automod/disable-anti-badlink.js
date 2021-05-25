const schema = require('../../models/invites')

module.exports = {
    name: 'disable-anti-bad-links',
    description: "Disable Anti Bad Links Module",
    category: 'automod',
    timeout: '2000',
    requirePermission: 'Manage Server',
    aliases: ['dai'],
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You don't have permission to use this command`)
        schema.findOne({Guild: message.guild.id }, async(err, data) => {
            if(data) {
                await schema.findOneAndDelete({Guild: message.guild.id})
                message.channel.send(`:white_check_mard: Anti Bad Links Module for this server has been enabled !`)
            } else {
                message.channel.send(`:x: Anti Bad Links Module for this server is disabled already`)
            }
        })
    }
}