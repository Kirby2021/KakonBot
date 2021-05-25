const Schema = require('../../models/verify.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'verify-info',
    description: "Shows verify info of the server",
    category: 'setup',
    timeout: '5000',
    aliases: ['vi'],
    run: async(client, message, args) => {        
        Schema.findOne({ Guild : message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(!data) {
                const embed = new MessageEmbed()
                .setTitle(`Verify Info`)
                .setColor("RED")
                .setDescription(`**Error ! Cannot find any database about Verify Module of this server**`)
                .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(embed)
            } else {
               const role = message.guild.roles.cache.get(data.Role)
               const channel = message.guild.channels.cache.get(data.Channel)
               if(!role) return message.channel.send(`The Verify Role for this server was deleted. Ask Staff for set verify role again`)
               if(!channel) return message.channel.send(`The Verify Channel for this server was deleted. Ask Staff for set verify channel again`)
               const embed = new MessageEmbed()
                    .setTitle(`Verify Info`)
                    .setColor("GREEN")
                    .setDescription(`**Channel: ${channel}\nRole: ${role}\nVerified: ${message.guild.members.cache.filter(member => member.roles.cache.get(role.id)).size}\nUnVerified: ${message.guild.members.cache.filter(member => !member.roles.cache.get(role.id)).size}**`)
                    .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed)
            }
        })
    }
}