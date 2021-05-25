const schema = require('../../models/leave')

module.exports = {
    name: 'enable-leavechannel',
    description: 'Enable Leave Channel',
    usage: '[#Channel]',
    timeout: '10000',
    category: 'memberchangesystem',
    aliases: ['slc'],
    requirePermission: 'Manage Server',
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You need **SECRET** permission to use this command`)
        const channel = await message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel) return message.channel.send(`Incorrect Usage.`)
        schema.findOne({ Guild: message.guild.id },async(err, data) => {
            if(!data) {
                data = new schema({
                    Guild: message.guild.id,
                    Channel: channel.id
                })
                await data.save()
                message.channel.send(`Success ! Leave Channel is ${channel}`)
            } else {
                message.channel.send(`Leave Channel for this server is enabled already`)
            }
        })
    }
}