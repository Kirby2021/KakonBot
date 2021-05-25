const db = require('../../reconDB')
const {MessageEmbed} = require('discord.js')

module.exports = {
    name: 'afk',
    description: "Sets AFK",
    aliases: ['afk'],
    timeout: "2000",
    usage: '<Reason>',
    run: async(client, message, args) => {
        const reason = args.join(" ") || "AFK"
        await db.set(`afk-${message.author.id}+${message.guild.id}`,`${reason}`)
        const embed = new MessageEmbed()
            .setAuthor(message.author.tag,message.author.displayAvatarURL({dynamic:true}))
            .setDescription(`**AFK Set: ${reason}**`)
            .setColor("GREEN")
        message.channel.send(embed)
    }
}