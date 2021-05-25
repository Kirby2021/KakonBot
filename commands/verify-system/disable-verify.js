const Schema = require('../../models/verify.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'disable-verify',
    description: 'Disable Verify Module for the server',
    category: 'setup',
    timeout: '5000',
    aliases: ['dv'],
    requirePermission: 'Manage Server',
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permission to use this command")
        Schema.findOne({ Guild : message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(!data) {
                message.reply("Verify Module for this server is disabled already")
            } else {
               await Schema.findOneAndDelete({ Guild: message.guild.id })
               message.channel.send(`Success ! Verify Module for this server has been disabled`)
            }
        })
    }
}