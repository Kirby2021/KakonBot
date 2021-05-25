const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "vote",
  description: "Vote for me :)",
  timeout: '1000',
  aliases: ['voteforme'],
  run: async(client,message,args) => {
    const embed = new MessageEmbed()
      .setTitle(`Vote For Me`)
      .setDescription("**[Better Bots](https://better-bots-list.charweeee.repl.co/bots/834742702687387678)\n[Boat Space](https://boatspace.xyz/bots/834742702687387678/vote)\n[Discord Bot List](https://discordbotlist.com/bots/kakon-bot/upvote)**")
      .setColor("RANDOM")
    message.channel.send(embed)
  }
}