const { MessageEmbed } = require('discord.js')
const schema = require('../../models/chatbot')

module.exports = {
  name: 'enable-chatbot',
  description: "Enable Chat Bot Module",
  usage: '<Channel>',
  aliases: ['ecbb'],
  timeout: '5000',
  run: async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You can't use this command`)
    const channel = await message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name == args[0]) || message.channel
    if(!channel.permissionsFor(message.guild.me).has(["SEND_MESSAGES","VIEW_CHANNEL"])) return message.author.send(`I can't send messages to ${channel} so cancelled the command`);
    schema.findOne({ Guild: message.guild.id}, async(err,data) => { 
 if(err) throw err
 if(data) data.delete()
 new schema({
   Guild: message.guild.id,
   Channel: channel.id
}).save()
channel.send(new MessageEmbed().setTitle(`ChatBot Channel Setup Successfully`).setDescription(`**Moderator: ${message.author.tag}\nChannel: ${channel}**`).setColor("RANDOM").setThumbnail(client.user.displayAvatarURL({ dynamic: true })).setAuthor(message.author.tag,message.author.displayAvatarURL({ dynamic: true })))
if(channel.id == message.channel.id) return;
message.channel.send(`New ChatBot Channel: ${channel}`)
    })
    }
  }