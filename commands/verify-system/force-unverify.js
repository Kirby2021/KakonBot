const Schema = require('../../models/verify.js')
const { MessageEmbed } = require('discord.js')
const { confirmation } = require('@reconlx/discord.js')

module.exports = {
    name: 'force-unverify',
    description: 'Force UnVerify the member',
    category: 'setup',
    timeout: '5000',
    aliases: ['fuvv'],
    usage: '[@Member]',
    requirePermission: 'Manage Server',
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You don't have permission to use this command`)
        const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.channel.send(`Incorrect Usage.`)
        Schema.findOne({ Guild : message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(!data) {
                message.reply("This server is not enabled this module")
            } else {
               const role = message.guild.roles.cache.find(role => role.id === data.Role)
               if(!role) return message.channel.send(`The Verify Role for this server was deleted. Ask Staff for set verify role again`)
               if(!member.roles.cache.get(role.id)) return message.channel.send(`${member.user.tag} has been un-verified already`)
               message.channel.send(new MessageEmbed()
                    .setTitle(`Confirmation ...`)
                    .setDescription(`**Emoji: ✅ | Force-UnVerify \n Emoji: ❌ | Cancel the command**`)
                    .setColor("RED")
                    .setFooter("You have 30 seconds")
               ).then(async (msg) => {
                const emoji = await confirmation(msg, message.author, ['✅', '❌'], 30000)
                if(emoji === '✅') {
                    msg.delete()
                    member.roles.remove(data.Role)
                    message.channel.send(`Confirmed. ${member.user.tag} was unverified on ${message.guild.name}.`)
                 }
                 if(emoji === '❌') {
                    msg.delete()
                    message.channel.send(`Confirmed. Canceled the command.`)
                 }
               })
            }
        })
    }
}