const schema = require('../../models/join')

module.exports = {
    name: 'disable-joinchannel',
    description: 'Disable Join Channel',
    timeout: '10000',
    category: 'memberchangesystem',
    aliases: ['djc'],
    requirePermission: 'Manage Server',
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You need **SECRET** permission to use this command`)
        await schema.findOneAndDelete({ Guild: message.guild.id })
        message.channel.send(`Done ! Disabled Join Channel !`)
    }
}