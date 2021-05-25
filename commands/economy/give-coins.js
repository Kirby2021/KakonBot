const { MessageEmbed } = require('discord.js')
const db = require('../../reconDB')

module.exports = {
    name: 'give-coins',
    aliases: ['gc'],
    description: "Give coins to a member",
    timeout: '5000',
    usage: '[@Member] [Coins]',
    category: 'economy',
    run: async(client, message, args) => {
        const bal = await client.bal(message.member.id)
        const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const coins = args[1]
        if(!member) return message.channel.send("Incorrect Usage.")
        if(!coins) return message.channel.send("Incorrect Usage.")
        if(!Number(args[1])) return message.channel.send("Coins must be number")
        let currency = await db.get(`currency-${message.guild.id}+${client.user.id}`)
        if(coins > bal) return message.channel.send(`Hmm. You don't have ${coins}${currency} coins on your balance`)
        client.add(member.id , coins)
         message.channel.send(new MessageEmbed()
        .setDescription(`**Success ! <@${message.member.id}> gave <@${member.id}> ${coins}${currency} coins !**`)
        .setColor("RANDOM")
    )
        client.rmv(message.member.id , coins)
    }
}