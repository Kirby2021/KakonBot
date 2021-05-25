const schema = require('../../models/dm')

module.exports = {
    name: 'disable-dmjoin',
    description: 'Disable Welcome Message on DM',
    timeout: '10000',
    category: 'memberchangesystem',
    aliases: ['ddmj'],
    requirePermission: 'Manage Server',
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You don't have permission to use this command`)
        await schema.findOneAndDelete({ Guild: message.guild.id })
        message.channel.send(`Done ! Disabled Welcome Message on DM !""`)
    }
}