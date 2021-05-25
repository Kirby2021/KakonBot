const Discord = require('discord.js')

module.exports = {
    name: 'obama',
    description: "Obama :)",
    timeout: '1000',
    aliases: ['obama'],
run: async(client, message, args) => {
  if (!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) return message.channel.send(`I don't have \`MANAGE_WEBHOOKS\` permission to make Obama :)`)
  if(!message.member.hasPermission(
    "MANAGE_MESSAGES"
  )) return message.channel.send(`You must have \`MANAGE_MESSAGES\` permission to use this command`)
        if (!args[0]) return message.channel.send('You need to provide content !')
 else {
 message.channel.createWebhook("Barrack Hussein Obama", {
     avatar: "https://variety.com/wp-content/uploads/2020/06/obama.jpg?w=681&h=383&crop=1"
 }).then(webhook => {
     webhook.send(args.join(' '))
     setTimeout(() => {
         webhook.delete()        
     }, 3000)
  })
 }
    }
}