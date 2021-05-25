const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "nickme",
  timeout: '10000',
  usage: '[Nickname]',
  description: 'Change the nickname of the bot',
  requirePermission: 'Manage Server',
  run: async (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`Only Server Moderator can use this command`)
        if(!args.join(" ")) return message.channel.send(`You need to specify nickname to change`)
        message.guild.me.setNickname(args.join(" "))
        message.channel.send(`Success ! My nickname has been changed to ${args.join(" ")}`)

  },
};