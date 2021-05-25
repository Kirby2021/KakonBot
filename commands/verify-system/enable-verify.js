const Schema = require('../../models/verify.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'enable-verify',
    description: 'Enable Verify Module for the server',
    category: 'setup',
    timeout: '5000',
    aliases: ['ev'],
    usage: '[@Role] [Channel ID]',
    requirePermission: 'Manage Server',
    run: async(client, message, args) => {
        const role = await message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if(!role) return message.channel.send(`Incorrect Usage`)
        const channel = await message.guild.channels.cache.get(args.slice(1).join(" "))
        if(!channel) return message.channel.send(`Incorrect Usage`)
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permission to use this command")
        Schema.findOne({ Guild : message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
               await message.reply(`This server has been enabled Verify Module already. Disable it and enable again`)
                    } else {
                        data = new Schema({
                            Guild: message.guild.id,
                            Channel: channel.id,
                            Role: role.id
                        })
                        data.save()
                        message.reply(`Success ! Updated Verify Role to ${role.name}`)
                    }
               })
            }
        }