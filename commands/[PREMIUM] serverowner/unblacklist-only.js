const schema = require('../../models/blacklist-server')
const {MessageEmbed} = require('discord.js')

module.exports = {
    name: "server-unblacklist",
    description: "Unblacklist user from using Kakon ON A SERVER",
    timeout: "10000",
    aliases: ['subl'],
    usage: "[Member] <Reason>",
    run: async(client, message, args) => {
        const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = args.slice(1).join(" ") || "No Reason Was Provided";
        if(message.member.id !== message.guild.ownerID) return message.channel.send(`Only Server Owner can use this command`)
        if(!member) return message.channel.send(`Incorrect Usage`)
        schema.findOne({ Guild: message.guild.id, User: member.id }, async(err, data) => {
            if(data) {
                await schema.findOneAndDelete({ Guild: message.guild.id , User: member.id })
                await message.channel.send(`**:ok_hand: ${member} is no blacklisted now. **`)
            } else {
                message.channel.send(`That user is not blacklisted.`)
            }
        })
    }
}