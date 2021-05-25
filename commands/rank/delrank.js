const { MessageEmbed, DiscordAPIError } = require('discord.js');
const schema = require('../../models/ranks')
module.exports = {
    name : 'delrank',
    category : 'config',
    aliases: ['drr'],
    timeout: '4000',
    description : 'Delete a rank',
    usage: '[Rank]',
    requirePermission: 'Manage Server',

    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You need **SECRET** permisison to use this command`)
        const rank = args.join(" ")
        if(!rank) return message.channel.send(`Incorrect Usage.`)
        schema.findOne({ Guild: message.guild.id , Rank: rank }, async(err, data) => {
            if(!data) {
                message.channel.send(`That rank is non-exist. So I cannot delete it`);
            } else{
                await schema.findOneAndDelete({ Guild : message.guild.id, Rank: rank })
                message.reply(`Success ! Rank: ${rank} was deleted from Claim Rank`) 
            }
    })
}
}