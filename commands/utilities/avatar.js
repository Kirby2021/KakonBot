const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'avatar',
    aliases: ['av'],
    description: 'Send a profile picture of a meber',
    timeout: '2000',
    usage: '[Member (Optinal)]',
    run: async(client, message, args) => {
        const member =  await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        message.channel.send(new MessageEmbed()
            .setImage(member.user.displayAvatarURL({ dynamic: true , size: 4096}))
            .setColor("RANDOM")
            .setTitle(`**${member.user.username} 's Avatar**`)
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
        )
    }
}