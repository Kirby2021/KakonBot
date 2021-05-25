const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'nuke',
    description: "Clone and Delete current channel",
    timeout: '2000',
    aliases: ['nk'],
    category: 'moderation',
    requirePermission: 'Manage Channels',
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`You don't have permission to use this command`)
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`I don't have permission to nuke channels`)
        const channelD = await message.channel.clone()
        channelD.send(`BOOM ! Nuked this channel`).then(m => m.delete({ timeout: '10000' }))
        await message.channel.delete()
    }
}