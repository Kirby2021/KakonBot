const { MessageEmbed, DiscordAPIError } = require('discord.js');
const schema = require('../../models/report2s')
module.exports = {
    name : 'report-info',
    category : 'config',
    aliases: ['ri'],
    timeout: '4000',
    description : 'Show Info of a Report',
    usage: '[Report ID]',

    run : async(client, message, args) => {
        const reportID = args[0]
        if(!reportID) return message.channel.send(`Incorrect Usage`)
        schema.findOne({ ID: reportID , Guild : message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(!data) {
                message.channel.send(`Cannot find that Report ID on this server`)
            } else{
                const Title = new MessageEmbed()
                    .setTitle(`:warning: Report System :warning:`)
                    .addField(`Reported: `,`<@${data.User}>`)
                    .addField(`By: `,`<@${data.Author}>`)
                    .addField(`Reason: `,data.Reason)
                    .addField(`Report ID`,data.ID)
                    .addField(`Status`,data.Status)
                    .setColor("RANDOM")
                    .setFooter(`Reported Channel: ${data.Channel}`)
                message.channel.send(Title)
            }
            })
    }
}