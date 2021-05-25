const schema = require('../../models/leave')

module.exports = {
    name: 'disable-leavechannel',
    description: 'Disable Leave Channel',
    timeout: '10000',
    category: 'memberchangesystem',
    aliases: ['dlc'],
    requirePermission: 'Manage Server',
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You need **SECRET** permission to use this command`)
        await schema.findOneAndDelete({ Guild: message.guild.id })
        message.channel.send(`Done ! Disabled Leave Channel !`)
    }
}