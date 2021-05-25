const { MessageEmbed } = require('discord.js')
const db = require('../../reconDB')

module.exports = {
    name: 'balance',
    aliases: ['bal'],
    description: "Show balance of a member",
    timeout: '1000',
    category: 'economy',
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.member
        if(member.user.bot) return message.channel.send("You cannot check balance of bot")
        if(member.id === client.user.id) return message.channel.send("You cannot check balance of me")
        let currency = await db.get(`currency-${message.guild.id}+${client.user.id}`)
        const bal = await client.bal(member.id);
        message.channel.send(new MessageEmbed()
            .setTitle(`Balance (All Servers)`)
            .addField(`Money`, `${bal}${currency}`)
            .addField(`Member`,`<@${member.id}>`)
            .setColor("RANDOM")
        )
    }
}  