const db = require('../../models/warns')
const { Message, MessageEmbed } = require('discord.js')
const { success, error } = require('../../config.json')

module.exports = {
    name :'warns',
    description:'Show warns of a member',
    usage: '[@Member]',
    timeout: '4000',
    aliases: ['ws', 'warnings'],
    category: 'moderation',

    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {                                 
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send(`${error} You need to mention member to check all warnings`)
        let ws = 0
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(data) {
              let embed = new MessageEmbed()
                    .setTitle(`Warnings`)
                    .setColor(`YELLOW`);
            data.content.map((w, i) => {
               embed.addField(
                            `\`${i + 1}\` | **${w.reason}** `, `Punishment ID: \`${w.ID}\` | Moderator: \`${message.guild.members.cache.get(w.moderator).user.tag || "KAKON AUTO MODERATION"}\``)
                })
            message.channel.send(embed)
            } else {
                message.channel.send(new MessageEmbed()
                    .setTitle(`Error`)
                    .setDescription(`**${error} ${user.user.tag} hasn't had any active warnings.**`)
                    .setThumbnail(user.user.displayAvatarURL({ dynamic:true }))
                    .setColor("RED")
                )
            }

        })
    }
}