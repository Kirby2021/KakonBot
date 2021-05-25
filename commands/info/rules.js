const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "rules",
    description: "Shows Bot RULES",
    timeout: "1000",
    aliases: ['rules'],
    run: async(client, message, args) => {
        const rules = new MessageEmbed()
            .setTitle(`Kakon Bot Rules`)
            .setDescription(`**1. Don't Bypass The Bot\n2. Don't Spam Say Command.\n 3. Don't Copy The Bot\n4. Don't Trying to Attempt Kakon\n\nYou will get blacklisted from me if you are trying to break rules\n\nThanks for using Kakon**`)
            .setColor("RED")
            .setFooter(`@ Copyright by Kakon Bot 2021`)
        message.channel.send(rules)
    }
}