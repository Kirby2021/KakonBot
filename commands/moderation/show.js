const { MessageEmbed } = require('discord.js');
const { error , success } = require('../../config.json')

module.exports = {
    name: 'show',
    description: 'Show a channel',
    aliases: ['sho'],
    timeout: '5000',
    usage: '<#Channel>',
    category: 'moderation',
    requirePermission: 'Administrator',
    run: async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new MesssageEmbed().setDescription(`**${error} You must be an Admin.**`).setColor("RED").setFooter(`Requested by: ${message.author.tag}`,message.author.displayAvatarURL({ dynamic:true })))
        if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(new MesssageEmbed().setDescription(`**${error} I must be an Admin**`).setColor("RED").setFooter(`Requested by: ${message.author.tag}`,message.author.displayAvatarURL({ dynamic:true })))
        const channel = await message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel
        const everyone = message.guild.roles.cache.find(role => role.name == '@everyone')
        if(channel.permissionsFor(everyone).has(["VIEW_CHANNEL"])) return message.channel.send(new MessageEmbed().setTitle(`Error`).setDescription(`${error} This channel is shown already`).setColor("RED"))
        await channel.createOverwrite(client.user, {
            VIEW_CHANNEL: true
        },`Kakon Moderation - Show Command - Action By: ${message.author.tag}`)
        await channel.updateOverwrite(everyone, {
            VIEW_CHANNEL: null
        },`Kakon Moderation - Show Command - Action By: ${message.author.tag}`)
        channel.send(new MessageEmbed().setDescription(`**${success} ${channel} has been shown. (If it isn't show, make sure the \`@everyone\` role has \`VIEW_CHANNEL\` permissions)**`).setColor("GREEN"))
        .catch(err => {
            console.log(err)
            message.channel.send(new MessageEmbed().setTitle(`Error`).setDescription(`**${error} An error occured when I'm trying to hide this channel**`).setColor("RED"))
        })
    }
}