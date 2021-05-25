const { MessageEmbed } = require('discord.js')
const { success,error } = require('../../config.json')

module.exports = {
  name: 'modnick',
  aliases: ['mod','mnick','mnic','mod-nick'],
  description: "Moderator Nickname a member",
  timeout: '5000',
  run: async(client,message,args) => {
    if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send(`**${error} You can't moderate nickname of any members**`);
    if(!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.channel.send(`**${error} I need \`MANAGE_NICKNAMES\` permission to moderate nicknames**`)
    const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send(`**${error} You need to mention member to moderate nickname**`)
    if(member.roles.highest.position >= message.guild.me.roles.highest.position) return message.channel.send(`**${error} Please check my permission and role order before run the moderate nickname on this member**`);
    function generateRandomString(length){
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var random_string = '';
        if(length > 0){
          for(var i=0; i < length; i++){
              random_string += chars.charAt(Math.floor(Math.random() * chars.length));
          }   
        }
        return random_string  
      }
      const random = generateRandomString(6)
      const nickname = `Moderated Nickname ${random}`
    try {
    await member.setNickname(nickname)
    message.channel.send(new MessageEmbed().setDescription(`**${success} Moderated Nickname of \`${member.user.tag}\` to \`${nickname}\`**`).setColor("GREEN"))
  } catch(err) {
    message.channel.send(new MessageEmbed().setColor("RED").setDescription(`**${error} An error occured when I'm trying to moderating nickname of that user**`))
  }
  }
}