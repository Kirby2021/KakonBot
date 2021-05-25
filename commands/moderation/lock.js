const { MessageEmbed } = require('discord.js');
const { error , success } = require('../../config.json')

module.exports = {
    name: 'lock',
    description: 'lock a channel',
    aliases: ['l'],
    timeout: '5000',
    usage: '<#Channel>',
    category: 'moderation',
    requirePermission: 'Manage Roles',
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(new MesssageEmbed().setDescription(`**${error} You don't have permission to use this command**`).setColor("RED").setFooter(`Requested by: ${message.author.tag}`,message.author.displayAvatarURL({ dynamic:true })))
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS","MANAGE_MESSAGES")) return message.channel.send(new MesssageEmbed().setDescription(`**${error} I don't have permission to lock any channels**`).setColor("RED").setFooter(`Requested by: ${message.author.tag}`,message.author.displayAvatarURL({ dynamic:true })))
        let channel = await message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        let reason;
        if(channel) {
          reason = args.slice(1).join(" ") || "No reason was provided"
        } else if(!channel) {
          reason = args.join(" ") || "No reason was provided";
          channel = message.channel
        }
        const everyone = message.guild.roles.cache.find(role => role.name == '@everyone')
        if(!channel.permissionsFor(everyone).has(["SEND_MESSAGES"])) return message.channel.send(new MessageEmbed().setTitle(`Error`).setDescription(`${error} This channel is locked already`).setColor("RED"))
        await channel.createOverwrite(client.user, {
            SEND_MESSAGES: true,
        },`Kakon Moderation - Lock Command - Action By: ${message.author.tag}`)
        await channel.updateOverwrite(everyone, {
            SEND_MESSAGES: false,
        },`Kakon Moderation - Lock Command - Action By: ${message.author.tag}`)
        channel.send(new MessageEmbed().setDescription(`**${success} \`${message.author.tag}\` locked this channel\n\`${reason}\`**`).setColor("GREEN"))
        .catch(err => {
            console.log(err)
            message.channel.send(new MessageEmbed().setTitle(`Error`).setDescription(`**${error} An error occured when I'm trying to lock this channel**`).setColor("RED"))
        })
    }
}