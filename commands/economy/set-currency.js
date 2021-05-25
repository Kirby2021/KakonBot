const db = require('../../reconDB')
const { MessageEmbed } = require('discord.js')

module.exports = {
name : 'set-currency',
category : 'economy',
aliases: ['set-currency'],
timeout: '4000',
description : 'Set Curency For the server',
usage: '[New Currency]',
requirePermission: 'Manage Server',
    run: async(client,message, args) => {
        if(!message.member.hasPermission("MAANGE_GUILD")) return message.channel.send(`You can't use this command`)
        const current = args.join(" ")
        if(!current) return message.channel.send(`You need to provide new currency to change`)
        await db.set(`currency-${message.guild.id}+${client.user.id}`,`${current}`)
        message.channel.send(new MessageEmbed().setTitle(`Currency Updated`).setDescription(`**New Currency: ${current}**`).setColor("GREEN"))
    }
}