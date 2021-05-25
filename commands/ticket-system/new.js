const { MessageEmbed } = require('discord.js')
const schema = require('../../models/ticket')

module.exports = {
    name: 'new',
    aliases: ['ntt'],
    timeout: "10000",
    description: "Create a ticket",
    run: async(client, message, args) => {
        const everyone = message.guild.roles.everyone
        await schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw console.log(err)
            if(!data) return message.channel.send(`Ticket System is not enabled`);
            if(data.Role == 'null') {
                const channel = await message.guild.channels.create(message.author.id, {
                    type: 'text',
                    topic: message.author.id,
                })
                channel.updateOverwrite(everyone, {
                    VIEW_CHANNEL: false
                })
                channel.createOverwrite(message.author.id, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true,
                })
                channel.send(message.author, new MessageEmbed()
                    .setTitle(`Ticket Opened`)
                    .setColor("GREEN")
                    .setDescription(`This Ticket is created by ${message.author.tag} !`)
                )
            } else {
                const role = await message.guild.roles.cache.get(data.Role) || "No Support Role Found"
                const channel = await message.guild.channels.create(message.author.id, {
                    type: 'text',
                    topic: message.author.id,
                })
                channel.updateOverwrite(everyone, {
                    VIEW_CHANNEL: false
                })
                channel.createOverwrite(message.author.id, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true,
                })
                channel.createOverwrite(role, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true,
                })
                channel.send(`${message.author} , ${role}`,new MessageEmbed()
                    .setTitle(`Ticket Opened`)
                    .setColor("GREEN")
                    .setDescription(`This Ticket is created by ${message.author.tag} !`)
                )
            }
        })
    }
}