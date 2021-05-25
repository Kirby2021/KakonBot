const { MessageEmbed, DiscordAPIError } = require('discord.js');
const schema = require('../../models/suggestschema')
module.exports = {
    name : 'enable-suggestion',
    category : 'config',
    aliases: ['es'],
    timeout: '4000',
    description : 'Enable Suggestion Modules',
    usage: '[#Channel]',

    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You need **SECRET** permission to use this command`)
        const channel = await message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel) return message.channel.send("Incorrect Usage.")
        schema.findOne({ Guild : message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new schema({
                    Guild: message.guild.id,
                    Channel: channel.id,
                })
                message.reply(`Suggestion Module on this server has been enabled || Channel ID: ${channel.id}`)
            } else{
                message.reply(`Suggestion Module on this server has been enabled already`)
            }
            data.save()
        })
    }
}