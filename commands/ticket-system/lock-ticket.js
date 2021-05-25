const { MessageEmbed } = require('discord.js')
const schema = require('../../models/ticket')

module.exports = {
    name: 'lock-ticket',
    aliases: ['ltk'],
    timeout: "10000",
    description: "Lock a ticket",
    usage: '<Reason>',
    run: async(client, message, args) => {
        await schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            const reason = args.join(" ") || 'No Reason Was Provided';
            if(err) throw console.log(err)
            if(!data) return message.channel.send(`Ticket System is not enabled`);
            if(data.Role == 'null') {
                if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`You don't have permission to close ticket.`);
                const name = message.guild.members.cache.get(message.channel.name)
                if(!name) return message.channel.send(`This Channel is not a ticket (The Ticket Name was changed)`)
                await message.channel.send(`**:ok_hand: This ticket is locked ! By: ${message.author.tag}**`)
                await name.send(`**:warning: Your Ticket in ${message.guild.name} was locked. By: ${message.author.tag} / ${message.author.id} . Reason: ${reason} . Use ?unlock-ticket <#${message.channel.id}> to unlock your ticket**`)
                await message.channel.updateOverwrite(name, {
                    SEND_MESSAGES: false,
                })
            } else {
                if(!message.member.roles.cache.get(data.Role)) {
                    const role = await message.guild.roles.cache.get(data.Role) || null
                    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`You don't have permission to close ticket.`);
                    const name = message.guild.members.cache.get(message.channel.name)
                    if(!name) return message.channel.send(`This Channel is not a ticket (The Ticket Name was changed)`)
                    await message.channel.send(`**:ok_hand: This ticket is locked ! By: ${message.author.tag}**`)
                    await name.send(`**:warning: Your Ticket in ${message.guild.name} was locked. By: ${message.author.tag} / ${message.author.id} . Reason: ${reason} . Use ?unlock-ticket <#${message.channel.id}> to unlock your ticket**`)
                    await message.channel.updateOverwrite(name, {
                    SEND_MESSAGES: false,
                })
                    await message.channel.updateOverwrite(role, {
                        SEND_MESSAGES: false
                    })
                } else if(message.member.roles.cache.get(data.Role)) {
                    const role = await message.guild.roles.cache.get(data.Role) || null
                    const name = message.guild.members.cache.get(message.channel.name)
                    if(!name) return message.channel.send(`This Channel is not a ticket (The Ticket Name was changed)`)
                    await message.channel.send(`**:ok_hand: This ticket is locked ! By: ${message.author.tag}**`)
                    await name.send(`**:warning: Your Ticket in ${message.guild.name} was locked. By: ${message.author.tag} / ${message.author.id} . Reason: ${reason} . Use ?unlock-ticket <#${message.channel.id}> to unlock your ticket**`)
                    await message.channel.updateOverwrite(name, {
                    SEND_MESSAGES: false,
                })
                    await message.channel.updateOverwrite(role, {
                        SEND_MESSAGES: false
                    })
                }
            }
        })
    }
}