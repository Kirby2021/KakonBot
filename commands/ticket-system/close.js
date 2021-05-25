const { MessageEmbed } = require('discord.js')
const schema = require('../../models/ticket')

module.exports = {
    name: 'close',
    aliases: ['ctt'],
    timeout: "10000",
    description: "Close A Ticket",
    usage: '<Reason>',
    run: async(client, message, args) => {
        await schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            const reason = args.join(" ") || 'No Reason Was Provided'
            if(err) throw console.log(err)
            if(!data) return message.channel.send(`Ticket System is not enabled`);
            if(data.Role == 'null') {
                if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`You don't have permission to close ticket.`);
                const name = message.guild.members.cache.get(message.channel.name)
                if(!name) return message.channel.send(`This Channel is not a ticket (The Ticket Name was changed)`)
                await message.channel.send(`**:ok_hand: Confirmed ! This ticket will be delete after 5 seconds**`).then(channel => channel.delete({ timeout: 5000 }))
                await name.send(`**:warning: Your Ticket in ${message.guild.name} was deleted. By: ${message.author.tag} / ${message.author.id} . Reason: ${reason}**`)
                await message.channel.delete(`Ticket Closed By: ${message.author.tag} || Reason: ${reason}`)
            } else {
                if(!message.member.roles.cache.get(data.Role)) {
                    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`You don't have permission to close ticket.`);
                    const name = message.guild.members.cache.get(message.channel.name)
                    if(!name) return message.channel.send(`This Channel is not a ticket (The Ticket Name was changed)`)
                    await message.channel.send(`**:ok_hand: Confirmed ! This ticket will be delete after 5 seconds**`).then(channel => channel.delete({ timeout: 5000 }))
                    await name.send(`**:warning: Your Ticket in ${message.guild.name} was deleted. By: ${message.author.tag} / ${message.author.id} . Reason: ${reason}**`)
                    await message.channel.delete(`Ticket Closed By: ${message.author.tag} || Reason: ${reason}`)
                } else if(message.member.roles.cache.get(data.Role)) {
                    const name = message.guild.members.cache.get(message.channel.name)
                    if(!name) return message.channel.send(`This Channel is not a ticket (The Ticket Name was changed)`)
                    await message.channel.send(`**:ok_hand: Confirmed ! This ticket will be delete after 5 seconds**`).then(channel => channel.delete({ timeout: 5000 }))
                    await name.send(`**:warning: Your Ticket in ${message.guild.name} was deleted. By: ${message.author.tag} / ${message.author.id} . Reason: ${reason}**`)
                    await message.channel.delete(`Ticket Closed By: ${message.author.tag} || Reason: ${reason}`)
                }
            }
        })
    }
}