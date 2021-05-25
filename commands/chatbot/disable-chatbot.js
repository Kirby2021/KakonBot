const { MessageEmbed } = require('discord.js')
const schema = require('../../models/chatbot')

module.exports = {
  name: 'disable-chatbot',
  description: "Disable Chat Bot Module",
  aliases: ['dcbb'],
  timeout: '5000',
  run: async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You can't use this command`)
    schema.findOne({ Guild: message.guild.id}, async(err,data) => { 
 if(err) throw err
 if(!data) return message.channel.send(`ChatBot Channel is not set !`)
 data.delete()
message.channel.send(`Deleted ChatBot Channel`)
    })
    }
  }