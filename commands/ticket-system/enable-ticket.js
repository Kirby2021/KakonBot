const { MessageEmbed } = require('discord.js')
const schema = require('../../models/ticket')

module.exports = {
    name: 'enable-ticket',
    aliases: ['ett'],
    timeout: "10000",
    description: "Enable Ticket Module for this server",
    usage: "<Support Role>",
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You don't have permission to use this command`);
        const role = await message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || 'null'
        await schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw console.log(err)
            if(!data) {
                await new schema({
                    Guild: message.guild.id,
                    Role: role.id
                }).save()
                message.channel.send(`**:ok_hand: Ticket System is enabled.**`)
            } else {
                message.channel.send(`**:x: Ticket System is enabled already.**`)
            }
        })
    }
}