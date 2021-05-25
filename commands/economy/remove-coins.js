const { MessageEmbed } = require('discord.js')
const db = require('../../reconDB')

module.exports = {
    name: 'remove-coins',
    aliases: ['rc'],
    description: "Remove coins or a member",
    timeout: '1000',
    category: 'economy',
    run: async(client, message, args) => {
        if(message.author.id !== '806768080331210803') return message.channel.send(`Only Bot Owner can use this command`)
        const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.channel.send("Incorrect Usage.")
        if(member.user.bot) return message.channel.send("You cannot remove coins from bots")
        if(member.id === client.user.id) return message.channel.send("You cannot remove coins from me")
        const coinsToAdd = args[1]
        let currency = await db.get(`currency-${message.guild.id}+${client.user.id}`)
        if(!Number(args[1])) return message.channel.send("Coins must be number")
        if(!coinsToAdd) return message.channel.send("Incorrect Usage")
        client.rmv(member.id, parseInt(coinsToAdd))
        message.channel.send(new MessageEmbed()
            .setDescription(`**Success ! ${coinsToAdd}${currency} coins was removed from <@${member.id}>**`)
            .setColor("RANDOM")
        )
    }
}