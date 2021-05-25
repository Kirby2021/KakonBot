const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = {
 name: 'meme',
 description: "Send some meme",
 timeout: '1000',
 aliases: ['mem'],
 run: async(client, message, args) => {
 fetch('https://meme-api.herokuapp.com/gimme')
 .then(res => res.json())
 .then(json => {
 const memeEmbed = new MessageEmbed()
 .setTitle(`Here You Are`)
 .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })
 )
 .setColor("RANDOM")
 .setImage(json.url)
 message.channel.send(memeEmbed)
 })
 }
}