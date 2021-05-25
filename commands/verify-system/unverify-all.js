const Schema = require('../../models/verify.js')
const { MessageEmbed } = require('discord.js')
const { confirmation } = require('@reconlx/discord.js')

module.exports = {
    name: 'unverify-all',
    description: 'UnVerify for all members/bots',
    category: 'setup',
    timeout: '5000',
    aliases: ['uva'],
    requirePermission: 'Manage Server',
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You don't have permission to use this command`)
        Schema.findOne({ Guild : message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(!data) {
                message.reply("This server is not enabled this module")
            } else {
                if(message.channel.id == data.Channel) {
               const role = message.guild.roles.cache.find(role => role.id === data.Role)
               if(!role) return message.channel.send(`The Verify Role for this server was deleted. Ask Staff for set verify role again`)
               message.channel.send(new MessageEmbed()
                    .setTitle(`Becareful...`)
                    .setDescription(`**Emoji: 👥 | Members Only \n Emoji: 🤖 | Bots Only**`)
                    .setColor("RED")
                    .setFooter("You have 30 seconds")
               ).then(async (msg) => {
                const emoji = await confirmation(msg, message.author, ['👥', '🤖'], 30000)
                if(emoji === '👥') {
                    msg.delete()
                    message.guild.members.cache.filter(u => !u.user.bot).forEach(async (member, id) => {
                        member.roles.remove(role.id)
                        member.send(new MessageEmbed()
                        .setTitle(`Verify Module Notice`)
                        .setDescription(`You have been force un-verified **${message.guild.name}** by **${message.author.tag}**`)
                        .setColor("GREEN")
                    )
                    });
                    message.channel.send(`Success ! All Members was un-verified on the server`)
                 }
                 if(emoji === '🤖') {
                    msg.delete()
                    message.guild.members.cache.filter(u => u.user.bot).forEach(async (member, id) => {
                        member.roles.remove(role.id)
                    });
                    message.channel.send(`Success ! All Bots was un-verified on the server`)
                 }
               })
            } else {
               return message.channel.send(`This command need to run at verify channel`)
            }
            }
        })
    }
}