const schema = require('../../models/autorole')

module.exports = {
    name: 'enable-autorole',
    description: 'Enable Auto Role Module of a server',
    category: 'setup',
    aliases: ['ear'],
    timeout: '5000',
    usage: '[@Role]',
    requirePermission: 'Manage Server',
    run : async(client, message, args) => {
        const role = await message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if(!role) return message.channel.send(`Incorrect Usage.`)
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permission to use this command")
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err
            if(data) {
                message.channel.send(`Auto Role Module for this server is enabled already. Disable it and enable it again`)
            } else {
                data = new schema({
                    Guild: message.guild.id,
                    Role: role.id,
                })
                await data.save()
                message.channel.send(`Success ! Auto Role for this server has been enabled`)
            }
        })
    }
}