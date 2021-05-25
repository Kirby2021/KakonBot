const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'invite',
    description: "Get an invite link and support server",
    timeout: '2000',
    category: 'info',
    aliases: ['iv'],
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
            .setDescription(`**[Click Here To Invite Me](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2550459647)\n\n[Click Here For Support Server](https://discord.gg/avKeDfEy6U)**`)
            .setColor("RANDOM")
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
    }
}