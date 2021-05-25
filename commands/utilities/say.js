const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "say",
  timeout: '10000',
  usage: '[Message]',
  description: 'Make the bot send an message',
  requirePermission: "Manage Messages",
  run: async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You can't use this command`)
    if(!args.join(" ")) return message.channel.send(`You neeed to type a message to say`)
    if((["@everyone","@here"]).includes(args.join(" "))) return message.channel.send(`You can't say a message mention everyone`)
    message.channel.send(args.join(" "))
    await message.delete()
  },
};