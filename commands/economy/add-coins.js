const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'add-coins',
    aliases: ['ac'],
    description: "Add coins for a member",
    timeout: '1000',
    category: 'economy',
    usage: '[Member] [Coins]',
    run: async(client, message, args) => {
        if(message.author.id !== '806768080331210803') return message.channel.send(`Only Bot Owner can use this command`)
        const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.channel.send("Incorrect Usage.")
        if(member.user.bot) return message.channel.send("You cannot add coins for bot")
        if(member.id === client.user.id) return message.channel.send("You cannot add coins for me")
        const coinsToAdd = args[1]
        if(!coinsToAdd) return message.channel.send("Incorrect Usage")
        if(!Number(args[1])) return message.channel.send("Coins must be number")
        client.add(member.id, parseInt(coinsToAdd))
        message.channel.send(new MessageEmbed()
            .setDescription(`**Success ! ${coinsToAdd} coins was added to <@${member.id}>**`)
            .setColor("RANDOM")
        )
    }
}