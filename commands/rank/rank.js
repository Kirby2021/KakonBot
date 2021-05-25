const { MessageEmbed, DiscordAPIError } = require('discord.js');
const schema = require('../../models/ranks')
module.exports = {
    name : 'rank',
    category : 'config',
    aliases: ['ran'],
    timeout: '4000',
    description : 'Join/Leave a rank',

    run : async(client, message, args) => {
        const rank = args.join(" ")
        if(!rank) return message.channel.send(`You need to specify rank to join/leave`)
        schema.findOne({ Guild: message.guild.id , Rank: rank }, async(err, data) => {
            if(!data) {
                message.channel.send(`Cannot find that rank`);
            } else {
                const RoleD = message.guild.roles.cache.find(role => role.id === data.Role)
                if(!RoleD) return message.channel.send(`The role of that rank was deleted ! DM Staff to create one again`)
                if(message.member.roles.cache.get(RoleD)) {
                  await message.member.roles.remove(RoleD)
                  message.channel.send(`You left rank \`${rank}\` and lost \`${RoleD.name}\` role`)
                } else if(!message.member.roles.cache.get(RoleD)) {
                  await message.member.roles.add(RoleD)
                  message.channel.send(`You joined rank \`${rank}\` and got \`${RoleD.name}\` role`)
                }
            }
        })
    }
}