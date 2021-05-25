const db = require('../../models/notes')
const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name :'notes',
    description:'Show notes of a member',
    usage: '[@Member]',
    timeout: '4000',
    aliases: ['nts'],
    category: 'note-system',

    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {                                 
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('Incorrect Usage.')
        const reason = args.slice(1).join(" ")
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(data) {
                message.channel.send(new MessageEmbed()
                    .setTitle(`All Notes`)
                    .setDescription(
                        data.content.map(
                            (w, i) =>
                            `\`${i + 1}\` | Moderator : ${message.guild.members.cache.get(w.moderator)} | Notes : ${w.reason} | Note ID : ${w.ID}`
                        )
                    )
                    .setColor(`GREEN`)
                )
            } else {
                message.channel.send(new MessageEmbed()
                    .setTitle(`Notes`)
                    .setDescription(`${user.user.tag} doesn't has any notes.`)
                    .setThumbnail(user.user.displayAvatarURL({ dynamic:true }))
                    .setColor("GREEN")
                )
            }

        })
    }
}