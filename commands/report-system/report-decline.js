const { MessageEmbed, DiscordAPIError } = require('discord.js');
const schema = require('../../models/report2s')
const schema2 = require('../../models/warns')
module.exports = {
    name : 'report-decline',
    category : 'config',
    aliases: ['rd'],
    timeout: '4000',
    description : 'Decline an report',
    usage: '[Report ID]',
    requirePermission: 'Manage Server',

    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You need **SECRET** perission to use this command`)
        const accept = 'Accepted';
        const decline = 'Declined';
        const reportID = args[0]
        const reason = args.slice(1).join(" ")
        if(!reportID) return message.channel.send(`Incorrect Usage`)
        if(!reason) return message.channel.send(`Incorrect Usage`)
        schema.findOne({ ID: reportID , Guild : message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(!data) {
                message.channel.send(`Cannot find that Report ID on this server`)
            } else{
                if(data.Status == "Pending") {
                const member = message.guild.members.cache.find(member => member.id === data.Author)
                if(!member) return message.channel.send('The Report\'s Author on that Report was left the server')
                const channel = message.guild.channels.cache.find(channel => channel.id === data.Channel)
                if(!channel) {
                    return message.channel.send(`Cannot find report channel ! Setup it again`)
                }
                const Title = new MessageEmbed()
                    .setTitle(`:warning: Report System :warning:`)
                    .setDescription(`The Report ID: ${reportID} was declined by ${message.author.tag}. ${member} will be strike after a second`)
                    .setColor("GREEN")
                    .setFooter(`Accept Channel: ${message.channel.name}`)
                message.channel.send(`Success ! You have declined Report ID ${reportID} . That Report's Author will be strike after a second`)
                await schema.findOneAndDelete({ ID: reportID, Guild: message.guild.id })
                schema.findOne({ ID: data.ID , Guild: message.guild.id }, async(err, data2) => {
                    if(err) throw err;
                    if(!data2) {
                        data2 = new schema({
                            ID: data.ID,
                            Guild : data.Guild,
                            User: data.User,
                            Reason: data.Reason,
                            Author: data.Author,
                            Channel: data.Channel,
                            Status: 'Declined',
                        })
                    }
                    data2.save()
                })
                schema2.findOne({ guildid: message.guild.id, user: member.user.id}, async(err, data2) => {
                    if(err) throw err;
                    if(!data2) {
                        data2 = new schema2({
                            guildid: message.guild.id,
                            user : member.user.id,
        
                            content : [
                                {
                                    moderator : message.author.id,
                                    reason : data.Reason,
                                    ID: data.ID,
                                }
                            ]
                        })
                    } else {
                        const obj = {
                            moderator : message.author.id,
                            reason : data.Reason,
                            ID: data.ID,
                        }
                        data2.content.push(obj)
                    }
                    data2.save()
                    member.send(new MessageEmbed()
                        .setDescription(`**You were auto-warned from ${message.guild.name} with reason: ${reason} || Warn ID: ${data.ID}**`)
                        .setColor("YELLOW")
                        .setFooter(`You are Report's Author on Report ID: ${data.ID} and that report was declined`)
        )
                });
            } else {
                if(data.Status == 'Accepted') {
                    message.channel.send(`This Report was accepted and freezed . So You cannot edit this report again`)
                }
                if(data.Status == 'Declined') {
                    message.channel.send(`This Report was declined and freezed . So You cannot edit this report again`)
                }
            }
            }
        })
    }
}