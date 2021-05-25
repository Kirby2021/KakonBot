const { MessageEmbed, DiscordAPIError } = require('discord.js');
const schema = require('../../models/report')
module.exports = {
    name : 'disable-report',
    category : 'config',
    aliases: ['dr'],
    timeout: '4000',
    description : 'Disable Report Modules',
    requirePermission: 'Manage Server',

    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You need **SECRET** permission to use this command`)
                await schema.findOneAndDelete({ Guild : message.guild.id })
                message.reply(`Success ! Report Module on this server has been disabled`)
    }
}