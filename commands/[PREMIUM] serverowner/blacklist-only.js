const schema = require('../../models/blacklist-server')
const {MessageEmbed} = require('discord.js')

module.exports = {
    name: "server-blacklist",
    description: "Blacklist user from using Kakon ON A SERVER",
    timeout: "10000",
    aliases: ['sbl'],
    usage: "[Member] <Reason>",
    run: async(client, message, args) => {
        const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = args.slice(1).join(" ") || "No Reason Was Provided";
        if(message.member.id !== message.guild.ownerID) return message.channel.send(`Only Server Owner can use this command`)
        if(!member) return message.channel.send(`Incorrect Usage`)
        if(member.id == message.guild.ownerID) return message.channel.send(`LOL ! You cannot blacklist yourself`)
        schema.findOne({ Guild: message.guild.id, User: member.id }, async(err, data) => {
            if(!data) {
                await new schema({
                    Guild: message.guild.id,
                    User: member.id,
                    Reason: reason
                }).save()
                message.channel.send(`**:ok_hand: ${member} was blacklisted from using Hedy on this server**`)
                member.send(new MessageEmbed()
                    .setTitle(`Blacklisted Notice`)
                    .setDescription(`**Server Owner blacklisted you from using Hedy on ${message.guild.name} . Reason: ${reason}**`)
                    .setColor("RED")
                )
            } else {
                message.channel.send(`That user is blacklisted already`)
            }
        })
    }
}