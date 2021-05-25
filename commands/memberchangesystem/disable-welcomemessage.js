const schema = require('../../models/welcome-message')

module.exports = {
    name: 'disable-welcomemessage',
    description: 'Disable Welcome Message',
    timeout: '10000',
    category: 'memberchangesystem',
    aliases: ['dwml'],
    requirePermission: 'Manage Server',
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You don't have permission to use this command`)
        await schema.findOneAndDelete({ Guild: message.guild.id })
        message.channel.send(`Done ! Disabled Welcome Message !`)
    }
}