const Discord = require('discord.js');
const client = new Discord.Client();

module.exports ={
    name:"invites",
    description: 'Shows invites',
    usage: "<@Member/ID>",
    aliases: ["inv"],
    timeout: '1000',
    category: 'info',
 run: async (client, message, args) => {
    try{
        const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let invites = await message.guild.fetchInvites()

        let memberInvites = invites.filter(i => i.inviter && i.inviter.id === member.user.id);
        if (memberInvites.size <= 0) {
            return message.channel.send(`${member.user.username} has **0** invite(s)`, (member === message.member ? null : member));
            { }
          }
          let index = 0;
        memberInvites.forEach(invite => index += invite.uses);
        message.channel.send(`${member.user.username} has **${index}** invite(s)`);
    }catch(err) {
        console.log(err)
        message.channel.send(`An error occured when checking...`)
    }
}   
}