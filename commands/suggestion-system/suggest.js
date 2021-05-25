const schema = require('../../models/suggestschema')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'suggest',
    description: 'Suggests something to get the server better than',
    aliases: ['ss'],
    timeout: '2000',
    category: 'suggestion-system',
    usage: '[Suggest]',
    run: async(client, message, args) => {
        const suggest = args.join(" ")
        if(!suggest) return message.channel.send(`Incorrect Usage.`)
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(!data) {
                message.channel.send(new MessageEmbed()
                    .setTitle(`Error`)
                    .setDescription(`**An error occured ! Cannot find any database of suggestion for this server. Ask Staff for setup it**`)
                    .setColor("RED")
                    .setFooter(
                        `Requested by ${message.author.tag}`,
                        message.author.displayAvatarURL({ dynamic: true })
                    )
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                )
            } else{
                const channel = message.guild.channels.cache.get(data.Channel)
                if(!channel) {
                    return message.channel.send(new MessageEmbed()
                    .setTitle(`Error`)
                    .setDescription(`**An error occured ! Staff has deleted the suggestion channel ! Ask Staff to setup it again**`)
                    .setColor("RED")
                    .setFooter(
                        `Requested by ${message.author.tag}`,
                        message.author.displayAvatarURL({ dynamic: true })
                    )
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                )
                }
                if(channel) {
                    if(suggest.length > 256) return message.channel.send(`Suggest Text must be 256 or fewer in length`)
                    const msg = await channel.send(new MessageEmbed()
                        .setTitle(suggest)
                        .setFooter(`A Suggestion Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                        .setColor("RANDOM")
                    )
                    await msg.react(`✅`)
                    await msg.react(`❌`)
                    message.channel.send(`Success ! Your Suggestion has been sent to suggestion channel`)
                }
            }
        })
    }
}