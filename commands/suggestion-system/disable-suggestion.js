const { MessageEmbed, DiscordAPIError } = require('discord.js');
const schema = require('../../models/suggestschema')
module.exports = {
    name : 'disable-suggestion',
    category : 'config',
    aliases: ['dr'],
    timeout: '4000',
    description : 'Disable Suggestion Modules',

    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You need **SECRET** permission to use this command`)
                await schema.findOneAndDelete({ Guild : message.guild.id })
                message.reply(`Success ! Suggestion Module on this server has been disabled`)
    }
}