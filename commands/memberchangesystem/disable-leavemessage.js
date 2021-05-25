const schema = require('../../models/leave-message')

module.exports = {
    name: 'disable-leavemessage',
    description: 'Disable Leave Message',
    timeout: '10000',
    category: 'memberchangesystem',
    aliases: ['dlml'],
    requirePermission: 'Manage Server',
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You don't have permission to use this command`)
        await schema.findOneAndDelete({ Guild: message.guild.id })
        message.channel.send(`Done ! Disabled Leave Message !`)
    }
}