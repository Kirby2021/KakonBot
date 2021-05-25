const { MessageEmbed } = require('discord.js')
const schema = require('../../models/ticket')

module.exports = {
    name: 'disable-ticket',
    aliases: ['dtt'],
    timeout: "10000",
    description: "Disable Ticket Module for this server",
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You don't have permission to use this command`);
        await schema.findOneAndDelete({ Guild: message.guild.id })
        await message.channel.send(`**:ok_hand: Ticket Module for this server is disabled**`)
    }
}