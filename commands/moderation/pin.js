module.exports = {
  name: 'pin',
  description: "Pins a message",
  aliases: ['pm'],
  timeout: '2000',
  requirePermission: "MANAGE_MESSAGES",
  usage: '[#Channel] [Message ID]',
  run: async(client,message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You can't use this command`)
    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`I can't pin a message`)
    const channel = await message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    if(!channel) return message.channel.send(`You must mention a channel to find message`)
    const msg = await channel.messages.fetch(args[1])
    if(!msg) return message.channel.send(`Can't find the message with ID on that channel`);
    await msg.pin()
    message.channel.send(`Successfully pinned message ID: \`${msg.id}\``)
    .catch(err => {
      console.log(err)
      message.channel.send(`An error occured when pinning that message.`)
    })
  }
}