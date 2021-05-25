const { MessageEmbed } = require('discord.js')
const schema = require('../../models/ticket')

module.exports = {
    name: 'unlock-ticket',
    aliases: ['ultk'],
    timeout: "10000",
    description: "Unlock a ticket",
    usage: '<#Channel> <Reason>',
    run: async(client, message, args) => {
        await schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            const channel  = await message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
            if(!channel) return message.channel.send(`You must mention channel that is ticket to unlock`)
            const reason = args.slice(1).join(" ") || "No Reason Was Provided"
            if(err) throw console.log(err)
            if(!data) return message.channel.send(`Ticket System is not enabled`);
            if(data.Role == 'null') {
                if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`You don't have permission to close ticket.`);
                const name = message.guild.members.cache.get(channel.name)
                if(!name) return message.channel.send(`This Channel is not a ticket (The Ticket Name was changed)`)
                await channel.send(`**This ticket is unlocked. By: ${message.author.tag} / ${message.author.id} . Reason: ${reason}**`)
                await name.send(`**:warning: Your Ticket in ${message.guild.name} was unlocked. By: ${message.author.tag} / ${message.author.id} . Reason: ${reason}**`)
                await channel.updateOverwrite(name, {
                    SEND_MESSAGES: true,
                })
            } else {
                if(!message.member.roles.cache.get(data.Role)) {
                    const role = await message.guild.roles.cache.get(data.Role) || null
                    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`You don't have permission to close ticket.`);
                    const name = message.guild.members.cache.get(channel.name)
                    if(!name) return message.channel.send(`This Channel is not a ticket (The Ticket Name was changed)`)
                    await channel.send(`**This ticket is unlocked. By: ${message.author.tag} / ${message.author.id} . Reason: ${reason}**`)
                    await name.send(`**:warning: Your Ticket in ${message.guild.name} was unlocked. By: ${message.author.tag} / ${message.author.id} . Reason: ${reason}**`)
                    await channel.updateOverwrite(name, {
                    SEND_MESSAGES: true,
                })
                    await channel.updateOverwrite(role, {
                        SEND_MESSAGES: true
                    })
                } else if(message.member.roles.cache.get(data.Role)) {
                    const role = await message.guild.roles.cache.get(data.Role) || null
                    const name = message.guild.members.cache.get(channel.name)
                    if(!name) return message.channel.send(`This Channel is not a ticket (The Ticket Name was changed)`)
                    await channel.send(`**This ticket is unlocked. By: ${message.author.tag} / ${message.author.id} . Reason: ${reason}**`)
                    await name.send(`**:warning: Your Ticket in ${message.guild.name} was unlocked. By: ${message.author.tag} / ${message.author.id} . Reason: ${reason}**`)
                    await channel.updateOverwrite(name, {
                    SEND_MESSAGES: true,
                })
                    await channel.updateOverwrite(role, {
                        SEND_MESSAGES: true
                    })
                }
            }
        })
    }
}