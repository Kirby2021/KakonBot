const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'membercount',
    description: "Shows MemberCount , BotCount and HumanCount of a server",
    aliases: ['mb'],
    timeout: '1000',
    category: 'utilities',
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
            .setDescription(`**👥 Members Count: ${message.guild.memberCount}\n\n🤖 Bots Count: ${message.guild.members.cache.filter(u => u.user.bot).size}\n\n🧑 Humans Count: ${message.guild.members.cache.filter(u => !u.user.bot).size}**`)
            .setColor("BLUE")
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
        message.channel.send(embed)
    }
}