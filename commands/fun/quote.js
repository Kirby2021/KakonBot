const Discord = require('discord.js')
const { Canvas } = require("canvacord")
let { success, error } = require('../../config.json')

module.exports = {
  name: 'quote',
  category: 'Image',
  description: 'quote',
  usage: 'quote [@user]',
  aliases: ['quot'],
  timeout: '1000',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
        let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send(`${error} Mention a user`)

        let text = args.slice(1).join(" ")
        if(!text) return message.channel.send(`${error} Provide text`)

        let color = user.roles.highest.displayHexColor

        const userAvatar = user.user.displayAvatarURL({ dynamic: false, format: "png" })

        const img = await Canvas.quote({ image: userAvatar, message: text, username: user.displayName, color: color })

        let attachemnt = new Discord.MessageAttachment(img, "quote.png")
        message.channel.send(attachemnt)
    }
}