const { MessageEmbed, DiscordAPIError } = require('discord.js');
const schema = require('../../models/ranks')
module.exports = {
    name : 'addrank',
    category : 'config',
    aliases: ['arr'],
    timeout: '4000',
    description : 'Add a rank',
    requirePermission: 'Manage Server',

    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You need **SECRET** permisison to use this command`)
        const RoleD = await message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) ; const rank = args.slice(1).join(" ")
        if(!rank, !RoleD) return message.channel.send(`Incorrect Usage.`)
        schema.findOne({ Guild: message.guild.id , Rank: rank }, async(err, data) => {
            if(data) {
                message.channel.send(`That rank is exist. Delete that rank and create new`);
            } else{
                data = new schema({
                    Guild: message.guild.id,
                    Rank: rank,
                    Role: RoleD.id,
                })
                message.reply(`Success ! Created Rank: ${rank} with role: ${RoleD.name}`)
            }
            data.save()
        })
    }
}